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
                        <el-form-item label="注册店铺名：" label-width="38%">
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
                                <el-option label="审核通过" value="AUDIT_PASS"></el-option>
                                <el-option label="退款中" value="REFUNDING"></el-option>
                                <el-option label="退款成功" value="REDUNS_SUCCESS"></el-option>
                                <el-option label="审核通过，请退货" value="AUDIT_PASS_WAIT_SEND"></el-option>
                                <el-option label="已退回，待收货" value="SEND_WAIT_RECEIVED"></el-option>
                                <el-option label="已收货，确认中" value="RECEIVED_WAIT_CONFIRM"></el-option>
                                <el-option label="退款关闭" value="CANCEL"></el-option>
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
                <el-table-column prop="shopName" label="店铺名称">
                </el-table-column>
                <el-table-column prop="refundType" label="退款类型">
                    <template scope="scope">
                        {{ scope.row.refundType === 'SEND_BEFORE_REFUND' ? '整单退款' : (scope.row.refundType === 'REFUND_GOODS' ? '退款退货' : (scope.row.refundType === 'REFUND_AMOUNT' ? '仅退款' :'')) }}
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
                        <router-link :to="{ name: 'orderInfo', params: { purchaseOrderNo: scope.row.purchaseOrderNo,shopNo:scope.row.shopNo }}">{{ scope.row.purchaseOrderNo }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <router-link :to="{ name: 'drawBackDetail', params: { purchaseOrderBackNo: scope.row.purchaseOrderBackNo }}">详情</router-link>
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
            pageSize: 30,                   //当前条数
            currentPage: 1,                 //当前页
            totalNums: 500,                 //总条数
            order: '',                      //排序
            searchData: {                   //查询数据
                searchPhone: '',            //代理商手机
                searchShopName: '',         //注册店铺名
                searchNo: '',               //退款单号
                searchOrderNo: '',          //原进货单号
                searchState: '',            //状态
                searchTime: '',             //申请时间
            },
            tableData: [
                {
                    purchaseOrderBackNo: '',            //退款单号
                    shopNo: '',                         //代理商编号
                    phone: '',                          //手机号
                    shopName: '',                       //店铺名称
                    refundType: '',                     //类型
                    refundState: '',                    //状态
                    applyTime: '',                      //申请时间
                    purchaseOrderNo: '',                //原进货单号
                    serviceRemark: '',                  //客服备注
                }
            ]
        }
    },
    created() {
        // 获取页面初始化数据
        var qs = require('qs');
        this.$ajax.post('api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml', qs.stringify({
            'pager.pageIndex': 1,
            'pager.pageSize': this.pageSize,
        }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                this.tableData = res.data.result;
                this.totalNums = res.data.totalNums;
            }).catch((err) => {
                this.$message({
                    messgae: err.data.msg,
                    type: 'error',
                });
            });
    },
    methods: {
        // 双击跳转
        // dbClick(row, event) {
        //     console.log(row);
        //     this.$router.push({ name: 'drawBackDetail', params: { purchaseOrderBackNo: row.purchaseOrderBackNo } })
        // },
        //每页条数选择
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //当前页跳转，在排序完后做
        handleCurrentChange(val) {
            // if (!this.checkSession()) return;
            var time = this.dealTime();
            //默认的axios是json格式，需要转换为form格式，并且将参数序列化stringify
            var qs = require('qs');
            this.$ajax.post('api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml', qs.stringify({
                'pager.pageIndex': val,
                'pager.pageSize': this.pageSize,
                'searchBackVo.phone': this.searchData.searchPhone,
                'searchBackVo.shopName': this.searchData.searchShopName,
                'searchBackVo.purchaseOrderBackNo': this.searchData.searchNo,
                'searchBackVo.purchaseOrderNo': this.searchData.searchOrderNo,
                'searchBackVo.purchaseOrderState': this.searchData.searchState,
                'searchBackVo.startTime': time[0],
                'searchBackVo.endTime': time[1],
            }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then((res) => {
                    this.tableData = res.data.result;
                    this.totalNums = res.data.totalNums;
                }).catch((err) => {
                    this.$message({
                        messgae: err.msg,
                        type: 'error',
                    });
                });
        },
        //排序
        // 传递字段未定，未做完
        store(row, column) {
            // if (!this.checkSession()) return;
            console.log(row);
            if (row.order === 'ascending') {
                this.order = 'asc';
            }
            if (row.order === 'descending') {
                this.order = 'desc';
            }
            var time = this.dealTime();
            console.log(time);
            //默认的axios是json格式，需要转换为form格式，并且将参数序列化stringify
            var qs = require('qs');
            this.$ajax.post('api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml', qs.stringify({
                'pager.pageIndex': this.currentPage,
                'pager.pageSize': this.pageSize,
                'searchBackVo.phone': this.searchData.searchPhone,
                'searchBackVo.shopName': this.searchData.searchShopName,
                'searchBackVo.purchaseOrderBackNo': this.searchData.searchNo,
                'searchBackVo.purchaseOrderNo': this.searchData.searchOrderNo,
                'searchBackVo.purchaseOrderState': this.searchData.searchState,
                'searchBackVo.startTime': time[0],
                'searchBackVo.endTime': time[1],
                'searchBackVo.sort': 'applyTime',
                'searchBackVo.order': this.order,
            }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then((res) => {
                    console.log(res);
                    this.tableData = res.data.result;
                    this.totalNums = res.data.totalNums;
                }).catch((err) => {
                    this.$message({
                        messgae: err.msg,
                        type: 'error',
                    });
                });
        },
        dealTime() {
            var temp = new Date(this.searchData.searchTime[0]);
            if (temp.getFullYear() > 2000) {
                var time1 = temp.getFullYear();
                if ((temp.getMonth() + 1) < 10) {
                    time1 = time1 + '-0' + (temp.getMonth() + 1);
                } else {
                    time1 = time1 + '-' + (temp.getMonth() + 1);
                }
                if (temp.getDate() < 10) {
                    time1 = time1 + '-0' + temp.getDate();
                } else {
                    time1 = time1 + '-' + temp.getDate();
                }
                console.log(time1);
                temp = new Date(this.searchData.searchTime[1]);
                var time2 = temp.getFullYear();
                if ((temp.getMonth() + 1) < 10) {
                    time2 = time2 + '-0' + (temp.getMonth() + 1);
                } else {
                    time2 = time2 + '-' + (temp.getMonth() + 1);
                }
                if (temp.getDate() < 10) {
                    time2 = time2 + '-0' + temp.getDate();
                } else {
                    time2 = time2 + '-' + temp.getDate();
                }
                console.log(time2);
            } else {
                var time1 = '';
                var time2 = '';
            }
            var time = new Array();
            time[0] = time1;
            time[1] = time2;
            return time;
        },
        // 查询
        onSubmit() {
            var time = this.dealTime();
            console.log(time);
            //默认的axios是json格式，需要转换为form格式，并且将参数序列化stringify
            var qs = require('qs');
            this.$ajax.post('api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml', qs.stringify({
                'pager.pageIndex': this.currentPage,
                'pager.pageSize': this.pageSize,
                'searchBackVo.phone': this.searchData.searchPhone,
                'searchBackVo.shopName': this.searchData.searchShopName,
                'searchBackVo.purchaseOrderBackNo': this.searchData.searchNo,
                'searchBackVo.purchaseOrderNo': this.searchData.searchOrderNo,
                'searchBackVo.purchaseOrderState': this.searchData.searchState,
                'searchBackVo.startTime': time[0],
                'searchBackVo.endTime': time[1],
            }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then((res) => {
                    console.log(res);
                    this.tableData = res.data.result;
                    this.totalNums = res.data.totalNums;
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        messgae: err.msg,
                        type: 'error',
                    });
                });
        },
    },
}
</script>

<style lang="less" scoped>
@import url('../assets/less/drawBack.less');
</style>
