<template>
    <div class="drawBackDetail" v-loading.fullscreen="loading">
        <!-- 退款图片展示 -->
        <div class="showImages" v-if="showImages">
            <!-- 展示序号 -->
            <div class="closeButto" @click="showImages = false">✘</div>
            <el-carousel :interval="10000" arrow="always" height="100%" :initial-index="imgIndex">
                <el-carousel-item v-for="(item,index) in images" :key="index">
                    <h3 class="drawBackImgList"><img class="drawBackImg" :src=item alt=""></h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 退款单信息头 -->
        <div class="title">
            <h2>退款单号：{{ refundInfo.purchaseOrderBackNo }}</h2>
            <h2>状态：{{ refundInfo.refundState === 'WAIT_AUDIT' ? '待审核':(refundInfo.refundState === 'AUDIT_PASS_REFUNDING' ? '审核通过,退款中':(refundInfo.refundState === 'REDUNS_SUCCESS' ? '退款成功' : (refundInfo.refundState === 'AUDIT_PASS_WAIT_SEND' ? '审核通过，请退货':(refundInfo.refundState === 'SEND_WAIT_RECEIVED' ? '已退回，待收货': (refundInfo.refundState === 'RECEIVED_WAIT_CONFIRM' ? '已收货，确认中':(refundInfo.refundState === 'CANCEL' ? '退款关闭' :'')))))) }}</h2>
            <el-button type="primary" @click="goBack">关闭</el-button>
        </div>
        <div class="info">
            <h2>退款单信息</h2>
            <!-- 未发货，整单退款 Start -->
            <div class="orderInfo" v-if="refundInfo.refundType === 'SEND_BEFORE_REFUND'">
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款单号：{{ refundInfo.purchaseOrderBackNo }}
                    </el-col>
                    <el-col :span="8">
                        申请时间：{{ refundInfo.createdTime}}
                    </el-col>
                    <el-col :span="8">
                        申请金额：￥{{ toFixed(refundInfo.applyRefundAmount)}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款类型：{{ refundInfo.refundType === 'SEND_BEFORE_REFUND' ? '整单退款' : (refundInfo.refundType === 'REFUND_GOODS' ? '退货退款' : (refundInfo.refundType === 'REFUND_AMOUNT' ? '仅退款' :'')) }}
                    </el-col>
                    <el-col :span="8">
                        退款原因：{{ refundInfo.refundReason }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款说明：{{ refundInfo.refundExplain === '' ? '-':refundInfo.refundExplain }}
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>原进货单信息</h3>
                <el-row :gutter="10">
                    <el-col :span="8">
                        进货单号：
                        <!-- <router-link target="_blank" :to="{ name: 'orderInfo', params: { purchaseOrderNo: refundInfo.purchaseOrderNo,shopNo:orderInfo.shop.shopNo }}">{{ refundInfo.purchaseOrderNo }}</router-link> -->
                        <a :href="linkTo" target="_Blank">{{ refundInfo.purchaseOrderNo }}</a>
                    </el-col>
                    <el-col :span="8">
                        下单时间：{{ orderInfo.createdTime }}
                    </el-col>
                    <el-col :span="8">
                        订单总价：￥{{ toFixed(orderInfo.orderSum) }}
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>客服审核</h3>
                <!-- 待审核 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'WAIT_AUDIT'">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="27%">￥{{ toFixed(refundInfo.applyRefundAmount)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="34%">
                                <el-input v-model="checkData.refundAmount" @keyup.native="checkMoney"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="13%">
                                <el-input v-model="checkData.auditExplain" :maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="13%">
                                <el-input v-model="checkData.serviceRemark" :maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="3">
                            <el-button type="primary" @click="beforePassCheck">审核通过</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button @click="beforeNoPassCheck">拒绝</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 待审核 End -->
                <!-- 审核通过，退款中 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'AUDIT_PASS_REFUNDING'">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="27%">￥{{ toFixed(refundInfo.applyRefundAmount)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="34%">
                                <el-input v-model="refundInfo.refundAmount" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="13%">
                                <el-input v-model="refundInfo.auditExplain" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="13%">
                                <el-input v-model="refundInfo.serviceRemark" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="3">
                            <el-button type="primary" @click="drawBackSuccess">退款成功</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 审核通过，退款中 End -->
                <!-- 退款成功 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'REDUNS_SUCCESS' || refundInfo.refundState === 'CANCEL'">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="27%">￥{{ toFixed(refundInfo.applyRefundAmount)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="34%">
                                <el-input v-model="refundInfo.refundAmount" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="13%">
                                <el-input v-model="refundInfo.auditExplain" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="13%">
                                <el-input v-model="refundInfo.serviceRemark" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 退款成功 End -->
            </div>
            <!-- 未发货，整单退款  End -->
            <!-- 已发货，退货退款，仅退款 Start -->
            <div class="orderInfo" v-else>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款单号：{{ refundInfo.purchaseOrderBackNo }}
                    </el-col>
                    <el-col :span="8">
                        申请时间：{{ refundInfo.createdTime}}
                    </el-col>
                    <el-col :span="8">
                        申请金额：￥{{ toFixed(refundInfo.applyRefundAmount)}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款类型：{{ refundInfo.refundType === 'SEND_BEFORE_REFUND' ? '整单退款' : (refundInfo.refundType === 'REFUND_GOODS' ? '退货退款' : (refundInfo.refundType === 'REFUND_AMOUNT' ? '仅退款' :'')) }}
                    </el-col>
                    <el-col :span="8">
                        退款原因：{{ refundInfo.refundReason }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款说明：{{ refundInfo.refundExplain === '' ? '-':refundInfo.refundExplain}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <p>退款图片：</p>
                        <div class="imgList">
                            <img :key="index" v-for="(item,index) in images" :src=item alt="" style="width:100px;height:100px;margin-left:10px;" @click="showImg(item,index)">
                        </div>
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>原进货单信息</h3>
                <el-row :gutter="10">
                    <el-col :span="8">
                        进货单号：
                        <!-- <router-link :to="{ name: 'orderInfo', params: { purchaseOrderNo: refundInfo.purchaseOrderNo,shopNo:orderInfo.shop.shopNo }}">{{ refundInfo.purchaseOrderNo }}</router-link> -->
                        <a :href="linkTo" target="_Blank">{{ refundInfo.purchaseOrderNo }}</a>
                    </el-col>
                    <el-col :span="8">
                        下单时间：{{ orderInfo.createdTime }}
                    </el-col>
                    <el-col :span="8">
                        订单总价：￥{{ toFixed(orderInfo.orderSum) }}
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>退款商品明细</h3>
                <el-table border :data="shopTableData" highlight-current-row show-summary sum-text="合计" :summary-method="getSummaries">
                    <el-table-column prop="proSku" label="商品编码" width="120px">
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称">
                        <template scope="scope">
                            <span :title=scope.row.productName style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{ scope.row.productName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="spec" label="规格" width="120px">
                        <template scope="scope">
                            <span :title=scope.row.spec style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{ scope.row.spec }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" width="80px">
                    </el-table-column>
                    <el-table-column prop="purchasePrice" label="进货价">
                    </el-table-column>
                    <el-table-column prop="productNum" label="进货数量">
                    </el-table-column>
                    <el-table-column prop="refundNum" label="退货数量">
                    </el-table-column>
                    <el-table-column prop="subtotal" label="退款金额">
                    </el-table-column>
                </el-table>
                <div class="warp"></div>
                <h3>客服审核</h3>
                <!-- 退货退款 待审核 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'WAIT_AUDIT'">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="45%">
                                <el-select v-model="checkData.refundType" @change="selectChange">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退款" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退货退款：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="35%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(checkData.applyRefundAmount)}}</span>
                                <div class="changeMoney" v-if="checkData.refundType === 'REFUND_GOODS'" @click="defaultChange">修改</div>
                            </el-form-item>
                            <el-form-item label="申请金额：" label-width="35%" v-else>
                                <el-input v-model="checkData.applyRefundAmount" class="money" @keyup.native="checkMoney"></el-input>
                                <div class="yes" @click="onChangeMoney">✔</div>
                                <div class="no" @click="cancelChange">✘</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="checkData.refundType === 'REFUND_GOODS'">
                            <el-form-item label="退款仓库：" label-width="40%">
                                <el-select v-model="checkData.drawBackDepot">
                                    <el-option label="同安仓" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="17%">
                                <el-input v-model="checkData.auditExplain" :maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="17%">
                                <el-input v-model="checkData.serviceRemark" :maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="checkData.refundType === 'REFUND_AMOUNT'">
                        <el-col :span="16">
                            <el-form-item label="实际退款金额：" label-width="17%">
                                <el-input style="width:20%;" v-model="checkData.refundAmount" @keyup.native="checkMoney"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="3">
                            <el-button type="primary" @click="afterPassCheck">审核通过</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button @click="afterNoPassCheck">拒绝</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 退货退款 待审核 End -->
                <!-- 审核通过，请退款 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'AUDIT_PASS_WAIT_SEND'">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="45%">
                                <el-select v-model="refundInfo.refundType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退款" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退货退款：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="35%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.applyRefundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="checkData.refundType === 'REFUND_GOODS'">
                            <el-form-item label="退款仓库：" label-width="40%">
                                <el-select v-model="checkData.drawBackDepot" disabled>
                                    <el-option label="同安仓" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="17%">
                                <el-input v-model="refundInfo.auditExplain" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="17%">
                                <el-input v-model="refundInfo.serviceRemark" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="2">
                            <el-button type="primary" @click="dialogFormVisible = true">补充退货信息</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 审核通过，请退款 End -->
                <!-- 补充信息弹窗 Start -->
                <div class="dialog">
                    <el-dialog title="请填写退货信息" :visible.sync="dialogFormVisible" size="tiny">
                        <el-form :model="expressInfo">
                            <el-form-item label="退货地址：" label-width="100px">
                                <span>{{ expressInfo.address }} <br> {{ expressInfo.contacts }} {{ expressInfo.contactPhone}}</span>
                            </el-form-item>
                            <el-form-item label="选择快递：" label-width="100px">
                                <el-select v-model="toExpressType" placeholder="请选择">
                                    <el-option v-for="item in expressTypeList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="快递单号：" label-width="100px">
                                <el-input v-model="expressInfo.expressNo" placeholder="多个快递单号请用空格隔开"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="onExpress">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <!-- 补充信息弹窗 End -->
                <!-- 审核通过，请退款 End -->
                <!-- 已退回，待收货 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'SEND_WAIT_RECEIVED'">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="45%">
                                <el-select v-model="refundInfo.refundType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退款" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退货退款：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="35%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.applyRefundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="checkData.refundType === 'REFUND_GOODS'">
                            <el-form-item label="退款仓库：" label-width="40%">
                                <el-select v-model="checkData.drawBackDepot" disabled>
                                    <el-option label="同安仓" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="17%">
                                <el-input v-model="refundInfo.auditExplain" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="17%">
                                <el-input v-model="refundInfo.serviceRemark" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 已退回，待收货 End -->
                <!-- 已收货，确认中 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'RECEIVED_WAIT_CONFIRM'">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="45%">
                                <el-select v-model="refundInfo.refundType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退款" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退货退款：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="35%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.applyRefundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="checkData.refundType === 'REFUND_GOODS'">
                            <el-form-item label="退款仓库：" label-width="40%">
                                <el-select v-model="checkData.drawBackDepot" disabled>
                                    <el-option label="同安仓" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="17%">
                                <el-input v-model="refundInfo.auditExplain" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="17%">
                                <el-input v-model="refundInfo.serviceRemark" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="36%">
                                <el-input v-model="checkData.refundAmount" class="inputWidth" @keyup.native="checkMoney"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="2">
                            <el-button type="primary" @click="afterSecondPassCheck">审核通过</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 已收货，确认中 End -->
                <!-- 审核通过，退款中 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'AUDIT_PASS_REFUNDING'">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="45%">
                                <el-select v-model="refundInfo.refundType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退款" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退货退款：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="35%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.applyRefundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="checkData.refundType === 'REFUND_GOODS'">
                            <el-form-item label="退款仓库：" label-width="40%">
                                <el-select v-model="checkData.drawBackDepot" disabled>
                                    <el-option label="同安仓" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="17%">
                                <el-input v-model="refundInfo.auditExplain" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="17%">
                                <el-input v-model="refundInfo.serviceRemark" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="36%">
                                <el-input v-model="refundInfo.refundAmount" class="inputWidth" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="2">
                            <el-button type="primary" @click="drawBackSuccess">退款成功</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 审核通过，退款中 End -->
                <!-- 退款成功 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'REDUNS_SUCCESS' || refundInfo.refundState === 'CANCEL'">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="45%">
                                <el-select v-model="refundInfo.refundType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退款" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退货退款：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="35%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.applyRefundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="checkData.refundType === 'REFUND_GOODS'">
                            <el-form-item label="退款仓库：" label-width="40%">
                                <el-select v-model="checkData.drawBackDepot" disabled>
                                    <el-option label="同安仓" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="17%">
                                <el-input v-model="refundInfo.auditExplain" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="17%">
                                <el-input v-model="refundInfo.serviceRemark" :maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" v-if="refundInfo.refundState === 'REDUNS_SUCCESS'">
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="36%">
                                <el-input v-model="refundInfo.refundAmount" class="inputWidth" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 退款成功 End -->
            </div>
            <!-- 已发货，退货退款，仅退款 End -->
        </div>
        <!-- 退款单日志 -->
        <div class="datelog">
            <h2>退款单日志</h2>
            <el-table border :data="tableData" highlight-current-row>
                <el-table-column prop="createdTime" label="时间" width="200px;" label-class-name="labelCss">
                </el-table-column>
                <el-table-column prop="creator" label="操作人" width="100px;" label-class-name="labelCss">
                </el-table-column>
                <el-table-column prop="opteratorContent" label="操作内容" label-class-name="labelCss">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
    <script type="text/javascript" src="../router.js"></script>
    <script>
import $ from 'jquery'
export default {
    data() {
        return {
            onDrawBack: 1,
            changeMoney: true,                  //修改金额
            dialogFormVisible: false,           //补充信息弹窗
            showImages: false,                  //图片展示
            user: '',                           //用户名
            linkTo: 'T111111',                   //链接
            allTotal: 0,                        //退款总金额
            forPass: true,
            forNoPass: true,
            wantMoney: '',                       //申请金额temp
            imgIndex: 0,                            //图片index
            loading: true,                          //遮罩
            done: 0,                             //遮罩判断
            images: [                           //图片列表
            ],

            expressTypeList: [
                {
                    value: 'STO',
                    label: '申通快递',
                },
                {
                    value: 'EMS',
                    label: 'EMS',
                },
                {
                    value: 'SF',
                    label: '顺丰速运',
                },
                {
                    value: 'QT',
                    label: '其他',
                },
            ],

            orderInfo: {
                shopNo: [{
                    shopNo: '',
                }],                     //店铺编号
                createdTime: '',                 //下单时间
                orderSum: 0,              //订单总价

            },
            refundInfo: {                       //退款单信息
                purchaseOrderBackNo: '',        //退款单号
                purchaseOrderNo: '',            //原订单号
                refundState: '',                //状态，退货流程 1：待审核（WAIT_AUDIT） 2：审核通过,退款中（AUDIT_PASS_REFUNDING）  3：退款成功（REDUNS_SUCCESS） 4：审核通过，请退货（AUDIT_PASS_WAIT_SEND） 5：已退回，待收获（SEND_WAIT_RECEIVED）   6、已收货，确认中（RECEIVED_WAIT_CONFIRM） 7、退款关闭（CANCEL）
                createdTime: '',                //申请时间
                applyRefundAmount: 0,               //申请金额
                refundType: '',                 //退款类型，是否发货；已发货：整单退款（SEND_BEFORE_REFUND）； 未发货：退货退款（REFUND_GOODS）、仅退款（REFUND_AMOUNT）
                refundReason: '',               //退款原因
                refundExplain: '',              //退款说明
                auditExplain: '',               //审核说明
                refundAmount: 0,               //申请金额
                serviceRemark: '',              //客服备注
                orderSum: '',                    //原订单总价

            },
            checkData: {                        //客服审核数据
                refundType: '',              //退款类型，判断是否是仅退款
                applyRefundAmount: 0,                  //申请金额
                drawBackDepot: '-1',             //退货仓库
                refundAmount: 0,                //实际退款金额
                auditExplain: '',                   //审核说明
                serviceRemark: '',                      //备注
            },
            shopTableData: [                    //退款商品明细表
                {
                    proSku: '',                 //商品编码
                    productName: '',            //商品名称
                    spec: '',                   //规格
                    unit: '',                   //单位
                    purchasePrice: 0,          //进货价
                    productNum: 0,               //进货数量，未完
                    refundNum: 0,             //退货数量
                    subtotal: 0,               //退货金额
                }
            ],
            toExpressType: '',               //快递选择
            expressInfo: {                      //补充快递信息
                address: '',                    //退货地址
                expressNo: '',                  //快递单号
                address: '',                        //收货地址
                contacts: '',                      //收货人
                contactPhone: '',                       //收货电话
            },
            tableData: [                        //日志
                {
                    createdTime: '',             //时间
                    creator: '',                 //操作人
                    opteratorContent: '',           //操作内容
                }
            ]
        }
    },
    created() {
        if (!this.checkSession()) return;
        this.uri = this.getUri();
        //获取id
        var src = window.location.href.split('/');
        this.id = src[src.length - 2];
        this.orderId = src[src.length - 1];
        let arr = src;

        // 获取用户信息
        if (sessionStorage.user) {
            this.user = JSON.parse(sessionStorage.user);
        }
        // 获取退货信息
        this.$getData({
            url: 'http/purchaseOrderBack/findPurchaseOrderBackByNo.jhtml',
            data: {
                'purchaseOrderBackNo': src[5],
            },
            success(response) {
                this.done++;
                this.tableData = response.data.result.purchaseOrderBackLogs;
                this.refundInfo = response.data.result;
                this.checkData = response.data.result;
                this.checkData.drawBackDepot = '-1';
                this.refundInfo.applyRefundAmount = this.toFixed(this.refundInfo.applyRefundAmount);
                this.refundInfo.refundAmount = this.toFixed(this.refundInfo.refundAmount);
                this.shopTableData = response.data.result.purchaseOrderBackDetails;
                this.wantMoney = response.data.result.applyRefundAmount;
                this.orderInfo = response.data.result;
                // 拼接订单号链接
                arr[4] = 'orderInfo';
                arr[5] = this.orderInfo.purchaseOrderNo;
                arr[6] = this.orderInfo.shopId.shopNo;
                this.linkTo = arr.join('/');
                // 日志处理
                for (let i = 0; i < this.tableData.length; i++) {
                    // if (this.tableData[i].operationState === '审核通过') {
                    //     this.tableData[i].operationState = this.refundInfo.opteratorContent;
                    //     // this.tableData[i].operationState = '审核通过,申请金额 ' + this.refundInfo.applyRefundAmount;
                    // }
                    // if (this.tableData[i].operationState === '退货') {
                    //     this.tableData[i].operationState = this.tableData[i].refundExplain;
                    // }
                    // if (this.tableData[i].operationState === '申请退款') {
                    //     this.tableData[i].operationState = this.tableData[i].opteratorContent;
                    // } 
                    if (i === 0) {
                        this.tableData[0].creator = '用户';
                        this.tableData[0].opteratorContent = '申请退款';
                    }
                }
                // 图片字符串转换数组
                this.images = response.data.result.imgUrl.split(',');
                // 列表金额格式化
                // for (let i = 0; i < this.shopTableData.length; i++) {
                //     this.shopTableData[i].subtotal = this.toFixed(this.shopTableData[i].subtotal);
                //     this.shopTableData[i].purchasePrice = this.toFixed(this.shopTableData[i].purchasePrice);
                //     this.shopTableData[i].salesPrice = this.toFixed(this.shopTableData[i].salesPrice);
                //     this.shopTableData[i].subtotal = this.toFixed(this.shopTableData[i].subtotal);
                //     this.refundInfo.totalAmount = this.refundInfo.totalAmount + Number(this.shopTableData[i].subtotal);
                // }
            },
            fail(response) {
                this.$message({
                    message: response.data.msg,
                    type: 'error'
                })
            },
        });
        //获取仓库数据
        this.$getData({
            url: '/http/purchaseOrderBack/queryRepertoryList.jhtml',
            data: {
            },
            success(response) {
                this.done++;
                for (let i = 0; i < response.data.result.length; i++) {
                    if (response.data.result[i].id === -1) {
                        this.expressInfo = response.data.result[i];
                    }
                }
            },
            fail(response) {
                this.$message({
                    message: response.data.msg,
                    type: 'error'
                })
            },
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
        // 金额校验
        checkMoney() {
            if (!/^\d+(\.\d{1,2})?$/.test(this.checkData.applyRefundAmount)) {
                if (!/\.\d{1,2}$/.test(this.checkData.applyRefundAmount)) {
                    let arr = this.checkData.applyRefundAmount.split('.');
                    arr[1] = arr[1].substring(0, 2);
                    this.checkData.applyRefundAmount = arr.join('.'); (this.checkData.applyRefundAmount);
                }
            }
            if (!/^\d+(\.\d{1,2})?$/.test(this.checkData.refundAmount)) {
                if (!/\.\d{1,2}$/.test(this.checkData.refundAmount)) {
                    let arr = this.checkData.refundAmount.split('.');
                    arr[1] = arr[1].substring(0, 2);
                    this.checkData.refundAmount = arr.join('.'); (this.checkData.refundAmount);
                }
            }
            if (!/^\d+(\.\d{1,2})?$/.test(this.refundInfo.applyRefundAmount)) {
                if (!/\.\d{1,2}$/.test(this.refundInfo.applyRefundAmount)) {
                    let arr = this.refundInfo.applyRefundAmount.split('.');
                    arr[1] = arr[1].substring(0, 2);
                    this.refundInfo.applyRefundAmount = arr.join('.'); (this.refundInfo.applyRefundAmount);
                }
            }
            if (!/^\d+(\.\d{1,2})?$/.test(this.refundInfo.refundAmount)) {
                if (!/\.\d{1,2}$/.test(this.refundInfo.refundAmount)) {
                    let arr = this.refundInfo.refundAmount.split('.');
                    arr[1] = arr[1].substring(0, 2);
                    this.refundInfo.refundAmount = arr.join('.'); (this.refundInfo.refundAmount);
                }
            }
        },
        // 下拉框选择仅退款时，固定申请金额
        selectChange(item) {
            if (!this.checkSession()) return;
            if (item === "REFUND_AMOUNT") {
                this.checkData.applyRefundAmount = this.refundInfo.totalAmount;
                this.checkData.refundAmount = '';
                this.changeMoney = true;
            } else {
                this.checkData.applyRefundAmount = this.refundInfo.applyRefundAmount;
                this.checkData.refundAmount = this.refundInfo.applyRefundAmount;
            }
        },
        //返回
        goBack() {
            if (!this.checkSession()) return;
            window.history.go(-1);
        },
        // 提交快递信息
        onExpress() {
            if (!this.checkSession()) return;
            if (this.forPass) {
                if (this.expressInfo.expressNo.trim() === '') {
                    this.$message({
                        message: '请输入单号',
                        type: 'warning'
                    });
                    return;
                }
                if (/[\，\,\.\-]+/g.test(this.expressInfo.expressNo.trim())) {
                    this.$message({
                        message: '请使用空格分隔单号！',
                        type: 'warning'
                    });
                    return;
                }
                this.expressInfo.expressNo = this.expressInfo.expressNo.trim();
                this.expressInfo.expressNo = this.expressInfo.expressNo.replace(/\s+/g, ',');
                const self = this;
                self.$ajax({
                    url: '/api/http/purchaseOrderBack/doFillInExpressNo.jhtml',
                    method: 'post',
                    data: {
                        'purchaseOrderBack.expressNo': self.expressInfo.expressNo,
                        'purchaseOrderBack.expressCode': self.toExpressType,
                        'purchaseOrderBack.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                        'purchaseOrderBack.refundType': self.checkData.refundType,
                        'purchaseOrderBack.updatorId': self.user.id,
                    },
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    if (response.data.success === 1) {
                        self.$message({
                            message: '提交成功',
                            type: 'success',
                        });
                        setTimeout(() => {
                            self.loading = true;
                            window.location.reload();
                        }, 1000)
                        self.loading = false;
                    }
                    else {
                        self.$message({
                            message: response.data.msg,
                            type: 'warning',
                        });
                        setTimeout(() => {
                            self.loading = true;
                            window.location.reload();
                        }, 1000)
                        self.loading = false;
                    }
                }).catch(function(err) {
                    self.$message({
                        message: err.data.msg,
                        type: 'error',
                    })
                });
                this.forPass = false;
                dialogFormVisible = false;
            }
            dialogFormVisible = false;
        },
        // 已发货二次审核通过
        afterSecondPassCheck() {
            if (!this.checkSession()) return;
            if (Number(this.checkData.refundAmount) > Number(this.refundInfo.applyRefundAmount)) {
                this.$message({
                    message: '实际退款金额不得超过申请退款金额！',
                    type: 'warning'
                });
                return;
            }
            if (!/^[0-9\.]+$/.test(this.checkData.refundAmount) || Number(this.checkData.refundAmount) === 0) {
                this.$message({
                    message: '请输入大于0的数字，且小数位不能超过两位',
                    type: 'warning'
                });
                return;
            }
            if (this.checkData.auditExplain === null) {
                this.checkData.auditExplain = '';
            }
            if (this.checkData.serviceRemark === null) {
                this.checkData.serviceRemark = '';
            }
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                    h('span', null, '退款金额： '),
                    h('span', null, this.checkData.refundAmount),
                    h('span', null, ' 元，请确认 '),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                const self = this;
                self.$ajax({
                    url: '/api/http/purchaseOrderBack/doAuditAmountPurchaseOrderBack.jhtml',
                    method: 'post',
                    data: {
                        'auditBackVo.auditorId': self.user.id,
                        'auditBackVo.refundAmount': self.checkData.refundAmount,
                        'auditBackVo.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                        'auditBackVo.auditState': 1,
                    },
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    if (response.data.success === 1) {
                        self.$message({
                            message: '审核通过',
                            type: 'success',
                        });
                        setTimeout(() => {
                            self.loading = true;
                            window.location.reload();
                        }, 1000)
                        self.loading = false;
                    }
                    else {
                        self.$message({
                            message: response.data.msg,
                            type: 'warning',
                        });
                        setTimeout(() => {
                            self.loading = true;
                            window.location.reload();
                        }, 1000)
                        self.loading = false;
                    }
                }).catch(function(err) {
                    self.$message({
                        message: err.data.msg,
                        type: 'error',
                    })
                });
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        },
        // 已发货审核通过
        afterPassCheck() {
            if (!this.checkSession()) return;
            if (this.forPass) {
                if (this.checkData.refundType === null) {
                    this.$message({
                        message: '请选择退款类型',
                        type: 'warning'
                    });
                    return;
                }

                if (!/^[0-9\.]+$/.test(this.checkData.applyRefundAmount) || Number(this.checkData.refundAmount) === 0) {
                    this.$message({
                        message: '请输入大于0的数字，且小数位不能超过两位',
                        type: 'warning'
                    });
                    return;
                }
                if (this.checkData.auditExplain === null) {
                    this.checkData.auditExplain = '';
                }
                if (this.checkData.serviceRemark === null) {
                    this.checkData.serviceRemark = '';
                }
                if (this.checkData.refundType === 'REFUND_AMOUNT') {
                    this.checkData.drawBackDepot = '';
                    if (Number(this.checkData.refundAmount) > Number(this.refundInfo.totalAmount)) {
                        this.$message({
                            message: '实际退款金额不得超过申请退款金额！',
                            type: 'warning'
                        });
                        return;
                    }
                }
                if (this.checkData.refundAmount != '') {
                    const self = this;
                    self.$ajax({
                        url: '/api/http/purchaseOrderBack/doAuditPurchaseOrderBack.jhtml',
                        method: 'post',
                        data: {
                            'auditBackVo.auditorId': self.user.id,
                            'auditBackVo.refundAmount': self.checkData.refundAmount,
                            'auditBackVo.auditExplain': self.checkData.auditExplain,
                            'auditBackVo.serviceRemark': self.checkData.serviceRemark,
                            'auditBackVo.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                            'auditBackVo.refundType': self.checkData.refundType,
                            'auditBackVo.repertoryId': self.checkData.drawBackDepot,
                            'auditBackVo.auditState': 1,
                        },
                        transformRequest: [function(data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response) {
                        if (response.data.success === 1) {
                            self.$message({
                                message: '审核通过',
                                type: 'success',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
                        else {
                            self.$message({
                                message: response.data.msg,
                                type: 'warning',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
                    }).catch(function(err) {
                        self.$message({
                            message: err.data.msg,
                            type: 'error',
                        })
                    });
                    this.forPass = false;
                } else {
                    const self = this;
                    self.$ajax({
                        url: '/api/http/purchaseOrderBack/doAuditPurchaseOrderBack.jhtml',
                        method: 'post',
                        data: {
                            'auditBackVo.auditorId': self.user.id,
                            'auditBackVo.refundAmount': self.checkData.applyRefundAmount,
                            'auditBackVo.auditExplain': self.checkData.auditExplain,
                            'auditBackVo.serviceRemark': self.checkData.serviceRemark,
                            'auditBackVo.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                            'auditBackVo.refundType': self.checkData.refundType,
                            'auditBackVo.repertoryId': self.checkData.drawBackDepot,
                            'auditBackVo.auditState': 1,
                        },
                        transformRequest: [function(data) {
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response) {
                        if (response.data.success === 1) {
                            self.$message({
                                message: '审核通过',
                                type: 'success',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
                        else {
                            self.$message({
                                message: response.data.msg,
                                type: 'warning',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
                    }).catch(function(err) {
                        self.$message({
                            message: err.data.msg,
                            type: 'error',
                        })
                    });
                    this.forPass = false;
                }
            }
        },
        // 已发货审核拒绝
        afterNoPassCheck() {
            if (!this.checkSession()) return;
            if (this.forNoPass) {
                if (this.checkData.refundType === null) {
                    this.$message({
                        message: '请选择退款类型',
                        type: 'warning'
                    });
                    return;
                }
                if (this.checkData.refundType === 'REFUND_AMOUNT') {
                    this.checkData.drawBackDepot = '';
                    console.log(Number(this.checkData.refundAmount) > Number(this.refundInfo.totalAmount));
                    if (Number(this.checkData.refundAmount) > Number(this.refundInfo.totalAmount)) {
                        this.$message({
                            message: '实际退款金额不得超过申请退款金额！',
                            type: 'warning'
                        });
                        return;
                    }
                    this.checkData.applyRefundAmount = this.checkData.refundAmount;
                }
                if (this.checkData.auditExplain === null) {
                    this.checkData.auditExplain = '';
                }
                if (this.checkData.serviceRemark === null) {
                    this.checkData.serviceRemark = '';
                }
                const self = this;
                self.$ajax({
                    url: '/api/http/purchaseOrderBack/doAuditPurchaseOrderBack.jhtml',
                    method: 'post',
                    data: {
                        'auditBackVo.auditorId': self.user.id,
                        'auditBackVo.refundAmount': self.checkData.applyRefundAmount,
                        'auditBackVo.auditExplain': self.checkData.auditExplain,
                        'auditBackVo.serviceRemark': self.checkData.serviceRemark,
                        'auditBackVo.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                        'auditBackVo.refundType': self.checkData.refundType,
                        'auditBackVo.repertoryId': self.checkData.drawBackDepot,
                        'auditBackVo.auditState': 0,
                    },
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    if (response.data.success === 1) {
                        self.$message({
                            message: '审核拒绝',
                            type: 'success',
                        });
                        setTimeout(() => {
                            self.loading = true;
                            window.location.reload();
                        }, 1000)
                        self.loading = false;
                    }
                    else {
                        self.$message({
                            message: response.data.msg,
                            type: 'warning',
                        });
                        setTimeout(() => {
                            self.loading = true;
                            window.location.reload();
                        }, 1000)
                        self.loading = false;
                    }
                }).catch(function(err) {
                    self.$message({
                        message: err.data.msg,
                        type: 'error',
                    })
                });
                this.forNoPass = false;
            }
        },
        // 未发货审核通过
        beforePassCheck() {
            if (!this.checkSession()) return;
            if (this.forPass) {
                if (Number(this.checkData.refundAmount) > Number(this.refundInfo.applyRefundAmount)) {
                    this.$message({
                        message: '实际退款金额不得超过申请的订单总价金额！',
                        type: 'warning'
                    });
                    return;
                }
                if (!/^[0-9\.]+$/.test(this.checkData.refundAmount) || Number(this.checkData.refundAmount) === 0) {
                    this.$message({
                        message: '请输入大于0的数字，且小数位不能超过两位',
                        type: 'warning'
                    });
                    return;
                }
                if (this.checkData.auditExplain === null) {
                    this.checkData.auditExplain = '';
                }
                if (this.checkData.serviceRemark === null) {
                    this.checkData.serviceRemark = '';
                }
                const self = this;
                self.$ajax({
                    url: '/api/http/purchaseOrderBack/doAuditPurchaseOrderBack.jhtml',
                    method: 'post',
                    data: {
                        'auditBackVo.auditorId': self.user.id,
                        'auditBackVo.refundAmount': self.checkData.refundAmount,
                        'auditBackVo.auditExplain': self.checkData.auditExplain,
                        'auditBackVo.serviceRemark': self.checkData.serviceRemark,
                        'auditBackVo.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                        'auditBackVo.refundType': self.refundInfo.refundType,
                        'auditBackVo.auditState': 1,
                    },
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    if (response.data.success === 1) {
                    self.$message({
                        message: '审核通过',
                        type: 'success',
                    });
                    setTimeout(() => {
                        self.loading = true;
                        window.location.reload();
                    }, 1000)
                    self.loading = false;}
                    else{
                            self.$message({
                                message: response.data.msg,
                                type: 'warning',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
                }).catch(function(err) {
                    self.$message({
                        message: err.data.msg,
                        type: 'error',
                    })
                });
                this.forPass = false;
            }
        },
        // 未发货审核拒绝
        beforeNoPassCheck() {
            if (!this.checkSession()) return;
            if (this.forNoPass) {
                if (Number(this.checkData.refundAmount) > Number(this.refundInfo.applyRefundAmount)) {
                    this.$message({
                        message: '实际退款金额不得超过申请的订单总价金额！',
                        type: 'warning'
                    });
                    return;
                }
                if (this.checkData.auditExplain === null) {
                    this.checkData.auditExplain = '';
                }
                if (this.checkData.serviceRemark === null) {
                    this.checkData.serviceRemark = '';
                }
                const self = this;
                self.$ajax({
                    url: '/api/http/purchaseOrderBack/doAuditPurchaseOrderBack.jhtml',
                    method: 'post',
                    data: {
                        'auditBackVo.auditorId': self.user.id,
                        'auditBackVo.refundAmount': self.checkData.refundAmount,
                        'auditBackVo.auditExplain': self.checkData.auditExplain,
                        'auditBackVo.serviceRemark': self.checkData.serviceRemark,
                        'auditBackVo.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                        'auditBackVo.refundType': self.refundInfo.refundType,
                        'auditBackVo.auditState': 0,
                    },
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    if (response.data.success === 1) {
                    self.$message({
                        message: '审核拒绝',
                        type: 'success',
                    });
                    setTimeout(() => {
                        self.loading = true;
                        window.location.reload();
                    }, 1000)
                    self.loading = false;}
                    else{
                            self.$message({
                                message: response.data.msg,
                                type: 'warning',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
                }).catch(function(err) {
                    console.log(err);
                    self.$message({
                        message: err.data.msg,
                        type: 'error',
                    })
                });
                this.forNoPass = false;
            }
        },
        //退款成功
        drawBackSuccess() {
            if (!this.checkSession()) return;
            if (this.forPass) {
                const self = this;
                self.$ajax({
                    url: '/api/http/purchaseOrderBack/doFinishPurchaseOrderBack.jhtml',
                    method: 'post',
                    data: {
                        'purchaseOrderBack.updatorId': self.user.id,
                        'purchaseOrderBack.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                    },
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    if (response.data.success === 1) {
                    self.$message({
                        message: '退款成功',
                        type: 'success',
                    });
                    setTimeout(() => {
                        self.loading = true;
                        window.location.reload();
                    }, 1000)
                    self.loading = false;}
                    else{
                            self.$message({
                                message: response.data.msg,
                                type: 'warning',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
                }).catch(function(err) {
                    self.$message({
                        message: err.data.msg,
                        type: 'error',
                    })
                });
                this.forPass = false;
            }
        },
        // 展示图片
        showImg(img, index) {
            this.imgIndex = Number(index);
            this.showImages = true;
        },
        // 小数位补齐
        toFixed(num) {
            return Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3)
        },
        //获取uri
        getUri() {
            if (document.cookie) {
                var cookie = document.cookie.split(";");
                for (var index = 0; index < cookie.length; index++) {
                    var cookies = cookie[index].split("=");
                    if (cookies[0] == 'adminUri') {
                        return cookies[1];
                    }
                }
            }
        },
        //变更金额  
        onChangeMoney() {
            if (!this.checkSession()) return;
            if (!/^\d+(\.\d{1,2})?$/.test(this.checkData.applyRefundAmount)) {
                this.$message({
                    message: '小数位为2位数',
                    type: 'warning'
                });
                return;
            }
            if (Number(this.checkData.applyRefundAmount) > Number(this.refundInfo.totalAmount)) {
                this.$message({
                    message: '申请金额不得超过申请的退款金额总价！',
                    type: 'warning'
                });
                return;
            }
            if (this.checkData.refundType === "REFUND_AMOUNT") {
                this.checkData.applyRefundAmount = this.wantMoney;
            }
            if (Number(this.checkData.refundAmount) === 0 || Number(this.checkData.applyRefundAmount) === 0) {
                this.$message({
                    message: '金额不能为0',
                    type: 'warning',
                });
                return;
            }

            const self = this;
            self.$ajax({
                url: '/api/http/purchaseOrderBack/updatePurchaseOrderBack.jhtml',
                method: 'post',
                data: {
                    'purchaseOrderBack.applyRefundAmount': self.checkData.applyRefundAmount,
                    'purchaseOrderBack.purchaseOrderBackNo': self.refundInfo.purchaseOrderBackNo,
                    'purchaseOrderBack.updatorId': self.user.id,
                    'purchaseOrderBack.refundType': self.checkData.refundType,
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                if (response.data.success === 1) {
                self.$message({
                    message: '变更成功',
                    type: 'success',
                });
                setTimeout(() => {
                    self.loading = true;
                    window.location.reload();
                }, 1000)
                self.loading = false;}
                else{
                            self.$message({
                                message: response.data.msg,
                                type: 'warning',
                            });
                            setTimeout(() => {
                                self.loading = true;
                                window.location.reload();
                            }, 1000)
                            self.loading = false;
                        }
            }).catch(function(err) {
                self.$message({
                    message: err.data.msg,
                    type: 'error',
                })
            });
            this.changeMoney = true;
        },
        // 点击修改
        defaultChange() {
            if (!this.checkSession()) return;
            this.wantMoney = this.refundInfo.applyRefundAmount;
            this.changeMoney = false;
        },
        // 取消金额修改且复原申请金额
        cancelChange() {
            if (!this.checkSession()) return;
            this.checkData.applyRefundAmount =
                this.wantMoney;
            this.changeMoney = true;
        },
        //合计方法
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 5) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value)) && index > 5) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
                if (index === 7) {
                    sums[index] = this.toFixed(sums[index]);
                }
            });
            return sums;
        }
    },
    components: {
    },
    watch: {
        // 'checkData.applyRefundAmount': {
        //     handler(curVal, oldVal) {
        //         if (!/^\d+(\.\d{1,2})?$/.test(curVal)) {
        //             if (!/\.\d{1,2}$/.test(curVal)) {
        //                 // console.log(111);
        //                 // let arr = curVal.split('.');
        //                 // arr[1] = arr[1].substring(0, 2);
        //                 // console.log(arr);
        //                 // this.checkData.applyRefundAmount = arr.join('.');
        //                 // console.log(this.checkData.applyRefundAmount);
        //             }
        //         }
        //     },
        //     deep: true,
        // },
        done(val) {
            if (val === 2) {
                this.loading = false;
            }
        }
    }
}
</script>
    <style lang="less" scoped>
@import url('../assets/less/drawBackDetail.less');
</style>
<style>
.el-table .labelCss {
    background-color: #fff;
}

.el-table .el-table__footer-wrapper {
    font-weight: 600;
}
</style>