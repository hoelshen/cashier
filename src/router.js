import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
    routes : [
	{ path: '/login', component: resolve => require(['./views/Login.vue'], resolve) },
	{path: '/',component: resolve => require(['./components/mainWrap.vue'], resolve),
		children:[
			{path: 'testTree',component: resolve => require(['./views/testTree.vue'], resolve)},
		]
	},
	{path:'/orderManage',component:resolve=>require(['./views/orderManage.vue'],resolve)},
    ]
})
