<template>
    <div class="mainWrap">
    	<slide-bar></slide-bar>
        <div class="mainContent">
            <div class="contentTop">
                <div class="title">
                    {{ contentName }}
                </div>
                <div class="user">
                    <div class="noti">
                        <i class="icon-tongzhi3"></i>
                        <span class="count">0</span>
                    </div>
                    <div class="userName">
                        <span>{{ user.realName }}</span>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </div>
            </div>
            <router-view class="content"></router-view>
        </div>
    </div>
</template>

<script>
    import slideBar from './slideBar.vue';
    export default {
        data() {
            return {
                contentName: '主页',
                configName: {
                    '/': '主页',
                    '/testTree' : '测试树'
                },
                user : {}
            }
        },
        watch: {
            '$route'(val) {
                this.contentName = this.configName[val.fullPath];
            }
        },
        created() {
            if (sessionStorage.user) {
                this.user = JSON.parse(sessionStorage.user).data;
            } else {
                delete sessionStorage.user;
                this.$router.push('/login');
            }
            this.contentName = this.configName[this.$route.fullPath];
        },
        components: {
            slideBar
        }
    }
</script>

<style lang="less" scoped>
    @import url('../assets/less/mainWrap.less');
</style>