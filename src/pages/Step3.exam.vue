<!--在线考核-->
<template>
    <div class="page page-exam"
        @touchstart="touchS"
        @touchmove="touchM"
        @touchend="touchE">
        
        <template v-if="!isTest">
        <div class="hd">
            <h2>在线培训完成，开始线上测试吧</h2>
            <p>线上测试为单选题<br>共20题，每题5分   满分100分，90分合格<br>预计测试需要花费10分钟</p>
        </div>

        <div class="button">
            <button @click="isTest = true" class="btn btn-primary">开始测试</button>
        </div>
        </template>

        <template v-else>
        <dl :class="[{slideIn: index < curr, slideOut: index == outIdx}]" v-for="(item, index) in list" :key="index">
            <dt>{{index + 1}}.{{item.title}}</dt>
            <dd :class="[{right: correct[item.id] == ans.id, error: wrong[item.id] == ans.id}]"
                v-for="(ans, idx) in item.options" 
                :key="idx" 
                @click="onChoose(item.id, ans.id, index)">{{ans.name}}</dd>
        </dl>

        <div class="flex bar">
            <span class="page">{{curr}} /{{list.length}}</span>
            <span class="total flex">
                <span class="right">{{totalA}}</span>
                <span class="error">{{totalB}}</span>
            </span>
            <button type="button" class="submit" @click="onConfirm">交卷</button>
        </div>
        </template>

        
        <div class="dialog weui-animate-fade-in" v-if="dialogVisible">
            <div class="main">
                <div class="hd">答题未完成，确定中途退出？</div>
                <div class="bd flex">
                    <div class="col">
                        <p>{{list.length - totalA - totalB}}</p>
                        <span>未答题</span>
                    </div>
                    <div class="col">
                        <p>{{totalB}}</p>
                        <span>错题数</span>
                    </div>
                    <div class="col">
                        <p>{{score}}</p>
                        <span>考核得分</span>
                    </div>
                </div>
                <div class="ft flex">
                    <button type="button" class="btn yes" @click="onOk">现在交卷</button>
                    <button type="button" class="btn no" @click="dialogVisible = false">继续答题</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            isTest: false,

            dialogVisible: false,
            curr: 1,
            pageSize: 1,
            outIdx: 99999,
            list: [
                {
                    id: 1,
                    title: '假如客户在游戏中掉线了该如何处理？', 
                    options: [
                        {'id': 11, 'name': '游戏结束'},
                        {'id': 12, 'name': '等待客户，联系不上用户时向客服反应'},
                        {'id': 13, 'name': '与客户沟通，游戏结束'},
                        {'id': 14, 'name': '继续接单子，找其他时间再陪客户玩'}
                    ] 
                },
                {
                    id: '2',
                    title: '第二题', 
                    options: [
                        {'id': 21, 'name': 'option A'},
                        {'id': 22, 'name': 'option B'},
                        {'id': 23, 'name': 'option C'},
                        {'id': 24, 'name': 'option D'}
                    ] 
                },
                {
                    id: '3',
                    title: '第三题', 
                    options: [
                        {'id': 31, 'name': 'option A'},
                        {'id': 32, 'name': 'option B'},
                        {'id': 33, 'name': 'option C'},
                        {'id': 34, 'name': 'option D'}
                    ] 
                },
                {
                    id: '4',
                    title: '第四题', 
                    options: [
                        {'id': 41, 'name': 'option A'},
                        {'id': 42, 'name': 'option B'},
                        {'id': 43, 'name': 'option C'},
                        {'id': 44, 'name': 'option D'}
                    ] 
                }
            ],
            score: 0, // 得分
            totalA: 0, // 回答正确数
            totalB: 0, // 回答错误数
            correct: {},
            wrong: {}
        }
    },
    methods: {
        goNext2() {
            this.$router.push({name: 'test', path: '/test' });
        },

        /**
         * 选择答案
         * @param  {string} qid 问题id
         * @param  {string} aid 选择id
         */
        onChoose(qid, aid, index) {
            const correct = {...this.correct};
            const wrong = {...this.wrong};
            if (correct[qid] || wrong[qid]) {
                // 不能修改答案
                return;
            }
            index += 2; // index 从0开始
            this.pageSize = index;
            setTimeout( () => {
                if (Math.random() > 0.5) {
                    this.score += 5; // 每题5分
                    this.totalA ++;
                    correct[qid] = aid;
                    this.correct = correct;
                    console.log('correct')
                } else {
                    this.totalB ++;
                    wrong[qid] = aid;
                    this.wrong = wrong;
                    correct[qid] = 21;
                    this.correct = correct;
                    console.log('wrong')
                }
                if (index <= this.list.length) {
                    this.curr = index;
                }
            }, 500);
        },
        onConfirm() {
            const surplus = this.list.length - this.totalA - this.totalB;
            if (surplus > 0) {
                this.dialogVisible = true;
            } else {
                this.onOk();
            }
        },
        onOk() {
            this.$router.push({name: 'step4', path: '/score' });
        },
        goNext() {
            this.$router.push({name: 'step4', path: '/score' });
        },
        touchS(e) {
            if (this.isTest && e.touches.length == 1) {
                this.startX = e.touches[0].clientX;
            }
        },
        touchM(e) {
            // if (e.touches.length == 1) {
            //     var moveX = e.touches[0].clientX;
            //     var disX = this.startX - moveX;
            // }
        },
        touchE(e) {
            if (this.isTest && e.changedTouches.length == 1) {
                //手指移动结束后水平位置
                var endX = e.changedTouches[0].clientX;
                //触摸开始与结束，手指移动的距离
                var disX = this.startX - endX;
                if (disX > 70 && this.curr < this.pageSize) {
                    // go right
                    this.curr ++;
                    this.outIdx = 99999;

                } else if (disX < -70 && this.curr > 1) {
                    // go left
                    this.curr --;
                    this.outIdx = this.curr;
                }
            }
        },
        init() {
            this.score = 0;
            this.totalA = 0;
            this.totalB = 0;
            this.dialogVisible = false;
            this.curr = 1;
            this.pageSize = 1;
            this.outIdx = 99999;
            this.correct = {};
            this.wrong = {};
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
    }
}
</script>
