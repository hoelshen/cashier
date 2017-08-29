<template>
    <div class="mainWrap">
    	<slide-bar></slide-bar>
        <div class="mainContent">
            <div class="contentTop">
                <div class="title">
                    预存款查询
                </div>
                <div class="user">
                    <div class="noti">
                        <i class="icon-tongzhi3"></i>
                        <span class="count">0</span>
                    </div>
                    <div class="userName">
                        <span>内置超级管理员</span>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </div>
            </div>
            <router-view class="content"></router-view>
        </div>
    </div>
</template>

<script>
    import slideBar from './slideBar.vue';
    export default {
        components: {
            slideBar
        }
    }
</script>

<style lang="less" scoped>
    @import url('../assets/less/mainWrap.less');
</style>