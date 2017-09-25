<template>
    <!-- v-loading.fullscreen="loading" -->
    <div class="drawBackDetail">
        <!-- 退款图片展示 -->
        <div class="showImages" v-if="showImages">
            <!-- 展示序号 -->
            <div class="closeButto" @click="showImages = false">✘</div>
            <el-carousel :interval="5000" arrow="always" height="100%" initial-index="1">
                <el-carousel-item v-for="(item,index) in images" :key="item">
                    <h3 class="drawBackImgList"><img class="drawBackImg" :src=item.imageUrl alt=""></h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="title">
            <h2>退款单单号：{{ refundInfo.purchaseOrderBackNo }}</h2>
            <h2>状态：{{ refundInfo.refundState === 'WAIT_AUDIT' ? '待审核':(refundInfo.refundState === 'AUDIT_PASS' ? '审核通过':(refundInfo.refundState === 'REFUNDING' ? '退款中' : (refundInfo.refundState === 'REDUNS_SUCCESS' ? '退款成功' : (refundInfo.refundState === 'AUDIT_PASS_WAIT_SEND' ? '审核通过，请退货':(refundInfo.refundState === 'SEND_WAIT_RECEIVED' ? '已退回，待收货': (refundInfo.refundState === 'RECEIVED_WAIT_CONFIRM' ? '已收货，确认中':(refundInfo.refundState === 'CANCEL' ? '退款关闭' :''))))))) }}</h2>
            <el-button type="primary">关闭</el-button>
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
                        申请金额：￥{{ toFixed(refundInfo.refundAmount)}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款类型：{{ refundInfo.refundType === 'SEND_BEFORE_REFUND' ? '发货前退款' : (refundInfo.refundType === 'REFUND_GOODS' ? '退款退货' : (refundInfo.refundType === 'REFUND_AMOUNT' ? '仅退款' :'')) }}
                    </el-col>
                    <el-col :span="8">
                        退款原因：{{ refundInfo.refundReason }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款说明：{{ refundInfo.refundExplain}}
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>原进货单信息</h3>
                <el-row :gutter="10">
                    <el-col :span="8">
                        进货单号：
                        <router-link :to="{ name: 'orderInfo', params: { purchaseOrderNo: refundInfo.purchaseOrderNo,shopNo:orderInfo.shopNo }}">{{ refundInfo.purchaseOrderNo }}</router-link>
                    </el-col>
                    <el-col :span="8">
                        下单时间：{{ orderInfo.createTime }}
                    </el-col>
                    <el-col :span="8">
                        订单总价：￥{{ toFixed(orderInfo.depositAmount) }}
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>客服审核</h3>
                <!-- 待审核 Start -->
                <el-form v-model="checkData" v-if="refundInfo.refundState === 'WAIT_AUDIT'">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%">￥{{ toFixed(refundInfo.refundAmount)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="30%">
                                <el-input v-model="actualMoney"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="actualMoney" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="actualMoney" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="3">
                            <el-button type="primary">审核通过</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button>拒绝</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 待审核 End -->
                <!-- 审核通过，退款中 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 2">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%">￥{{ toFixed(refundInfo.refundAmount)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="30%">
                                <el-input v-model="actualMoney" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="actualMoney" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="actualMoney" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="3">
                            <el-button type="primary">退款成功</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 审核通过，退款中 End -->
                <!-- 退款成功 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 6">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%">￥{{ toFixed(refundInfo.refundAmount)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="实际退款金额：" label-width="30%">
                                <el-input v-model="actualMoney" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="actualMoney" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="actualMoney" maxlength="100" disabled="disabled"></el-input>
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
                        申请金额：￥{{ toFixed(refundInfo.refundAmount)}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款类型：{{ refundInfo.refundType === 'SEND_BEFORE_REFUND' ? '发货前退款' : (refundInfo.refundType === 'REFUND_GOODS' ? '退款退货' : (refundInfo.refundType === 'REFUND_AMOUNT' ? '仅退款' :'')) }}
                    </el-col>
                    <el-col :span="8">
                        退款原因：{{ refundInfo.refundReason }}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款说明：{{ refundInfo.refundExplain}}
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <p>退款图片：</p>
                        <div class="imgList">
                            <img :key="item" v-for="(item,index) in images" :src=item.imageUrl alt="" style="width:100px;height:100px;margin-left:10px;" @click="showImg(item,index)">
                        </div>
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>原进货单信息</h3>
                <el-row :gutter="10">
                    <el-col :span="8">
                        进货单号：
                        <router-link :to="{ name: 'orderInfo', params: { purchaseOrderNo: refundInfo.purchaseOrderNo,shopNo:orderInfo.shopNo }}">{{ refundInfo.purchaseOrderNo }}</router-link>
                    </el-col>
                    <el-col :span="8">
                        下单时间：{{ orderInfo.createTime }}
                    </el-col>
                    <el-col :span="8">
                        订单总价：￥{{ toFixed(orderInfo.depositAmount) }}
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
                    <el-table-column prop="salesPrice" label="单价" width="80px">
                        <template scope="scope">
                            {{ toFixed(scope.row.salesPrice) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="purchasePrice" label="进货价">
                    </el-table-column>
                    <el-table-column prop="shopNums" label="进货数量">
                    </el-table-column>
                    <el-table-column prop="productNum" label="退货数量">
                    </el-table-column>
                    <el-table-column prop="subtotal" label="退款金额">
                    </el-table-column>
                </el-table>
                <div class="warp"></div>
                <h3>客服审核</h3>
                <!-- 退货退款 待审核 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 1">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="33%">
                                <el-select v-model="checkData.drawBackType">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退货" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退款退货：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.refundAmount)}}</span>
                                <div class="changeMoney" @click="changeMoney = false">修改</div>
                            </el-form-item>
                            <el-form-item label="申请金额：" label-width="25%" v-else>
                                <el-input v-model="checkData.newWantMoney" class="money"></el-input>
                                <div class="yes" @click="onChangeMoney">✔</div>
                                <div class="no" @click="changeMoney = true">✘</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退款仓库：" label-width="30%">
                                <el-select v-model="checkData.drawBackDepot">
                                    <el-option label="同安仓" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="checkData.passInfo" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="checkData.reamk" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="3">
                            <el-button type="primary">审核通过</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button>拒绝</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 退货退款 待审核 End -->
                <!-- 审核通过，请退款 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 2">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="33%">
                                <el-select v-model="checkData.drawBackType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退货" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退款退货：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.refundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退款仓库：" label-width="30%">
                                <el-select v-model="checkData.drawBackDepot" disabled="disabled">
                                    <el-option label="同安仓" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="checkData.passInfo" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="checkData.reamk" maxlength="100" disabled="disabled"></el-input>
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
                            <el-form-item label="退货地址：" :label-width="100">
                                <span>厦门市思明区会展南路7号109之五号写字楼4楼醉品 仓储物流 13300009999</span>
                            </el-form-item>
                            <el-form-item label="选择快递：" :label-width="100">
                                <el-select v-model="expressInfo.expressType" placeholder="请选择">
                                    <el-option value="1" label="圆通"></el-option>
                                    <el-option value="2" label="EMS"></el-option>
                                    <el-option value="3" label="中通"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="快递单号：" label-width="21%">
                                <el-input v-model="expressInfo.expressNo" placeholder="多个快递单号请用逗号隔开"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <!-- 补充信息弹窗 End -->
                <!-- 审核通过，请退款 End -->
                <!-- 已退回，待确认 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 3">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="33%">
                                <el-select v-model="checkData.drawBackType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退货" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退款退货：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.refundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退款仓库：" label-width="30%">
                                <el-select v-model="checkData.drawBackDepot" disabled="disabled">
                                    <el-option label="同安仓" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="checkData.passInfo" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="checkData.reamk" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 已退回，待确认 End -->
                <!-- 已退货，确认中 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 4">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="33%">
                                <el-select v-model="checkData.drawBackType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退货" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退款退货：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.refundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退款仓库：" label-width="30%">
                                <el-select v-model="checkData.drawBackDepot" disabled="disabled">
                                    <el-option label="同安仓" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="checkData.passInfo" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="checkData.reamk" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label="退款金额：" label-width="25%">
                                <el-input v-model="checkData.actualMoney" class="inputWidth"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="2">
                            <el-button type="primary">审核通过</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 已退货，退款中 End -->
                <!-- 审核通过，退款中 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 5">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="33%">
                                <el-select v-model="checkData.drawBackType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退货" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退款退货：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.refundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退款仓库：" label-width="30%">
                                <el-select v-model="checkData.drawBackDepot" disabled="disabled">
                                    <el-option label="同安仓" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="checkData.passInfo" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="checkData.reamk" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label="退款金额：" label-width="25%">
                                <el-input v-model="checkData.actualMoney" class="inputWidth" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="2">
                            <el-button type="primary">退款成功</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 审核通过，退款中 End -->
                <!-- 退款成功 Start -->
                <el-form v-model="checkData" v-if="onDrawBack === 6">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="退款类型：" label-width="33%">
                                <el-select v-model="checkData.drawBackType" disabled="disabled">
                                    <el-option label="退货退款" value="REFUND_GOODS"></el-option>
                                    <el-option label="仅退货" value="REFUND_AMOUNT"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">退款退货：退货的地址为厦门仓。<br/>只退款：商品不用退回，直接退款给客户。</div>
                                <div class="hint">❓</div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%" v-if="changeMoney">
                                ￥
                                <span>{{ toFixed(refundInfo.refundAmount)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退款仓库：" label-width="30%">
                                <el-select v-model="checkData.drawBackDepot" disabled="disabled">
                                    <el-option label="同安仓" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="审核说明：" label-width="12%">
                                <el-input v-model="checkData.passInfo" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="客服备注：" label-width="12%">
                                <el-input v-model="checkData.reamk" maxlength="100" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label="退款金额：" label-width="25%">
                                <el-input v-model="checkData.actualMoney" class="inputWidth" disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- 退款成功 End -->
            </div>
            <!-- 已发货，退货退款，仅退款 End -->
        </div>
        <div class="datelog">
            <h2>退款单日志</h2>
            <el-table border :data="tableData" highlight-current-row>
                <el-table-column prop="updateTime" label="时间" width="200px;" label-class-name="labelCss">
                </el-table-column>
                <el-table-column prop="upator" label="操作人" width="100px;" label-class-name="labelCss">
                </el-table-column>
                <el-table-column prop="tableContent" label="操作内容" label-class-name="labelCss">
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
            loading: true,
            showImages: false,                  //图片展示
            images: [                           //图片列表
                {
                    imageUrl: '',
                },
                {
                    imageUrl: '',
                },
            ],

            orderInfo: {
                shopNo: '',                     //店铺编号
                createTime: '',                 //下单时间
                depositAmount: '',              //订单总价

            },
            refundInfo: {                       //退款单信息
                purchaseOrderBackNo: '',        //退款单号
                purchaseOrderNo: '',            //原订单号
                refundState: '',                //状态，退货流程 1：待审核（WAIT_AUDIT） 2：审核通过（AUDIT_PASS） 3：退款中（REFUNDING） 4：退款成功（REDUNS_SUCCESS） 5：审核通过，请退货（AUDIT_PASS_WAIT_SEND） 6：已退回，待收获（SEND_WAIT_RECEIVED）   7、已收货，确认中（RECEIVED_WAIT_CONFIRM） 8、退款关闭（CANCEL）
                createdTime: '',                //申请时间
                refundAmount: '',               //申请金额
                refundType: '',                 //退款类型，是否发货；已发货：整单退款（SEND_BEFORE_REFUND）； 未发货：退款退货（REFUND_GOODS）、仅退款（REFUND_AMOUNT）
                refundReason: '',               //退款原因
                refundExplain: '',              //退款说明
            },

            checkData: {                        //客服审核数据
                drawBackType: '',              //退款类型，判断是否是仅退款
                wantMoney: '',                  //申请金额
                newWantMoney: '',               //变更金额替换值
                drawBackDepot: '1',             //退货仓库
                actualMoney: '',                //实际退款金额
                passInfo: '',                   //审核说明
                reamk: '',                      //备注
            },

            shopTableData: [                    //退款商品明细表
                {
                    proSku: '',                 //商品编码
                    productName: '',            //商品名称
                    spec: '',                   //规格
                    salesPrice: '',             //单价
                    purchasePrice: '',          //进货价
                    shopNums: '',               //进货数量，未完
                    productNum: '',             //退货数量
                    subtotal: '',               //退货金额
                }
            ],

            expressInfo: {                      //补充快递信息
                address: '',                    //退货地址
                expressType: '',                //快递选择
                expressNo: '',                  //快递单号
            },

            tableData: [                        //日志
                {
                    updateTime: '',             //时间
                    upator: '',                 //操作人
                    tableContent: '',           //操作内容
                }
            ]
        }
    },
    created() {
        this.uri = this.getUri();
        //获取id
        var src = window.location.href.split('/');
        this.id = src[src.length - 2];
        this.orderId = src[src.length - 1];
        console.log(src[5]);

        this.$getData({
            url: 'http/purchaseOrderBack/findPurchaseOrderBackByNo.jhtml',
            data: {
                'purchaseOrderBackNo': src[5],
            },
            success(response) {
                this.tableData = response.data.result.purchaseOrderBackLogs;
                this.refundInfo = response.data.result;
                this.orderInfo = response.data.result.shopId;
                this.shopTableData = response.data.result.purchaseOrderBackDetails;
                var imgArr = new Array(6);
                imgArr = response.data.result.imgUrl.split(',');
                console.log(imgArr);
                for (var i = 0; i < imgArr.length; i++) {
                    this.images[i].imageUrl = imgArr[i];
                }
                for (var i = 0; i < this.shopTableData.length; i++) {
                    this.shopTableData[i].subtotal = this.toFixed(this.shopTableData[i].subtotal);
                    this.shopTableData[i].purchasePrice = this.toFixed(this.shopTableData[i].purchasePrice);
                    this.shopTableData[i].salesPrice = this.toFixed(this.shopTableData[i].salesPrice);
                }
                // this.loading = false;
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
        // 展示图片
        showImg(img, index) {
            this.showImages = true;
            console.log(img);
            console.log(index);
        },
        // 小数位补齐
        toFixed(num) {
            return Number(num).toFixed(6).substring(0, Number(num).toFixed(6).lastIndexOf('.') + 3)
        },
        //获取url
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
            this.checkData.wantMoney = this.checkData.newWantMoney;
            this.changeMoney = true;
        },
        //合计方法
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 5) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value)) && index > 5) {
                    // console.log(values);
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
            });

            return sums;
        }
    },
    components: {
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
</style>