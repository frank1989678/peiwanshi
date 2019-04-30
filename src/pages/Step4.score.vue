<!--考试成绩-->
<template>
    <div class="page page-step">
        <div class="result" v-if="pass">
            <img class="img" src="../assets/images/ok.png" />
            <p class="txt suc">得分{{score}}，通过考核</p>
            <p class="desc">你真的很优秀！<br>据说仅有10%的陪练师能通过考核<br>赶快去申请开通第一个服务品类吧</p>

            <div class="cat">
                <span class="li" v-for="(item, index) in cat" :key="index" @click="goNext(item)">
                    <img class="cat-icon" :src="item.icon" />
                    <p>{{item.name}}</p>
                </span>
            </div>
        </div>
        <div class="result" v-else>
            <img class="img" src="../assets/images/frown.png" />
            <p class="txt fail">得分{{score}}，通过考核</p>
            <p class="desc">考核所有内容在培训课件中都能够找到答案<br>你可以重新学习后进行线上考核</p>

            <div class="button">
                <button @click="goRetry" class="btn btn-primary">重新考核</button>
            </div>
        </div>

    </div>
</template>

<script>

import '../assets/sass/step.scss'

export default {
    data() {
        return {
            pass: true,
            score: 0,
            cat: [
                {name: '英雄联盟', icon: 'http://game-play.oss-cn-hangzhou.aliyuncs.com/2019/1/14/6d01798f13824cf2823a2a5e9f900b96.png'},
                {name: '英雄联盟', icon: 'http://game-play.oss-cn-hangzhou.aliyuncs.com/2019/1/14/7cf044fab1794d6d8252ca5309a8d1e8.png'},
                {name: '英雄联盟', icon: 'http://game-play.oss-cn-hangzhou.aliyuncs.com/2019/1/14/1c3e8d7aa13a43f795559ed6417be9ef.png'},
                {name: '英雄联盟', icon: 'http://game-play.oss-cn-hangzhou.aliyuncs.com/2019/3/18/ceb4475b25ad494894f4f9c95aea4670.png'},
                {name: '英雄联盟', icon: 'http://game-play.oss-cn-hangzhou.aliyuncs.com/2019/3/18/932e36ebe19d40b89b9a91c6253de668.png'},
                {name: '英雄联盟', icon: 'http://game-play.oss-cn-hangzhou.aliyuncs.com/2019/3/18/c45d58c0763e421891b5118833691186.png'}
            ]
        }
    },
    methods: {
        goNext() {
            this.$router.push({name: 'step5', path: '/skill' });
        },
        goRetry() {
            this.$router.push({name: 'step3', path: '/exam' });  
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
    }
}
</script>
