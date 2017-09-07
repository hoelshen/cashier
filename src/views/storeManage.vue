<template>
    <div class="content">
        <!-- 搜索 start -->
        <div class="searchwrap">
            <el-form ref="form" label-width="100px" :model="searchData">
                <el-row :gutter="10" class="searchbar">
                    <el-col :span="6">
                        <el-form-item label="注册店铺名：">
                            <el-input v-model="searchData.storeName" placeholder="注册店铺名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="代理商手机：">
                            <el-input v-model="searchData.agentPhone" placeholder="代理商手机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="代理商姓名：">
                            <el-input v-model="searchData.agentName" placeholder="代理商姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="6">
                        <el-form-item  label="状态：">
                            <el-select v-model="searchData.status"  placeholder="状态" clearable >
                                <el-option v-for="item in statusArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="6">
                        <el-form-item label="代理商等级：">
                            <el-select v-model="searchData.agentLevelIds" multiple placeholder="代理商等级" clearable >
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="7">
                        <el-form-item  label="注册时间： ">
                            <el-date-picker v-model="searchData.time" type="daterange"  placeholder="选择日期范围" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 搜索 end -->
        <!-- 表格 start -->
        <div class="t-bodywrap">
            <el-row class="t-body">
                <el-row class="tablebar">
                    <el-table :data="myData"  border v-loading.fullscreen.lock="loading"  highlight-current-row style="width: 100%" @row-dblclick="openDetail" >
                        <el-table-column prop="memberId" label="代理商编号">
                        </el-table-column>
                        <el-table-column prop="memberId" label="手机号">
                        </el-table-column>
                        <el-table-column prop="levelAndName" label="姓名">
                        </el-table-column>
                        <el-table-column prop="phone" label="店铺名称">
                        </el-table-column>
                        <el-table-column prop="totalIntegral" label="代理商等级">
                        </el-table-column>
                        <el-table-column prop="cumulativeConsume" label="预存款余额" align="right" sortable>
                        </el-table-column>
                        <el-table-column prop="totalAmount" label="注册时间">
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                        </el-table-column>
                        <el-table-column  label="操作">
                        </el-table-column>
                    </el-table>
                </el-row>
                <div class="plPage clearfix">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <!-- 表格 end -->
    </div>
</template>

<script>
import levelArray from '../components/config/agentLevel.config';
    export default {
        data(){
            return {
                currentPage: 1,
                totalSize: 0,
                pageSize: 30,
                searchData: {
                    storeName: '',
                    agentPhone: '',
                    agentName: '',
                    status:'',
                    time: [],
                    agentLevelIds:[],
                },
                myData: [],
                levelArray, //代理商等级数组
                statusArray:[
                    {index:1,name:'启用'},
                    {index:2,name:'禁用'},
                ],
                loading: false,
                //日期选择器
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$ajax({
                    url: '/apitest/sys/login/doLogin',
                    type: 'post',
                    data: {
                        'account': self.ruleForm.username,
                        'password': self.ruleForm.password
                    }

                }).then(function(response){
                    if(response.data.status == 0){
                        // window.location.href = '/'+self.uri+'/index';
                    }else{
                        alert(response.data.info);
                    }
                }).catch(function(error){

                });       
            }
        }
    }
</script>
<style lang="less" scoped>
    @import url('../assets/less/storeManage.less');
</style>
