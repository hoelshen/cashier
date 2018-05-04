<template>
<div>
    <div class="content">
        <!-- 搜索 start -->
        <div class="searchwrap">
            <el-form ref="form" label-width="100px" :model="searchData">
                <el-row :gutter="10" class="searchbar">
                    <el-col :span="5">
                        <el-form-item label="代理商手机：">
                            <el-input v-model="searchData.phone" @keyup.enter.native="onSubmit" placeholder="代理商手机"></el-input>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="5">
                        <el-form-item label="选择年份： ">
                            <el-date-picker value-format="yyyy" v-model="searchData.year" :picker-options="pickerOptions" type="year" placeholder="选择年份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                
                    <el-col :span="5">
                        <el-form-item label="核销状态：">
                            <el-select v-model="searchData.entryStatus" placeholder="核销状态" clearable>
                                <el-option v-for="item in stateArray" :key="item.index" :label="item.name" :value="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="付款单号：">
                            <el-input v-model="searchData.paymentOrderNo" @keyup.enter.native="onSubmit" placeholder="付款单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-button type="primary" @click="onSubmit" class="searchBtn">查询</el-button>
                    </el-col>
                    
                </el-row>
                <el-row :gutter="10" class="searchbar">
                  
                      <el-col :span="5">
                        <el-form-item label="代理商编号：">
                            <el-input v-model="searchData.agentNo" @keyup.enter.native="onSubmit" placeholder="代理商编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="代理商姓名：" >
                            <el-input v-model="searchData.agentName" @keyup.enter.native="onSubmit" placeholder="代理商姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 搜索 end -->
        <!-- 表格 start -->
        <div class="t-bodywrap">
            <el-row class="t-body">
                <el-row class="tablebar" id="hMyTabel">
                    <div class="checkAllText">
                    </div>
                    <el-table :data="myData" @select-all="checkall" ref="myTabel1" row-key="id" @selection-change="select" v-loading.fullscreen.lock="loading" highlight-current-row style="width: 100%">
                        <el-table-column type="selection" width="50" :reserve-selection="true" >
                        </el-table-column>
                         <el-table-column prop="agentNo" label="代理商编号" width="200">
                            <template slot-scope="scope">
                                    <span>{{scope.row.agentNo}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column prop="agentName" label="代理商姓名" width="200">
                            <template slot-scope="scope">
                                    <span>{{scope.row.agentName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号" width="125">
                        </el-table-column>
                        <el-table-column prop="year" label="年份" width="100">
                        </el-table-column>
                        <el-table-column prop="shopNum" label="店铺数" width="100">
                        </el-table-column>
                        <el-table-column prop="purcharseAmount" label="货款总金额" width="150" align="right">
                            <template slot-scope="scope">
                                <span>{{scope.row.purcharseAmount.toFixed(2)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="rebateAmount" label="返利金额" width="150" align="right">
                            <template slot-scope="scope">
                                <span>{{scope.row.rebateAmount.toFixed(2)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="entryStatus" label="状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.entryStatus=='WAIT_CHECK'?'未核销':'已核销'}}</span>
                                <!-- <span>{{scope.row.entryStatus=='ALREADY_CLOSED'?'未核销':'已核销'}}</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="paymentOrderNo" label="付款单号" width="200">
                        </el-table-column>
                        <el-table-column prop="name" label="操作" width="150">
                            <template slot-scope="scope">
                                    <p class="operation">
                                        <span @click="outputExcel(scope.row.id,scope.row.agentNo,scope.row.year)">导出明细</span>
                                        <span v-if="scope.row.entryStatus=='WAIT_CHECK'" @click="confirmVerification(scope.row.id)">核销</span>
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
                    <span><span v-if="!ifCheckAll" @click="isSelectAll">全选</span><span v-if="ifCheckAll"  @click="isSelectAll">取消</span></span>
                    <span>选中({{selectData.length}}条)</span>
                    <span @click="confirmBatchVerification()">批量核销</span>
                    <span @click="batchOutputExcel()">批量导出</span>
                    <!-- <span @click="confirmAllVerification()">全部核销({{totalSize}}条)</span> -->
                    <!-- <span @click="allOutputExcel()">全部导出({{totalSize}}条)</span> -->
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
            ifCheckAll:false,//判断是否全选
            currentPage: 1,
            totalSize: 0,
            pageSize: 30,
            searchData: {
                agentName: '',
                phone: '',
                agentNo: '',
                entryStatus: 'WAIT_CHECK',
                year:'',
                paymentOrderNo:'',
            },
            myData: [],
            stateArray: [{
                    index: 'WAIT_CHECK',
                    name: '未核销'
                },
                {
                    index: 'ALREADY_CLOSED',
                    name: '已核销'
                },
            ],
            //日期选择器
            pickerOptions: {
                disabledDate(time) {
                    var date = new Date();
                    // 限制前两个月
                    return time.getYear() > date.getYear() - 1 && time.getYear() == date.getYear() || time.getYear() > date.getYear();
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
        // 表头添加class
        // 点击全选
        isSelectAll(){
            this.checkall();
        },
        // 格式化json
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        getFormData() {
            const self = this;
            self.loading = true;
            //获取列表数据
            self.$ajax({
                url: '/api/http/BusinessRebateAccount/searchBusinessRebateAccountList.jhtml',
                method: 'post',
                data: {
                    'pageIndex': self.currentPage,
                    'pageSize': self.pageSize,
                    'accountSearchVo.phone': self.searchData.phone,
                    'accountSearchVo.paymentOrderNo': self.searchData.paymentOrderNo,
                    'accountSearchVo.entryStatus': self.searchData.entryStatus,
                    'accountSearchVo.year': Utils.formatYearDate(self.searchData.year),
                    'accountSearchVo.agentName': self.searchData.agentName,
                    'accountSearchVo.agentNo': self.searchData.agentNo,
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
                    self.myData = response.data.result.list;
                    self.totalSize = response.data.result.total;
                } else {
                    self.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            }).catch(function(error) {

            });
        },
        //获取全部数据选中
        getAllId() {
            const self = this;
            self.loading = true;
            //获取列表数据
            self.$ajax({
                 url: '/api/http/BusinessRebateAccount/searchBusinessRebateAccountList.jhtml',
                method: 'post',
                data: {
                    // 'pageIndex': self.currentPage,
                    // 'pageSize': self.pageSize,
                    'accountSearchVo.phone': self.searchData.phone,
                    'accountSearchVo.paymentOrderNo': self.searchData.paymentOrderNo,
                    'accountSearchVo.entryStatus': self.searchData.entryStatus,
                    'accountSearchVo.year': Utils.formatMonthDate(self.searchData.year),
                    'accountSearchVo.agentName': self.searchData.agentName,
                    'accountSearchVo.agentNo': self.searchData.agentNo,
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
                console.log(response.data.result.list)
                if (response.data.success === 1) {
                    self.myData = response.data.result.list;
                    console.log(response.data.result.list)
                    self.totalSize = response.data.result.total;
                    // 数据全选与否
                    if(!self.ifCheckAll){
                        self.ifCheckAll = true;
                        for(let i in self.myData){
                            self.$refs.myTabel1.toggleRowSelection(self.myData[i],true)
                        }
                    }else{
                        self.ifCheckAll = false;
                        for(let i in self.myData){
                            self.$refs.myTabel1.clearSelection()
                        }
                    }
                    // 再次调用分页
                    self.handleCurrentChange(1)
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
        // confirmAllVerification() {
        //     let self = this;
        //     self.$confirm('确认核销本次查询的所有记录？', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         self.$ajax.all([self.getAllId()]).then(
        //             self.$ajax.spread(function(acct) {
        //                 let ids = self.allId;
        //                 self.verification(ids);
        //             })
        //         );
        //     })
        // },
        // 核销
        verification(id) {
            let self = this;
            self.loading = true;
            self.$ajax({
                url: '/api/http/businessRebateAccount/checkBusinessReabate.jhtml',
                method: 'post',
                data: {
                    'checkIds': id
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
            self.outputExcel(ids)
        },
        // 导出全部明细
        // allOutputExcel() {
        //     let self = this;
        //     self.$ajax.all([self.getAllId()]).then(
        //         self.$ajax.spread(function(acct) {
        //             let ids = self.allId;
        //             self.outputExcel(ids);
        //         })
        //      );
        // },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        // 导出明细
        outputExcel( id,shopNo,createMonth) {
        console.log(id)
            let self = this;
            self.loading = true;
            self.$ajax({
                url: '/api/http/businessRebateAccount/exportRebateDetailByAgentNo.jhtml',
                method: 'post',
                data: {
                    'checkIds': id
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
                self.loading = false;
                // console.log(response.data)
                if (response.data.success === 1) {
                    self.downData = response.data.result;
                    if(self.downData.length>0){
                        require.ensure([], () => {
                            const {
                                export_json_to_excel
                            } = require('../components/tools/Export2Excelyw')
                            const tHeader = ['代理商编号','统计周期','代理商姓名','代理商等级','签约时间','付款时间','贷款金额','返点比例','分成金额','备注说明']
                            const filterVal = ['agentNo','period','agentName','agentGradeId','signedTime','paymentTime','purcharseAmount','rebateRate','RebateAmount']
                            const list = self.downData;
                            export_json_to_excel(tHeader, list,filterVal, (shopNo ? shopNo + '_' : '') + (createMonth ? createMonth + '_' : '') + '业务拓展返利明细')
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
        // 全部选中
        checkall(selection){
            this.getAllId();
            // this.selectData = selection;
        },
        // 表格选择 表格某行选中
        select(selection) {
            this.selectData = selection;
            // this.getAllId();
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
@import url('../assets/less/area.less');
.el-date-editor.el-input{
    width: 100%
}
.checkAllText{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 20px;
    width: 40px;
    height: 40px;
    background-color: #eef1f6;
    // display: none;
}
.first-row{
    background-color: blue;
}
</style>
