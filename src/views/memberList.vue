<template>
<div class="prepaidManage">
	<div class="warp">
	<div id="search">
		<el-form label-width="85px" ref="form" :model="searchData">
		    	<el-row :gutter="10">
				<el-col :span="6">
		    			<el-form-item label="注册店铺名">
		    			<el-input v-model="searchData.shopName" placeholder="注册店铺名"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="手机">
		    			<el-input v-model="searchData.searchPhone" placeholder="手机号"></el-input>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="5">
		    			<el-form-item label="姓名">
		    			<el-input v-model="searchData.searchName" placeholder="姓名"></el-input>
		    			</el-form-item>
		    		</el-col>
				<el-col :span="6">
		    			<el-form-item label="注册时间">
		    			<el-date-picker width="200" v-model="searchData.createdTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="2">
		    			<el-button type="primary" style="margin-left:10px" @click="onSumbit">查询</el-button>
		    		</el-col>
		    	</el-row>
		    	<el-row :gutter="20">
		    		<el-col :span="6">
		    			<el-form-item label="会员等级">
		    			<el-select :model="searchData.level" multiple placeholder="请选择">
		    				<el-option label="v0" value="1"></el-option>
		    				<el-option label="v1" value="2"></el-option>
		    				<el-option label="v2" value="3"></el-option>
		    				<el-option label="v3" value="4"></el-option>
		    				<el-option label="v4" value="5"></el-option>
		    				<el-option label="v5" value="6"></el-option>
		    				<el-option label="v6" value="7"></el-option>
		    				<el-option label="v7" value="8"></el-option>
		    				<el-option label="v8" value="9"></el-option>
		    				<el-option label="v9" value="10"></el-option>
		    				<el-option label="v10" value="11"></el-option>
		    				<el-option label="v11" value="12"></el-option>
		    				<el-option label="v12" value="13"></el-option>
		    				<el-option label="v13" value="14"></el-option>
		    			</el-select>
		    			</el-form-item>
		    		</el-col>
		    	</el-row>
		</el-form>
	</div>
	<div class="orderList">
		<el-table :data="tableData" style="width: 95%;margin: 30px auto;" >
			<el-table-column label="序号" width="80">
				<template scope="scope">
				        <p class="limit">{{ (currentPage - 1) * pageSize + scope.$index + 1 < 10 ? '0' + ((currentPage - 1) * pageSize + scope.$index + 1) : (currentPage - 1) * pageSize + scope.$index + 1 }}</p>
				</template>
			</el-table-column>
			<el-table-column prop="PHONE" label="手机号" width="180">
			</el-table-column>
			<el-table-column prop="NAME" label="姓名">
			</el-table-column>
			<el-table-column prop="LEVER" label="会员等级" width="180">
			</el-table-column>
			<el-table-column prop="SHOPNAME" label="注册店铺" width="280">
			</el-table-column>
			<el-table-column prop="CREATED_TIME" label="注册时间" width="240">
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
            	shopName:'',			//注册店铺名
            	orderNum:'',			//进货单号
            	orderStatus:'',		//订单状态
            	createdTime:'',		//下单时间
            	level:'',				//代理商等级
            },
            tableData:[
            {
            	PHONE:'',			//手机号
            	SHOPNAME:'',		//注册店铺
            	NAME:'',			//姓名
            	LEVER:'',			//会员等级
            	CREATED_TIME:'',		//注册时间
            }
            ]
        }
    },
    methods: {
    	onSumbit(){
		console.log(this.searchData.searchTime);
		this.$getData({
			url:'customerInfo/customerInfo/search.jhtml',
			data:{
				'pager.pageIndex': this.currentPage,
				'pager.pageSize': this.pageSize,
				'customerInfo.shopName':this.searchData.searchId,
				'customerInfo.phone':this.searchData.searchPhone,
				'customerInfo.changeType':this.searchData.searchStatus,
				'customerInfo.startTime':this.searchData.searchTime[0],
				'customerInfo.endTime':this.searchData.searchTime[1],
			},
			success(response){
				this.tableData = response.data.rows;
		         		this.totalNums=response.data.total;
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
		url:'customerInfo/customerInfo/search.jhtml',
		data:{
			'pager.pageIndex': val,
			'pager.pageSize': this.pageSize,
		},
		success(response){
			this.tableData = response.data.rows;
	         		this.totalNums=response.data.total;
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
		url:'customerInfo/customerInfo/search.jhtml',
		data:{
			'pager.pageIndex': this.currentPage,
			'pager.pageSize': this.pageSize,
		},
		success(response){
			console.log(response);
			this.tableData = response.data.rows;
	         		this.totalNums=response.data.total;
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