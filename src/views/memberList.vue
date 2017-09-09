<template>
<div class="prepaidManage">
	<div class="warp">
	<div id="search">
		<el-form label-width="85px" ref="form" :model="searchData">
		    	<el-row :gutter="10">
				<el-col :span="6">
		    			<el-form-item label="注册店铺名">
		    			<el-input v-model="searchData.searchShop" placeholder="注册店铺名"></el-input>
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
		    			<el-date-picker width="200" v-model="searchData.searchTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="2">
		    			<el-button type="primary" style="margin-left:10px" @click="onSumbit">查询</el-button>
		    		</el-col>
		    	</el-row>
		    	<el-row :gutter="20">
		    		<el-col :span="6">
		    			<el-form-item label="会员等级">
		    			<el-select v-model="searchData.searchLevel" clearable placeholder="请选择">
		    				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
 	options: [{				//会员等级
		value: '1',
		label: 'v0'
	}, {
		value: '2',
		label: 'v1'
	}, {
		value: '3',
		label: 'v2'
	}, {
		value: '4',
		label: 'v3'
	}, {
		value: '5',
		label: 'v4'
	},{
		value: '6',
		label: 'v5'
	}, {
		value: '7',
		label: 'v6'
	}, {
		value: '8',
		label: 'v7'
	}, {
		value: '9',
		label: 'v8'
	}, {
		value: '10',
		label: 'v9'
	},{
		value: '11',
		label: 'v10'
	}, {
		value: '12',
		label: 'v11'
	}, {
		value: '13',
		label: 'v12'
	}, {
		value: '14',
		label: 'v13'
	}],
            searchData:{
            	searchPhone:'',		//代理商手机
            	searchShop:'',		//注册店铺名
            	searchName:'',		//姓名
            	searchTime:'',		//注册时间
            	searchLevel:[],		//代理商等级
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
	console.log(this.searchData.searchLevel);
            const self = this;
	self.$ajax.post('api/customerInfo/customerInfo/search.jhtml',{
                        'page': this.currentPage,
		'rows': this.pageSize,
		'customerInfo.shop.shopName':this.searchData.searchShop,
		'customerInfo.phone':this.searchData.searchPhone,
		'customerInfo.name':this.searchData.searchName,
		'customerInfo.gid':this.searchData.searchLevel,
		'customerInfo.startTime':this.searchData.searchTime[0],
		'customerInfo.endTime':this.searchData.searchTime[1],
                    }).then(function(res){
		console.log(res);
		})
		.catch(function(err){
		console.log(err);
		});
           //          transformRequest: [function (data) {
           //              // Do whatever you want to transform the data
           //              let ret = ''
           //              for (let it in data) {
           //                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '||'
           //              }
           //              return ret;
           //          }],
           //          headers: {
           //              'Content-Type': 'application/x-www-form-urlencoded'
           //          }
           //      }).then(function(response){
           //          if(response.data.success == 1){
           //          	console.log(response);
           //          	self.tableData = response.data.rows;
         		// self.totalNums=response.data.total;
           //          }else{
           //              alert(response.data.msg);
           //          }
           //      }).catch(function(error){

           //      });
		// this.getData({
		// 	url:'customerInfo/customerInfo/search.jhtml',
		// 	data:{
		// 		'pager.pageIndex': this.currentPage,
		// 		'pager.pageSize': this.pageSize,
		// 		'customerInfo.shop.shopName':this.searchData.searchShop,
		// 		'customerInfo.phone':this.searchData.searchPhone,
		// 		'customerInfo.name':this.searchData.searchName,
		// 		'customerInfo.gid':this.searchData.searchLevel,
		// 		'customerInfo.startTime':this.searchData.searchTime[0],
		// 		'customerInfo.endTime':this.searchData.searchTime[1],
		// 	},
		// 	success(response){
		// 		this.tableData = response.data.rows;
		//          		this.totalNums=response.data.total;
		// 	},
		// 	fail(response){
		// 		alert(response.data.msg);
		// 	},
		// 	error(response){
		// 		alert(response.data.msg);
		// 	}
	 //    	});
    	},
	handleSizeChange(val) {
	    console.log(`每页 ${val} 条`);
	  },
	handleCurrentChange(val) {
    	this.getData({
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
	getData(obj) {
	const self = this;
	obj.method = obj.method || 'get';
	obj.url = obj.url || '';
	obj.data = obj.data  || {};
	obj.success = obj.success || function () {};
	obj.fail = obj.fail || function () {};
	obj.error = obj.error || function () {};
	if (obj.method === 'get') {
		var str = '?';
		for(var item in obj.data){
			if (obj.data[item] != '' && obj.data[item] != undefined) {
				str  += item + '=' + obj.data[item] + '&';
			}
		}
		str = str.substring(0,str.length-1);
		obj.url = obj.url+str;
		self.$ajax({
			method: 'get',
			url: `api/${obj.url}`
		}).then(function(response){
			if(response.data.code === 1){
				obj.success.call(self,response);
			}else{
				// console.log(response);
				obj.fail.call(self,response);
			}
		}).catch(function(error){
			obj.error.call(self,error);
		});
	}
}
    },
    created(){
    	this.getData({
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
	width: 1210px;
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