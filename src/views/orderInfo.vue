<template>
<div class="orderInfo">
	<div class="orderTitle">
		<h2>进货单号：<label :model="orderInfo.orderNum">xxxx</label></h2>
		<h2>状态：<label :model="orderInfo.orderStatus">已完成</label></h2>
	</div>
	<div class="data">
		<el-row>
			<el-col :span="24"><div class="dataTitle">进货单信息</div></el-col>
		</el-row>
		<el-row style="margin:20px auto auto 15px">
			<el-col :span="8">进货单号：<label :model="orderInfo.orderNum">1000001</label></el-col>
			<el-col :span="8">下单时间：<label :model="orderInfo.orderTime">1000001</label></el-col>
			<el-col :span="8">订单总价：<label :model="orderInfo.money">1000001</label></el-col>
		</el-row>
		<el-row style="margin:20px auto auto 15px">
			<el-col :span="8">代理商：<label :model="orderInfo.agent">1000001</label></el-col>
			<el-col :span="8">收件人：<label :model="orderInfo.receiver">1000001</label></el-col>
			<el-col :span="8">收件电话：<label :model="orderInfo.phone">1000001</label></el-col>
		</el-row>
		<el-row style="margin:20px auto auto 15px">
			<el-col :span="24">收货地址：<label :model="orderInfo.address">100011</label></el-col>
		</el-row>
	</div>
	<div class="tableInfo">
		<el-table :data="tableData">
			<el-table-column prop="goodsNo" label="商品编号" width="180">
			</el-table-column>
			<el-table-column prop="goodsName" label="商品名称">
			</el-table-column>
			<el-table-column prop="size" label="规格" width="120">
			</el-table-column>
			<el-table-column prop="unit" label="单位" width="120">
			</el-table-column>
			<el-table-column prop="price" label="进货价" width="120">
			</el-table-column>
			<el-table-column prop="goodsNum" label="进货数量" width="120">
			</el-table-column>
			<el-table-column prop="subtotal" label="小计" width="120">
			</el-table-column>
		</el-table>
		<div class="accounting clearfix">
			<div class="sum">
				<label class="txtBlue" :model="tableDate.goodsNum">数量总计50</label> 件商品，商品总价： ￥<label :model="tableDate.subtotal">小计总计12500</label>
			</div>
			<div class="express">
				邮费： ￥<label>100.00</label>
			</div>
			<div class="money">
				实付金额： ￥<label class="txtBlue">100.00</label>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            orderInfo:{
            	orderNum:'',			//进货单号
            	agentNum:'',			//代理商编号
            	agent:'',			//代理商
            	receiver:'',			//收件人
            	phone:'',			//手机号
            	address:'',			//收货地址
            	storeName:'',			//店铺名称
            	orderStatus:'',			//状态
            	orderTime:'',			//下单时间
            	money:'',			//金额
        },
        tableDate:[
        {
        	goodsNo:'',				//商品编号
        	goodsName:'',				//商品名称
        	size:'',					//规格
        	unit:'',					//单位
        	price:'',					// 进货价
        	goodsNum:'',				//进货数量
        	subtotal:'',				//小计
        }
        ]
    }
    },
    methods: {
    },
}
</script>

<style>
.orderTitle{
	margin: 30px auto auto auto;
}
.orderTitle h2{
	display: inline-block;
	margin-left: 30px;
}
.data{
	margin: 10px auto  auto  30px;
	width: 95%;
	height: 170px;
	border:1px solid rgba(0, 0, 0, 0.15);
	border-radius: 4px;
}
.dataTitle{
	background-color: rgba(0, 0, 0, 0.05);
	height: 40px;
	font-size: 16px;
	line-height: 40px;
	padding-left: 15px;
}
.tableInfo{
	width: 95%; margin: 30px auto;
}
.accounting div{
	margin:20px 0px auto auto;
	text-align: right;
}
.accounting div:last-child{
	font-weight: 800;
}
.txtBlue{
	font-weight: 800;
	color: rgba(32, 160, 255, 0.75);
}
</style>