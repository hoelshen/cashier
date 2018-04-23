<template>
    <div id="rebate">
        <el-row class="content_title">
            <h2>Zuipin拓展返利设置</h2>
            <div class="content_closeBtn" @click="goBack">X</div>
        </el-row>
        <el-row class="text-wrap">
            <p>
                <span>进货款定义：</span>
                <span>首批进货款</span>
            </p>
        </el-row>
        

        <el-form ref="form" v-model="contentData" label-width="200px">
          <el-row  class="text-wrap">
            <el-col  class="fl-left">
                <el-form-item label="时间周期：" >
                        <el-radio  v-model="zpTimeChose"  label="1" >合同期</el-radio>
                        <el-radio v-model="zpTimeChose" label="2">时间范围</el-radio>
                </el-form-item>
            </el-col>
        </el-row>
          <div v-if="zpTimeChose==1">
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属单店返利点数：">
                          <el-input placeholder="请输入折扣率" class="pencent-num"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属区域代理返利点数：">
                          <el-input placeholder="请输入折扣率"  class="pencent-num"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
          </div>
           
           <div  v-if="zpTimeChose==2">
               <el-row>
                  <el-col :span="8">
                      <el-form-item label=" 1）正式签约起">
                          <el-input placeholder="请输入正整数"  class="sig-time1"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
            
              <el-row class="rebate-tabel">
                <table>
                  <tbody>
                    <tr>
                      <th>返利点数</th>
                      <th>拓展第 1 家</th>
                      <th>拓展第 2 家</th>
                      <th>拓展第 3 家及以上</th>
                    </tr>
                    <tr>
                      <td>所属单店</td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                    </tr>
                    <tr>
                      <td>所属区域代理</td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                    </tr>
                    
                  </tbody>
                </table>
              </el-row>
              <el-row class="oter-time-wrap">
                  <el-col :span="8">
                      <el-form-item label=" 2）正式签约起">
                          <el-input placeholder="请输入正整数" class="sig-time2"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属单店返利点数：">
                          <el-input placeholder="请输入折扣率"  class="pencent-num"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属区域代理返利点数：">
                          <el-input placeholder="请输入折扣率"  class="pencent-num"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
           </div>
           
            <el-row class="dl-rebate-title">
              <h2>代理商拓展返利设置</h2>
            </el-row>
            <el-row class="text-wrap">
                <p>
                    <span>进货款定义：</span>
                    <span>首批进货款</span>
                </p>
            </el-row>
            <el-row class="text-wrap">
                  <el-col :span="12" class="fl-left">
                      <el-form-item label="时间周期：">
                              <el-radio v-model="dlTimeChose"  label="1">合同期</el-radio>
                              <el-radio v-model="dlTimeChose" label="2">时间范围</el-radio>
                      </el-form-item>
                  </el-col>
            </el-row>
            <div  v-if="dlTimeChose==1">
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数：">
                            <el-input placeholder="请输入折扣率"  class="pencent-num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数：">
                            <el-input placeholder="请输入折扣率" class="pencent-num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div  v-if="dlTimeChose==2">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label=" 1）正式签约起">
                            <el-input placeholder="请输入正整数"  class="sig-time1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
              
                <el-row class="rebate-tabel">
                  <table>
                    <tbody>
                      <tr>
                        <th>返利点数</th>
                        <th>拓展第 1 家</th>
                        <th>拓展第 2 家</th>
                        <th>拓展第 3 家及以上</th>
                      </tr>
                      <tr>
                        <td>所属单店</td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                      </tr>
                      <tr>
                        <td>所属区域代理</td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num"></el-input></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </el-row>
                <el-row class="oter-time-wrap">
                    <el-col :span="8">
                        <el-form-item label=" 2）正式签约起">
                            <el-input placeholder="请输入正整数" class="sig-time2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数：">
                            <el-input placeholder="请输入折扣率"  class="pencent-num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数：">
                            <el-input placeholder="请输入折扣率" class="pencent-num" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-row style="margin-top:20px;">
                <el-button @click="goBack">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </el-row>
        </el-form>
    </div>
