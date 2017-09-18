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
                    <el-table :data="myData"  border v-loading.fullscreen.lock="loading"  highlight-current-row style="width: 100%" @sort-change='sortAmount' >
                        <el-table-column prop="shopNo" label="代理商编号">
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号" width="125">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column title="shopName"  prop="shopName" label="店铺名称">
                            <template  scope="scope">
                                <span class="limit-two" :title="scope.row.shopName">{{scope.row.shopName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="agentGradeId" label="代理商等级">
                            <template  scope="scope">
                                <span v-if="scope.row.agentGradeId==31" >单店代理</span>
                                <span v-if="scope.row.agentGradeId==265" >区域代理</span>
                                <span v-if="scope.row.agentGradeId==266" >专柜代理</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="depositAmount" label="预存款余额" align="right" sortable="custom" min-width="100" >
                        </el-table-column>
                        <el-table-column prop="signTime" label="注册时间" width="110">
                        </el-table-column>
                        <el-table-column prop="state" label="状态">
                            <template scope="scope">
                                <p>
                                    <span v-if="scope.row.state==0" ><span class="green-color"></span>启用</span>
                                    <span v-if="scope.row.state==1" ><span class="red-color"></span>禁用</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="240">
                            <template scope="scope">
                                <p class="operation">
                                    <span v-if="scope.row.state==1" @click="updateAgentState(scope.row)">启用</span>
                                    <span v-if="scope.row.state==0" @click="updateAgentState(scope.row)">禁用</span>
                                    <span @click="openEditDialog(scope.row,'edit')">修改</span>
                                    <span @click="openEditDialog(scope.row,'detail')">详情</span>
                                    <span @click='chengPre(scope.row.id,scope.row.shopName,scope.row.shopNo)'>预存款变更</span>
                                </p>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <div class="plPage clearfix">
                    <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <!-- 表格 end -->
        <!-- 新增店铺弹窗 start -->
        <el-dialog title="新增代理商店铺" :visible.sync="addDialogVisible" >
            <el-form :model="addForm" label-width="120px" ref="addForm">
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
                            <el-input v-model="addForm.phone" placeholder="代理商手机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同签约日期：">
                            <el-date-picker v-model="addForm.signedTime" type="date"  placeholder="选择日期" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="代理商等级：">
                            <el-select v-model="addForm.agentGradeId" placeholder="代理商等级" clearable >
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-show="addForm.agentGradeId=='265'">
                        <el-form-item label="代理区域：">
                            <addressComponent ref='addAgentAddress'/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="收件地址：">
                            <addressComponent ref='addAddress'/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细地址：">
                            <el-input v-model="addForm.address" placeholder="详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addAgent">确 定</el-button>
                <el-button @click="addDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 新增店铺弹窗 end -->
        <!-- 修改店铺及店铺详情弹窗 start -->
        <el-dialog :title="editFormTitle" :visible.sync="editDialogVisible" >
            <el-form :model="editForm" label-width="120px" ref="editForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="店铺名称：">
                            <el-input v-model="editForm.shopName" placeholder="店铺名称" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="代理商姓名：">
                            <el-input v-model="editForm.name" placeholder="代理商姓名" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="代理商手机：">
                            <el-input v-model="editForm.phone" placeholder="代理商手机" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同签约日期：">
                            <el-date-picker v-model="editForm.signedTime" type="date"  placeholder="选择日期" :picker-options="pickerOptions" disabled>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="代理商等级：">
                            <el-select v-model="editForm.agentGradeId" placeholder="代理商等级" clearable :disabled="isDisable">
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="24" v-show="editForm.agentGradeId=='265'">
                        <el-form-item label="代理区域：">
                            <addressComponent :provinceCode="editForm.agentProvince" :cityCode="editForm.agentCity" :areaCode="editForm.agentCounty"  ref='editAgentAddress'  :disabled="isDisable"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-show="editForm.agentGradeId">
                        <el-form-item label="收件地址：">
                            <addressComponent :provinceCode="editForm.provinceCode" :cityCode="editForm.cityCode" :areaCode="editForm.countyCode"  ref='editAddress' :disabled="isDisable"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细地址：">
                            <el-input v-model="editForm.address" placeholder="详细地址" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="isDisable">
                        <el-form-item label="预存款详情：">
                            <router-link :to="{ name: 'prepaidManage', params: { shopNo:editForm.shopNo }}">点击查看</router-link>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer"> 
                <el-button type="primary" @click="editAgent()" v-if="!isDisable">确 定</el-button>
                <el-button @click="editDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 修改店铺及店铺详情弹窗 end -->
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
                           <el-input v-model="changeForm.alterMoney" placeholder="变动金额" @keyup.native="checkMoney"></el-input>
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
import Utils from '../components/tools/Utils';
import addressComponent from '../components/address.vue';
import $ from 'jquery';
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
                levelArray:[], //代理商等级数组
                stateArray:[
                    {index:0,name:'启用'},
                    {index:1,name:'禁用'},
                ],
                loading: false,
                //日期选择器
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                addDialogVisible:false,
                editDialogVisible:false,
                dialogFormVisible:false,
                changeTitle:'',
                changeForm:{
                    changeShopId:'',
                    changeShopName:'',
                    changeType:'',
                    alterMoney:'',
                    remark:'',
                },
                addForm:{
                    shopName:'',
                    name:'',
                    phone:'',
                    signedTime:'',
                    agentGradeId:'',
                    provinceCode:'',
                    cityCode:'',
                    countyCode:'',
                    agentProvince:'',
                    agentCity:'',
                    agentCounty:'',
                    address:''
                },
                editFormTitle:'',
                editForm:{
                    id:'',
                    shopName:'',
                    name:'',
                    phone:'',
                    signedTime:'',
                    agentGradeId:'',
                    provinceCode:'',
                    cityCode:'',
                    countyCode:'',
                    agentProvince:'',
                    agentCity:'',
                    agentCounty:'',
                    address:''
                },
                isDisable:false,
                order:''//预存款排序
            }
        },
        components: {
            addressComponent
        },
        created(){
            const self = this;
            if(!self.checkSession())return;
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
            //判断是否超时
            checkSession(){
                const self = this;
                if(window.sessionStorage){
                    let nowDate = new Date().getTime();
                    let time = (nowDate - sessionStorage.haha)/1000
                    //超过30秒没操作，重新登录
                    if(time>1800){
                        self.$router.push('/login');
                        self.$message({
                            message:'登录超时，请重新登录',
                            type:'error'
                        })
                        return false;
                    }else{
                        sessionStorage.haha = nowDate;
                        return true;
                    }
                }
            },

            //预存款变更
            onChange(){
                const self = this;
                if(!self.checkSession())return;
                if (!self.changeForm.changeType) {
                    self.$message({
                        message:"请选择一个变动类型！",
                        type:'error'
                    })
                    return;
                }
                if (!self.changeForm.alterMoney) {
                    self.$message({
                        message:"变动金额不能为空！",
                        type:'error'
                    })
                    return;
                }
                if(!/^[0-9]*\.*[0-9]{2}$/.test(self.changeForm.alterMoney)){
                    self.$message({
                        message:"变动金额只能为正数，且小数位不能超过两位！",
                        type:'error'
                    })
                    return;
                }
                if (self.changeForm.remark.length>50){
                    self.$message({
                        message:"备注长度不得超过50个字符！",
                        type:'error'
                    })
                    return;
                }
                self.loading = true;
                self.$ajax({
                    url: '/api/shop/shopManage/updateDepositAmount.jhtml',
                    method: 'post',
                    data: {
                         'advanceDeposit.shopId':self.changeForm.changeShopId,
                          'advanceDeposit.changeType':self.changeForm.changeType,
                          'advanceDeposit.alterMoney':self.changeForm.alterMoney,
                          'advanceDeposit.remark':self.changeForm.remark,
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
                    self.loading = false;
                    console.log(response)
                    if(response.data.result === 1){
                        if(window.sessionStorage){
                            self.$message({
                                message:response.data.msg,
                                type:'success'
                            })
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000)
                        }
                    }else{
                        self.$message({
                            message:response.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(error){

                });
                self.dialogFormVisible = false;
            },
            chengPre(id,shopName,shopNo){
                if(!this.checkSession())return;
                this.changeForm.changeShopId = id;
                this.changeForm.changeShopName = shopName;
                this.changeTitle = "编辑代理商店铺（编号："+shopNo+"）"
                this.dialogFormVisible = true;
            },
            //查询
            onSubmit:function(){
                const self = this;
                if(!self.checkSession())return;
                self.currentPage = 1;
                //清除排序
                self.order='';
                $(".ascending.is-leaf").removeClass("ascending");
                $(".descending.is-leaf").removeClass("descending");
                self.loading = true;
                self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
                    params:{
                        'pager.pageIndex':self.currentPage,
                        'pager.pageSize':self.pageSize,
                        'shop.shopName':self.searchData.shopName,
                        'shop.phone':self.searchData.phone,
                        'shop.name':self.searchData.name,
                        'shop.startTime':self.searchData.signTime&&self.searchData.signTime[0]?Utils.formatDayDate(this.searchData.signTime[0]):'',
                        'shop.endTime':self.searchData.signTime&&self.searchData.signTime[1]?Utils.formatDayDate(this.searchData.signTime[1]):'',
                        'shop.state':self.searchData.state,
                        'shop.agentGradeIds':self.searchData.agentLevelIds.join(','),
                        'shop.sort':'depositAmount',
                        'shop.order':self.order
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
            // handleSizeChange:function(val){
            //     const self = this;
            //     if(!self.checkSession())return;
            //     self.pageSize = val;
            //     self.currentPage = 1;
            //     self.loading = true;
            //     self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
            //         params:{
            //             'pager.pageIndex':self.currentPage,
            //             'pager.pageSize':self.pageSize,
            //             'shop.shopName':self.searchData.shopName,
            //             'shop.phone':self.searchData.phone,
            //             'shop.name':self.searchData.name,
            //             'shop.startTime':self.searchData.signTime&&self.searchData.signTime[0]?Utils.formatDayDate(this.searchData.signTime[0]):'',
            //             'shop.endTime':self.searchData.signTime&&self.searchData.signTime[1]?Utils.formatDayDate(this.searchData.signTime[1]):'',
            //             'shop.state':self.searchData.state,
            //             'shop.agentGradeIds':self.searchData.agentLevelIds.join(','),
            //             'shop.sort':'depositAmount',
            //             'shop.order':self.order
            //         }
            //     }).then(function(response){
            //         self.loading = false;
            //         self.myData = response.data.rows;
            //         self.totalSize = response.data.total
            //         console.log(response);
            //     }).catch(function(err){
            //         self.loading = false;
            //         console.log(err);
            //     });
            // },
            //改变当前页
            handleCurrentChange:function(val){
                const self = this;
                if(!self.checkSession())return;
                self.currentPage = val;
                self.loading = true;
                self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
                    params:{
                        'pager.pageIndex':self.currentPage,
                        'pager.pageSize':self.pageSize,
                        'shop.shopName':self.searchData.shopName,
                        'shop.phone':self.searchData.phone,
                        'shop.name':self.searchData.name,
                        'shop.startTime':self.searchData.signTime&&self.searchData.signTime[0]?Utils.formatDayDate(this.searchData.signTime[0]):'',
                        'shop.endTime':self.searchData.signTime&&self.searchData.signTime[1]?Utils.formatDayDate(this.searchData.signTime[1]):'',
                        'shop.state':self.searchData.state,
                        'shop.agentGradeIds':self.searchData.agentLevelIds.join(','),
                        'shop.sort':'depositAmount',
                        'shop.order':self.order
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
            // 预存款余额排序
            sortAmount(row,column){
                const self = this;
                console.log(row.order)
                if (row.order === 'ascending') {
                    self.order = 'asc';
                }else if (row.order === 'descending') {
                    self.order = 'desc';
                }else{
                    self.order = '';
                }
                if(!self.checkSession())return;
                self.loading = true;
                self.$ajax.get('/api/shop/ShopManage/search.jhtml',{
                    params:{
                        'pager.pageIndex':self.currentPage,
                        'pager.pageSize':self.pageSize,
                        'shop.shopName':self.searchData.shopName,
                        'shop.phone':self.searchData.phone,
                        'shop.name':self.searchData.name,
                        'shop.startTime':self.searchData.signTime&&self.searchData.signTime[0]?Utils.formatDayDate(this.searchData.signTime[0]):'',
                        'shop.endTime':self.searchData.signTime&&self.searchData.signTime[1]?Utils.formatDayDate(this.searchData.signTime[1]):'',
                        'shop.state':self.searchData.state,
                        'shop.agentGradeIds':self.searchData.agentLevelIds.join(','),
                        'shop.sort':'depositAmount',
                        'shop.order':self.order
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
            //打开修改店铺及店铺详情弹窗
            openEditDialog(data,type){
                type=='edit'?this.isDisable=false:this.isDisable=true
                this.editFormTitle = type=='edit'?"编辑代理商店铺（编号："+data.shopNo+"）":"查看代理商店铺（编号："+data.shopNo+"）"
                this.getInfoById(data.id);
                this.editDialogVisible = true;
            },
            // 获取选中店铺信息
            getInfoById(id){
                const self = this;
                if(!self.checkSession())return;
                self.loading = true;
                self.$ajax.get('/api/http/shop/searchShop.jhtml',{
                    params:{
                        'shopId':id,
                    }
                }).then(function(response){
                    self.loading = false;
                    self.editForm = response.data.result;
                    console.log(self.editForm)
                }).catch(function(err){
                    self.loading = false;
                    console.log(err);
                });
            },
            //修改代理商状态
            updateAgentState(data){
                const self =this;
                if(!self.checkSession())return;
                const h = self.$createElement;
                const stateCN = data.state==0?'禁用':'启用';
                self.$msgbox({
                title: '确定'+stateCN+'？',
                message: h('div', {style:'padding:10px'}, [
                    h('div', {style:data.state==0?'padding:5px':''}, [
                        h('span',{style:'color:red'},data.state==0?'禁用后门店将无法使用系统':''),
                        h('span',null,data.state==0?'，你还要继续吗？':''),
                    ]),
                    h('div', {style:'padding:5px;display:flex'}, [
                        h('div',{style:'flex:1'},[
                            h('span',null,'代理商姓名：'),
                            h('span',{style:'color:red'},data.name)
                        ]),
                        h('div',null,[
                            h('span',null,'代理商手机：'),
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
                cancelButtonClass:'cancel-button',
                confirmButtonClass:'confirm-button'
                }).then(action => {
                    self.loading = true;
                    self.$ajax({
                        url: '/api/shop/shopManage/updateState.jhtml',
                        method: 'post',
                        data: {
                            'shop.id':data.id,
                            'shop.state':data.state==0?1:0
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                            return ret
                        }],
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response){
                        self.loading = false;
                        if(response.data.success==1){
                            self.$message({
                                message: '编号：'+data.shopNo+' '+stateCN+'成功',
                                type:'success'
                            })
                            setTimeout(function() {
                                self.handleCurrentChange(self.currentPage);
                            }, 1000)
                        }else{
                            self.$message({
                                message:response.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        self.loading = false;
                    });

                });
            },
            //提交字段校验
            testData(data,Address,AgentAddress){
                const self = this;
                let isMobile = /^1\d{10}$/
                //店铺名判断
                if(!data.shopName){
                    self.loading = false;
                    self.$message({
                        message:'店铺名不得为空',
                        type:'error'
                    })
                    return false
                }else{
                    if(data.shopName.length>50){
                        self.loading = false;
                        self.$message({
                            message:'店铺名长度不得大于50',
                            type:'error'
                        })
                        return false
                    }
                }
                //代理商姓名判断
                if(!data.name){
                    self.loading = false;
                    self.$message({
                        message:'代理商姓名不得为空',
                        type:'error'
                    })
                    return false
                }else{
                    if(data.name.length>10){
                        self.loading = false;
                        self.$message({
                            message:'代理商姓名长度不得大于10',
                            type:'error'
                        })
                        return false
                    }
                }
                //代理商手机判断
                if(!data.phone){
                    self.loading = false;
                    self.$message({
                        message:'代理商手机不得为空',
                        type:'error'
                    })
                    return false
                }else{
                    if(!isMobile.test(data.phone)){
                        self.loading = false;
                        self.$message({
                            message:'代理商手机格式有误',
                            type:'error'
                        })
                        return false
                    }
                }
                //合同签约日期判断
                if(!data.signedTime){
                    self.loading = false;
                    self.$message({
                        message:'合同签约日期不得为空',
                        type:'error'
                    })
                    return false
                }
                //代理商等级判断
                if(!data.agentGradeId){
                    self.loading = false;
                    self.$message({
                        message:'代理商等级不得为空',
                        type:'error'
                    })
                    return false
                }
                //收件地址判断
                if(!Address.provinceCode||!Address.cityCode||!Address.areaCode){
                    self.loading = false;
                    self.$message({
                        message:'收件地址不得为空',
                        type:'error'
                    })
                    return false
                }else{
                    if(Address.cityCode==1){
                        self.loading = false;
                        self.$message({
                            message:'请选择具体收件城市',
                            type:'error'
                        })
                        return false
                    }
                    if(Address.areaCode==1){
                        self.loading = false;
                        self.$message({
                            message:'请选择具体收件地区',
                            type:'error'
                        })
                        return false
                    }
                }
                //详细地址判断
                if(!data.address){
                    self.loading = false;
                    self.$message({
                        message:'详细地址不得为空',
                        type:'error'
                    })
                    return false
                }else{
                    if(data.address.length>100){
                        self.loading = false;
                        self.$message({
                            message:'详细地址长度不得大于100个字符',
                            type:'error'
                        })
                                            
                    return false
                    }

                }
                //代理区域判断
                if(data.agentGradeId==265){
                    if(!AgentAddress.provinceCode||!AgentAddress.cityCode||!AgentAddress.areaCode){
                        self.loading = false;
                        self.$message({
                            message:'代理区域不得为空',
                            type:'error'
                        })
                        return false
                    }else{
                        if(AgentAddress.cityCode==1){
                            self.loading = false;
                            self.$message({
                                message:'请选择具体代理城市',
                                type:'error'
                            })
                            return false
                        }
                    }

                }
                return true
            },
            // 新增店铺
            addAgent(){
                const self = this;
                if(!self.checkSession())return;
                self.loading = true;
                const data = self.addForm;
                let addAddress = self.$refs.addAddress.getData();
                let addAgentAddress = self.$refs.addAgentAddress.getData();
                if (!self.testData(data,addAddress,addAgentAddress))return;
                //请求
                self.$ajax({
                    url: '/api/shop/shopManage/modify.jhtml',
                    method: 'post',
                    data: {
                        'shop.shopName':data.shopName,
                        'shop.name':data.name,
                        'shop.phone':data.phone,
                        'shop.signedTime':Utils.formatDayDate(data.signedTime),
                        'shop.agentGradeId':data.agentGradeId,
                        'shop.provinceCode':addAddress.provinceCode,
                        'shop.cityCode':addAddress.cityCode,
                        'shop.countyCode':addAddress.areaCode,
                        'shop.agentProvince':data.agentGradeId==265?addAgentAddress.provinceCode:'',
                        'shop.agentCity':data.agentGradeId==265?addAgentAddress.cityCode:'',
                        'shop.agentCounty':data.agentGradeId==265?addAgentAddress.areaCode:'',
                        'shop.address':data.address,
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                        return ret
                    }],
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response){
                    self.loading = false;
                    console.log(response)
                    self.$message({
                        message:response.data.msg,
                        type:'success'
                    })
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000)
                }).catch(function(err){
                    self.loading = false;
                });
            },
            // 修改店铺
            editAgent(){
                const self = this;
                if(!self.checkSession())return;
                self.loading = true;
                const data = self.editForm;
                let editAddress = self.$refs.editAddress.getData();
                let editAgentAddress = self.$refs.editAgentAddress.getData();
                if (!self.testData(data,editAddress,editAgentAddress))return;
                //请求
                console.log(data)
                self.$ajax({
                    url: '/api/shop/shopManage/modify.jhtml',
                    method: 'post',
                    data: {
                        'shop.id':data.id,
                        'shop.shopName':data.shopName,
                        'shop.name':data.name,
                        'shop.phone':data.phone,
                        'shop.signedTime':data.signedTime,
                        'shop.agentGradeId':data.agentGradeId,
                        'shop.provinceCode':editAddress.provinceCode,
                        'shop.cityCode':editAddress.cityCode,
                        'shop.countyCode':editAddress.areaCode,
                        'shop.agentProvince':data.agentGradeId==265?editAgentAddress.provinceCode:'',
                        'shop.agentCity':data.agentGradeId==265?editAgentAddress.cityCode:'',
                        'shop.agentCounty':data.agentGradeId==265?editAgentAddress.areaCode:'',
                        'shop.address':data.address,
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                        return ret
                    }],
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response){
                    self.loading = false;
                    console.log(response)
                    self.$message({
                        message:response.data.msg,
                        type:'success'
                    })
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000)
                }).catch(function(err){
                    self.loading = false;
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    @import url('../assets/less/storeManage.less');
</style>
<style>
    .cancel-button {
        float: right;
        margin: 0 0 10px 10px!important;
    }
    
    .confirm-button {
        float: right;
    }
</style>

