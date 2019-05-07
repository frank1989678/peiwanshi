<!--申请陪玩师-->
<template>
    <div class="page page-apply">
        <div class="banner">
            <img class="img" src="../assets/images/banner.jpg" alt="欢迎加入皮皮陪练师">
        </div>
        <div class="intro">
            <h2>让陪练师成为一种职业</h2>
            <p>我们致力于将陪练师变成一种职业，通过建立良好的陪 练生态和绿色的陪练环境，为玩家创造优质的游戏体验。</p>
        </div>
        <div class="intro">
            <h2>成为皮皮陪练师，你将得到</h2>
            <p>1. 系统化培训，通过考核后平台出具陪训认证证书</p>
            <p>2. 绿色陪练环境</p>
            <p>3. 和服务能力匹配的回报收益</p>
            <p>4. 成为主播 / KOL / 职业选手的可能性</p>
        </div>

        <div class="agreement">
            <i :class="['cbx', {checked: agreement}]" @click="agreement = !agreement">同意</i>
            <span @click="goLink" class="link">《皮皮陪练师入驻协议》</span>
        </div>

        <div class="button">
            <button @click="goNext" :class="'btn btn-' + (agreement ? 'primary' : 'disabled')">立即申请</button>
        </div>
        
        <!-- 使用iframe加载页面，在ios中出现高度塌陷问题
        <div class="dialog" v-if="showDialog">
            <iframe class="iframe" src="//open.wzpeilian.com/app-word-h5/godprotocol" frameborder="0"></iframe>
            <button class="close" @click="showDialog = false"></button>
        </div> -->
    </div>

</template>

<script>
export default {
    data() {
        return {
            agreement: false,
            showDialog: false
        }
    },
    methods: {
        goLink() {
            // this.showDialog = true;
            window.location.href = '//open.wzpeilian.com/app-word-h5/godprotocol';
        },
        goNext() {
            if (this.agreement) {
                this.$router.push({name: 'step1', path: '/authentication' });
            } else {
                this.$alert('请先同意皮皮陪练师入驻协议');
            }
        },
        getToken() {
            const para = getRequestUrlParam(window.location.href);
            para.token && setToken(para.token);
        }
    },
    mounted() {
        document.title = '申请成为陪练师';
        this.getToken();
    }
}
</script>
