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
                            <el-option value="ALL" label="全部"></el-option>
                            <el-option value="NEW" label="新品"></el-option>
                            <el-option value="NEWS" label="系统公告"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="通知状态：">
                        <el-select v-model="contentData.status" clearable placeholder="请选择">
                            <el-option value="ALL" label="全部"></el-option>
                            <el-option value="ENABLE" label="启用"></el-option>
                            <el-option value="DISENABLE" label="禁用"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="代理商类型：" label-width="110px">
                        <el-select v-model="contentData.agent" clearable placeholder="请选择" multiple>
                            <el-option value="ALL" label="全部"></el-option>
                            <el-option value="ENABLE" label="单店代理"></el-option>
                            <el-option value="DISENABLE" label="区域代理"></el-option>
                            <el-option value="DISENABLE" label="专柜代理"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <quill-editor ref="myEditor" @getContent="getContent"></quill-editor>
        </el-form>
    </div>
</template>
<script type="text/javascript" src="../router.js"></script>
<script>
import  quillEditor  from "../components/editor.vue";
export default {
    data() {
        return {
            dialogFormVisible: false,    //dialog
            contentData: {
                title: "",      //标题
                type: "",       //通知类型
                status: "",     //通知状态
                agent: "",      //代理商类型
                url: "",        //url
            },
            content:"",
        };
    },
    components: {
        quillEditor
    },
    methods: {
        getContent(data){
            this.content = data;
        }
    },
    computed: {
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

