<template>
  <div id="editStore">
    <!-- 修改店铺页面 start -->
        <el-form :model="editForm" label-width="120px" ref="editForm">
            <el-row class="content_title">
                <h2>基本信息({{editForm.shopNo}})</h2>
                <div class="content_closeBtn" @click="goBack">X</div>
            </el-row>
            <el-row>
                <!--第一行-->
                <el-col :span="8">
                    <el-form-item label="店铺名称：">
                        <el-input v-model="editForm.shopName" placeholder="店铺名称"></el-input>
                    </el-form-item>
                </el-col>
               
            </el-row>
            <el-row>
               <!--第二行-->
                <el-col :span="8">
                    <el-form-item label="店铺类型：" >
                        <el-radio v-model="editForm.shopType" label="AGENT"  disabled>代理商</el-radio>
                        <el-radio v-model="editForm.shopType" label="SELF_SUPPORT"   disabled>直营店铺</el-radio>
                    </el-form-item>
                </el-col>
             
                <el-col :span="8">
                    <el-form-item label="展示选项：">
                        <el-radio v-model="editForm.isShow" :label="1">展示</el-radio>
                        <el-radio v-model="editForm.isShow" :label="0">不展示</el-radio>
                        <div class="mark">
                            是否展示到醉品线下M2O体验店
                        </div>
                    </el-form-item>
                </el-col>                
            </el-row>
            <el-row>
                 <el-col :span="8">
                    <el-form-item label="代理商等级：" v-show="editForm.shopType!='SELF_SUPPORT'" >
                        <el-select v-model="editForm.agentGradeId" placeholder="代理商等级" @visible-change="areaClassFlag = false"  clearable style="width: 100%;">
                            <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"  @click.native="deleteExtendSuperNo"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                 <!--第三行-->
                <el-col :span="8">
                    <el-form-item label="合同服务期限：">
                        <span >  {{editForm.signedStartTime}} 至 {{editForm.signedEndTime}}</span>                   
                        <el-tooltip placement="right" effect="light">
                        <span class="textBlue"  v-show="editForm.nextSignedStartTime" ></span>    
                        <span slot="content" >{{editForm.nextSignedStartTime}} 至 {{editForm.nextSignedEndTime}}</span>
                        </el-tooltip> 
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item v-show="editForm.shopType!='SELF_SUPPORT'" label="年度业绩目标：">
                        <el-input v-show="editForm.agentGradeId ==265" v-model="editForm.annualPurchasePerformance" placeholder="进货业绩" @blur="annualExtendPerformanceTitple"></el-input>  
                        <el-popover  placement="right" ref="annualPurchasePerformance"  popper-class="grayColor" width="200" trigger="manual" manual=true  content="若年度目标设为0，默认代理商可直接获得达标奖励">     
                        </el-popover>                    
                        <el-input v-show="editForm.agentGradeId !=265 " v-model.number="editForm.annualPurchasePerformance"  v-popover:annualPurchasePerformance  @blur="annualPurchasePerformanceTitple"  placeholder="进货业绩"></el-input>  
                    </el-form-item>                    
                </el-col>
                <el-col :span="6">
                    <el-form-item  v-show="editForm.agentGradeId==265 && editForm.shopType!='SELF_SUPPORT'" >  
                        <el-popover  placement="top" ref="annualExtendPerformance"  width="200" trigger="manual" popper-class="grayColor"    content="若年度目标设为0，默认代理商可直接获得达标奖励"  >     
                        </el-popover>                        
                        <el-input   v-popover:annualExtendPerformance v-model="editForm.annualExtendPerformance" @blur="annualExtendPerformanceTitple"  >                              
                            <template slot="prepend">店铺拓展：  
                            </template>
                                <template slot="append"> 家
                            </template> 
                        </el-input> 
                    </el-form-item>
                </el-col>
            </el-row>         
            <el-row>
                <!--第四行-->
                 <el-col :span="8">
                    <el-form-item label="代理商姓名：">
                        <el-input v-model="editForm.name" placeholder="代理商姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="代理商手机：">
                        <el-input v-model="editForm.phone" :maxlength='phoneLength' placeholder="代理商手机"></el-input>
                        <div class="mark">
                            代理商登录系统使用的账号
                        </div>
                    </el-form-item>
                </el-col>
               <el-col :span="8">
                    <el-form-item label="代理商状态：" disabled>
                        <el-col :span="12">
                            {{ editForm.state	=== 1 ? '禁用' : '启用' }}
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!--第五行-->
                <el-col :span="24" v-show="(editForm.agentGradeId=='266'||editForm.agentGradeId=='31' || editForm.shopType =='SELF_SUPPORT')">
                    <el-form-item label="所属区域：">
                        <addressComponent ref='editBelongAddress' :provinceCode="editForm.belongProvince" :cityCode="editForm.belongCity " :areaCode="editForm.belongCountry"  :isDetail="false" />   
                    </el-form-item>
                </el-col>
                <el-col :span="18" v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                    <el-form-item label="代理区域：">
                        <addressComponent  :provinceCode="editForm.agentProvince" :cityCode="editForm.agentCity" :areaCode="editForm.agentCounty"  ref='editAgentAddress' v-on:getAreaName="getAreaName" :isDetail="false"  @click.native="changeAnnualExtendPerformance"/>   
                    </el-form-item>
                
                </el-col>
                <el-col :span="4"  v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                    <el-form-item :span="2" label="类别：" >
                        <el-select v-model="editForm.areaClass" placeholder="类别"   clearable  @visible-change="areaClassFlag = false">
                            <el-option v-for="item in areaClassArray" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>                    
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                    <el-form-item label="收件地址：">
                        <addressComponent :provinceCode="editForm.provinceCode" :cityCode="editForm.cityCode" :areaCode="editForm.countyCode" ref='editAddress' :isDetail="false" />
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="24">
                    <el-form-item label="详细地址：">
                        <el-input  type="textarea" v-model="editForm.address" placeholder="填写详情地址（为店铺地址，会展示到醉品的线下门店展示平台）" class="address"></el-input>
                        <div class="mark">
                            地址为店铺地址，会展示到醉品的线下门店展示平台
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>      
            <el-row class="content_title">
                <h2>账户信息</h2>
            </el-row>
            <el-row>
                <el-col :span="8"  v-if="(editForm.agentGradeId=='266'&&editForm.shopType!='SELF_SUPPORT')||(editForm.agentGradeId=='31'&&editForm.shopType!='SELF_SUPPORT')" >
                    <el-form-item label="括展上级：" >
                            <el-radio v-model="editForm.extendSuperType" label="ZUIPIN" disabled>醉品自开发</el-radio>
                            <el-radio v-model="editForm.extendSuperType" label="AGENT" disabled>代理商拓展</el-radio>                            
                    </el-form-item>
                </el-col>
                <el-col :span="8"  v-if="editForm.shopType!='SELF_SUPPORT' && (editForm.agentGradeId=='31' || editForm.agentGradeId=='266') && editForm.extendSuperType!='ZUIPIN'">
                    <el-form-item  :span="4"  label="上级编号/姓名" >
                        <span class="delete_left" v-if="!(editForm.extendSuperNo==='')" @click="deleteExtendSuperNoName" style="left: 164px;"></span>
                        <el-autocomplete v-model="editForm.extendSuperNoName" :fetch-suggestions="extendSuperNoQuerySearchAsync" @select="handleExtendSuperNoSelect" placeholder="可输入查找" icon="caret-bottom" disabled>
                            <span class="search_left"></span>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="4"   v-if="editForm.shopType!='SELF_SUPPORT'&& (editForm.agentGradeId=='31' || editForm.agentGradeId=='266') && editForm.extendSuperType!='ZUIPIN'">
                    <el-form-item :span="4" label="上级代理商等级:">
                            <el-input v-model="editForm.superAgentGradeId"  disabled></el-input>   
                    </el-form-item>
                 </el-col>
            </el-row>
            <!-- 第三行-->
            <el-row  :gutter="10">
                <el-col :span="10">
                    <el-form-item label="匹配规则:"  style="width: 1024px;">
                            <el-popover  placement="right" ref="rule" trigger="manual" manual=true width="200"   popper-class="grayColor"    content="保存成功，该规则将立即生效~"  >     
                            </el-popover>
                            <span class="arrowPng"  @click="deleteRuleTitle" style="left: 416px;z-index:99" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)"></span>  
                            <el-input placeholder="请选择"   @blur="ruleTitleTitple" v-model="editForm.ruleTitle" style="width: 444px;" ></el-input>
                            <el-button type="primary"  v-popover:rule  @click="onOpenRelationshipRulesDialogVisible" >选择</el-button>    
                    </el-form-item>
                </el-col>

            </el-row>    
            <el-row>
                <el-col class="search-yy-wrap" :span="12">
                    <el-form-item label="运营人员">
                        <span class="arrowPng" @click="deleteOperator" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)"></span>     
                        <el-autocomplete v-model="editForm.operator" :fetch-suggestions="operatorQuerySearchAsync" @select="handleOperatorSelect" placeholder="可输入查找" >    
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col class="search-yw-wrap" :span="12">
                    <el-form-item label="业务人员">
                        <span class="arrowPng" @click="deleteSalesMan" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)"></span> 
                                              
                        <el-autocomplete v-model="editForm.salesMan" :fetch-suggestions="salesManQuerySearchAsync" @select="handleSalesManSelect" placeholder="可输入查找" >
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;margin-left:119px;">
                <el-button @click="goBack">取消</el-button>                
                <el-button type="primary" @click="editAgent">保存</el-button>
            </el-row>
        </el-form>
        <!--新增规则关系弹窗-->
        <el-dialog :title="relationshipRulesTitle"  :visible.sync="relationshipRulesDialogVisible"  size="180%"  :before-close="changeCancle">
           <div style="width: 287px;position: relative;float: right;">
                <div style="width:216px;float:left;;padding: 10px;padding-bottom:15px;">
                <el-input placeholder="请输入规则编号或规则名称"  @keyup.enter.native="selectrelationshipRulesMethod" v-model="selectrelationshipRulesValue"></el-input>
                </div>
                <div style="width:50px;float:left;padding: 10px;padding-bottom:15px">
                    <el-button type="primary" @click="selectrelationshipRulesMethod">查询</el-button>
                </div>
           </div>
            <div >
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
                    <el-table-column prop="agentPaymentDifinition" label="规则类型" width="100">
                        <template scope="scope">
                            {{scope.row.agentPaymentDifinition=='ZUIPIN_EXTEND' ? '醉品拓展' :'业务拓展'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间"  width="120">
                    <template  scope="scope">
                            <span>{{ formatDayDate(scope.row.createTime)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ruleNo" label="操作"  width="120"  align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.id == editForm.ruleId">  
                               <span style="color:#909399" disabled="disabled"> 已选</span>
                            </span> 
                            <span v-else>
                                <span style="color:#409EFF" @click="selectRuleNo(scope.row.ruleNo,scope.row.businessExtendsRuleName,scope.row.id)">选择</span>
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
import addressComponent from '../components/address2.vue';
import axios from 'axios';
import $ from 'jquery';
export default {
    data(){
        return{
            currentPage: 1,
            totalSize: 0,
            pageSize: 30,
            editForm: {
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
                    isShow: '',
                    salesMan: '',
                    operator: '',
                    salesManId: '',
                    operatorId: '',
                    annualPurchasePerformance:'',
                    annualExtendPerformance:'',
                    extendSuperType:'ZUIPIN',
                    superAreaClass:'',
                    extendSuperNo:'',  //扩展上级
                    extendSuperName:'',   //扩展上级编号
                    extendSuperNoName:'',  //扩展上级姓名
                    areaClass:'',
                    superAgentGradeId:'',
                    state:'',
                    ruleId:'',    //规则
                    ruleTitle:'',                    
            },
            isDisable:false,
            levelArray: [], //代理商等级数组,
            areaClassArray: [{   //类别等级数组,
                    value: 'S',
                    name: 'S',
                    num:8,
                },
                {
                    value:'A',
                    name: 'A',
                    num:6,
                },
                {
                    value: 'B',
                    name: 'B',
                    num:4,
                },
                {
                    value: 'C',
                    name: 'C',
                    num:4,
                }
            ],
            phoneLength: 11,
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     },
            // },
            flage:true,
            areaClassFlag: true,
            relationshipRulesDialogVisible:false,
            relationshipRulesForm:[],
            relationshipRulesTitle:'',
            descInputValue:'', 
            selectrelationshipRulesValue:'', //查询规则关系的值           
        }
    },
    components: {
        addressComponent
    },
    methods:{
        formatDayDate(date){
            return Utils.formatDayDate(date)
        },         
        //获得区域等级等级
        getAreaName(){
            // console.log(this.$refs.editAgentAddress.getData().cityName)
            
            const self = this;
            //获取区域等级列表
            let area = self.$refs.editAgentAddress.getData().cityName  || self.editForm.areaClass
            let url = '/api/shop/shopManage/getAreaClassByAreaName.jhtml?areaName=' + area
            self.$ajax.post(url, {}).then(function (response) {
                // console.log(response);
                if (response.data.success == 1) {
                        const data = response.data.result
                    if(!self.flage){
                         self.editForm.areaClass = data.areaClass 
                    }
                    for(let item of self.areaClassArray){
                        if(item.value == self.editForm.areaClass){
                            // 判断店铺数传值是否为null 是的话为0
                            self.editForm.annualExtendPerformance= self.editForm.annualExtendPerformance=='null'?"0":(( self.areaClassFlag && String(self.editForm.annualExtendPerformance)  ) || item.num)
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
        //改变店铺拓展数
        changeAnnualExtendPerformance(){
            this.flage = false;
        },
        //提交字段校验
        testData(data, editAddress, editAgentAddress, editBelongAddress) {
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
            if (!data.signedStartTime && !data.signedEndTime) {
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
            if(!editAddress){
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
            if(data.agentGradeId ==266  || data.shopType == 'SELF_SUPPORT'  && data.agentGradeId ==31  || data.shopType == 'SELF_SUPPORT'){
                 if (!editBelongAddress.provinceCode || !editBelongAddress.cityCode || !editBelongAddress.areaCode) {
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
                if (!editAgentAddress.provinceCode || !editAgentAddress.cityCode || !editAgentAddress.areaCode) {
                    self.loading = false;
                    self.$message({
                        message: '代理区域不得为空',
                        type: 'error'
                    })
                    return false
                } else {
                    if (editAgentAddress.cityCode == 1) {
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
                if(!data.annualPurchasePerformance && !data.annualPurchasePerformance==0 ){
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
                self.loading = false;
                self.$message({
                    message:'业务人员为必填项',
                    type:'error'
                })
                return false;
            }
            return true
        },        
        //checksession                
        checkSession() {
            const self = this;
            if (window.sessionStorage) {
                let nowDate = new Date().getTime();
                let time = (nowDate - sessionStorage.haha) / 1000;
                //超过30秒没操作，重新登录
                if (time > 1800) {
                    self.$router.push("/login");
                    self.$message({
                        message: "登录超时，请重新登录"
                    });
                    return false;
                } else {
                    sessionStorage.haha = nowDate;
                    return true;
                }
            }
        },
        getUri() {
            if (document.cookie) {
                var cookie = document.cookie.split(";");
                for (var index = 0; index < cookie.length; index++) {
                    var cookies = cookie[index].split("=");
                    if (cookies[0] == "adminUri") {
                        return cookies[1];
                    }
                }
            }
        },
        goBack() {
            this.$confirm(`你确定要放弃修改吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push('/storeManage');
                this.$message('取消成功')
            })
        },
        //搜索上级代理商
        extendSuperNoQuerySearchAsync(queryString, callback){
            // queryString = this.editForm.extendSuperNo ? '' : queryString;
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
        // 确认修改店铺
        editAgent() {
            const self = this;
            if (!self.checkSession()) return;
            self.loading = true;
            const data = self.editForm;
            console.log(data)
            console.log(self.editForm.ruleId)

            let editAddress = self.$refs.editAddress.getData();
            let editAgentAddress =(data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? self.$refs.editAgentAddress.getData() : null;

            // console.log(editAgentAddress);

            let editBelongAddress = (data.agentGradeId ==31 || data.agentGradeId ==266) || data.shopType == 'SELF_SUPPORT' ?  self.$refs.editBelongAddress.getData() : null;

            if (!self.testData(data, editAddress, editAgentAddress, editBelongAddress)) return;

            let datas;
            //代理商
            if(data.shopType=='AGENT'){
                //单店
                if(data.agentGradeId==31){
                    datas={
                        'shop.id': data.id,
                        'shop.shopName': data.shopName,
                        'shop.name': data.name,
                        'shop.phone': data.phone,
                        'shop.signedTime': data.signedTime,

                        'shop.provinceCode': editAddress.provinceCode,
                        'shop.cityCode': editAddress.cityCode,
                        'shop.countyCode': editAddress.areaCode,
                        
                        'shop.address': data.address,
                        'shop.city': data.city,
                        'shop.shopType': data.shopType,
                        'shop.ruleId': data.ruleId || '',                    
                        
                        'shop.agentGradeId': data.agentGradeId,                    
                        'shop.belongProvince':editBelongAddress  ? editBelongAddress.provinceCode : "",
                        'shop.belongCity':editBelongAddress  ? editBelongAddress.cityCode : "",
                        'shop.belongCountry':editBelongAddress ? editBelongAddress.areaCode : "",
                    
                        'shop.isShow': data.isShow,
                        'shop.operator': data.operator ,
                        'shop.salesMan': data.salesMan,
                        'shop.salesManId': data.salesManId || '',
                        'shop.operatorId': data.operatorId || '',
                        'shop.annualPurchasePerformance': String(data.annualPurchasePerformance) || '',
                        'shop.annualExtendPerformance': '' , 
                        'shop.areaClass':data.areaClass  || '',
                        'shop.extendSuperType': data.agentGradeId == 265 ? '' : (data.extendSuperType || ''),
                        'shop.extendSuperNo':  (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ?  '' :  (data.extendSuperNo || ''),
                        'shop.superAgentGradeId': (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ? '' :  (data.superAgentGradeId == '区域' ? 265 : (data.superAgentGradeId == '单店'  ? 31 : 266 )) || '',
                    }
                }
                //区域
                if(data.agentGradeId==265){
                    datas = {
                        'shop.id': data.id,
                        'shop.shopName': data.shopName,
                        'shop.name': data.name,
                        'shop.phone': data.phone,
                        'shop.signedTime': data.signedTime,

                        'shop.provinceCode': editAddress.provinceCode,
                        'shop.cityCode': editAddress.cityCode,
                        'shop.countyCode': editAddress.areaCode,

                        'shop.agentGradeId': data.agentGradeId,                    
                        'shop.agentProvince': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.provinceCode : '',
                        'shop.agentCity': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.cityCode : '',
                        'shop.agentCounty': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.areaCode : '',


                        'shop.annualPurchasePerformance': String(data.annualPurchasePerformance) || '',
                        'shop.annualExtendPerformance': data.annualExtendPerformance  || '', 
                        'shop.areaClass':data.areaClass  || '',
                        'shop.ruleId': data.ruleId,

                        'shop.address': data.address,
                        'shop.city': data.city,
                        'shop.shopType': data.shopType,
                        'shop.isShow': data.isShow,
                        'shop.operator': data.operator,
                        'shop.salesMan': data.salesMan,
                        'shop.salesManId': data.salesManId || '',
                        'shop.operatorId': data.operatorId || '',
                    }
                }
                //微店
                if(data.agentGradeId ==266){
                    datas={
                        'shop.id': data.id,
                        'shop.shopName': data.shopName,
                        'shop.name': data.name,
                        'shop.phone': data.phone,
                        'shop.signedTime': data.signedTime,

                        'shop.provinceCode': editAddress.provinceCode,
                        'shop.cityCode': editAddress.cityCode,
                        'shop.countyCode': editAddress.areaCode,
                        
                        'shop.agentGradeId': data.agentGradeId,                                        
                        'shop.belongProvince':editBelongAddress  ? editBelongAddress.provinceCode : "",
                        'shop.belongCity':editBelongAddress  ? editBelongAddress.cityCode : "",
                        'shop.belongCountry':editBelongAddress ? editBelongAddress.areaCode : "",


                        'shop.extendSuperType': data.agentGradeId == 265 ? '' : (data.extendSuperType || ''),
                        'shop.extendSuperNo':  (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ?  '' :  (data.extendSuperNo || ''),
                        'shop.superAgentGradeId': (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ? '' :  (data.superAgentGradeId == '区域' ? 265 : (data.superAgentGradeId == '单店'  ? 31 : 266 )) || '',


                        'shop.agentGradeId': data.agentGradeId,                    
                        'shop.address': data.address,
                        'shop.city': data.city,
                        'shop.shopType': data.shopType,
                    
                        'shop.isShow': data.isShow,
                        'shop.operator': data.operator,
                        'shop.salesMan': data.salesMan,
                        'shop.salesManId': data.salesManId || '',
                        'shop.operatorId': data.operatorId || '',
                        'shop.ruleId': data.ruleId,

                        'shop.annualPurchasePerformance': String(data.annualPurchasePerformance) || '',
                        'shop.annualExtendPerformance': '', 
                        'shop.areaClass':data.areaClass  || '',
                        'shop.extendSuperType': data.agentGradeId == 265 ? '' : (data.extendSuperType || ''),
                        'shop.extendSuperNo':  (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ?  '' :  (data.extendSuperNo || ''),
                        'shop.superAgentGradeId': (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ? '' :  (data.superAgentGradeId == '区域' ? 265 : (data.superAgentGradeId == '单店'  ? 31 : 266 )) || '',
                    }
                    
                }
            }
            
            //直营
            if(data.shopType=='SELF_SUPPORT'){
                
                datas={
                        'shop.id': data.id,
                        'shop.shopName': data.shopName,
                        'shop.name': data.name,
                        'shop.phone': data.phone,
                        'shop.signedTime': data.signedTime,

                        'shop.provinceCode': editAddress.provinceCode,
                        'shop.cityCode': editAddress.cityCode,
                        'shop.countyCode': editAddress.areaCode,
                        
                        'shop.address': data.address,
                        'shop.city': data.city,
                        'shop.shopType': data.shopType,
                        'shop.agentGradeId':265,                         
                        'shop.isShow': data.isShow,
                        'shop.operator': data.operator,
                        'shop.salesMan': data.salesMan,
                        'shop.salesManId': data.salesManId || '',
                        'shop.operatorId': data.operatorId || '',
                        'shop.ruleId': data.ruleId || '',
                        'shop.belongProvince':editBelongAddress  ? editBelongAddress.provinceCode : "",
                        'shop.belongCity':editBelongAddress  ? editBelongAddress.cityCode : "",
                        'shop.belongCountry':editBelongAddress ? editBelongAddress.areaCode : "",
                    }

            }
            //请求
            self.$ajax({
                url: '/api/shop/shopManage/modify.jhtml',
                method: 'post',
                data:datas,
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
                // console.log(response)
                if (response.data.success!=1) {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                    return  false;             
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'success'
                    })
                    setTimeout(function () {
                        self.$router.push({ name:'storeDetail',params:{shopId:self.editForm.shopId} })
                    }, 1000)
                }
            }).catch(function (err) {
                self.loading = false;
            });
        },
        operatorQuerySearchAsync(queryString, callback) {
            queryString = !this.editForm.operator ? '' : queryString;
            var list = [{}];
            //调用的后台接口
            let url = '/api/shop/shopManage/searchSysUser.jhtml?userUnit=operator' + '&userName=' + queryString;
            //从后台获取到对象数组
            axios.get(url).then((response) => {
                //在这里为这个数组中每一个对象加一个字段, 因为autocomplete只识别字段并在下拉列中显示
                for (let i of response.data.result) {
                    i.value = i.userName;  //将CUSTOMER_NAME作为
                }
                if (!queryString) {
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
            queryString = !this.editForm.salesMan ? '' : queryString;
            var list = [{}];
            //调用的后台接口
            let url = '/api/shop/shopManage/searchSysUser.jhtml?userUnit=businessMan' + '&userName=' + queryString;
            //从后台获取到对象数组
            axios.get(url).then((response) => {
                //在这里为这个数组中每一个对象加一个字段, 因为autocomplete只识别字段并在下拉列中显示
                for (let i of response.data.result) {
                    i.value = i.userName;  //将CUSTOMER_NAME作为
                }
                if (!queryString) {
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
        handleOperatorSelect(item) {
            this.editForm.operatorId = item.id;
            this.editForm.operator  = item.userName;        
            //do something
        },
        handleSalesManSelect(item) {
            this.editForm.salesManId = item.id;
            this.editForm.salesMan =  item.userName;
            //do something
        },
        handleExtendSuperNoSelect(item){
            this.editForm.extendSuperNo = item.shopNo;
            this.editForm.extendSuperName = item.name;
            
            this.editForm.extendSuperNoName = item.shopNo + ' ' + item.name
            
            this.editForm.superAgentGradeId = item.superAgentGradeId == 265 ? '区域' : (item.superAgentGradeId == 31 ? '单店' : '微店');
            this.editForm.state = item.state;
        },
        deleteOperator(){
            this.editForm.operator='';
        },
        deleteSalesMan(){
            this.editForm.salesMan='';     
        },
        //气泡提示
        annualExtendPerformanceTitple(){
            let self = this
            if( !Number(self.editForm.annualExtendPerformance) && !Number(self.editForm.annualPurchasePerformance)){
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
            if(!Number(self.editForm.annualPurchasePerformance) ){
                    self.$refs.annualPurchasePerformance.showPopper=true
                    // setTimeout(function(){
                    //     self.$refs.annualPurchasePerformance.showPopper=false
                    // },3000)
            }else{
                    self.$refs.annualPurchasePerformance.showPopper=false
                
            }

        },
        //清除代理商编号、类别
        deleteExtendSuperNo(){
            this.editForm.areaClass = '';
        },
        deleteExtendSuperNoName(){
            this.editForm.extendSuperNo = '';
            this.editForm.superAgentGradeId = '';
            this.editForm.extendSuperNoName = '';
            // this.editForm.areaClass = '';
        },
        areaClassNum(val){
            this.editForm.annualExtendPerformance = val;
        },
        //重置直营店铺不要的项
        deleteSelfSupport(){
            const self = this;
            self.editForm.annualPurchasePerformance =  '';
            self.editForm.agentProvince  = '' ;
            self.editForm.agentCity = '' ;
            self.editForm.agentCounty = '' ;
            self.editForm.belongProvince = ''
            self.editForm.belongCity = '' 
            self.editForm.belongCountry = '' 
            self.editForm.extendSuperNo = '' 
            self.editForm.superAgentGradeId = '' 
            self.editForm.areaClass  = ''

        },
        ruleTitleTitple(){
            let self = this
            self.$refs.rule.showPopper=true
            setTimeout(function(){
                self.$refs.rule.showPopper=false
            },2000)
        },
        //打开规则关系弹窗
        onOpenRelationshipRulesDialogVisible(val){
            this.relationshipRulesDialogVisible = true;
            this.onRelationshipRulesDialogVisible(1);
        },        
        //打开规则关系弹窗
        onRelationshipRulesDialogVisible(value){
            this.relationshipRulesTitle="规则选择（代理商编号："+ this.editForm.shopNo +"）" 
            const self = this;
            self.loading = true;
            self.$ajax({
                url:'/api/http/businessExtendsRule/getBusinessExtendsRuleList.jhtml',
                method: 'post',
                data:{
                    'pager.pageIndex': value,
                    'pager.pageSize': self.pageSize,
                    'businessExtendsRuleVo.ruleName':self.selectrelationshipRulesValue || '',
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
        //查询关系
        selectrelationshipRulesMethod(){
            this.onRelationshipRulesDialogVisible(1);
        },
        //改变规则关系页码
        onRelationshipRulesDialogChange(val){
            this.currentPage = val;
            this.onRelationshipRulesDialogVisible(val);
        },
        //选择关系
        selectRuleNo(ruleNo,businessExtendsRuleName,id){
            this.editForm.ruleTitle = ruleNo + ' ' +  businessExtendsRuleName
            this.editForm.ruleId = id
        },
        //删除规则
        deleteRuleTitle(){
            this.editForm.ruleTitle = '';
            this.editForm.ruleId = '';
            this.editForm.businessExtendsRuleName = '';
            this.editForm = Object.assign({},this.editForm)

        },
        changeCancle(){
            this.relationshipRulesDialogForm = [];
            this.relationshipRulesDialogVisible = false; 
            this.currentPage = 1;
            this.selectrelationshipRulesValue = '';  
            let self = this
            if(self.editForm.ruleTitle){
                self.$refs.rule.showPopper=true
            }
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
  
    created() {
        if (!this.checkSession()) return;
        this.uri = this.getUri();
        //获取id
        var src = window.location.href.split("/");
        this.id = src[5];
        const self = this; 

        self.loading = true;

        //获取代理商等级列表
        self.$ajax.post('/api/http/shop/queryAgentGradeList.jhtml', {}).then(function (response) {
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
        // 获取代理商信息
        self.$ajax.get('/api/http/shop/searchShop.jhtml', {
            params: {
                'shopId': src[5],
            }
        }).then(function (response) {
            self.loading = false;
            self.editForm = response.data.result;

            // console.log(self.editForm)
            // console.log(self.editForm.businessExtendsRule)
            //匹配规则
            if(!self.editForm.businessExtendsRule){
                self.editForm.ruleTitle = ''
            }else{
                 self.editForm.ruleTitle = self.editForm.businessExtendsRule.ruleNo + ' '+ self.editForm.businessExtendsRule.businessExtendsRuleName;
            }

            if(self.flage ){
                self.editForm.areaClass = response.data.result.areaClass;
            }else{
                self.editForm.areaClass = self.editForm.agentCityName        
            }
            self.editForm.extendSuperType = self.editForm.extendSuperType || 'ZUIPIN'

            if(self.editForm.shopType=='SELF_SUPPORT'){
                    self.areaClassFlag = false;
            }
            if(self.editForm.superAgentGradeId){
                self.editForm.superAgentGradeId =  response.data.result.superAgentGradeId == 265 ? '区域' : (response.data.result.superAgentGradeId == 31 ? '单店' : '微店') 
            }

            if(self.editForm.ruleId == null){
                // console.log('ok')
                self.editForm.ruleId = '' 
            }
            //拓展上级
            // console.log(self.editForm.extendSuperNo )
            if(self.editForm.extendSuperNo==null){
                self.editForm.extendSuperNoName = '';
            }else{
                self.editForm.extendSuperNoName = response.data.result.extendSuperShop.shopNo +' '+ response.data.result.extendSuperShop.name
            }

        }).catch(function (err) {
            self.loading = false;
            console.log(err);
        });

        
   
    },
    watch:{
        'editForm.areaClass'(){
            for(let item of this.areaClassArray){
                if(item.value == this.editForm.areaClass){
                    this.editForm.annualExtendPerformance=( this.areaClassFlag && String(this.editForm.annualExtendPerformance)  ) || item.num
                }
            }
        },  
        'editForm.annualPurchasePerformance'(newVal,oldVal){
            if(newVal==''){
                newVal ='';
            }else{
                if(Utils.digitTwo(newVal)){
                    
                    this.$nextTick(() => {
                            this.editForm.annualPurchasePerformance = newVal
                            oldVal = newVal
                        })

                }else{
                    this.$nextTick(() => {
                        this.editForm.annualPurchasePerformance = oldVal
                        })               
                }
            }
        },
        'editForm.annualExtendPerformance'(newval,oldval){
            if(newval==''){
                newval ='';
            }else{
                if(Utils.digitZero(newval)){
                    this.$nextTick(() => {
                            this.editForm.annualExtendPerformance = newval
                            oldval = newval
                    })
                }else{
                    this.$nextTick(() => {
                        this.editForm.annualExtendPerformance = oldval
                    })               
                }
            }            
        }               
    }
}
</script>
<style >
    .grayColor{
          color: gray
    }
</style>
<style lang='less' scoped>
@import url("../assets/less/storeEdit.less");

#editStore {
    width: 98%;
    margin: 1%;
    padding: 20px;
    background-color: #ffffff;
    .content_title {
        margin: 0px 10px 10px 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid;
        h2 {
            display: inline;
            font-weight: 600;
        }
        .content_closeBtn {
            font-size: 19px;
            float: right;
            color: #0000ff9e;
            cursor: pointer;
        }
    }
    .delete_left {
        background: url("../assets/images/zph_close.jpg") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 164px;
        z-index: 1000;
    }
    .delete_right {
        background: url("../assets/images/zph_close.jpg") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 164px;
        z-index: 1000;
    }
    .arrowPng{
        background: url("../assets/images/arrow.jpg") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 164px;
        z-index: 1000;
    }    
}
.mark{
    font-family: 'MicrosoftYaHei';
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #999999;
}

</style>
