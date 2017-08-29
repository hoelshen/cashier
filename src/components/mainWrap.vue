<template>
    <div class="mainWrap">
    	<slide-bar></slide-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import slideBar from './slideBar.vue';
    export default {
        components: {
            slideBar
        },
        created() {
            // console.log(this.$router )
        }
    }
</script>

<style lang="less" scoped>
    .mainWrap{
        height: 100%;
        padding-left: 200px;
    }
</style>