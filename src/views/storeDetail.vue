<template>
    <div id="detailStore">
        <el-row class="content_title_top">
            <h2>基本信息({{detailForm.shopNo}})</h2>
            <div class="content_closeBtn" @click="goBack">X</div>
        </el-row>

        <div class="info">
            <div class="orderInfo">
                <el-row :gutter="10">
                    <el-col :span="12">
                        店铺名称：{{ detailForm.shopName }}
                    </el-col>
                    <el-col :span="12">
                        合同签约日期：{{ detailForm.signedTime}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        店铺类型：{{ detailForm.shopType === "AGENT" ?  "代理商"  : "直营"}}
                    </el-col>
                    <el-col :span="12"  v-if="detailForm.shopType!='SELF_SUPPORT'">
                        已达成进货业绩：{{ detailForm.annualOwnAreadyPurchasePerformance}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        显示选项:{{ detailForm.isShow === 1 ? '显示' : '不显示' }}到醉品线下M2O体验店
                    </el-col>
                    <el-col :span="12" v-if="detailForm.shopType!='SELF_SUPPORT'">
                        年度目标进货业绩：
                        <span v-if=" detailForm.annualPurchasePerformance !== 0 ">{{ detailForm.annualPurchasePerformance }}</span>
                        <span v-else>-</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商姓名：{{ detailForm.name }}
                    </el-col>
                    <el-col :span="12" width=100px;  v-if="detailForm.shopType!='SELF_SUPPORT' && !detailForm.annualOwnAreadyPurchasePerformanceRate">
                        <span  style="float:left" >进货业绩达成率：</span> 
                          <div  v-if="detailForm.shopType!='SELF_SUPPORT' && detailForm.annualPurchasePerformance !== 0 " style="height:10px;;width:144px;background-color:#e3e5e6;padding-top: 0px;float:right;border-radius:10px;position: absolute;top: 9px;left: 610px;">
                                <div    v-bind:style="{height:detailForm.height +'px',width:detailForm.annualOwnAreadyPurchasePerformanceRate *144 + 'px','background-color':'#'+detailForm.activeColor1}"
                                          style="float:left;border-radius: 10px;"
                                >
                                </div>
                                <div v-bind:style="{height:detailForm.height  +'px',width:detailForm.annualLowerAreadyPurchasePerformanceRate*144 + 'px','background-color':'#' +detailForm.activeColor2}"
                                         style="float:left;border-radius: 10px;"
                                 >
                                </div>
                                <span style=" position:absolute ;right: 132px;"> {{Number(detailForm.purchaseAchievementRate).toFixed(2)}}%</span> 
                          </div>
                          <div v-else>-</div>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商手机：{{ detailForm.phone }}
                    </el-col>
                    <el-col :span="12"  v-if="detailForm.shopType!='SELF_SUPPORT' && detailForm.agentGradeId === 265">
                        已达成店铺拓展：
                        <span style="color:#20a0ff ">
                            {{ detailForm.annualAreadyExtendPerformance}}家
                        </span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12" >
                        代理商状态：{{ detailForm.state	=== 1 ? '禁用' : '启用' }}
                    </el-col>
                    <el-col :span="12" v-if="detailForm.shopType!='SELF_SUPPORT' && detailForm.annualExtendPerformance !== 0 && detailForm.agentGradeId === 265">
                        年度目标店铺拓展：{{ detailForm.annualExtendPerformance }}
                    </el-col>
                </el-row>
          
                <el-row :gutter="10">
                    <el-col :span="12" v-if="detailForm.shopType!='SELF_SUPPORT'">
                        代理商等级：{{   detailForm.agentGradeId === 265 ? "区域代理" :  detailForm.agentGradeId === 266   ? '微店代理' : '单店代理'     }}
                    </el-col>
                    <el-col :span="12" v-if="detailForm.shopType!='SELF_SUPPORT' && (detailForm.agentGradeId === 265) && !detailForm.storeExpansionRate" >
                            <span  v-if="detailForm.shopType!='SELF_SUPPORT'" style="float:left"> 店铺拓展达成率：</span> 
                             <div  v-if="detailForm.shopType!='SELF_SUPPORT' && detailForm.annualExtendPerformance !== 0 "  style="height:10px;;width:144px;background-color:#e3e5e6;padding-top: 10px;float:right;border-radius:10px;position: absolute;top: 9px;left: 610px;">
                                        <div  style="position:absolute;top:0px;border-radius: 10px;" v-bind:style="{height:detailForm.height  +'px',width:detailForm.storeExpansionRate *144 +'px' ,'background-color':'#'+detailForm.activeColor1}  "></div>
                            </div>
                            <div v-else>-</div>
                            <span  v-if="detailForm.shopType!='SELF_SUPPORT' && detailForm.annualExtendPerformance !== 0 "  style=" right: 132px;position: absolute">{{Number(detailForm.storeExpansionRate).toFixed(2)}}%</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10" v-if="detailForm.shopType!='SELF_SUPPORT'">
                   <el-col :span="112" v-if="detailForm.agentGradeId === 265">
                        店铺代理区域：{{ detailForm.agentProvinceName }}/{{detailForm.agentCityName}}/{{detailForm.agentCountyName}}
                    </el-col>
                     <el-col :span="112" v-if="detailForm.agentGradeId === 266 || detailForm.agentGradeId ===31">
                        店铺所属区域：{{ detailForm.belongProvinceName }}/{{detailForm.belongCountryName}}/{{detailForm.belongCityName}}
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="margin-top: 13px;">
                    <el-col :span="12">
                        收件地址：{{ detailForm.province }}/{{detailForm.city}}/{{detailForm.county}}/{{ detailForm.address }}
                    </el-col>
                </el-row>
            </div>
            <div class="calendar">
                 <p class="calendarMessage_top">{{message}}</p><br>
                <timeComponent class="calendarMessage_bottom"  @time-end=" message = '倒计时结束' " :endTime='endTime'></timeComponent>  
            </div>
        </div>
        <div class="content_title_bottom">
              <h2 >账户信息</h2>    
        </div>
          

        <div class="count">
            <div class="orderCount">
                <el-row :gutter="5">
                    <el-col :span="24">
                        预存款详情：
                        <el-button style="background-color:#20a0ff ; color='#ffffff'" class="router-link-active" >
                             <router-link  class="router-link-active" :to="{ name: 'prepaidManage', params: { shopNo:detailForm.shopNo,name:detailForm.name}}">点击查看</router-link>
                        </el-button>                                           
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="24">
                        代理商关系：
                          <el-button type="primary" @click='openAgencyRelationsance(detailForm.shopNo)'>点击查看</el-button>                        
                    </el-col>
                </el-row>    
                <el-row :gutter="5">
                    <el-col :span="24">
                       代理商年度业绩： 
                        <el-button type="primary" @click='openAnnualAgents(detailForm.id,detailForm.shopNo)'>点击查看</el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="5"> 
                    <el-col :span="24">
                        业务人员：{{ detailForm.operator }}
                    </el-col>
                </el-row>        
                <el-row :gutter="5">
                    <el-col :span="24">
                        运营人员：{{ detailForm.salesMan }}
                    </el-col>  
                </el-row>     
            </div>
        </div>


    
            <!-- 查看代理商关系(编号：xxx) start -->
            <el-dialog :title="agencyRelationsanceTitle" :visible.sync="agencyRelationsanceDialogVisible" :before-close="changeCancle" size="140%">
                  <el-table :data="agencyRelationsanceForm" style="width: 100%">
                      <el-table-column type="index" label="序列"  width="80">
                      </el-table-column>
                      <el-table-column prop="agentNo" label="代理商编号" width="127">
                      </el-table-column>
                      <el-table-column prop="agentName" label="代理商姓名" width="127">
                      </el-table-column>
                      <el-table-column prop="agentGradeId" label="代理商等级" width="127">
                           <template slot-scope="scope">
                                <span v-if="scope.row.agentGradeId  == '266'">微店</span>
                                <span v-if="scope.row.agentGradeId  == '265'">区域</span>
                                <span v-if="scope.row.agentGradeId  == '31'">单店</span>
                            </template>
                      </el-table-column>
                      <el-table-column prop="registTime" label="店铺注册" width="127">
                      </el-table-column>
                      <el-table-column prop="relationType" label="关系">
                            <template slot-scope="scope">
                                <span v-if="scope.row.relationType  == 'ZUIPIN_EXTEND'">醉品关系</span>
                                <span v-if="scope.row.relationType  == 'AGENT_EXTEND'">代理关系</span>
                            </template>
                      </el-table-column>
                  </el-table>
                <div class="plPage clearfix">
                    <el-pagination @current-change="agencyRelationsanceHandleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout=" prev, pager, next, jumper" >
                    </el-pagination>
                </div>
                <div slot="footer"   class="dialog-footer" @click="changeCancle()">
                </div>
            </el-dialog>
        


              <!-- 查看代理商年度业绩(编号：xxx) start -->
                <el-dialog :title="annualAgentsTitle"  :visible.sync="annualAgentsDialogVisible"  size="180%"  :before-close="changeCancle">
                    <div style="height:40px;">
                        <div class="img" style="padding:0 10px 0 10px;margin:0 10px 0 10px;">
                                <img style="margin-right:5px;margin-left:5px;padding-right:5px" src="../assets/images/Standard.png" alt="">已达标
                                <img style="margin-right:5px;margin-left:5px;padding-right:5px"  src="../assets/images/DStandard.png" alt="">未达标
                        </div>
                        <!-- <div class="block">
                            <p>组件值：{{  }}</p>
                            <el-date-picker
                            v-model="value13"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
                            </el-date-picker>
                        </div> -->
                    </div>
                    <div >
                      <el-table :data="annualAgentsForm" style="width: 100%;">
                         <el-table-column prop="id" label="序列"  width="80"></el-table-column>
                          <el-table-column prop="agentGradeName" label="代理商等级" width="127">
                          </el-table-column>
                          <el-table-column prop="annualCycle" label="年份" width="127" >
                          </el-table-column>
                          <el-table-column prop="shopNums" label="目标店铺" width="100">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.agentGradeId==265"> {{scope.row.shopNums}}</span> 
                                    <span v-else>-</span>
                               </template>
                          </el-table-column>
                          <el-table-column prop="finishShopNums" label="达成"  width="80"  align="right">
                          </el-table-column>
                          <el-table-column prop="annualPerformanceAmount" label="目标进货额" width="157" align="right">
                               <template slot-scope="scope">
                                <span>{{scope.row.annualPerformanceAmount.toFixed(2)}}</span>
                               </template>
                          </el-table-column>
                          <el-table-column prop="finishPerformanceSum" label="达成"  width="127" align="right">
                               <template slot-scope="scope">
                                <span>{{scope.row.finishPerformanceSum.toFixed(2)}}</span>
                               </template>
                          </el-table-column>
                          <el-table-column prop="finishRatio" label="年度业绩" width="177" align="right">
                            <template slot-scope="scope">
                                <span>{{(scope.row.finishRatio.toFixed(2))*10}}{{'%'}}</span>
                                <div v-if="(scope.row.finishRatio.toFixed(2))*10 >= 100" >
                                    <img src="../assets/images/Standard.png" alt="">已达标
                                </div> 
                                <div v-else >
                                    <img  src="../assets/images/DStandard.png" alt="">未达标
                                </div>
                            </template> 
                          </el-table-column>
                      </el-table>
                    </div>
                    <div class="plPage clearfix">
                        <el-pagination @current-change="AnnualAgentsHandleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout=" prev, pager, next, jumper" :total="totalSize">
                        </el-pagination>
                    </div>
                    <div slot="footer" class="dialog-footer" @click="changeCancle()">
                    </div>
                </el-dialog>
          
              <!-- 查看代理商年度业绩(编号：xxx) end -->  

    </div>
    
</template>

<script type="text/javascript" src="../router.js"></script>

<script>
import Utils from "../components/tools/Utils";
import addressComponent from "../components/address.vue";
import timeComponent from "../components/time.vue";
import axios from "axios";

import $ from "jquery";

export default {
  data() {
    return {
      currentPage: 1,
      totalSize: 0,
      pageSize: 10,
      totalNums:'',
      user: "",
      tableData:{
          agent:'',
      },
    //   searchData: {
    //     shopName: "",
    //     phone: "",
    //     name: "",
    //     state: "",
    //     signTime: [],
    //     agentLevelIds: [],
    //     operator: "",
    //     salesMan: "",
    //     operatorId: "",
    //     salesManId: ""
    //   },
      annualAgentsTitle:'',
      annualAgentsForm:[],
      annualAgentsFormcycleBeginTime:'',
      annualAgentsFormcycleEndTime:'',
      agencyRelationsanceTitle:'',
      agencyRelationsanceForm:[],
      myData: [],
      levelArray: [], //代理商等级数组
      stateArray: [
        {
          index: 0,
          name: "启用"
        },
        {
          index: 1,
          name: "禁用"
        }
      ],
      loading: false,
      //日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      detailForm: {
        id: "",
        shopName: "",
        name: "",
        phone: "",
        signedTime: "",
        agentGradeId: "",
        province: "",
        city: "",
        county: "",
        cityCode: "",
        countyCode: "",
        agentProvince: "",
        agentCity: "",
        agentCounty: "",
        address: "",
        shopType: "",
        isShow: "",
        operator: "",
        operator2: "",
        operatorId: "",
        salesMan: "",
        salesMan2: "",
        salesManId: "",
        shopNo:"",
        annualExtendPerformance:"",  //年度目标店铺拓展
        annualAreadyExtendPerformance:'',   //已达成店铺拓展
        annualOwnAreadyPurchasePerformance:'', //年度自己所完成的业绩
        annualLowerAreadyPurchasePerformance:'', //年度下级协助所完成的业绩
        annualOwnAreadyPurchasePerformanceRate:'',   //年度自己所完成的业绩比例
        annualLowerAreadyPurchasePerformanceRate:'',  //年度下级协助所完成的业绩比例
        annualPurchasePerformance:'' ,  //年度目标进货业绩
        purchaseAchievementRate:'',  //进货业绩达成率
        storeExpansionRate:'',     //年度店铺扩展达成率
        createTime:'',    ///签约日期,
        belongCity:'',   //所属城市
        belongCountry:'', //所属区域
        belongProvince:'',  //所属省份
        activeColor1:"ff6600",   //橙色
        activeColor2:"ffd199",     //红色
        height:10,   
      },
      agencyRelationsanceDialogVisible:false,
      annualAgentsDialogVisible:false,
      detailFormTitle: "",
      isDisable: false,
      order: "", //预存款排序
      phoneLength: 11,
      message: "剩余天数",
      endTime: "2018-07-08"
    };
  },
  components: {
    addressComponent,
    timeComponent
  },
  methods: {
      //取消按钮
      changeCancle() {
        
            this.agencyRelationsanceDialogVisible = false;
            this.agencyRelationsanceForm = [];
    
            this.annualAgentsForm = [];
            this.annualAgentsDialogVisible = false;

        },
     //查看代理商关系
      openAgencyRelationsance(shopNo) {

          this.agencyRelationsanceTitle = "查看代理商关系（编号：" + shopNo + "）"
        // console.log(shopNo)
          if (!this.checkSession()) return;
          const self = this;
          self.agencyRelationsanceDialogVisible = true;
          self.loading = true;
          self.$ajax.get('/api/shop/shopManage/getAgentRelationList.jhtml', {
              params: {
                  'shopNo': shopNo,
              },
              data: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
              },
          }).then(function (response) {
            
              self.loading = false;
              // self.agencyRelationsanceForm = response.data.result;
              // self.agencyRelationsanceForm =  response.data.result;
              // console.log(response.data.result)
              for(let i of response.data.result){
                self.agencyRelationsanceForm.push(i);

              }
          }).catch(function (err) {
              self.loading = false;
              console.log(err);
          });
      },
    //查看代理商年度业绩
    openAnnualAgents(shopId,shopNo) {
        this.annualAgentsTitle = "查看代理商年度业绩（编号：" + shopNo + "）"
        if (!this.checkSession()) return; 
        const self = this;               
        self.annualAgentsDialogVisible = true;
        self.loading = true;
        let url = '/api/http/annualPerformanceOrder/findByAnnualPerformanceOrderList.jhtml?shopId=' + self.detailForm.id
        self.$ajax({
                url: url,
                 method: 'post',
                 data: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
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
             if (response.data.success === 1) {
                    self.annualAgentsForm = response.data.result;
                    self.totalSize = response.data.totalNums;
                    // console.log(response.data);
                    // self.annualAgentsTitle = response.data;
                    // self.handleCurrentChange(self.currentPage)
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
    },
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
    getUri() {
      if (document.cookie) {
        var cookie = document.cookie.split(";");
        for (var index = 0; index < cookie.length; index++) {
          var cookies = cookie[index].split("=");
          if (cookies[0] == "adminUri") {
            return cookies[1];
          }
        }
      }
    },
    goBack() {
      this.$router.push("/storeManage");
    },

     //改变年度业绩当前页
    AnnualAgentsHandleCurrentChange(val) {
            let self = this;
            self.currentPage = val;
            self.openAnnualAgents();
    },
    //改变代理商关系当前页
    agencyRelationsanceHandleCurrentChange(val){
             let self = this;
            // self.currentPage = val;
            self.openAgencyRelationsance();
    }
  },
  created() {
    if (!this.checkSession()) return;
    this.uri = this.getUri();
    //获取id
    var src = window.location.href.split("/");
    this.id = src[5];
    // console.log(src)
    // console.log(src[5])
    const self = this;
    //获取代理商等级列表
    self.$ajax
      .post("/api/http/shop/queryAgentGradeList.jhtml", {})
      .then(function(response) {
        // console.log(response);
        if (response.data.success == 1) {
          self.levelArray = response.data.result;
        } else {
          self.$message({
            message: response.data.msg,
            type: "error"
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    // 获取代理商信息
    self.$ajax
      .get("/api/http/shop/searchShop.jhtml", {
        params: {
          shopId: src[5]
        }
      })
      .then(function(response) {
        self.loading = false;
        self.detailForm = response.data.result;
        self.detailForm.annualOwnAreadyPurchasePerformance =  Utils.addCommas(response.data.result.annualOwnAreadyPurchasePerformance);
        self.detailForm.purchaseAchievementRate = (response.data.result.annualOwnAreadyPurchasePerformance+response.data.result.annualLowerAreadyPurchasePerformance)/response.data.result.annualPurchasePerformance
        self.detailForm.annualOwnAreadyPurchasePerformanceRate  = response.data.result.annualOwnAreadyPurchasePerformance / response.data.result.annualPurchasePerformance
        self.detailForm.annualLowerAreadyPurchasePerformanceRate = response.data.result.annualLowerAreadyPurchasePerformance  / response.data.result.annualPurchasePerformance
        self.detailForm.storeExpansionRate  = response.data.result.annualAreadyExtendPerformance/response.data.result.annualExtendPerformance
      })
      .catch(function(err) {
        self.loading = false;
        console.log(err);
      });
  }
};
</script>
<style lang='less' scoped>
@import url("../assets/less/storeDetail.less");
.el-message-box {
    width: 500px;
}

.el-message-box__btns {
    text-align: left;
    padding-left: 343px;
}

.forbidden-button {
    background-color: #fe5500;
    border-color: #fe5500;
}

.forbidden-button:hover {
    background-color: #fe5500;
    opacity: 0.7;
    border-color: #fe5500;
}

.forbidden-button:active {
    background-color: #fe5500;
    border-color: #fe5500;
}

.el-message-box__header {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.el-message-box__content {
    padding: 0px 20px 30px;
}





#detailStore {
  width: 98%;
  margin: 1%;
  padding: 20px;
  background-color: #ffffff;
}


.router-link-active { 
   color: #ffffff;
}
.dialog-title{
    line-height: 50px;
    height: 56px;
	background-color: #f8f9fb;
    border-radius: 5px 5px 0px 0px;
    padding: 0;
    width: 716px;
    margin: -20px 0 0 -20px;

}
.dialog-footer{
    width: 20px;height: 20px;
    position: absolute;
    right: 17px;
    top: 18px;
    cursor: pointer;
}
</style>
