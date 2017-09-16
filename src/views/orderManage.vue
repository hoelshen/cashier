<template>
<div class="orderManage">
	<div class="warp">
	<div id="search">
		<el-form label-width="85px" ref="form" :model="searchData">
		    	<el-row :gutter="20">
		    		<el-col :span="6">
		    			<el-form-item label="代理商手机">
		    			<el-input v-model="searchData.searchPhone" placeholder="代理商手机号"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="6">
		    			<el-form-item label="注册店铺名">
		    			<el-input v-model="searchData.searchName" placeholder="注册店铺名"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="进货单号">
		    			<el-input v-model="searchData.searchOrderNo" placeholder="进货单号"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="状态" label-width="50px">
		    			<el-select v-model="searchData.searchState" clearable placeholder="请选择">
		    				<el-option label="待审核" value="WAIT_CHECK"></el-option>
		    				<el-option label="待发货" value="WAIT_SEND"></el-option>
		    				<el-option label="已发货" value="DELIVERED"></el-option>
		    				<el-option label="已完成" value="FINISH"></el-option>
		    				<el-option label="退款成功" value="RETURN_FINISH"></el-option>
		    			</el-select>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="2" >
		    			<el-button type="primary" @click='onSumbit'>查询</el-button>
		    		</el-col>
		    	</el-row>
		    	<el-row :gutter="20">
				<el-col :span="6">
		    			<el-form-item label="下单时间" label-width="72px">
		    			<el-date-picker width="200" v-model="searchData.searchTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="6">
		    			<el-form-item label="代理商等级">
		    			<el-select v-model="searchData.searchLevel" clearable multiple placeholder="全部">
		    				<el-option label="区域代理" value="265"></el-option>
		    				<el-option label="专柜代理" value="266"></el-option>
		    				<el-option label="单店代理" value="31"></el-option>
		    			</el-select>
		    			</el-form-item>
		    		</el-col>
		    	</el-row>
		</el-form>
	</div>
	<div class="orderList">
		<el-table :data="tableData" style="width: 95%;margin: 30px auto;font-size: 12px;" @sort-change='store'>
			<el-table-column prop="purchaseOrderNo" label="进货单号" width="140">
			</el-table-column>
			<el-table-column prop="agentGradeId" label="代理商编号" width="180" style="position: relative"><template scope="scope">{{ scope.row.shopNo }}<p class="textBlue" v-if="scope.row.agentGradeId === 31">单店</p><p class="textOrange" v-if="scope.row.agentGradeId === 265">区域</p><p class="textYellow" v-if="scope.row.agentGradeId === 266">专柜</p></template>
</el-table-column>
<el-table-column prop="phone" label="手机号" width="140">
</el-table-column>
<el-table-column prop="shopName" label="店铺名称">
</el-table-column>
<el-table-column prop="stateName" label="状态" width="100">
</el-table-column>
<el-table-column prop="orderTime" label="下单时间" width="180">
</el-table-column>
<el-table-column prop="orderSum" label="金额" sortable="custom" width="140">
    <template scope="scope"><p>{{ toFixed(scope.row.orderSum) }}</p></template>
</el-table-column>
<el-table-column prop="phone" label="详情" width="100">
    <template scope="scope"><router-link :to="{ name: 'orderInfo', params: { purchaseOrderNo: scope.row.purchaseOrderNo,shopNo:scope.row.shopNo }}">详情</router-link></template>
</el-table-column>
</el-table>
</div>
<el-pagination style="float: right;margin-right: 50px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalNums">
</el-pagination>
</div>
</div>
</template>

