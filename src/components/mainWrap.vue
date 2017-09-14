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
                    <div class="userName">
                        <span>{{ user.realName }}</span>
                        <i class="el-icon-caret-bottom"></i>
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
    export default {
        data() {
            return {
                contentName: '主页',
                configName: {
                    '/': '主页',
                    '/testTree' : '测试树',
                    '/storeManage': '店铺管理',
                    '/prepaidManage': '预存款查询',
                    '/orderManage': '进货单管理',
                    '/memberList': '会员查询',
                    '/waitOrder': '待审核订单',
                    '/orderInfo/:purchaseOrderNo/:shopNo': '进货单详情',
                },
                user : {}
            }
        },
        watch: {
            '$route'(val) {
                this.contentName = this.configName[val.fullPath];
            }
        },
        created() {
            if (sessionStorage.user) {
                this.user = JSON.parse(sessionStorage.user).data;
            } else {
                delete sessionStorage.user;
                this.$router.push('/login');
            }
            this.contentName = this.configName[this.$route.fullPath];

            this.$getData({
                url: 'http/purchaseOrder/queryPurchaseOrderList.jhtml',
                data: {
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize,
                    'purchaseOrder.state':'WAIT_CHECK',
                },
                success(response){
                    console.log(response.data.totalNums);
                    this.$slide.setCount('waitOrder',response.data.totalNums);
                    console.log(this.$slide.counts['waitOrder'].count);
                },
                fail(response){
                    alert(response.data.msg);
                },
            });
        },
        components: {
            slideBar
        }
    }
</script>

<style lang="less" scoped>
    @import url('../assets/less/mainWrap.less');
</style>