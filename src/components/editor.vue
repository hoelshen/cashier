<!-- 
    编辑器组件
    props        type              default          explain
    content      String                            编辑器内容
    size         Number            10485760        图片最大尺寸,默认10m
    bucket       String            cashier-img     要上传到那个backet 
    baseUrl      String            cashier.com     图片域名


    method
    contentData                                     获取内容
    clearContent                                   清除editor内容
-->
<template>
    <div class="editor">
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
            <el-button @click="addCardVisible = true">添加卡片</el-button>
        </div>
        <!-- 编辑器 -->
        <quill-editor v-model="contentData" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @change="onEditorChange($event)"></quill-editor>
        <!-- 插入卡片dialog -->
        <el-dialog title="插入卡片" :visible.sync="addCardVisible">
            <label>链接：</label>
            <el-input type="textarea" v-model="url" resize="none" placeholder="请输入url，用回车分隔"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCardVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSearch" :loading="btnLoading">获取信息</el-button>
            </div>
        </el-dialog>
        <!-- 卡片选择dialog -->
        <el-dialog title="商品信息" :visible.sync="selectCardVisible">
            <div v-if="urlData.errorUrl.length > 0">
                <label>以下的商品链接不正确，请检查后再试</label>
                <p v-for="url in urlData.errorUrl">商品链接：{{ url }}</p>
            </div>
            <div style="margin-top:20px;" v-if="urlData.errorProduct.length > 0">
                <label>以下的商品不存在，请检查后再试</label>
                <p v-for="url in urlData.errorProduct">商品链接：{{ url }}</p>
            </div>
            <hr>
            <label v-if="urlData.productList.length > 0">可以选择先插入以下商品卡片：</label>
            <div class="cardWarp" v-if="urlData.productList.length > 0 " v-for="(item,index) in urlData.productList">
                <template>
                    <div class="cardBox">
                        <div class="closeBtn" @click="closeCard(index)">X</div>
                        <p class="cardLink">链接：
                            <el-input style="width:85%" v-model="item.cardUrl" disabled>item.cardUrl</el-input>
                        </p>
                        <div class="cardMain">
                            <img class="cardImg" :src="item.imgUrl">
                            <div class="cardInfo">
                                <div class="cardTitle" :title="item.proName">{{ item.proName }}</div>
                                <div class="cardSubTitle" :title="item.catName">item.catName</div>
                                <hr>
                                <div class="price">醉品价
                                    <span class="ZPPrice">￥{{ item.salesPrice }}</span>
                                </div>
                                <div class="price">进货价
                                    <span class="InPrice">￥{{ item.purchasePrice }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="selectCardVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertCard">插入卡片</el-button>
            </div>
        </el-dialog>
        <!-- 因为获取不到编辑器内图片框的值，用file代替 -->
        <input v-show="false" type="file" accept="image/jpeg,image/png,image/gif" ref="imgBtn" @change="onUpload">
    </div>

</template>

<script>
// 导入编辑器
import { quillEditor } from "vue-quill-editor";
export default {
    props: {
        size: {
            type: Number,
            default: 10485760
        },
        contentData: {
            type: String,
            default: ''
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
            btnLoading: false,
            content:``,
            addCardVisible: false,              //dialog显示
            selectCardVisible: false,           //dialog显示
            url: "",                            //dialog输入的url
            urlData: {
                errorProduct: [],
                errorUrl: [],
                productList: []
            },
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
        // 移除卡片
        closeCard(index) {
            this.urlData.productList.splice(index, 1);
        },
        // url获取卡片信息
        doSearch() {
            this.addCardVisible = false;
            this.btnLoading = true;
            var qs = require('qs');
            this.$ajax.post('/api/http/NoticeInfo/createCard.jhtml',
                qs.stringify({
                    cardUrl: 'https://www.zuipin.cn/goods?id=8669428&utm_source=zuipin,https://www.zuipin.cn/goods?id=8669425&utm_source=zuipin,zuipin.cn/goods?45465454654'
                    // this.url.replace(/[\r\n&]/g,',')
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then(res => {
                    this.btnLoading = false;
                    this.urlData = res.data.result;
                })
            this.selectCardVisible = true;
        },
        // 插入卡片
        insertCard() {
            this.selectCardVisible = false;
            // 插入卡片
            this.urlData.productList.map(v => {
                this.editor.focus();
                this.editor.insertText(this.editor.getSelection().index, `<卡片>\n标题：${v.proName}\n副标题：${v.catName}\n醉品价：${v.salesPrice}\n进货价：${v.purchasePrice}\n链接：${v.cardUrl}\nsku：${v.proSku}\n</卡片>`, {});
            })
        },
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
        onEditorBlur() {
            this.$emit('emitContent', this.editor.getContents())
        },
        // 编辑器文本改变，传递数据给父组件
        onEditorChange(v) {
            this.$emit('emitContent', v.html)
        },
        // 清除内容
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
hr {
    margin: 20px auto;
}
.cardWarp:hover .closeBtn {
    display: inline;
}
.cardWarp {
    background-color: #cccccc;
    margin: 10px auto;
    padding: 20px;
    width: 650px;
    position: relative;
    .closeBtn {
        background-color: #ff0000e3;
        color: #ffffff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        display: none;
    }
    .closeBtn:hover {
        background-color: #ff0000d5;
    }
    .cardBox {
        background-color: #ffffff;
        .cardLink {
            padding: 20px;
        }
        .cardMain {
            padding: 0px 15px 15px 15px;
            .cardImg {
                width: 180px;
                vertical-align: top;
                display: inline-block;
            }
            .cardInfo {
                height: 150px;
                display: inline-block;
                margin-left: 20px;
                .cardTitle {
                    width: 370px;
                    margin-top: 20px;
                    font-size: 18px;
                    font-weight: normal;
                    line-height: 19px;
                    color: #333333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .cardSubTitle {
                    margin-top: 10px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 15px;
                    color: #999999;
                }
                .price {
                    font-size: 14px;
                    line-height: 14px;
                    color: #999999;
                    margin: 0px 0px 19px 0px;
                    .ZPPrice {
                        color: #333333;
                        font-weight: 600;
                        margin-left: 20px;
                    }
                    .InPrice {
                        color: #ff0000e3;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 16px;
                        margin-left: 20px;
                    }
                }
            }
        }
    }
}
</style>
<style>
.editor {
    width: 1032px;
}
.quill-editor {
    height: 450px;
}
.editor .el-dialog__wrapper .el-dialog {
    width: 720px;
}
.editor .el-dialog__body {
    line-height: 20px;
}
</style>
