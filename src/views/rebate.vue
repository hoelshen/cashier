<template>
<div>
      <div class="rebate" v-if="!ifEdit">
          <el-row class="content_title">
              <h2>Zuipin拓展返利设置新增</h2>
              <!-- <div class="content_closeBtn" @click="goBack">X</div> -->
          </el-row>
          <el-row class="text-wrap">
              <p>
                  <span>进货款定义：</span>
                  <span>首批进货款</span>
              </p>
          </el-row>
          <el-form ref="form" :model="form"  label-width="200px">
            <el-row  class="text-wrap">
              <el-col  class="fl-left">
                  <el-form-item label="时间周期：" >
                          <el-radio  v-model="form.zpTimeChose"  label="CONTRACT_TERM" >合同期</el-radio>
                          <el-radio v-model="form.zpTimeChose" label="TIME_RANGE">时间范围</el-radio>
                  </el-form-item>
              </el-col>
          </el-row>
            <div v-if="form.zpTimeChose=='CONTRACT_TERM'">
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数："
                        prop="zpSingleRebate"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]" >
                            <el-input type="zpSingleRebate" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.zpSingleRebate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数："
                        prop="zpAreaRebate"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                            <el-input type="zpAreaRebate" placeholder="请输入折扣率"  class="pencent-num" v-model.number="form.zpAreaRebate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div  v-if="form.zpTimeChose=='TIME_RANGE'">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label=" 1）正式签约起" 
                        prop="zpTimeLimit.zpdateBefore"
                          :rules="[
                            { required: true, message: '时间不能为空'},
                            { type: 'number', message: '时间必须为数字值'},
                            { pattern: /^[1-9]\d*$/, message: '必须为正整数' }
                            ]">
                            <el-input type="zpTimeLimit.zpdateBefore" placeholder="请输入正整数"  class="sig-time1" v-model.number="form.zpTimeLimit.zpdateBefore"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
              
                <el-row class="rebate-tabel">
                  <table>
                    <tbody>
                      <tr>
                        <th>返利点数</th>
                        <th>拓展第 1 家</th>
                        <th>拓展第 2 家</th>
                        <th>拓展第 3 家及以上</th>
                      </tr>
                      <tr>
                        <td>所属单店</td>
                        <td>
                            <el-form-item label-width="0"
                            prop="zpTimeLimit.zpSingleExtendsOne"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]" >
                                <el-input type="zpTimeLimit.zpSingleExtendsOne" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.zpTimeLimit.zpSingleExtendsOne"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label-width="0"
                            prop="zpTimeLimit.zpSingleExtendsTwo"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]" >
                                <el-input type="zpTimeLimit.zpSingleExtendsTwo"   placeholder="请输入折扣率" class="pencent-num" v-model.number="form.zpTimeLimit.zpSingleExtendsTwo"></el-input >
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label-width="0"
                            prop="zpTimeLimit.zpSingleExtendsThree"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]" >
                                <el-input type="zpTimeLimit.zpSingleExtendsThree"   placeholder="请输入折扣率" class="pencent-num" v-model.number="form.zpTimeLimit.zpSingleExtendsThree"></el-input >
                            </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td>所属区域代理</td>
                        <td>
                            <el-form-item label-width="0"
                             prop="zpTimeLimit.zpAreaExtendsOne"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]" >
                                <el-input type="zpTimeLimit.zpAreaExtendsOne"  placeholder="请输入折扣率" class="pencent-num" v-model.number="form.zpTimeLimit.zpAreaExtendsOne"></el-input >
                            </el-form-item >
                        </td>
                        <td>
                            <el-form-item label-width="0"
                            prop="zpTimeLimit.zpAreaExtendsTwo"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                                <el-input type="zpTimeLimit.zpAreaExtendsTwo"   placeholder="请输入折扣率" class="pencent-num" v-model.number="form.zpTimeLimit.zpAreaExtendsTwo"></el-input >
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label-width="0"
                             prop="zpTimeLimit.zpAreaExtendsThree"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                                <el-input type="zpTimeLimit.zpAreaExtendsThree"   placeholder="请输入折扣率" class="pencent-num" v-model.number="form.zpTimeLimit.zpAreaExtendsThree"></el-input >
                            </el-form-item >
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                </el-row>
                <el-row class="oter-time-wrap">
                    <el-col :span="8">
                        <el-form-item label=" 2）正式签约起"
                        prop="zpTimeLimit.zpdateAfter"
                          :rules="[
                             { required: true, message: '时间不能为空'},
                            { type: 'number', message: '时间必须为数字值'},
                            { pattern: /^[1-9]\d*$/, message: '必须为正整数' }
                            ]">
                            <el-input type="zpTimeLimit.zpdateAfter" placeholder="请输入正整数" class="sig-time2"  v-model.number="form.zpTimeLimit.zpdateAfter"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数："
                        prop="zpSingleRebate1"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                            <el-input type="zpSingleRebate1" placeholder="请输入折扣率"  class="pencent-num" v-model.number="form.zpSingleRebate1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数："
                        prop="zpAreaRebate1"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                            <el-input type="zpAreaRebate1" placeholder="请输入折扣率"  class="pencent-num" v-model.number="form.zpAreaRebate1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
              <el-row class="dl-rebate-title">
                <h2>代理商拓展返利设置</h2>
              </el-row>
              <el-row class="text-wrap">
                  <p>
                      <span>进货款定义：</span>
                      <span>首批进货款</span>
                  </p>
              </el-row>
              <el-row class="text-wrap">
                    <el-col :span="12" class="fl-left">
                        <el-form-item label="时间周期：">
                                <el-radio v-model="form.dlTimeChose"  label="CONTRACT_TERM">合同期</el-radio>
                                <el-radio v-model="form.dlTimeChose" label="TIME_RANGE">时间范围</el-radio>
                        </el-form-item>
                    </el-col>
              </el-row>
              <div  v-if="form.dlTimeChose=='CONTRACT_TERM'">
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属单店返利点数："
                           prop="dlSingleRebate"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                              <el-input type="dlSingleRebate" placeholder="请输入折扣率"  class="pencent-num" v-model.number="form.dlSingleRebate"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属区域代理返利点数："
                          prop="dlAreaRebate"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                              <el-input type="dlAreaRebate" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlAreaRebate"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              
              <div  v-if="form.dlTimeChose=='TIME_RANGE'">
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label=" 1）正式签约起"
                           prop="dlTimeLimit.dldateBefore"
                          :rules="[
                            { required: true, message: '时间不能为空'},
                            { type: 'number', message: '时间必须为数字值'},
                            { pattern: /^[1-9]\d*$/, message: '必须为正整数' }
                            ]">
                              <el-input type="dlTimeLimit.dldateBefore" placeholder="请输入正整数"  class="sig-time1" v-model.number="form.dlTimeLimit.dldateBefore"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                
                  <el-row class="rebate-tabel">
                    <table>
                      <tbody>
                        <tr>
                          <th>返利点数</th>
                          <th>拓展第 1 家</th>
                          <th>拓展第 2 家</th>
                          <th>拓展第 3 家及以上</th>
                        </tr>
                        <tr>
                          <td>所属单店</td>
                          <td>
                              <el-form-item label-width="0"
                              prop="dlTimeLimit.dlSingleExtendsOne"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                                  <el-input type="dlTimeLimit.dlSingleExtendsOne" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlTimeLimit.dlSingleExtendsOne"></el-input>
                                </el-form-item>
                            </td>
                          <td>
                              <el-form-item label-width="0"
                              prop="dlTimeLimit.dlSingleExtendsTwo"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]"> 
                                  <el-input type="dlTimeLimit.dlSingleExtendsTwo" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlTimeLimit.dlSingleExtendsTwo"></el-input>
                                </el-form-item>
                            </td>
                          <td>
                              <el-form-item label-width="0"
                              prop="dlTimeLimit.dlSingleExtendsThree"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]"> 
                                  <el-input type="dlTimeLimit.dlSingleExtendsThree" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlTimeLimit.dlSingleExtendsThree"></el-input >
                                </el-form-item >
                            </td>
                        </tr>
                        <tr>
                          <td>所属区域代理</td>
                          <td>
                              <el-form-item label-width="0"
                              prop="dlTimeLimit.dlAreaExtendsOne"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                                   <el-input type="dlTimeLimit.dlAreaExtendsOne" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlTimeLimit.dlAreaExtendsOne"></el-input >
                                </el-form-item>
                            </td>
                          <td>
                              <el-form-item label-width="0"
                              prop="dlTimeLimit.dlAreaExtendsTwo"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]"> 
                                  <el-input type="dlTimeLimit.dlAreaExtendsTwo" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlTimeLimit.dlAreaExtendsTwo"></el-input >
                                </el-form-item>
                            </td>
                          <td>
                              <el-form-item label-width="0"
                              prop="dlTimeLimit.dlAreaExtendsThree"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]"> 
                                  <el-input type="dlTimeLimit.dlAreaExtendsThree" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlTimeLimit.dlAreaExtendsThree"></el-input >
                                </el-form-item>
                            </td>
                        </tr>
                        
                      </tbody>
                    </table>
                  </el-row>
                  <el-row class="oter-time-wrap">
                      <el-col :span="8">
                          <el-form-item label=" 2）正式签约起" 
                           prop="dlTimeLimit.dldateAfter"
                          :rules="[
                            { required: true, message: '时间不能为空'},
                            { type: 'number', message: '时间必须为数字值'},
                            { pattern: /^[1-9]\d*$/, message: '必须为正整数' }
                            ]">
                              <el-input type="dlTimeLimit.dldateAfter" placeholder="请输入正整数" class="sig-time2" v-model.number="form.dlTimeLimit.dldateAfter"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属单店返利点数："
                          prop="dlSingleRebate1"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                              <el-input type="dlSingleRebate1" placeholder="请输入折扣率"  class="pencent-num" v-model.number="form.dlSingleRebate1"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属区域代理返利点数：" 
                          prop="dlAreaRebate1"
                          :rules="[
                            { required: true, message: '返利点数不能为空'},
                            { type: 'number', message: '返利点数必须为数字值'},
                            { pattern: /^([0-9]\d?(\.\d{1,2})?|100)$/, message: '不允许输入小于0或者小数位多余2' }
                            ]">
                              <el-input type="dlAreaRebate1" placeholder="请输入折扣率" class="pencent-num" v-model.number="form.dlAreaRebate1" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              <el-row style="margin-top:20px;">
                  <el-button @click="resetForm('form')">取消</el-button>
                  <el-button type="primary" @click="submitForm('form')">保存</el-button>
              </el-row>
          </el-form>
      </div>

      <!-- 详情列表 -->
      <div class="rebate"  v-if="ifEdit">
          <el-row class="content_title">
              <h2>Zuipin拓展返利设置</h2>
              <!-- <div class="content_closeBtn" @click="goBack">X</div> -->
          </el-row>
          <el-row class="text-wrap">
              <p>
                  <span>进货款定义：</span>
                  <span>首批进货款</span>
              </p>
          </el-row>
          

          <el-form ref="form1"  label-width="200px">
            <el-row  class="text-wrap">
              <el-col  class="fl-left">
                  <el-form-item label="时间周期：" >
                          <el-radio  v-model="form.zpTimeChose"  label="CONTRACT_TERM" disabled>合同期</el-radio>
                          <el-radio v-model="form.zpTimeChose" label="TIME_RANGE" disabled>时间范围</el-radio>
                  </el-form-item>
              </el-col>
          </el-row>
            <div v-if="form.zpTimeChose=='CONTRACT_TERM'">
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数：">
                            <el-input placeholder="请输入折扣率"  v-model="form.zpSingleRebate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数：">
                            <el-input placeholder="请输入折扣率" v-model="form.zpAreaRebate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <div  v-if="form.zpTimeChose=='TIME_RANGE'">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label=" 1）正式签约起">
                            <el-input placeholder="请输入正整数"  class="sig-time1" v-model="form.zpTimeLimit.zpdateBefore" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
              
                <el-row class="rebate-tabel">
                  <table>
                    <tbody>
                      <tr>
                        <th>返利点数</th>
                        <th>拓展第 1 家</th>
                        <th>拓展第 2 家</th>
                        <th>拓展第 3 家及以上</th>
                      </tr>
                      <tr>
                          <td>所属单店</td>
                          <td>{{form.zpTimeLimit.zpSingleExtendsOne | number}}</td>
                          <td>{{form.zpTimeLimit.zpSingleExtendsTwo | number}}</td>
                          <td>{{form.zpTimeLimit.zpSingleExtendsThree | number}}</td>
                      </tr>
                      <tr>
                          <td>所属区域代理</td>
                          <td>{{form.zpTimeLimit.zpAreaExtendsOne | number}}</td>
                          <td>{{form.zpTimeLimit.zpAreaExtendsTwo | number}}</td>
                          <td>{{form.zpTimeLimit.zpAreaExtendsThree | number}}</td>
                      </tr>
                      <!-- <tr>
                        <td>所属单店</td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpSingleExtendsOne"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpSingleExtendsTwo"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpSingleExtendsThree"></el-input></td>
                      </tr>
                      <tr>
                        <td>所属区域代理</td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpAreaExtendsOne"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpAreaExtendsTwo"></el-input></td>
                        <td><el-input placeholder="请输入折扣率" class="pencent-num" v-model="form.zpTimeLimit.zpAreaExtendsThree"></el-input></td>
                      </tr> -->
                      
                    </tbody>
                  </table>
                </el-row>
                <el-row class="oter-time-wrap">
                    <el-col :span="8">
                        <el-form-item label=" 2）正式签约起">
                            <el-input placeholder="请输入正整数" class="sig-time2"  v-model="form.zpTimeLimit.zpdateAfter" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属单店返利点数：">
                            <el-input placeholder="请输入折扣率"   v-model="form.zpSingleRebate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="fl-wrap">
                    <el-col :span="9">
                        <el-form-item label="所属区域代理返利点数：">
                            <el-input placeholder="请输入折扣率"   v-model="form.zpAreaRebate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
              <el-row class="dl-rebate-title">
                <h2>代理商拓展返利设置</h2>
              </el-row>
              <el-row class="text-wrap">
                  <p>
                      <span>进货款定义：</span>
                      <span>首批进货款</span>
                  </p>
              </el-row>
              <el-row class="text-wrap">
                    <el-col :span="12" class="fl-left">
                        <el-form-item label="时间周期：">
                                <el-radio v-model="form.dlTimeChose"  label="CONTRACT_TERM" disabled>合同期</el-radio>
                                <el-radio v-model="form.dlTimeChose" label="TIME_RANGE" disabled>时间范围</el-radio>
                        </el-form-item>
                    </el-col>
              </el-row>
              <div  v-if="form.dlTimeChose=='CONTRACT_TERM'">
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属单店返利点数：">
                              <el-input placeholder="请输入折扣率" v-model="form.dlSingleRebate" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属区域代理返利点数：">
                              <el-input placeholder="请输入折扣率" v-model="form.dlAreaRebate" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              
              <div  v-if="form.dlTimeChose=='TIME_RANGE'">
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label=" 1）正式签约起">
                              <el-input placeholder="请输入正整数"  class="sig-time1" v-model="form.dlTimeLimit.dldateBefore" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                
                  <el-row class="rebate-tabel">
                    <table>
                      <tbody>
                        <tr>
                          <th>返利点数</th>
                          <th>拓展第 1 家</th>
                          <th>拓展第 2 家</th>
                          <th>拓展第 3 家及以上</th>
                        </tr>
                        <tr>
                          <td>所属单店</td>
                          <td>{{form.dlTimeLimit.dlSingleExtendsOne | number}}</td>
                          <td>{{form.dlTimeLimit.dlSingleExtendsTwo | number}}</td>
                          <td>{{form.dlTimeLimit.dlSingleExtendsThree | number}}</td>
                      </tr>
                      <tr>
                          <td>所属区域代理</td>
                          <td>{{form.dlTimeLimit.dlAreaExtendsOne | number}}</td>
                          <td>{{form.dlTimeLimit.dlAreaExtendsTwo | number}}</td>
                          <td>{{form.dlTimeLimit.dlAreaExtendsThree | number}}</td>
                      </tr>
                        <!-- <tr>
                          <td>所属单店</td>
                          <td><el-input placeholder="请输入折扣率" v-model="form.dlTimeLimit.dlSingleExtendsOne"></el-input></td>
                          <td><el-input placeholder="请输入折扣率"  v-model="form.dlTimeLimit.dlSingleExtendsTwo"></el-input></td>
                          <td><el-input placeholder="请输入折扣率"  v-model="form.dlTimeLimit.dlSingleExtendsThree"></el-input></td>
                        </tr>
                        <tr>
                          <td>所属区域代理</td>
                          <td><el-input placeholder="请输入折扣率" v-model="form.dlTimeLimit.dlAreaExtendsOne"></el-input></td>
                          <td><el-input placeholder="请输入折扣率"  v-model="form.dlTimeLimit.dlAreaExtendsTwo"></el-input></td>
                          <td><el-input placeholder="请输入折扣率"  v-model="form.dlTimeLimit.dlAreaExtendsThree"></el-input></td>
                        </tr> -->
                        
                      </tbody>
                    </table>
                  </el-row>
                  <el-row class="oter-time-wrap">
                      <el-col :span="8">
                          <el-form-item label=" 2）正式签约起">
                              <el-input placeholder="请输入正整数" class="sig-time2" v-model="form.dlTimeLimit.dldateAfter" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属单店返利点数：">
                              <el-input placeholder="请输入折扣率"   v-model="form.dlSingleRebate" disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row class="fl-wrap">
                      <el-col :span="9">
                          <el-form-item label="所属区域代理返利点数：">
                              <el-input placeholder="请输入折扣率"  v-model="form.dlAreaRebate"  disabled></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              <!-- <el-row style="margin-top:20px;">
                  <el-button @click="goBack">取消</el-button>
                  <el-button type="primary" @click="save">保存</el-button>
              </el-row> -->
          </el-form>
      </div>
