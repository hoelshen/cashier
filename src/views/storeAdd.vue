<template>
    <div id="addStore"> 
      <!-- 新增店铺 start -->
        <el-form :model="addForm" label-width="120px" ref="addForm">
            <el-row class="content_title">
                <h2>基本信息</h2>
            </el-row>
            <!--第一行-->
            <el-row>  
                <el-col :span="8">
                    <el-form-item label="店铺名称：">
                        <el-input v-model="addForm.shopName" placeholder="店铺名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="店铺类型：">
                        <el-radio v-model="addForm.shopType" label="AGENT" @click.native="addZuipin">代理商</el-radio>
                        <el-radio v-model="addForm.shopType" label="SELF_SUPPORT"  @click.native="deleteSelfSupport">直营店铺</el-radio>
                    </el-form-item>
                </el-col>
                  
                <el-col :span="8">
                    <el-form-item label="展示选项：">
                        <el-radio v-model="addForm.isShow" label="1">展示</el-radio>
                        <el-radio v-model="addForm.isShow" label="0">不展示</el-radio>
                        <div class="m-2-o">
                            是否展示到醉品线下M2O体验店
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--第四行-->                   
            <el-row>
                <el-col :span="8">
                    <el-form-item label="代理商等级：" v-if="addForm.shopType!='SELF_SUPPORT'">
                        <el-select v-model="addForm.agentGradeId" placeholder="代理商等级" style="width: 100%;"   clearable>
                            <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index" @click.native="deleteExtendSuperType"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="合同服务期限：" >
                        <el-date-picker
                        v-model="addForm.signedStartTime"
                        type="date"
                        placeholder="开始日期"  
                        style="float:left;width:46.5%;"
                        :picker-options="selectionStartTime"
                        disabled
                        >
                        </el-date-picker>
                        <span style="width:7%;float:left;text-align: center;">至</span>
                        <el-date-picker
                        v-model="addForm.signedEndTime"
                        type="date"
                        placeholder="结束日期"
                        style="float:right;width:46.5%"                        
                        :picker-options="selectionEndTime">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item v-if="addForm.shopType!='SELF_SUPPORT'" label="年度业绩目标：">
                        <el-input v-show="addForm.agentGradeId ==265"  v-model="addForm.annualPurchasePerformance"    placeholder="进货业绩"  @blur="annualExtendPerformanceTitple"></el-input>  
                        <el-popover  placement="right" ref="annualPurchasePerformance"  width="200" trigger="manual" manual=true    popper-class="grayColor" content="若年度目标设为0，默认代理商可直接获得达标奖励">     
                        </el-popover>
                        <el-input v-show="addForm.agentGradeId !=265 "  v-model="addForm.annualPurchasePerformance"  v-popover:annualPurchasePerformance  @blur="annualPurchasePerformanceTitple"  placeholder="进货业绩"></el-input>  
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item  v-if="addForm.agentGradeId==265 && addForm.shopType!='SELF_SUPPORT'"  label-width="0px"   style="padding-left: 40px;">
                        <el-popover  placement="top" ref="annualExtendPerformance"  width="200" trigger="manual" manual=true    popper-class="grayColor"   content="若年度目标设为0，默认代理商可直接获得达标奖励"  >     
                        </el-popover>
                        <el-input  v-popover:annualExtendPerformance  v-model="addForm.annualExtendPerformance" @blur="annualExtendPerformanceTitple" > 
                            <template slot="prepend">店铺拓展：  
                            </template>
                            <template slot="append"> 家
                            </template>      
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="代理商姓名：">
                        <el-input v-model="addForm.name" placeholder="代理商姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="代理商手机：">
                        <el-input v-model="addForm.phone"  :maxlength='phoneLength' placeholder="代理商手机"></el-input>
                        <div class="m-2-o">
                            代理商登录系统使用的账号
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="代理商状态">
                       ---
                    </el-form-item>
                </el-col>
            </el-row>
            <!--第六行 -->
            <el-row>
                <el-col :span="18" v-if="(addForm.agentGradeId=='266'||addForm.agentGradeId=='31')||addForm.shopType=='SELF_SUPPORT'">
                    <el-form-item label="店铺所属区域：">
                        <addressComponent ref='addBelongAddress' :isDetail="false" />   
                    </el-form-item>
                </el-col>
                <el-col :span="18" v-if="addForm.agentGradeId=='265'&&addForm.shopType!='SELF_SUPPORT'">
                    <el-form-item label="店铺代理区域：">
                        <addressComponent ref='addAgentAddress' v-on:getAreaName="getAreaName" :isDetail="false" />   
                    </el-form-item>
                </el-col>
                <el-col :span="4"  v-if="addForm.agentGradeId=='265'&&addForm.shopType!='SELF_SUPPORT'">
                    <el-form-item :span="2" label="类别：" >
                            <el-select v-model="addForm.areaClass" placeholder="类别"  @visible-change="areaClassFlag = false"  clearable>
                                <el-option v-for="item in areaClassArray" :key="item.index" :label="item.name" :value="item.value"></el-option> 
                            </el-select>
                    </el-form-item>
                </el-col>       
            </el-row>
            <el-row>
              <el-col :span="18">
                    <el-form-item label="收件地址：" >
                        <addressComponent ref='addAddress' :isDetail="false"  v-on:addAddressFlage="addAddressFlage" />
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item  style="width: 444px;">
                        <el-input  type="textarea" v-model="addForm.address" placeholder="填写详情地址（为店铺地址，会展示到醉品的线下门店展示平台）" class="address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--账户信息-->      
            <el-row class="content_title">
                <h2>账户信息</h2>
            </el-row>
            <el-row >
                <el-col :span="8"  v-show="(addForm.agentGradeId=='266'&&addForm.shopType!='SELF_SUPPORT')||(addForm.agentGradeId=='31'&&addForm.shopType!='SELF_SUPPORT')">
                    <el-form-item label="括展上级：">
                            <el-radio v-model="addForm.extendSuperType" label="ZUIPIN"  >醉品自开发</el-radio>
                            <el-radio v-model="addForm.extendSuperType" label="AGENT" >代理商拓展</el-radio>                          
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8"  v-if="(addForm.agentGradeId=='31' || addForm.agentGradeId=='266') && addForm.extendSuperType!='ZUIPIN' && addForm.shopType!='SELF_SUPPORT'">
                    <el-form-item  :span="4"  label="上级编号/姓名">
                        <span class="arrowPng"  @click="deleteExtendSuperName" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)"></span>
                        <el-autocomplete v-model="addForm.extendSuperNoName" :class="{DelectClass:isDelectClass}" :fetch-suggestions="extendSuperNoQuerySearchAsync" @select="handleExtendSuperNoSelect" placeholder="可输入查找" >
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="4"  v-if="(addForm.agentGradeId=='31'  || addForm.agentGradeId=='266')  && addForm.extendSuperType!='ZUIPIN' && addForm.shopType!='SELF_SUPPORT'">
                    <el-form-item :span="4" label="上级代理商等级:">
                            <el-input v-model="addForm.superAgentGradeId"></el-input>   
                    </el-form-item>
                </el-col>
            </el-row>
            <!--第三行-->
            <el-row  :gutter="10">
                <el-col :span="10">
                    <el-form-item label="匹配规则:"  style="width: 1024px;">
                            <el-popover  placement="right" ref="rule" trigger="manual" manual=true width="200"  popper-class="grayColor"  style="  color: grey"   content="保存成功，该规则将立即生效~"  >     
                            </el-popover>
                            <span class="delete_left" v-if="!(addForm.ruleTitle==='')" @click="deleteRuleTitle" style="left: 416px;" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)" ></span> 
                            <el-input placeholder="请选择"    @blur="ruleTitleTitple" v-bind:value="addForm.ruleTitle" style="width: 444px;" ></el-input>
                            <el-button type="primary"  v-popover:rule   @click="onOpenRelationshipRulesDialogVisible"   >选择</el-button> 
                    </el-form-item>
                </el-col>
            </el-row>
            <!--第三行-->
            <el-row :gutter="10">
                <el-col class="search-yy-wrap" :span="12">
                    <el-form-item label="运营人员">
                        <span class="arrowPng" @click="deleteOperator" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)" ></span>
                        <el-autocomplete v-model="addForm.operator" :class="{DelectClass:isDelectClass}"    :fetch-suggestions="operatorQuerySearchAsync" @select="handleOperatorSelect" placeholder="可输入查找"  >
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col class="search-yw-wrap" :span="12">
                    <el-form-item label="业务人员">
                        <span class="arrowPng"  @click="deleteSalesMan" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)"></span>
                        <el-autocomplete v-model="addForm.salesMan" :class="{DelectClass:isDelectClass}"  :fetch-suggestions="salesManQuerySearchAsync" @select="handleSalesManSelect" placeholder="可输入查找" >
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;margin-left:120px;">
                <el-button @click="goBack" class="button-cancel">取消</el-button>                
                <el-button type="primary" @click="onChangePromptVisible" class="button-save">保存</el-button>
            </el-row>
        </el-form>
        <!-- 新增店铺 end -->
        <!--新增确认保存弹窗-->
        <el-dialog class="addPromptTitleStyle"   :title="addPromptTitle" :visible.sync="changePromptDialogFormVisible"  size="small" @close="resetPromptForm" >
                <i class="el-icon-warning" style="color:red"></i> 
                <span>店铺新增成功后以下信息无法修改，请您核对信息</span>
                <el-form  :model="addPromptForm" class="addPromptTitleStyle" style="    position:relative;padding: 27px 0px;">
                    <el-row :gutter="10">
                        <el-col :span="24"  style="padding-left:20px;" class="circle">
                            店铺类型：<span class="font-color">{{addForm.shopType == 'SELF_SUPPORT' ? '直营店铺':'代理商'}}</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24"  style="padding-left:20px;" class="circle">
                            合同服务期限：<span class="font-color">{{changePromptDialogForm.signedStartTime}} 至 {{changePromptDialogForm.signedEndTime}}</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="addForm.shopType =='AGENT'">
                        <el-col :span="24" style="padding-left:20px;" class="circle" >
                           拓展上级：
                                <span v-if=" addForm.agentGradeId == 265 || addForm.extendSuperType=='ZUIPIN'" class="font-color">醉品自开发</span>
                                <span v-else>{{addForm.extendSuperName}} {{addForm.extendSuperNo}}</span>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" >
                    <el-button @click="changePromptCancle">修 改</el-button>
                    <el-button type="primary" @click="addAgent">确 定</el-button>
                </div>
        </el-dialog>

        <!--新增规则关系弹窗-->
        <el-dialog :title="relationshipRulesTitle"   :visible.sync="relationshipRulesDialogVisible"  size="180%"  :before-close="changeCancle">
           <div style="width: 287px;position: relative;float: right;">
                <div style="width:216px;float:left;;padding: 10px;padding-bottom:15px;">
                    <el-input placeholder="请输入规则编号或规则名称" @keyup.enter.native="selectrelationshipRules" v-model="isSearchRuleNo"></el-input>
                </div>
                <div style="width:50px;float:left;padding: 10px;padding-bottom:15px">
                    <el-button type="primary" @click="selectrelationshipRules">查询</el-button>
                </div>
           </div>
            <div>
                <el-table :data="relationshipRulesForm" :height="440" style="width: 100%;">
                    <el-table-column type="index" label="序号"  width="80">
                        <template slot-scope="scope">
                            <span>{{scope.$index + (currentPage - 1 ) * 30 + 1 }}</span>
                        </template>  
                    </el-table-column>
                    <el-table-column prop="ruleNo" label="规则编号" width="127">
                    </el-table-column>
                    <el-table-column prop="businessExtendsRuleName" label="规则名称" :show-overflow-tooltip="true"  width="200" >
                    </el-table-column>
                    <el-table-column prop="agentPaymentDifinition" label="规则类型" width="120">
                        <template scope="scope">
                            {{scope.row.agentPaymentDifinition=='ZUIPIN_EXTEND' ? '醉品拓展' :'业务拓展'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间"  width="120"  >
                        <template  scope="scope">
                            <span>{{ formatDayDate(scope.row.createTime)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ruleNo" label="操作"  width="120"  align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.id == addForm.ruleId">  
                               <span style="color:#909399" disabled="disabled"> 已选</span>
                            </span> 
                            <span v-else>
                                <span  style="color:#409EFF"  @click="selectRuleNo(scope.row.ruleNo, scope.row.businessExtendsRuleName, scope.row.id)">选择</span>
                            </span>
                        </template>
                    </el-table-column>             
                </el-table>
            </div>
            <div class="plPage clearfix"    >
                <el-pagination style="margin-top: 10px;float: right;"  @current-change="onRelationshipRulesDialogChange" :current-page="currentPage" :page-size="pageSize" layout=" prev, pager, next, jumper" :total="totalSize" >
                </el-pagination>
            </div>
        </el-dialog>     
    </div>
</template>
<script type="text/javascript" src="../router.js"></script>

<script>
import Utils from '../components/tools/Utils';
import addressComponent from '../components/address.vue';
import axios from 'axios';


import $ from 'jquery';

export default {
    data(){
        return{
            currentPage: 1,
            totalSize: 0,
            pageSize: 30,
            user: '',
            addForm: {
                shopName: '',
                name: '',
                phone: '',
                signedStartTime:  new Date() , //注册开始时间
                signedEndTime:'',  //注册结束时间
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
                shopType: 'AGENT',  //店铺类型
                isShow: '1',
                salesMan: '',
                operator: '',
                salesManId: '',
                operatorId: '',
                annualPurchasePerformance:'',   //店铺年度目标
                annualExtendPerformance:'',   //店铺拓展
                extendSuperType:'ZUIPIN',    //扩展上级
                superAreaClass:'',
                extendSuperNo:'',    //上级编号
                extendSuperName:'',  //上级姓名 
                extendSuperNoName:'', 
                areaClass:'',     //所属类别
                belongProvince:'', //所属区域
                belongCity:'',     //所属城市
                belongCountry:'',  //所属地区
                ruleId:'',  //规则ID
                ruleTitle:'', // 规则
            },
            levelArray: [], //代理商等级数组
            areaClassArray: [ //类别等级数组
                {   
                value: 'S',
                name: 'S',
                num:8
                },
                {
                    value:'A',
                    name: 'A',
                    num:6
                },
                {
                    value: 'B',
                    name: 'B',
                    num:4
                },
                {
                    value: 'C',
                    name: 'C',
                    num:4
                }
            ],
            phoneLength: 11,
            areaClassFlag:true,
            addPromptTitle:'提示',
            addPromptForm:{},
            changePromptDialogFormVisible: false,
            changePromptDialogForm:{
                signedStartTime:'',
                signedEndTime:'',
                
            },
            relationshipRulesTitle:'规则选择',
            relationshipRulesForm:[],
            relationshipRulesDialogVisible:false,
            isSearchRuleNo:'',   //查询规则编号
            addressFlage:false,  //地址
            //时间选择器
            selectionStartTime: {
               disabledDate(time) {
                    // console.log(time.getTime() = new Date() )
                    // return  new Date()
                    
                }
            },
            selectionEndTime:{
                  disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            },
            isDelectClass:true,
        }
    },
    components: {
        addressComponent
    },
    methods:{
        addAddressFlage(){
            this.addressFlage=  true;
        },
        formatDayDate(date){
            return Utils.formatDayDate(date)
        },
        //获得区域等级等级
        getAreaName(){
            const self = this;
            //获取区域等级列表
            let url = '/api/shop/shopManage/getAreaClassByAreaName.jhtml?areaName=' + self.$refs.addAgentAddress.getData().cityName
            self.$ajax.post(url, {}).then(function (response) {
                if (response.data.success == 1) {
                    self.addForm.areaClass = response.data.result.areaClass
                    self.addForm.annualExtendPerformance =   response.data.result.shopNum

                    for(let item of self.areaClassArray){
                        if(item.value == self.addForm.areaClass){
                            self.addForm.annualExtendPerformance=( self.areaClassFlag && String(self.addForm.annualExtendPerformance)  ) || item.num
                        }
                    }
                    
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            }).catch(function (err) {
                console.log(err);
            });
            
        },
        //判断是否超时
        checkSession() {
            const self = this;
            if (window.sessionStorage) {
                let nowDate = new Date().getTime();
                let time = (nowDate - sessionStorage.haha) / 1000
                //距离上一次操作时间
                // console.log(nowDate - sessionStorage.haha)
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
        //提交字段校验
        testData(data, addAddress, addAgentAddress, addBelongAddress) {
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
            //合同服务期限判断
            if (data.signedStartTime=='' || data.signedEndTime== '') {
                self.loading = false;
                self.$message({
                    message: '合同服务期限不得为空',
                    type: 'error'
                })
                return false
            }

            //代理商姓名判断
            var _zh = data.name ? data.name.match(/[^ -~]/g) : 0;
            var num = Math.ceil((data.name.length + (_zh && _zh.length) || 0)/2);
            if (!data.name) {
                    self.loading = false;
                    self.$message({
                        message: '代理商姓名不得为空',
                        type: 'error'
                    })
                    return false
                } else {
                    if (num > 10) {
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
            //收件地址判断
            if(!this.addressFlage){
                self.loading = false;                
                self.$message({
                    message: '收件地址不得为空',
                    type: 'error'
                })
                return false
            }
 

            //详细地址判断
            if (!data.address) {
                self.loading = false;
                self.$message({
                    message: '详细地址不得为空',
                    type: 'error'
                })
                return false
                }else {
                    if (data.address.length > 100) {
                        self.loading = false;
                        self.$message({
                            message: '详细地址长度不得大于100个字符',
                            type: 'error'
                        })
                        return false
                    }      
            }
            //所属区域判断
            if(data.agentGradeId ==266  || data.shopType == 'SELF_SUPPORT'  || data.agentGradeId ==31){
                 if (!addBelongAddress.provinceCode || !addBelongAddress.cityCode || !addBelongAddress.areaCode) {
                    self.loading = false;
                    self.$message({
                        message: '所属区域不得为空',
                        type: 'error'
                    })
                    return false
                }
            }
            //代理区域判断

            if (data.agentGradeId == 265 &&  data.shopType != 'SELF_SUPPORT') {
                if (!addAgentAddress.provinceCode || !addAgentAddress.cityCode || !addAgentAddress.areaCode) {
                    self.loading = false;
                    self.$message({
                        message: '代理区域不得为空',
                        type: 'error'
                    })
                    return false
                } else {
                    if (addAgentAddress.cityCode == 1) {
                        self.loading = false;
                        self.$message({
                            message: '请选择具体代理城市',
                            type: 'error'
                        })
                        return false
                    }
                }

            }

            //年度业绩目标
            if(data.shopType != 'SELF_SUPPORT'){
                if(!data.annualPurchasePerformance ){
                    self.loading = false;
                    self.$message({
                        message: '年度业绩不得为空',
                        type: 'error'
                    })                                      
                    return false;
                }
            }
       
            // 年度店铺拓展
            if( (data.agentGradeId ==265) && data.shopType != 'SELF_SUPPORT'){
                if(!data.annualExtendPerformance){
                    self.loading = false;
                    self.$message({
                        message: '年度店铺不得为空',
                        type: 'error'
                    })
                    return false  
                }
            }

            //检验上级代理商的状态
            if((data.agentGradeId=='31' || data.agentGradeId=='266' ) && data.extendSuperType =='AGENT'){
                   if(!data.extendSuperNo){
                        self.loading = false;
                        self.$message({
                            message: '代理商的上级编号/姓名必填',
                            type: 'error'
                        })
                        return false    
                    }
            }

            //检验上级代理商的状态
            if((data.agentGradeId=='31' || data.agentGradeId=='266' ) && data.extendSuperType =='AGENT'){
                if(data.state!=0){
                    self.loading = false;
                    self.$message({
                        message: '代理商的上级为禁用状态',
                        type: 'error'
                    })
                    return false    
                }
            }

            //业务人员判断
            if(!data.salesMan){
                // console.log(data.salesMan)
                self.loading = false;
                self.$message({
                    message:'业务人员为必填项',
                    type:'error'
                })
                return false;
            }
            return true
        },
        //清除代理商编号、类别
        deleteExtendSuperNo(){
            this.addForm.extendSuperNo = '';
            this.addForm.superAgentGradeId = '';
            this.addForm.extendSuperNoName = '';
        },
        //清除代理商
        deleteExtendSuperType(val){  
            if(this.addForm.agentGradeId==265){
                this.addForm.extendSuperNo= '';
                this.addForm.superAgentGradeId= '';
                this.addForm.extendSuperNoName = '';
            }


        },
        //气泡提示
        annualExtendPerformanceTitple(){
            let self = this            
            if( !Number(self.addForm.annualExtendPerformance) && !Number(self.addForm.annualPurchasePerformance)){
                self.$refs.annualExtendPerformance.showPopper=true
                // setTimeout(function(){
                //     self.$refs.annualExtendPerformance.showPopper=false
                // },3000)
            }else{
                self.$refs.annualExtendPerformance.showPopper=false
            }
        },
        //气泡提示
        annualPurchasePerformanceTitple(){
            let self = this
            console.log(self.addForm.annualPurchasePerformance)
            if(!Number(self.addForm.annualPurchasePerformance) ){
                    self.$refs.annualPurchasePerformance.showPopper=true
            }else{
                    self.$refs.annualPurchasePerformance.showPopper=false
            }
        },
        //气泡提示
        ruleTitleTitple(){
            let self = this
            if(self.addForm.ruleTitle){
                self.$refs.rule.showPopper=true
                // setTimeout(function(){
                //     self.$refs.rule.showPopper=false
                // },6000)                
            }
        },
        // 新增店铺
        addAgent() {
            const self = this;
            if (!this.checkSession()) return;
            self.loading = true;
            const data = self.addForm;
            let addAddress = self.$refs.addAddress.getData();
            let addAgentAddress =  (data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? self.$refs.addAgentAddress.getData() : null;              
            let addBelongAddress = (data.agentGradeId ==31 || data.agentGradeId ==266 )|| data.shopType == 'SELF_SUPPORT'?  self.$refs.addBelongAddress.getData() : null;
            let dataSignedStartTime = Utils.formatDayDate(data.signedStartTime);
            let dataSignedEndTime  = Utils.formatDayDate(data.signedEndTime);
            let data1 = {
                    'shop.shopName': data.shopName,
                    'shop.name': data.name,
                    'shop.phone': data.phone,
                    'shop.signedStartTime': dataSignedStartTime,
                    'shop.signedEndTime':dataSignedEndTime,
                    'shop.agentGradeId': data.extendSuperType == 265 ?  '' : ( data.agentGradeId)  ,
                    'shop.provinceCode': addAddress.provinceCode,
                    'shop.cityCode': addAddress.cityCode,
                    'shop.countyCode': addAddress.areaCode,
                    'shop.agentProvince':  (data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? addAgentAddress.provinceCode : '',
                    'shop.agentCity': (data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? addAgentAddress.cityCode : '',
                    'shop.agentCounty':  (data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? addAgentAddress.areaCode : '',
                    'shop.address': data.address,
                    'shop.shopType': data.shopType,
                    'shop.isShow': data.isShow,
                    'shop.operator': data.operator,
                    'shop.salesMan': data.salesMan,
                    'shop.salesManId': data.salesManId,
                    'shop.operatorId': data.operatorId || '',
                    'shop.annualPurchasePerformance':data.annualPurchasePerformance || '',
                    'shop.annualExtendPerformance':data.annualExtendPerformance || '', 
                    
                    'shop.extendSuperNo': data.extendSuperType == 265 ?  '' : (data.extendSuperNo || '')  ,
                    'shop.areaClass':(data.shopType ==='SELF_SUPPORT') ? '' : (data.areaClass || '') ,

                    'shop.belongProvince':addBelongAddress  ? addBelongAddress.provinceCode : "",
                    'shop.belongCity':addBelongAddress  ? addBelongAddress.cityCode : "",
                    'shop.belongCountry':addBelongAddress ? addBelongAddress.areaCode : "",
                    'shop.ruleId':data.ruleId,
                }
                let data2 = {
                    'shop.extendSuperType':data.extendSuperType || '',
                }
                if(data.agentGradeId != '265'){
                    Object.assign(data1,data2)
                }
          
            //请求
            self.$ajax({
                url: '/api/shop/shopManage/modify.jhtml',
                method: 'post',
                data: data1,
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
                if (response.data.success == 1 || 0) {
                    self.$message({
                        message: response.data.msg,
                        type: 'success'
                    })
                     setTimeout(function () {
                         console.log(response.data.result.id)
                        self.$router.push({ name:'storeDetail',params:{shopNo:response.data.result.id} })
                    }, 1000)
                }else{
                    self.loading = false;
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                    return false
                }
            }).catch(function (err) {
                self.loading = false;
            });
        },
        //重置新增表单
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
            }
        },
        changePromptCancle() {
            this.changePromptDialogFormVisible = false;
        },
        //返回提示符
        goBack() {
            this.$confirm(`你确定要放弃添加吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push('/storeManage');
                this.$message('取消成功')
            })
        },
        //搜索运营人员
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
                    // console.log(response.data.result)

                    for (let item of response.data.result) {
                        list.push(item)
                    }

                    callback(list);

                } else {

                    let QS = queryString.toLocaleLowerCase();

                    for (let item of response.data.result) {
                        if (item.headPinyin.indexOf(QS) > -1 || item.userName.indexOf(QS) > -1) {
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
        //搜索业务人员
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
                        if (item.userName.indexOf(QS) > -1 || item.headPinyin.indexOf(QS) > -1) {
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
        //搜索上级代理商
        extendSuperNoQuerySearchAsync(queryString, callback){

            // queryString = this.addForm.extendSuperNo ? '' : queryString;

            var list = [{}];
            //调用的后台接口
            let url = '/api/shop/shopManage/getAgentVoList.jhtml?'
            //从后台获取到对象数组
            axios.get(url).then((response) => {
                //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示

                for (let i of response.data.result) {
                    i.value = i.shopNoAndName;  //将CUSTOMER_NAME作为value
                }

                if (!queryString) {

                    for (let item of response.data.result) {
                        list.push(item)
                    }
                    callback(list);
                } else {

                    let QS = queryString.toLocaleLowerCase();

                    for (let item of response.data.result) {
                        if (item.shopNo.indexOf(QS) > -1 || item.name.indexOf(QS) > -1 || item.headPinyin.indexOf(QS) > -1 || item.shopNoAndName.indexOf(QS) > -1) {
                            list.push(item)
                        }
                    }
                    if (list.length == 1) {
                        list.push({ value: `输入的代理商编号 / 姓名格式不正确，请检查后再试~` });
                    }
                }
                callback(list);
            }).catch((error) => {
                console.log(error);
            });
        },
        //点击选中
        handleOperatorSelect(item) {
            this.addForm.operatorId = item.id;
            this.addForm.operator  = item.userName;
        },
        handleSalesManSelect(item) {
            this.addForm.salesManId = item.id;
            this.addForm.salesMan =  item.userName;
        },
        handleExtendSuperNoSelect(item){
                if(item.name==null){
                    this.addForm.extendSuperNoName = ``                    
                }else{
                    this.addForm.extendSuperNo = item.shopNo;
                    this.addForm.extendSuperName = item.name;
                    
                    this.addForm.extendSuperNoName = item.shopNo + ' ' +item.name;
                    this.addForm.superAgentGradeId = item.superAgentGradeId == 265 ? '区域' : (item.superAgentGradeId == 31 ? '单店' : '微店');
                    this.addForm.state = item.state;
                }

        },  
        deleteExtendSuperName(){
                this.addForm.extendSuperNo = '' ;
                this.addForm.superAgentGradeId = '';
                this.addForm.extendSuperNoName = '',
                this.addForm.state = '';   
        },
        deleteOperator(){
            this.addForm.operator='';
        },
        deleteSalesMan(){
            this.addForm.salesMan='';    
        },
        deleteSelfSupport(){
            this.addForm.extendSuperNo= '';
            this.addForm.superAgentGradeId= '';
            this.addForm.annualAreadyExtendPerformance = '';
            this.addForm.annualExtendPerformance = '';
            this.addForm.annualLowerAreadyPurchasePerformance = '';
            this.addForm.annualOwnAreadyPurchasePerformance = '' ;
            this.addForm.extendSuperType = '';
            this.addForm.superNo = '';
            this.addForm.areaClass  = '';
        },
        addZuipin(){
            this.addForm.extendSuperType = 'ZUIPIN';
        },
        resetPromptForm(){
            
        },
        //打开保存确认弹窗
        onChangePromptVisible(){

            const self = this;
            if (!this.checkSession()) return;
            self.loading = true;
            
            const data = self.addForm;
            // console.log(data)
            let addAddress =  self.$refs.addAddress.getData();
            
            let addBelongAddress = (data.agentGradeId ==266  || data.shopType == 'SELF_SUPPORT' || data.agentGradeId ==31) ?  self.$refs.addBelongAddress.getData() : null;
            let addAgentAddress =  (data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? self.$refs.addAgentAddress.getData() : null; 

            // console.log(addBelongAddress)
            if (!this.testData(data, addAddress, addAgentAddress, addBelongAddress)) return;
    
            let dataSignedStartTime = Utils.formatDayDate(data.signedStartTime);   
            let dataSignedEndTime  = Utils.formatDayDate(data.signedEndTime);             

            this.changePromptDialogFormVisible = true;
            this.changePromptDialogForm.signedStartTime = dataSignedStartTime
            this.changePromptDialogForm.signedEndTime = dataSignedEndTime
        },
        //打开规则关系弹窗
        onOpenRelationshipRulesDialogVisible(val){
            this.relationshipRulesDialogVisible = true;
            this.onRelationshipRulesDialogVisible(1);
        },
        onRelationshipRulesDialogVisible(value){
            const self = this;    
            self.loading = true;
            self.$ajax({
                url:'/api/http/businessExtendsRule/getBusinessExtendsRuleList.jhtml',
                method: 'post',
                data:{
                    'pager.pageIndex': value,
                    'pager.pageSize': self.pageSize,
                    'businessExtendsRuleVo.ruleName':self.isSearchRuleNo || '',
                    'businessExtendsRuleVo.isSearchRuleNo' : 1
                },
                transformRequest: [function(data) {
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
                if (response.data.success == 1) {
                        self.relationshipRulesForm = response.data.result;
                        self.totalSize = response.data.totalNums;
                    } else {
                        self.$message({
                            message: response.data.msg,
                            type: 'error'
                        })
                    }
            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });
        },
        //改变规则关系页码
        onRelationshipRulesDialogChange(val){
            this.currentPage = val;
            this.onRelationshipRulesDialogVisible(val);
        },
        //关闭规则选择弹窗
        changeCancle(){
            this.relationshipRulesDialogVisible = false;                   
            this.relationshipRulesDialogForm = [];
            this.currentPage = 1;            
            this.isSearchRuleNo = ''; 
            let self = this
            if(self.addForm.ruleTitle){
                self.$refs.rule.showPopper=true
                // setTimeout(function(){
                //     self.$refs.rule.showPopper=false
                // },4000)                
            }
        },
        //查询关系
        selectrelationshipRules(){
            this.onRelationshipRulesDialogVisible(1);
        },
        deleteRuleTitle(){
            this.addForm.ruleTitle = '';
            this.addForm.ruleId = '';
        },
        //选择关系
        selectRuleNo(ruleNo,businessExtendsRuleName,id){
            this.addForm.ruleTitle = ruleNo +' '+  businessExtendsRuleName
            this.addForm.ruleId = id
        },
        //添加样式
        changeActive($event){
             $event.currentTarget.className=" delete_left ";
        },
        //移除样式        
        removeActive($event){     
            $event.currentTarget.className=" arrowPng ";
        }
    },
    created(){
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

        //获取默认规则
        self.$ajax.post('/api/http/businessExtendsRule/getDefaultBusinessExtendsRule.jhtml',{
        }).then(function (response) {
          self.addForm.ruleTitle= response.data.result.ruleNo +' '+ response.data.result.businessExtendsRuleName
          self.addForm.ruleId = response.data.result.id
        }).catch(function (err) {
            console.log(err);
        });
    },
    watch:{
        'addForm.areaClass'(){
            for(let item of this.areaClassArray){
                if(item.value == this.addForm.areaClass){
                    this.addForm.annualExtendPerformance=( this.areaClassFlag && String(this.addForm.annualExtendPerformance)  ) || item.num
                }
            }
        },
        'addForm.annualPurchasePerformance'(newval,oldval){
            if(newval==''){
                newval ='';
            }else{
                if(Utils.digitTwo(newval)){
                    this.$nextTick(() => {
                            this.addForm.annualPurchasePerformance = newval
                            oldval = newval
                    })
                }else{
                    this.$nextTick(() => {
                        this.addForm.annualPurchasePerformance = oldval
                    })               
                }
            }
        },
        'addForm.annualExtendPerformance'(newval,oldval){
            if(newval==''){
                newval ='';
            }else{
                if(Utils.digitZero(newval)){
                    this.$nextTick(() => {
                            this.addForm.annualExtendPerformance = newval
                            oldval = newval
                    })
                }else{
                    this.$nextTick(() => {
                        this.addForm.annualExtendPerformance = oldval
                    })               
                }
            }            
        }

    },
    computed:{
        annualExtendPerformance(){
            this.addForm.annualPurchasePerformance =  Utils.digitInput(newval)
        }
    }

}
</script>
<style lang="css" scoped>
     .addPromptTitleStyle  >>> .el-dialog__body {
         position: relative;
         padding: 2% 18%;
    }

</style>

<style >
    .grayColor{
          color: gray
    }
</style>

<style lang="less">
@import url("../assets/less/storeAdd.less");
#addStore {
    width: 98%;
    margin: 1%;
    padding: 20px;
    background-color: #ffffff;

    .content_title {
        .content_closeBtn {
            font-size: 19px;
            float: right;
            color: #0000ff9e;
            cursor: pointer;
        }
    }
    .typeNumber{
            position: absolute;
            right: 10px;
            top: 7px;
            background: #ffffff;
            z-index: 9999;
            width: 16px;
            height: 18px;
    }
    .delete_left {
        background: url("../assets/images/zph_close.jpg") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 173px;
        z-index: 1000;
    }
    .delete_right {
        background: url("../assets/images/zph_close.jpg") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 173px;
        z-index: 1000;
    }
    .arrowPng{
        background: url("../assets/images/arrow.jpg") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 173px;
        z-index: 1000;
    }
    .content_title h2 {
        line-height: 38px;
        margin-bottom: 30px;
    }
    .button-cancel{
        color: #167edf;
    }
    .circle::before{
        content: url(../assets/images/circle.png);
        display: inline-block;
    }
    .el-dialog--tiny{
        width: 48%
    }
    .DelectClass{
        width: 200px;
    }

}

</style>

