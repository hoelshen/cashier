import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const config = [{
		path: '/login',
		component: resolve => require(['./views/Login.vue'], resolve)
	},
	{
		path: '/',
		component: resolve => require(['./components/mainWrap.vue'], resolve),
		children: [{
				path: 'testTree',
				component: resolve => require(['./views/testTree.vue'], resolve)
			},
			{
				// 订单管理
				path: 'orderManage',
				component: resolve => require(['./views/orderManage.vue'], resolve),
			},
			{
				// 待审核订单
				path: 'waitOrder',
				component: resolve => require(['./views/waitOrder.vue'], resolve),
			},
			{
				// 预存款管理
				path: 'prepaidManage',
				component: resolve => require(['./views/prepaidManage.vue'], resolve),
			},
			{
				// 退货单管理
				path: 'drawBack',
				component: resolve => require(['./views/drawBack.vue'], resolve),
			},
			{
				// 待审核退货单
				path: 'waitDrawBack',
				component: resolve => require(['./views/waitDrawBack.vue'], resolve),
			},
			{
				// 退货单详情
				path: 'drawBackDetail/:purchaseOrderBackNo/:purchaseOrderNo',
				name:'drawBackDetail',
				component: resolve => require(['./views/drawBackDetail.vue'], resolve),
			},
			{
				// 预存款
				path: 'prepaidManage/:shopNo',
				name: 'prepaidManage',
				component: resolve => require(['./views/prepaidManage.vue'], resolve),
			},
			{
				// 会员列表
				path: 'memberList',
				component: resolve => require(['./views/memberList.vue'], resolve),
			},
			{
				// 店铺管理
				path: 'storeManage',
				component: resolve => require(['./views/storeManage.vue'], resolve)
			},
			{
				// 订单详情
				path: 'orderInfo/:purchaseOrderNo/:shopNo',
				name: 'orderInfo',
				component: resolve => require(['./views/orderInfo.vue'], resolve),
			},
		]
	},
]

const router = new Router({
	routes: config
})
export default router;