<template>
    <div id="rebate">
        <el-row class="content_title">
            <h2>Zuipin拓展返利设置</h2>
            <!-- <div class="content_closeBtn" @click="goBack">X</div> -->
        </el-row>
        <el-row class="text-wrap">
            <p>
                <span>进货款定义：</span>
                <span>首批进货款</span>
            </p>
        </el-row>
        

        <el-form ref="form"  label-width="200px">
          <el-row  class="text-wrap">
            <el-col  class="fl-left">
                <el-form-item label="时间周期：" >
                        <el-radio  v-model="form.zpTimeChose"  label="CONTRACT_TERM" >合同期</el-radio>
                        <el-radio v-model="form.zpTimeChose" label="TIME_RANGE">时间范围</el-radio>
                </el-form-item>
            </el-col>
        </el-row>
          <div v-if="form.zpTimeChose=='CONTRACT_TERM'">
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属单店返利点数：">
                          <el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpSingleRebate"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属区域代理返利点数：">
                          <el-input placeholder="请输入折扣率"  class="pencent-num" v-model="form.zpAreaRebate"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
          </div>
           
           <div  v-if="form.zpTimeChose=='TIME_RANGE'">
               <el-row>
                  <el-col :span="8">
                      <el-form-item label=" 1）正式签约起">
                          <el-input placeholder="请输入正整数"  class="sig-time1" v-model="form.zpTimeLimit.zpdateBefore"></el-input>
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
                      <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpSingleExtendsOne"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpSingleExtendsTwo"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpSingleExtendsThree"></el-input></td>
                    </tr>
                    <tr>
                      <td>所属区域代理</td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpAreaExtendsOne"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpAreaExtendsTwo"></el-input></td>
                      <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpAreaExtendsThree"></el-input></td>
                    </tr>
                    
                  </tbody>
                </table>
              </el-row>
              <el-row class="oter-time-wrap">
                  <el-col :span="8">
                      <el-form-item label=" 2）正式签约起">
                          <el-input placeholder="请输入正整数" class="sig-time2"  v-model="form.zpTimeLimit.zpdateAfter"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属单店返利点数：">
                          <el-input placeholder="请输入折扣率"  class="pencent-num" v-model="form.zpSingleRebate"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row class="fl-wrap">
                  <el-col :span="9">
                      <el-form-item label="所属区域代理返利点数：">
                          <el-input placeholder="请输入折扣率"  class="pencent-num" v-model="form.zpAreaRebate"></el-input>
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
                              <el-radio v-model="form.dlTimeChose"  label="CONTRACT_TERM">合同期</el-radio>
                              <el-radio v-model="form.dlTimeChose" label="TIME_RANGE">时间范围</el-radio>
                      </el-form-item>
                  </el-col>
            </el-row>
            <div  v-if="form.dlTimeChose=='CONTRACT_TERM'">
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数：">
                            <el-input placeholder="请输入折扣率"  class="pencent-num" v-model="form.dlSingleRebate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数：">
                            <el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlAreaRebate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div  v-if="form.dlTimeChose=='TIME_RANGE'">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label=" 1）正式签约起">
                            <el-input placeholder="请输入正整数"  class="sig-time1" v-model="form.dlTimeLimit.dldateBefore"></el-input>
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
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlTimeLimit.dlSingleExtendsOne"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlTimeLimit.dlSingleExtendsTwo"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlTimeLimit.dlSingleExtendsThree"></el-input></td>
                      </tr>
                      <tr>
                        <td>所属区域代理</td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlTimeLimit.dlAreaExtendsOne"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlTimeLimit.dlAreaExtendsTwo"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlTimeLimit.dlAreaExtendsThree"></el-input></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </el-row>
                <el-row class="oter-time-wrap">
                    <el-col :span="8">
                        <el-form-item label=" 2）正式签约起">
                            <el-input placeholder="请输入正整数" class="sig-time2" v-model="form.dlTimeLimit.dldateAfter"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数：">
                            <el-input placeholder="请输入折扣率"  class="pencent-num" v-model="form.dlSingleRebate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数：">
                            <el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.dlAreaRebate" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <!-- <el-row style="margin-top:20px;">
                <el-button @click="goBack">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </el-row> -->
        </el-form>
    </div>