<script type="text/javascript" src="../router.js"></script>
<script>
    export default {
        data() {
            return {
                currentPage: 1, //当前页
                totalNums: '', //数据总数
                pageSize: 30, //当前页数
                total: '', //数据总数
                order: '', //排序方式
                searchData: {
                    searchPhone: '', //代理商手机
                    searchName: '', //注册店铺名
                    searchOrderNo: '', //进货单号
                    searchState: '', //订单状态
                    searchTime: '', //下单时间
                    searchLevel: [], //代理商等级
                    Level: [], //代理商等级替代
                },
                tableData: [{
                    purchaseOrderNo: '', //进货单号
                    agentGradeId: '', //代理商等级
                    shopNo: '', //代理商编号
                    phone: '', //手机号
                    shopName: '', //店铺名称
                    stateName: '', //状态
                    orderTime: '', //下单时间
                    orderSum: '', //金额
                }]
            }
        },
        methods: {
            onSumbit() {
                if (this.searchData.searchLevel != '') {
                    this.searchData.level = this.searchData.searchLevel.join(',');
                } else {
                    this.searchData.level = '';
                }
                console.log(this.searchData.searchLevel);
                const self = this;
                self.$ajax({
                    url: '/api/http/purchaseOrder/queryPurchaseOrderList.jhtml',
                    method: 'post',
                    data: {
                        'pager.pageIndex': 1,
                        'pager.pageSize': this.pageSize,
                        'purchaseOrder.phone': this.searchData.searchPhone,
                        'purchaseOrder.shopName': this.searchData.searchName,
                        'purchaseOrder.purchaseOrderNo': this.searchData.searchOrderNo,
                        'purchaseOrder.state': this.searchData.searchState,
                        'purchaseOrder.agentGradeIds': this.searchData.level,
                        'advanceDeposit.startTime': this.searchData.searchTime[0],
                        'advanceDeposit.endTime': this.searchData.searchTime[1],
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
                }).then(function(response) {
                    if (response.data.success === 1) {
                        self.tableData = response.data.result;
                        self.totalNums = response.data.totalNums;
                    } else {
                        alert(response.data.msg);
                    }
                }).catch(function(error) {

                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                if (this.searchData.searchLevel != '') {
                    this.searchData.level = this.searchData.searchLevel.join(',');
                } else {
                    this.searchData.level = '';
                }
                console.log(this.searchData.searchLevel);
                this.$getData({
                    url: 'http/purchaseOrder/queryPurchaseOrderList.jhtml',
                    data: {
                        'pager.pageIndex': val,
                        'pager.pageSize': this.pageSize,
                        'purchaseOrder.phone': this.searchData.searchPhone,
                        'purchaseOrder.shopName': this.searchData.searchName,
                        'purchaseOrder.purchaseOrderNo': this.searchData.searchOrderNo,
                        'purchaseOrder.state': this.searchData.searchState,
                        'purchaseOrder.agentGradeIds': this.searchData.level,
                        'advanceDeposit.startTime': this.searchData.searchTime[0],
                        'advanceDeposit.endTime': this.searchData.searchTime[1],
                        'purchaseOrder.sort': 'orderSum',
                        'purchaseOrder.order': this.order,
                    },
                    success(response) {
                        this.tableData = response.data.result;
                        this.totalNums = response.data.totalNums;
                    },
                    fail(response) {
                        alert(response.data.msg);
                    },
                    error(response) {
                        alert(response.data.msg);
                    }
                });
                console.log(`当前页: ${val}`);
            },
            store(row, column) {
                console.log(row);
                if (row.order === 'ascending') {
                    this.order = 'asc';
                }
                if (row.order === 'descending') {
                    this.order = 'desc';
                }
                if (this.searchData.searchLevel != '') {
                    this.searchData.level = this.searchData.searchLevel.join(',');
                } else {
                    this.searchData.level = '';
                }
                console.log(this.searchData.searchLevel);
                this.$getData({
                    url: 'http/purchaseOrder/queryPurchaseOrderList.jhtml',
                    data: {
                        'pager.pageIndex': 1,
                        'pager.pageSize': this.pageSize,
                        'purchaseOrder.phone': this.searchData.searchPhone,
                        'purchaseOrder.shopName': this.searchData.searchName,
                        'purchaseOrder.purchaseOrderNo': this.searchData.searchOrderNo,
                        'purchaseOrder.state': this.searchData.searchState,
                        'purchaseOrder.agentGradeIds': this.searchData.level,
                        'advanceDeposit.startTime': this.searchData.searchTime[0],
                        'advanceDeposit.endTime': this.searchData.searchTime[1],
                        'purchaseOrder.sort': 'orderSum',
                        'purchaseOrder.order': this.order,
                    },
                    success(response) {
                        this.tableData = response.data.result;
                        this.totalNums = response.data.totalNums;
                    },
                    fail(response) {
                        alert(response.data.msg);
                    },
                    error(response) {
                        alert(response.data.msg);
                    }
                });
            },
            toFixed(num) {
                return Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3);
            },
        },
        created() {
            this.$getData({
                url: 'http/purchaseOrder/queryPurchaseOrderList.jhtml',
                data: {
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize,
                },
                success(response) {
                    this.tableData = response.data.result;
                    this.totalNums = response.data.totalNums;
                },
                fail(response) {
                    alert(response.data.msg);
                },
            });
        },
    }
</script>

<style lang="less" scoped>
    @import url('../assets/less/orderManage.less');
</style>