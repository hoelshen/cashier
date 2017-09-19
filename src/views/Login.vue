<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" placeholder="account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 仅限公司内部使用。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                const self = this;
                self.$ajax({
                    url: '/api/http/sysUser/doLogin.jhtml',
                    method: 'post',
                    data: {
                        'user.account': self.ruleForm.account,
                        'user.password': self.ruleForm.password
                    },
                    transformRequest: [function (data) {
                        // Do whatever you want to transform the data
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret;
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response){
                    if(response.data.success == 1){
                        if(window.sessionStorage){
                            sessionStorage.user = JSON.stringify(response.data.result);
                            sessionStorage.haha = new Date().getTime();
                        }
                        self.$router.push('/');
                    }else{
                        self.$message({
                            message:response.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(error){

                });
                // self.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         localStorage.setItem('ms_username',self.ruleForm.username);
                //         self.$router.push('/');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
                
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: #3a8fe0;
    }
    .ms-title{
        position: absolute;
        top:52%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:32px;
        color: #fff;
        font-weight: bold;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:230px;
        margin-left: -150px;
        margin-top: -115px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>