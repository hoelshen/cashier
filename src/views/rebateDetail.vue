<template>
    <!-- 详情列表 -->
      <div class="rebate">
          
        <el-form ref="form1" >
            <el-row>
                <el-col>
                    <el-form-item label="规则名称：">
                        <span>茶集政策04.15，2018 - 代理商业务拓展返利</span>
                        <span class="defaults-rules">
                            默认规则
                        </span>
                        <!-- <div class="content_closeBtn" @click="goBack">X</div> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="适配代理商：">
                        <el-button type="primary" @click="relatedAgenciesData">查看详情</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="content_title">
                <h2>Zuipin拓展返利设置</h2>
                
            </el-row>
            <el-row class="text-wrap">
                <p>
                    <span>进货款定义：</span>
                    <span>首批进货款</span>
                </p>
            </el-row>
          

          
            <el-row  class="text-wrap">
              <el-col >
                  <el-form-item label="时间周期：" >
                          <el-radio  v-model="form.zpTimeChose"  label="CONTRACT_TERM" disabled>合同期</el-radio>
                          <el-radio v-model="form.zpTimeChose" label="TIME_RANGE" disabled>时间范围</el-radio>
                  </el-form-item>
              </el-col>
          </el-row>
            <div v-if="form.zpTimeChose=='CONTRACT_TERM'">
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属单店返利点数：" label-width="300px">
                            <el-input placeholder="请输入折扣率"  v-model="form.zpSingleRebate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属区域代理返利点数：" label-width="300px">
                            <el-input placeholder="请输入折扣率" v-model="form.zpAreaRebate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div  v-if="form.zpTimeChose=='TIME_RANGE'">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label=" 1）正式签约起" label-width="200px">
                            <el-input placeholder="请输入正整数"  class="sig-time1" v-model="form.zpTimeLimit.zpdateBefore" disabled></el-input>
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
                          <td>{{form.zpTimeLimit.zpSingleExtendsOne | number}}</td>
                          <td>{{form.zpTimeLimit.zpSingleExtendsTwo | number}}</td>
                          <td>{{form.zpTimeLimit.zpSingleExtendsThree | number}}</td>
                      </tr>
                      <tr>
                          <td>所属区域代理</td>
                          <td>{{form.zpTimeLimit.zpAreaExtendsOne | number}}</td>
                          <td>{{form.zpTimeLimit.zpAreaExtendsTwo | number}}</td>
                          <td>{{form.zpTimeLimit.zpAreaExtendsThree | number}}</td>
                      </tr>
                    </tbody>
                  </table>
                </el-row>
                <el-row class="oter-time-wrap">
                    <el-col :span="8">
                        <el-form-item label=" 2）正式签约起" label-width="200px">
                            <el-input placeholder="请输入正整数" class="sig-time2"  v-model="form.zpTimeLimit.zpdateAfter" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属单店返利点数：" label-width="300px">
                            <el-input placeholder="请输入折扣率"   v-model="form.zpSingleRebate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属区域代理返利点数：" label-width="300px">
                            <el-input placeholder="请输入折扣率"   v-model="form.zpAreaRebate" disabled></el-input>
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
                    <el-col :span="12">
                        <el-form-item label="时间周期：" label-width="200px">
                                <el-radio v-model="form.dlTimeChose"  label="CONTRACT_TERM" disabled>合同期</el-radio>
                                <el-radio v-model="form.dlTimeChose" label="TIME_RANGE" disabled>时间范围</el-radio>
                        </el-form-item>
                    </el-col>
              </el-row>
              <div  v-if="form.dlTimeChose=='CONTRACT_TERM'">
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属单店返利点数：" label-width="300px">
                              <el-input placeholder="请输入折扣率" v-model="form.dlSingleRebate" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属区域代理返利点数：" label-width="300px">
                              <el-input placeholder="请输入折扣率" v-model="form.dlAreaRebate" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              
              <div  v-if="form.dlTimeChose=='TIME_RANGE'">
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label=" 1）正式签约起" label-width="200px">
                              <el-input placeholder="请输入正整数"  class="sig-time1" v-model="form.dlTimeLimit.dldateBefore" disabled></el-input>
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
                          <td>{{form.dlTimeLimit.dlSingleExtendsOne | number}}</td>
                          <td>{{form.dlTimeLimit.dlSingleExtendsTwo | number}}</td>
                          <td>{{form.dlTimeLimit.dlSingleExtendsThree | number}}</td>
                      </tr>
                      <tr>
                          <td>所属区域代理</td>
                          <td>{{form.dlTimeLimit.dlAreaExtendsOne | number}}</td>
                          <td>{{form.dlTimeLimit.dlAreaExtendsTwo | number}}</td>
                          <td>{{form.dlTimeLimit.dlAreaExtendsThree | number}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </el-row>
                  <el-row class="oter-time-wrap">
                      <el-col :span="8">
                          <el-form-item label=" 2）正式签约起" label-width="200px">
                              <el-input placeholder="请输入正整数" class="sig-time2" v-model="form.dlTimeLimit.dldateAfter" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属单店返利点数：" label-width="300px">
                              <el-input placeholder="请输入折扣率"   v-model="form.dlSingleRebate" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属区域代理返利点数：" label-width="300px">
                              <el-input placeholder="请输入折扣率"  v-model="form.dlAreaRebate"  disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              <!-- <el-row style="margin-top:20px;">
                  <el-button @click="goBack">取消</el-button>
                  <el-button type="primary" @click="save">保存</el-button>
              </el-row> -->
          </el-form>

          <!-- 查看关联代理商(编号：xxx) start -->
            <el-dialog :title="relatedAgenciesTitle" :visible.sync="relatedAgencies"  size="140%">
                <div>
                    <el-table :data="relatedAgenciesForm"  style="width: 100%">
                      <el-table-column type="index" label="序列"  width="80">
                      </el-table-column>
                      <el-table-column prop="agentNo" label="代理商编号" width="127">
                      </el-table-column>
                      <el-table-column prop="agentName" label="代理商姓名" width="150">
                      </el-table-column>
                      <el-table-column prop="agentGradeId" label="代理商等级" width="127">
                           <template slot-scope="scope">
                                <span v-if="scope.row.agentGradeId  == '266'">微店代理</span>
                                <span v-if="scope.row.agentGradeId  == '265'">区域代理</span>
                                <span v-if="scope.row.agentGradeId  == '31'">单店代理</span>
                            </template>
                      </el-table-column>
                      <el-table-column prop="registTime" label="店铺注册" width="127">
                      </el-table-column>
                      <el-table-column prop="relationType" label="关系" width="127">
                            <template slot-scope="scope">
                                <span v-if="scope.row.relationType  == 'ZUIPIN_EXTEND'">醉品开发</span>
                                <span v-if="scope.row.relationType  == 'BUSINESS_EXTEND'">业务拓展</span>
                                <span v-if="scope.row.relationType  == 'IMMEDIATE_SUPER'">直接上级</span>
                            </template>
                      </el-table-column>
                  </el-table>
                </div>
                <div class="plPage clearfix"    >
                    <el-pagination style="margin-top: 10px;float: right;"  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout=" prev, pager, next, jumper" :total="totalSize" >
                    </el-pagination>
                </div>
                <div slot="footer"   class="dialog-footer">
                </div>
            </el-dialog>
            <!-- end -->
      </div>
</template>
<script type="text/javascript" src="../router.js"></script>
<script>
// import quillEditor from "../components/editor.vue";
// let qs = require("qs");
export default {
  data() {
    return {
        relatedAgencies:false,
        relatedAgenciesTitle:"",
        currentPage: 1,
        totalSize: 0,
        pageSize: 30,
        ifEdit:false,
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
      relatedAgenciesForm:""
    };
  },
  // components: {
  //   quillEditor
  // },
   filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal+"%";
    }
  },
  methods: {
    goBack() {
      this.$confirm(`你确定要放弃编辑吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/rebate");
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
    handleCurrentChange(val) {
        let self = this;
        self.currentPage = val;
        self.relatedAgenciesData();
    },
    relatedAgenciesData(shopNo){
        this.relatedAgenciesTitle = "关联代理商（规则编号：" + shopNo + "）"
        if (!this.checkSession()) return; 
        const self = this;               
        self.relatedAgencies = true;
        self.loading = true;
        let url = '' 
        self.$ajax({
                url: url,
                 method: 'post',
                 data: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                    'searchAnnualPerformanceOrderVo.shopNo':shopNo
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret;
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                // console.log(response)
                self.loading = false;
             if (response.data.success == 1) {
                    self.relatedAgenciesForm = response.data.result;
                    self.totalSize = response.data.totalNums;
                   
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            
        }).catch(function (err) {
            self.loading = false;
            console.log(err);
        });
    }
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
                this.form.zpTimeLimit.zpSingleExtendsOne = response.data.result.zuipinSingleExtendsOne*100;
                this.form.zpTimeLimit.zpSingleExtendsTwo = response.data.result.zuipinSingleExtendsTwo*100;
                this.form.zpTimeLimit.zpSingleExtendsThree = response.data.result.zuipinSingleExtendsThree*100;
                this.form.zpTimeLimit.zpAreaExtendsOne = response.data.result.zuipinAreaExtendsOne*100;
                this.form.zpTimeLimit.zpAreaExtendsTwo = response.data.result.zuipinAreaExtendsTwo*100;
                this.form.zpTimeLimit.zpAreaExtendsThree = response.data.result.zuipinAreaExtendsThree*100;
                this.form.zpTimeLimit.zpdateAfter = response.data.result.zuipinContractDaysAfter;
                this.form.zpSingleRebate = (response.data.result.zuipinSingleRebate*100).toFixed(2)+"%";
                this.form.zpAreaRebate = (response.data.result.zuipinAreaRebate*100).toFixed(2)+"%";

                this.form.dlTimeLimit.dldateBefore = response.data.result.agentContractDaysInner;
                this.form.dlTimeLimit.dlSingleExtendsOne = response.data.result.agentSingleExtendsOne*100;
                this.form.dlTimeLimit.dlSingleExtendsTwo = response.data.result.agentSingleExtendsTwo*100;
                this.form.dlTimeLimit.dlSingleExtendsThree = response.data.result.agentSingleExtendsThree*100;
                this.form.dlTimeLimit.dlAreaExtendsOne = response.data.result.agentAreaExtendsOne*100;
                this.form.dlTimeLimit.dlAreaExtendsTwo = response.data.result.agentAreaExtendsTwo*100;
                this.form.dlTimeLimit.dlAreaExtendsThree = response.data.result.agentAreaExtendsThree*100;
                this.form.dlTimeLimit.dldateAfter = response.data.result.agentContractDaysAfter;
                this.form.dlSingleRebate = (response.data.result.agentSingleRebate*100).toFixed(2)+"%";
                this.form.dlAreaRebate = (response.data.result.agentAreaRebate*100).toFixed(2)+"%";
                //  if(response.data.result.agentSingleRebate||response.data.result.agentSingleRebate=='0'){
                //         this.ifEdit=true;
                //     }else{
                //         this.ifEdit=false;
                //     }
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
.rebate {
  width: 98%;
  margin: 1%;
  padding: 20px;
  background-color: #ffffff;
  .content_closeBtn {
      font-size: 19px;
      float: right;
      color: #0000ff9e;
      cursor: pointer;
    }
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
    // margin-left: 100px;
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
.rebate-tabel .el-form-item{
    margin-bottom: 0;
}
.rebate .rebate-tabel tr td{
    width: 200px;
}
.rebate .rebate-tabel tr td:first-child{
    width: 133px;
}
.defaults-rules{
    padding: 3px 5px;
	color: #f60;
	border: 1px solid #f60;
	border-radius: 5px;
}
</style>



