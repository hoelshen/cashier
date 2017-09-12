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
                                    <span v-if="scope.row.state==0">启用</span>
                                    <span v-if="scope.row.state==1">禁用</span>
                                    <span>修改</span>
                                    <span>详情</span>
                                    <span @click='chengPre(scope.row.id,scope.row.shopName,scope.row.shopNo)'>预存款变更</span>
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
            <el-form :model="changeForm">
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
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
                <el-button @click="addDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 新增店铺弹窗 end -->
        <!-- 预存款变更弹窗 start -->
        <el-dialog :title="changeTitle" :visible.sync="dialogFormVisible" size="tiny">
            <el-form :model="changeForm">
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="店铺名称：" label-width="100px">
                            <el-input v-model="changeForm.changeShopName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="22">
                        <el-form-item label="变动类型：" label-width="100px">
                            <el-select v-model="changeForm.changeType" clearable placeholder="请选择" style="width:257px;">
                            <el-option label="充值" value="TOP_UP"></el-option>
                            <el-option label="扣款" value="DEDUCTIONS"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="变动金额：" label-width="100px">
                            <h3 v-if="changeForm.changeType === 'DEDUCTIONS'">➖</h3>
                            <h4 v-if="changeForm.changeType === 'TOP_UP'">➕</h4>
                        </el-form-item>
                        </el-col>
                        <el-col :span="15">
                        <el-form-item>
                           <el-input v-model="changeForm.alterMoney" placeholder="变动金额"></el-input>
                           <p class="yuan">元</p>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注说明：" label-width="100px">
                            <el-input v-model="changeForm.remark" placeholder="备注"></el-input>
                            <p class="triangle"></p><p class="msg">备注修改的原因，不超过50个中文字符</p>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onChange">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 预存款变更弹窗 end -->
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
                    shopName: '',
                    phone: '',
                    name: '',
                    state:'',
                    signTime: [],
                    agentLevelIds:[],
                },
                myData: [],
                levelArray, //代理商等级数组
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
                dialogFormVisible:false,
                changeTitle:'',
                changeForm:{
                    changeShopId:'',
                    changeShopName:'',
                    changeType:'',
                    alterMoney:'',
                    remark:'',
                },
                addForm:{}
            }
        },
        created(){
                const self = this;
                self.loading = true;
                self.$ajax({
                    url: '/api/shop/ShopManage/search.jhtml',
                    method: 'get',
                }).then(function(response){
                    console.log(response)
                    self.myData = response.data.rows;
                    self.totalSize = response.data.total
                    self.loading = false;
                }).catch(function(error){
                    console.log(error)
                    self.loading = false;
                    this.dialogFormVisible = true;
                });
        },
        methods: {
            onChange(){
                if (!this.changeForm.changeType) {
                    alert("请选择一个变动类型！");
                    return;
                }
                if (!this.changeForm.alterMoney) {
                    alert("变动金额不能为空！");
                    return;
                }
                if(!/^[0-9\.]*$/.test(this.changeForm.alterMoney)){
                    alert("变更金额格式错误！");
                    return;
                }
                if (!/^[\u4e00-\u9fa5\，\w\-]{1,50}$/.test(this.changeForm.remark)){
                    alert("备注长度错误或存在非法字符！");
                    return;
                }
                const self = this;
                self.$ajax({
                    url: '/api/shop/shopManage/updateDepositAmount.jhtml',
                    method: 'post',
                    data: {
                         'advanceDeposit.shopId':this.changeForm.changeShopId,
                          'advanceDeposit.changeType':this.changeForm.changeType,
                          'advanceDeposit.alterMoney':this.changeForm.alterMoney,
                          'advanceDeposit.remark':this.changeForm.remark,
                    },
                    transformRequest: [function (data) {
                        // Do whatever you want to transform the data
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret;
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response){
                    console.log(response)
                    if(response.data.result === 1){
                        if(window.sessionStorage){
                            alert(response.data.msg);
                        }
                    }else{
                        alert(response.data.msg);
                    }
                }).catch(function(error){

                });
                this.dialogFormVisible = false;
            },
            chengPre(id,shopName,shopNo){
                console.log(id);
                this.changeForm.changeShopId = id;
                this.changeForm.changeShopName = shopName;
                this.changeTitle = "编辑代理商店铺（编号："+shopNo+"）"
                this.dialogFormVisible = true;
            },
            onSubmit:function(){
                const self = this;
                self.loading = true;
                self.$ajax({
                    url: '/api/shop/ShopManage/search.jhtml',
                    method: 'get',
                    data:{
                        'page.pageSize':2
                    }
                }).then(function(response){
                    console.log(response)
                    self.myData = response.data.rows;
                    self.totalSize = response.data.total
                    self.loading = false;
                }).catch(function(error){
                    console.log(error)
                    self.loading = false;
                });
            },
            handleSizeChange:function(){

            },
            handleCurrentChange:function(){
                
            },
            //打开新增店铺弹窗
            openAddDialog(){
                this.addDialogVisible = true;
            }

        }
    }
</script>
<style lang="less" scoped>
    @import url('../assets/less/storeManage.less');
</style>
