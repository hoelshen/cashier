<template>
    <div class="content">
        <!-- 搜索 start -->
        <div class="searchwrap">
            <el-form ref="form" label-width="100px" :model="searchData">
                <el-row :gutter="10" class="searchbar">
                    <el-col :span="6">
                        <el-form-item label="注册店铺名：">
                            <el-input v-model="searchData.shopName" placeholder="注册店铺名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="代理商手机：">
                            <el-input v-model="searchData.phone" placeholder="代理商手机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="代理商姓名：">
                            <el-input v-model="searchData.name" placeholder="代理商姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="6">
                        <el-form-item  label="状态：">
                            <el-select v-model="searchData.state"  placeholder="状态" clearable >
                                <el-option v-for="item in stateArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
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
                            <el-date-picker v-model="searchData.signTime" type="daterange"  placeholder="选择日期范围" :picker-options="pickerOptions">
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
                <el-button type="primary" class="add-btn" icon="plus" @click="openAddDialog">新增店铺</el-button>
                <el-row class="tablebar">
                    <el-table :data="myData"  border v-loading.fullscreen.lock="loading"  highlight-current-row style="width: 100%"  >
                        <el-table-column prop="shopNo" label="代理商编号">
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号" width="125">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="shopName" label="店铺名称">
                        </el-table-column>
                        <el-table-column prop="agentLevelIds" label="代理商等级">
                        </el-table-column>
                        <el-table-column prop="depositAmount" label="预存款余额" align="right" sortable min-width="100" >
                        </el-table-column>
                        <el-table-column prop="signTime" label="注册时间" width="110">
                        </el-table-column>
                        <el-table-column prop="state" label="状态">
                            <template scope="scope">
                                <p>
                                    <span v-if="scope.row.state==1" ><span class="green-color"></span>启用</span>
                                    <span v-if="scope.row.state==0" ><span class="red-color"></span>禁用</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="240">
                            <template scope="scope">
                                <p class="operation">
                                    <span v-if="scope.row.state==0" @click="updateAgentState(scope.row)">启用</span>
                                    <span v-if="scope.row.state==1" @click="updateAgentState(scope.row)">禁用</span>
                                    <span>修改</span>
                                    <span>详情</span>
                                    <span>预存款变更</span>
                                </p>
                            </template>
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
        <!-- 新增店铺弹窗 start -->
        <el-dialog title="新增代理商店铺" :visible.sync="addDialogVisible">
            <el-form :model="addForm" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="店铺名称：">
                            <el-input v-model="addForm.shopName" placeholder="店铺名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="代理商姓名：">
                            <el-input v-model="addForm.name" placeholder="代理商姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="代理商手机：">
                            <el-input v-model="addForm.shopName" placeholder="代理商手机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同签约日期：">
                            <el-date-picker v-model="addForm.signTime" type="date"  placeholder="选择日期" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="代理商等级：">
                            <el-select v-model="addForm.agentLevelIds" multiple placeholder="代理商等级" clearable >
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="代理区域：">
                            <addressComponent/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="收件地址：">
                            <addressComponent/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细地址：">
                            <el-input v-model="addForm.shopName" placeholder="详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
                <el-button @click="addDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 新增店铺弹窗 end -->
    </div>
</template>

