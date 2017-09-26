<template>
    <div class="mainWrap">
        <slide-bar></slide-bar>
        <div class="mainContent">
            <div class="contentTop">
                <div class="title">
                    {{ contentName }}
                </div>
                <div class="user">
                    <div class="noti">
                        <i class="icon-tongzhi3"></i>
                        <span class="count">0</span>
                    </div>
                    <div class="login-out">
                        <span @click="loginOut">退出登录</span>
                    </div>
                    <div class="userName">
                        <span>{{ user.userName }}</span>
                    </div>

                </div>
            </div>
            <transition name="fade">
                <router-view class="content"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import slideBar from './slideBar.vue';
import Vue from 'vue'
export default {
    data() {
        return {
            contentName: '主页',
            configName: {
                '/': '主页',
                '/testTree': '测试树',
                '/storeManage': '店铺管理',
                '/prepaidManage': '预存款查询',
                '/orderManage': '进货单管理',
                '/memberList': '会员查询',
                '/waitOrder': '待审核订单',
                '/orderInfo': '进货单详情',
                '/drawBack': '全部退款单',
                '/waitDrawBack': '待审核退款单',
            },
            user: {}
        }
    },
    watch: {
        '$route'(val) {
            this.contentName = this.configName[val.fullPath];
            if (/orderInfo/.test(val.fullPath)) {
                this.contentName = "进货单详情";
            }
            if (/prepaidManage/.test(val.fullPath)) {
                this.contentName = "预存款查询";
            }
            if (/drawBackDetail/.test(val.fullPath)) {
                this.contentName = "退款单详情";
            }
        },
    },
    created() {
        if (sessionStorage.user) {
            this.user = JSON.parse(sessionStorage.user);
        } else {
            delete sessionStorage.user;
            this.$router.push('/login');
        }
        this.contentName = this.configName[this.$route.fullPath];

        // 待审核订单数
        this.$getData({
            url: 'http/purchaseOrder/queryPurchaseOrderList.jhtml',
            data: {
                pageIndex: 1,
                pageSize: 30,
                'purchaseOrder.state': 'WAIT_CHECK',
            },
            success(response) {
                this.$slide.setCount('waitOrder', response.data.totalNums);
                console.log(response.data.totalNums);
            },
            fail(response) {
                alert(response.data.msg);
            },
        });

        // 待审核退款单数
        var qs = require('qs');
        this.$ajax.post('api/http/purchaseOrderBack/queryPurchaseOrderBackList.jhtml', qs.stringify({
            'pager.pageIndex': 1,
            'pager.pageSize': this.pageSize,
            'searchBackVo.isWaitAudit': 1,
        }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((res) => {
                console.log(res.data.totalNums);
                this.$slide.setCount('waitDrawBack', res.data.totalNums);
            }).catch((err) => {
            });
    },
    components: {
        slideBar
    },
    methods: {
        loginOut() {
            delete sessionStorage.user;
            this.$router.push('/login');
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../assets/less/mainWrap.less');
</style>