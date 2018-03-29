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
									<el-option value="all" label="全部"></el-option>
									<el-option value="newPro" label="新品"></el-option>
									<el-option value="systemMessage" label="系统公告"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="通知状态">
								<el-select v-model="searchData.status" clearable placeholder="请选择">
									<el-option value="0" label="全部"></el-option>
									<el-option value="1" label="启用"></el-option>
									<el-option value="2" label="禁用"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="发布时间">
								<el-date-picker v-model="searchData.time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-button type="primary" style="margin-left:10px" @click="onSumbit">查询</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="tableInfo">
				<el-button type="primary" class="el-icon-plus" @click="$router.push('/messageAdd')">发布通知</el-button>
				<el-table border :data="tableData" style="margin: 10px auto 20px auto;font-size: 14px;">
					<el-table-column label="序号" width="80" align="center">
						<template slot-scope="scope">
							<p class="limit">{{ (currentPage - 1) * pageSize + scope.$index + 1
								< 10 ? '0' + ((currentPage - 1) * pageSize + scope.$index + 1) : (currentPage - 1) * pageSize + scope.$index + 1 }}</p>
						</template>
					</el-table-column>
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
					</el-table-column>
					<el-table-column prop="status" label="状态" align="center">
						<template slot-scope="scoped">
							<span class="greenPoint" :class="{redColor : scoped.row.status === 2}"></span>
							{{ scoped.row.status === 1 ? '启用' : '禁用' }}
						</template>
					</el-table-column>
					<el-table-column prop="publisher" label="发布人" align="center">
					</el-table-column>
					<el-table-column prop="CREATED_TIME" label="操作" align="left" min-width="120px">
						<template slot-scope="scope">
							<span v-if="scope.row.status === 2" class="table_buleTxt" @click="changeMsg(scope.row,1)">启用</span>
							<span v-if="scope.row.status === 1" class="table_buleTxt" @click="changeMsg(scope.row,2)">禁用</span>
							<router-link v-if="scope.row.status != 1" class="table_buleTxt" :to="{ name: 'updateMsg', params: { id: scope.row.id}}">修改</router-link>
							<router-link class="table_buleTxt" target="_blank" :to="{ name: 'lookMsg', query: { id: scope.row.id }}">预览</router-link>
							<span v-if="scope.row.status != 1" class="table_buleTxt" @click="deleteMsg(scope.row)">删除</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="page">
					<el-pagination style="float: right;margin-right: 50px" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total="totalNums">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript" src="../router.js"></script>
<script>
let qs = require('qs');
export default {
	data() {
		return {
			currentPage: 1,			//当前页
			totalNums: 0,		    //数据总数
			pageSize: 30,			//当前页数
			user: {},
			searchData: {
				title: '',		    //标题
				type: 'all',		//类型
				status: '0',		//状态
				time: [],		    //时间
			},
			tableData: []
		}
	},
	methods: {
		closeTip(e) {
			e.path[3].style.display = "none";
		},
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
		// 格式化日期
		formatDate(date) {
			if (date instanceof Date) {
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours();
				let min = date.getMinutes();
				let second = date.getSeconds();
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				hours = hours < 10 ? "0" + hours : hours;
				min = min < 10 ? "0" + min : min;
				second = second < 10 ? "0" + second : second;
				return `${year}-${month}-${day} ${hours}:${min}:${second}`;
			} else {
				return date;
			}
		},
		// 补齐一天
		endTimeDay(date) {
			if (date) {
				return new Date(new Date(date).getTime() + 1000 * 60 * 60 * 24)
			}
		},
		toFixed(num) {
			return Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3);
		},
		handleCurrentChange(val) {
			if (!this.checkSession()) return;
			this.getTableData();
		},
		// 启禁用状态
		changeMsg(target, status) {
			this.$confirm(`确定${status === 1 ? '启用' : '禁用'}通知【${target.noticeTitle}】`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$ajax.post('/api/http/NoticeInfo/updateNoticeInfoStatus.jhtml',
					qs.stringify({
						'noticeInfo.id': target.id,
						'noticeInfo.status': status,
						'noticeInfo.updateId': this.user.id,
					}),
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					}
				).then(res => {
					console.log(res);
					if (res.data.success === 1) {
						this.$message({ message: res.data.msg, type: 'success' });
						target.status = status;
					} else {
						this.$message({ message: res.data.msg, type: 'error' });
					}
				})
			})
		},
		// 删除消息
		deleteMsg(target) {
			this.$confirm(`确定删除通知【${target.noticeTitle}】`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$ajax.post('/api/http/NoticeInfo/deleteNoticeInfo.jhtml',
					qs.stringify({
						'noticeInfo.id': target.id,
						'noticeInfo.updateId': this.user.id,
					}),
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					}
				).then(res => {
					if (res.data.success === 1) {
						this.$message({ message: `删除“通知：【${target.noticeTitle}】”${res.data.msg}`, type: 'success' });
						window.location.reload();
					} else {
						this.$message({ message: res.data.msg, type: 'error' });
						window.location.reload();
					}
				})
			})
		},
		goEdit(target) {
			console.log(target);
			this.$router.push('/');
		},
		onSumbit() {
			if (!this.checkSession()) return;
			this.getTableData();
		},
		getTableData() {
			this.$ajax.post('/api/http/NoticeInfo/queryNoticeInfoList.jhtml',
				qs.stringify({
					'pageIndex': this.currentPage,
					'pageSize': this.pageSize,
					'searchVo.noticeTitle': this.searchData.title,
					'searchVo.noticeType': this.searchData.type,
					'searchVo.status': this.searchData.status,
					'searchVo.publishTimeStart': this.searchData.time ? this.formatDate(this.searchData.time[0]) : null,
					'searchVo.publishTimeEnd': this.searchData.time ? this.formatDate(this.endTimeDay(this.searchData.time[1])) : null
				}),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			).then(res => {
				this.tableData = res.data.data.list;
				this.totalNums = res.data.data.total
			})
		}
	},
	created() {
		if (!this.checkSession()) return;
		if (sessionStorage.user) {
			this.user = JSON.parse(sessionStorage.getItem('user'));
		}
		this.getTableData();
	}
}
</script>

<style lang="less" scoped>
.tableInfo {
    margin: 20px 15px;
    padding: 1px 15px;
    background-color: white;
}
.limit {
    text-align: center;
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
.table_buleTxt {
    color: #20a0ff;
    cursor: pointer;
    margin-left: 10px;
}
.table_icon {
    color: red;
    font-size: 16px;
    vertical-align: middle;
}
.table_enable_text {
    margin-top: 5px;
    display: inline-block;
}
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
}
</style>

<style lang="less">
.el-tooltip__popper.is-light {
    border-color: #cccccc;
}
.noticeTitle {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
