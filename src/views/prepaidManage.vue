<template>
	<div class="prepaidManage">
		<div class="warp">
			<div id="search">
				<el-form label-width="85px" ref="form" v-model="searchData">
					<el-row :gutter="10">
						<el-col :span="6">
							<el-form-item label="代理商编号">
								<el-input @keyup.enter.native="onSumbit" v-model="searchData.searchId" placeholder="代理商编号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="代理商姓名">
								<el-input @keyup.enter.native="onSumbit" v-model="searchData.name" placeholder="代理商姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="变动类型">
								<el-select v-model="searchData.searchStatus" clearable placeholder="请选择">
									<el-option label="充值" value="TOP_UP"></el-option>
									<el-option label="扣款" value="DEDUCTIONS"></el-option>
									<el-option label="进货" value="PURCHASE"></el-option>
									<el-option label="退货" value="SALES_RETURN"></el-option>
									<el-option label="订单分成" value="ORDER_COMMISSOM"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="代理商等级"  >
								<el-select @keyup.enter.native="onSumbit" v-model="searchData.searchLevel" clearable multiple placeholder="全部">
									<el-option label="区域代理" value="265"></el-option>
									<el-option label="微店代理" value="266"></el-option>
									<el-option label="单店代理" value="31"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="6" >
							<el-form-item label="变更时间"  >
								<el-date-picker style="width:100%" v-model="searchData.searchTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="运营人员">
								<el-input @keyup.enter.native="onSumbit" v-model="searchData.operator" placeholder="运营人员"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-button type="primary" style="margin-left:15px" @click="onSumbit">查询</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="6" >
							<el-button  type="primary" @click="allOutputExcel()">导出明细</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!-- table -->
			<div class="orderList">
				<el-table border :data="tableData" style="margin: 20px auto;font-size: 14px;">
					<el-table-column prop="agentGradeId" label="代理商编号" width="120" style="position: relative">
						<template slot-scope="scope">{{ scope.row.shopNo }}
							<p class="textBlue" v-if="scope.row.agentGradeId === 31">单店</p>
							<p class="textOrange" v-if="scope.row.agentGradeId === 265">区域</p>
							<p class="textYellow" v-if="scope.row.agentGradeId === 266">微店</p>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="代理商姓名">
					</el-table-column>
					<el-table-column prop="shopName" label="店铺名称">
					</el-table-column>
					<el-table-column prop="changeType" label="变更类型" width="100">
					</el-table-column>
					<el-table-column prop="alterMoney" label="变更金额">
						<template slot-scope="scope">
							<p>{{ toFixed1(scope.row.alterMoney) }}</p>
						</template>
					</el-table-column>
					<el-table-column prop="afterMoney" label="结余">
						<template slot-scope="scope">
							<p>{{ toFixed(scope.row.afterMoney) }}</p>
						</template>
					</el-table-column>
					<el-table-column prop="remark" label="备注/单号" width="180">
						<template slot-scope="scope">
								<router-link target="_blank" v-if="scope.row.changeType === '进货'" :to="{ name: 'orderInfo', params: { purchaseOrderNo: scope.row.purchaseOrderNo,shopNo:scope.row.shopNo }}">{{scope.row.purchaseOrderNo}}</router-link>
								<router-link target="_blank" v-if="scope.row.changeType === '退货' " :to="{ name: 'drawBackDetail', params: { purchaseOrderBackNo: scope.row.purchaseOrderNo}}">{{scope.row.purchaseOrderNo}}</router-link>
								<p :title=scope.row.remark v-if="scope.row.changeType === '充值' || scope.row.changeType === '扣款' " style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{scope.row.remark}}
								</p>
								<p :title=scope.row.remark v-if="scope.row.changeType === '订单分成' ">{{scope.row.purchaseOrderNo}}
								</p>
						</template>
					</el-table-column>
					<el-table-column prop="creator" label="变更人" width="90">
					</el-table-column>
					<el-table-column prop="createdTime" label="变更时间">
					</el-table-column>
					<el-table-column prop="operator" label="运营人员">
					</el-table-column>
				</el-table>
				<div class="page">
					<el-pagination style="float: right;margin-right: 50px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="totalNums">
					</el-pagination>
				</div>				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript" src="../router.js"></script>
