<template>
    <div id="detailStore">
        <el-row class="content_title">
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
                        合同签约日期：{{ detailForm.shopName }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        店铺类型：{{ detailForm.shopType }}
                    </el-col>
                    <el-col :span="12">
                        已达成进货业绩：{{ detailForm.shopType}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        显示选项:{{ detailForm.isShow }}
                    </el-col>
                    <el-col :span="12">
                        年度目标进货业绩：{{ detailForm.shopName }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商姓名：{{ detailForm.name }}
                    </el-col>
                    <el-col :span="12">
                        进货业绩达成率：{{ detailForm.shopName }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商手机：{{ detailForm.phone }}
                    </el-col>
                    <el-col :span="12">
                        已达成店铺拓展：{{ detailForm.shopName }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                 
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商状态：{{ detailForm.state }}
                    </el-col>
                    <el-col :span="12">
                        年度目标店铺拓展：{{ detailForm.shopName }}
                    </el-col>
                </el-row>
          
                <el-row :gutter="10">
                    <el-col :span="12">
                        代理商等级：{{ detailForm.agentGradeId }}
                    </el-col>
                    <el-col :span="12">
                        店铺拓展达成率：{{ detailForm.shopName }}
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
                        <router-link  class="router-link-active" :to="{ name: 'prepaidManage', params: { shopNo:detailForm.shopNo,name:'朱海波'}}">点击查看</router-link>                                         
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="24">
                        代理商关系：
                          <span @click='chengPre(scope.row.id,scope.row.shopName,scope.row.shopNo)'>点击查看</span>                        
                    </el-col>
                </el-row>    
                <el-row :gutter="5">
                    <el-col :span="24">
                       代理商年度业绩： 
                        <span @click='chengPre(scope.row.id,scope.row.shopName,scope.row.shopNo)'>点击查看</span>
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
            <el-dialog :title="annualPurchasePerformanceTitle"  size="tiny" >
                   <div>
                        <el-table-column prop="No" label="序号" sortable="custom" width="127">
                        </el-table-column>
                        <el-table-column prop="agent" label="代理商等级" sortable="custom" width="127">
                        </el-table-column>
                        <el-table-column prop="day" label="年份" sortable="custom" width="127">
                        </el-table-column>
                        <el-table-column prop="agent" label="目标店铺" sortable="custom" width="127">
                        </el-table-column>
                        <el-table-column prop="agent" label="达成" sortable="custom" width="127">
                        </el-table-column>
                        <el-table-column prop="agent" label="目标进货额" sortable="custom" width="127">
                        </el-table-column>
                        <el-table-column prop="agent" label="达成" sortable="custom" width="127">
                        </el-table-column>
                        <el-table-column prop="agent" label="年度业绩" sortable="custom" width="127">
                        </el-table-column>
                   </div>
                 
            </el-dialog>
            <div class="plPage clearfix">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </div>
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
      changeForm: {
        changeShopId: "",
        changeShopName: "",
        changeType: "",
        alterMoney: "",
        remark: "",
        salesMan: "",
        operator: "",
        salesManId: "",
        operatorId: ""
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
        sjh:'sjh',
      },
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
    //查看代理商年度业绩
    annualPurchasePerformance(id) {
        if (!this.checkSession()) return;
        this.changeForm.changeShopId = id;
        this.changeTitle = "编辑代理商店铺（编号：" + shopNo + "）"
        this.dialogFormVisible = true;
    },
     //查看代理商关系
    annualPurchasePerformance(id) {
        if (!this.checkSession()) return;
        this.changeForm.changeShopId = id;
        this.changeTitle = "编辑代理商店铺（编号：" + shopNo + "）"
        this.dialogFormVisible = true;
    },
    dian(){
        this.detailForm.sjh="shj"
        console.log(this.detailForm.sjh)
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
    }
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

.el-table .labelCss {
  background-color: #fff;
}

.el-table .el-table__footer-wrapper {
  font-weight: 600;
}

#detailStore {
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
      cursor: pointer;
    }
  }
}
</style>
