<template>
    <header class="clearfix">
        <div class="logo f-l">
            <!-- <h1><router-link to="/"><img src="../assets/images/logo.png"></router-link></h1> -->
        </div>
        <div class="login f-r clearfix">
            <div class="uesrname f-l">
                <a href="javascript:">{{user.name}}({{user.post}})</a>
            </div>
            <div class="change-password f-l">
                <a href="javascript:" @click="changePassword">修改密码</a>
            </div>
            <div class="exit f-l">
                <a href="javascript:">退出</a>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                user:{
                    name: 'super',
                    post: '管理员'
                }
            }
        },
        methods: {
            changePassword() {
                this.$emit('changePassword');
            }
        }
    }
</script>

<style scoped>
header{
    background-color: #161d2f;
    position: fixed;
    width: 100%;
    z-index: 100;
}
header .logo{
    height: 48px;
    padding-left: 29px;
}
header .logo h1{
    margin-top: 8px;
}
header .login{
    padding: 16px 40px 0px 0;
}
header .login a{
    color: #ccc;
    line-height: 14px;
    font-size: 14px;
}
header .login .uesrname{
    padding-left: 23px;
    /* background-image: url('../assets/images/icon-css01.png'); */
    background-repeat: no-repeat;
    background-position:0 -670px; 
    margin-right: 22px;
}
header .login .change-password{
    padding-right: 6px;
    border-right: 1px solid #9ea0a5;
}
header .login .exit{
    padding-left: 6px;
}
</style>