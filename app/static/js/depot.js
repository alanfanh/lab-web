window.onload = function() {
	var assetnumber = document.getElementById('assetnumber');
	if (assetnumber) {
		assetnumber.onblur = function () {
			//检查资产编号
			checkAssetnum();	
		};
	};
	var product_name = document.getElementById('product_name');
	if (product_name) {
		product_name.onblur = function() {
			//检查品牌名称
			checkProductname();
			
		};
	};
	var model_name = document.getElementById('model_name');
	if (model_name) {
		model_name.onblur = function() {
			//检查规格型号
			checkModelname();
			
		};
	};
	var numbers = document.getElementById('numbers');
	if (numbers) {
		numbers.onblur =  function() {
			//检查现存数量
			checkNumber();
			
		};
	};
	var owner = document.getElementById('owner');
	if (owner) {
		owner.onblur = function() {
			//检查责任人/组
			checkOwner();
		}
	};
	var department = document.getElementById('department');
	if (department) {
		department.onblur = function() {
			//检查部门
			checkDepartment();
		}
	};
	var position = document.getElementById('position');
	if (position) {
		position.onblur = function() {
			//检查存储位置
			checkPosition();
			
		};
	};
	var entertime = document.getElementById('entertime');
	if (entertime) {
		entertime.onblur = function() {
			//检查入库时间
			checkEntertime();
			
		};
	};
	var calibratetime = document.getElementById('calibratetime');
	if (calibratetime) {
		//检查上次校验时间
		calibratetime.onblur = function() {
			checkCalibratetime();
		};
	};
	var resumptiontime = document.getElementById('resumptiontime');
	if (resumptiontime) {
		//检查复校时间
		resumptiontime.onblur = function() {
			checkResumptiontime();
		};
	};
	var username = document.getElementById('username');
	if (username) {
		username.onblur = function() {
			//检查借机人名称
			checkUsername();
			
		};
	};
	
	var usermail = document.getElementById('usermail');
	if (usermail) {
		usermail.onblur = function() {
			//检查借机人邮箱
			checkUseremail();
		};
	};
	
	var lend_time = document.getElementById('lend_time');
	if (lend_time) {
		lend_time.onblur = function() {
			//检查借机时间
			checkLendtime();
		};
	};
	
	var back_time = document.getElementById('back_time');
	if (back_time) {
		back_time.onblur = function() {
			//检查借机归还时间
			checkBacktime();
			
		};
	};
	var lend_numbers = document.getElementById('lend_numbers');
	if (lend_numbers) {
		lend_numbers.onblur = function() {
			//检查借机归还时间
			checkLendNumber();
			
		};
	};
	
	var remark = document.getElementById('remark');
	if (remark) {
		remark.onblur = function() {
			//检查备注信息
			checkRemark();
			
		};
	};
	
	var profit_loss = document.getElementById('profit_loss');
	if (profit_loss) {
		profit_loss.onblur = function() {
			//检查盘盈/盘亏
			checkProfitloss();
		};
	};
	
	//判断状态控件是否存在,若存在,根据状态值判断显示或隐藏借机信息
	var status = document.getElementById('status');
	if (status) {
		switchCon(document.getElementById('status').value);
	}
}

function testselect(e){
	switchCon(e.value);
}

function popTip(mess, type){
	// type: warning, error, success
	type = type || 'error';
	spop({
		template: mess,	
		position  : 'top-center',
		autoclose: 3000
	});
}


function switchCon(value){
	var $switchCon = document.getElementById('switchCon');
	if(value == '1'){
		//alert("hidden");
		$switchCon.style.display = 'none';
	}else{
		//alert("show");
		$switchCon.style.display = 'block';
	}
}

