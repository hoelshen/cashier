<template>
    <!-- 详情列表 -->
      <div class="rebate">
          
        <el-form ref="form" >
            <el-row>
                <el-col>
                    <el-form-item label="规则名称：" label-width="11.5%">
                        <span>{{businessExtendsRuleName}}</span>
                        <span class="defaults-rules" v-if="isDefault==1">
                            默认规则
                        </span>
                        <div class="content_closeBtn" @click="goBack">X</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="适配代理商：" label-width="11.5%">
                        <el-button type="primary" @click="openRelatedAgenciesData">点击查看</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="content_title">
                <h2>Zuipin拓展返利设置</h2>
                
            </el-row>
            <el-row class="text-wrap">
                <el-col>
                    <el-form-item  label="进货款定义：" label-width="12%" style="margin-bottom:0">
                        <span>首批进货款</span>
                    </el-form-item>
                </el-col>
            </el-row>
          
            <el-row  class="text-wrap">
              <el-col >
                  <el-form-item label="时间周期：" label-width="12%" style="margin-bottom:0">
                      <span v-if="form.zpTimeChose=='CONTRACT_TERM'">合同期</span>
                      <span v-if="form.zpTimeChose=='TIME_RANGE'">时间范围</span>
                  </el-form-item>
              </el-col>
          </el-row>
            <div v-if="form.zpTimeChose=='CONTRACT_TERM'">
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属单店返利点数：" label-width="300px">
                            <span>{{form.zpSingleRebate}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属区域代理返利点数：" label-width="300px">
                            <span>{{form.zpAreaRebate}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div  v-if="form.zpTimeChose=='TIME_RANGE'">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label=" 1）正式签约起" label-width="200px">
                            <span>{{form.zpTimeLimit.zpdateBefore}}</span>天内
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
                            <span>{{form.zpTimeLimit.zpdateAfter}}</span>天后
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属单店返利点数：" label-width="300px">
                            <span>{{form.zpSingleRebate}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="所属区域代理返利点数：" label-width="300px">
                            <span>{{form.zpAreaRebate}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
              <el-row class="dl-rebate-title">
                <h2>代理商拓展返利设置</h2>
              </el-row>
              <el-row class="text-wrap">
                 <el-col>
                    <el-form-item  label="进货款定义：" label-width="12%"  style="margin-bottom:0">
                        <span>首批进货款</span>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row class="text-wrap">
                    <el-col :span="12">
                        <el-form-item label="时间周期：" label-width="24%" style="margin-bottom:0">
                             <span v-if="form.dlTimeChose=='CONTRACT_TERM'">合同期</span>
                             <span v-if="form.dlTimeChose=='TIME_RANGE'">时间范围</span>
                        </el-form-item>
                    </el-col>
              </el-row>
              <div  v-if="form.dlTimeChose=='CONTRACT_TERM'">
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属单店返利点数：" label-width="300px">
                              <span>{{form.dlSingleRebate}}</span>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属区域代理返利点数：" label-width="300px">
                              <span>{{form.dlAreaRebate}}</span>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              
              <div  v-if="form.dlTimeChose=='TIME_RANGE'">
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label=" 1）正式签约起" label-width="200px">
                              <span>{{form.dlTimeLimit.dldateBefore}}</span>天内
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
                              <span>{{form.dlTimeLimit.dldateAfter}}</span>天后
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属单店返利点数：" label-width="300px">
                              <span>{{form.dlSingleRebate}}</span>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row >
                      <el-col :span="10">
                          <el-form-item label="所属区域代理返利点数：" label-width="300px">
                              <span>{{form.dlAreaRebate}}</span>
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
                    <el-form>
                        <el-row>
                            <el-col :span="5"  :offset="10">
                                <el-form-item>
                                     <el-checkbox v-model="searchData.checked" checked true-label="1" @change="onSubmit" false-label="">不显示禁用代理商</el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item  >
                                    <el-input v-model="searchData.nameOrNo" @keyup.enter.native="onSubmit" placeholder="代理商编号/姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" :offset="1">
                                <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div>
                    <el-table :data="relatedAgenciesForm" :height="440" style="width: 100%">
                      <el-table-column  label="序号" type="index"  width="80">
                          <template slot-scope="scope">
                             <span> {{scope.$index + (currentPage - 1) * 30 + 1}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column prop="shopNo" label="代理商编号" width="127">
                           <template slot-scope="scope">
                               <span> <router-link  target="_blank" class="router-link-active" :to="{ name: 'storeDetail', params: { shopNo: scope.row.id}}">{{scope.row.shopNo}}</router-link></span>
                           </template>
                          
                      </el-table-column>
                      <el-table-column prop="name" label="代理商姓名" width="150">
                      </el-table-column>
                      <el-table-column prop="state" label="状态" width="80">
                          <template slot-scope="scope">
                                <span class="state-wrap" v-if="scope.row.state  == '0'"> <i class="icon-green"></i> 启用</span>
                                <span class="state-wrap" v-if="scope.row.state  == '1'"> <i class="icon-red"></i>禁用</span>
                            </template>
                      </el-table-column>
                      <el-table-column label="代理商等级" width="127">
                           <template slot-scope="scope">
                               <div v-if="scope.row.shopType == 'SELF_SUPPORT'">
                                   <span>直营</span>
                               </div>
                               <div v-else>
                                   <span v-if="scope.row.agentGradeId  == '266'">微店代理</span>
                                    <span v-if="scope.row.agentGradeId  == '265'">区域代理</span>
                                    <span v-if="scope.row.agentGradeId  == '31'">单店代理</span>
                               </div>
                                
                            </template>
                      </el-table-column>
                      <el-table-column  label="合同服务期限" width="200" align="right">
                           <template slot-scope="scope">
                                <span>{{scope.row.signedStartTime}}</span>~
                                <span>{{scope.row.signedEndTime}}</span>
                               
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
        businessExtendsRuleName:"",
        isDefault:0,
        ruleNo:"",
        urlId:"",
        searchData:{
             nameOrNo:"",
             checked:1,
        },
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
      relatedAgenciesForm:[]
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
        this.$router.push("/rebateList");
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
        self.relatedAgenciesData(this.ruleNo,this.urlId)
    },
    openRelatedAgenciesData(){
        this.searchData.checked = "1";
        this.searchData.nameOrNo = "";
        this.relatedAgenciesData(this.ruleNo,this.urlId);
        this.relatedAgencies = true;
    },
    relatedAgenciesData(ruleNo,urlId){
        this.relatedAgenciesTitle = "关联代理商（规则编号：" + ruleNo + "）"
        if (!this.checkSession()) return; 
        const self = this;               
        self.loading = true;
        let url = '/api/http/businessExtendsRule/getRelatedAgentListAccordingToBusinessExtendsRuleId.jhtml' 
        self.$ajax({
                url: url,
                 method: 'post',
                 data: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                    'adaptingAgentSearchVo.ruleId':urlId,
                    'adaptingAgentSearchVo.agentNumberOrAgentName':self.searchData.nameOrNo,
                    'adaptingAgentSearchVo.isDisabled':self.searchData.checked,
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
                console.log(response)
                self.loading = false;
             if (response.data.success == 1) {
                 console.log(response.data.result)
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
            // console.log(err);
        });
    },
    onSubmit(){
        this.relatedAgenciesData(this.ruleNo,this.urlId);
        this.currentPage=1;
    },
    getUrlId() {
      this.urlId = this.$route.query.id
    },
  },
    created() {
    if (!this.checkSession()) return;
   
        const self = this;
        self.getUrlId();
        self.$ajax({
				url: '/api/http/businessExtendsRule/getBusinessExtendsRuleDetail.jhtml',
                method:"post",
                data:{
                    "id":self.urlId
                },
				transformRequest: [function(data) {
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
            })
            .then(function(response) { 
				if (response.data.success === 1) {
					// console.log(response.data);
                    self.isDefault = response.data.result.isDefault;
                    self.ruleNo = response.data.result.ruleNo;
                    self.businessExtendsRuleName = response.data.result.businessExtendsRuleName;
                    self.form.zpTimeChose = response.data.result.zuipinCycleTime;
                    self.form.dlTimeChose = response.data.result.agentCycleTime;
                    self.form.zpTimeLimit.zpdateBefore = response.data.result.zuipinContractDaysInner;
                    self.form.zpTimeLimit.zpSingleExtendsOne = response.data.result.zuipinSingleExtendsOne*100;
                    self.form.zpTimeLimit.zpSingleExtendsTwo = response.data.result.zuipinSingleExtendsTwo*100;
                    self.form.zpTimeLimit.zpSingleExtendsThree = response.data.result.zuipinSingleExtendsThree*100;
                    self.form.zpTimeLimit.zpAreaExtendsOne = response.data.result.zuipinAreaExtendsOne*100;
                    self.form.zpTimeLimit.zpAreaExtendsTwo = response.data.result.zuipinAreaExtendsTwo*100;
                    self.form.zpTimeLimit.zpAreaExtendsThree = response.data.result.zuipinAreaExtendsThree*100;
                    self.form.zpTimeLimit.zpdateAfter = response.data.result.zuipinContractDaysAfter;
                    self.form.zpSingleRebate = (response.data.result.zuipinSingleRebate*100).toFixed(2)+"%";
                    self.form.zpAreaRebate = (response.data.result.zuipinAreaRebate*100).toFixed(2)+"%";

                    self.form.dlTimeLimit.dldateBefore = response.data.result.agentContractDaysInner;
                    self.form.dlTimeLimit.dlSingleExtendsOne = response.data.result.agentSingleExtendsOne*100;
                    self.form.dlTimeLimit.dlSingleExtendsTwo = response.data.result.agentSingleExtendsTwo*100;
                    self.form.dlTimeLimit.dlSingleExtendsThree = response.data.result.agentSingleExtendsThree*100;
                    self.form.dlTimeLimit.dlAreaExtendsOne = response.data.result.agentAreaExtendsOne*100;
                    self.form.dlTimeLimit.dlAreaExtendsTwo = response.data.result.agentAreaExtendsTwo*100;
                    self.form.dlTimeLimit.dlAreaExtendsThree = response.data.result.agentAreaExtendsThree*100;
                    self.form.dlTimeLimit.dldateAfter = response.data.result.agentContractDaysAfter;
                    self.form.dlSingleRebate = (response.data.result.agentSingleRebate*100).toFixed(2)+"%";
                    self.form.dlAreaRebate = (response.data.result.agentAreaRebate*100).toFixed(2)+"%";
				} else {
					self.$message({
						message: response.data.msg,
						type: 'error'
					})
				}
			}).catch(function(error) {

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
	border-radius: 3px;
	background-color: #f60;
	color: #fff;
}
.state-wrap{
    position: relative;
    padding-left: 10px;
}
.icon-green{
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #2eba07;
    display: inline-block;
    position: absolute;
    top: 7px;
    left:0px;
}
.icon-red{
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #FF0033;
    display: inline-block;
    position: absolute;
    top: 7px;
    left: 0px;
}
</style>



