<!--在线考核-->
<template>
    <div class="page page-step">
        <div class="title">
            <h2>恭喜完成在线培训</h2>
            <p>现在进入线上考核部分。满分100分，90分合格，预计需要花费10分钟。</p>
        </div>


        <div class="button">
            <button @click="goNext" class="btn btn-primary">完成考核</button>
        </div>
    </div>
</template>

<script>

import '../assets/sass/step.scss'

export default {
    data() {
        return {
        }
    },
    methods: {
        stopVideo() {

        },
        goNext() {
            this.$router.push({name: 'step4', path: '/score' });
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
    }
}
</script>
