import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const config = [{
        path: '/login',
        component: resolve => require(['./views/Login.vue'], resolve)
    },
    {
        path: '/',
        name: 'index',
        component: resolve => require(['./components/mainWrap.vue'], resolve),
        children: [{
                path: 'testTree',
                name: 'testTree',
                component: resolve => require(['./views/testTree.vue'], resolve)
            },
            {
                // 订单管理
                path: 'orderManage',
                name: 'orderManage',
                component: resolve => require(['./views/orderManage.vue'], resolve),
            },
            {
                // 待审核订单
                path: 'waitOrder',
                name: 'waitOrder',
                component: resolve => require(['./views/waitOrder.vue'], resolve),
            },
            // {
            //     // 预存款管理
            //     path: 'prepaidManage',
            //     name: 'prepaidManage',
            //     component: resolve => require(['./views/prepaidManage.vue'], resolve),
            // },
            {
                // 退货单管理
                path: 'drawBack',
                name: 'drawBack',
                component: resolve => require(['./views/drawBack.vue'], resolve),
            },
            {
                // 待审核退货单
                path: 'waitDrawBack',
                name: 'waitDrawBack',
                component: resolve => require(['./views/waitDrawBack.vue'], resolve),
            },
            {
                // 退货单详情
                path: 'drawBackDetail/:purchaseOrderBackNo',
                name: 'drawBackDetail',
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
                name: 'memberList',
                component: resolve => require(['./views/memberList.vue'], resolve),
            },
            {
                // 店铺管理
                path: 'storeManage',
                name: 'storeManage',
                component: resolve => require(['./views/storeManage.vue'], resolve)
            },
            {
                // 订单详情
                path: 'orderInfo/:purchaseOrderNo/:shopNo',
                name: 'orderInfo',
                component: resolve => require(['./views/orderInfo.vue'], resolve),
            },
            {
                // 区域订单核算
                path: 'area',
                name: 'area',
                component: resolve => require(['./views/area.vue'], resolve),
            },
            {
                // 通知管理
                path: 'message',
                name: 'message',
                component: resolve => require(['./views/message.vue'], resolve),
            },
            {
                // 修改通知
                path: 'updateMsg/:id',
                name: 'updateMsg',
                component: resolve => require(['./views/messageAdd.vue'], resolve),
            },
            {
                // 添加通知
                path: 'messageAdd',
                name: 'messageAdd',
                component: resolve => require(['./views/messageAdd.vue'], resolve),
            },
            {
                // 预览通知
                path: 'lookMsg',
                name: 'lookMsg',
                component: resolve => require(['./views/lookMsg.vue'], resolve),
            }
        ]
    }
]

const router = new Router({
    routes: config
})
export default router;