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
		    			<el-input v-model="searchData.storeName" placeholder="注册店铺名"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="进货单号">
		    			<el-input v-model="searchData.orderNum" placeholder="进货单号"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="状态" label-width="50px">
		    			<el-select :model="searchData.orderStatus" placeholder="状态">
		    				<el-option label="待审核" value="waitPass"></el-option>
		    				<el-option label="待发货" value="waitExp"></el-option>
		    				<el-option label="已发货" value="doneExp"></el-option>
		    				<el-option label="已完成" value="finish"></el-option>
		    			</el-select>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="2" >
		    			<el-button type="primary" >查询</el-button>
		    		</el-col>
		    	</el-row>
		    	<el-row :gutter="20">
				<el-col :span="6">
		    			<el-form-item label="下单时间" label-width="72px">
		    			<el-date-picker width="200" v-model="searchData.orderTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="6">
		    			<el-form-item label="代理商等级">
		    			<el-select :model="searchData.level" placeholder="代理商等级">
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
			<el-table-column prop="orderNum" label="进货单号" width="140">
			</el-table-column>
			<el-table-column prop="agentNum" label="代理商编号" width="140" style="position: relative"><template scope="scope">区域？单店？专柜？</template>
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="100">
			</el-table-column>
			<el-table-column prop="phone" label="店铺名称">
			</el-table-column>
			<el-table-column prop="phone" label="状态" width="100">
			</el-table-column>
			<el-table-column prop="phone" label="下单时间" width="140">
			</el-table-column>
			<el-table-column prop="phone" label="金额" width="140">
			</el-table-column>
			<el-table-column prop="phone" label="详情" width="100">
			<router-link :to="{ name: 'orderInfo', params: { orderNum: 123 }}">详情</router-link>
			</el-table-column>
		</el-table>
	</div>
	<el-pagination style="float: right;margin-right: 50px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
	</el-pagination>	
	</div>
</div>
</template>

<script type="text/javascript" src="../router.js"></script>
<script>
export default {
    data(){
        return {
        	currentPage: 1,
            searchData:{
            	searchPhone:'',		//代理商手机
            	storeName:'',			//注册店铺名
            	orderNum:'',			//进货单号
            	orderStatus:'',			//订单状态
            	orderTime:'',			//下单时间
            	level:'',				//代理商等级
            },
            tableDate:[
            {
            	orderNum:'',			//进货单号
            	agentNum:'',			//代理商编号
            	phone:'',			//手机号
            	storeName:'',			//店铺名称
            	orderStatus:'',			//状态
            	orderTime:'',			//下单时间
            	money:'',			//金额
            }
            ]
        }
    },
    methods: {
	handleSizeChange(val) {
	    console.log(`每页 ${val} 条`);
	  },
	  handleCurrentChange(val) {
	    console.log(`当前页: ${val}`);
	  }    	
    }
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