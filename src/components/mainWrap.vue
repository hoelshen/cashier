<template>
    <div class="mainWrap">
        这是主要内容块

    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.$router )
        }
    }
</script>

<style lang="less" scoped>
    .mainWrap{
        height: 100%;
        padding-left: 200px;
    }
</style>