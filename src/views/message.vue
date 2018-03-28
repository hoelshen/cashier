<template>
	<div class="prepaidManage messageList">
		<div class="warp">
			<div id="search">
				<el-form label-width="85px" ref="form" :model="searchData">
					<el-row :gutter="10">
						<el-col :span="5">
							<el-form-item label="通知标题">
								<el-input @keyup.enter.native="onSumbit" v-model="searchData.title" placeholder="通知标题"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="通知类型">
								<el-select v-model="searchData.type" clearable placeholder="请选择">
									<el-option value="ALL" label="全部"></el-option>
									<el-option value="NEW" label="新品"></el-option>
									<el-option value="NEWS" label="系统公告"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="通知状态">
								<el-select v-model="searchData.status" clearable placeholder="请选择">
									<el-option value="ALL" label="全部"></el-option>
									<el-option value="ENABLE" label="启用"></el-option>
									<el-option value="DISENABLE" label="禁用"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="发布时间">
								<el-date-picker v-model="searchData.time" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-button type="primary" style="margin-left:10px" @click="onSumbit">查询</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="tableInfo">
				<el-table border :data="tableData" style="margin: 20px auto;font-size: 14px;">
					<el-table-column label="序号" width="80">
						<template slot-scope="scope">
							<p class="limit">{{ (currentPage - 1) * pageSize + scope.$index + 1
								< 10 ? '0' + ((currentPage - 1) * pageSize + scope.$index + 1) : (currentPage - 1) * pageSize + scope.$index + 1 }}</p>
						</template>
					</el-table-column>
<<<<<<< HEAD
					<el-table-column prop="PHONE" label="通知标题">
					</el-table-column>
					<el-table-column prop="NAME" label="通知类型">
