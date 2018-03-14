<!-- 
    编辑器组件
    props        type              default          explain
    size         Number            10485760        图片最大尺寸,默认10m
    bucket       String            cashier-img     要上传到那个backet 
    baseUrl      String            cashier.com     图片域名


    method
    getContent                                     获取内容
    clearContent                                   清除editor内容
-->
<template>
    <div>
        <!-- 编辑器自定义toolbar -->
        <div id="toolbar">
            <select class="ql-size"></select>
            <select class="ql-header"></select>
            <select class="ql-color"></select>
            <select class="ql-background"></select>
            <select class="ql-align"></select>
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
            <button class="ql-image"></button>
            <el-button @click="dialogFormVisible = true">添加卡片</el-button>
        </div>
        <!-- 编辑器 -->
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur"></quill-editor>
        <!-- 插入卡片dialog -->
        <el-dialog title="插入卡片" :visible.sync="dialogFormVisible">
            <label>链接：</label>
            <el-input type="textarea" v-model="url" resize="none" placeholder="请输入url，用回车分隔"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 因为获取不到编辑器内图片框的值，用file代替 -->
        <input v-show="false" type="file" accept="image/jpeg,image/png,image/gif" ref="imgBtn" @change="onUpload">
    </div>

</template>

<script>
// 导入编辑器样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 导入编辑器
import { quillEditor } from "vue-quill-editor";
export default {
    props: {
        size: {
            type: Number,
            default: 10485760
        },
        baseUrl: {
            type: String,
            default: 'cashier.com'
        },
        bucket: {
            type: String,
            default: 'cashier-img'
        },
    },
    data() {
        return {
            content: "",                        //编辑器内容
            dialogFormVisible: false,           //dialog显示
            url: "",                            //dialog输入的url
            editorOption: {                     //editor配置
                modules: {
                    toolbar: '#toolbar'
                }
            },
            tocken: {},                         //OSS Tocken
            imgUrl: []                          //查询链接返回url
        }
    },
    components: {
        quillEditor
    },
    methods: {
        // 点击icon触发事件
        imgHandler(state) {
            if (state) {
                this.$refs.imgBtn.click();
            }
        },
        // 获取OSS签名
        getTocken() {
            return new Promise((resolve, reject) => {
                this.$ajax.post('/cbttest/oteao/file/getSignature').then((res) => {
                    resolve(res)
                })
            })

        },
        // 上传图片
        onUpload() {
            // 图片大于10M
            if (this.$refs.imgBtn.files[0].size > 10485760) {
                this.$message({
                    message: "图片超过10M，请重新选择",
                    type: "error"
                });
                this.$refs.imgBtn.value = "";
            } else {
                this.editor.focus();
                this.getTocken().then(res => {
                    // OSS引入文件在html
                    let client = new OSS.Wrapper({
                        region: 'oss-cn-hangzhou',
                        accessKeyId: res.data.data.accessKeyId,
                        accessKeySecret: res.data.data.accessKeySecret,
                        stsToken: res.data.data.securityToken,
                        bucket: 'imgcbt'
                    });
                    client.multipartUpload('22', this.$refs.imgBtn.files[0]).then(res => {
                        if (res.res.status === 200) {
                            this.$message({
                                message: "上传成功",
                                type: "success"
                            });
                            //插入图片
                            this.editor.insertEmbed(this.editor.getSelection().index, 'image', res.url);
                        }
                    })
                });
            }
        },
        // 编辑器光标离开 将编辑器内容发射给父组件
        onEditorBlur(editor) {
            this.$emit('getContent', this.content)
        },
        clearContent() {
            this.content = '';
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    mounted() {
        // 绑定toolbar的image图标handler
        this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler);
    }
}
</script>

<style lang="less" scoped>
.quill-editor {
    height: 450px;
}
</style>
