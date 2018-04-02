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
        <el-dialog title="插入卡片" :visible.sync="addCardVisible" width="20%">
            <label>链接：</label>
            <el-input type="textarea" v-model="url" resize="none" placeholder="请输入您想要插入的商品链接，将以卡片的形式展示出来哟~（支持多个，批量操作需换行）"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCardVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSearch" :loading="btnLoading">获取信息</el-button>
            </div>
        </el-dialog>
        <!-- 卡片选择dialog -->
        <el-dialog title="商品信息" class="card-dialog" :visible.sync="selectCardVisible">
            <label class="card-box-error" v-if="urlData.errorUrl.length > 0 || urlData.errorProduct.length > 0">以下商品存在问题,请检查后重试</label>
            <div class="card-error" v-if="urlData.errorUrl.length > 0">
                <label style="color:rgba(255, 51, 51, 0.83)">链接不正确</label>
                <p v-for="url in urlData.errorUrl">{{ url }}</p>
            </div>
            <div class="card-error" v-if="urlData.errorProduct.length > 0">
                <label style="color:rgba(255, 51, 51, 0.83)">商品不存在</label>
                <p v-for="url in urlData.errorProduct">{{ url }}</p>
            </div>
            <div class="card-box-hr" v-if="urlData.errorUrl.length > 0 || urlData.errorProduct.length > 0"></div>
            <label class="card-box-true" v-if="urlData.productList.length > 0">可以选择先插入以下商品卡片</label>
            <div class="cardWarp" v-if="urlData.productList.length > 0 " v-for="(item,index) in urlData.productList">
                <template>
                    <div class="cardBox">
                        <div class="closeBtn" @click="closeCard(index)"></div>
                        <p class="cardLink">链接：{{item.cardUrl}}
                        </p>
                        <div class="cardMain">
                            <img class="cardImg" :src="item.imgUrl">
                            <div class="cardInfo">
                                <div class="cardTitle" :title="item.title">{{ item.title }}</div>
                                <div class="cardSubTitle" :title="item.subTitle">{{item.subTitle}}</div>
                                <div class="card-box-hr"></div>
                                <div class="price">醉品价
                                    <span class="ZPPrice">￥{{ toFixed(item.salesPrice) }}</span>
                                </div>
                                <div class="price" style="margin:0px;">进货价
                                    <span class="InPrice">￥{{ toFixed(item.purchasePrice) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div slot="footer" class="dialog-footer">
                <span class="explain-price">价格说明：不同的代理商会显示各自的进货价</span>
                <el-button @click="selectCardVisible = false">取 消</el-button>
                <el-button v-if="urlData.productList.length > 0" type="primary" @click="insertCard">插入卡片</el-button>
            </div>
        </el-dialog>
        <!-- 因为获取不到编辑器内图片框的值，用file代替 -->
        <input v-show="false" type="file" accept="image/jpeg,image/png,image/gif" ref="imgBtn" @change="onUpload">
    </div>

</template>

<script>
// 导入编辑器
import { quillEditor } from "vue-quill-editor";
import $ from "jquery";
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
            content: ``,
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
        // 保留两位小数
        toFixed(num) {
            return Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3);
        },
        // 移除卡片
        closeCard(index) {
            this.urlData.productList.splice(index, 1);
        },
        // url获取卡片信息
        doSearch() {
            if (this.url && !/,/g.test(this.url)) {
                this.addCardVisible = false;
                this.btnLoading = true;
                var qs = require('qs');
                this.$ajax.post('/api/http/NoticeInfo/createCard.jhtml',
                    qs.stringify({
                        cardUrl: this.url.replace(/[\r\n]/g, ',')
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
            } else {
                this.$message({
                    message: 'url不能为空,且回车分隔！',
                    type: 'warning'
                })
            }
        },
        // 插入卡片
        insertCard() {
            this.selectCardVisible = false;
            // 插入卡片
            this.urlData.productList.map(v => {
                this.editor.focus();
                this.editor.insertText(this.editor.getSelection().index, `\n卡片\n标题：${v.title}\n副标题：${v.subTitle}\n醉品价：${this.toFixed(v.salesPrice)}\n进货价：${this.toFixed(v.purchasePrice)}\n链接：${v.cardUrl}\nsku：##${v.proSku}##\n/卡片`, {});
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
            // $.getJSON({
            //     // async: true,
            //     url: "http://java.cbs.test.yipicha.com/cbttest/oteao/file/getSignature",
            //     type: "POST",
            //     dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
            //     // jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
            //     jsonpCallback: 'handleResponse', //设置回调函数名
            //     success: function (response, status, xhr) {
            //         console.log('状态为：' + status + ',状态是：' + xhr.statusText);
            //         console.log(response);
            //     }
            // });
            return new Promise((resolve, reject) => {
                this.$ajax.post('/cbttest/oteao/file/getSignature',).then((res) => {
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
            this.$emit('emitContent', this.contentData)
        },
        // 编辑器文本改变，传递数据给父组件
        onEditorChange(v) {
            this.$emit('emitContent', this.contentData)
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
    margin: 19px auto;
}
.cardWarp:hover .closeBtn {
    display: inline;
}
.card-box-error::before {
    content: "\FF01";
    width: 16px;
    display: inline-block;
    text-align: center;
    height: 16px;
    border-radius: 50%;
    background-color: #ff3333;
    color: #ffffff;
    margin-right: 5px;
    line-height: 16px;
}
.card-box-true {
    padding-left: 22px;
    background: url("../assets/images/sy_ic_zq.png") no-repeat;
}
.card-box-hr {
    background-color: #e6e6e6;
    width: 820px;
    height: 1px;
    margin: 20px auto 20px 2px;
}
.card-error {
    padding-left: 13px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 15px;
    width: 820px;
    background-color: #fff6eb;
}
.explain-price {
    float: left;
    background: url("../assets/images/sy_ic_bz.png") no-repeat;
    padding-left: 18px;
    margin-top: 15px;
}
.cardWarp {
    background-color: #f2f4f5;
    margin-top: 18px;
    width: 820px;
    position: relative;
    .closeBtn {
        background: url("../assets/images/sy_ic_gb.png");
        background-color: #ff0000e3;
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
        .cardLink {
            padding: 14px 20px;
        }
        .cardMain {
            width: 786px;
            margin: 13px 14px 0px 20px;
            padding-bottom: 18px;
            .cardImg {
                width: 128px;
                vertical-align: top;
                display: inline-block;
            }
            .cardInfo {
                display: inline-block;
                margin-left: 15px;
                .card-box-hr {
                    width: 90%;
                    margin: 19px auto 19px 0px;
                }
                .cardTitle {
                    width: 550px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 14px;
                    color: #333333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .cardSubTitle {
                    margin-top: 14px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 15px;
                    color: #999999;
                }
                .price {
                    font-size: 14px;
                    line-height: 14px;
                    color: #999999;
                    margin: 0px 0px 14px 0px;
                    .ZPPrice {
                        color: #333333;
                        font-weight: 600;
                        margin-left: 20px;
                    }
                    .InPrice {
                        color: #ff9819;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 14px;
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
    width: 500px;
}
.editor .card-dialog .el-dialog {
    width: 888px;
}
.editor .el-dialog__body {
    line-height: 20px;
}
</style>
