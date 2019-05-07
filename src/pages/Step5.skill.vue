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
        
        <div :class="['ui-form mt30', {'ui-form-readonly': !edit}]">
            <div class="desc" v-if="!edit">
                平台考核人员将和你取得联系预约考核时间，请及时关注所留联系方式消息信息。你也可以加入对应考核QQ群，主动联系审核人员预约时间。
            </div>

            <div class="flex cell">
                <div class="txt">等级实力</div>
                <div class="flex cnt">
                    <span class="flex choose" v-if="edit" @click="setLevel">{{form.level || '请选择'}}</span>
                    <span v-else>最强王者</span>
                </div>
            </div>
            <div :class="['flex cell', {'cell-sub': types[cid].sub}]" v-if="types[cid]">
                <div class="txt">服务类型</div>
                <div class="flex cnt" v-if="edit">
                    <i :class="['cbx', {checked: form.type === name}]"
                        :key="index"
                        v-for="(name, index) in types[cid].type"
                        @click="form.type = name">{{name}}</i>
                    <span class="sub" v-if="types[cid].sub">{{types[cid].sub}}</span>
                </div>
                <div class="cnt" v-else>
                    大神实力陪练
                </div>
            </div>
            <div class="flex cell multiple">
                <div class="flex cnt">
                    <textarea v-model="form.desc" v-if="edit" class="ipt single" name="desc" cols="30" rows="10" placeholder="为方便考核人员了解你，请简单描述下你的实力..."></textarea>
                    <span v-else>这里显示描述文本信息，显示多行。这里显示描述文本信息，显示多行。这里显示描述文本信息，显示多行。</span>
                </div>
            </div>
            <div class="flex cell row">
                <div class="flex cnt">
                    <input v-model="form.qq" v-if="edit" class="ipt single" type="text" name="username" autocomplete="off" placeholder="请输入QQ号，陪训考核员将主动联系你" />
                    <span v-else>QQ：1256101223</span>
                </div>
            </div>
        </div>

        <div class="button" v-if="edit">
            <button @click="goNext" class="btn btn-primary">提交</button>
        </div>

        
        <div class="player-box" v-if="videoSrc">
            <button class="close" @click="onCloseVideo()"></button>
            <video id="xplayer"
                class="video"
                :src="videoSrc"
                controls="controls"
                @click="onPlay()"
                @pause="playing = false"
                @ended="stopVideo()"
                webkit-playsinline="true" 
                playsinline="true" 
                poster=""
                data-paused="play"></video>
        </div>
    </div>
</template>

<script>

import {getQueryString} from '../utils/lib'

export default {
    data() {
        return {
            videoSrc: '',
            playing: false,
            edit: true, // 编辑状态
            subject: [
                {title: '这里显示课件标题，最多显示两行文字...', status: false, time: 300, poster: '//h5.apeiwan.com/htm/img/1.jpg'}
            ],
            types: {
                30: {
                    name: '王者荣耀',
                    type: ['娱乐陪练', '大神实力陪练'],
                    sub: '近3个赛季最高段位达到【荣耀王者】'
                },
                31: {
                    name: '刺激战场',
                    type: ['娱乐陪练', '大神实力陪练'],
                    sub: '超级王牌以上，KD≥5'
                },
                32: {
                    name: '绝地求生',
                    type: ['娱乐陪练', '大神实力陪练'],
                    sub: '时长2000+，KD≥3.5'
                },
                33: {
                    name: '英雄联盟',
                    type: ['娱乐陪练', '大神实力陪练'],
                    sub: '近3赛季最高【最强王者】，当赛季【大师】'
                }
            },
            form: {
                level: '',
                type: '',
                desc: '',
                qq: ''
            },

            cid: 99999
        }
    },
    methods: {
        playVideo(item) {
            this.videoSrc = item.src || 'https://vali.cp31.ott.cibntv.net/youku/6975439072A4671C76588446C/03000801005C80D1C6F5CAF003E88098C0FD0D-54AC-4E97-A2D4-84273B51AFF6.mp4?sid=055712378185518552281_00_A7316d0e3a223f1e61e372d763a63040a&sign=8eddb6143b9a11d5bb8c90bbebd41f3d&ctype=50&hd=1';

            this.$nextTick(() => {
                const stop = false;
                const myvideo = document.querySelector('#xplayer');
                if (stop || this.playing) {
                    this.playing = false;
                    myvideo.pause();
                    if (stop) {
                        myvideo.currentTime = 0;
                    }
                } else {
                    this.playing = true;
                    myvideo.play();
                }
            })
        },
        onPlay() {
            const myvideo = document.querySelector('#xplayer');
            if (myvideo) {
                if (this.playing) {
                    this.playing = false;
                    myvideo.pause();
                } else {
                    this.playing = true;
                    myvideo.play();
                }
            }
        },
        stopVideo() {

        },
        onCloseVideo() {
            this.playing = false;
            this.videoSrc = '';
        },
        goNext() {
            const {types, cid, form} = this;
            const {level, type, desc, qq} = form;

            if (!level) {
                this.$topTips('请选择等级实力');

            } else if (types[cid] && !type) {
                this.$topTips('请选择服务类型');

            } else if (!desc) {
                this.$topTips('请输入实力描述');

            } else if (!qq) {
                this.$topTips('请输入qq');

            } else {

            }
        },
        setLevel() {
            const that = this;
            const menu = [{
                label: 'option A',
                onClick: function (){
                    that.form.level = 'option A';
                    console.log('click1');
                }
            }, {
                label: 'option B',
                onClick: function (){
                    that.form.level = 'option B';
                    console.log('click2');
                }
            }]
            weui.actionSheet(menu);
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
        this.cid = getRequestUrlParam(window.location.href).cid || 9999;
    }
}
</script>
