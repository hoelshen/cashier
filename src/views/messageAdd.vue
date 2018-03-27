<template>
    <div id="addMessage">
        <el-row class="content_title">
            <h2>基本信息</h2>
            <router-link class="content_closeBtn" :to="{path:'message'}">X</router-link>
        </el-row>
        <el-form ref="form" v-model="contentData" label-width="90px">
            <el-row>
                <el-col :span="16">
                    <el-form-item label="通知标题:">
                        <el-input v-model="contentData.title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="通知类型：">
                        <el-select v-model="contentData.type">
                            <el-option value="newPro" label="新品"></el-option>
                            <el-option value="systemMessage" label="系统公告"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="通知状态：">
                        <el-select v-model="contentData.status" clearable placeholder="请选择">
                            <el-option value="1" label="启用"></el-option>
                            <el-option value="2" label="禁用"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="代理商类型：" label-width="110px">
                        <el-select v-model="contentData.agent" clearable placeholder="请选择" multiple>
                            <el-option value="31" label="单店代理"></el-option>
                            <el-option value="265" label="区域代理"></el-option>
                            <el-option value="266" label="专柜代理"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <quill-editor ref="myEditor" :getContent="contentData.content" @getContent="getContent"></quill-editor>
            <el-row style="margin-top:20px;">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="look">预览</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-row>
        </el-form>
    </div>
</template>
<script type="text/javascript" src="../router.js"></script>
<script>
import quillEditor from "../components/editor.vue";
let qs = require('qs');
export default {
    data() {
        return {
            dialogFormVisible: false,    //dialog
            id: '',
            contentData: {
                title: "",      //标题
                type: "",       //通知类型
                status: "",     //通知状态
                agent: "",      //代理商类型
                content:'',     //内容
                url: "",        //url
            },
            content: "",
        };
    },
    components: {
        quillEditor
    },
    methods: {
        //判断是否超时
        checkSession() {
            const self = this;
            if (window.sessionStorage) {
                let nowDate = new Date().getTime();
                let time = (nowDate - sessionStorage.haha) / 1000
                //超过30秒没操作，重新登录
                if (time > 1800) {
                    self.$router.push('/login');
                    self.$message({
                        message: '登录超时，请重新登录',
                    })
                    return false;
                } else {
                    sessionStorage.haha = nowDate;
                    return true;
                }
            }
        },
        getContent(data) {
            this.content = data;
        },
        save() {
            if (!this.contentData.title || !this.contentData.type || !this.content || this.contentData.agent.length < 1) {
                this.$message({
                    message: "必填项不能为空",
                    type: 'warning'
                })
                return;
            }
            this.$ajax.post('/api/http/NoticeInfo/saveOrUpdateNoticeInfo.jhtml',
                qs.stringify({
                    'noticeInfo.id':this.user.id,
                    'noticeInfo.noticeTitle': this.contentData.title,
                    'noticeInfo.noticeType': this.contentData.type,
                    'noticeInfo.noticeContent': this.content,
                    'noticeInfo.status': this.contentData.status,
                    'noticeInfo.agentType': this.contentData.agent.length > 1 ? this.contentData.agent.join(',') : this.contentData.agent[0],
                    'noticeInfo.updateId': this.user.id
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            ).then(res => {
                console.log(res);
                if (res.data.success === 1) {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.$router.push('/message');
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        look() {
            let routerNow = this.$router.resolve({
                path: '/lookMsg',
                query: {
                    content: this.content
                }
            });
            window.open(routerNow.href, '_blank');
        }
    },
    computed: {

    },
    created() {
        if (!this.checkSession()) return;
        this.id = this.$route.params.id;
        if (sessionStorage.user) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
        if (this.id) {
            this.$ajax.post('/api/http/NoticeInfo/getNoticeInfoDetail.jhtml',
                qs.stringify({
                    'noticeId': this.id,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            ).then(res => {
                console.log(res);
                if (res.data.success === 1) {
                    this.contentData.content = res.data.result.noticeContent;
                    this.contentData.title = res.data.result.noticeTitle;
                    this.contentData.type = res.data.result.noticeType;
                    this.contentData.status = res.data.result.status.toString();
                    this.contentData.agent.push(res.data.result.agentType);
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
#addMessage {
    width: 98%;
    margin: 1%;
    padding: 20px;
    background-color: #ffffff;
    .content_title {
        margin: 0px 10px 10px 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid;
        h2 {
            display: inline;
            font-weight: 600;
        }
        .content_closeBtn {
            font-size: 19px;
            float: right;
            color: #0000ff9e;
        }
    }
}
</style>

