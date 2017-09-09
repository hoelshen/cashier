<template>
<div class="prepaidManage">
	<div class="warp">
	<div id="search">
		<el-form label-width="85px" ref="form" :model="searchData">
		    	<el-row :gutter="10">
		    		<el-col :span="6">
		    			<el-form-item label="代理商编号">
		    			<el-input v-model="searchData.searchId" placeholder="代理商编号"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="代理商手机">
		    			<el-input v-model="searchData.searchPhone" placeholder="代理商手机号"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="变动类型">
		    			<el-select v-model="searchData.searchStatus" placeholder="状态">
		    				<el-option label="充值" value="TOP_UP"></el-option>
		    				<el-option label="扣款" value="DEDUCTIONS"></el-option>
		    				<el-option label="进货" value="PURCHASE"></el-option>
		    				<el-option label="退货" value="SALES_RETURN"></el-option>
		    			</el-select>
		    			</el-form-item>
		    		</el-col>
				<el-col :span="6">
		    			<el-form-item label="变更时间">
		    			<el-date-picker width="200" v-model="searchData.searchTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="2">
		    			<el-button type="primary" style="margin-left:10px" @click="onSumbit">查询</el-button>
		    		</el-col>
		    	</el-row>
		    	<el-row :gutter="20">
		    		<el-col :span="6">
		    			<el-form-item label="代理商等级">
		    			<el-select multiple v-model="searchData.searchLevel" placeholder="代理商等级">
		    				<el-option label="待审核" value="waitPass"></el-option>
		    				<el-option label="待发货" value="waitExp"></el-option>
		    				<el-option label="已发货" value="doneExp"></el-option>
		    				<el-option label="已完成" value="finish"></el-option>
		    			</el-select>
		    			</el-form-item>
		    		</el-col>
		    	</el-row>
		</el-form>
	</div>
	<div class="orderList">
		<el-table :data="tableData" style="width: 95%;margin: 30px auto;">
			<el-table-column prop="shopNo" label="代理商编号" width="140" style="position: relative"><!-- <template scope="scope">区域？单店？专柜？</template> -->
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="130">
			</el-table-column>
			<el-table-column prop="shopName" label="店铺名称">
			</el-table-column>
			<el-table-column prop="changeType" label="变更类型" width="100">
			</el-table-column>
			<el-table-column prop="alterMoney" label="变更金额" width="100">
			<template scope="scope"><p>{{ toFixed(scope.row.alterMoney) }}</p></template>
			</el-table-column>
			<el-table-column prop="afterMoney" label="结余" width="100">
			<template scope="scope"><p>{{ toFixed(scope.row.afterMoney) }}</p></template>
			</el-table-column>
			<el-table-column prop="remark" label="备注/单号" width="180">
			<template scope="scope"><p>{{ scope.row.remark == '' ?  scope.row.purchaseOrderNo : scope.row.remark }}</p></template>
			</el-table-column>
			<el-table-column prop="creator" label="变更人" width="90">
			</el-table-column>
			<el-table-column prop="createdTime" label="变更时间" width="180">
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
    data(){
        return {
        	 currentPage: 1,			//当前页
        	 totalNums:'',				//数据总数
    	 pageSize:30,			//当前页数
            searchData:{
            	searchPhone:'',		//代理商手机
            	searchId:'',			//代理商编号
            	searchStatus:'',		//订单状态
            	searchTime:'',		//下单时间
            	searchLevel:'',		//代理商等级
            },
            tableData:[
            {
            	purchaseOrderNo:'',		//单号
            	shopNo:'',			//代理商编号
            	phone:'',			//手机号
            	shopName:'',			//店铺名称
            	changeType:'',		//变更类型
            	alterMoney:'',			//变更金额
            	afterMoney:'',			//结余
            	remark:'',			//备注或单号
            	creator:'',			//变更人
            	orderStatus:'',		//状态
            	createdTime:'',		//变更时间
            }
            ]
        }
    },
    methods: {
    	onSumbit(){
		console.log(this.searchData.searchTime);
		this.$getData({
			url:'http/advanceDeposit/queryAdvanceDepositList.jhtml',
			data:{
				'pager.pageIndex': this.currentPage,
				'pager.pageSize': this.pageSize,
				'advanceDeposit.shopNo':this.searchData.searchId,
				'advanceDeposit.phone':this.searchData.searchPhone,
				'advanceDeposit.changeType':this.searchData.searchStatus,
				'advanceDeposit.startTime':this.searchData.searchTime[0],
				'advanceDeposit.endTime':this.searchData.searchTime[1],
				//还有个代理商等级
			},
			success(response){
				this.tableData = response.data.result;
		         		this.totalNums=response.data.totalNums;
			},
			fail(response){
				alert(response.data.msg);
			},
			error(response){
				alert(response.data.msg);
			}
	    	});
    	},
	handleSizeChange(val) {
	    console.log(`每页 ${val} 条`);
	  },
	handleCurrentChange(val) {
    	this.$getData({
		url:'http/advanceDeposit/queryAdvanceDepositList.jhtml',
		data:{
			'pager.pageIndex': val,
			'pager.pageSize': this.pageSize,
		},
		success(response){
			this.tableData = response.data.result;
	         		this.totalNums=response.data.totalNums;
		},
		fail(response){
			alert(response.data.msg);
		},
		error(response){
			alert(response.data.msg);
		}
    	});
		console.log(`当前页: ${val}`);
	},
	toFixed(num){
		return Number(num).toFixed(6).substring(0,Number(num).toFixed(6).lastIndexOf('.')+3);
	},
    },
    created(){
    	this.$getData({
		url:'http/advanceDeposit/queryAdvanceDepositList.jhtml',
		data:{
			'pager.pageIndex': this.currentPage,
			'pager.pageSize': this.pageSize,
		},
		success(response){
			this.tableData = response.data.result;
	         		this.totalNums=response.data.totalNums;
		}
    	});
    },
}
</script>

<style>
.el-form .el-row{
	/*width: calc(100%-80px);*/
	width: 1220px;
}
.warp{
	margin-top: 30px;
}

#search .el-form{
    	margin-left: 18px;
}
.el-date-editor--daterange.el-input{
	width: 200px;
    	margin-left: 13px;
}
..el-table{
	width: 95%;
	margin: 30px auto;
	display: block;
}
</style>