</template>
<script type="text/javascript" src="../router.js"></script>
<script>
import quillEditor from "../components/editor.vue";
let qs = require("qs");
export default {
  data() {
    return {
      // dialogFormVisible: false, //dialog
      id: "",
      contentData: {
        title: "", //标题
        type: "", //通知类型
        status: "1", //通知状态
        agent: "", //代理商类型
        content: "", //内容
        url: "" //url
      },
      nowContent: "",
      dlTimeChose:"2",
      zpTimeChose:"1",
    };
  },
  components: {
    quillEditor
  },
  methods: {
    goBack() {
      this.$confirm(`你确定要放弃编辑该通知吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/message");
        this.$message("取消成功");
      });
    },
    //判断是否超时
    checkSession() {
      const self = this;
      if (window.sessionStorage) {
        let nowDate = new Date().getTime();
        let time = (nowDate - sessionStorage.haha) / 1000;
        //超过30秒没操作，重新登录
        if (time > 1800) {
          self.$router.push("/login");
          self.$message({
            message: "登录超时，请重新登录"
          });
          return false;
        } else {
          sessionStorage.haha = nowDate;
          return true;
        }
      }
    },
    emitContent(data) {
      this.contentData.content = data;
    },
    save() {
      if (
        !this.contentData.title ||
        !this.contentData.type ||
        !this.contentData.content ||
        this.contentData.agent.length < 1
      ) {
        this.$message({
          message: "保存失败！必填项未填写",
          type: "warning"
        });
        return;
      }
      if (this.contentData.title.trim().length > 50) {
        this.$message({
          message: "通知标题长度不超过50个字符",
          type: "warning"
        });
        return;
      }
      this.$confirm(
        `你确定要保存${
          this.contentData.status === "1" ? "并启用" : ""
        }该通知吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$ajax
          .post(
            "/api/http/NoticeInfo/saveOrUpdateNoticeInfo.jhtml",
            qs.stringify({
              "noticeInfo.id": this.$route.params.id
                ? this.$route.params.id
                : null,
              "noticeInfo.noticeTitle": this.contentData.title,
              "noticeInfo.noticeType": this.contentData.type,
              "noticeInfo.noticeContent": this.contentData.content,
              "noticeInfo.status": this.contentData.status,
              "noticeInfo.agentType":
                this.contentData.agent.length > 1
                  ? this.contentData.agent.join(",")
                  : this.contentData.agent[0],
              "noticeInfo.updateId": this.user.id
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            if (res.data.success === 1) {
              this.$message({
                message: `保存“通知：【${this.contentData.title}】”成功~`,
                type: "success"
              });
              this.$router.push("/message");
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
      });
    },
    look() {
      let routerNow = this.$router.resolve({
        path: "/lookMsg",
        query: {
          content: this.contentData.content,
          title: this.contentData.title
        }
      });
      window.open(routerNow.href, "_blank");
    }
  },
  created() {
    if (!this.checkSession()) return;
    this.id = this.$route.params.id;
    if (sessionStorage.user) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
    if (this.id) {
      this.$ajax
        .post(
          "/api/http/NoticeInfo/getNoticeInfoDetail.jhtml",
          qs.stringify({
            noticeId: this.$route.params.id
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          if (res.data.success === 1) {
            this.contentData.content = res.data.result.noticeContent;
            this.contentData.title = res.data.result.noticeTitle;
            this.contentData.type = res.data.result.noticeType;
            this.contentData.status = res.data.result.status.toString();
            this.contentData.agent = this.contentData.agent.concat(
              res.data.result.agentType.split(",")
            );
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
#rebate {
  width: 98%;
  margin: 1%;
  padding: 20px;
  background-color: #ffffff;
  .el-row {
    padding: 0 15px;
  }
  .content_title {
    margin: 0px 10px 10px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid;
    padding: 0 0 10px 0;
    h2 {
      display: inline;
      font-weight: 600;
      font-weight: normal;
    }
    .content_closeBtn {
      font-size: 19px;
      float: right;
      color: #0000ff9e;
      cursor: pointer;
    }
  }
  .dl-rebate-title {
    margin: 0px 10px 10px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid;
    padding: 0 0 10px 0;
    h2 {
      display: inline;
      font-weight: 600;
      font-weight: normal;
    }
  }
  #timeRang {
    margin-left: 20px;
  }

  .rebate-tabel {
    text-align: center;
    table {
      border-collapse: collapse;
    }

    table,
    th,
    td {
      border: 1px solid #999999;
    }
    tr {
      width: 800px;
      height: 40px;
      line-height: 40px;
    }
    td {
      padding: 10px 20px;
    }
  }
  .text-wrap {
    padding: 10px;
    
  }
  .oter-time-wrap {
    padding-top: 50px;
  }
  .fl-wrap {
    margin-left: 100px;
  }
  .sig-time1 {
    position: relative;
  }
  .sig-time1:after {
    content: "天内";
    width: 38px;
    height: 33px;
    display: block;
    position: absolute;
    top: 2px;
    right: -50px;
    color: #48576a;
  }
  .sig-time2 {
    position: relative;
  }
  .sig-time2:after {
    content: "天后";
    width: 38px;
    height: 33px;
    display: block;
    position: absolute;
    top: 2px;
    right: -50px;
    color: #48576a;
  }
  .fl-left{
    margin-left: -120px;
  }
  .el-input{
    position: relative;
  }
  .el-input.pencent-num:after{
    content: "%";
    width: 15px;
    height: 15px;
    display: block;
    position: absolute;
    top: 0;
    right: 10px;
  }
}
</style>

