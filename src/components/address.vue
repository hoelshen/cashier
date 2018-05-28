<!--
    省市组件

        props           类型          默认
        provinceCode    String        110000        省份编码
        cityCode        String        110100        城市编码
        areaCode        String        110101        区域编码
        detail          String                      详细地址
        detailWrap      Boolean       false         详细地址是否在独立一行中显示
        isDetail        Boolean       true          详细地址是否展示


        event           参数
        getAllData      object(地址详细对象)


        methods         返回值
        getAddress      中文地址拼接
        getDetail       地址信息对象



-->




<template>
    <div class="address-wrap">
        <div class="address-select">
            <span v-if="isShow" class="delete_addressComponent"  @click='closeAddressProvinceComponent' ></span> 
            <el-select v-model="select.provinceCode" placeholder="请选择省份" @change="getAllData" >
                <el-option v-for="item in provinceList" :key="item.code" :label="item.regionName" :value="item.code">              
                </el-option>
            </el-select>
        </div>
        <div class="address-select">
            <span v-if="isShow" class="delete_addressComponent"  @click='closeAddressCityComponent' ></span> 
            <el-select v-model="select.cityCode" placeholder="请选择城市" @change="getAllData" >
                <el-option v-for="item in cityList" :key="item.code" :label="item.regionName" :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="address-select">
            <span v-if="isShow" class="delete_addressComponent"  @click='closeAddressAreaComponent' ></span> 
            <el-select v-model="select.areaCode" placeholder="请选择区域" @change="getAllData" >
                <el-option v-for="item in areaList" :key="item.code" :label="item.regionName" :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="address-select" :class="{wrap:detailWrap}" v-if="isDetail">
            <el-input v-model.trim="select.detail" placeholder="请输入详细地址" :type="detailWrap ? 'textarea' : 'text' " :rows="detailWrap ? 2 : 1 " @blur="getAllData"></el-input>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        provinceCode: {
            type: String,
            default: ""
        },
        cityCode: {
            type: String,
            default: ""
        },
        areaCode: {
            type: String,
            default: ""
        },
        detail: {
            type: String,
            default: ""
        },
        detailWrap: {
            type: Boolean,
            default: false
        },
        isShow: {
            type: Boolean,
            default: false
        },
        isDetail: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            baseData: [],
            select: {
                provinceCode: this.provinceCode,
                cityCode: this.cityCode,
                areaCode: this.areaCode,
                detail: this.detail
            },
            CodeFlage:true,
            isTrue:true,
        };
    },
    watch: {
        provinceCode(val) {
            // console.log(val)
            this.select.provinceCode =  val;
        },
        cityCode(val) {
            // console.log(val)
            this.select.cityCode = val;
        },
        areaCode(val) {
            // console.log(val)
            this.select.areaCode = val;
        },
        detail(val) {
            // console.log(val)
            this.select.detail = val;
        }
    },
    computed: {
       
        provinceList() {
            return this.baseData;
        },
        cityList() {
            try { 
                
                let data = this.provinceList.filter(
                    val => val.code === this.select.provinceCode
                );                
    
                data = data[0].childs === null ? [] : data[0].childs;
                let isTrue = data.some(

                    val => 
                          function(val){
                              if(val.code === this.CodeFlage ){
                                    return this.select.cityCode  
                              }else{
                                 return  ''   
                              }
                          }  
                    
                );

                this.isTrue = isTrue && this.isTrue
                
                if (!this.isTrue) {
                    this.select.cityCode = data[0] ? data[0].code : "";
                }
                return data;
            } catch (error) {
                return [];
            }
        },
        areaList() {
            try {
                console.log(this.CodeFlage)
                let data = this.cityList.filter(
                    val => val.code === this.select.cityCode
                );
                
                data = data[0].childs === null ? [] : data[0].childs;
                let isTrue = data.some(
                    val => 
                     function(val){
                        if(val.code === this.CodeFlage){
                          return  this.select.areaCode
                        }else{
                          return  ''
                        }
                     }
                        
                );
                // console.log(this.isTrue)
                
                this.isTrue = isTrue && this.isTrue
                
                if (!this.isTrue) {
                    this.select.areaCode = data[0] ? data[0].code : "";
                }
                return data;
            } catch (error) {
                return [];
            }
        }
    },
    methods: {
        closeAddressProvinceComponent(){
            this.select.areaCode = '';
            this.select.cityCode = '';
            this.select.provinceCode = ''; 
        },
        closeAddressCityComponent(){
            this.select.areaCode = '';
            this.select.cityCode = '';
        },
        closeAddressAreaComponent(){
            this.select.areaCode = '';  
        },
        getData() {
            let obj = {};
            this.CodeFlage = true;
            this.isTrue = false;
            for (let attr in this.select) {
                obj[attr] = this.select[attr];
            }

            // console.log(obj.provinceCode)
            // console.log(obj.cityCode)
            // console.log(obj.areaCode)
            
            // (obj.provinceName = val.regionName) (obj.cityName = val.regionName) (obj.areaName = val.regionName)console.log(val.regionName)

            this.provinceList.forEach(
                val => obj.provinceCode === val.code ? (obj.provinceName = val.regionName) : void 0
            );
            this.cityList.forEach(
                val => obj.cityCode === val.code ? (obj.cityName = val.regionName) : void 0
            );
            this.areaList.forEach(
                val => obj.areaCode === val.code ? (obj.areaName = val.regionName) : void 0
            );
            obj.address = obj.provinceName + obj.cityName + obj.areaName + obj.detail;
            
            // console.log(obj)
            return obj;
        },
        getAllData() {
            this.$nextTick(() => {
                this.$emit("getAllData", this.getData());
                this.$emit("getAreaName");
                this.$emit('addAddressFlage');
            });
        },
        getAddress() {        
            return this.getData().address;
        },
        getDetail() {
            return this.getData();
        },
        // 重置
        reset(){
            this.select = {
                provinceCode: '',
                cityCode: '',
                areaCode: '',
                detail: this.detail
            }
        }
    },
    created() {
        this.$ajax.get('/api//http/area/getRegionTree.jhtml'
        ).then((res) => {
            this.baseData = res.data.result;
            this.isTrue = true
        }).catch(function (err) {
            this.loading = false;
        });
    }
};
</script>

<style lang="less" scoped>
.address-wrap {
    .address-select {
        display: inline-block;
    }
    .wrap {
        display: block;
    }
}
.delete_addressComponent {
        background: url("../assets/images/zph_close.png") no-repeat center;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 9px;
        right: 28px;
        z-index: 1000;
}
.address-select{
     position:relative
}
</style>
