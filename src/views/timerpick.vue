<template>
    <div>
        <el-form>
            <el-row>
                <el-col :span="4">
                    <el-form-item>
                        <el-date-picker width="200" v-model="timerValueStar" :picker-options="starPickerOptions" type="date" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                 <el-col :span="5">
                    <el-form-item label="至">
                        <el-date-picker  width="200" v-model="timerValueEnd" :picker-options="endpPickerOptions" type="date" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                
            </el-row>
            
            <el-row>
                <el-col :span="5">
                    <el-form-item>
                        <el-date-picker width="200" v-model="timerValue" :picker-options="pickerOptions" :unlink-panels="true" type="daterange" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                
                
            </el-row>
            
        </el-form>
       
    </div>
</template>
<script type="text/javascript" src="../router.js"></script>
<script>

export default {
    data(){
        return{
            timerValueStar:new Date(),
            timerValueEnd: new Date(),
            timerValue:[new Date(),new Date(2018,5,23)] ,
            thistime:new Date('2018-5-28'),
            //开始日期
            starPickerOptions: this.starTime(),
            //结束日期
            endpPickerOptions: this.endTime(),
            pickerOptions:this.timerange()
        };
       
    },
     methods:{
            starTime(){
                var self = this;
                 return  {
                    disabledDate(time){
                            return time.getTime() > self.thistime
                    }
                 }
            },
            endTime(){
                var self = this;
                 return  {
                    disabledDate(time){
                            return time.getTime() < self.thistime
                    }
                 }
            },
            timerange(){
                var self = this;
                 return  {
                    disabledDate(time){
                            return time.getTime()> self.thistime;
                    }
                    //  onPick({ maxDate, minDate }){
                    //      console.log(maxDate)
                    //  }
                 }
            }
        }
}
</script>