<script>
export default {
	data() {
		return {
			currentPage: 1,			//当前页
			totalNums: 0,				//数据总数
			pageSize: 30,			//当前页数
			searchData: {
				// searchPhone: '',		//代理商手机
				searchId: '',			//代理商编号
				searchStatus: '',		//订单状态
				searchTime: '',			//下单时间
				searchLevel: [],		//代理商等级
				Level: [],			//代理商等级替代
				name:'',        //代理商姓名
				operator:"" ,       //运营人员
			},
			tableData: [
				{
					purchaseOrderNo: '',		//单号
					shopNo: '',			//代理商编号
					// phone: '',			//手机号
					shopName: '',			//店铺名称
					changeType: '',		//变更类型
					alterMoney: '',			//变更金额
					afterMoney: '',			//结余
					remark: '',			//备注或单号
					creator: '',			//变更人
					orderStatus: '',		//状态
					createdTime: '',		//变更时间
					name:'',             //代理商姓名
					operator:'', 	     //运营人员
					searchLevel:''       //代理商等级 
				}
			],
			allId: '',
			loading:false,
		}
	},
	methods: {
		//判断是否超时
		checkSession() {
			const self = this;
			if (window.sessionStorage) {
				let nowDate = new Date().getTime();
				let time = (nowDate - sessionStorage.haha) / 1000
				//超过30秒没操作，重新登录
				if (time > 1800) {
					self.$router.push('/login');
					self.$message({
						message: '登录超时，请重新登录',
					})
					return false;
				} else {
					sessionStorage.haha = nowDate;
					return true;
				}
			}
		},
		onSumbit() {
			this.currentPage=1;
			if (!this.checkSession()) return;
			var temp = new Date(this.searchData.searchTime[0]);
			if (temp.getFullYear() > 2006) {
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
			if (this.searchData.searchLevel != '') {
				this.searchData.level = this.searchData.searchLevel.join(',');
			} else {
				this.searchData.level = '';
			}
			this.$getData({
				url: 'http/advanceDeposit/queryAdvanceDepositList.jhtml',
				data: {
					'pager.pageIndex': this.currentPage,
					'pager.pageSize': this.pageSize,
					'advanceDeposit.shopNo': this.searchData.searchId,
					'advanceDeposit.phone': this.searchData.searchPhone,
					'advanceDeposit.changeType': this.searchData.searchStatus,
					'advanceDeposit.startTime': time1,
					'advanceDeposit.endTime': time2,
					'advanceDeposit.name': this.searchData.name,
					'advanceDeposit.operator': this.searchData.operator,
					'advanceDeposit.agentGradeIds':this.searchData.searchLevel
				},
				success(response) {
					console.log(response.data.result)
					this.tableData = response.data.result;
					this.totalNums = response.data.totalNums;
				},
				fail(response) {
					this.$message({
						message: response.data.msg,
						type: 'error'
					})
				},
				error(response) {
					this.$message({
						message: response.data.msg,
						type: 'error'
					})
				}
			});
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			if (!this.checkSession()) return;
			var temp = new Date(this.searchData.searchTime[0]);
			if (temp.getFullYear() > 2016) {
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
			this.$getData({
				url: 'http/advanceDeposit/queryAdvanceDepositList.jhtml',
				data: {
					'pager.pageIndex': val,
					'pager.pageSize': this.pageSize,
					'advanceDeposit.shopNo': this.searchData.searchId,
					'advanceDeposit.phone': this.searchData.searchPhone,
					'advanceDeposit.changeType': this.searchData.searchStatus,
					'advanceDeposit.startTime': time1,
					'advanceDeposit.endTime': time2,
					'advanceDeposit.agentGradeIds': this.searchData.level,
					'advanceDeposit.name': this.searchData.name,
					'advanceDeposit.operator': this.searchData.operator,
					
				},
				success(response) {
					console.log(response)
					this.tableData = response.data.result;
					this.totalNums = response.data.totalNums;
				},
				fail(response) {
					this.$message({
						message: response.data.msg,
						type: 'error'
					})
				},
				error(response) {
					this.$message({
						message: response.data.msg,
						type: 'error'
					})
				}
			});
			console.log(`当前页: ${val}`);
		},
		toFixed(num) {
			return Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3);
		},
		toFixed1(num) {
			num = Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3);
			if (String(num).substring(0, 1) === '-') {
			}else if(num != 0){
				num = '+' + num;
			}
			return num;
		},
		//  格式化json
        // formatJson(filterVal, jsonData) {
        //     return jsonData.map(v => filterVal.map(j => v[j]))
        // },
		//导出全部明细
		allOutputExcel() {
         this.outputExcel()
		},
		formatJson(filterVal, jsonData) {
        //     ----> 格式化json
		//     console.log(jsonData)
            return jsonData.map(v => {
		// 	   console.log(v)
            return filterVal.map(j => {
		//       console.log(j,v[j])
		    	return v[j] = (  j === "agentGradeId" ?  ( v[j] == 31 ?  "单店" : ( v[j] == 265 ? "区域" : "微店")  ): v[j]  );
			// }
			})
		    
						
			})	
        },
		//导出所选明细
		outputExcel() {
		if (!this.checkSession()) return;
			var temp = new Date(this.searchData.searchTime[0]);
			if (temp.getFullYear() > 2006) {
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
			if (this.searchData.searchLevel != '') {
				this.searchData.level = this.searchData.searchLevel.join(',');
			} else {
				this.searchData.level = '';
			}
			this.$getData({
				url: 'http/advanceDeposit/queryAdvanceDepositList.jhtml',
				data: {
					'pager.pageIndex': 1,
					'pager.pageSize': 999999,
					'advanceDeposit.shopNo': this.searchData.searchId,
					'advanceDeposit.name': this.searchData.searchName,
					'advanceDeposit.phone': this.searchData.searchPhone,
					'advanceDeposit.changeType': this.searchData.searchStatus,
					'advanceDeposit.startTime': time1,
					'advanceDeposit.endTime': time2,
					'advanceDeposit.name': this.searchData.name,
					'advanceDeposit.operator': this.searchData.operator,
				},
				success(response) {
					// console.log(response.data.success)
					if (response.data.success === 1) {
							self.tableData = response.data.result;
							if(self.tableData.length>0){
										require.ensure([], () => {
											const {	export_json_to_excel } = require('../components/tools/Export2Excel2')
											const tHeader = ['代理商编号', '代理商等级', '店铺名称', '代理商姓名', '变更类型', '变更金额','结余', '备注/单号', '变更人', '变更时间', '运营人员']
											const filterVal = ['shopNo', 'agentGradeId', 'shopName', 'name', 'changeType', 'alterMoney' , 'afterMoney','purchaseOrderNo', 'creator', 'createdTime', 'operator']
											const list = self.tableData;
											const data = this.formatJson(filterVal, list);
											// console.log(data)
											export_json_to_excel(tHeader, data, '预存款明细');
										})
							}else{
								self.$message({
									message: '订单暂无明细',
									type: 'error'
								})
							}
						} else {
							self.$message({
								message: response.data.msg,
								type: 'error'
							})
						}
				},
				fail(response) {
					this.$message({
						message: response.data.msg,
						type: 'error'
					})
				},
				error(response) {
					this.$message({
						message: response.data.msg,
						type: 'error'
					})
				}
			});
		},
	},
	created() {
		var src = window.location.href.split('/');
		this.searchData.searchId = src[5];
		this.searchData.name = src[6];
		console.log(this.searchData.searchName)		
		this.$getData({
			url: 'http/advanceDeposit/queryAdvanceDepositList.jhtml',
			data: {
				'pager.pageIndex': this.currentPage,
				'pager.pageSize': this.pageSize,
				'advanceDeposit.shopNo': this.searchData.searchId,
				'advanceDeposit.name': this.searchData.name,
				
				
			},
			success(response) {
				console.log(response.data.result)
				this.tableData = response.data.result;
				this.totalNums = response.data.totalNums;
			},
			fail(response) {
				this.$message({
					message: response.data.msg,
					type: 'error'
				})
			}
		});
	},
}
</script>
<style lang="less" scoped>
@import url("../assets/less/prepaidManage.less");
</style>
