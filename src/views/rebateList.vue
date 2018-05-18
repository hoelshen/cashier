<template>
	<div class="rebteList">
		<div class="warp">
			<div id="search">
				<el-form label-width="85px" ref="form" :model="searchData">
					<el-row :gutter="10">
						<el-col :span="8">
							<el-form-item label="规则名称">
								<el-input @keyup.enter.native="onSumbit" v-model="searchData.searchName" placeholder="姓名"></el-input>
							</el-form-item>
						</el-col>
                        <el-col :span="8" style="margin-left:-15px;">
							<el-form-item label="选择时间">
								<el-date-picker width="200" v-model="searchData.searchTime" type="date" placeholder="选择日期范围"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label-width="250px">
								<el-button type="primary" style="margin-left:10px" @click="onSumbit">查询</el-button>
							</el-form-item>
							
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="list">
				<el-row style="padding-top:20px">
					<el-col :gutter="20">
						<el-button type="primary" class="el-icon-plus">
							新增规则
						</el-button>
					</el-col>
				</el-row>
				<el-table border :data="tableData" style="margin: 20px auto;font-size: 14px;">
					<el-table-column label="规则编号" prop="rulesNo" >
					</el-table-column>
					<el-table-column prop="rulesName" label="规则名称">
					</el-table-column>
					<el-table-column prop="makeTime" label="创建时间">
					</el-table-column>
					<el-table-column prop="makePerson" label="创建人">
						<template slot-scope="scope">
							<p>{{scope.row.GID}}</p>
						</template>
					</el-table-column>
					<el-table-column  label="操作" width="200">
                        <template  slot-scope="scope">
                            <p class="operat">
                                <span>详情</span>
                                <span v-if="false">设为默认规则</span>
                                <span  v-if="true" class="default-rules">默认规则</span>
                            </p>
                        </template>
					</el-table-column>
				</el-table>
				<div class="page">
					<el-pagination style="float: right;margin-right: 50px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total="totalNums">
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
			totalNums: 0,			//数据总数
			pageSize: 30,			//当前页数
			searchData: {
				searchName: '',		//姓名
				searchTime: '',		//注册时间
			},
			tableData: [
				{
					rulesNo: '',		//规则编号
					rulesName: '',		//规则名称
					makeTime: '',		//创建时间
					makePerson: '',		//创建人
					operat: '',		    //操作
				}
			]
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
			if (!this.checkSession()) return;
			
			const self = this;
			self.$ajax({
				url: '/api/customerInfo/customerInfo/search.jhtml',
				method: 'post',
				data: {
					'page': 1,
					'rows': this.pageSize,
					'customerInfo.shop.shopName': this.searchData.searchShop,
					'customerInfo.phone': this.searchData.searchPhone,
					'customerInfo.name': this.searchData.searchName,
					'customerInfo.gid': this.searchData.searchLevel,
					'customerInfo.startTime': time1,
					'customerInfo.endTime': time2,
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
				if (response.data.code === 1) {
					self.tableData = response.data.rows;
					self.totalNums = response.data.total;
				} else {
					self.$message({
						message: response.data.msg,
						type: 'error'
					})
				}
			}).catch(function(error) {

			});
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			if (!this.checkSession()) return;

			const self = this;
			self.$ajax({
				url: '/api/customerInfo/customerInfo/search.jhtml',
				method: 'post',
				data: {
					'page': val,
					'rows': this.pageSize,
					'customerInfo.shop.shopName': this.searchData.searchShop,
					'customerInfo.phone': this.searchData.searchPhone,
					'customerInfo.name': this.searchData.searchName,
					'customerInfo.gid': this.searchData.searchLevel,
					'customerInfo.startTime': time1,
					'customerInfo.endTime': time2,
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
				if (response.data.code === 1) {
					self.tableData = response.data.rows;
					self.totalNums = response.data.total;
				} else {
					self.$message({
						message: response.data.msg,
						type: 'error'
					})
				}
			}).catch(function(error) {

			});
		},
	},
	created() {
		if (!this.checkSession()) return;
		
	},
}
</script>

<style lang="less" scoped>
@import url('../assets/less/rebateList.less');
.operat .default-rules{
	padding: 3px 5px;
	color: #f60;
	border: 1px solid #f60;
	border-radius: 5px;

}
</style>