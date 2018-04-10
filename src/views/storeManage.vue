<template>
    <div class="content">
        <!-- 搜索 start -->
        <div class="searchwrap">
            <el-form ref="form" label-width="100px" :model="searchData">
                <el-row :gutter="5" class="searchbar">
                    <el-col :span="6">
                        <el-form-item label="注册店铺名：">
                            <el-input v-model="searchData.shopName" @keyup.enter.native="onSubmit" placeholder="注册店铺名"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="代理商姓名：">
                            <el-input v-model="searchData.name" @keyup.enter.native="onSubmit" placeholder="代理商姓名"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="状态：">
                            <el-select v-model="searchData.state" placeholder="请选择" clearable>
                                <el-option v-for="item in stateArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="代理商等级：" style="padding:0 3px 0 0">
                            <el-select v-model="searchData.agentLevelIds" multiple placeholder="代理商等级" clearable>
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="运营人员：">
                            <el-input v-model="searchData.operator" @keyup.enter.native="onSubmit" placeholder="运营人员"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="业务人员：">
                            <el-input v-model="searchData.salesMan" @keyup.enter.native="onSubmit" placeholder="业务人员"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">

                        <el-form-item label="注册时间：">
                            <el-date-picker v-model="searchData.signTime" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" style="text-align: center;padding-left:10%">
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
                    <el-table :data="myData" border v-loading.fullscreen.lock="loading" highlight-current-row style="width: 100%" @sort-change='sortAmount'>
                        <el-table-column prop="shopNo" label="代理商编号" width="115">
                            <template slot-scope="scope">
                                <span>{{scope.row.shopNo}}</span>
                                <span class="type-icon" v-if="scope.row.shopType=='SELF_SUPPORT'">直营</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column title="shopName" prop="shopName" label="店铺名称" width="200">
                            <template slot-scope="scope">
                                <span class="limit-two" :title="scope.row.shopName">{{scope.row.shopName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="agentGradeId" label="代理商等级" width="110">
                            <template slot-scope="scope">
                                <span v-if="scope.row.agentGradeId==31">单店代理</span>
                                <span v-if="scope.row.agentGradeId==265">区域代理</span>
                                <span v-if="scope.row.agentGradeId==266">微店代理</span>
                                <span v-if="!scope.row.agentGradeId">-</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="depositAmount" label="预存款余额" align="right" sortable="custom" min-width="100" width="157">
                        </el-table-column>
                        <el-table-column prop="signTime" label="注册时间" width="110">
                        </el-table-column>
                        <el-table-column prop="state" label="状态">
                            <template slot-scope="scope">
                                <p>
                                    <span v-if="scope.row.state==0">
                                        <span class="green-color"></span>启用</span>
                                    <span v-if="scope.row.state==1">
                                        <span class="red-color"></span>禁用</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operator" label="运营人员" width="127">
                        </el-table-column>
                        <el-table-column prop="salesMan" label="业务人员" width="127">
                        </el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
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
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <!-- 表格 end -->
        <!-- 新增店铺弹窗 start -->
        <el-dialog title="新增店铺" :visible.sync="addDialogVisible" @close="resetAddForm">
            <el-form :model="addForm" label-width="120px" ref="addForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="店铺类型：">
                            <el-radio v-model="addForm.shopType" label="AGENT">代理商</el-radio>
                            <el-radio v-model="addForm.shopType" label="SELF_SUPPORT">直营店铺</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="展示选项：">
                            <el-radio v-model="addForm.isShow" label="1">展示</el-radio>
                            <el-radio v-model="addForm.isShow" label="0">不展示</el-radio>
                            <div class="mark">
                                是否展示到醉品线下M2O体验店
                            </div>
                        </el-form-item>
                    </el-col>
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
                            <el-input v-model="addForm.phone" :maxlength='phoneLength' placeholder="代理商手机"></el-input>
                            <div class="mark">
                                代理商登录系统使用的账号
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同签约日期：">
                            <el-date-picker v-model="addForm.signedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="代理商等级：" v-show="addForm.shopType!='SELF_SUPPORT'">
                            <el-select v-model="addForm.agentGradeId" placeholder="代理商等级" clearable>
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-show="addForm.agentGradeId=='265'&&addForm.shopType!='SELF_SUPPORT'">
                        <el-form-item label="代理区域：">
                            <addressComponent ref='addAgentAddress' :isDetail="false" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="收件地址：">
                            <addressComponent ref='addAddress' :isDetail="false" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细地址：">
                            <el-input v-model="addForm.address" placeholder="详细地址"></el-input>
                            <div class="mark">
                                地址为店铺地址，会展示到醉品的线下门店展示平台
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col class="search-yy-wrap" :span="12">
                        <span class="delete_left" v-if="!(addForm.operator==='')" @click="deleteOperator"></span>

                        <el-form-item label="运营人员">
                            <!-- <span class="search_left" v-if="!(addForm.operator==='')" @click="searchOperator"></span>-->
                            <el-autocomplete v-model="addForm.operator" :fetch-suggestions="operatorQuerySearchAsync" @select="handleoperatorSelect" placeholder="请选择" icon="caret-bottom">
                                <span class="search_left"></span>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col class="search-yw-wrap" :span="12">
                        <span class="delete_right" v-if="!(addForm.salesMan==='')" @click="deleteSalesMan"></span>

                        <el-form-item label="业务人员">
                            <!-- <span class="search_left" v-if="!(addForm.operator==='')" @click="searchOperator"></span>-->
                            <el-autocomplete v-model="addForm.salesMan" :fetch-suggestions="salesManQuerySearchAsync" @select="handlesalesManSelect" placeholder="请选择" icon="caret-bottom">
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <!-- <el-input  v-if="!!addForm.operatorName" v-model="addForm.operatorName" style="left: 14.5%; top: 67%;position: fixed;width: 20%;" ></el-input> -->
                    <!-- <el-input  v-if="!!addForm.salesManName" v-model="addForm.salesManName" style="left: 62.5%; top: 67%;position: fixed;width: 20%;"></el-input>              -->
                    <!-- <span  class="deleteOperatorName_left"  v-if="!(addForm.operatorName==='')" @click="deleteOperatorName"></span> -->
                    <!-- <span  class="deleteSalesManName_right" v-if="!(addForm.salesManName==='')" @click="deleteSalesManName"></span> -->
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addAgent">确 定</el-button>
                <el-button @click="addDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 新增店铺弹窗 end -->

        <!-- 修改店铺及店铺详情弹窗 start -->
        <el-dialog :title="editFormTitle" :visible.sync="editDialogVisible" @close="resetEditForm">
            <el-form :model="editForm" label-width="120px" ref="editForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="店铺类型：">
                            <el-radio disabled v-model="editForm.shopType" label="AGENT">代理商</el-radio>
                            <el-radio disabled v-model="editForm.shopType" label="SELF_SUPPORT">直营店铺</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="展示选项：">
                            <el-radio :disabled="isDisable" v-model="editForm.isShow" :label="1">展示</el-radio>
                            <el-radio :disabled="isDisable" v-model="editForm.isShow" :label="0">不展示</el-radio>
                            <div class="mark">
                                是否展示到醉品线下M2O体验店
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="代理商手机：">
                            <el-input v-model="editForm.phone" placeholder="代理商手机" :maxlength='phoneLength' :disabled="isDisable"></el-input>
                            <div class="mark">
                                代理商登录系统使用的账号
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同签约日期：">
                            <el-date-picker v-model="editForm.signedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions" disabled>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="代理商等级：" v-show="editForm.shopType!='SELF_SUPPORT'">
                            <el-select v-model="editForm.agentGradeId" placeholder="代理商等级" clearable :disabled="isDisable">
                                <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24" v-if="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                        <el-form-item label="代理区域：">
                            <addressComponent :provinceCode="editForm.agentProvince" :cityCode="editForm.agentCity" :areaCode="editForm.agentCounty" ref='editAgentAddress' :isDetail="false" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="收件地址：">
                            <addressComponent :provinceCode="editForm.provinceCode" :cityCode="editForm.cityCode" :areaCode="editForm.countyCode" ref='editAddress' :isDetail="false" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细地址：">
                            <el-input v-model="editForm.address" placeholder="详细地址" :disabled="isDisable"></el-input>
                            <div class="mark">
                                地址为店铺地址，会展示到醉品的线下门店展示平台
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="isDisable">
                        <el-form-item label="预存款详情：">
                            <router-link :to="{ name: 'prepaidManage', params: { shopNo:editForm.shopNo }}">点击查看</router-link>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                    <el-form-item label="运营人员">
                    <el-input v-model="editForm.operator" placeholder="运营人员" :disabled="isDisable"></el-input>                   
                    </el-form-item>  
                </el-col>
                <el-col :span="12">
                    <el-form-item label="业务人员">
                        <el-input v-model="editForm.salesMan" placeholder="  sds " :disabled="isDisable"></el-input>
                    </el-form-item>
                </el-col>  -->
                    <el-col class="xg-search-yy-wrap" :span="12">
                        <el-form-item label="运营人员">
                            <span class="delete_left" v-if="!(editForm.operator==='')" @click="deleteOperator"></span>
                            <!-- <span class="search_left" v-if="!(addForm.operator==='')" @click="searchOperator"></span>-->
                            <el-autocomplete v-model="editForm.operator" :fetch-suggestions="operatorQuerySearchAsync" @select="handleoperatorSelect" placeholder="运营人员" icon="caret-bottom" :disabled="isDisable">
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col class="xg-search-yw-wrap" :span="12" :disabled="isDisable">
                        <el-form-item label="业务人员">
                            <span class="delete_right" v-if="!(editForm.salesMan==='')" @click="deleteSalesMan"></span>
                            <!-- <span class="search_left" v-if="!(addForm.operator==='')" @click="searchOperator"></span>-->
                            <el-autocomplete v-model="editForm.salesMan" :fetch-suggestions="salesManQuerySearchAsync" @select="handlesalesManSelect" placeholder="业务人员" icon="caret-bottom" :disabled="isDisable">
                            </el-autocomplete>
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
        <el-dialog :title="changeTitle" :visible.sync="dialogFormVisible" size="tiny" @close="resetForm">
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
                    <el-col :span="5">
                        <el-form-item label="变动金额：" label-width="100px">
                            <h3 v-if="changeForm.changeType === 'DEDUCTIONS'">➖</h3>
                            <h4 v-if="changeForm.changeType === 'TOP_UP'">➕</h4>
                        </el-form-item>
                    </el-col>
                    <el-col :span="17">
                        <el-form-item>
                            <el-input v-model="changeForm.alterMoney" placeholder="变动金额" @keyup.native="checkMoney" style="padding-right:5px;"> </el-input>
                            <p class="yuan">元</p>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注说明：" label-width="100px">
                            <el-input v-model="changeForm.remark" placeholder="备注"></el-input>
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

// import ElSearchTablePagination from 'el-search-table-pagination';


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
                operatorName: '',
                salesManName: '',
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
            },
            addForm: {
                shopName: '',
                name: '',
                phone: '',
                signedTime: '',
                agentGradeId: '',
                provinceCode: '',
                province: '',
                city: '',
                cityCode: '',
                countyCode: '',
                agentProvince: '',
                agentCity: '',
                agentCounty: '',
                address: '',
                shopType: 'AGENT',
                isShow: '1',
                salesMan: '',
                operator: '',
                salesManId: '',
                operatorId: '',
                operatorName: '',
                salesManName: '',

            },
            editFormTitle: '',
            editForm: {
                id: '',
                shopName: '',
                name: '',
                phone: '',
                signedTime: '',
                agentGradeId: '',
                province: '',
                city: '',
                county: '',
                cityCode: '',
                countyCode: '',
                agentProvince: '',
                agentCity: '',
                agentCounty: '',
                address: '',
                shopType: '',
                isShow: '',
                operator: '',
                operatorId: '',
                salesMan: '',
                salesManId: '',
                operatorName: '',
                salesManName: '',

            },
            isDisable: false,
            order: '', //预存款排序
            phoneLength: 11
        }
    },
    components: {
        addressComponent
    },
    created() {
        // console.log(this.salesManName);
        // console.log(this.operatorName);
        const self = this;
        if (!self.checkSession()) return;
        self.loading = true;
        




        //获取代理商等级列表
        self.$ajax.post('/api/http/shop/queryAgentGradeList.jhtml', {}).then(function (response) {
            console.log(response);
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
            self.myData = response.data.rows;
            self.totalSize = response.data.total
            console.log(response);
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
        //预存款变更
        onChange() {
            if (sessionStorage.user) {
                this.user = JSON.parse(sessionStorage.user);
                console.log(this.user);
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
                    'advanceDeposit.changeType': self.changeForm.changeType,
                    'advanceDeposit.alterMoney': self.changeForm.alterMoney,
                    'advanceDeposit.remark': self.changeForm.remark,
                    'advanceDeposit.creatorId': self.user.id,
                    'advanceDeposit.updatorId': self.user.id,
                    'advanceDeposit.isBackground': 1
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
                console.log(response)
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
        chengPre(id, shopName, shopNo) {
            if (!this.checkSession()) return;
            this.changeForm.changeShopId = id;
            this.changeForm.changeShopName = shopName;
            this.changeTitle = "编辑代理商店铺（编号：" + shopNo + "）"
            this.dialogFormVisible = true;
        },
        changeCancle() {
            this.dialogFormVisible = false;
            this.changeForm.changeType = '';
            this.changeForm.alterMoney = '';
            this.changeForm.remark = '';
        },
        //查询
        onSubmit: function () {
            const self = this;
            if (!self.checkSession()) return;
            self.currentPage = 1;
            //清除排序
            self.order = '';
            $(".ascending.is-leaf").removeClass("ascending");
            $(".descending.is-leaf").removeClass("descending");
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
                }
            }).then(function (response) {
                self.loading = false;
                self.myData = response.data.rows;
                self.totalSize = response.data.total
                console.log(response);
            }).catch(function (err) {
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
                console.log(response);
            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });
        },
        // 预存款余额排序
        sortAmount(row, column) {
            const self = this;
            console.log(row.order)
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
                }
            }).then(function (response) {
                self.loading = false;
                self.myData = response.data.rows;
                self.totalSize = response.data.total
                console.log(response);
            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });

        },
        //打开新增店铺弹窗
        openAddDialog() {
            this.addDialogVisible = true;
            this.addForm.operatorName === "";
            this.addForm.operatorName === "";
        },
        //点击选中
        handleoperatorSelect(item) {
            this.operatorId = item.id
            this.addForm.operatorName = item.userName
            // console.log(this.addForm.operatorName)
            //do something
        },
        handlesalesManSelect(item) {
            this.salesManId = item.id
            this.addForm.salesManName = item.userName
            // console.log(this.addForm.salesManName)

            //do something
        },
        //新增页面列表
        operatorQuerySearchAsync(queryString, callback) {
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
                    console.log(response.data.result)

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
        //打开修改店铺及店铺详情弹窗
        openEditDialog(data, type) {
            type == 'edit' ? this.isDisable = false : this.isDisable = true
            this.editFormTitle = type == 'edit' ? "编辑店铺（编号：" + data.shopNo + "）" : "查看店铺（编号：" + data.shopNo + "）"
            this.getInfoById(data.id);
            this.editDialogVisible = true;
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
                console.log(self.editForm.city)
                console.log(self.editForm.county)
                console.log(self.editForm.province)


            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });
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
        //提交字段校验
        testData(data, Address, AgentAddress) {
            const self = this;
            let isMobile = /^1\d{10}$/
            //店铺名判断
            if (!data.shopName) {
                self.loading = false;
                self.$message({
                    message: '店铺名不得为空',
                    type: 'error'
                })
                return false
            } else {
                if (data.shopName.length > 50) {
                    self.loading = false;
                    self.$message({
                        message: '店铺名长度不得大于50',
                        type: 'error'
                    })
                    return false
                }
            }
            //代理商姓名判断
            if (!data.name) {
                self.loading = false;
                self.$message({
                    message: '代理商姓名不得为空',
                    type: 'error'
                })
                return false
            } else {
                if (data.name.length > 10) {
                    self.loading = false;
                    self.$message({
                        message: '代理商姓名长度不得大于10',
                        type: 'error'
                    })
                    return false
                }
            }
            //代理商手机判断
            if (!data.phone) {
                self.loading = false;
                self.$message({
                    message: '代理商手机不得为空',
                    type: 'error'
                })
                return false
            } else {
                if (!isMobile.test(data.phone)) {
                    self.loading = false;
                    self.$message({
                        message: '代理商手机格式有误',
                        type: 'error'
                    })
                    return false
                }
            }
            //合同签约日期判断
            if (!data.signedTime) {
                self.loading = false;
                self.$message({
                    message: '合同签约日期不得为空',
                    type: 'error'
                })
                return false
            }
            // 如果是直营直接转成区域代理
            if (data.shopType == 'SELF_SUPPORT') {
                data.agentGradeId = 265;
            }
            //代理商等级判断
            if (!data.agentGradeId) {
                self.loading = false;
                self.$message({
                    message: '代理商等级不得为空',
                    type: 'error'
                })
                return false
            }
            //收件地址判断
            if (!Address.provinceCode || !Address.cityCode || !Address.areaCode) {
                self.loading = false;
                self.$message({
                    message: '收件地址不得为空',
                    type: 'error'
                })
                return false
            } else {
                if (Address.cityCode == 1) {
                    self.loading = false;
                    self.$message({
                        message: '请选择具体收件城市',
                        type: 'error'
                    })
                    return false
                }
                if (Address.areaCode == 1) {
                    self.loading = false;
                    self.$message({
                        message: '请选择具体收件地区',
                        type: 'error'
                    })
                    return false
                }
            }
            //详细地址判断
            if (!data.address) {
                self.loading = false;
                self.$message({
                    message: '详细地址不得为空',
                    type: 'error'
                })
                return false
            } else {
                if (data.address.length > 100) {
                    self.loading = false;
                    self.$message({
                        message: '详细地址长度不得大于100个字符',
                        type: 'error'
                    })

                    return false
                }
                //业务人员判断
                if(!data.salesMan){
                    console.log(data.salesMan)
                    self.loading = false;
                    self.$message({
                        message:'业务人员为必填项',
                        type:'error'
                    })
                    return false;
                }
            }
            //代理区域判断
            if (data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT') {
                if (!AgentAddress.provinceCode || !AgentAddress.cityCode || !AgentAddress.areaCode) {
                    self.loading = false;
                    self.$message({
                        message: '代理区域不得为空',
                        type: 'error'
                    })
                    return false
                } else {
                    if (AgentAddress.cityCode == 1) {
                        self.loading = false;
                        self.$message({
                            message: '请选择具体代理城市',
                            type: 'error'
                        })
                        return false
                    }
                }

            }
            return true
        },
        // 新增店铺
        addAgent() {
            const self = this;
            if (!self.checkSession()) return;
            self.loading = true;
            const data = self.addForm;
            let addAddress = self.$refs.addAddress.getData();
            let addAgentAddress = data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? self.$refs.addAgentAddress.getData() : null;
            if (!self.testData(data, addAddress, addAgentAddress)) return;
            //请求
            self.$ajax({
                url: '/api/shop/shopManage/modify.jhtml',
                method: 'post',
                data: {
                    'shop.shopName': data.shopName,
                    'shop.name': data.name,
                    'shop.phone': data.phone,
                    'shop.signedTime': Utils.formatDayDate(data.signedTime),
                    'shop.agentGradeId': data.agentGradeId,
                    'shop.provinceCode': addAddress.provinceCode,
                    'shop.cityCode': addAddress.cityCode,
                    'shop.countyCode': addAddress.areaCode,
                    'shop.agentProvince': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? addAgentAddress.provinceCode : '',
                    'shop.agentCity': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? addAgentAddress.cityCode : '',
                    'shop.agentCounty': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? addAgentAddress.areaCode : '',
                    'shop.address': data.address,
                    'shop.shopType': data.shopType,
                    'shop.isShow': data.isShow,
                    'shop.operator': data.operator,
                    'shop.salesMan': data.salesMan,
                    'shop.salesManId': this.salesManId,
                    'shop.operatorId': this.operatorId,
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
                console.log(response)
                if (response.data.result == 0) {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'success'
                    })
                    self.addDialogVisible = false;
                    setTimeout(function () {
                        self.handleCurrentChange(self.currentPage);
                    }, 1000)
                }
            }).catch(function (err) {
                self.loading = false;
            });



        },
        // 修改店铺
        editAgent() {
            const self = this;
            if (!self.checkSession()) return;
            self.loading = true;
            const data = self.editForm;
            let editAddress = self.$refs.editAddress.getData();
            
            console.log(editAddress);
            // return;
            let editAgentAddress = data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? self.$refs.editAgentAddress.getData() : null;
            if (!self.testData(data, editAddress, editAgentAddress)) return;
            //请求
            console.log(data)
            self.$ajax({
                url: '/api/shop/shopManage/modify.jhtml',
                method: 'post',
                data: {
                    'shop.id': data.id,
                    'shop.shopName': data.shopName,
                    'shop.name': data.name,
                    'shop.phone': data.phone,
                    'shop.signedTime': data.signedTime,
                    'shop.agentGradeId': data.agentGradeId,
                    'shop.provinceCode': editAddress.provinceCode,
                    'shop.cityCode': editAddress.cityCode,
                    'shop.countyCode': editAddress.areaCode,
                    'shop.agentProvince': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.provinceCode : '',
                    'shop.agentCity': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.cityCode : '',
                    'shop.agentCounty': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.areaCode : '',
                    'shop.address': data.address,
                    'shop.shopType': data.shopType,
                    'shop.city': data.city,
                    'shop.provinceCode': editAddress.provinceCode,
                    'shop.isShow': data.isShow,
                    'shop.operator': data.operator,
                    'shop.salesMan': data.salesMan,
                    'shop.salesManId': this.salesManId || '',
                    'shop.operatorId': this.operatorId || '',
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
                console.log(response)
                if (response.data.result == 0) {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'success'
                    })
                    self.editDialogVisible = false;
                    setTimeout(function () {
                        self.handleCurrentChange(self.currentPage);
                    }, 1000)
                }

            }).catch(function (err) {
                self.loading = false;
            });
        },
        //重置新增表格内容
        resetAddForm() {
            const self = this;
            self.addForm = {
                shopName: '',
                name: '',
                phone: '',
                signedTime: '',
                agentGradeId: '',
                provinceCode: '',
                cityCode: '',
                countyCode: '',
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
            }

        },
        //重置预存款表格内容
        resetForm() {
            const self = this;
            self.changeForm.changeType = '';
            self.changeForm.alterMoney = '';
            self.changeForm.remark = '';
        },
        deleteOperator(){
            this.addForm.operator='';
            // this.addForm.operatorName='';
            this.editForm.operator='';
            // console.log(this.addForm.salesManName)
        },
        deleteSalesMan(){
            this.addForm.salesMan='';
            // this.addForm.salesManName='';
            this.editForm.salesMan='';
            
            // console.log(this.addForm.salesManName)            
        },
        deleteOperatorName() {
            this.addForm.operatorName = '';
        },
        deleteSalesManName() {
            this.addForm.salesManName = '';

        }

    }
}
</script>
<style lang="less" scoped>
@import url("../assets/less/storeManage.less");
.last_time {
    position: fixed;
    top: 72%;
    left: 60%;
}
</style>
<style>
.el-message-box {
    width: 500px;
}

