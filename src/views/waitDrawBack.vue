<template>
    <div class="drawBack">
        <div class="search">
            <el-form v-model="searchData">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item label="代理商手机：" label-width="38%">
                            <el-input v-model="searchData.searchPhone" @keyup.enter.native="onSubmit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="代理商名称：" label-width="38%">
                            <el-input v-model="searchData.searchShopName" @keyup.enter.native="onSubmit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="退款单号：" label-width="38%">
                            <el-input v-model="searchData.searchNo" @keyup.enter.native="onSubmit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="原进货单号：" label-width="38%">
                            <el-input v-model="searchData.searchOrderNo" @keyup.enter.native="onSubmit"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item label="状态：" label-width="38%">
                            <el-select v-model="searchData.searchState" clearable>
                                <el-option label="待审核" value="WAIT_AUDIT"></el-option>
                                <el-option label="已收货，确认中" value="RECEIVED_WAIT_CONFIRM"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请时间：  " label-width="38%">
                            <el-date-picker type="daterange" placeholder="选择日期范围" v-model="searchData.searchTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="margin-left:5%;">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="drawBackList">
            <el-table border :data="tableData" @sort-change='store'>
                <el-table-column prop="purchaseOrderBackNo" label="退款单号" width="160px">
                </el-table-column>
                <el-table-column prop="shopNo" label="代理商编号" width="110px">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
                <el-table-column prop="name" label="代理商名称">
                </el-table-column>
                <el-table-column prop="refundType" label="退款类型">
                    <template scope="scope">
                        {{ scope.row.refundType === 'SEND_BEFORE_REFUND' ? '整单退款' : (scope.row.refundType === 'REFUND_GOODS' ? '退货退款' : (scope.row.refundType === 'REFUND_AMOUNT' ? '仅退款' :'')) }}
                    </template>
                </el-table-column>
                <el-table-column prop="refundState" label="状态">
                    <template scope="scope">
                        {{ scope.row.refundState === 'WAIT_AUDIT' ? '待审核':(scope.row.refundState === 'AUDIT_PASS_REFUNDING' ? '审核通过,退款中':(scope.row.refundState === 'REDUNS_SUCCESS' ? '退款成功' : (scope.row.refundState === 'AUDIT_PASS_WAIT_SEND' ? '审核通过，请退货':(scope.row.refundState === 'SEND_WAIT_RECEIVED' ? '已退回，待收货': (scope.row.refundState === 'RECEIVED_WAIT_CONFIRM' ? '已收货，确认中':(scope.row.refundState === 'CANCEL' ? '退款关闭' :'')))))) }}
                    </template>
                </el-table-column>
                <el-table-column prop="applyTime" label="申请时间" sortable="custom" width="170px">
                </el-table-column>
                <el-table-column prop="purchaseOrderNo" label="原进货单号" width="160px">
                    <template scope="scope">
                        <!-- <router-link target="_blank" :to="{ name: 'orderInfo', params: { purchaseOrderNo: scope.row.purchaseOrderNo,shopNo:scope.row.shopNo }}">{{ scope.row.purchaseOrderNo }}</router-link> -->
                        <a :href="scope.row.linkTo" target="_Blank">{{ scope.row.purchaseOrderNo }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <router-link :to="{ name: 'drawBackDetail', params: { purchaseOrderBackNo: scope.row.purchaseOrderBackNo}}">详情</router-link>
                        <!-- v-if="备注判断未添加" -->
                        <el-tooltip class="item" effect="light" placement="top" v-if="scope.row.serviceRemark">
                            <div slot="content" class="tooltip">{{ scope.row.serviceRemark }}</div>
                            <img class="qizi icon iconfont icon-qizi" src="" alt="">
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalNums"></el-pagination>
        </div>
    </div>
</template>

<script type="text/javascript" src="../router.js"></script>
<script>
export default {
  data() {
    return {
      pageSize: 30, //当前条数
      currentPage: 1, //当前页
      totalNums: 500, //总条数
      order: "", //排序
      searchData: {
        //查询数据
        searchPhone: "", //代理商手机
        searchShopName: "", //代理商名称
        searchNo: "", //退款单号
        searchOrderNo: "", //原进货单号
        searchState: "", //状态
        searchTime: "" //申请时间
      },
      tableData: [
        {
          purchaseOrderBackNo: "", //退款单号
          shopNo: "", //代理商编号
          phone: "", //手机号
          shopName: "", //店铺名称
          name: "",//代理商名称
          refundType: "", //类型
          refundState: "", //状态
          applyTime: "", //申请时间
          purchaseOrderNo: "", //原进货单号
          serviceRemark: "" //客服备注
        }
      ]
    };
  },
  created() {
    if (!this.checkSession()) return;
    this.uri = this.getUri();
    //获取id
    var src = window.location.href.split("/");
    this.id = src[src.length - 2];

    // 获取页面初始化数据
    var qs = require("qs");
    this.$ajax
      .post(
        "api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml",
        qs.stringify({
          "pager.pageIndex": 1,
          "pager.pageSize": this.pageSize,
          "searchBackVo.isWaitAudit": 1,
          "searchBackVo.sort": "applyTime",
          "searchBackVo.order": "desc"
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(res => {
        this.tableData = res.data.result;
        this.totalNums = res.data.totalNums;
        // 拼接订单号链接
        var src = window.location.href.split("/");
        this.orderId = src[src.length - 1];
        src[4] = "orderInfo";
        for (let i = 0; i < this.tableData.length; i++) {
          src[5] = this.tableData[i].purchaseOrderNo;
          src[6] = this.tableData[i].shopNo;
          this.tableData[i].linkTo = src.join("/");
        }
      })
      .catch(err => {
        this.$message({
          messgae: err.data.msg,
          type: "error"
        });
      });
  },
  methods: {
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
    //获取url
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
    //每页条数选择
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //当前页跳转，在排序完后做
    handleCurrentChange(val) {
      if (!this.checkSession()) return;
      var time = this.dealTime();
      //默认的axios是json格式，需要转换为form格式，并且将参数序列化stringify
      var qs = require("qs");
      this.$ajax
        .post(
          "api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml",
          qs.stringify({
            "pager.pageIndex": val,
            "pager.pageSize": this.pageSize,
            "searchBackVo.phone": this.searchData.searchPhone,
            "searchBackVo.name": this.searchData.searchShopName,
            "searchBackVo.purchaseOrderBackNo": this.searchData.searchNo,
            "searchBackVo.purchaseOrderNo": this.searchData.searchOrderNo,
            "searchBackVo.purchaseOrderState": this.searchData.searchState,
            "searchBackVo.isWaitAudit": 1,
            "searchBackVo.startTime": time[0],
            "searchBackVo.endTime": time[1]
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.result;
          this.totalNums = res.data.totalNums;
          // 拼接订单号链接
          var src = window.location.href.split("/");
          this.orderId = src[src.length - 1];
          src[4] = "orderInfo";
          for (let i = 0; i < this.tableData.length; i++) {
            src[5] = this.tableData[i].purchaseOrderNo;
            src[6] = this.tableData[i].shopNo;
            this.tableData[i].linkTo = src.join("/");
          }
        })
        .catch(err => {
          this.$message({
            messgae: err.msg,
            type: "error"
          });
        });
    },
    //排序
    store(row, column) {
      if (!this.checkSession()) return;
      if (row.order === "ascending") {
        this.order = "asc";
      }
      if (row.order === "descending") {
        this.order = "desc";
      }
      var time = this.dealTime();
      //默认的axios是json格式，需要转换为form格式，并且将参数序列化stringify
      var qs = require("qs");
      this.$ajax
        .post(
          "api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml",
          qs.stringify({
            "pager.pageIndex": this.currentPage,
            "pager.pageSize": this.pageSize,
            "searchBackVo.phone": this.searchData.searchPhone,
            "searchBackVo.name": this.searchData.searchShopName,
            "searchBackVo.purchaseOrderBackNo": this.searchData.searchNo,
            "searchBackVo.purchaseOrderNo": this.searchData.searchOrderNo,
            "searchBackVo.purchaseOrderState": this.searchData.searchState,
            "searchBackVo.startTime": time[0],
            "searchBackVo.endTime": time[1],
            "searchBackVo.isWaitAudit": 1,
            "searchBackVo.sort": "applyTime",
            "searchBackVo.order": this.order
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.result;
          this.totalNums = res.data.totalNums;
          // 拼接订单号链接
          var src = window.location.href.split("/");
          this.orderId = src[src.length - 1];
          src[4] = "orderInfo";
          for (let i = 0; i < this.tableData.length; i++) {
            src[5] = this.tableData[i].purchaseOrderNo;
            src[6] = this.tableData[i].shopNo;
            this.tableData[i].linkTo = src.join("/");
          }
        })
        .catch(err => {
          this.$message({
            messgae: err.msg,
            type: "error"
          });
        });
    },
    dealTime() {
      var temp = new Date(this.searchData.searchTime[0]);
      if (temp.getFullYear() > 2000) {
        var time1 = temp.getFullYear();
        if (temp.getMonth() + 1 < 10) {
          time1 = time1 + "-0" + (temp.getMonth() + 1);
        } else {
          time1 = time1 + "-" + (temp.getMonth() + 1);
        }
        if (temp.getDate() < 10) {
          time1 = time1 + "-0" + temp.getDate();
        } else {
          time1 = time1 + "-" + temp.getDate();
        }
        temp = new Date(this.searchData.searchTime[1]);
        var time2 = temp.getFullYear();
        if (temp.getMonth() + 1 < 10) {
          time2 = time2 + "-0" + (temp.getMonth() + 1);
        } else {
          time2 = time2 + "-" + (temp.getMonth() + 1);
        }
        if (temp.getDate() < 10) {
          time2 = time2 + "-0" + temp.getDate();
        } else {
          time2 = time2 + "-" + temp.getDate();
        }
      } else {
        var time1 = "";
        var time2 = "";
      }
      var time = new Array();
      time[0] = time1;
      time[1] = time2;
      return time;
    },
    // 查询
    onSubmit() {
      if (!this.checkSession()) return;
      var time = this.dealTime();
      //默认的axios是json格式，需要转换为form格式，并且将参数序列化stringify
      var qs = require("qs");
      this.$ajax
        .post(
          "api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml",
          qs.stringify({
            "pager.pageIndex": this.currentPage,
            "pager.pageSize": this.pageSize,
            "searchBackVo.phone": this.searchData.searchPhone,
            "searchBackVo.name": this.searchData.searchShopName,
            "searchBackVo.purchaseOrderBackNo": this.searchData.searchNo,
            "searchBackVo.purchaseOrderNo": this.searchData.searchOrderNo,
            "searchBackVo.purchaseOrderState": this.searchData.searchState,
            "searchBackVo.startTime": time[0],
            "searchBackVo.isWaitAudit": 1,
            "searchBackVo.endTime": time[1]
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.result;
          this.totalNums = res.data.totalNums;
          // 拼接订单号链接
          var src = window.location.href.split("/");
          this.orderId = src[src.length - 1];
          src[4] = "orderInfo";
          for (let i = 0; i < this.tableData.length; i++) {
            src[5] = this.tableData[i].purchaseOrderNo;
            src[6] = this.tableData[i].shopNo;
            this.tableData[i].linkTo = src.join("/");
          }
        })
        .catch(err => {
          this.$message({
            messgae: err.msg,
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/less/drawBack.less");
</style>
