export default function (obj) {
	const self = this;
	obj.method = obj.method || 'get';
	obj.url = obj.url || '';
	obj.data = obj.data  || {};
	obj.success = obj.success || function () {};
	obj.fail = obj.fail || function () {};
	obj.error = obj.error || function () {};
	if (obj.method === 'get') {
		var str = '?';
		for(var item in obj.data){
			if (obj.data[item] != '' && obj.data[item] != undefined) {
				str  += item + '=' + obj.data[item] + '&';
			}
		}
		str = str.substring(0,str.length-1);
		obj.url = obj.url+str;
		self.$ajax({
			method: 'get',
			url: `api/${obj.url}`
		}).then(function(response){
			if(response.data.success === 1){
				obj.success.call(self,response);
			}else{
				// console.log(response);
				obj.fail.call(self,response);
			}
		}).catch(function(error){
			obj.error.call(self,error);
		});
	}
}