.el-message-box__btns {
    text-align: left;
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
.delete_left {
    background: url("../assets/images/zph_close.png") no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 289px;
    z-index: 1000;
}
.delete_right {
    background: url("../assets/images/zph_close.png") no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 289px;
    z-index: 1000;
}
.deleteOperatorName_left {
    background: url("../assets/images/zph_close.png") no-repeat center;
    position: absolute;
    width: 2.5%;
    height: 6%;
    top: 78%;
    left: 31.5%;
    z-index: 999;
}
.deleteSalesManName_right {
    background: url("../assets/images/zph_close.png") no-repeat center;
    position: absolute;
    width: 2.5%;
    height: 6%;
    top: 78%;
    left: 81.5%;
    z-index: 999;
}
.search_left {
    background: url("http://wiki.oteao.com/download/attachments/9831317/image2018-3-1%2021%3A39%3A54.png?version=1&modificationDate=1519887884000&api=v2")
        no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 289px;
    z-index: 999;
}
.search_right {
    background: url("http://wiki.oteao.com/download/attachments/9831317/image2018-3-1%2021%3A39%3A54.png?version=1&modificationDate=1519887884000&api=v2")
        no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 289px;
    z-index: 999;
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
    background: url("../assets/images/zph_close.png") no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 171px;
    z-index: 1000;
}
.xg-search-yw-wrap .delete_right {
    background: url("../assets/images/zph_close.png") no-repeat center;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 9px;
    left: 171px;
    z-index: 1000;
}
</style>
