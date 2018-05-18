<template>
	<div class="prepaidManage">
		<div class="warp">
			<div id="search">
				<el-form label-width="85px" ref="form" :model="searchData">
					
						
					<el-row :gutter="20">
						<el-col :span="7" style="margin-left:-15px;">
							<el-form-item label="注册时间">
								<el-date-picker width="200"  type="daterange" :picker-options="pickerOptions" placeholder="选择日期范围"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript" src="../router.js"></script>
<script>
export default {
	data() {
		return {
			today: new Date(),
			searchData: {
				searchPhone: '',	//代理商手机
				searchShop: '',		//注册店铺名
				searchName: '',		//姓名
				searchTime: '',		//注册时间
				searchLevel: '',	//代理商等级
            },
            value6: [ "2018-05-04T16:00:00.000Z", "2018-05-09T16:00:00.000Z" ],
			//日期选择器
            pickerOptions: {
                disabledDate(time) {
                   var time =this.today
                   return time.getTime() > Date.now();
                }
            },
		}
	},

}
</script>

<style lang="less" scoped>
@import url('../assets/less/member.less');
</style>