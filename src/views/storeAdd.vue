<template>
    <div id="addStore"> 
      <!-- 新增店铺弹窗 start -->
        <el-form :model="addForm" label-width="120px" ref="addForm">
            <el-row class="content_title">
                <h2>基本信息</h2>
                <div class="content_closeBtn" @click="goBack">X</div>
            </el-row>
            <el-row>
                <!--第一行-->
                <el-col :span="8">
                    <el-form-item label="店铺名称：">
                        <el-input v-model="addForm.shopName" placeholder="店铺名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="代理商姓名：">
                        <el-input v-model="addForm.name" placeholder="代理商姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="代理商手机：">
                        <el-input v-model="addForm.phone" :maxlength='phoneLength' placeholder="代理商手机"></el-input>
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
                        <el-radio v-model="addForm.shopType" label="AGENT">代理商</el-radio>
                        <el-radio v-model="addForm.shopType" label="SELF_SUPPORT">直营店铺</el-radio>
                    </el-form-item>
                </el-col>
             
                <el-col :span="8">
                    <el-form-item label="展示选项：">
                        <el-radio v-model="addForm.isShow" label="1">展示</el-radio>
                        <el-radio v-model="addForm.isShow" label="0">不展示</el-radio>
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
                        <el-date-picker v-model="addForm.signedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item v-show="addForm.shopType!='SELF_SUPPORT'" label="年度业绩目标：">
                        <el-input v-model="addForm.annualPurchasePerformance"  placeholder="进货业绩"></el-input>
                    </el-form-item>
                  
                </el-col>
                <el-col :span="6">
                      <el-form-item  v-show="addForm.agentGradeId=='265'&&addForm.shopType!='SELF_SUPPORT'">
                        <el-input v-model="addForm.annualExtendPerformance"  placeholder="">
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
                    <el-form-item label="代理商等级：" v-show="addForm.shopType!='SELF_SUPPORT'">
                        <el-select v-model="addForm.agentGradeId" placeholder="代理商等级"  clearable>
                            <el-option v-for="item in levelArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
            </el-row>
            <el-row>
                <!--第五行-->
                <el-col :span="16" v-if="(addForm.agentGradeId=='266'&&addForm.shopType!='SELF_SUPPORT')||(addForm.agentGradeId=='31'&&addForm.shopType!='SELF_SUPPORT')">
                    <el-form-item label="所属区域：">
                        <addressComponent ref='addBelongAddress' :isDetail="false" />   
                    </el-form-item>
                </el-col>
                <el-col :span="16" v-if="addForm.agentGradeId=='265'&&addForm.shopType!='SELF_SUPPORT'">
                    <el-form-item label="代理区域：">
                        <addressComponent ref='addAgentAddress' v-on:getAreaName="getAreaName" :isDetail="false" />   
                    </el-form-item>
                </el-col>
                <el-col :span="4"  v-show="addForm.agentGradeId=='265'&&addForm.shopType!='SELF_SUPPORT'">
                    <el-form-item :span="2" label="类别：" >
                            <el-input  v-model="addForm.areaClass"  style="width:50px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                    <el-form-item label="收件地址：">
                        <addressComponent ref='addAddress' :isDetail="false" />
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="24">
                    <el-form-item label="详细地址：">
                        <el-input v-model="addForm.address" placeholder="详细地址"></el-input>
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
                <el-col :span="8"  v-show="(addForm.agentGradeId=='266'&&addForm.shopType!='SELF_SUPPORT')||(addForm.agentGradeId=='31'&&addForm.shopType!='SELF_SUPPORT')">
                    <el-form-item label="括展上级："> 
                            <el-radio v-model="addForm.extendSuperType" label="ZUIPIN">醉品</el-radio>
                            <el-radio v-model="addForm.extendSuperType" label="AGENT">代理商</el-radio>                            
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-show="(addForm.extendSuperType=='AGENT'&&addForm.shopType!='SELF_SUPPORT')||(addForm.extendSuperType=='31'&&addForm.shopType!='SELF_SUPPORT')">
                    <span class="delete_left" v-if="!(addForm.extendSuperNo==='')" @click="deleteExtendSuperNo" style="left: 826px;"></span>
                    <el-form-item  :span="4"  label="上级编号/姓名">
                        <el-autocomplete v-model="addForm.extendSuperNo" :fetch-suggestions="extendSuperNoQuerySearchAsync" @select="handleExtendSuperNoSelect" placeholder="可输入查找" icon="caret-bottom">
                            <span class="search_left"></span>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="4"  v-show="(addForm.extendSuperType=='AGENT'&&addForm.shopType!='SELF_SUPPORT')||(addForm.extendSuperType=='31'&&addForm.shopType!='SELF_SUPPORT')">
                    <el-form-item :span="4" label="上级代理商等级:">
                            <el-input v-model="addForm.superAreaClass"></el-input>   
                    </el-form-item>
                 </el-col>
            </el-row>

            <el-row>
                <el-col class="search-yy-wrap" :span="12">
                    <span class="delete_left" v-if="!(addForm.operator==='')" @click="deleteOperator"></span>
                    <el-form-item label="运营人员">
                        <el-autocomplete v-model="addForm.operator" :fetch-suggestions="operatorQuerySearchAsync" @select="handleOperatorSelect" placeholder="可输入查找" icon="caret-bottom">
                            <span class="search_left"></span>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col class="search-yw-wrap" :span="12">
                    <span class="delete_right" v-if="!(addForm.salesMan==='')" @click="deleteSalesMan"></span>
                    <el-form-item label="业务人员">
                        <el-autocomplete v-model="addForm.salesMan" :fetch-suggestions="salesManQuerySearchAsync" @select="handleSalesManSelect" placeholder="可输入查找" icon="caret-bottom">
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
                <el-button type="primary" @click="addAgent">保存</el-button>
                <el-button @click="goBack">取消</el-button>
            </el-row>
        </el-form>
        <!-- 新增店铺弹窗 end -->
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
                annualPurchasePerformance:'',
                annualExtendPerformance:'',
                extendSuperType:'ZUIPIN',
                superAreaClass:'',
                extendSuperNo:'',
                areaClass:'',
                belongProvince:'',
                belongCity:'',
                belongCountry:'',
            },
            levelArray: [], //代理商等级数组
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
    watch:{
        
    },
    methods:{
        //获得区域等级等级
        getAreaName(){
            // console.log(this.$refs.addAgentAddress.getData().cityName)
            
            const self = this;
            //获取区域等级列表

            let url = '/api/shop/shopManage/getAreaClassByAreaName.jhtml?areaName=' + self.$refs.addAgentAddress.getData().cityName
            self.$ajax.post(url, {}).then(function (response) {
                // console.log(response);
                if (response.data.success == 1) {
                    // console.log(response.data.result)
                    // console.log(self.addForm.areaClass)
                    self.addForm.areaClass = response.data.result

                    // console.log(self.addForm.areaClass)
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
        // 新增店铺
        addAgent() {
            const self = this;
            if (!this.checkSession()) return;
            self.loading = true;
            const data = self.addForm;
            let addAddress = self.$refs.addAddress.getData();
            let addBelongAddress = (data.agentGradeId ==31 || data.agentGradeId ==266 ) ?  self.$refs.addBelongAddress.getData() : null;
            // console.log(addBelongAddress)
            // let addAgentAddress =  data.shopType != 'SELF_SUPPORT' ? self.$refs.addAgentAddress.getData() : null;
            let addAgentAddress =  (data.agentGradeId ==265 && data.shopType != 'SELF_SUPPORT') ? self.$refs.addAgentAddress.getData() : null;  
            if (!this.testData(data, addAddress, addAgentAddress)) return;
            // console.log(addAgentAddress)
            let data1 = {
                    'shop.shopName': data.shopName,
                    'shop.name': data.name,
                    'shop.phone': data.phone,
                    'shop.signedTime': Utils.formatDayDate(data.signedTime),
                    'shop.agentGradeId': data.agentGradeId,
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
                    
                    'shop.extendSuperNo':data.extendSuperNo || '',
                    'shop.areaClass':data.areaClass || '',

                    'shop.belongProvince':addBelongAddress  ? addBelongAddress.provinceCode : "",
                    'shop.belongCity':addBelongAddress  ? addBelongAddress.cityCode : "",
                    'shop.belongCountry':addBelongAddress ? addBelongAddress.areaCode : "",

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
                console.log(response)
                if (response.data.result == 1) {
                    self.$message({
                        message: response.data.msg,
                        type: 'success'
                    })
                     setTimeout(function () {
                        self.$router.go(-1)
                    }, 1000)
                } else if(response.data.success == 0){
                    self.$message({
                        message: response.data.msg,
                        type: 'success'
                    })
                    setTimeout(function () {
                        self.$router.go(-1)
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
            // if(this.addForm.operator == queryString){
            //     this.addForm.operator2 = false;               
            // }      
            // queryString = !this.addForm.operator2 ? '' : queryString;
            // this.addForm.operator2 = true;


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
            // if(this.addForm.salesMan == queryString){
            //         this.addForm.salesMan2 = false;
            // }
            // queryString = !this.addForm.salesMan2 ? '' : queryString;
                 
            // this.addForm.salesMan2 = true;

            var list = [{}];
            //调用的后台接口
            let url = '/api/shop/shopManage/searchSysUser.jhtml?userUnit=businessMan' + '&userName=' + queryString;
            //从后台获取到对象数组
            axios.get(url).then((response) => {
                console.log()
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

            queryString = !this.addForm.extendSuperNo ? '' : queryString;
    
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
        //点击选中
        handleOperatorSelect(item) {
            this.addForm.operatorId = item.id;

            this.addForm.operator  = item.userName;

            //do something
        },
        handleSalesManSelect(item) {
            this.addForm.salesManId = item.id;

            this.addForm.salesMan =  item.userName;
            
            //do something
        },
        handleExtendSuperNoSelect(item){
                this.addForm.extendSuperNo = item.shopNo;
                this.addForm.superAreaClass = item.areaClass;
        },
        deleteExtendSuperNo(){
                this.addForm.extendSuperNo = '' ;
        },
        deleteOperator(){
            this.addForm.operator='';
        },
        deleteSalesMan(){
            this.addForm.salesMan='';    
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
    }
}
</script>
<style lang="less"  scoped>
#addStore {
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
        left: 289px;
        z-index: 1000;
    }
    .delete_right {
        background: url("../assets/images/zph_close.png") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        left:1100px;
        z-index: 1000;
    }

}

</style>