<script>
import Utils from '../components/tools/Utils';
import addressComponent from '../components/address.vue';
    export default {
        data(){
            return {
                currentPage: 1,
                totalSize: 0,
                pageSize: 20,
                searchData: {
                    shopName: '',
                    phone: '',
                    name: '',
                    state:'',
                    signTime: [],
                    agentLevelIds:[],
                },
                myData: [],
                levelArray:[], //代理商等级数组
                stateArray:[
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
                addDialogVisible:false,
                addForm:{}
            }
        },
        components: {
            addressComponent
        },
        created(){
            const self = this;
            self.loading = true;
            //获取代理商等级列表
            self.$ajax.post('/api/http/shop/queryAgentGradeList.jhtml',{
            }).then(function(response){
                console.log(response);
                if(response.data.success==1){
                    self.levelArray = response.data.result
                }else{
                    self.$message({
                        message:response.data.msg,
                        type:'error'
                    })
                }
                
            }).catch(function(err){
                console.log(err);
            });
            //获取列表数据
            self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
                params:{
                    'pager.pageIndex':self.currentPage,
                    'pager.pageSize':self.pageSize
                }
            }).then(function(response){
                self.loading = false;
                self.myData = response.data.rows;
                self.totalSize = response.data.total
                console.log(response);
            }).catch(function(err){
                self.loading = false;
                console.log(err);
            });

        },
        methods: {
            onSubmit:function(){
                const self = this;
                self.currentPage = 1;
                self.loading = true;
                self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
                    params:{
                        'pager.pageIndex':self.currentPage,
                        'pager.pageSize':self.pageSize,
                        'shop.shopName':self.searchData.shopName,
                        'shop.phone':self.searchData.phone,
                        'shop.name':self.searchData.name,
                        'shop.startTime':self.searchData.signTime&&self.searchData.signTime[0]?Utils.formatDate(this.searchData.signTime[0]):'',
                        'shop.endTime':self.searchData.signTime&&self.searchData.signTime[1]?Utils.formatDate(this.searchData.signTime[1]):'',
                        'shop.state':self.searchData.state
                    }
                }).then(function(response){
                    self.loading = false;
                    self.myData = response.data.rows;
                    self.totalSize = response.data.total
                    console.log(response);
                }).catch(function(err){
                    self.loading = false;
                    console.log(err);
                });
            },
            //改变每页显示的条数
            handleSizeChange:function(val){
                const self = this;
                self.pageSize = val;
                self.currentPage = 1;
                self.loading = true;
                self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
                    params:{
                        'pager.pageIndex':self.currentPage,
                        'pager.pageSize':self.pageSize,
                        'shop.shopName':self.searchData.shopName,
                        'shop.phone':self.searchData.phone,
                        'shop.name':self.searchData.name,
                        'shop.startTime':self.searchData.signTime&&self.searchData.signTime[0]?Utils.formatDate(this.searchData.signTime[0]):'',
                        'shop.endTime':self.searchData.signTime&&self.searchData.signTime[1]?Utils.formatDate(this.searchData.signTime[1]):'',
                        'shop.state':self.searchData.state
                    }
                }).then(function(response){
                    self.loading = false;
                    self.myData = response.data.rows;
                    self.totalSize = response.data.total
                    console.log(response);
                }).catch(function(err){
                    self.loading = false;
                    console.log(err);
                });
            },
            //改变当前页
            handleCurrentChange:function(val){
                const self = this;
                self.currentPage = val;
                self.loading = true;
                self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
                    params:{
                        'pager.pageIndex':self.currentPage,
                        'pager.pageSize':self.pageSize,
                        'shop.shopName':self.searchData.shopName,
                        'shop.phone':self.searchData.phone,
                        'shop.name':self.searchData.name,
                        'shop.startTime':self.searchData.signTime&&self.searchData.signTime[0]?Utils.formatDate(this.searchData.signTime[0]):'',
                        'shop.endTime':self.searchData.signTime&&self.searchData.signTime[1]?Utils.formatDate(this.searchData.signTime[1]):'',
                        'shop.state':self.searchData.state
                    }
                }).then(function(response){
                    self.loading = false;
                    self.myData = response.data.rows;
                    self.totalSize = response.data.total
                    console.log(response);
                }).catch(function(err){
                    self.loading = false;
                    console.log(err);
                });
            },
            //打开新增店铺弹窗
            openAddDialog(){
                this.addDialogVisible = true;
            },
            //修改代理商状态
            updateAgentState(data){
                console.log(data)
                const self =this;
                const h = self.$createElement;
                const stateCN = data.state==1?'禁用':'启用';
                self.$msgbox({
                title: '确定'+stateCN+'？',
                message: h('div', {style:'padding:10px'}, [
                    h('div', {style:data.state==1?'padding:5px':''}, [
                        h('span',{style:'color:red'},data.state==1?'禁用后门店将无法使用系统':''),
                        h('span',null,data.state==1?'，你还要继续吗？':''),
                    ]),
                    h('div', {style:'padding:5px;display:flex'}, [
                        h('div',{style:'flex:1'},[
                            h('span',null,'代理商姓名：'),
                            h('span',{style:'color:red'},data.name)
                        ]),
                        h('div',null,[
                            h('span',{style:'margin-left:20px'},'代理商手机：'),
                            h('span',{style:'color:red'},data.phone)
                        ])

                    ]),
                    h('div', {style:'padding:5px'}, [
                        h('span',{style:'padding-left:14px'},'店铺名称：'),
                        h('span',{style:'color:red'},data.shopName),
                    ]),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(action => {
                    self.loading = true;
                    //获取代理商等级列表
                    self.$ajax.get('/api/shop/shopManage/updateState.jhtml',{
                        params:{
'shop.id':data.id,
                        'shop.state':data.state
                        }
                        
                    }).then(function(response){
                        console.log(response);
                        self.loading = false;
                        if(response.data.success==1){
                            self.$message({
                                message: '编号：'+data.shopNo+' '+stateCN+'成功',
                                type:'success'
                            })
                        }else{
                            self.$message({
                                message:response.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        self.loading = false;
                        console.log(err);
                    });

                });
            }

        }
    }
</script>
<style lang="less" scoped>
    @import url('../assets/less/storeManage.less');
</style>
