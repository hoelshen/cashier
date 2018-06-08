<template>
    <div id="detailStore">
        <div class="renewal" style="padding: 0px 0 20px 0;">
            <el-button type="primary" @click="openRenewal">续签</el-button>
            <span class="content_closeBtn" style="" @click="goBack">X</span>
        </div>
        <el-row class="content_title_top">
            <h2><span class="detail-title">基本信息</span><span class="detail-shopno"> ({{detailForm.shopNo}})</span></h2>
        </el-row>

        <div class="info">
            <!--左边-->
            <div class="orderInfo">
                <el-row :gutter="10">
                    <el-col :span="24"  style="padding-left:35px;">
                        店铺名称：<span class="font-color">{{ detailForm.shopName }}</span>
                    </el-col>
                  
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24"  style="padding-left:35px;">
                        店铺类型：<span class="font-color">{{ detailForm.shopType == "AGENT" ?  "代理商"  : "直营"}}</span>
                    </el-col>
                 
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24" style="padding-left:36px;" >
                    显示选项： <span class="font-color" >
                                <span style="position: absolute;left: 104px;" v-if="detailForm.isShow == 0" class="font-color">不显示到醉品线下M2O体验店</span>                               
                                <span  v-else  class="font-color" >显示到醉品线下M2O体验店</span>
                                </span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24"  style="padding-left:20px;">
                        代理商姓名：<span class="font-color">{{ detailForm.name }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24"  style="padding-left:20px;">
                        代理商手机：<span class="font-color">{{ detailForm.phone }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24" style="padding-left:20px;" >
                        代理商状态：<span v-if="detailForm.state!=1" style="position:  relative;"> <div class="icon-green"></div></span><span v-if="detailForm.state==1" style="position:  relative;"> <div class="icon-red"></div></span> <span class="font-color" style="padding-left:6px;">{{ detailForm.state	=== 1 ? '禁用' : '启用' }}</span>
                    </el-col>
                </el-row>
          
                <el-row :gutter="10" v-if="detailForm.shopType!='SELF_SUPPORT'">
                    <el-col :span="24" style="padding-left:20px;" v-if="detailForm.shopType!='SELF_SUPPORT'">
                        代理商等级：<span class="font-color">{{   detailForm.agentGradeId == 265 ? "区域代理" :  detailForm.agentGradeId == 266   ? '微店代理' : '单店代理'     }}</span>
                    </el-col>
                </el-row>


                <el-row :gutter="10" >
                    <el-col :span="24" v-if="detailForm.agentGradeId == 265 && detailForm.shopType =='AGENT'">
                        店铺代理区域：<span class="font-color">{{ detailForm.agentProvinceName }}/{{detailForm.agentCityName}}/{{detailForm.agentCountyName}}</span>
                    </el-col>
                    <el-col :span="24" v-if="detailForm.agentGradeId == 266 || detailForm.agentGradeId ==31 || detailForm.shopType =='SELF_SUPPORT' ">
                        店铺所属区域：<span class="font-color">{{ detailForm.belongProvinceName }}/{{detailForm.belongCityName}}/{{detailForm.belongCountryName}}</span>
                    </el-col>
                </el-row>


                <el-row :gutter="10" style="margin-top: 65px;">
                    <el-col :span="24" style="padding-left:34px;">
                        <div style="overflow: hidden;">
                            <span style="display: inline-block;float: left;" >收件地址：</span><span class="font-color" style="display: inline-block;float: left;width:200px;" >{{ detailForm.province }}/{{detailForm.city}}/{{detailForm.county}}/{{ detailForm.address }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            
            <!--中间-->
            <div class="orderInfo line-middle" style="width:38%">
                <div >
                    <el-row :gutter="10">
                    <el-col :span="24" style="padding-left:35px;">
                        合同服务期限：<span class="font-color"> {{detailForm.signedStartTime}} 至 {{detailForm.signedEndTime}}</span>                   
                        <el-tooltip placement="right" effect="light">
                        <span class="next"  v-show="detailForm.nextSignedStartTime" ></span>    
                        <span slot="content" >{{detailForm.nextSignedStartTime}} 至 {{detailForm.nextSignedEndTime}}</span>
                        </el-tooltip>
                    </el-col>
                </el-row>
                </div>
                <div v-if="detailForm.isParticipateRebate==1">
                    <el-row :gutter="10">      
                    <el-col :span="24" style="padding-left:20px;"  v-if="detailForm.shopType!='SELF_SUPPORT'" >
                        已完成进货业绩：
                        <span style="color:#ff6600"> ￥{{(detailForm.finishPerformanceSum).toFixed(2)}}</span>
                    </el-col>
                    </el-row>
                    <el-row :gutter="10"> 
                        <el-col :span="24" v-if="detailForm.shopType!='SELF_SUPPORT'" style="position:relative">
                            <div>
                                <span>年度目标进货业绩：</span>
                                <span v-if=" detailForm.annualPurchasePerformance!=0 " style="color:#ff6600">
                                    ￥{{ (detailForm.annualPurchasePerformance).toFixed(2) }}
                                </span>
                                <span v-if=" detailForm.annualPurchasePerformance == 0 " style="color:#ff6600">
                                    ￥{{ (detailForm.annualPurchasePerformance ).toFixed(2)}}
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24" style="padding-left:20px;position:relative" width=100px;  v-if="detailForm.shopType!='SELF_SUPPORT' " >
                            <div >
                                <span  style="float:left" >
                                    进货业绩达成率：
                                </span> 
                                <!--颜色
                                    //橙色     //蓝色      //淡橙色
                                    'ff6600';   '20a0ff';     'ffd199';
                                -->
                                <!--
                                    1.目标不为零得情况 
                                -->
                                <div  v-if="detailForm.shopType!='SELF_SUPPORT' " 
                                            class="annualPurchasePerformanceCss" > 
                                        <div v-bind:style="annualOwnAreadyPurchasePerformanceRateObject" 
                                        style="position:relative;border-bottom-left-radius: 10px; border-top-left-radius: 10px;float: left;"></div>
                                        <div v-bind:style="annualLowerAreadyPurchasePerformanceRateObject" 
                                        style="position:relative;border-bottom-right-radius: 10px; border-top-right-radius: 10px;float: left;"></div>
                                </div> 
                                
                                <!--比率 -->
                                <span  v-if="detailForm.shopType!='SELF_SUPPORT'
                                            && detailForm.annualPurchasePerformance != 0 
                                            "  
                                            style="position: absolute;left: 275px;">
                                    <span v-if=" detailForm.annualPurchasePerformance != 0 ">
                                        {{Number(detailForm.annualPerformanceRatio*100).toFixed(2)}}%
                                    </span>
                                    <span v-if="detailForm.annualPurchasePerformance==0">
                                    </span>
                                </span>
                            </div>
                
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24" style="padding-left:20px;" v-if="detailForm.shopType!='SELF_SUPPORT' && detailForm.agentGradeId == 265">
                            已完成店铺拓展：
                            <span class="font-color" style="color:#20a0ff ">
                                {{ detailForm.annualAreadyExtendPerformance}}家
                            </span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24" v-if="detailForm.shopType!='SELF_SUPPORT'  && detailForm.agentGradeId == 265">
                            年度目标店铺拓展：<span class="font-color" style="padding-left:5px;">{{ detailForm.annualExtendPerformance }}家</span>
                        </el-col>
                    </el-row>
            
                    <el-row :gutter="10" v-if="detailForm.shopType!='SELF_SUPPORT'">
                        <el-col :span="24" style="padding-left:20px;position:relative" v-if="detailForm.shopType!='SELF_SUPPORT' 
                                && (detailForm.agentGradeId == 265)"  >
                            <div >
                                    <span  v-if="detailForm.shopType!='SELF_SUPPORT'" style="float:left"> 
                                    店铺拓展达成率：
                                    </span>
                                    <div  v-if=" detailForm.shopType!='SELF_SUPPORT' " 
                                                class="annualPurchasePerformanceCss" >
                                        <div v-bind:style="SjhExtendPerformanceObject" style="border-radius: 10px; "></div>
                                    </div>                              
                                    <!--灰色-->
                                    <span  v-if="detailForm.shopType!='SELF_SUPPORT' && detailForm.annualExtendPerformance!=0  "  
                                                style="left: 275px;position: absolute" >
                                        {{Number(detailForm.storeExpansionRate*100).toFixed(2)}}%
                                    </span>
                                    <span v-if="detailForm.annualPurchasePerformance">
                                    </span>
                            </div>
                        </el-col>
                    </el-row>
            </div>      
            </div>
            <!--右边-->
            <div class="orderInfo line-middle"  v-if="detailForm.isParticipateRebate==1" style="float: right;width:28%">
                <div class="calendar" style="top:7%">
                    <p class="calendarMessage_top">{{message}}</p><br>
                    <p style="position:absolute;left: 41px;top: 49px;">{{detailForm.remainDay}}</p>
                </div> 
            </div>
        </div>


        <div class="content_title_bottom">
              <h2><span class="detail-title">账户信息</span></h2>    
        </div>
          

        <div class="count">
            <div class="orderCount">
                <el-row :gutter="5">
                    <el-col :span="24" style="padding-left:7px;">
                        预存款详情：
                        <span  class="router-link-active" >
                             <router-link  class="router-link-active" :to="{ name: 'prepaidManage', params: { shopNo:detailForm.shopNo,name:detailForm.name}}">点击查看</router-link>
                        </span>                                           
                    </el-col>
                </el-row>
                <el-row  v-if="detailForm.shopType!='SELF_SUPPORT'" :gutter="5">
                    <el-col :span="24"  style="padding-left: 7px;">
                        代理商关系：
                        <span  class="router-link-active" type="primary" @click='openAgencyRelationsance(detailForm.shopNo)'>点击查看</span>            
                    </el-col>
                    </el-row>    
                <el-row  v-if="detailForm.shopType!='SELF_SUPPORT'" :gutter="5"  >
                    <el-col :span="24" style="margin-left:-23px;">
                    代理商年度业绩： 
                        <span  class="router-link-active" type="primary" @click='openAnnualAgents(detailForm.id,detailForm.shopNo)'>点击查看</span>
                    </el-col>
            
                </el-row>
                <el-row   :gutter="5">
                    <el-col :span="24"  style="padding-left: 22px;">
                        匹配规则：{{ detailForm.businessExtendsRuleRuleNo }} {{ detailForm.businessExtendsRuleName }} 
                    </el-col>
                </el-row> 
                <el-row  :gutter="5"> 
                    <el-col :span="24"  style="padding-left: 22px;">
                        运营人员：<span v-if="detailForm.operator">{{ detailForm.operator }}</span><span v-else>--</span>
                    </el-col>
                </el-row>        
                <el-row   :gutter="5">
                    <el-col :span="24"  style="padding-left: 22px;">
                        业务人员：<span v-if="detailForm.salesMan">{{ detailForm.salesMan }}</span> <span v-else>--</span>
                    </el-col>  
                </el-row>
                <el-row  :gutter="5">
                    <el-col :span="24"  style="margin-left: -9px;">
                        合同签约信息：
                        <span  class="router-link-active" type="primary" @click='openContractInformation(detailForm.id,detailForm.shopNo)'>点击查看</span>
                    </el-col>
                </el-row>   
            </div>
        </div>


    
        <!-- 查看代理商关系(编号：xxx) start -->
        <el-dialog :title="agencyRelationsanceTitle" :visible.sync="agencyRelationsanceDialogVisible" :before-close="changeCancle" size="140%">
            <div  style="width:50%; float:left">
                <el-row :gutter="5">
                    <el-col :span="24"  style="padding-left: 22px;">
                            代理商拓展上级：
                            <span v-if="agencyRelationsanceFormExtendSuper == null">醉品</span>
                            <span v-show="agencyRelationsanceFormExtendSuperShopNo">{{agencyRelationsanceFormExtendSuperShopNo }} {{agencyRelationsanceFormExtendSuperName}}</span>
                            <br>
                    </el-col>  
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="24"  style="padding-left: 22px;">
                        代理商归属上级：
                            <span v-if="agencyRelationsanceFormSuperShop == null" >醉品</span>
                            <span v-show="agencyRelationsanceFormSuperShopShopNo">{{agencyRelationsanceFormSuperShopShopNo}} {{agencyRelationsanceFormSuperShopName}}</span>   
                    </el-col>  
                </el-row>               
            </div>
            <div style="width:50%;float:left">
                <el-date-picker class="picker-time" value-format="yyyy" format="yyyy年" 
                v-model="searchRegistTime" type="year" placeholder="选择年度" >
                </el-date-picker>
            </div>
            <div>
                <el-table :data="agencyRelationsanceForm"  style="width: 100%">
                    <el-table-column type="index" label="序号"  width="80">
                        <template slot-scope="scope">
                            <span>{{scope.$index + (currentPageAgency -1 ) * 30 + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="agentNo" label="下级编号" width="127">
                    </el-table-column>
                    <el-table-column prop="agentName" label="姓名" width="150">
                    </el-table-column>
                    <el-table-column prop="agentGradeId" label="等级" width="127">
                        <template slot-scope="scope">
                            <span v-if="scope.row.agentGradeId  == '266'">微店代理</span>
                            <span v-if="scope.row.agentGradeId  == '265'">区域代理</span>
                            <span v-if="scope.row.agentGradeId  == '31'">单店代理</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="registTime" label="签约时间" width="127">
                    </el-table-column>
                    <el-table-column prop="rebateRate" label='返利比例' width="127">
                        <template slot-scope="scope">
                            <span v-if="scope.row.rebateRate!=null">{{(scope.row.rebateRate).toFixed(2) }}</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                
                    <el-table-column prop="rebateAmount" label='返利金额' width="127" align="right">
                    </el-table-column>
                </el-table>
            </div>
            <div class="plPage clearfix">
                <el-pagination style="margin-top: 10px;float: right;"  
                    @current-change="agencyRelationsanceHandleCurrentChange" 
                    :current-page="currentPageAgency" :page-size="pageSizeAgency" 
                    layout=" prev, pager, next, jumper" :total="totalSizeAgency" >
                </el-pagination>
            </div>
            <div slot="footer"   class="dialog-footer" @click="changeCancle()">
            </div>
        </el-dialog>
    


        <!-- 查看代理商年度业绩(编号：xxx) start -->
        <el-dialog :title="annualAgentsTitle"  :visible.sync="annualAgentsDialogVisible"  size="180%"  :before-close="changeCancle">
            <div style="height:40px;">
                <div class="img search-time-wrap" style="padding:0 10px 0 10px;margin:0 10px 0 10px;">
                        <img style="margin-right:5px;margin-left:5px;padding-right:5px" src="../assets/images/Standard.png" alt="">已达标
                        <img style="margin-right:5px;margin-left:5px;padding-right:5px"  src="../assets/images/DStandard.png" alt="">未达标
                            <el-date-picker class="picker-time" value-format="yyyy" format="yyyy年" v-model="searchRegistTimeAnnual" :picker-options="pickerOptionsAnnual" type="year" placeholder="选择年度" >
                        </el-date-picker>
                </div>
            </div>
            <div >
                <el-table :data="annualAgentsForm" style="width: 100%;">
                    <el-table-column type="index" label="序号"  width="80">
                        <template slot-scope="scope">
                            <span>{{scope.$index + (currentPage -1 ) * 30 + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="agentGradeName" label="代理商等级" width="127">
                        <template slot-scope="scope">
                            {{scope.row.agentGradeName}}代理
                        </template>
                    </el-table-column>
                    <el-table-column prop="annualCycle" label="年份" width="127" >
                    </el-table-column>
                    <el-table-column prop="shopNums" label="目标店铺" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.agentGradeId==265"> {{scope.row.shopNums}}</span> 
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="finishShopNums" label="达成"  width="80"  align="right">
                    </el-table-column>
                    <el-table-column prop="annualPerformanceAmount" label="目标进货额" width="157" align="right">
                        <template slot-scope="scope">
                        <span>{{scope.row.annualPerformanceAmount.toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="finishPerformanceSum" label="达成"  width="127" align="right">
                        <template slot-scope="scope">
                        <span>{{scope.row.finishPerformanceSum.toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="finishRatio" label="年度业绩" width="177" align="right">
                    <template slot-scope="scope">
                        <span>{{((scope.row.finishRatio*100).toFixed(2))}}{{'%'}}</span>
                        <div v-if="(scope.row.finishRatio.toFixed(2))*100 >= 100" style="display:inline">
                            <img src="../assets/images/Standard.png" alt="">
                        </div> 
                        <div v-else  style="display:inline">
                            <img  src="../assets/images/DStandard.png" alt="">
                        </div>
                    </template> 
                    </el-table-column>
                </el-table>
            </div>
            <div class="plPage clearfix">
                <el-pagination  style="margin-top: 10px;float: right;"   @current-change="AnnualAgentsHandleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout=" prev, pager, next, jumper" :total="totalSize">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer" @click="changeCancle()">
            </div>
        </el-dialog>
        <!-- 查看代理商年度业绩(编号：xxx) end -->  

        <!--续签弹窗-->
        <el-dialog :title="renewalTitle"   :visible.sync="renewalDialogVisible" :before-close="changeRenewal" size="40%">
                <!-- <div style="position: relative;padding-bottom:50px;"> -->
                    <el-form>
                        <div class="resign_wrap name-tel">
                            <span class=resign-name>{{renewalForm.resignName}}</span>
                            <span v-html="renewalForm.resignPhone"></span>
                        </div >
                        <div  class="resign_wrap">
                             <span class="resign-store-icon-wrap">
                                <span v-if="renewalForm.resignAgentGradeId  == '266'">微店代理</span>
                                <span v-if="renewalForm.resignAgentGradeId  == '265'">区域代理</span>
                                <span v-if="renewalForm.resignAgentGradeId  == '31'">单店代理</span>
                            </span> 
                           
                            <span v-if="renewalForm.remainYear==0&&renewalForm.remainDay==0">该代理商服务期限已到期！</span> 
                             <span v-else>该代理商服务期限还有 <span class="resign-color"> <span v-if="renewalForm.remainYear!=0"> {{renewalForm.remainYear}}年</span>{{renewalForm.remainDay}}天 </span> 到期~</span> 
                         </div>
                            <!-- <span> 该代理商服务期限还有 <span class="resign-color">1年223天 </span> 到期~</div> -->
                        <el-row>
                            <el-col style="width:296px">
                                <el-form-item label="续签期限：" label-width="92px">
                                    <el-date-picker width="200" :default-value="renewalForm.maxEndTime" v-model="renewalForm.timerValueStar" :picker-options="starPickerOptions" type="date" placeholder="开始日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:220px">
                                <el-form-item label="至" label-width="25px">
                                    <el-date-picker  width="200" v-model="renewalForm.timerValueEnd" :default-value="renewalForm.maxEndTime" :picker-options="endpPickerOptions" type="date" placeholder="结束日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div slot="footer" >
                        <el-button @click="renewalDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveRenewal">确 定</el-button>
                    </div>
                <!-- </div> -->
        </el-dialog>  

        <!--合约信息弹窗-->
        <el-dialog :title="contractInformationTitle"   :visible.sync="contractInformationVisible" :before-close="changeContractInformation" size="200%">
            <div style="width:50%;float: right;">
                <el-date-picker class="picker-time" value-format="yyyy" format="yyyy年" 
                    v-model="searchContractInformationTime" type="year" placeholder="选择年度" >
                </el-date-picker>
            </div>
            
            <div >
                <el-table :data="contractInformationForm" :height="440"  style="width: 100%">
                    <el-table-column prop="contractType" label="签约类型" width="280" >
                        <template slot-scope="scope" >
                            <span >{{ scope.row.contractType == 'INITIAL_SIGNATURE' ? '首签' : '续签'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="registTime" label="合同服务期限" width="280">
                         <template  scope="scope">
                            <span>{{ (scope.row.beginTime)}}~{{ (scope.row.endTime)}}</span>
                        </template>
                    </el-table-column>
                </el-table>


                <div class="plPage clearfix"    >
                    <el-pagination style="margin-top: 10px;float: right;"  @current-change="contractInformationChange" :current-page="currentPageContractInformation" :page-size="pageSizeContractInformation" layout=" prev, pager, next, jumper" :total="totalSizeContractInformation" >
                    </el-pagination>
                </div>


                <div slot="footer"   class="dialog-footer" @click="changeContractInformation()">
                </div>


            </div>
        </el-dialog>
    </div>  
</template>

<script type="text/javascript" src="../router.js"></script>

<script>
import Utils from "../components/tools/Utils";
import addressComponent from "../components/address.vue";
import timeComponent from "../components/time.vue";
import axios from "axios";

import $ from "jquery";

export default {
  data() {
    return {
      currentPage: 1,
      totalSize: 0,
      pageSize: 30,
      currentPageAgency: 1,
      pageSizeAgency: 30,
      totalNums:0,
      totalSizeAgency:0,
      currentPageContractInformation: 1,
      pageSizeContractInformation:30,
      totalSizeContractInformation:0,
      user: "",
      tableData:{
          agent:'',
      },
      annualAgentsTitle:'',
      annualAgentsForm:[],
      annualAgentsFormcycleBeginTime:'',
      annualAgentsFormcycleEndTime:'',
      agencyRelationsanceTitle:'',
      agencyRelationsanceForm:[],
      agencyRelationsanceFormRebateRate:'',
      agencyRelationsanceFormRebateAmount:'',
      agencyRelationsanceFormExtendSuperShopNo:'',
      agencyRelationsanceFormExtendSuper:'',
      agencyRelationsanceFormSuperShop:'',
      agencyRelationsanceFormExtendSuperName:'',
      agencyRelationsanceFormSuperShopShopNo:'',
      agencyRelationsanceFormSuperShopName:'',
      annualAgentsFormSignTime: [],
      contractInformationTitle:'', //签约时间
      contractInformationForm:[],  //签约时间
      
      myData: [],
      levelArray: [], //代理商等级数组
      stateArray: [
        {
          index: 0,
          name: "启用"
        },
        {
          index: 1,
          name: "禁用"
        }
      ],
      loading: false,
      //日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptionsAnnual: {
        getformdata(time) {
          return time.getTime() > Date.now();
        }
      },
      detailForm: {
        id: "",
        shopName: "",
        name: "",
        phone: "",
        nextSignedStartTime:'', //下个续签时间
        nextSignedEndTime:'', 
        signedStartTime:'',
        signedEndTime:'',       
        agentGradeId: "",
        province: "",
        city: "",
        county: "",
        cityCode: "",
        countyCode: "",
        agentProvince: "",
        agentCity: "",
        agentCounty: "",
        address: "",
        shopType: "",
        isShow: "",
        operator: "",
        operator2: "",
        operatorId: "",
        salesMan: "",
        salesMan2: "",
        salesManId: "",
        shopNo:"",
        annualExtendPerformance:"",  //年度目标店铺拓展
        annualAreadyExtendPerformance:'',   //已达成店铺拓展
        storeExpansionRate:'',     //年度店铺扩展达成率  
        
        annualPerformanceRatio:'',  //进货业绩达成率
        finishPerformanceSum:'' ,   // 已达成进货业绩：
        annualOwnAreadyPurchasePerformance:'', //年度自己所完成的业绩
        annualLowerAreadyPurchasePerformance:'', //年度下级协助所完成的业绩
        annualPurchasePerformance:'' ,  //年度目标进货业绩        
        annualOwnAreadyPurchasePerformanceRate:'',   //年度自己所完成的业绩率
        annualLowerAreadyPurchasePerformanceRate:'',  //年度下级协助所完成的业绩率
        RuleId:'',
        createTime:'',    ///签约日期,
        belongCity:'',   //所属城市
        belongCountry:'', //所属区域
        belongProvince:'',  //所属省份
        activeColor1:"ff6600",   //橙色
        activeColor2:"ffd199",     //红色
        activeColor3:'',
        remainDay: '',        
        height:10,
        businessExtendsRuleRuleNo:'',
        businessExtendsRuleName:'',

      },
      annualOwnAreadyPurchasePerformanceRateObject:{
          height:10 +'px',
          width:'',
          backgroundColor:'',
          borderBottomRightRadius:'',
          borderTopRightRadius:'',
      },
      annualLowerAreadyPurchasePerformanceRateObject:{
          height:10  +'px',
          width:'',
          backgroundColor:'',
          borderBottomLeftRadius:'',
          borderTopLeftRadius:'',
          
      },

      SjhExtendPerformanceObject:{
        height:10  +'px',
        width:'',
        backgroundColor:'',
        top: 10 +'px',
      },
      SjhNotExtendPerformanceObject:{
        height:10  +'px',
        width:'',
        backgroundColor:'',
        top: 10 +'px',
      },
      agencyRelationsanceDialogVisible:false,  //代理商关系
      annualAgentsDialogVisible:false,  //年度业绩 
      renewalDialogVisible:false, //续签弹窗
      contractInformationVisible:false, // 合约信息
      detailFormTitle: "",
      isDisable: false,
      order: "", //预存款排序
      phoneLength: 11,
      message: "剩余天数",
      searchRegistTime:"",       //搜索关系
      searchRegistTimeAnnual:"",   //搜索年度业绩
      searchContractInformationTime:'',  //搜索合同签约信息
      renewalTitle:'代理商续签',


        renewalForm:{
            resignAgentGradeId:"",// 代理商等级
            resignName:"",//代理商姓名
            resignPhone:"",//代理商手机号
            timerValueStar:"",
            timerValueEnd:"",
            remainDay:"",//服务期限日
            remainYear:"",//服务期限年
            maxEndTime:"",//续签的最后结束时间
        },  //续签
        createId:"",//创建人ID

        //开始日期
        starPickerOptions: this.starTime(),
        //结束日期
        endpPickerOptions: this.endTime(),
        thistime:new Date(),
    };
  },
  components: {
    addressComponent,
    timeComponent
  },
  methods: {
    //取消按钮
    changeCancle() {
        
            this.agencyRelationsanceDialogVisible = false;
            this.agencyRelationsanceForm = [];

            this.annualAgentsForm = [];
            this.annualAgentsDialogVisible = false;

        },
    //查看代理商关系
    openAgencyRelationsance(shopNo) {
        this.agencyRelationsanceTitle = "查看代理商关系（编号：" + shopNo + "）"
        if (!this.checkSession()) return;
        const self = this;
        self.agencyRelationsanceDialogVisible = true;
        self.loading = true;
        // console.log(Utils.formatYearDate(self.searchRegistTime) )
        self.$ajax({
            url:'/api/shop/shopManage/getAgentRelationList.jhtml',
            method: 'post',
            data: {
                    'shopNo':self.detailForm.shopNo,
                    'pageIndex': self.currentPageAgency,
                    'pageSize': self.pageSizeAgency,
                    'registTime': Utils.formatYearDate(self.searchRegistTime),
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
                    self.agencyRelationsanceForm = response.data.result.list;
                    // console.log(response.data.result.list)
                    self.totalSizeAgency = response.data.result.total;
                    // self.agencyRelationsanceFormRebateRate = response.data.result.list.rebateRate;
                    // self.agencyRelationsanceFormRebateAmount = response.data.result.list.rebateAmount;
                    
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

        self.$ajax({
            url:'/api/shop/shopManage/getShopExtendInfoByShopNo.jhtml',
            method: 'post',
            data: {
                    'shopNo': shopNo,
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

                self.agencyRelationsanceFormExtendSuper = response.data.result.extendSuperShop
                if(self.agencyRelationsanceFormExtendSuper){
                    self.agencyRelationsanceFormExtendSuperShopNo = response.data.result.extendSuperShop.shopNo;
                    self.agencyRelationsanceFormExtendSuperName=  response.data.result.extendSuperShop.name;
                }

                self.agencyRelationsanceFormSuperShop =  response.data.result.superShop
                if(self.agencyRelationsanceFormSuperShop){
                        self.agencyRelationsanceFormSuperShopName =  response.data.result.superShop.name;
                        self.agencyRelationsanceFormSuperShopShopNo = response.data.result.superShop.shopNo;
                }



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
    //查看代理商年度业绩
    openAnnualAgents(shopId,shopNo) {
        this.annualAgentsTitle = "查看代理商年度业绩（编号：" + shopNo + "）"
        if (!this.checkSession()) return; 
        const self = this;               
        self.annualAgentsDialogVisible = true;
        self.loading = true;
        let url = '/api/http/annualPerformanceOrder/findByAnnualPerformanceOrderList.jhtml?shopId=' + self.detailForm.id
        self.$ajax({
                url: url,
                 method: 'post',
                 data: {
                    'pager.pageIndex': self.currentPage,
                    'pager.pageSize': self.pageSize,
                    'searchAnnualPerformanceOrderVo.annualCycle': Utils.formatYearDate(self.searchRegistTimeAnnual),
                    'searchAnnualPerformanceOrderVo.shopNo':shopNo
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
                // console.log(response)
                self.loading = false;
             if (response.data.success == 1) {
                    self.annualAgentsForm = response.data.result;
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
      this.$router.push("/storeManage");
    },
    //年度业绩年份
    annualAgentsFormAnnualCycle(){
        const self = this;
            if (!self.checkSession()) return;
            //清除排序
            self.loading = true;
            self.$ajax.post('/api/http/annualPerformanceCycle/findListByShopId.jhtml', {
                params: {
                    'shopId':self.detailForm.id,
                    'annualCycle': Utils.formatYearDate( self.annualAgentsFormSignTime[0]),
                }
            }).then(function (response) {
                self.loading = false;
                self.annualAgentsForm = response.data.rows;
                self.totalSize = response.data.total;
               
            }).catch(function (err) {
                self.loading = false;
                console.log(err);
            });
    },
     //改变年度业绩当前页
    AnnualAgentsHandleCurrentChange(val) {
            let self = this;
            self.currentPage = val;
            self.openAnnualAgents(this.detailForm.id,this.detailForm.shopNo);
    },
    //改变代理商关系当前页
    agencyRelationsanceHandleCurrentChange(val){
            let self = this;
            self.currentPageAgency = val;
            self.openAgencyRelationsance(this.detailForm.shopNo);
    },
    //打开续签弹窗
    openRenewal(){
        var self = this;
        if (!this.checkSession()) return;
        if (sessionStorage.user) {
            self.createId = JSON.parse(sessionStorage.getItem('user')).id;
        }
        self.renewalForm.timerValueStar="";
        self.renewalForm.timerValueEnd="";
        this.renewalDialogVisible = true;
        self.$ajax({
              url:'/api/http/contractCycle/findCurrentContractCycle.jhtml',
              method: 'post',
              data: {
                    'contractCycle.shopId': self.detailForm.id,
                    'contractCycle.currentTime': Utils.formatDayDate(new Date()),//日期格式转换
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
                //  console.log(response.data.result)
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
        //   获取合同服务期时间和签约日期
        self.$ajax({
              url:'/api/http/contractCycle/findRenewalInfo.jhtml',
              method: 'post',
              data: {
                    'contractCycle.shopId': self.detailForm.id,
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
                 console.log(response.data.result);
                 self.renewalForm.remainDay = response.data.result.remainDay;
                 self.renewalForm.remainYear = response.data.result.remainYear;
                 self.renewalForm.maxEndTime = response.data.result.maxEndTime;
                  // 代理商的店铺名字/手机号码/店铺类型
                self.renewalForm.resignAgentGradeId = response.data.result.agentGradeId;
                self.renewalForm.resignName = response.data.result.agentName;
                self.renewalForm.resignPhone = response.data.result.phone;

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
    //保存续约
    saveRenewal(){
        var self = this;
       
        if (!this.checkSession()) return;
        if (sessionStorage.user) {
            self.createId = JSON.parse(sessionStorage.getItem('user')).id;
        }
        
        if(!self.renewalForm.timerValueStar){
            self.$message({
                message: "合同开始时间不能为空",
                type: 'error'
            })
            return
        }
        if(!self.renewalForm.timerValueEnd){
            self.$message({
                message: "合同结束时间不能为空",
                type: 'error'
            })
            return
        }
        if(self.renewalForm.timerValueEnd<self.renewalForm.timerValueStar){
            self.$message({
                message: "开始时间不能大于结束时间",
                type: 'error'
            })
            return
        }
        self.renewalDialogVisible = false
        self.$ajax({
              url:'/api/http/contractCycle/doRenewal.jhtml',
              method: 'post',
              data: {
                    'contractCycle.shopId': self.detailForm.id,
                    'contractCycle.beginTime':  Utils.formatDayDate(self.renewalForm.timerValueStar),
                    'contractCycle.endTime':   Utils.formatDayDate(self.renewalForm.timerValueEnd),
                    'contractCycle.createId':  self.createId,
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
                 self.$message({
                        message: "代理商续签成功~",
                        type: 'success'
                    });

                //  console.log(self.detailForm.id)
                 self.$router.go(0);
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
    //关闭续签弹窗
    changeRenewal(){
        this.renewalDialogVisible = false;
    },
    //打开签约信息弹窗
    openContractInformation(){
        this.contractInformationVisible = true;
        let id = this.detailForm.id;
        let nowTime = Utils.formatYearDate( this.searchContractInformationTime);
        
        this.contractInformationTitle = "合同签约信息（编号： " +this.detailForm.shopNo+  "）"

        const self = this;
        self.$ajax({
              url:'/api/http/contractCycle/queryContractCycleList.jhtml',
              method: 'post',
              data: {
                    'contractCycle.shopId': id,
                    'contractCycle.beginTime':  nowTime,
                    'pager.pageIndex':this.currentPageContractInformation,
                    'pager.pageSize': this.pageSizeContractInformation,   
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
                //  console.log(response.data.result)

                self.contractInformationForm = response.data.result
                self.totalSizeContractInformation = response.data.totalNums
                       
                // console.log(self.totalSizeContractInformation)
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
    //关闭签约信息弹窗 
    changeContractInformation(){
        this.contractInformationVisible = false;
    },
    //改变签约信息当前页
    contractInformationChange(){
         let self = this;
         self.currentPageContractInformation = val;
         self.openAgencyRelationsance(this.detailForm.shopNo);
    },
    // 合同续签开始时间控制
    starTime(){
        var self = this;
            return  {
                disabledDate(time){
                    return time.getTime() < new Date(self.renewalForm.maxEndTime)
                }
            }
    },
    //  合同续签结束时间控制
    endTime(){
        var self = this;
            return  {
                disabledDate(time){
                        if(self.renewalForm.timerValueStar){
                            return time.getTime() < new Date(self.renewalForm.timerValueStar)
                    }else{
                        return time.getTime() < new Date(self.renewalForm.maxEndTime)
                    }
                }
            }
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
    //获取代理商等级列表
    self.$ajax
      .post("/api/http/shop/queryAgentGradeList.jhtml", {})
      .then(function(response) {
        // console.log(response);
        if (response.data.success == 1) {
          self.levelArray = response.data.result;
        } else {
          self.$message({
            message: response.data.msg,
            type: "error"
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    // 获取代理商信息
    self.$ajax
      .get("/api/http/shop/searchShop.jhtml", {
        params: {
          shopId: src[5]
        },
      })
      .then(function(response) {
        self.loading = false;
        self.detailForm = JSON.parse(JSON.stringify( response.data.result ));

        //红色 
        self.detailForm.activeColor1 = 'ff6600';
        //蓝色
        self.detailForm.activeColor2 = '20a0ff'; 
        //淡橙色
        self.detailForm.activeColor3 = 'ffd199';
        // 灰色
        self.detailForm.activeColor4 = 'e3e5e6';

         
    
        if(response.data.result.ruleId==null){
             self.detailForm.businessExtendsRuleRuleNo ="--";
        }else{
            self.detailForm.businessExtendsRuleRuleNo = response.data.result.businessExtendsRule.ruleNo
            self.detailForm.businessExtendsRuleName =  response.data.result.businessExtendsRule.businessExtendsRuleName
            
        }


        if(self.detailForm.operator =='' ){
            self.detailForm.operator = "--"
        }
        if(self.detailForm.salesMan =='' ){
            self.detailForm.salesMan= "--"
        }

        if(self.detailForm.remainDay == null){
            self.detailForm.remainDay= "--"
        }


        self.detailForm.annualAreadyExtendPerformance  =  ( !response.data.result.annualAreadyExtendPerformance  ?  0 :  (response.data.result.annualAreadyExtendPerformance));
        
        self.detailForm.finishPerformanceSum = ( !response.data.result.finishPerformanceSum  ?  0 :  (response.data.result.finishPerformanceSum));
       
        self.detailForm.phone  = Utils.iphoneSymbol(self.detailForm.phone);

        self.detailForm.annualPerformanceRatio = (self.detailForm.finishPerformanceSum)/response.data.result.annualPurchasePerformance

        //年度自己所完成的业绩率    //年度自己所完成的业绩   //年度目标进货业绩
        self.detailForm.annualOwnAreadyPurchasePerformanceRate = response.data.result.annualOwnAreadyPurchasePerformance / (response.data.result.finishPerformanceSum + response.data.result.notFinishPerformance)
        
        // console.log(response.data.result.annualOwnAreadyPurchasePerformance)

        //年度下级协助所完成的业绩率   //年度下级协助所完成的业绩   //年度目标进货业绩
        self.detailForm.annualLowerAreadyPurchasePerformanceRate = response.data.result.annualLowerAreadyPurchasePerformance  / (response.data.result.finishPerformanceSum + response.data.result.notFinishPerformance)

        
        //未完成协助所完成的业绩率 
         self.detailForm.annualNotAreadyPurchasePerformanceRate = response.data.result.notFinishPerformance  / (response.data.result.finishPerformanceSum + response.data.result.notFinishPerformance)

        //年度店铺扩展达成率    //已达成店铺拓展   //年度目标店铺拓展
        self.detailForm.storeExpansionRate  = response.data.result.annualAreadyExtendPerformance/response.data.result.annualExtendPerformance
        
        //年度目标

        //自己的长度

        if(self.detailForm.annualPurchasePerformance == 0){
            self.annualOwnAreadyPurchasePerformanceRateObject.width = 144 + 'px'
            self.annualOwnAreadyPurchasePerformanceRateObject.backgroundColor  = '#' + self.detailForm.activeColor1  //红色
            
        }else{
            self.annualOwnAreadyPurchasePerformanceRateObject.width = self.detailForm.annualOwnAreadyPurchasePerformanceRate  *144 + 'px'
            self.annualOwnAreadyPurchasePerformanceRateObject.backgroundColor  = '#' + self.detailForm.activeColor1  //红色
        }



        //下级的长度
        if(self.detailForm.annualLowerAreadyPurchasePerformance == 0){
            self.annualLowerAreadyPurchasePerformanceRateObject.width =  0 + 'px'
            self.annualLowerAreadyPurchasePerformanceRateObject.backgroundColor = '#' + self.detailForm.activeColor3    //橙色
        }else{
            self.annualLowerAreadyPurchasePerformanceRateObject.width =  self.detailForm.annualLowerAreadyPurchasePerformanceRate    *144 + 'px'
            self.annualLowerAreadyPurchasePerformanceRateObject.backgroundColor = '#' + self.detailForm.activeColor3    //橙色
        }

        
        //上级为零,下级不为零    
        if(self.annualOwnAreadyPurchasePerformanceRateObject.width =='0px'){
            self.annualLowerAreadyPurchasePerformanceRateObject.borderBottomLeftRadius =  10 + 'px';
            self.annualLowerAreadyPurchasePerformanceRateObject.borderTopLeftRadius =  10 + 'px';

        }
        //下级为零，上级不为零        
        if(self.annualLowerAreadyPurchasePerformanceRateObject.width =='0px'){
          self.annualOwnAreadyPurchasePerformanceRateObject.borderBottomRightRadius = 10 + 'px';
          self.annualOwnAreadyPurchasePerformanceRateObject.borderTopRightRadius =  10 +'px';
        }

        

        //年度目标店铺拓展
        //  1.已完成
  

        if(self.detailForm.annualExtendPerformance==0){
            self.SjhExtendPerformanceObject.width = 144 + 'px'
        }else{
            self. SjhExtendPerformance =  ( response.data.result.annualAreadyExtendPerformance/(response.data.result.notFinishShopNums + response.data.result.annualAreadyExtendPerformance) )
            //  2.未完成
            self.SjhExtendPerformanceObject.width =  self. SjhExtendPerformance  *144 + 'px'
        }
        self.SjhExtendPerformanceObject.backgroundColor = '#' + self.detailForm.activeColor2   //淡蓝色   
        console.log(response.data.result.notFinishShopNums + response.data.result.annualAreadyExtendPerformance)        
        console.log(self.SjhExtendPerformanceObject.width)
      })
      .catch(function(err) {
        self.loading = false;
        console.log(err);
      });
  },
  watch:{
      searchRegistTimeAnnual(){
          this.openAnnualAgents(this.detailForm.id,this.detailForm.shopNo)
      },
      searchRegistTime(){
          this.openAgencyRelationsance(this.detailForm.shopNo)
      },
      searchContractInformationTime(){
          this.openContractInformation()
      }

  }
};
</script>

<style >
    .grayColor{
          color: gray
    }
</style>
<style lang='less' scoped>
@import url("../assets/less/storeDetail.less");
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


.annualPurchasePerformanceCss {
    height:10px;
    width:144px;
    background-color:#e3e5e6;
    padding-top: 0px;
    float:right;
    border-radius:10px;
    position: absolute;
    top: 10px;
    left: 130px;
}


#detailStore {
  width: 98%;
  margin: 1%;
  padding: 20px;
  background-color: #ffffff;
}

.annualExtendPerformanceCss{
        height:10px;
        width:144px;
        background-color:#e3e5e6;
        padding-top: 10px;
        float:right;
        border-radius:10px;
        position: absolute;
        top: 0px;
        left: 10px;
}

.router-link-active { 
   color: #20a0ff;
   cursor: pointer;
}
.router-link-active:hover { 
   color: #1699fd;
}
.dialog-title{
    line-height: 50px;
    height: 56px;
	background-color: #f8f9fb ;
    border-radius: 5px 5px 0px 0px;
    padding: 0;
    width: 716px;
    margin: -20px 0 0 -20px;

}
.dialog-footer{
    width: 20px;height: 20px;
    position: absolute;
    right: 17px;
    top: 18px;
    cursor: pointer;
}
.picker-time{
    margin-bottom: 10px;
    float: right;
}
.search-time-wrap .picker-time{
    margin-top: -10px;
    
}
.detail-title{
    font-family: 'MicrosoftYaHei-Bold';
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 38px;
	letter-spacing: 0px;
    color: #333333;
    font-weight: bold;
}
.detail-shopno{
    font-family: 'MicrosoftYaHei';
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 38px;
	letter-spacing: 0px;
	color: #999999;
}
#detailStore .count .orderCount{
    border: none;
}
.icon-green{
    width: 6px;
	height: 6px;
    background-color: #13c21c;
    border-radius: 6px;
    display: inline-block;
    margin-right: 5px;
    position: absolute;
    top: 7px;
}
.icon-red{
    width: 6px;
	height: 6px;
    background-color: #FA2424;
    border-radius: 6px;
    display: inline-block;
    margin-right: 5px;
    position: absolute;
    top: 7px;
}
.line-middle{
    position: relative;
}
.line-middle:before{
    content:"";
    width: 1px;
	height: 331px;
	background-image: linear-gradient(180deg, 
		#fff 0%, 
		#e6e6e6 83%, 
        #fff 100%);
        position: absolute;
        left: 0;
        top: 0;
}
.info{
    font-family: 'MicrosoftYaHei';
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #666666;
}
.orderInfo{
    font-family: 'MicrosoftYaHei';
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #666666;
}
.font-color{
    color: #333333;
}
.resign_wrap{
    padding-bottom:20px;
}
.name-tel{
    font-weight: bold;
    padding:0 0 20px 10px;
}
.resign-name{
    padding-right: 30px;
}
.resign-store-icon-wrap{
    display: inline-block;
    height: 18px;
    line-height: 18px;
    color: white;
    background-color: #1699fd;
    border-radius:3px;
    margin-left: 10px;
    margin-right: 30px;
    font-size: 12px;
    padding: 0 3px;
}
.resign-color{
    color: #FA2424;
}
</style>
