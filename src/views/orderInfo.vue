<template>
<div class="orderInfo">
	<div class="orderTitle">
		<h2>进货单号：{{ orderInfo.purchaseOrderNo }}</h2>
		<h2>状态：{{ orderInfo.state === 'WAIT_SEND' ? '待发货':(orderInfo.state === 'WAIT_CHECK' ? '待审核' : (orderInfo.state === 'DELIVERED' ? '已发货' : (orderInfo.state === 'FINISH' ? '已完成' : (orderInfo.state === 'RETURN_FINISH' ? '退款成功' : '')))) }}</h2>
	</div>
	<div class="data">
		<el-row>
			<el-col :span="24"><div class="dataTitle">进货单信息</div></el-col>
		</el-row>
		<el-row style="margin:20px auto auto 15px">
			<el-col :span="8">进货单号：{{orderInfo.purchaseOrderNo}}</el-col>
			<el-col :span="8">下单时间：{{ orderInfo.orderTime }}</el-col>
			<el-col :span="8">订单总价：￥{{ orderInfo.orderSum }}</el-col>
		</el-row>
		<el-row style="margin:20px auto auto 15px">
			<el-col :span="8" style="position:relative">代理商：<p class="textBlue1" v-if="orderInfo.agentGradeId === 31">单店</p><p class="textOrange1" v-if="orderInfo.agentGradeId === 265">区域</p><p class="textYellow1" v-if="orderInfo.agentGradeId === 266">专柜</p><span class="agent">{{ orderInfo.agentGradeId }}</span>{{ orderInfo.shopName }}</el-col>
			<el-col :span="8">收件人：{{ orderInfo.receiptName }}</el-col>
			<el-col :span="8">收件电话：{{ orderInfo.receiptPhone }}</el-col>
		</el-row>
		<el-row style="margin:20px auto auto 15px">
			<el-col :span="24">收货地址：{{ orderInfo.receiptAddress }}</el-col>
		</el-row>
	</div>
	<div class="tableInfo">
		<el-table :data="tableData">
			<el-table-column prop="proSku" label="商品编号" width="180">
			</el-table-column>
			<el-table-column prop="productName" label="商品名称">
			</el-table-column>
			<el-table-column prop="spec" label="规格" width="120">
			</el-table-column>
			<el-table-column prop="unit" label="单位" width="120">
			</el-table-column>
			<el-table-column prop="purchasePrice" label="进货价" width="120">
			<template scope="scope"><p>{{ toFixed(scope.row.purchasePrice) }}</p></template>
			</el-table-column>
			<el-table-column prop="productNum" label="进货数量" width="120">
			</el-table-column>
			<el-table-column prop="subtotal" label="小计" width="120">
			<template scope="scope"><p>{{ toFixed(scope.row.subtotal) }}</p></template>
			</el-table-column>
		</el-table>
		<div class="accounting clearfix">
			<div class="sum">
				<span class="txtBlue">{{ productAllNum }} </span>件商品，商品总价： ￥{{orderInfo.productTotalPrice }}
			</div>
			<div class="express">
				邮费： ￥<label>{{ orderInfo.freightSum }}</label>
			</div>
			<div class="money">
				实付金额： ￥<label class="txtBlue">{{orderInfo.orderSum }}</label>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import mainWrap from '../components/mainWrap.vue'
export default {
    data(){
        return {
    	productAllNum:0,			//商品总数
            orderInfo:{
            	purchaseOrderNo:'',		//进货单号
            	shopNo:'',			//代理商编号
            	shopName:'',			//代理商店铺名
            	agentGradeId:'',		//代理商等级
            	receiptName:'',		//收件人
            	receiptPhone:'',		//收件电话
            	receiptAddress:'',		//收货地址
            	state:'',				//进货单状态
            	orderTime:'',			//下单时间
            	orderSum:'',			//订单总价
            	productTotalPrice:'',		//商品总计
            	id:'',				//进货单Id
            	freightSum:'',			//运费
            	orderSum:'',			//实付金额
        },
        tableData:[
        {
        	proSku:'',				//商品编号
        	productName:'',			//商品名称
        	spec:'',					//规格
        	unit:'',					//单位
        	purchasePrice:'',			// 进货价
        	productNum:'',				//进货数量
        	subtotal:'',				//小计
        }
        ]
    }
    },
    methods: {
	toFixed(num){
		return Number(num).toFixed(6).substring(0,Number(num).toFixed(6).lastIndexOf('.')+3);
	},
    },
    created(){
            //获取id
            var src = window.location.href.split('/');
            this.orderInfo.purchaseOrderNo = src[5];
            this.orderInfo.shopNo = src[6];
            const self = this;
	self.$ajax({
                    url: '/api/http/purchaseOrder/findPurchaseOrderByNo.jhtml',
                    method: 'post',
                    data: {
                        purchaseOrderNo:self.orderInfo.purchaseOrderNo
                    },
                    transformRequest: [function (data) {
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
                }).then(function(response){
                    if(response.data.success == 1){
		self.tableData=response.data.result.purchaseOrderDetailList;
                    	for(var item in self.tableData){
                    		 self.productAllNum = self.productAllNum+ Number(self.tableData[item].productNum);
                    	}
                    	self.orderInfo = response.data.result;
                    }else{
                        alert(response.data.msg);
                    }
                }).catch(function(error){

                });
    }
}
</script>

<style type="less" scoped>
	@import url('../assets/less/orderInfo.less');
</style>