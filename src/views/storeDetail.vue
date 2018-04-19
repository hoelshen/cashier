<template>
   <div id="detailStore">
        <el-row class="content_title">
            <h2>基本信息</h2>
            <div class="content_closeBtn" @click="goBack">X</div>
        </el-row>
    <!-- 修改店铺及店铺详情弹窗 start -->
        <!-- <el-dialog :title="editFormTitle" :visible.sync="editDialogVisible" @close="resetEditForm">
        <el-form :model="addForm" label-width="120px" ref="addForm"> -->
            
        <el-form :model="editForm" label-width="120px" ref="editForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="店铺类型：">
                        <el-radio  v-model="editForm.shopType" label="AGENT">代理商</el-radio>
                        <el-radio  v-model="editForm.shopType" label="SELF_SUPPORT">直营店铺</el-radio>
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

                <el-col :span="24" v-show="editForm.agentGradeId=='265'&&editForm.shopType!='SELF_SUPPORT'">
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
                        <router-link :to="{ name: 'prepaidManage', params: { shopNo:editForm.shopNo,name:editForm.name}}">点击查看</router-link>
                    </el-form-item>
                </el-col>
                <el-col class="xg-search-yy-wrap" :span="12">
                    <el-form-item label="运营人员">
                        <span class="delete_left" v-if="!(editForm.operator==='')" @click="deleteOperator"></span>
                        <el-autocomplete v-model="editForm.operator"  :fetch-suggestions="operatorQuerySearchAsync" @select="handleoperatorSelect" placeholder="运营人员" icon="caret-bottom" :disabled="isDisable">
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col class="xg-search-yw-wrap" :span="12" :disabled="isDisable">
                    <el-form-item label="业务人员">
                        <span class="delete_right" v-if="!(editForm.salesMan==='')" @click="deleteSalesMan"></span>
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
        <!-- 修改店铺及店铺详情弹窗 end -->
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
                    operator2: '',
                    operatorId: '',
                    salesMan: '',
                    salesMan2: '',                
                    salesManId: '',
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
    methods:{
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
                        // console.log(data.salesMan)
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
                this.$confirm(`你确定要放弃添加吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/storeManage');
                    this.$message('取消成功')
                })
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
                // console.log(data)
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
            deleteOperator(){
                this.addForm.operator='';
                this.editForm.operator='';
            },
            deleteSalesMan(){
                this.addForm.salesMan='';
                this.editForm.salesMan='';
                
            }
        },
        created() {
            if (!this.checkSession()) return;
            this.uri = this.getUri();
            //获取id
            var src = window.location.href.split("/");
            this.id = src[5];
            console.log(src)
            console.log(src[5])
            const self = this;        
            // 获取代理商信息
            self.$ajax.get('/api/http/shop/searchShop.jhtml', {
                params: {
                    'shopId': src[5],
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
        }
}
</script>
<style lang='less' scoped>
#detailStore {
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
}

</style>