</div>
    
</template>
<script type="text/javascript" src="../router.js"></script>
<script>
// import quillEditor from "../components/editor.vue";
let qs = require("qs");
export default {
  data() {
    
    return {
        ifEdit:false,
      form:{
        dlTimeChose:"CONTRACT_TERM",
        zpTimeChose:"CONTRACT_TERM",
        zpSingleRebate:"",
        zpAreaRebate:"",
        zpSingleRebate1:"",
        zpAreaRebate1:"",
        zpTimeLimit:{
          zpdateBefore:"",
          zpSingleExtendsOne:"",
          zpSingleExtendsTwo:"",
          zpSingleExtendsThree:"",
          zpAreaExtendsOne:"",
          zpAreaExtendsTwo:"",
          zpAreaExtendsThree:"",
          zpdateAfter:"",
        },
        dlSingleRebate:"",
        dlAreaRebate:"",
        dlSingleRebate1:"",
        dlAreaRebate1:"",
        dlTimeLimit:{
          dldateBefore:"",
          dlSingleExtendsOne:"",
          dlSingleExtendsTwo:"",
          dlSingleExtendsThree:"",
          dlAreaExtendsOne:"",
          dlAreaExtendsTwo:"",
          dlAreaExtendsThree:"",
          dldateAfter:"",
        },
      },
    };
  },
  // components: {
  //   quillEditor
  // },

  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal+"%";
    }
  },
  methods: {
    //   重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    goBack() {
      this.$confirm(`你确定要放弃编辑吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/message");
        this.$message("取消成功");
      });
    },
    //判断是否超时
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
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.save()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        save() {
      if(this.form.zpTimeChose == 'TIME_RANGE'){
            

            if(
                !this.form.zpTimeLimit.zpdateBefore||
                !this.form.zpTimeLimit.zpSingleExtendsOne ||
                !this.form.zpTimeLimit.zpSingleExtendsTwo||
                !this.form.zpTimeLimit.zpSingleExtendsThree||
                !this.form.zpTimeLimit.zpAreaExtendsOne||
                !this.form.zpTimeLimit.zpAreaExtendsTwo||
                !this.form.zpTimeLimit.zpAreaExtendsThree||
                !this.form.zpTimeLimit.zpdateAfter||
                !this.form.zpSingleRebate1||
                !this.form.zpAreaRebate1
                ){
                    this.$message({
                message: "保存失败！必填项未填写",
                type: "warning"
                });
                return;
                }else{

                                // 小数点后最多2位
                    var reg= /^(-?\d+)(\.\d{1,2})?$/
                if(
                    !reg.test(this.form.zpTimeLimit.zpSingleExtendsOne)||
                    !reg.test(this.form.zpTimeLimit.zpSingleExtendsTwo)||
                    !reg.test(this.form.zpTimeLimit.zpSingleExtendsThree)||
                    !reg.test(this.form.zpTimeLimit.zpAreaExtendsOne)||
                    !reg.test(this.form.zpTimeLimit.zpAreaExtendsTwo)||
                    !reg.test(this.form.zpTimeLimit.zpAreaExtendsThree)||
                    !reg.test(this.form.zpSingleRebate1)||
                    !reg.test(this.form.zpAreaRebate1)   
                    ){
                        this.$message({
                        message: "保存失败！填写正确格式",
                        type: "warning"
                        });
                        return;
                    }
                }
      }else{
        // 小数点后最多2位
        var reg= /^([0-9]\d?(\.\d{1,2})?|100)$/
        if(
            !reg.test(this.form.zpSingleRebate)||
            !reg.test(this.form.zpAreaRebate)
            ){
                this.$message({
                message: "保存失败！填写正确格式",
                type: "warning"
                });
                return;
            }

      }
      if(this.form.dlTimeChose == 'TIME_RANGE'){
        
            if(
                 !this.form.dlTimeLimit.dlSingleExtendsOne||
                !this.form.dlTimeLimit.dlSingleExtendsTwo||
                !this.form.dlTimeLimit.dlSingleExtendsThree||
                !this.form.dlTimeLimit.dlAreaExtendsOne||
                !this.form.dlTimeLimit.dlAreaExtendsTwo||
                !this.form.dlTimeLimit.dlAreaExtendsThree||
                !this.form.dlTimeLimit.dldateAfter||
                !this.form.dlSingleRebate1 ||
                !this.form.dlAreaRebate1
                ){
                    this.$message({
                message: "保存失败！必填项未填写",
                type: "warning"
                });
                return;
                }else{
                    //         // 小数点后最多2位
                    var reg= /^(-?\d+)(\.\d{1,2})?$/
                if(
                    !reg.test(this.form.dlTimeLimit.dlSingleExtendsOne)||
                    !reg.test(this.form.dlTimeLimit.dlSingleExtendsTwo)||
                    !reg.test(this.form.dlTimeLimit.dlSingleExtendsThree)||
                    !reg.test(this.form.dlTimeLimit.dlAreaExtendsOne)||
                    !reg.test(this.form.dlTimeLimit.dlAreaExtendsTwo)||
                    !reg.test(this.form.dlTimeLimit.dlAreaExtendsThree)||
                    !reg.test(this.form.dlAreaRebate1)||
                    !reg.test(this.form.dlSingleRebate1)
                    ){
                        this.$message({
                        message: "保存失败！填写正确格式",
                        type: "warning"
                        });
                        return;
                    }
                }
      }else{

              // 小数点后最多2位
            var reg= /^([0-9]\d?(\.\d{1,2})?|100)$/
            if(
                !reg.test(this.form.dlAreaRebate)||
                !reg.test(this.form.dlSingleRebate)
                ){
                    this.$message({
                    message: "保存失败！填写正确格式",
                    type: "warning"
                    });
                    return;
                }
      }
      
      this.$confirm(
        `规则保存后立即生效，你确定要保存该规则吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$ajax
          .post(
            "/api/http/businessExtendsRule/saveOrUpdateBusinessExtendsRule.jhtml",
            qs.stringify({
              "businessExtendsRule.zuipinCycleTime":this.form.zpTimeChose,
              "businessExtendsRule.zuipinContractDaysInner":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpdateBefore:"",
              "businessExtendsRule.zuipinSingleExtendsOne":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpSingleExtendsOne/100:"",
              "businessExtendsRule.zuipinSingleExtendsTwo":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpSingleExtendsTwo/100:"",
              "businessExtendsRule.zuipinSingleExtendsThree":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpSingleExtendsThree/100:"",
              "businessExtendsRule.zuipinAreaExtendsOne":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpAreaExtendsOne/100:"",
              "businessExtendsRule.zuipinAreaExtendsTwo":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpAreaExtendsTwo/100:"",
              "businessExtendsRule.zuipinAreaExtendsThree":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpAreaExtendsThree/100:"",
              "businessExtendsRule.zuipinContractDaysAfter":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpTimeLimit.zpdateAfter:"",
              "businessExtendsRule.zuipinSingleRebate":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpSingleRebate1/100:this.form.zpSingleRebate/100,
              "businessExtendsRule.zuipinAreaRebate":this.form.zpTimeChose == 'TIME_RANGE'?this.form.zpAreaRebate1/100 : this.form.zpAreaRebate/100,
              "businessExtendsRule.agentCycleTime":this.form.dlTimeChose,
              "businessExtendsRule.agentContractDaysInner":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dldateBefore : "",
              "businessExtendsRule.agentSingleExtendsOne":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dlSingleExtendsOne/100 : "",
              "businessExtendsRule.agentSingleExtendsTwo":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dlSingleExtendsTwo/100 : "",
              "businessExtendsRule.agentSingleExtendsThree":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dlSingleExtendsThree/100 : "",
              "businessExtendsRule.agentAreaExtendsOne":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dlAreaExtendsOne/100 : "",
              "businessExtendsRule.agentAreaExtendsTwo":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dlAreaExtendsTwo/100 : "",
              "businessExtendsRule.agentAreaExtendsThree":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dlAreaExtendsThree/100 : "",
              "businessExtendsRule.agentContractDaysAfter":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlTimeLimit.dldateAfter : "",
              "businessExtendsRule.agentSingleRebate":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlSingleRebate1/100:this.form.dlSingleRebate/100,
              "businessExtendsRule.agentAreaRebate":this.form.dlTimeChose == 'TIME_RANGE' ? this.form.dlAreaRebate1/100:this.form.dlAreaRebate/100,
              "businessExtendsRule.agentPaymentDifinition":this.form.agentPaymentDifinition,
              // "noticeInfo.noticeTitle": this.contentData.title,
              
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            if (res.data.success === 1) {
              this.$message({
                message: `保存业务拓展返利规则成功~`,
                type: "success"
              });
              location.reload();//强刷
              
              // this.$router.push("/rebate");
              // this.refreshPage();
              
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
      });
    },
  },
  created() {
    if (!this.checkSession()) return;
    
        this.$getData({
            url: 'http/businessExtendsRule/getBusinessExtendsRuleDetail.jhtml',
            success(response) {
                console.log(response.data);
                this.form.zpTimeChose = response.data.result.zuipinCycleTime;
                this.form.dlTimeChose = response.data.result.agentCycleTime;
                this.form.zpTimeLimit.zpdateBefore = response.data.result.zuipinContractDaysInner;
                this.form.zpTimeLimit.zpSingleExtendsOne = response.data.result.zuipinSingleExtendsOne*100;
                this.form.zpTimeLimit.zpSingleExtendsTwo = response.data.result.zuipinSingleExtendsTwo*100;
                this.form.zpTimeLimit.zpSingleExtendsThree = response.data.result.zuipinSingleExtendsThree*100;
                this.form.zpTimeLimit.zpAreaExtendsOne = response.data.result.zuipinAreaExtendsOne*100;
                this.form.zpTimeLimit.zpAreaExtendsTwo = response.data.result.zuipinAreaExtendsTwo*100;
                this.form.zpTimeLimit.zpAreaExtendsThree = response.data.result.zuipinAreaExtendsThree*100;
                this.form.zpTimeLimit.zpdateAfter = response.data.result.zuipinContractDaysAfter;
                this.form.zpSingleRebate = (response.data.result.zuipinSingleRebate*100).toFixed(2)+"%";
                this.form.zpAreaRebate = (response.data.result.zuipinAreaRebate*100).toFixed(2)+"%";

                this.form.dlTimeLimit.dldateBefore = response.data.result.agentContractDaysInner;
                this.form.dlTimeLimit.dlSingleExtendsOne = response.data.result.agentSingleExtendsOne*100;
                this.form.dlTimeLimit.dlSingleExtendsTwo = response.data.result.agentSingleExtendsTwo*100;
                this.form.dlTimeLimit.dlSingleExtendsThree = response.data.result.agentSingleExtendsThree*100;
                this.form.dlTimeLimit.dlAreaExtendsOne = response.data.result.agentAreaExtendsOne*100;
                this.form.dlTimeLimit.dlAreaExtendsTwo = response.data.result.agentAreaExtendsTwo*100;
                this.form.dlTimeLimit.dlAreaExtendsThree = response.data.result.agentAreaExtendsThree*100;
                this.form.dlTimeLimit.dldateAfter = response.data.result.agentContractDaysAfter;
                this.form.dlSingleRebate = (response.data.result.agentSingleRebate*100).toFixed(2)+"%";
                this.form.dlAreaRebate = (response.data.result.agentAreaRebate*100).toFixed(2)+"%";
                 if(response.data.result.agentSingleRebate){
                        this.ifEdit=true;
                    }else{
                        this.ifEdit=false;
                    }
            },
            fail(response) {
                this.$message({
                    message: response.data.msg,
                    type: 'error'
                })
            },
           
        });
  }
};
</script>

<style lang="less" scoped>
.rebate {
  width: 98%;
  margin: 1%;
  padding: 20px;
  background-color: #ffffff;
  .el-row {
    padding: 0 15px;
  }
  .content_title {
    margin: 0px 10px 10px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid;
    padding: 0 0 10px 0;
    h2 {
      display: inline;
      font-weight: 600;
      font-weight: normal;
    }
    .content_closeBtn {
      font-size: 19px;
      float: right;
      color: #0000ff9e;
      cursor: pointer;
    }
  }
  .dl-rebate-title {
    margin: 0px 10px 10px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid;
    padding: 0 0 10px 0;
    h2 {
      display: inline;
      font-weight: 600;
      font-weight: normal;
    }
  }
  #timeRang {
    margin-left: 20px;
  }

  .rebate-tabel {
    text-align: center;
    table {
      border-collapse: collapse;
    }

    table,
    th,
    td {
      border: 1px solid #999999;
    }
    tr {
      width: 800px;
      height: 40px;
      line-height: 40px;
    }
    td {
      padding: 10px 20px;
    }
  }
  .text-wrap {
    padding: 10px;
    
  }
  .oter-time-wrap {
    padding-top: 50px;
  }
  .fl-wrap {
    margin-left: 100px;
  }
  .sig-time1 {
    position: relative;
  }
  .sig-time1:after {
    content: "天内";
    width: 38px;
    height: 33px;
    display: block;
    position: absolute;
    top: 2px;
    right: -50px;
    color: #48576a;
  }
  .sig-time2 {
    position: relative;
  }
  .sig-time2:after {
    content: "天后";
    width: 38px;
    height: 33px;
    display: block;
    position: absolute;
    top: 2px;
    right: -50px;
    color: #48576a;
  }
  .fl-left{
    margin-left: -120px;
  }
  .el-input{
    position: relative;
  }
  .el-input.pencent-num:after{
    content: "%";
    width: 15px;
    height: 15px;
    display: block;
    position: absolute;
    top: 0;
    right: 10px;
  }
}
.rebate-tabel .el-form-item{
    margin-bottom: 0;
}
.rebate .rebate-tabel tr td{
    width: 200px;
}
.rebate .rebate-tabel tr td:first-child{
    width: 133px;
}
</style>

