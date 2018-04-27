<template>
<div>
    <div class="content">
        <!-- 搜索 start -->
        <div class="searchwrap">
            <el-form ref="form" label-width="100px" :model="searchData">
                <el-row :gutter="10" class="searchbar">
                    <el-col :span="5">
                        <el-form-item label="代理商手机：">
                            <el-input v-model="searchData.phone" @keyup.enter.native="onSubmit" placeholder="代理商手机" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="选择年度： ">
                            <el-date-picker value-format="yyyy" format="yyyy年" v-model="searchData.annualCycle" :picker-options="pickerOptions" type="year" placeholder="选择年度" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="核销状态：">
                            <el-select v-model="searchData.status" placeholder="核销状态" clearable>
                                <el-option v-for="item in stateArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="付款单号：">
                            <el-input v-model="searchData.payOrderNo" @keyup.enter.native="onSubmit" placeholder="付款单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                    </el-col>
                    
                </el-row>
                <el-row :gutter="10" class="searchbar">
                    <el-col :span="5">
                        <el-form-item label="代理商编号：">
                            <el-input v-model="searchData.shopNo" @keyup.enter.native="onSubmit" placeholder="代理商编号"></el-input>
                        </el-form-item>
                    </el-col>
             
                    <el-col :span="5">
                        <el-form-item label="代理商姓名：" >
                            <el-input v-model="searchData.name" @keyup.enter.native="onSubmit" placeholder="代理商姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="代理商等级： ">
                            <el-select v-model="searchData.agentGradeId" placeholder="代理商等级" clearable>
                                <el-option v-for="item in agencylevel" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
            </el-form>
        </div>
        <!-- 搜索 end -->
        <!-- 表格 start -->
        <div class="t-bodywrap">
            <el-row class="t-body">
                <el-row class="tablebar">
                    <el-table :data="myData" @selection-change="select" v-loading.fullscreen.lock="loading" highlight-current-row style="width: 100%">
                        <el-table-column type="selection" width="50">
                        </el-table-column>
                        <el-table-column prop="shopNo" label="代理商编号" width="200">
                            <template slot-scope="scope">
                                    <span>{{scope.row.shopNo}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column prop="name" label="代理商姓名" width="200">
                            <template slot-scope="scope">
                                    <span>{{scope.row.name}}</span>
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
                        <el-table-column prop="phone" label="手机号" width="125">
                        </el-table-column>
                        <el-table-column prop="annualCycle" label="年份" width="150">
                        </el-table-column>
                        <el-table-column prop="finishShopNums" label="店铺数">
                        </el-table-column>
                        <el-table-column prop="selfPurchaseSum" label="贷款总金额" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.selfPurchaseSum.toFixed(2)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="rebateAmountSum" label="返利金额" width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.rebateAmountSum.toFixed(2)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.status==0?'未核销':'已核销'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="annualPerformanceNo" label="付款单号" width="200">
                        </el-table-column>
                        <el-table-column prop="name" label="操作" width="150">
                            <template slot-scope="scope">
                                    <p class="operation">
                                        <span @click="outputExcel(scope.row.id,scope.row.shopNo, scope.row.annualCycle)">导出明细</span>
                                        <span v-if="scope.row.status==0" @click="confirmVerification(scope.row.id)">核销</span>
                                    </p>
                                </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <div class="plPage clearfix">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total,sizes, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
                </div>
                <div class="batch">
                    <span @click="confirmBatchVerification()">批量核销</span>
                    <span @click="batchOutputExcel()">批量导出明细</span>
                    <!-- <span @click="confirmAllVerification()">全部核销({{totalSize}}条)</span>
                    <span @click="allOutputExcel()">全部导出({{totalSize}}条)</span> -->
                </div>
            </el-row>
        </div>
        <!-- 表格 end -->
    </div>
</div>
</template>
<script>
import Utils from '../components/tools/Utils'
export default {
    data() {
        return {
            currentPage: 1,
            totalSize: 0,
            pageSize: 10,
            agentGradeId:"",
            searchData: {
                shopNo: '',
                phone: '',
                payOrderNo: '',
                status: '',
                name:'',
                aglevel:"",
                annualCycle:'',
                agentGradeId:""
            },
            myData: [],
            stateArray: [{
                    index: 0,
                    name: '未核销'
                },
                {
                    index: 1,
                    name: '已核销'
                },
            ],
            agencylevel:[{
                    index: '',
                    name: '全部'
                },
                {
                    index: 31,
                    name: '单店代理'
                },
                {
                    index: 265,
                    name: '区域代理'
                },
                {
                    index: 266,
                    name: '区域代理'
                }
            ],
            //日期选择器
            pickerOptions: {
                disabledDate(time) {
                    var date = new Date();
                    // 限制前两个月
                    return time.getMonth() > date.getMonth() - 2 && time.getYear() == date.getYear() || time.getYear() > date.getYear();
                }
            },
            downData: [], // ----> 导出数据
            selectData: [],
            allId: '',
            loading: false,
        }
    },
    created() {
        this.getFormData();
    },
    methods: {
        getFormData() {
            const self = this;
            self.loading = true;
            //获取列表数据
            self.$ajax({
                url: '/api/http/annualPerformanceOrder/findByAnnualPerformanceOrderList.jhtml',
                method: 'post',
                data: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                    'searchAnnualPerformanceOrderVo.shopNo': self.searchData.shopNo,
                    'searchAnnualPerformanceOrderVo.phone': self.searchData.phone,
                    'searchAnnualPerformanceOrderVo.status': self.searchData.status,
                    'searchAnnualPerformanceOrderVo.name': self.searchData.name,
                    'searchAnnualPerformanceOrderVo.agentGradeId':self.searchData.agentGradeId,
                    'searchAnnualPerformanceOrderVo.annualCycle': Utils.formatMonthDate(self.searchData.annualCycle),
                    'searchAnnualPerformanceOrderVo.annualPerformanceNo':self.searchData.payOrderNo
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
            }).then(function(response) {
                self.loading = false;
                console.log(response)
                if (response.data.success === 1) {
                    self.myData = response.data.result;
                    self.totalSize = response.data.totalNums;
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            }).catch(function(error) {

            });
        },
        //获取全部id
        getAllId() {
            const self = this;
            let data = '';
            let array = []
            return self.$ajax({
                async: false,
                url: '/api/http/annualPerformanceOrder/findByAnnualPerformanceOrderList.jhtml',
                method: 'post',
                data: {
                     'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                    'annualPerformanceOrder.shopNo': self.searchData.shopNo,
                    'annualPerformanceOrder.phone': self.searchData.phone,
                    'annualPerformanceOrder.status': self.searchData.status,
                    'annualPerformanceOrder.name': self.searchData.name,
                    'annualPerformanceOrder.agentGradeId':self.agentGradeId,
                    'annualPerformanceOrder.annualCycle':self.annualCycle,
                    'annualPerformanceOrder.annualPerformanceNo':self.searchData.payOrderNo                 
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
                },

            }).then(function(response) {
                if (response.data.success === 1) {
                    let myData = response.data.result;
                    for (let i = 0; i < myData.length; i++) {
                        array.push(myData[i].id)
                    }
                    self.allId = array.join(',')
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }

            }).catch(function(error) {

            });
        },
        onSubmit() {
            let self = this;
            self.getFormData();
        },
        handleCurrentChange(val) {
            let self = this;
            self.currentPage = val;
            self.getFormData();
        },
        handleSizeChange(val) {
            let self = this;
            self.pageSize = val;
            self.getFormData();
        },
        // 确认核销
        confirmVerification(id) {
            let self = this;
            self.$confirm('确认核销本条记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.verification(id)
            })
        },
        // 确认批量核销
        confirmBatchVerification() {
            let self = this;
            self.$confirm('确认核销选中的记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = self.formatSelect()
                self.verification(ids)
            })
        },
        // 确认全部核销
        confirmAllVerification() {
            let self = this;
            self.$confirm('确认核销本次查询的所有记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.$ajax.all([self.getAllId()]).then(
                    self.$ajax.spread(function(acct) {
                        let ids = self.allId;
                        self.verification(ids);
                    })
                );
            })
        },
        // 核销
        verification(id) {debugger
            let self = this;
            self.loading = true;
            self.$ajax({
                url: '/api/http/annualPerformanceOrder/findByAnnualPerformanceOrderList.jhtml',
                method: 'post',
                data: {
                   'searchAnnoalPerformanceOrderDetailVo.annualPerformanceIds': id ,
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
            }).then(function(response) {
                self.loading = false;
                // console.log(response)
                if (response.data.success === 1) {
                    self.$message({
                        message: '核销成功',
                        type: 'success'
                    })
                    setTimeout(function() {
                        self.getFormData();
                    }, 1000)
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            }).catch(function(error) {

            });
        },
        // 批量导出明细
        batchOutputExcel() {
            let self = this;
            let ids = self.formatSelect()
            console.log(ids)
            self.outputExcel(ids)
        },
        // 导出全部明细
        allOutputExcel() {
            let self = this;
            self.$ajax.all([self.getAllId()]).then(
                self.$ajax.spread(function(acct) {
                    let ids = self.allId;
                    self.outputExcel(ids);
                })
            );

        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        // 导出明细
        outputExcel(id,name, shopNo, createMonth) {
            let self = this;
            self.loading = true;
            self.$ajax({
                url: '/api/http/annualPerformanceOrderDetail/findAnnalPerformanceDetail.jhtml',
                method: 'post',
                data: {
                    // 'annualPerformanceOrder.shopNo': shopNo || '',
                    'searchAnnoalPerformanceOrderDetailVo.annualPerformanceIds': id ,
                    // 'annualPerformanceOrder.annualCycle':createMonth ||'',
                },
                transformRequest: [function(data) {
                    console.log(data);
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret;
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(response) {
                self.loading = false;
                console.log(response.data)
                if (response.data.success === 1) {
                    console.log(self.downData)
                    self.downData = response.data.result;
                    if(self.downData.length>0){
                        require.ensure([], () => {
                            const {
                                export_json_to_excel
                            } = require('../components/tools/Export2Excelyj')
                            const tHeader = ['代理商编号', '统计周期','代理商姓名','代理商等级','关系', '签约时间','付款时间','完成时间','货款金额', '系数比例','组成业绩','订单号/备注说明']
                            const filterVal = [
                                'shopNo', 'annualCycle','name', 'agentGradeName', 'relationship','signedTime', 'payTime','finishTimne','goodsAmount', 'ratio', 'getAmountShopId', 'remark',
                                
                            ]
                            const list = self.downData;
                            // console.log(list)
                            // const data = self.formatJson(filterVal, list);
                            // console.log(data)
                            export_json_to_excel(tHeader, list  ,filterVal, (shopNo ? shopNo + '_' : '') + (createMonth ? createMonth + '_' : '') + '年度业绩明细')
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
            }).catch(function(error) {

            });
        },

        // 表格选择
        select(selection) {
            this.selectData = selection;
        },
        formatSelect() {
            let selectData = this.selectData;
            let array = []
            for (let i = 0; i < selectData.length; i++) {
                array.push(selectData[i].id)
            }
            return array.join(',')
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../assets/less/annualPerformance.less');
.el-date-editor.el-input{
    width: 100%
}
</style>
