<template>
    <div class="drawBack">
        <div class="search">
            <el-form v-model="searchData">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item label="代理商手机" label-width="35%">
                            <el-input v-model="searchPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="注册店铺名" label-width="35%">
                            <el-input v-model="searchShopName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="退款单号" label-width="35%">
                            <el-input v-model="searchNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="原进货单号" label-width="35%">
                            <el-input v-model="searchOrderNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item label="状态" label-width="35%">
                            <el-select v-model="searchState">
                                <el-option label="待审核" value="1"></el-option>
                                <el-option label="已收货，确认中" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="申请时间" label-width="35%">
                            <el-date-picker type="daterange" placeholder="选择日期范围" v-model="searchTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="margin-left:5%;">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="drawBackList">
            <el-table border :data="tableData" @sort-change='store'>
                <el-table-column prop="drawBackNo" label="退款单单号">
                </el-table-column>
                <el-table-column prop="shopNo" label="代理商编号">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
                <el-table-column prop="shopName" label="店铺名称">
                </el-table-column>
                <el-table-column prop="type" label="退款类型">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
                <el-table-column prop="createTime" label="申请时间" sortable="custom">
                </el-table-column>
                <el-table-column prop="orderNo" label="原进货单号">
                </el-table-column>
                <el-table-column prop="drawBackNo" label="操作">
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalNums"></el-pagination>
        </div>
    </div>
</template>

<script type="text/javascript" src="../router.js"></script>
<script>
export default {
    data() {
        return {
            pageSize: 30,                   //当前条数
            currentPage: 1,                 //当前页
            totalNums: 500,                 //总条数
            searchData: {                   //查询数据
                searchPhone: '',            //代理商手机
                searchShopName: '',         //注册店铺名
                searchNo: '',               //退款单号
                searchOrderNo: '',          //原进货单号
                searchState: '',            //状态
                searchTime: '',             //申请时间
            },
            tableData: [
                {
                    drawBackNo: '',          //退款单号
                    shopNo: '',              //代理商编号
                    phone: '',               //手机号
                    shopName: '',            //店铺名称
                    type: '',                //类型
                    state: '',               //状态
                    createTime: '',          //申请时间
                    orderNo: '',             //原进货单号
                }
            ]
        }
    },
    created() {

    },
    methods: {
        //每页条数选择
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //当前页跳转
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //排序
        store() {

        },
        onSubmit() {

        },
    },
}
</script>

<style lang="less" scoped>
@import url('../assets/less/drawBack.less');
</style>
