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
		]
	}
]

const router = new Router({
    routes : config
})
export default router;