=======
					<el-table-column prop="noticeTitle" label="通知标题" align="center" width="300px">
						<template slot-scope="scope">
							<div class="noticeTitle" :title="scope.row.noticeTitle">{{scope.row.noticeTitle}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="noticeType" label="通知类型" align="center">
						<template slot-scope="scoped">
							{{ scoped.row.noticeType === 'newPro' ? '新品' : '系统公告' }}
						</template>
					</el-table-column>
					<el-table-column prop="publishTime" label="发布时间" align="center" sortable min-width="100px">
>>>>>>> d15ddc5cd8761f25890fecb362142b8b02d112d0
					</el-table-column>
					<el-table-column prop="GID" label="发布时间" sortable>
					</el-table-column>
					<el-table-column prop="SHOPNAME" label="发布人">
					</el-table-column>
<<<<<<< HEAD
					<el-table-column prop="CREATED_TIME" label="操作">
=======
					<el-table-column prop="CREATED_TIME" label="操作" align="center" min-width="120px">
>>>>>>> d15ddc5cd8761f25890fecb362142b8b02d112d0
						<template slot-scope="scope">
							<el-tooltip placement="top" effect="light" >
								<div slot="content">
									<i class="el-icon-warning table_icon"></i>
									<span class="table_enable_text">你确定要启用该通知吗？</span>
									<div class="table_button_group">
										<el-button size="small">确定</el-button>
										<el-button size="small">取消</el-button>
									</div>
								</div>
								<span class="table_buleTxt">启用</span>
							</el-tooltip>
							<el-tooltip placement="top" effect="light">
								<div slot="content">
									<i class="el-icon-warning table_icon"></i>
									<span class="table_enable_text">你确定要禁用该通知吗？</span>
									<div class="table_button_group">
										<el-button size="small">确定</el-button>
										<el-button size="small">取消</el-button>
									</div>
								</div>
								<span class="table_buleTxt">禁用</span>
							</el-tooltip>
<<<<<<< HEAD
							<span class="table_buleTxt">预览</span>
=======
							<router-link class="table_buleTxt" target="_blank" :to="{ name: 'lookMsg', query: { id: scope.row.id }}">预览</router-link>
							<router-link class="table_buleTxt" :to="{ name: 'updateMsg', params: { id: scope.row.id}}">修改</router-link>
>>>>>>> d15ddc5cd8761f25890fecb362142b8b02d112d0
							<el-tooltip placement="top" effect="light">
								<div slot="content">
									<i class="el-icon-warning table_icon"></i>
									<span class="table_enable_text">你确定要删除该通知吗？</span>
									<div class="table_button_group">
										<el-button size="small">确定</el-button>
										<el-button size="small">取消</el-button>
									</div>
								</div>
								<span class="table_buleTxt">删除</span>
							</el-tooltip>
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
			totalNums: 0,		    //数据总数
			pageSize: 30,			//当前页数
			searchData: {
				title: '',		    //标题
				type: '',		    //类型
				status: '',		    //状态
				time: [],		    //时间
			},
			tableData: [
				{
					PHONE: '',			//手机号
					SHOPNAME: '',		//注册店铺
					NAME: '',			//姓名
					GID: '',				//会员等级
					CREATED_TIME: '',		//注册时间
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
<<<<<<< HEAD
				console.log(time2);
			} else {
				var time1 = '';
				var time2 = '';
			}
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
			console.log(`当前页: ${val}`);
=======
			})
		},
		goEdit(target) {
			console.log(target);
			this.$router.push('/');
>>>>>>> d15ddc5cd8761f25890fecb362142b8b02d112d0
		},
		toFixed(num) {
			return Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3);
		},
		getData(obj) {
			const self = this;
			obj.method = obj.method || 'get';
			obj.url = obj.url || '';
			obj.data = obj.data || {};
			obj.success = obj.success || function() { };
			obj.fail = obj.fail || function() { };
			obj.error = obj.error || function() { };
			if (obj.method === 'get') {
				var str = '?';
				for (var item in obj.data) {
					if (obj.data[item] != '' && obj.data[item] != undefined) {
						str += item + '=' + obj.data[item] + '&';
					}
				}
				str = str.substring(0, str.length - 1);
				obj.url = obj.url + str;
				self.$ajax({
					method: 'get',
					url: `api/${obj.url}`
				}).then(function(response) {
					if (response.data.code === 1) {
						obj.success.call(self, response);
					} else {
						// console.log(response);
						obj.fail.call(self, response);
					}
				}).catch(function(error) {
					obj.error.call(self, error);
				});
			}
		}
	},
	created() {
		if (!this.checkSession()) return;
		this.getData({
			url: 'customerInfo/customerInfo/search.jhtml',
			data: {
				'pager.pageIndex': this.currentPage,
				'pager.pageSize': this.pageSize,
			},
			success(response) {
				console.log(response);
				this.tableData = response.data.rows;
				this.totalNums = response.data.total;
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
.tableInfo {
    margin: 20px 15px;
    padding: 1px 15px;
    background-color: white;
}

.page {
    width: 100%;
    padding: 10px 0px 60px 0px;
    background-color: white;
}

#search {
    background-color: #fff;
    padding: 5px;
    margin: 20px 15px auto 15px;
}


#search {
    .el-form {
        margin: 30px 18px auto 18px;
    }
}
.table_buleTxt{
	color: #20a0ff;
	cursor: pointer;
	margin-left: 10px;
}
.table_icon{
	color: red;
	font-size: 16px;
	vertical-align: middle;
}
.table_enable_text{
	margin-top: 5px;
    display: inline-block;
}
<<<<<<< HEAD
.table_button_group{
	margin-top: 10px;
	text-align: right;
=======
.table_button_group {
    margin-top: 10px;
    text-align: right;
}
.greenPoint {
    width: 5px;
    height: 5px;
    background-color: green;
    display: inline-block;
    vertical-align: middle;
    margin: -2px 10px auto auto;
    border-radius: 50%;
}
.tableInfo .redColor {
    background-color: red;
}
.el-icon-plus:before {
    padding-right: 5px;
}
.el-icon-plus {
    margin-top: 10px;
>>>>>>> d15ddc5cd8761f25890fecb362142b8b02d112d0
}
</style>

<style lang="less">
.el-tooltip__popper.is-light{
	border-color:#cccccc;
}
.noticeTitle {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