</template>
<script type="text/javascript" src="../router.js"></script>
<script>
// import quillEditor from "../components/editor.vue";
// let qs = require("qs");
export default {
  data() {
    return {
      form:{
        dlTimeChose:"CONTRACT_TERM",
        zpTimeChose:"TIME_RANGE",
        zpSingleRebate:"",
        zpAreaRebate:"",
        zpTimeLimit:{
          zpdateBefore:"",
          zpSingleExtendsOne:"",
          zpSingleExtendsTwo:"",
          zpSingleExtendsThree:"",
          zpAreaExtendsOne:"",
          zpAreaExtendsTwo:"",
          zpAreaExtendsThree:"",
          zpdateAfter:"",
        },
        dlSingleRebate:"",
        dlAreaRebate:"",
        dlTimeLimit:{
          dldateBefore:"",
          dlSingleExtendsOne:"",
          dlSingleExtendsTwo:"",
          dlSingleExtendsThree:"",
          dlAreaExtendsOne:"",
          dlAreaExtendsTwo:"",
          dlAreaExtendsThree:"",
          dldateAfter:"",
        },
      },
    };
  },
  // components: {
  //   quillEditor
  // },
  methods: {
    // goBack() {
    //   this.$confirm(`你确定要放弃编辑吗？`, "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     this.$router.push("/message");
    //     this.$message("取消成功");
    //   });
    // },
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
  },
  created() {
    if (!this.checkSession()) return;
        this.$getData({
            url: 'http/businessExtendsRule/getBusinessExtendsRuleDetail.jhtml',
            success(response) {
                console.log(response.data);
                this.form.zpTimeChose = response.data.result.zuipinCycleTime;
                this.form.dlTimeChose = response.data.result.agentCycleTime;
                this.form.zpTimeLimit.zpdateBefore = response.data.result.zuipinContractDaysInner;
                this.form.zpTimeLimit.zpSingleExtendsOne = response.data.result.zuipinSingleExtendsOne;
                this.form.zpTimeLimit.zpSingleExtendsTwo = response.data.result.zuipinSingleExtendsTwo;
                this.form.zpTimeLimit.zpSingleExtendsThree = response.data.result.zuipinSingleExtendsThree;
                this.form.zpTimeLimit.zpAreaExtendsOne = response.data.result.zuipinAreaExtendsOne;
                this.form.zpTimeLimit.zpAreaExtendsTwo = response.data.result.zuipinAreaExtendsTwo;
                this.form.zpTimeLimit.zpAreaExtendsThree = response.data.result.zuipinAreaExtendsThree;
                this.form.zpTimeLimit.zpdateAfter = response.data.result.zuipinContractDaysAfter;
                this.form.zpSingleRebate = response.data.result.zuipinSingleRebate;
                this.form.zpAreaRebate = response.data.result.zuipinAreaRebate;

                this.form.dlTimeLimit.dldateBefore = response.data.result.agentContractDaysInner;
                this.form.dlTimeLimit.dlSingleExtendsOne = response.data.result.agentSingleExtendsOne;
                this.form.dlTimeLimit.dlSingleExtendsTwo = response.data.result.agentSingleExtendsTwo;
                this.form.dlTimeLimit.dlSingleExtendsThree = response.data.result.agentSingleExtendsThree;
                this.form.dlTimeLimit.dlAreaExtendsOne = response.data.result.agentAreaExtendsOne;
                this.form.dlTimeLimit.dlAreaExtendsTwo = response.data.result.agentAreaExtendsTwo;
                this.form.dlTimeLimit.dlAreaExtendsThree = response.data.result.agentAreaExtendsThree;
                this.form.dlTimeLimit.dldateAfter = response.data.result.agentContractDaysAfter;
                this.form.dlSingleRebate = response.data.result.agentSingleRebate;
                this.form.dlAreaRebate = response.data.result.agentAreaRebate;

            },
            fail(response) {
                this.$message({
                    message: response.data.msg,
                    type: 'error'
                })
            },
        });
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

