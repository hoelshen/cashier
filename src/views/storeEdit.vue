<template>
  <div id="editStore">
    <!-- 修改店铺页面 start -->
        <el-form :model="editForm" label-width="120px" ref="editForm">
            <el-row class="content_title">
                <h2>基本信息</h2>
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
                        <el-radio v-model="editForm.shopType" label="SELF_SUPPORT">直营店铺</el-radio>
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
                    <el-form-item label="代理商状态">
                       ---
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <!--第三行-->
         
                <el-col :span="8">
                    <el-form-item label="合同签约日期：">
                        <el-date-picker v-model="editForm.signedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="年度业绩目标：">
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
                            <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                <!--第五行-->
                <el-col :span="16" v-show="(editForm.agentGradeId=='266'&&editForm.shopType!='SELF_SUPPORT')||(editForm.agentGradeId=='31'&&editForm.shopType!='SELF_SUPPORT')">
                    <el-form-item label="所属区域：">
                        <addressComponent ref='editAgentAddress' :isDetail="false" />   
                    </el-form-item>
                </el-col>
                <el-col :span="16" v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                    <el-form-item label="代理区域：">
                        <addressComponent  :provinceCode="editForm.agentProvince" :cityCode="editForm.agentCity" :areaCode="editForm.agentCounty"  ref='editAgentAddress' v-on:getAreaName="getAreaName" :isDetail="false" />   
                    </el-form-item>
                
                </el-col>
                <el-col :span="4"  v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
                    <el-form-item :span="2" label="类别：" >
                            <el-input  v-model="editForm.areaClass" disabled style="width:50px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
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
                            <el-radio v-model="editForm.extendSuperType" label="ZUIPIN">醉品</el-radio>
                            <el-radio v-model="editForm.extendSuperType" label="AGENT">代理商</el-radio>                            
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-show="(editForm.extendSuperType=='AGENT'&&editForm.shopType!='SELF_SUPPORT')||(editForm.extendSuperType=='31'&&editForm.shopType!='SELF_SUPPORT')">
                    <span class="delete_left" v-if="!(editForm.extendSuperNo==='')" @click="deleteExtendSuperNo" style="left: 826px;"></span>
                    <el-form-item  :span="4"  label="上级编号/姓名">
                        <el-autocomplete v-model="editForm.extendSuperNo" :fetch-suggestions="extendSuperNoQuerySearchAsync" @select="handleExtendSuperNoSelect" placeholder="可输入查找" icon="caret-bottom">
                            <span class="search_left"></span>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="4"  v-show="(editForm.extendSuperType=='AGENT'&&editForm.shopType!='SELF_SUPPORT')||(editForm.extendSuperType=='31'&&editForm.shopType!='SELF_SUPPORT')">
                    <el-form-item :span="4" label="上级代理商等级:">
                            <el-input v-model="editForm.superAreaClass"></el-input>   
                    </el-form-item>
                 </el-col>
            </el-row>

            <el-row>
                <el-col class="search-yy-wrap" :span="12">
                    <span class="delete_left" v-if="!(editForm.operator==='')" @click="deleteOperator"></span>
                    <el-form-item label="运营人员">
                        <el-autocomplete v-model="editForm.operator" :fetch-suggestions="operatorQuerySearchAsync" @select="handleOperatorSelect" placeholder="可输入查找" icon="caret-bottom">
                            <span class="search_left"></span>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col class="search-yw-wrap" :span="12">
                    <span class="delete_right" v-if="!(editForm.salesMan==='')" @click="deleteSalesMan"></span>
                    <el-form-item label="业务人员">
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
                    extendSuperType:'',
                    superAreaClass:'',
                    extendSuperNo:'',
                    areaClass:'',
                    
                },
                isDisable:false,
                levelArray: [], //代理商等级数组,
                phoneLength: 11,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                }
            },
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
              
                    self.editForm.areaClass = response.data.result

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
            //年度业绩为必填项
            if(!data.annualPurchasePerformance){
                self.loading = false;
                self.$message({
                    message:'年度业绩为必填项',
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

                console.log(!queryString)

                if (!queryString) {
                    console.log(response.data.result)

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
        // 修改店铺
        editAgent() {
            const self = this;
            if (!self.checkSession()) return;
            self.loading = true;
            const data = self.editForm;

            let editAddress = self.$refs.editAddress.getData();
            console.log(editAddress);
            let editAgentAddress = data.agentGradeId == 265 && data.shopType != 'SELF_SUPPORT' ? self.$refs.editAgentAddress.getData() : null;
            if (!self.testData(data, editAddress, editAgentAddress)) return;
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
                    'shop.shopType': data.shopType,
                    'shop.city': data.city,
                    'shop.isShow': data.isShow,
                    'shop.operator': data.operator,
                    'shop.salesMan': data.salesMan,
                    'shop.salesManId': data.salesManId || '',
                    'shop.operatorId': data.operatorId || '',
                    'shop.annualPurchasePerformance':data.annualPurchasePerformance || '',
                    'shop.annualExtendPerformance':data.annualExtendPerformance || '', 
                    'shop.extendSuperType':data.extendSuperType || '',
                    'shop.extendSuperNo':data.extendSuperNo || '',
                    'shop.areaClass':data.areaClass  || '',
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
            this.editForm.superAreaClass = item.areaClass;
        },
        deleteOperator(){
            this.editForm.operator='';
        },
        deleteSalesMan(){
            this.editForm.salesMan='';     
        },
        deleteExtendSuperNo(){
            this.editForm.extendSuperNo = '' ;
        },
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

            // let url = '/api/shop/shopManage/getAreaClassByAreaName.jhtml?areaName=' +  self.preAddress
            //     self.$ajax.post(url, {}).then(function (response) {
            //         if (response.data.success == 1) {
            //             self.editForm.areaClass = response.data.result
            //             console.log(self.editForm.areaClass)
            //             console.log('ok')
            //         } else {
            //             self.$message({
            //                 message: response.data.msg,
            //                 type: 'error'
            //             })
            //         }
            //     }).catch(function (err) {
            //         console.log(err);
            //     });
        }).catch(function (err) {
            self.loading = false;
            console.log(err);
        });
   
    },
}
</script>
<style lang='less' scoped>
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
        left: 288px;
        z-index: 1000;
    }
    .delete_right {
        background: url("../assets/images/zph_close.png") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left: 1100px;
        z-index: 1000;
    }
}

</style>
