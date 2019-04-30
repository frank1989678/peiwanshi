<!--身份认证-->
<template>
    <div class="page page-step">
        <div class="flex step">
            <span v-for="(item, index) in ul" :key="index" :class="item.cls">{{item.name}}</span>
        </div>

        <div class="title">
            <h2>身份认证</h2>
            <p>身份证认证将通过支付宝芝麻信用进行认证，其他证件请上 传对应的证件照和手持照。</p>
        </div>

        <div class="ui-form">
            <div class="flex cell">
                <div class="txt">证件类型</div>
                <div class="flex cnt">
                    <i :class="['cbx', {checked: form.type === item.val}]"
                        :key="index"
                        v-for="(item, index) in types"
                        @click="form.type = item.val">{{item.name}}</i>
                </div>
            </div>
            <div class="flex cell">
                <div class="txt">姓名</div>
                <div class="flex cnt">
                    <input class="ipt" type="text" name="username" v-model="form.name" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="flex cell">
                <div class="txt">证件号</div>
                <div class="flex cnt">
                    <input class="ipt" type="text" name="username" v-model="form.num" placeholder="请输入和姓名对应的证件号" />
                </div>
            </div>
            
            <template v-if="form.type === 'other'">
            <div class="img-wrap">
                <div class="hd">本人手持证件照</div>
                <div class="flex bd">
                    <div class="li eg"><img preview="1" class="img" src="../assets/images/cardHand.jpg" alt="本人手持证件照"></div>
                    <div class="li">
                        <upload-img :all-upload="true" :max="1" :list.sync="advicePicUrls"/>
                    </div>
                </div>
            </div>

            <div class="img-wrap">
                <div class="hd">证件照正面</div>
                <div class="flex bd">
                    <div class="li eg"><img preview="1" class="img" src="../assets/images/card.jpg" alt="证件照正面"></div>
                    <div class="li">
                        <upload-img :all-upload="true" :max="1" :list.sync="advicePicUrls"/>
                    </div>
                </div>
            </div>
            </template>

            <div class="button">
                <button @click="goNext" class="btn btn-primary">下一步</button>
            </div>
        </div>
    </div>
</template>

<script>

import '../assets/sass/step.scss'

import UploadImg from '../components/Upload.Img.List'
export default {
    components: { UploadImg },
    data() {
        return {
            ul: [
                {name: '身份认证', cls: 'light'},
                {name: '-', cls: 'sp'},
                {name: '在线培训', cls: ''},
                {name: '-', cls: 'sp'},
                {name: '线上测试', cls: ''},
                {name: '-', cls: 'sp'},
                {name: '运营考核', cls: ''},
                {name: '-', cls: 'sp'},
                {name: '接单', cls: ''}
            ],
            types: [
                {name: '身份证', val: 'idCard'},
                {name: '其他证件', val: 'other'}
            ],
            form: {
                type: 'idCard',
                name: '',
                num: ''
            },
            advicePicUrls: []
        }
    },
    methods: {
        goNext() {
            this.$router.push({name: 'step2', path: '/study' });
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
    }
}
</script>
