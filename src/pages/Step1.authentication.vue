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
                    <input class="ipt" type="text" name="username" v-model="form.name" autocomplete="off" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="flex cell">
                <div class="txt">证件号</div>
                <div class="flex cnt">
                    <input class="ipt" type="text" name="username" v-model="form.num" autocomplete="off" placeholder="请输入和姓名对应的证件号" />
                </div>
            </div>
            
            <template v-if="form.type === 'other'">
            <div class="img-wrap">
                <div class="hd">本人手持证件照</div>
                <div class="flex bd">
                    <div class="li eg"><img @click="showBig" class="img" src="../assets/images/cardHand.jpg" alt="本人手持证件照"></div>
                    <div class="li">
                        <upload-img :all-upload="true" :max="1" :list.sync="cardHandImg"/>
                    </div>
                </div>
            </div>

            <div class="img-wrap">
                <div class="hd">证件照正面</div>
                <div class="flex bd">
                    <div class="li eg"><img  @click="showBig" class="img" src="../assets/images/card.jpg" alt="证件照正面"></div>
                    <div class="li">
                        <upload-img :all-upload="true" :max="1" :list.sync="cardImg"/>
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

import UploadImg from '../components/Upload.Img.List'
export default {
    components: { UploadImg },
    data() {
        return {
            abc: false,
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
            cardHandImg: [],
            cardImg: []
        }
    },
    methods: {
        goNext() {
            const identityCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            const {cardHandImg, cardImg} = this;
            const {name, num, type} = this.form;
            const img = cardHandImg.concat(cardImg);

            if (!name) {
                this.$topTips('请输入姓名');

            } else if (!num) {
                this.$topTips('请输入证件号');

            } else if (type === 'idCard' && !identityCard.test(num)) {
                this.$topTips('身份证号码格式错误');

            } else if (type === 'other' && img.length != 2) {
                if (cardHandImg.length == 0) {
                    this.$topTips('请上传手持证件照');
                } else {
                    this.$topTips('请上传证件照正面');
                }

            } else {
                this.$router.push({name: 'step2', path: '/study' });
            }
        },
        showBig(el) {
            weui.gallery(el.currentTarget.src, {className: 'ui-gallery'});
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
    }
}
</script>
