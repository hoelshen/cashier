<template>
	<div class="rebteList">
		<div class="warp">
			<div id="search">
				<el-form label-width="85px" ref="form" :model="searchData">
					<el-row :gutter="10">
						<el-col :span="8">
							<el-form-item label="规则名称">
								<el-input @keyup.enter.native="onSumbit" v-model="searchData.ruleName"></el-input>
							</el-form-item>
						</el-col>
                        <el-col :span="8" style="margin-left:-15px;">
							<el-form-item label="创建时间">
								<el-date-picker width="200" v-model="searchData.searchTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
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
						<el-button type="primary" @click="$router.push('/rebateAdd')" class="el-icon-plus">
							新增规则
						</el-button>
					</el-col>
				</el-row>
				<el-table border :data="myData" style="margin: 20px auto;font-size: 14px;" tooltip-effect="light">
					<el-table-column label="规则编号" prop="ruleNo" >
					</el-table-column>
					<el-table-column prop="businessExtendsRuleName" :show-overflow-tooltip="true"  label="规则名称">
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间">
					</el-table-column>
					<el-table-column prop="creator" label="创建人">
					</el-table-column>
					<el-table-column prop="isDefault"  label="操作" width="200">
                        <template  slot-scope="scope">
                            <p class="operat">
                                <span> <router-link  target="_blank" class="router-link-active" :to="{ name: 'rebateDetail', query: { id: scope.row.id}}">详情</router-link></span>
                                <span v-if="scope.row.isDefault==0" @click="confirmsetDefault(scope.row.id,scope.row.businessExtendsRuleName)">设为默认规则</span>
                                <span  v-if="scope.row.isDefault==1" class="default-rules" style="cursor:default;">默认规则</span>
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
				ruleName: '',		//姓名
				searchTime: '',		//创建时间
			},
			tableData: [
				{
					rulesNo: '',		//规则编号
					rulesName: '',		//规则名称
					makeTime: '',		//创建时间
					makePerson: '',		//创建人
					operat: '',		    //操作
				}
			],
			myData:[],
			totalNums:0,
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
			let self = this;
			if (!this.checkSession()) return;
			var temp = new Date(this.searchData.searchTime[0]);
			if (temp.getFullYear() > 2006) {debugger

				

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
				var temp1 = new Date(this.searchData.searchTime[1]);
				var time2 = temp1.getFullYear();
				if ((temp1.getMonth() + 1) < 10) {
					time2 = time2 + '-0' + (temp1.getMonth() + 1);
				} else {
					time2 = time2 + '-' + (temp1.getMonth() + 1);
				}
				if(temp.getDate()==temp1.getDate()){
					if (temp1.getDate() < 10) {
						var timer = temp1.getDate()+1
						time2 = time2 + '-0' + timer;
					} else {
						var timer = temp1.getDate()+1
						time2 = time2 + '-' + timer;
					}
				}else{
					if (temp1.getDate() < 10) {
						time2 = time2 + '-0' + temp1.getDate();
					} else {
						time2 = time2 + '-' + temp1.getDate();
					}
				}
				
				console.log(time2);
			} else {
				var time1 = '';
				var time2 = '';
			}
            self.$ajax({
				url: '/api/http/businessExtendsRule/getBusinessExtendsRuleList.jhtml',
				method: 'post',
				data: {
					'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
					'businessExtendsRuleVo.startTime': time1,
					'businessExtendsRuleVo.endTime': time2,
					'businessExtendsRuleVo.ruleName': self.searchData.ruleName,
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
					self.myData = response.data.result;
					self.totalNums = response.data.totalNums;
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
			self.currentPage = val;
			self.getFormData();
		},
		getFormData() {
            const self = this;
            self.loading = true;
            //获取列表数据
            self.$ajax({
                url: '/api/http/businessExtendsRule/getBusinessExtendsRuleList.jhtml',
                method: 'post',
                data: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                },
                transformRequest: [function(data) {
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
                self.loading = false;
				console.log(response.data.result)
                // console.log(response)
                if (response.data.success === 1) {
                    self.myData = response.data.result;
                    self.totalNums = response.data.totalNums;
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            }).catch(function(error) {

            });
		},
		// 确认设为默认规则
        confirmsetDefault(id,name) {
            let self = this;
            self.$confirm('你确定要将当前规则设为默认规则吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				self.setDefault(id,name)
				 
            })
        },
		// 设置默认规则
		setDefault(id,name){
			const self = this;
			self.loading = true;
            //获取列表数据
            self.$ajax({
                url: '/api/http/businessExtendsRule/modifyBusinessExtendsRuleDefault.jhtml',
                method: 'post',
                data: {
                    'id': id,
                },
                transformRequest: [function(data) {
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
                self.loading = false;
                if (response.data.success === 1) {
					self.$message({
						message: "设置“"+name+"”为默认规则成功~",
						type: "success"
					})
                   self.$router.push("/rebateDetail?id="+id);
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
		this.getFormData();
	},
}
</script>

<style lang="less" scoped>
@import url('../assets/less/rebateList.less');
.operat .default-rules{
	padding: 3px 5px;
	color: #f60;
	border: 1px solid #f60;
	border-radius: 3px;
	background-color: #f60;
	color: #fff;

}
.operat a{
	color: #1990ff;
}
</style>