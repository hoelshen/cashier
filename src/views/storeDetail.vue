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
                          <el-button type="primary" @click='openEditDialog(detailForm,"agencyRelationsance")'>点击查看</el-button>                        
                    </el-col>
                </el-row>    
                <el-row :gutter="5">
                    <el-col :span="24">
                       代理商年度业绩： 
                        <el-button type="primary" @click='openEditDialog(detailForm,"annualAgents")'>点击查看</el-button>
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


        <!-- 查看代理商年度业绩(编号：xxx) start -->
            <el-dialog :title="annualAgentsTitle"  :visible.sync="annualAgentsDialogVisible" size="tiny" >
                <div>
                    <el-table-column prop="annualAgentsForm.shopNo" label="序号"  width="127">
                    </el-table-column>
                    <el-table-column prop="annualAgentsForm.startTime" label="代理商等级" width="127">
                    </el-table-column>
                    <el-table-column prop="annualAgentsForm.startTime" label="年份" width="127">
                    </el-table-column>
                    <el-table-column prop="annualAgentsForm.startTime" label="目标店铺" width="127">
                    </el-table-column>
                    <el-table-column prop="annualAgentsForm.startTime" label="达成"  width="127">
                    </el-table-column>
                    <el-table-column prop="annualAgentsForm.startTime" label="目标进货额" width="127">
                    </el-table-column>
                    <el-table-column prop="annualAgentsForm.startTime" label="达成"  width="127">
                    </el-table-column>
                    <el-table-column prop="annualAgentsForm.startTime" label="年度业绩" width="127">
                    </el-table-column>
                </div>
                <div class="plPage clearfix">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
                </div>
            </el-dialog>
          
            <!-- 查看代理商年度业绩(编号：xxx) end -->  
            <!-- 查看代理商关系(编号：xxx) start -->
            <el-dialog :title="agencyRelationsanceTitle" :visible.sync="agencyRelationsanceDialogVisible" size="tiny" >
                <div></div>
                <div>
                    <el-table-column prop="agencyRelationsanceForm.shopNo" label="序号"  width="127">
                    </el-table-column>
                    <el-table-column prop="agencyRelationsanceForm.agentGradeId" label="代理商编号" width="127">
                    </el-table-column>
                    <el-table-column prop="agencyRelationsanceForm.startTime" label="代理商姓名" width="127">
                    </el-table-column>
                    <el-table-column prop="agencyRelationsanceForm.agentGradeId" label="代理商等级" width="127">
                    </el-table-column>
                    <el-table-column prop="agencyRelationsanceForm.agentGradeId" label="店铺注册" width="127">
                    </el-table-column>
                    <el-table-column prop="agencyRelationsanceForm.agentGradeId" label="关系" width="127">
                    </el-table-column>
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
      annualAgentsForm:{
            shopNo:'',
            agentGradeId:'',
            startTime:'',




      },
      agencyRelationsanceTitle:'',
      agencyRelationsanceForm:{
                shopNo:'',
                agentGradeId:'',
                startTime:'',




                
      },
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
    //提交字段校验
    testData(data, Address, AgentAddress) {
      const self = this;
      let isMobile = /^1\d{10}$/;
      //店铺名判断
      if (!data.shopName) {
        self.loading = false;
        self.$message({
          message: "店铺名不得为空",
          type: "error"
        });
        return false;
      } else {
        if (data.shopName.length > 50) {
          self.loading = false;
          self.$message({
            message: "店铺名长度不得大于50",
            type: "error"
          });
          return false;
        }
      }
      //代理商姓名判断
      if (!data.name) {
        self.loading = false;
        self.$message({
          message: "代理商姓名不得为空",
          type: "error"
        });
        return false;
      } else {
        if (data.name.length > 10) {
          self.loading = false;
          self.$message({
            message: "代理商姓名长度不得大于10",
            type: "error"
          });
          return false;
        }
      }
      //代理商手机判断
      if (!data.phone) {
        self.loading = false;
        self.$message({
          message: "代理商手机不得为空",
          type: "error"
        });
        return false;
      } else {
        if (!isMobile.test(data.phone)) {
          self.loading = false;
          self.$message({
            message: "代理商手机格式有误",
            type: "error"
          });
          return false;
        }
      }
      //合同签约日期判断
      if (!data.signedTime) {
        self.loading = false;
        self.$message({
          message: "合同签约日期不得为空",
          type: "error"
        });
        return false;
      }
      // 如果是直营直接转成区域代理
      if (data.shopType == "SELF_SUPPORT") {
        data.agentGradeId = 265;
      }
      //代理商等级判断
      if (!data.agentGradeId) {
        self.loading = false;
        self.$message({
          message: "代理商等级不得为空",
          type: "error"
        });
        return false;
      }
      //收件地址判断
      if (!Address.provinceCode || !Address.cityCode || !Address.areaCode) {
        self.loading = false;
        self.$message({
          message: "收件地址不得为空",
          type: "error"
        });
        return false;
      } else {
        if (Address.cityCode == 1) {
          self.loading = false;
          self.$message({
            message: "请选择具体收件城市",
            type: "error"
          });
          return false;
        }
        if (Address.areaCode == 1) {
          self.loading = false;
          self.$message({
            message: "请选择具体收件地区",
            type: "error"
          });
          return false;
        }
      }
      //详细地址判断
      if (!data.address) {
        self.loading = false;
        self.$message({
          message: "详细地址不得为空",
          type: "error"
        });
        return false;
      } else {
        if (data.address.length > 100) {
          self.loading = false;
          self.$message({
            message: "详细地址长度不得大于100个字符",
            type: "error"
          });

          return false;
        }
        //业务人员判断
        if (!data.salesMan) {
          // console.log(data.salesMan)
          self.loading = false;
          self.$message({
            message: "业务人员为必填项",
            type: "error"
          });
          return false;
        }
      }
      //代理区域判断
      if (data.agentGradeId == 265 && data.shopType != "SELF_SUPPORT") {
        if (
          !AgentAddress.provinceCode ||
          !AgentAddress.cityCode ||
          !AgentAddress.areaCode
        ) {
          self.loading = false;
          self.$message({
            message: "代理区域不得为空",
            type: "error"
          });
          return false;
        } else {
          if (AgentAddress.cityCode == 1) {
            self.loading = false;
            self.$message({
              message: "请选择具体代理城市",
              type: "error"
            });
            return false;
          }
        }
      }
      return true;
    },
    openEditDialog(data,type){
         console.log(data)
            type == 'annualPurchasePerformance' ? this.isDisable = false : this.isDisable = true

            console.log(type)
            this.editFormTitle = type == 'annualPurchasePerformance' ? "查看代理商年度业绩（编号：" + data.shopNo + "）" : "查看代理商关系（编号：" + data.shopNo + "）"
            
            this.getInfoById(data.id);

            this.agencyRelationsanceDialogVisible = true;
    },
    // 获取选中店铺信息
    getInfoById(id) {
        const self = this;
        if (!self.checkSession()) return;
        self.loading = true;
        self.$ajax.get('/api/http/shop/searchShop.jhtml', {
            params: {
                'shopId': id,
            }
        }).then(function (response) {
          console.log(response.data.result)
            self.loading = false;
            self.agencyRelationsanceForm = response.data.result;
        }).catch(function (err) {
            self.loading = false;
            console.log(err);
        });
    },
    //查看代理商年度业绩
    annualPurchasePerformance(shopNo) {
        if (!this.checkSession()) return;
        this.annualPurchasePerformanceForm.annualPurchasePerformanceShopId = shopNo;
        this.annualPurchasePerformanceTitle = "编辑代理商店铺（编号：" + shopNo + "）"
        this.dialogFormVisible = true;
    },
     //查看代理商关系
    annualPurchasePerformance(shopNo) {
        if (!this.checkSession()) return;
        this.changeForm.changeShopId = shopNo;
        this.changeTitle = "编辑代理商店铺（编号：" + shopNo + "）"
        this.dialogFormVisible = true;
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
    console.log(this.detailForm.sjh);
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
