<template>
    <div class="wrapper">
        <v-header @changePassword="changePassword"></v-header>
        <main-wrap class="clearfix"></main-wrap>
        <!--弹出层-->
        <template v-if="showDialog">
            <el-dialog title="修改密码" :visible.sync="showDialog">
            <el-form :model="password" :rules="rules" ref="passWord" label-width="80px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="old">
                    <el-input v-model="password.old" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new">
                    <el-input v-model="password.new" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm">
                    <el-input v-model="password.confirm" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="showDialog = false">确 定</el-button>
            </div>
            </el-dialog>
        </template>
    </div>
</template>

<script>
    import vHeader from './vHeader.vue';
    import mainWrap from './mainWrap.vue';
    import router from '../router.js';
    export default{
        name: 'home',
        components: {
            vHeader,
            mainWrap
        },
        data() {
            var confirmPassword = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.password.old) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                showDialog: false,
                password: {
                    old: '',
                    new: '',
                    confirm: ''
                },
                rules: {
                    old: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    new: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    confirm: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        { validator: confirmPassword, trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {
            showDialog(newval){
                if(!newval){
                    this.password = {
                                        old: '',
                                        new: '',
                                        confirm: ''
                                    }
                }
            }
        },
        methods: {
            changePassword() {
                this.showDialog = !this.showDialog;
            }
        }
    }
</script>

<style scoped>
    .el-dialog--small {
        width: 40%;
    }
    .el-dialog--small .el-input,.el-input__inner {
        width: 98%;
    }
</style>
