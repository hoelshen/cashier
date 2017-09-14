import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const config = [
	{
		path: '/login',
		component: resolve => require(['./views/Login.vue'], resolve)
	},
	{
		path: '/',
		component: resolve => require(['./components/mainWrap.vue'], resolve),
		children:[
			{path: 'testTree',component: resolve => require(['./views/testTree.vue'], resolve)},
			{
				path:'orderManage',
				component:resolve=>require(['./views/orderManage.vue'],resolve),
			},
			{
				path:'waitOrder',
				component:resolve=>require(['./views/waitOrder.vue'],resolve),
			},
			{
				path:'prepaidManage',
				component:resolve=>require(['./views/prepaidManage.vue'],resolve),
			},
			{
				path:'memberList',
				component:resolve=>require(['./views/memberList.vue'],resolve),
			},
			{ path: 'storeManage', component: resolve => require(['./views/storeManage.vue'], resolve) },
			{
				path:'orderInfo/:purchaseOrderNo/:shopNo',
				name:'orderInfo',
				component:resolve=>require(['./views/orderInfo.vue'],resolve),
			},
		]
	},
]

const router = new Router({
    routes: config
})
export default router;