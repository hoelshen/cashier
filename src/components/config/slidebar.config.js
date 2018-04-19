/*
 *      配置说明
 *
 *          []中每一个对象表示一个一级菜单
 *              title 表示菜单的名字
 *              icon 表示菜单使用icon雷鸣
 *              children 表示该菜单下的下拉菜单
 *              countName 用来显示右边的计数，名字具有唯一性，有且只能存在一个
 *              count 表示初始计数
 *              path 表示点击菜单需要跳转到的路由，只能出现在最终极的菜单，否则无效
 *              spot 表示一级菜单的红点标志
 *
 *
 *
 */





export default [{
        title: '会员管理',
        icon: 'icon-yonghuguanli',
        children: [{
            title: '会员管理',
            path: '/memberList'
        }]
    },
    {
        title: '订单管理',
        icon: 'icon-dingdanguanli',
        children: [{
                title: '待审核',
                countName: 'waitOrder',
                count: 0,
                path: '/waitOrder'
            },
            {
                title: '全部订单',
                path: '/orderManage'
            }
        ],
        spot: false,
        spotName: 'waitOrder',
    },
    {
        title: '店铺管理',
        icon: 'icon-dianpuguanli',
        children: [{
                title: '店铺管理',
                path: '/storeManage'
            },
            {
                title: '预存款查询',
                path: '/prepaidManage'
            }
        ],
        spot: false,
        spotName: 'prepaidManage',
    },
    {
        title: '退款单管理',
        icon: 'icon-tuikuandingdan',
        children: [{
                title: '待审核',
                countName: 'waitDrawBack',
                count: 0,
                path: '/waitDrawBack'
            },
            {
                title: '全部退款单',
                path: '/drawBack'
            }
        ],
        spot: false,
        spotName: 'waitDrawBack',
    },
    {
        title: '分成核算',
        icon: 'icon-fenchenghesuan',
        children: [{
                title: '区域订单',
                path: '/area',
            },
            {
                title:'业务拓展',
                path:'/businessExpansion'
            },
            {
                title:'年度业绩',
                path:'/annualPerformance'
            }
        ]
    },
    {
        title: '通知管理',
        icon: 'icon-tongzhiguanli',
        children: [{
            title: '通知管理',
            path: '/message'
        }]
    },
    {
        title: '规则管理',
        icon: 'icon-tongzhiguanli',
        children: [{
            title: '业务扩展返利',
            path: '/rebate',
        }]
    }

]