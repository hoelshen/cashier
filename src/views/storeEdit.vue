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
            </el-row>
            <el-row>
               <!--第二行-->
                <el-col :span="8">
                    <el-form-item label="店铺类型：">
                        <el-radio v-model="editForm.shopType" label="AGENT">代理商</el-radio>
                        <el-radio v-model="editForm.shopType" label="SELF_SUPPORT" @click.native="deleteSelfSupport">直营店铺</el-radio>
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

                <el-col :span="8">
                    <el-form-item label="代理商状态：" disabled>
                        <el-col :span="12">
                            {{ editForm.state	=== 1 ? '禁用' : '启用' }}
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <!--第三行-->
         
                <el-col :span="8">
                    <el-form-item label="合同签约日期：">
                        <el-date-picker v-model="editForm.signedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"  disabled>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="年度业绩目标：" v-show="editForm.shopType!='SELF_SUPPORT'">
                        <el-input v-model="editForm.annualPurchasePerformance"  placeholder="进货业绩"></el-input>
                    </el-form-item>
                  
                </el-col>
                <el-col :span="6">
                      <el-form-item  v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                        <el-input v-model="editForm.annualExtendPerformance"  placeholder="">
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
                    <el-form-item label="代理商等级：" v-show="editForm.shopType!='SELF_SUPPORT'">
                        <el-select v-model="editForm.agentGradeId" placeholder="代理商等级" clearable>
                            <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index" @click.native="deleteExtendSuperNo"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                <!--第五行-->
                <el-col :span="16" v-show="(editForm.agentGradeId=='266'&&editForm.shopType!='SELF_SUPPORT')||(editForm.agentGradeId=='31'&&editForm.shopType!='SELF_SUPPORT')">
                    <el-form-item label="所属区域：">
                        <addressComponent ref='editBelongAddress' :provinceCode="editForm.belongProvince" :cityCode="editForm.belongCity " :areaCode="editForm.belongCountry"  :isDetail="false" />   
                    </el-form-item>
                </el-col>
                <el-col :span="16" v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                    <el-form-item label="代理区域：">
                        <addressComponent  :provinceCode="editForm.agentProvince" :cityCode="editForm.agentCity" :areaCode="editForm.agentCounty"  ref='editAgentAddress' v-on:getAreaName="getAreaName" :isDetail="false"  @click.native="changeAnnualExtendPerformance"/>   
                    </el-form-item>
                
                </el-col>
                <el-col :span="4"  v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                    <el-form-item :span="2" label="类别：" >
                            <el-select v-model="editForm.areaClass" placeholder="类别"   clearable>
                                <el-option v-for="item in areaClassArray" :key="item.index" :label="item.name" :value="item.value"></el-option>
                            </el-select>                    
                            <!-- <el-input  v-model="editForm.areaClass"  style="width:50px"></el-input> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                    <el-form-item label="收件地址：">
                        <addressComponent :provinceCode="editForm.provinceCode" :cityCode="editForm.cityCode" :areaCode="editForm.countyCode" ref='editAddress' :isDetail="false" />
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="24">
                    <el-form-item label="详细地址：">
                        <el-input v-model="editForm.address" placeholder="详细地址"></el-input>
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
                <el-col :span="8"  v-show="(editForm.agentGradeId=='266'&&editForm.shopType!='SELF_SUPPORT')||(editForm.agentGradeId=='31'&&editForm.shopType!='SELF_SUPPORT')">
                    <el-form-item label="括展上级：">
                            <el-radio v-model="editForm.extendSuperType" label="ZUIPIN" >醉品</el-radio>
                            <el-radio v-model="editForm.extendSuperType" label="AGENT" >代理商</el-radio>                            
                    </el-form-item>
                </el-col>
                <el-col :span="8"  v-if="(editForm.agentGradeId=='31' || editForm.agentGradeId=='266') && editForm.extendSuperType!='ZUIPIN'">
                    <el-form-item  :span="4"  label="上级编号/姓名" >
                        <span class="delete_left" v-if="!(editForm.extendSuperNo==='')" @click="deleteExtendSuperNo" style="left: 164px;"></span>
                        <el-autocomplete v-model="editForm.extendSuperNo" :fetch-suggestions="extendSuperNoQuerySearchAsync" @select="handleExtendSuperNoSelect" placeholder="可输入查找" icon="caret-bottom">
                            <span class="search_left"></span>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="4"   v-if="(editForm.agentGradeId=='31' || editForm.agentGradeId=='266') && editForm.extendSuperType!='ZUIPIN'">
                    <el-form-item :span="4" label="上级代理商等级:">
                            <el-input v-model="editForm.superAgentGradeId"  disabled></el-input>   
                    </el-form-item>
                 </el-col>
            </el-row>

            <el-row>
                <el-col class="search-yy-wrap" :span="12">
                    <el-form-item label="运营人员">
                        <span class="delete_left" v-if="editForm.operator" @click="deleteOperator"></span>     
                        <el-autocomplete v-model="editForm.operator" :fetch-suggestions="operatorQuerySearchAsync" @select="handleOperatorSelect" placeholder="可输入查找" icon="caret-bottom">    
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col class="search-yw-wrap" :span="12">
                    <el-form-item label="业务人员">
                        <span class="delete_right" v-if="!(editForm.salesMan==='')" @click="deleteSalesMan"></span>                       
                        <el-autocomplete v-model="editForm.salesMan" :fetch-suggestions="salesManQuerySearchAsync" @select="handleSalesManSelect" placeholder="可输入查找" icon="caret-bottom">
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
                <el-button type="primary" @click="editAgent">保存</el-button>
                <el-button @click="goBack">取消</el-button>
            </el-row>
        </el-form>
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
                    extendSuperNo:'',
                    areaClass:'',
                    superAgentGradeId:'',
                    state:''
            },
            isDisable:false,
            levelArray: [], //代理商等级数组,
            areaClassArray: [{   //类别等级数组,
                    value: 'S',
                    name: 'S'
                },
                {
                    value:'A',
                    name: 'A'
                },
                {
                    value: 'B',
                    name: 'B'
                },
                {
                    value: 'C',
                    name: 'C'
                }
            ],
            phoneLength: 11,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            flage:true,                
        }
    },
    components: {
        addressComponent
    },
    methods:{
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
                    self.editForm.areaClass = data.areaClass
                    if(!self.flage){
                        self.editForm.annualExtendPerformance =   data.shopNum
                    }
                    // console.log(self.editForm.annualExtendPerformance)
                    // if(self.editForm.annualExtendPerformance){
                    //         console.log('ok')
                    // }

                    // self.editForm.annualExtendPerformance = response.data.result.annualExtendPerformance  
                    // console.log(self.editForm.areaClass)
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
            console.log('ok')
        },
        //提交字段校验
        testData(data, Address, AgentAddress, BelongAddress ) {
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
            //所属区域判断
            if ((data.agentGradeId == 266 || data.agentGradeId == 31) && data.shopType != 'SELF_SUPPORT') {
                if (!BelongAddress.provinceCode || !BelongAddress.cityCode || !BelongAddress.areaCode) {
                    // debugger
                    self.loading = false;
                    self.$message({
                        message: '所属区域不得为空',
                        type: 'error'
                    })
                    return false
                } else {
                    if (BelongAddress.cityCode == 1) {
                        self.loading = false;
                        self.$message({
                            message: '请选择具体所属城市',
                            type: 'error'
                        })
                        return false
                    }
                }

            }

            //年度业绩目标：
            // console.log(data.annualPurchasePerformance)

            if(!String(data.annualPurchasePerformance) && data.shopType != 'SELF_SUPPORT' ){
                self.loading = false;
                self.$message({
                    message: '年度业绩不得为空',
                    type: 'error'
                })                  
                
                return false;
              
            }
        
            // 年度店铺拓展
         
            if( (data.agentGradeId == 265) && data.shopType != 'SELF_SUPPORT'){
                if(!String(data.annualExtendPerformance)){
                    self.loading = false;
                    self.$message({
                        message: '年度店铺不得为空',
                        type: 'error'
                    })
                    return false  
                }
            }

            //检验上级代理商的状态  
            // console.log(data.state)
            // console.log(data.extendSuperType)
            if( (data.agentGradeId==31 || data.agentGradeId==266) && data.extendSuperType!='ZUIPIN'){
                   if(data.state!=0){
                        self.loading = false;
                        self.$message({
                            message: '代理商的上级为禁用状态',
                            type: 'error'
                        })
                        return false     
                    }
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

            queryString = !this.editForm.extendSuperNo ? '' : queryString;
    
            var list = [{}];
            //调用的后台接口
            let url = '/api/shop/shopManage/getAgentVoList.jhtml?'
            //从后台获取到对象数组
            axios.get(url).then((response) => {
                //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示

                for (let i of response.data.result) {
                    i.value = i.name;  //将CUSTOMER_NAME作为value
                }

                // console.log(!queryString)

                if (!queryString) {
                    // console.log(response.data.result)

                    for (let item of response.data.result) {
                        list.push(item)
                    }
                    // console.log(list)
                    
                    callback(list);

                } else {

                    let QS = queryString.toLocaleLowerCase();

                    for (let item of response.data.result) {
                        if (item.shopNo.indexOf(QS) > -1 || item.name.indexOf(QS) > -1 || item.headPinyin.indexOf(QS) > -1) {
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

            let editAddress = self.$refs.editAddress.getData();

            // console.log(editAddress);
            let editAgentAddress =(data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? self.$refs.editAgentAddress.getData() : null;

            // console.log(editAgentAddress);

            let editBelongAddress = (data.agentGradeId ==31 || data.agentGradeId ==266 ) ?  self.$refs.editBelongAddress.getData() : null;
            // console.log((data.agentGradeId ==31 || data.agentGradeId ==266 ) )

            // console.log(editBelongAddress);
            
            // console.log(String(data.annualExtendPerformance))
            if (!self.testData(data, editAddress, editAgentAddress, editBelongAddress)) return;

            //请求
            self.$ajax({
                url: '/api/shop/shopManage/modify.jhtml',
                method: 'post',
                data: {
                    'shop.id': data.id,
                    'shop.shopName': data.shopName,
                    'shop.name': data.name,
                    'shop.phone': data.phone,
                    'shop.signedTime': data.signedTime,

                    'shop.provinceCode': editAddress.provinceCode,
                    'shop.cityCode': editAddress.cityCode,
                    'shop.countyCode': editAddress.areaCode,
                    
                    'shop.agentProvince': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.provinceCode : '',
                    'shop.agentCity': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.cityCode : '',
                    'shop.agentCounty': data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? editAgentAddress.areaCode : '',
                    
                    'shop.agentGradeId': data.agentGradeId,                    
                    'shop.address': data.address,
                    'shop.city': data.city,
                    'shop.shopType': data.shopType,
                   
                    'shop.isShow': data.isShow,
                    'shop.operator': data.operator,
                    'shop.salesMan': data.salesMan,
                    'shop.salesManId': data.salesManId || '',
                    'shop.operatorId': data.operatorId || '',
                    'shop.annualPurchasePerformance':String(data.annualPurchasePerformance) || '',
                    'shop.annualExtendPerformance':String(data.annualExtendPerformance) || '', 
                    'shop.areaClass':data.areaClass  || '',
                    'shop.extendSuperType': data.agentGradeId == 265 ? '' : (data.extendSuperType || ''),
                    'shop.extendSuperNo':  (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ?  '' :  (data.extendSuperNo || ''),
                    'shop.superAgentGradeId': (data.agentGradeId != 265 && data.extendSuperType=='ZUIPIN') ? '' :  (data.superAgentGradeId == '区域' ? 265 : (data.superAgentGradeId == '单店'  ? 31 : 266 )) || '',

                    'shop.belongProvince':editBelongAddress  ? editBelongAddress.provinceCode : "",
                    'shop.belongCity':editBelongAddress  ? editBelongAddress.cityCode : "",
                    'shop.belongCountry':editBelongAddress ? editBelongAddress.areaCode : "",

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
                // console.log(response)
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
                        self.$router.go(-1)
                        // self.handleCurrentChange(self.currentPage);
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
            this.editForm.superAgentGradeId = item.superAgentGradeId == 265 ? '区域' : (item.superAgentGradeId == 31 ? '单店' : '微店');
            this.editForm.state = item.state;
        },
        deleteOperator(){
            this.editForm.operator='';
        },
        deleteSalesMan(){
            this.editForm.salesMan='';     
        },
        //清除代理商编号、类别
        deleteExtendSuperNo(){

            // if(shopType == 'AGENT' && agentGradeId == 31){

            // }
            this.editForm.extendSuperNo = '';
            this.editForm.superAgentGradeId = '';
            this.editForm.areaClass = '';
        },
        //重置直营店铺不要的项
        deleteSelfSupport(){
            const self = this;
            // console.log('okj')
            // self.editForm = {
            //     // agentProvince:'',
            //     // agentCity:'',
            //     // agentCounty:'',
            //     // belongProvince:'',
            //     // belongCity:'',
            //     // belongCountry:'',
            //     // extendSuperNo:'',
            //     // superAgentGradeId:'',
            //     annualPurchasePerformance:'',
            // }

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

            // console.log(self.editForm)
        }
    
    },
    created() {
        if (!this.checkSession()) return;
        this.uri = this.getUri();
        //获取id
        var src = window.location.href.split("/");
        this.id = src[5];
        // console.log(src)
        // console.log(src[5])
        const self = this; 

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
        // 获取代理商信息
        self.$ajax.get('/api/http/shop/searchShop.jhtml', {
            params: {
                'shopId': src[5],
            }
        }).then(function (response) {
            self.loading = false;
            self.editForm = response.data.result;
            self.editForm.areaClass = self.editForm.agentCityName
            self.editForm.extendSuperType = self.editForm.extendSuperType || 'ZUIPIN'
            if(self.flage){
                    self.editForm.annualExtendPerformance = response.data.result.annualExtendPerformance  
                    
            }
            if(self.editForm.superAgentGradeId){
                self.editForm.superAgentGradeId =  response.data.result.superAgentGradeId == 265 ? '区域' : (response.data.result.superAgentGradeId == 31 ? '单店' : '微店');
                
            }
        }).catch(function (err) {
            self.loading = false;
            console.log(err);
        });
   
    },
}
</script>
<style lang='less' scoped>
@import url("../assets/less/storeAdd.less");

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
        background: url("../assets/images/zph_close.png") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 164px;
        z-index: 1000;
    }
    .delete_right {
        background: url("../assets/images/zph_close.png") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 164px;
        z-index: 1000;
    }
}

</style>
