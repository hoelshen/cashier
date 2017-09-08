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
 * 
 * 
 * 
 * 
 */





export default [{
        title: '会员管理',
        icon: 'icon-huiyuanguanli',
        children: [{
            title: '会员管理'
        }]
    },
    {
        title: '订单管理',
        icon: 'icon-dingdanguanli',
        children: [{
                title: '待审核',
                countName: 'waitOrder',
                count: 0
            },
            {
                title: '全部订单'
            }
        ]
    },
    {
        title: '店铺管理',
        icon: 'icon-dianpuguanli',
        children: [{
                title: '店铺管理',
                path: 'storeManage'
            },
            {
                title: '预存款查询'
            }
        ]
    },

]