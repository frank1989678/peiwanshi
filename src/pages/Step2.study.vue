<!--在线学习-->
<template>
    <div class="page page-step">
        <div class="flex step">
            <span v-for="(item, index) in ul" :key="index" :class="item.cls">{{item.name}}</span>
        </div>

        <div class="title">
            <h2>皮皮陪练师在线培训</h2>
            <p>经过陪训和考核，皮皮陪练师相比其他陪练师，服务单价高33.5%，固定服务人数高55%，满意度高80.5%。完成最终平台考核，皮皮将为你制作培训证书。</p>
            <p class="strong">皮皮培训考核QQ群：23312331  </p>
        </div>

        <div class="subject">
            <h2>需要完成以下课程的学习并通过考核后，才能进行服务申请。</h2>

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

            <div class="button">
                <!-- <button @click="goNext" class="btn btn-primary">进入考核</button> -->
                <button @click="goNext" :class="'btn btn-' + (studyAll ? 'primary' : 'disabled')">进入考核</button>
            </div>
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

import axios from '../utils/axios'

export default {
    data() {
        return {
            videoSrc: '',
            playing: false,
            ul: [
                {name: '身份认证', cls: ''},
                {name: '-', cls: 'sp'},
                {name: '在线培训', cls: 'light'},
                {name: '-', cls: 'sp'},
                {name: '线上测试', cls: ''},
                {name: '-', cls: 'sp'},
                {name: '运营考核', cls: ''},
                {name: '-', cls: 'sp'},
                {name: '接单', cls: ''}
            ],
            subject: [
                {title: '这里显示课件标题，最多显示两行文字...', status: false, time: 300, poster: '//h5.apeiwan.com/htm/img/1.jpg'},
                {title: '课件标题，显示文字...', status: true, time: 300, poster: '//h5.apeiwan.com/htm/img/2.jpg'},
                {title: '这里显示课件标题，最多显示两行文字...', status: false, time: 300, poster: '//h5.apeiwan.com/htm/img/3.jpg'}
            ]
        }
    },
    computed: {
        studyAll() {
            let count = 0;
            this.subject.forEach( item => {
                count += item.status ? 1 : 0;
            })
            return count === this.subject.length;
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
            // item.status = true;
            // return;
            !item.status && axios.post('/xxx', {id: item.id}).then( res => {
                item.status = true;
                console.log(8888)
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
            this.studyAll ? this.$router.push({name: 'step3', path: '/exam' }) : this.$toast('全部学习之后，才能进入考核');
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
    }
}
</script>
