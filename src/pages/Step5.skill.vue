<!--考试成绩-->
<template>
    <div class="page page-step">
        <div class="title">
            <h2>王者荣耀上线考核</h2>
            <p>平台运营人员将联系您进行考核，包含以下培训内容，在考核前请仔细阅读。考核通过后平台将为你制作培训证书。</p>
            <p class="strong">皮皮培训考核QQ群：23312331  </p>
        </div>

        <div class="subject inline" v-if="subject.length">
            <ul>
                <li class="flex li" v-for="(item, index) in subject" :key="index" @click="playVideo(item)">
                    <div class="poster">
                        <img class="img" :src="item.poster" :alt="item.title">
                    </div>
                    <div class="cnt">
                        <h3 class="tit">{{item.title}}</h3>
                        <div class="flex">
                            <span class="c-green" v-if="item.status">已学习</span>
                            <span class="c-red" v-else>未学习</span>
                            <span class="c-gray">预计耗时{{item.time / 60}}分钟</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div :class="['ui-form mt30', {'ui-form-readonly': status}]">
            <div class="desc" v-if="status">
                平台考核人员将和你取得联系预约考核时间，请及时关注所留联系方式消息信息。你也可以加入对应考核QQ群，主动联系审核人员预约时间。
            </div>

            <div class="flex cell">
                <div class="txt">等级实力</div>
                <div class="flex cnt">
                    <!-- <select class="slt" name="level" v-show="!status">
                        <option value="1">S</option>
                        <option value="2">A</option>
                        <option value="3">B</option>
                    </select> -->
                    <span class="flex choose" v-show="!status" @click="setLevel">请选择</span>
                    <span v-show="status">最强王者</span>
                </div>
            </div>
            <div class="flex cell">
                <div class="txt">服务类型</div>
                <div class="flex cnt" v-show="!status">
                    <i :class="['cbx', {checked: form.type === item.val}]"
                        :key="index"
                        v-for="(item, index) in types"
                        @click="form.type = item.val">{{item.name}}</i>
                </div>
                <div class="cnt" v-show="status">
                    大神实力陪练
                </div>
            </div>
            <div class="flex cell multiple">
                <div class="flex cnt">
                    <textarea v-show="!status" class="ipt single" name="desc" cols="30" rows="10" placeholder="为方便考核人员了解你，请简单描述下你的实力..."></textarea>
                    <span v-show="status">这里显示描述文本信息，显示多行。这里显示描述文本信息，显示多行。这里显示描述文本信息，显示多行。</span>
                </div>
            </div>
            <div class="flex cell">
                <div class="flex cnt">
                    <input v-show="!status" class="ipt single" type="text" name="username" v-model="form.num" placeholder="请输入QQ号，陪训考核员将主动联系你" />
                    <span v-show="status">QQ：1256101223</span>
                </div>
            </div>
        </div>

        <div class="button" v-show="!status">
            <button @click="goNext" class="btn btn-primary">提交</button>
        </div>
    </div>
</template>

<script>

import '../assets/sass/step.scss'

export default {
    data() {
        return {
            status: false,
            subject: [
                {title: '这里显示课件标题，最多显示两行文字...', status: false, time: 300, poster: 'http://h5.apeiwan.com/htm/img/1.jpg'}
            ],
            types: [
                {name: '娱乐陪练', val: 'idCard'},
                {name: '大神实力陪练', val: 'other', sub: '*需要达到【百星王者】'}
            ],
            form: {
                type: 'idCard',
                name: '',
                num: ''
            }
        }
    },
    methods: {
        goNext() {
            this.$router.push({name: 'step3', path: '/exam' });
        },
        setLevel() {
            const menu = [{
                label: 'option A',
                onClick: function (){
                    console.log('click1');
                }
            }, {
                label: 'option B',
                onClick: function (){
                    console.log('click2');
                }
            }]
            weui.actionSheet(menu)
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
    }
}
</script>
