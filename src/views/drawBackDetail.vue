<template>
    <div class="drawBackDetail">
        <div class="title">
            <h2>退款单单号：T11111111111111</h2>
            <h2>状态：待审核</h2>
            <el-button type="primary">关闭</el-button>
        </div>
        <div class="info">
            <h2>退款单信息</h2>
            <!-- 未发货，整单退款 Start -->
            <div class="orderInfo" v-if="isExpress">
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款单号：T111111111111
                    </el-col>
                    <el-col :span="8">
                        申请时间：2017-05-05
                    </el-col>
                    <el-col :span="8">
                        申请金额：￥13330.00
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款类型：整单退款
                    </el-col>
                    <el-col :span="8">
                        退款原因：拍错/多拍/不想要
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款说明：这段描述很长很长
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>原进货单信息</h3>
                <el-row :gutter="10">
                    <el-col :span="8">
                        进货单号：T00000000000（链接）
                    </el-col>
                    <el-col :span="8">
                        下单时间：2017-01-01
                    </el-col>
                    <el-col :span="8">
                        订单总价：￥19999.00
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>客服审核</h3>
                <el-form v-model="checkData">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="申请金额：" label-width="25%">￥13330.00
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
                        <el-col :span="2">
                            <el-button type="primary">审核通过</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button>拒绝</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <!-- 未发货，整单退款  End -->
            <!-- 已发货，退货退款，仅退款 Start -->
            <div class="orderInfo" v-else>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款单号：T111111111111
                    </el-col>
                    <el-col :span="8">
                        申请时间：2017-05-05
                    </el-col>
                    <el-col :span="8">
                        申请金额：￥13330.00
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款类型：整单退款
                    </el-col>
                    <el-col :span="8">
                        退款原因：拍错/多拍/不想要
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="8">
                        退款说明：这段描述很长很长
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <p>退款图片：</p>
                        <div class="gallery">
                            <vue-images :imgs="images" :modalclose="modalclose" :keyinput="keyinput" :mousescroll="mousescroll" :showclosebutton="showclosebutton" :showcaption="showcaption" :imagecountseparator="imagecountseparator" :showimagecount="showimagecount" :showthumbnails="showthumbnails">
                            </vue-images>
                        </div>
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>原进货单信息</h3>
                <el-row :gutter="10">
                    <el-col :span="8">
                        进货单号：T00000000000（链接）
                    </el-col>
                    <el-col :span="8">
                        下单时间：2017-01-01
                    </el-col>
                    <el-col :span="8">
                        订单总价：￥19999.00
                    </el-col>
                </el-row>
                <div class="warp"></div>
                <h3>退款商品明细</h3>
                <el-table border :data="shopTableData" show-summary sum-text="合计" :summary-method="getSummaries">
                    <el-table-column prop="ShopNo" label="商品编码" width="120px">
                    </el-table-column>
                    <el-table-column prop="shopName" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="guige" label="规格" width="120px">
                    </el-table-column>
                    <el-table-column prop="price" label="单价" width="80px">
                    </el-table-column>
                    <el-table-column prop="orderPrice" label="进货价">
                    </el-table-column>
                    <el-table-column prop="shopNums" label="进货数量">
                    </el-table-column>
                    <el-table-column prop="drawBackNunms" label="退货数量">
                    </el-table-column>
                    <el-table-column prop="totalMoney" label="退款金额">
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
                                    <el-option label="退货退款" value="1"></el-option>
                                    <el-option label="仅退货" value="2"></el-option>
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
                                <span>13330.00</span>
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
                        <el-col :span="2">
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
                                    <el-option label="退货退款" value="1"></el-option>
                                    <el-option label="仅退货" value="2"></el-option>
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
                                <span>13330.00</span>
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
                            <el-form-item label="退货地址：" :label-width="formLabelWidth">
                                <span>厦门市思明区会展南路7号109之五号写字楼4楼醉品  仓储物流 13300009999</span>
                            </el-form-item>
                            <el-form-item label="选择快递：" :label-width="formLabelWidth">
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
            </div>
            <!-- 已发货，退货退款，仅退款 End -->
        </div>
        <div class="datelog">
            <h2>退款单日志</h2>
            <el-table border :data="tableData" @sort-change='store'>
                <el-table-column prop="tableTime" label="时间" width="200px;" label-class-name="labelCss">
                </el-table-column>
                <el-table-column prop="tableCreater" label="操作人" width="100px;" label-class-name="labelCss">
                </el-table-column>
                <el-table-column prop="tableContent" label="操作内容" label-class-name="labelCss">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script type="text/javascript" src="../router.js"></script>
<script>
import vueImages from 'vue-images'
export default {
    data() {
        return {
            isExpress: false,                //是否发货；已发货：整单退款； 未发货：退款退货、仅退款
            onDrawBack: 2,               //退货流程（第几步骤） 1：待审核 2：审核通过，请退款 3：已退回，待确认 4：已收货，确认中 5：审核通过，退款中 6：退款成功   7、退款关闭（审核拒绝） 8、退款关闭（用户取消）
            changeMoney: true,               //修改金额
            dialogFormVisible:false,        //补充信息弹窗
            images: [
                {
                    imageUrl: 'src/assets/images/tywap_04.png',
                    caption: '<a href="#">Photo by 1</a>'
                },
                {
                    imageUrl: 'src/assets/images/tywap_04.png',
                    caption: 'Photo by 2'
                },
                {
                    imageUrl: 'src/assets/images/tywap_04.png',
                    caption: 'Photo by 3'
                },
                {
                    imageUrl: 'src/assets/images/tywap_04.png',
                    caption: 'Photo by 4'
                },
                {
                    imageUrl: 'src/assets/images/tywap_04.png',
                    caption: 'Photo by 5'
                },
                {
                    imageUrl: 'src/assets/images/tywap_04.png',
                    caption: 'Photo by 6'
                },
            ],                  //图片列表
            modalclose: true,
            keyinput: true,
            mousescroll: true,
            showclosebutton: true,
            showcaption: true,
            imagecountseparator: 'of',
            showimagecount: true,
            showthumbnails: true,
            checkData: {                    //客服审核数据
                drawBackType: '1',            //退款类型，判断是否是仅退款
                wantMoney: '',               //申请金额
                newWantMoney: '',             //变更金额替换值
                drawBackDepot: '1',            //退货仓库
                actualMoney: '',             //实际退款金额
                passInfo: '',                //审核说明
                reamk: '',                   //备注
            },
            shopTableData: [                 //退款商品明细表
                {
                    ShopNo: '',              //商品编码
                    shopName: '',            //商品名称
                    guige: '',               //规格
                    price: '',               //单价
                    orderPrice: '',          //进货价
                    shopNums: '',            //进货数量
                    drawBackNunms: '',       //退货数量
                    totalMoney: '',          //退货金额
                }
            ],
            expressInfo:{
                address:'',                 //退货地址
                expressType:'',             //快递选择
                expressNo:'',               //快递单号
            },
            tableData: [
                {
                    tableTime: '',          //时间
                    tableCreater: '',              //操作人
                    tableContent: '',               //操作内容
                }
            ]
        }
    },
    created() {
    },
    methods: {
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
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = 'N/A';
                }
            });

            return sums;
        }
    },
    components: {
        vueImages: vueImages
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