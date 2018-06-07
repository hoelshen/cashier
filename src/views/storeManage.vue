<template>
    <div class="content">
        <!-- 搜索 start -->
        <div class="searchwrap">
            <el-form ref="form" label-width="100px" :model="searchData">
                <el-row :gutter="20" class="searchbar">
                    <el-col :span="7">
                        <el-form-item label="注册店铺名：">
                            <el-input v-model="searchData.shopName" @keyup.enter.native="onSubmit" placeholder="注册店铺名"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7">
                        <el-form-item label="代理商姓名："> 
                            <el-input v-model="searchData.name" @keyup.enter.native="onSubmit" placeholder="代理商姓名"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7">
                        <el-form-item label="状态：" >
                            <el-select v-model="searchData.state" placeholder="请选择" clearable>
                                <el-option v-for="item in stateArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                            
                        </el-form-item>
                    </el-col>  

                  
                </el-row>
                <el-row :gutter="20" >
                    <el-col :span="7">
                        <el-form-item label="运营人员：">
                            <el-input v-model="searchData.operator" @keyup.enter.native="onSubmit" placeholder="运营人员"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="7">
                        <el-form-item label="业务人员：">
                            <el-input v-model="searchData.salesMan" @keyup.enter.native="onSubmit" placeholder="业务人员"></el-input>
                        </el-form-item>
                    </el-col>

                      <el-col :span="7">
                        <el-form-item label="代理商等级：" style="padding:0 3px 0 0">
                            <el-select v-model="searchData.agentLevelIds" multiple placeholder="代理商等级" clearable>
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row :gutter="20" >

                  
                    <el-col :span="7">
                        <el-form-item label="注册时间：">
                            <el-date-picker v-model="searchData.signTime" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                                                          
                    <el-col :span="14">                       
                        <el-form-item label="归属区域：" >                                 
                            <addressComponent  ref='addAddress' :isShow="true" :isDetail="false"  />
                        </el-form-item>
                    </el-col>
                     <el-col :span="3">
                            <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 搜索 end -->
        <!-- 表格 start -->
        <div class="t-bodywrap">
            <el-row class="t-body">
                	<el-button type="primary" class="add-btn el-icon-plus" @click="$router.push('/storeAdd')">新增店铺</el-button>
                    <el-button type="primary"  @click="allOutputExcel()">年度目标进度导出</el-button>
                <el-row class="tablebar">
                    <el-table :data="myData" border v-loading.fullscreen.lock="loading" highlight-current-row style="width: 100%" @sort-change='sortAmount'>
                        <el-table-column prop="shopNo" label="代理商编号" width="115">
                            <template slot-scope="scope">
                                <span>{{scope.row.shopNo}}</span>
                                <span class="type-icon" v-if="scope.row.shopType=='SELF_SUPPORT'">直营</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="190">
                        </el-table-column>
                        <el-table-column title="shopName" prop="shopName" label="店铺名称" width="190">
                            <template slot-scope="scope">
                                <span class="limit-two" :title="scope.row.shopName">{{scope.row.shopName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="agentGradeId" label="代理商等级" width="160">
                            <template slot-scope="scope">
                                <span v-if="scope.row.agentGradeId==31">单店代理</span>
                                <span v-if="scope.row.agentGradeId==265">区域代理</span>
                                <span v-if="scope.row.agentGradeId==266">微店代理</span>
                                <p class="textOrange" v-if="myData[scope.$index].areaClass == 'S' ">S类</p>
                                <p class="textRed" v-if="myData[scope.$index].areaClass == 'A' ">A类</p>
                                <p class="textGreen" v-if="myData[scope.$index].areaClass  == 'B'">B类</p>
                                <p class="textPurple" v-if="myData[scope.$index].areaClass  == 'C' ">C类</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="depositAmount" label="预存款余额" align="right" sortable="custom" min-width="100" width="150">
                        </el-table-column>
                        <el-table-column prop="signTime" label="注册时间" width='200'>
                        </el-table-column>
                        <el-table-column prop="state" label="状态" width='150'  >
                            <template slot-scope="scope" >
                                <p>
                                    <span v-if="scope.row.state==0" style="margin-left:-15px">
                                        <span class="green-color"></span>启用</span>
                                    <span v-if="scope.row.state==1" style="margin-left:-15px" >
                                        <span class="red-color" ></span>禁用</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column   prop="remainDay" label="剩余天数" width="150" sortable="custom" >
                            <template slot-scope="scope">
                                    <span v-if="scope.row.isParticipateRebate" >{{scope.row.remainDay}}</span>
                                    <span v-if="!scope.row.isParticipateRebate" >-</span>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="goalCompletion" label="目标完成" width="100">
                            <template slot-scope="scope" >
                                <span v-if="scope.row.shopType!='SELF_SUPPORT' && ( (scope.row.agentGradeId==31 || scope.row.agentGradeId==266 )  && !scope.row.annualPurchasePerformance)">
                                     -
                                </span>
                                <span v-if="scope.row.shopType!='SELF_SUPPORT' && ( (scope.row.agentGradeId==31 || scope.row.agentGradeId==266 ) && scope.row.annualPurchasePerformance)">
                                     {{  (scope.row.goalCompletion * 100).toFixed(2) }}%
                                </span>
                                <span v-if=" scope.row.shopType!='SELF_SUPPORT' && 
                                            (scope.row.agentGradeId ==265 &&
                                             (scope.row.annualPurchasePerformance!=0 || 
                                             scope.row.annualExtendPerformance!=0 )
                                            )"> 
                                     {{ (scope.row.goalCompletion * 100).toFixed(2) }}%
                                </span>
                                <span v-if=" scope.row.shopType!='SELF_SUPPORT' && 
                                            (scope.row.agentGradeId ==265 &&
                                             (scope.row.annualPurchasePerformance==0 && 
                                             scope.row.annualExtendPerformance==0 )
                                            )">-
                                </span>
                                <span v-if="scope.row.shopType!='AGENT'">-</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operator" label="运营人员" width="100">
                        </el-table-column>
                        <el-table-column prop="salesMan" label="业务人员" width="100">
                        </el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
                                <p class="operation">
                                    <span v-if="scope.row.state==1" @click="updateAgentState(scope.row)">启用</span>
                                    <span v-if="scope.row.state==0" @click="updateAgentState(scope.row)">禁用</span>
                                    <span> <router-link class="router-link-active" :to="{ name: 'storeDetail', params: { shopNo: scope.row.id}}">详情</router-link></span>
                                    <span @click='chengPre(scope.row.id,scope.row.shopName,scope.row.shopNo)' style="flex:none" >预存款变更</span>
                                    <span v-if="scope.row.state==0"> <router-link class="router-link-active" :to="{ name: 'storeEdit', params: { shopNo: scope.row.id}}">修改</router-link></span>
                                </p>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <div class="plPage clearfix">
                    <el-pagination @current-change="handleCurrentChange" 
                                :current-page="currentPage" 
                                :page-size="pageSize"
                                :total="totalSize" 
                                layout="total, prev, pager, next, jumper" >
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <!-- 表格 end -->   
        <!-- 预存款变更弹窗 start -->
            <el-dialog :title="changeTitle" :visible.sync="dialogFormVisible" size="tiny" @close="resetForm">
                <el-form   :model="changeForm">
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
                                <el-select v-model="changeForm.changeType" clearable placeholder="请选择" style="width:257px;" @click.native="selectIsFirstBatchMoney">
                                    <el-option label="充值" value="TOP_UP" ></el-option>
                                    <el-option label="扣款" value="DEDUCTIONS" ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  v-if="changeForm.changeType==='TOP_UP'" label="首批进货款：">
                                  <el-radio v-model="changeForm.isFirstBatchMoney" label="1" value="1" @click.native="changRemarkTrue">是</el-radio>
                                  <el-radio v-model="changeForm.isFirstBatchMoney" label="0" value="0"  @click.native="changRemarkFalse">否</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row >
                        <el-col :span="22"   >
                            <el-form-item label="变动金额：" label-width="100px">  
                                <el-input v-model="changeForm.alterMoney" placeholder="变动金额"  >
                                 <template slot="prepend" v-if="changeForm.changeType === 'TOP_UP'">➕</template>    
                                 <template slot="prepend" v-if="changeForm.changeType === 'DEDUCTIONS'">➖</template>                                     
                                 </el-input>
                                <p class="yuan">元</p>
                            </el-form-item>              
                        </el-col>                  
                    </el-row>

                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="备注说明：" label-width="100px">
                                <el-input v-model="changeForm.remark" ></el-input>
                                <p class="triangle"></p>
                                <p class="msg">备注修改的原因，不超过50个中文字符</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="changeCancle">取 消</el-button>
                    <el-button type="primary" @click="onChange">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 预存款变更弹窗 end -->  
    </div>
</template>

<script>
import Utils from '../components/tools/Utils';
import addressComponent from '../components/address.vue';
import axios from 'axios';

import $ from 'jquery';
export default {
    data() {
        return {
            currentPage: 1,
            totalSize: 0,
            pageSize: 30,
            user: '',
            searchData: {
                shopName: '',
                phone: '',
                name: '',
                state: '',
                signTime: [],
                agentLevelIds: [],
                operator: '',
                salesMan: '',
                operatorId: '',
                salesManId: '', 
				searchId: '',			//代理商编号
				searchStatus: '',		//订单状态
				searchTime: '',			//下单时间
				searchLevel: [],		//代理商等级
				Level: [],			   //代理商等级替代
				searchName:'',        //代理商姓名
                operator:"" ,         //运营人员
                belongProvince:'',    //省
                belongCity:'',        //市
                belongCountry:''        //区
            },
            myData: [],
            levelArray: [], //代理商等级数组
            stateArray: [{
                index: 0,
                name: '启用'
            },
            {
                index: 1,
                name: '禁用'
            },
            ],
            loading: false,
            //日期选择器
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            addDialogVisible: false,
            editDialogVisible: false,
            dialogFormVisible: false,
            changeTitle: '',
            changeForm: {
                changeShopId: '',
                changeShopName: '',
                changeType: '',
                alterMoney: '',
                remark: '',
                salesMan: '',
                operator: '',
                salesManId: '',
                operatorId: '',
                isFirstBatchMoney:'0',
            },
            editFormTitle: '',
            isDisable: false,
            order: '', //预存款排序
            phoneLength: 11
        }
    },
    components: {
        addressComponent
    },
    created() {
        const self = this;
        if (!self.checkSession()) return;
        self.loading = true;
        

        //获取代理商等级列表
        self.$ajax.post('/api/http/shop/queryAgentGradeList.jhtml', {}).then(function (response) {
            // console.log(response);
            if (response.data.success == 1) {
                self.levelArray = response.data.result
            } else {
                self.$message({
                    message: response.data.msg,
                    type: 'error'
                })
            }
        }).catch(function (err) {
            console.log(err);
        });
        //获取列表数据
        self.$ajax.get('/api/shop/ShopManage/search.jhtml', {
            params: {
                'pager.pageIndex': self.currentPage,
                'pager.pageSize': self.pageSize
            }
        }).then(function (response) {
            self.loading = false;
            // console.log(response.data)
            self.myData = response.data.rows;

            // console.log(self.myData)
            
            for (var value of self.myData) {
                if(!value.areaClass){
                    value.areaClass ==''  
                }else{
                    //  console.log((value.areaClass).toLocaleLowerCase())       
                     value.areaClass =  value.areaClass
                }
            }                                           
            self.totalSize = response.data.total
        }).catch(function (err) {
            self.loading = false;
            console.log(err);
        });

    },
    methods: {
        //判断是否超时
        checkSession() {
            const self = this;
            if (window.sessionStorage) {
                let nowDate = new Date().getTime();
                let time = (nowDate - sessionStorage.haha) / 1000
                //超过30秒没操作，重新登录
                if (time > 1800) {
                    self.$router.push('/login');
                    self.$message({
                        message: '登录超时，请重新登录',
                    })
                    return false;
                } else {
                    sessionStorage.haha = nowDate;
                    return true;
                }
            }
        },
        //确定预存款变更
        onChange() {
            if (sessionStorage.user) {
                this.user = JSON.parse(sessionStorage.user);
                // console.log(this.user);
            }
            const self = this;
            if (!self.checkSession()) return;
            if (!self.changeForm.changeType) {
                self.$message({
                    message: "请选择一个变动类型！",
                    type: 'error'
                })
                return;
            }
            if (!self.changeForm.alterMoney) {
                self.$message({
                    message: "变动金额不能为空！",
                    type: 'error'
                })
                return;
            }
            if (!/^[0-9]*\.*[0-9]{1,2}$/.test(self.changeForm.alterMoney)) {
                self.$message({
                    message: "变动金额只能为正数，且小数位不能超过两位！",
                    type: 'error'
                })
                return;
            }
            if (self.changeForm.remark.length > 50) {
                self.$message({
                    message: "备注长度不得超过50个字符！",
                    type: 'error'
                })
                return;
            }
            self.loading = true;
            self.$ajax({
                url: '/api/shop/shopManage/updateDepositAmount.jhtml',
                method: 'post',
                data: {
                    'advanceDeposit.shopId': self.changeForm.changeShopId,
                    'advanceDeposit.shopName': self.changeForm.changeShopName,
                    'advanceDeposit.changeType': self.changeForm.changeType,
                    'advanceDeposit.alterMoney': self.changeForm.alterMoney,
                    'advanceDeposit.remark': self.changeForm.remark,
                    'advanceDeposit.creatorId': self.user.id,
                    'advanceDeposit.updatorId': self.user.id,
                    'advanceDeposit.isBackground': 1,
                    'advanceDeposit.isFirstBatchMoney':self.changeForm.isFirstBatchMoney ||'',
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
            }).then(function (response) {
                self.loading = false;
                // console.log(response)
                if (response.data.result === 1) {
                    if (window.sessionStorage) {
                        self.$message({
                            message: response.data.msg,
                            type: 'success'
                        })
                        self.dialogFormVisible = false;
                        setTimeout(function () {
                            self.handleCurrentChange(self.currentPage);
                        }, 1000)
                    }
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            }).catch(function (error) {

            });
            self.dialogFormVisible = false;
        },
        //打开预存款弹窗
        chengPre(id, shopName, shopNo) {
            if (!this.checkSession()) return;
            this.changeForm.changeShopId = id;
            this.changeForm.changeShopName = shopName;
            this.changeTitle = "编辑代理商店铺（编号：" + shopNo + "）"
            this.dialogFormVisible = true; 
            this.changeForm.isFirstBatchMoney = '0';   
        },
        //预存款清空
        changeCancle() {
            this.dialogFormVisible = false;
            this.changeForm.changeType = '';
            this.changeForm.alterMoney = '';
            this.changeForm.remark = '';
            this.changeForm.isFirstBatchMoney = '0';
        },
        //
        //查询
        onSubmit: function () {
            const self = this;
            if (!self.checkSession()) return;
            self.currentPage = 1;
            //清除排序
            self.order = '';
            $(".ascending.is-leaf").removeClass("ascending");
            $(".descending.is-leaf").removeClass("descending");
            let addAddress = self.$refs.addAddress.getData();
            self.loading = true;
            self.$ajax.get('/api/shop/ShopManage/search.jhtml', {
                params: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                    'shop.shopName': self.searchData.shopName,
                    'shop.phone': self.searchData.phone,
                    'shop.name': self.searchData.name,
                    'shop.startTime': self.searchData.signTime && self.searchData.signTime[0] ? Utils.formatDayDate(this.searchData.signTime[0]) : '',
                    'shop.endTime': self.searchData.signTime && self.searchData.signTime[1] ? Utils.formatDayDate(this.searchData.signTime[1]) : '',
                    'shop.state': self.searchData.state,
                    'shop.agentGradeIds': self.searchData.agentLevelIds.join(','),
                    // 'shop.sort': 'depositAmount',
                    'shop.order': self.order,
                    'shop.operator': self.searchData.operator,
                    'shop.salesMan': self.searchData.salesMan,
                    'shop.belongProvince':addAddress.provinceCode , // 省份
                    'shop.belongCity':addAddress.cityCode, // 城市                    
                    'shop.belongCountry':addAddress.areaCode,  //区域

                }
            }).then(function (response) {
                // console.log(response);                
                self.loading = false;
                self.myData = response.data.rows;
                // console.log(self.myData)
                self.totalSize = response.data.total;
            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });
        },
        //改变当前页
        handleCurrentChange: function (val) {
            const self = this;
            if (!self.checkSession()) return;
            self.currentPage = val;
            self.loading = true;
            self.$ajax.get('/api/shop/ShopManage/search.jhtml', {
                params: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                    'shop.shopName': self.searchData.shopName,
                    'shop.phone': self.searchData.phone,
                    'shop.name': self.searchData.name,
                    'shop.startTime': self.searchData.signTime && self.searchData.signTime[0] ? Utils.formatDayDate(this.searchData.signTime[0]) : '',
                    'shop.endTime': self.searchData.signTime && self.searchData.signTime[1] ? Utils.formatDayDate(this.searchData.signTime[1]) : '',
                    'shop.state': self.searchData.state,
                    'shop.agentGradeIds': self.searchData.agentLevelIds.join(','),
                    'shop.sort': 'depositAmount',
                    'shop.order': self.order,
                    'shop.operator': self.searchData.operator,
                    'shop.salesMan': self.searchData.salesMan,
                    'shop.salesManId': this.salesManId,
                    'shop.salesManId': this.salesManId,
                }
            }).then(function (response) {
                self.loading = false;
                self.myData = response.data.rows;
                self.totalSize = response.data.total
                // console.log(response);
            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });
        },
        //排序
        sortAmount(row, column) {
            // console.log(row);
            // 预存款余额
            if(row.prop == 'depositAmount'){
                    const self = this;
                    // console.log(row.order)
                    if (row.order === 'ascending') {
                        self.order = 'asc';
                    } else if (row.order === 'descending') {
                        self.order = 'desc';
                    } else {
                        self.order = '';
                    }
                    if (!self.checkSession()) return;
                    self.loading = true;
                    self.$ajax.get('/api/shop/ShopManage/search.jhtml', {
                        params: {
                            'pager.pageIndex': self.currentPage,
                            'pager.pageSize': self.pageSize,
                            // 'shop.shopName': self.searchData.shopName,
                            // 'shop.phone': self.searchData.phone,
                            // 'shop.name': self.searchData.name,
                            // 'shop.startTime': self.searchData.signTime && self.searchData.signTime[0] ? Utils.formatDayDate(this.searchData.signTime[0]) : '',
                            // 'shop.endTime': self.searchData.signTime && self.searchData.signTime[1] ? Utils.formatDayDate(this.searchData.signTime[1]) : '',
                            // 'shop.state': self.searchData.state,
                            // 'shop.agentGradeIds': self.searchData.agentLevelIds.join(','),
                            'shop.sort': 'depositAmount',
                            'shop.order': self.order,
                            // 'shop.operator': self.searchData.operator,
                            // 'shop.salesMan': self.searchData.salesMan,
                        }
                    }).then(function (response) {
                        self.loading = false;
                        self.myData = response.data.rows;
                        self.totalSize = response.data.total
                        console.log(self.myData)
                        // console.log(response);
                    }).catch(function (err) {
                        self.loading = false;
                        console.log(err);
                    });

            }

            //剩余天数
            if(row.prop == 'remainDay'){
                // console.log('ok')
                const self = this;
                // console.log(row.order)
                if (row.order === 'ascending') {
                    self.order = 'asc';
                } else if (row.order === 'descending') {
                    self.order = 'desc';
                } else {
                    self.order = '';
                }
                if (!self.checkSession()) return;
                self.loading = true;
                self.$ajax.get('/api/shop/ShopManage/search.jhtml', {
                    params: {
                        'pager.pageIndex': self.currentPage,
                        'pager.pageSize': self.pageSize,
                        // 'shop.shopName': self.searchData.shopName,
                        // 'shop.phone': self.searchData.phone,
                        // 'shop.name': self.searchData.name,
                        // 'shop.startTime': self.searchData.signTime && self.searchData.signTime[0] ? Utils.formatDayDate(this.searchData.signTime[0]) : '',
                        // 'shop.endTime': self.searchData.signTime && self.searchData.signTime[1] ? Utils.formatDayDate(this.searchData.signTime[1]) : '',
                        // 'shop.state': self.searchData.state,
                        // 'shop.agentGradeIds': self.searchData.agentLevelIds.join(','),
                        'shop.sort': 'remainDay',
                        'shop.order': self.order,
                        // 'shop.operator': self.searchData.operator,
                        // 'shop.salesMan': self.searchData.salesMan,
                    }
                }).then(function (response) {
                    self.loading = false;
                    self.myData = response.data.rows;
                    self.totalSize = response.data.total
                    console.log(self.myData);
                    // console.log(response);
                }).catch(function (err) {
                    self.loading = false;
                    console.log(err);
                });
            }
            
        },
        //用户列表
        operatorQuerySearchAsync(queryString, callback) {
    

            if(this.editForm.operator == queryString){

               this.editForm.operator2 = false;

                
            }

            
            queryString = !this.editForm.operator2 ? '' : queryString;
            this.editForm.operator2 = true;


            var list = [{}];
            //调用的后台接口
            let url = '/api/shop/shopManage/searchSysUser.jhtml?userUnit=operator' + '&userName=' + queryString;
            //从后台获取到对象数组
            axios.get(url).then((response) => {
                //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                for (let i of response.data.result) {
                    i.value = i.userName;  //将CUSTOMER_NAME作为value
                }

                if (!queryString) {
                    // console.log(response.data.result)

                    for (let item of response.data.result) {
                        list.push(item)
                    }

                    callback(list);

                } else {

                    let QS = queryString.toLocaleLowerCase();

                    for (let item of response.data.result) {
                        if (item.pinyin.indexOf(QS) > -1 || item.userName.indexOf(QS) > -1) {
                            list.push(item)
                        }
                    }
                    // console.log(list);
                    if (list.length == 1) {
                        list.push({ value: `没有匹配结果"${queryString}"` });
                    }
                }
                callback(list);
            }).catch((error) => {
                console.log(error);
            });
        },
        salesManQuerySearchAsync(queryString, callback) {

            if(this.editForm.salesMan == queryString){


            this.editForm.salesMan2 = false;
  
            }
        
        
        
            queryString = !this.editForm.salesMan2 ? '' : queryString;
         
          
            this.editForm.salesMan2 = true;

            var list = [{}];
            //调用的后台接口
            let url = '/api/shop/shopManage/searchSysUser.jhtml?userUnit=businessMan' + '&userName=' + queryString;
            //从后台获取到对象数组
            axios.get(url).then((response) => {
                //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                for (let i of response.data.result) {
                    i.value = i.userName;  //将CUSTOMER_NAME作为value
                }


                if (!queryString) {
                    // console.log(response.data.result)

                    for (let item of response.data.result) {
                        list.push(item)
                    }

                    callback(list);

                } else {

                    let QS = queryString.toLocaleLowerCase();

                    for (let item of response.data.result) {
                        if (item.pinyin.indexOf(QS) > -1 || item.userName.indexOf(QS) > -1 || item.headPinyin.indexOf(QS) > -1) {
                            list.push(item)
                        }
                    }
                    if (list.length == 1) {
                        list.push({ value: `没有匹配结果"${queryString}"` });
                    }
                }


                callback(list);
            }).catch((error) => {
                console.log(error);
            });
        },
        //点击选中
        handleoperatorSelect(item) {
            this.operatorId = item.id;

            this.editForm.operator  = item.userName;

            this.editForm.operator2  = false;
        
            //do something
        },
        handlesalesManSelect(item) {
            this.salesManId = item.id;

            this.editForm.salesMan =  item.userName;
            
            this.editForm.salesMan2  = false;
 
            //do something
        },
        // 获取选中店铺信息
        getInfoById(id) {
            const self = this;
            if (!self.checkSession()) return;
            self.loading = true;
            self.$ajax.get('/api/http/shop/searchShop.jhtml', {
                params: {
                    'shopId': id,
                }
            }).then(function (response) {
                self.loading = false;
                self.editForm = response.data.result;
                self.operatorId = response.data.result.operatorId;
                self.salesManId = response.data.result.salesManId;
            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });
        },
        selectIsFirstBatchMoney(){
            this.isFirstBatchMoney='0';
        },
        //修改代理商状态
        updateAgentState(data) {
            const self = this;
            if (!self.checkSession()) return;
            const h = self.$createElement;
            const stateCN = data.state == 0 ? '禁用' : '启用';
            self.$msgbox({
                title: stateCN + '店铺？',
                message: h('div', {
                    style: 'padding:10px'
                }, [

                        h('div', {
                            style: 'padding:5px;display:flex'
                        }, [
                                h('div', {
                                    style: 'flex:1'
                                }, [
                                        h('span', null, '代理商姓名：'),
                                        h('span', {
                                            style: 'color:red'
                                        }, data.name)
                                    ]),
                                h('div', null, [
                                    h('span', null, '代理商手机：'),
                                    h('span', {
                                        style: 'color:red'
                                    }, data.phone)
                                ])

                            ]),
                        h('div', {
                            style: 'padding:5px'
                        }, [
                                h('span', {
                                    style: 'padding-left:14px'
                                }, '店铺名称：'),
                                h('span', {
                                    style: 'color:red'
                                }, data.shopName),
                            ]),
                        h('div', {
                            style: 'padding:5px;margin-top: 20px;'
                        }, data.state == 0 ? '一旦禁用店铺后：' : '启用店铺后'),
                        h('div', {
                            style: 'padding-left:19px'
                        }, data.state == 0 ? '1.门店将无法使用系统' : '1.门店将可继续使用系统'),
                        h('div', {
                            style: 'padding-left:19px'
                        }, data.state == 0 ? '2.店铺绑定的微信分销账号会被置为普通会员分组(绑定关系不变)' : '2.店铺绑定的微信分销账号会被置为代理商分组(绑定关系不变)'),
                        h('div', {
                            style: 'padding-left:19px'
                        }, data.state == 0 ? '3.店铺地址将不会展示到醉品平台' : '3.如果设置了显示到平台，则店铺地址将会展示到醉品平台'),
                        h('div', {
                            style: 'padding:0 5px;margin-top: 15px;'
                        }, '请谨慎操作。'),
                    ]),
                showCancelButton: true,
                confirmButtonText: stateCN,
                cancelButtonText: '取消',
                cancelButtonClass: 'cancel-button',
                confirmButtonClass: data.state == 0 ? 'forbidden-button' : ''
            }).then(action => {
                self.loading = true;
                self.$ajax({
                    url: '/api/shop/shopManage/updateState.jhtml',
                    method: 'post',
                    data: {
                        'shop.id': data.id,
                        'shop.state': data.state == 0 ? 1 : 0
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
                }).then(function (response) {
                    self.loading = false;
                    if (response.data.success == 1) {
                        self.$message({
                            message: '编号：' + data.shopNo + ' ' + stateCN + '成功',
                            type: 'success'
                        })
                        setTimeout(function () {
                            self.handleCurrentChange(self.currentPage);
                        }, 1000)
                    } else {
                        self.$message({
                            message: response.data.msg,
                            type: 'error'
                        })
                    }
                }).catch(function (err) {
                    self.loading = false;
                });

            });
        },
        // 导出全部明细
        allOutputExcel() {
          let self  = this;
          self.outputExcel()
        },
        getData(obj){
            const self = this;
            obj.method = obj.method || 'get';
            obj.url = obj.url || '';
            obj.data = obj.data  || {};
            obj.code = obj.code || function () {};
            obj.fail = obj.fail || function () {};
            obj.error = obj.error || function () {};
            if (obj.method === 'get') {
                var str = '?';
                for(var item in obj.data){
                    if (obj.data[item] != '' && obj.data[item] != undefined) {
                        str  += item + '=' + obj.data[item] + '&';
                    }
                }
                str = str.substring(0,str.length-1);
                obj.url = obj.url+str;
                self.$ajax({
                    method: 'get',
                    url: `api/${obj.url}`
                }).then(function(response){
                    if(response.data.code === 1){
                        obj.success.call(self,response);
                    }else{
                        // console.log(response);
                        obj.fail.call(self,response);
                    }
                }).catch(function(error){
                    obj.error.call(self,error);
                });
            }
        },
        formatJson(filterVal, jsonData) {
            //     ----> 格式化json
            //     console.log(jsonData)
                return jsonData.map(v => {
            // 	   console.log(v)
                    return filterVal.map(j => {
                    //   console.log(j,v[j])
                            if(j === "agentGradeId" ){
                                 return v[j] =     ( v[j] == 31 ?  "单店" : ( v[j] == 265 ? "区域" : "微店")  )  ;
                            }
                            if(j === 'remark'){
                                 return v[j] =     ( v[j] == 0 ?  "达标" : ( v[j] == 1 ? "未达标" : "无上年度业绩")  )  ;
                            }
                            if(j === 'annualExtendPerformance'){
                                 return v[j] =     ( v[j] == undefined ?  "-" : ( v[j])  )  ;
                            }
                            if(j === 'annualAreadyExtendPerformance'){
                                 return v[j] =     ( v[j] == undefined ?  "-" : ( v[j])  )  ;
                            }
                            if(j === 'annualExtendPerformanceSchedule'){
                                 return v[j] =     ( v[j] == undefined ?  "-" : ( v[j])  )  ;
                            }
                            if(j === 'annualPurchasePerformance'){
                                 return v[j] =     ( v[j] == undefined ?  "-" : ( v[j])  )  ;
                            }
                            if(j === 'annualAreadyPurchasePerformance'){
                                 return v[j] =     ( v[j] == undefined ?  "-" : ( v[j])  )  ;
                            }
                            if(j === 'aannualPurchasePerformanceSchedule'){
                                 return v[j] =     ( v[j] == undefined ?  "-" : ( v[j])  )  ;
                            }

                           return  v[j]  = v[j];
                    // }
                    })			
                })	

                
        },
        // 导出明细
		outputExcel() {
            if (!this.checkSession()) return;
                var temp = new Date(this.searchData.searchTime[0]);
                if (temp.getFullYear() > 2006) {
                    var time1 = temp.getFullYear();
                    if ((temp.getMonth() + 1) < 10) {
                        time1 = time1 + '-0' + (temp.getMonth() + 1);
                    } else {
                        time1 = time1 + '-' + (temp.getMonth() + 1);
                    }
                    if (temp.getDate() < 10) {
                        time1 = time1 + '-0' + temp.getDate();
                    } else {
                        time1 = time1 + '-' + temp.getDate();
                    }
                    console.log(time1);
                    temp = new Date(this.searchData.searchTime[1]);
                    var time2 = temp.getFullYear();
                    if ((temp.getMonth() + 1) < 10) {
                        time2 = time2 + '-0' + (temp.getMonth() + 1);
                    } else {
                        time2 = time2 + '-' + (temp.getMonth() + 1);
                    }
                    if (temp.getDate() < 10) {
                        time2 = time2 + '-0' + temp.getDate();
                    } else {
                        time2 = time2 + '-' + temp.getDate();
                    }
                    console.log(time2);
                } else {
                    var time1 = '';
                    var time2 = '';
                }
                if (this.searchData.searchLevel != '') {
                    this.searchData.level = this.searchData.searchLevel.join(',');
                } else {
                    this.searchData.level = '';
                }


                this.getData({
                    url: 'shop/ShopManage/search.jhtml',
                    data: {
                        'pager.pageSize':  this.totalSize ,

                    },
                    success(response) {                     
                        if (response.data.code === 1) {

                            self.tableData =  response.data.rows
                       
                            // console.log(self.tableData)
                            // console.log( (response.data.total == this.myData.length)  )
                               

                                // console.log(self.tableData);
                                if(self.tableData.length>0){
                                            require.ensure([], () => {
                                                const {	export_json_to_excel } = require('../components/tools/Export2Excel2')                                                
                                                const tHeader =['代理商编号', '代理商等级', '代理商姓名', '年度店铺拓展目标',
                                                                 '已完成', '进度', '年度进货业绩目标', '已完成', '进度',
                                                                 '剩余时间','备注', ]
                                                const filterVal =['shopNo', 'agentGradeId', 'shopName', 'annualExtendPerformance', 
                                                                    'annualAreadyExtendPerformance', 'annualExtendPerformanceSchedule', 'annualPurchasePerformance', 'annualAreadyPurchasePerformance', 'aannualPurchasePerformanceSchedule',
                                                                    'remainDay', 'remark',]
                                                const list = self.tableData;
                                                const data = this.formatJson(filterVal, list);
                                                export_json_to_excel(tHeader, data, '代理商'  +'年度目标完成进度');
                                            })
                                }else{
                                    self.$message({
                                        message: '订单暂无明细',
                                        type: 'error'
                                    })
                                }
                            } else {
                                self.$message({
                                    message: response.data.msg,
                                    type: 'error'
                                })
                            }
                    },
                    fail(response) {
                        alert('ok')
                        this.$message({
                            message: response.data.msg,
                            type: 'error'
                        })
                    },
                    error(response) {
                        this.$message({
                            message: response.data.msg,
                            type: 'error'
                        })
                    }
                });
		},
        //重置新增表格内容
        resetAddForm() {
            const self = this;
            self.$refs.addAddress.reset();
            
            self.addForm = {
                shopName: '',
                name: '',
                phone: '',
                signedTime: '',
                agentGradeId: '',
                agentProvince: '',
                agentCity: '',
                agentCounty: '',
                address: '',
                shopType: 'AGENT',
                isShow: '1',
                operator: '',
                salesMan: '',
                salesManId: '',
                operatorId: '',
                addAddress:'',
                provinceCode: '',
                cityCode: '',
                countyCode: '',
                areaCode:'',
                areaClass:'',
            }
        },
        //重置修改表格内容
        resetEditForm() {
            const self = this;
            self.editForm = {
                id: '',
                shopName: '',
                name: '',
                phone: '',
                signedTime: '',
                agentGradeId: '',
                provinceCode: '',
                areaCode:'',
                cityCode: '',
                countyCode: '',
                city:'',
                county:'',
                province:'',
                agentProvince: '',
                agentCity: '',
                agentCounty: '',
                address: '',
                operator: '',
                salesMan: '',
                salesManId: '',
                operatorId: '',
                areaClass:'',
            }

        },
        //重置预存款表格内容
        resetForm() {
            const self = this;
            self.changeForm.changeType = '';
            self.changeForm.alterMoney = '';
            self.changeForm.remark = '';
        },
        changRemarkTrue(){
           this.changeForm.remark='代理商首批进货款' ;
        },
        changRemarkFalse(){
           this.changeForm.remark='' ;
        }
    },
    computed:{
        
    }
}
</script>
<style lang="css" scoped>
.address-wrap >>> .address-select{
        width: 25%
}

</style>

<style lang="less" scoped>
@import url("../assets/less/storeManage.less");  
.last_time {
    position: fixed;
    top: 72%;
    left: 60%;
}
.el-message-box {
    width: 500px;
}

.el-message-box__btns {
    text-align: left;
    padding-left: 343px;
}

.forbidden-button {
    background-color: #fe5500;
    border-color: #fe5500;
}

.forbidden-button:hover {
    background-color: #fe5500;
    opacity: 0.7;
    border-color: #fe5500;
}

.forbidden-button:active {
    background-color: #fe5500;
    border-color: #fe5500;
}

.el-message-box__header {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.el-message-box__content {
    padding: 0px 20px 30px;
}
.delete_addressComponent {
        background: url("../assets/images/zph_close.jpg") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 164px;
        z-index: 1000;
    }
.search-yw-wrap {
    position: relative;
}

.search-yy-wrap {
    position: relative;
}
.xg-search-yw-wrap {
    position: relative;
}
.xg-search-yy-wrap {
    position: relative;
}
.xg-search-yy-wrap .delete_left {
    background: url("../assets/images/zph_close.jpg") no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 171px;
    z-index: 1000;
}
.xg-search-yw-wrap .delete_right {
    background: url("../assets/images/zph_close.jpg") no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 171px;
    z-index: 1000;
}
.router-link-active { 
   color: #1990ff;
}
</style>
