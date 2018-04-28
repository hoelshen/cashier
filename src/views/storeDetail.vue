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
                    <el-col :span="12">
                        已达成进货业绩：{{ detailForm.shopType}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        显示选项:{{ detailForm.isShow === 1 ? '显示' : '不显示' }}到醉品线下M2O体验店
                    </el-col>
                    <el-col :span="12">
                        年度目标进货业绩：{{ detailForm.annualPurchasePerformance }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商姓名：{{ detailForm.name }}
                    </el-col>
                    <el-col :span="12" width=100px;>
                        <span style="float:left">进货业绩达成率：</span> 
                        <el-progress  :percentage="80" color="#8e71c7" :stroke-width="10" style="width:352px;float:right;padding-top: 10px;" ></el-progress>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商手机：{{ detailForm.phone }}
                    </el-col>
                    <el-col :span="12">
                        已达成店铺拓展：{{ detailForm.annualAreadyExtendPerformance }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商状态：{{ detailForm.state	=== 1 ? '启用' : '禁用' }}
                    </el-col>
                    <el-col :span="12">
                        年度目标店铺拓展：{{ detailForm.annualExtendPerformance }}
                    </el-col>
                </el-row>
          
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商等级：{{   detailForm.agentGradeId === 265 ? "区域" :  detailForm.agentGradeId === 266   ? '微店' : '单店'     }}
                    </el-col>
                    <el-col :span="12">
                       <span style="float:left"> 店铺拓展达成率：</span> 
                       <el-progress :percentage="80" color="#8e71c7" :stroke-width="10" style="width:352px;float:right;padding-top: 10px;"></el-progress>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="112">
                        店铺所属区域：{{ detailForm.province }}{{detailForm.city}}{{detailForm.county}}
                    </el-col>

                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        收件地址：{{ detailForm.address }}
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
                        <router-link  class="router-link-active" :to="{ name: 'prepaidManage', params: { shopNo:detailForm.shopNo,name:detailForm.name}}">点击查看</router-link>                                         
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
                        <el-button type="primary" @click='openAnnualAgents(detailForm.id)'>点击查看</el-button>
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
            <el-dialog :title="agencyRelationsanceTitle" :visible.sync="agencyRelationsanceDialogVisible" >
                <div></div>
                <div>
                  <el-table :data="agencyRelationsanceForm">
                      <el-table-column prop="agentNo" label="序号"  width="127">
                      </el-table-column>
                      <el-table-column prop="agentNo" label="代理商编号" width="127">
                      </el-table-column>
                      <el-table-column prop="aengtName" label="代理商姓名" width="127">
                      </el-table-column>
                      <el-table-column prop="agentGradeId" label="代理商等级" width="127">
                      </el-table-column>
                      <el-table-column prop="registTime" label="店铺注册" width="127">
                      </el-table-column>
                      <el-table-column prop="relationType" label="关系" width="127">
                      </el-table-column>
                  </el-table>
                </div>
                <div class="plPage clearfix">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editAgent()" v-if="!isDisable">确 定</el-button>
                    <el-button @click="agencyRelationsanceDialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        




              <!-- 查看代理商年度业绩(编号：xxx) start -->
                <el-dialog :title="annualAgentsTitle"  :visible.sync="annualAgentsDialogVisible"  >
                    <div>
                      <el-table :data="annualAgentsForm">
                          <!-- <el-table-column prop="shopNo" label="序号"  width="127">
                          </el-table-column> -->
                          <el-table-column prop="shopId" label="代理商等级" width="127">
                          </el-table-column>
                          <el-table-column prop="annualCycle" label="年份" width="127">
                          </el-table-column>
                          <el-table-column prop="shopNums" label="目标店铺" width="127">
                          </el-table-column>
                          <el-table-column prop="shopId" label="达成"  width="127">
                          </el-table-column>
                          <el-table-column prop="startTime" label="目标进货额" width="127">
                          </el-table-column>
                          <el-table-column prop="shopId" label="达成"  width="127">
                          </el-table-column>
                          <el-table-column prop="finishPerformanceSum" label="年度业绩" width="127">
                          </el-table-column>
                      </el-table>
                    </div>
                    <div class="plPage clearfix">
                        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalSize">
                        </el-pagination>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="editAgent()" v-if="!isDisable">确 定</el-button>
                        <el-button @click="annualAgentsDialogVisible = false">取 消</el-button>
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
      pageSize: 30,
      user: "",
      tableData:{
          agent:'',
      },
      searchData: {
        shopName: "",
        phone: "",
        name: "",
        state: "",
        signTime: [],
        agentLevelIds: [],
        operator: "",
        salesMan: "",
        operatorId: "",
        salesManId: ""
      },
      annualAgentsTitle:'',
      annualAgentsForm:[],
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
        annualPurchasePerformance:'' ,  //年度目标进货业绩
        createTime:'',    ///签约日期
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
     //查看代理商关系
      openAgencyRelationsance(shopNo) {
        // console.log(shopNo)
          if (!this.checkSession()) return;
          const self = this;
          this.agencyRelationsanceDialogVisible = true;
          self.loading = true;
          self.$ajax.get('/api/shop/shopManage/getAgentRelationList.jhtml', {
              params: {
                  'shopNo': shopNo,
              }
          }).then(function (response) {
              // console.log('ok')
            
              // console.log(response)
              self.loading = false;
              // console.log(response.data)
              // console.log(response.data.result)
              self.agencyRelationsanceForm =  response.data.result;

              // console.log(self.agencyRelationsanceForm)

              self.agencyRelationsanceForm.push(response.data.result);
              // console.log(self.agencyRelationsanceForm)
          }).catch(function (err) {
              self.loading = false;
              console.log(err);
          });
      },
    //查看代理商年度业绩
    openAnnualAgents(shopId) {
        // console.log('ok')
        console.log(shopId)
        this.annualAgentsDialogVisible = true;
        if (!this.checkSession()) return;
        const self = this;
        
        self.loading = true;
        self.$ajax.post('/api/http/annualPerformanceOrder/findList.jhtml', {
            params: {
                'shopId': shopId,
            }
        }).then(function (response) {
          
            self.loading = false;
            // self.openAnnualAgentsForm =  response.data.result;

            // console.log(self.openAnnualAgentsForm)

            self.agencyRelationsanceForm.push(response.data.result);
            console.log(self.agencyRelationsanceForm)
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
     //改变当前页
    handleCurrentChange: function (val) {
        const self = this;
        if (!self.checkSession()) return;
        self.currentPage = val;
        self.loading = true;
        self.$ajax.get('/api/shop/ShopManage/search.jhtml', {
            params: {
                'pager.pageIndex': self.currentPage,
                'pager.pageSize': self.pageSize,
                'shop.shopName': self.searchData.shopName,
                'shop.phone': self.searchData.phone,
                'shop.name': self.searchData.name,
                'shop.startTime': self.searchData.signTime && self.searchData.signTime[0] ? Utils.formatDayDate(this.searchData.signTime[0]) : '',
                'shop.endTime': self.searchData.signTime && self.searchData.signTime[1] ? Utils.formatDayDate(this.searchData.signTime[1]) : '',
                'shop.state': self.searchData.state,
                'shop.agentGradeIds': self.searchData.agentLevelIds.join(','),
                'shop.sort': 'depositAmount',
                'shop.order': self.order,
                'shop.operator': self.searchData.operator,
                'shop.salesMan': self.searchData.salesMan,
                'shop.salesManId': this.salesManId,
                'shop.salesManId': this.salesManId,
            }
        }).then(function (response) {
            self.loading = false;
            self.myData = response.data.rows;
            self.totalSize = response.data.total
            // console.log(response);
        }).catch(function (err) {
            self.loading = false;
            console.log(err);
        });
    },
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
</style>
