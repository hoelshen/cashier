let Utils = {
        //格式化日期成字符串
        formatDate(date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let min = date.getMinutes();
            let second = date.getSeconds();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hours = hours < 10 ? '0' + hours : hours;
            min = min < 10 ? '0' + min : min;
            second = second < 10 ? '0' + second : second;
            return `${year}-${month}-${day} ${hours}:${min}:${second}`
        },
        //格式化日期成字符串(年月日)
        formatDayDate(date) {

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            return `${year}-${month}-${day}`
        },
        //格式化日期成字符串(年月日)
        formatDayDateStyleTwo(date) {

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            return `${year}/${month}/${day}`
        },
        //格式化日份(年月日)
        formatDayDate(data) {
            if (data) {
                let date = new Date(data)
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                return year + '-' + month + '-' +day
            } else {
                return ''
            }

        },
        //格式化月份(年月)
        formatMonthDate(data) {
            if (data) {
                let date = new Date(data)
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month = month < 10 ? '0' + month : month;
                return year + '-' + month
            } else {
                return ''
            }

        },
        //格式化年份(年)
        formatYearDate(data) {
            if (data) {
                let date = new Date(data)
                let year = date.getFullYear();
                return year
            } else {
                return ''
            }

        },
        // 保留小数
        toFiexd(num, n = 2) {
            let type = typeof num;
            num = String(num).trim();
            if (num === '') {
                return '0.00'
            }
            if (isNaN(num)) {
                return '0.00';
            } else {
                return String(Number(num).toFixed(n));
            }
        },
        // 取整
        toParseInt(num, type = 'floor') {
            let t = typeof num;
            num = String(num).trim();
            if (num === '') {
                return '0'
            }
            if (isNaN(num)) {
                return '0';
            }
            switch (type) {
                case 'floor':
                    return Math.floor(parseFloat(num));
                    break;
                case 'ceil':
                    return Math.ceil(parseFloat(num));
                    break;
                case 'round':
                    return Math.round(parseFloat(num));
                    break;
            }
        },
        // 数组分组
        arrGroup(data, l = 10) {
            if (!data instanceof Array) return [];
            if (data.length <= l) return [data];
            let result = [];
            for (let i = 0; i < data.length; i += l) {
                result.push(data.slice(i, i + l));
            }
            return result;
        },
        //数据千分位
       addCommas(val) { 
            //根据`.`作为分隔，将val值转换成一个数组 
            var aIntNum = val.toString().split('.'); 
            // 整数部分 
            var iIntPart = aIntNum[0]; 
            // 小数部分（传的值有小数情况之下） 
            var iFlootPart = aIntNum.length > 1 ? '.' + aIntNum[1] : ''; var rgx = /(\d+)(\d{3})/; 
            // 如果整数部分位数大于或等于5 
            if (iIntPart.length >= 4) { 
            // 根据正则要求，将整数部分用逗号每三位分隔 
                while (rgx.test(iIntPart)) { 
                    iIntPart = iIntPart.replace(rgx, '$1' + ',' + '$2'); 
                }
            }  
            // 如果小数部分位数大于或等于5 
            if (iFlootPart && iFlootPart.length >= 5) { 
                // 根据正则要求，将小数部分用每三位分隔按空格号分开 
                while (rgx.test(iFlootPart)) {
                        iFlootPart = iFlootPart.replace(/(\d{3})/g, '$1 ');
                } 
            } 
                // 将整数部分和小数组部分合并在一起，并返回 
                return iIntPart + iFlootPart; 
        },
        //手机号码转化
        iphoneSymbol(val){
            var oldVal = val;
            if(oldVal){
                var newVal =  oldVal.match(/(\d{3})(\d{4})(\d{4})/).slice(1).join('-');
                return newVal 
            }
        },
        //限制除数字的其他文字
        digitInput(val){
            var val2 = val.replace(/[^\d]/g, ''); 
            return val=val2            
        },
        //小数点后两位
        digitTwo(val){
            var reg = /^\d+\.?\d{0,2}$/.test(val)
            return reg
        },
        //没有小数
        digitZero(val){
            var reg = /^[0-9]*$/.test(val)
            return reg
        }  
    }

        export default Utils