//检查资产编号
function checkAssetnum() {
	var obj = document.getElementById('assetnumber').value;
	var error = document.getElementById('sassetnumber');
	//var classVal = document.getElementById('username').getAttribute("class");
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		//classVal = classVal.concat(" is-invalid");
		//document.getElementById('username').setAttribute('class',classVal);
		return false;
	} else if (/^[^a-zA-Z0-9_]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>255) {
		error.innerHTML = "<font color='red'>范围：1-255位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查品牌名称
function checkProductname() {
	var obj = document.getElementById('product_name').value;
	var error = document.getElementById('sproduct_name');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		//classVal = classVal.concat(" is-invalid");
		//document.getElementById('username').setAttribute('class',classVal);
		return false;
	} else if (/^[^0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入中文、数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>255) {
		error.innerHTML = "<font color='red'>范围：1-255位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查规格型号
function checkModelname() {
	var obj = document.getElementById('model_name').value;
	var error = document.getElementById('smodel_name');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		//classVal = classVal.concat(" is-invalid");
		//document.getElementById('username').setAttribute('class',classVal);
		return false;
	} else if (/^[^a-zA-Z0-9_]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>255) {
		error.innerHTML = "<font color='red'>范围：1-255位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查现存数量
function checkNumber() {
	var obj = document.getElementById('numbers').value;
	var error = document.getElementById('snumbers');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (Number(obj) <= 0 || Number(obj) > 65535) {
		error.innerHTML = "<font color='red'>范围：1-65535</font>";
		return false;
	} else if (/^\D+$/.test(Number(obj))) {
		error.innerHTML = "<font color='red'>只能输入数字</font>";
		return false;
	} else if (/^\d+[\.]\d+$/.test(Number(obj))) {
		error.innerHTML = "<font color='red'>只能输入整数</font>";
		return false;	
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查存储位置
function checkPosition() {
	var obj = document.getElementById('position').value;
	var error = document.getElementById('sposition');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		//classVal = classVal.concat(" is-invalid");
		//document.getElementById('username').setAttribute('class',classVal);
		return false;
	} else if (/^[^0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入中文、数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>255) {
		error.innerHTML = "<font color='red'>范围：1-255位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查入库时间
function checkEntertime() {
	var date = document.getElementById("entertime").value;
	var error = document.getElementById("sentertime");
	var result = date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)
	if (date == "") {
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (!(/^(.+)(-|\/)(.+)\2(.+)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期格式年/月/日或年-月-日</font>";
		return false;
	} else if (date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)) {
		var d = new Date(result[1], result[3] - 1, result[4]);
		if (!(d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4])) {
			error.innerHTML = "<font color='red'>请输入正确的日期</font>";
			return false;
		} else {
			error.innerHTML = "";
			return true;
		}
	} else if (!(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else if (!(/^(\D*)(-|\/)(\D*)\2(\D*)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else {
		error.innerHTML = "";
		return true;	
	}
}

//检查部门
function checkDepartment() {
	var obj = document.getElementById('department').value;
	var error = document.getElementById('sdepartment');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (/^[^0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入中文、数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>255) {
		error.innerHTML = "<font color='red'>范围：1-255位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查责任人/组
function checkOwner() {
	var obj = document.getElementById('owner').value;
	var error = document.getElementById('sowner');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (/^[^0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入中文、数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>255) {
		error.innerHTML = "<font color='red'>范围：1-255位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}


//检查借机人名称
function checkUsername() {
	var obj = document.getElementById('username').value;
	var error = document.getElementById('susername');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		//classVal = classVal.concat(" is-invalid");
		//document.getElementById('username').setAttribute('class',classVal);
		return false;
	} else if (/^[^0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入中文、数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>64) {
		error.innerHTML = "<font color='red'>范围：1-64位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}


//检查借机人邮箱
function checkUseremail() {
	var email = document.getElementById("usermail").value;
	var error = document.getElementById("susermail");
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
	if (email == "") {
		error.innerHTML = "<font color='red'>邮箱不能为空</font>";
		return false;
	} else if (! reg.test(email)) {
		error.innerHTML = "<font color='red'>邮箱格式错误</font>";
		return false;
	} else if (getLength(email)>64) {
		error.innerHTML = "<font color='red'>范围：1-64位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;	
	}
}


//检查借机时间
function checkLendtime(){
	var date = document.getElementById("lend_time").value;
	var error = document.getElementById("slend_time");
	//var result = date.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
	var result = date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)
	if (date == "") {
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (!(/^(.+)(-|\/)(.+)\2(.+)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期格式年/月/日或年-月-日</font>";
		return false;
	} else if (date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)) {
		var d = new Date(result[1], result[3] - 1, result[4]);
		if (!(d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4])) {
			error.innerHTML = "<font color='red'>请输入正确的日期</font>";
			return false;
		} else {
			error.innerHTML = "";
			return true;
		}
	} else if (!(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else if (!(/^(\D*)(-|\/)(\D*)\2(\D*)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else {
		error.innerHTML = "";
		return true;	
	}
}

//检查还机时间
function checkBacktime() {
	var date = document.getElementById("back_time").value;
	var error = document.getElementById("sback_time");
	var result = date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)
	if (date == "") {
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (!(/^(.+)(-|\/)(.+)\2(.+)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期格式年/月/日或年-月-日</font>";
		return false;
	} else if (date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)) {
		var d = new Date(result[1], result[3] - 1, result[4]);
		if (!(d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4])) {
			error.innerHTML = "<font color='red'>请输入正确的日期</font>";
			return false;
		} else {
			error.innerHTML = "";
			return true;
		}
	} else if (!(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else if (!(/^(\D*)(-|\/)(\D*)\2(\D*)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else {
		error.innerHTML = "";
		return true;	
	}
}

//检查还机是否大于借机时间
function checkLbTime() {
	var date1 = document.getElementById("lend_time").value;
	var date2 = document.getElementById("back_time").value;
	var dateDiff = new Date(date2).getTime() - new Date(date1).getTime();
	var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
	if (dayDiff < 0) {
		return false;
	};
	return true;
}


//检查借机数量
function checkLendNumber() {
	var obj = document.getElementById('lend_numbers').value;
	var error = document.getElementById('slend_numbers');
	if (obj == ""){
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (Number(obj) <= 0 || Number(obj) > 65535) {
		error.innerHTML = "<font color='red'>范围：1-65535</font>";
		return false;
	} else if (/^\D+$/.test(Number(obj))) {
		error.innerHTML = "<font color='red'>只能输入数字</font>";
		return false;
	} else if (/^\d+.\d+$/.test(Number(obj))) {
		error.innerHTML = "<font color='red'>只能输入整数</font>";
		return false;	
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查备注信息
function checkRemark() {
	var obj = document.getElementById('remark').value;
	var error = document.getElementById('sremark');
	if (/^[^0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入中文、数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>64) {
		error.innerHTML = "<font color='red'>范围：0-64位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}


//检查盘盈盘亏
function checkProfitloss() {
	var obj = document.getElementById('profit_loss').value;
	var error = document.getElementById('sprofit_loss');
	if (/^[^0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(obj)) {
		error.innerHTML = "<font color='red'>只能输入中文、数字、字母和下划线</font>";
		return false;
	} else if (getLength(obj)>64) {
		error.innerHTML = "<font color='red'>范围：0-64位</font>";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
}

//检查上次校验时间
function checkCalibratetime(){
	var date = document.getElementById("calibratetime").value;
	var error = document.getElementById("scalibratetime");
	var result = date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)
	if (date == "") {
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (!(/^(.+)(-|\/)(.+)\2(.+)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期格式年/月/日或年-月-日</font>";
		return false;
	} else if (date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)) {
		var d = new Date(result[1], result[3] - 1, result[4]);
		if (!(d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4])) {
			error.innerHTML = "<font color='red'>请输入正确的日期</font>";
			return false;
		} else {
			error.innerHTML = "";
			return true;
		}
	} else if (!(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else if (!(/^(\D*)(-|\/)(\D*)\2(\D*)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else {
		error.innerHTML = "";
		return true;	
	}
}

//检查复校时间
function checkResumptiontime() {
	var date = document.getElementById("resumptiontime").value;
	var error = document.getElementById("sresumptiontime");
	var result = date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/);
	if (date == "") {
		error.innerHTML = "<font color='red'>此项不能为空</font>";
		return false;
	} else if (!(/^(.+)(-|\/)(.+)\2(.+)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期格式年/月/日或年-月-日</font>";
		return false;
	} else if (date.match(/^(\d{4})(-|\/)(\d+)\2(\d+)$/)) {
		var d = new Date(result[1], result[3] - 1, result[4]);
		if (!(d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4])) {
			error.innerHTML = "<font color='red'>请输入正确的日期</font>";
			return false;
		} else {
			error.innerHTML = "";
			return true;
		}
	} else if (!(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else if (!(/^(\D*)(-|\/)(\D*)\2(\D*)$/.test(date))) {
		error.innerHTML = "<font color='red'>请输入正确的日期</font>";
	    return false;
	} else {
		error.innerHTML = "";
		return true;	
	}
}


//检查上次校验是否大于复校时间
function checkCrTime() {
	var date1 = document.getElementById("calibratetime").value;
	var date2 = document.getElementById("sresumptiontime").value;
	var dateDiff = new Date(date2).getTime() - new Date(date1).getTime();
	 var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
	if (dayDiff < 0) {
		return false;
	};
	return true;
}


//获取天数
function getDays(date) {
       //构造当前日期对象
       var date = new Date(date);
       var year = date.getFullYear();//获取年份
       var mouth = date.getMonth() + 1;//获取当前月份
       var days;//定义当月的天数；
       if (mouth == 2) {//当月份为二月时，根据闰年还是非闰年判断天数
           days = year % 4 == 0 ? 29 : 28;
       } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
           //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
           days = 31;
       } else {
           //其他月份，天数为：30.
           days = 30;
       }
       return days;
}


//检查字符长度
function getLength(str) {
	var len = 0;
	var str = String(str);
	for (var i=0;i<str.length;i++) {
		var c = str.charCodeAt(i);
		//单字节加1
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f))  {
			len++;
		} else {
			len += 2;
		}	
	}
	return len;
}

//检查模板1提交表单
function  T1Login() {
	var status = document.getElementById("status").value;
	if (status == 1) {
		if (checkAssetnum() && checkProductname() && checkModelname() &&  checkNumber() && checkPosition()  && checkEntertime() && checkRemark() && checkProfitloss()) {
			return true;
		};
	} else {
		if (checkAssetnum() && checkProductname() && checkModelname() &&  checkNumber() && checkPosition() && checkEntertime()
			&& checkUsername() && checkUseremail() && checkLendtime() && checkBacktime() && checkRemark() && checkProfitloss() && checkLbTime()) {
			return true;
		};
	};
	/*if (! checkCrTime()) {
		document.getElementById("msgBox").innerHTML = "上次校验时间不能小于复校时间";
		//document.getElementById("msgBox").style.display = "block";
		popTip('输入有误，请检查输入框', 'error');
		return false;
	};
	*/
	if (! checkLbTime()) {
		//document.getElementById("msgBox").innerHTML = "预计归还时间不能小于借机时间";
		//document.getElementById("msgBox").style.display = "block";
		popTip('预计归还时间不能小于借机时间', 'warning');
		return false;
	};
	//document.getElementById("msgBox").style.display = "block";
	
	popTip('输入有误,请检查输入框', 'error');
	return false;
}


//检查模板2提交表单
function  T2Login() {
	var status = document.getElementById("status").value;
	if (status == 1) {
		if (checkAssetnum() && checkProductname() && checkModelname() &&  checkNumber() && checkOwner() && checkPosition() && checkCalibratetime() 
			&& checkResumptiontime() && checkRemark() && checkProfitloss() && checkCrTime()) {
			return true;
		};
	} else {
		if (checkAssetnum() && checkProductname() && checkModelname() &&  checkNumber() && checkOwner() && checkPosition() && checkCalibratetime() 
			&& checkUsername() && checkUseremail() && checkLendtime() && checkBacktime() && checkRemark() && checkProfitloss() && checkLbTime()&& checkCrTime()) {
			return true;
		};
	};
	if (! checkCrTime()) {
		//document.getElementById("msgBox").innerHTML = "上次校验时间不能小于复校时间";
		//document.getElementById("msgBox").style.display = "block";
		popTip('上次校验时间不能小于复校时间', 'warning');
		return false;
	};
	if (! checkLbTime()) {
		//document.getElementById("msgBox").innerHTML = "预计归还时间不能小于借机时间";
		//document.getElementById("msgBox").style.display = "block";
		popTip('预计归还时间不能小于借机时间', 'warning');
		return false;
	};
	//document.getElementById("msgBox").style.display = "block";
	popTip('输入有误,请检查输入框', 'error');
	return false;
}


//检查模板3提交表单
function  T3Login() {
	var status = document.getElementById("status").value;
	if (status == 1) {
		if (checkAssetnum() && checkProductname() && checkModelname() &&  checkNumber() && checkOwner() && checkPosition() && checkDepartment() 
			&& checkCalibratetime() && checkResumptiontime() && checkRemark() && checkProfitloss() && checkCrTime()) {
			return true;
		};
	} else {
		if (checkAssetnum() && checkProductname() && checkModelname() &&  checkNumber() && checkOwner() && checkPosition() && checkDepartment() 
		&& checkCalibratetime() && checkUsername() && checkUseremail() && checkLendtime() &&  checkRemark() && checkProfitloss() 
		&& checkCrTime()) {
			return true;
		};
	};
	if (! checkCrTime()) {
		//document.getElementById("msgBox").innerHTML = "上次校验时间不能小于复校时间";
		//document.getElementById("msgBox").style.display = "block";
		popTip('上次校验时间不能小于复校时间', 'warning');
		return false;
	};
	// if (! checkLbTime()) {
	// 	//document.getElementById("msgBox").innerHTML = "预计归还时间不能小于借机时间";
	// 	//document.getElementById("msgBox").style.display = "block";
	// 	popTip('预计归还时间不能小于借机时间', 'warning');
	// 	return false;
	// };
	document.getElementById("msgBox").style.display = "block";
	return false;
}

//检查仓库添加提交的函数
function checkDepot() {
	var depotname = document.getElementById('depotname').value;
	var error = document.getElementById('sdepotname');
	if (depotname == "") {
		error.innerHTML = "<font color='red'>仓库名不能为空</font>";
		var flag = 0;
	} else if (/^(\w[\u4e00-\u9fa5])+$/.test(depotname)) {
		error.innerHTML = "<font color='red'>只能输入数字、字母、下划线和中文</font>";
		var flag = 0;
	} else if (getLength(depotname) > 30) {
		error.innerHTML = "<font color='red'>范围：1-30</font>";
		var flag = 0;
	} else {
		error.innerHTML = "";
		return true;
	};
	
	document.getElementById('submit').onclick = function () {
		if (flag == 0) {
			//document.getElementById("msgBox").style.display = "block";
			popTip('输入有误,请检查输入框', 'error');
			return false;
		}
	}
}



















