//获取name=box的checkbox框的状态
<<<<<<< HEAD
function checkboxAll(obj){
    //alert(obj.checked);
    //获取name=box的复选框
    var userids=document.getElementsByName("box");
    
    //alert(userids.length);
    for(var i=0;i<userids.length;i++){
        userids[i].checked=obj.checked;
    }
}

//checkbox全选/取消全选
function selectAll(){ 
    //获取name=box的复选框
    var userids=document.getElementsByName("box");
    var count=0;
    //遍历所有的复选框
    for(var i=0;i<userids.length;i++){
        if(userids[i].checked){  
                count++;
        }
    }
    //选中复选框的个数==获取复选框的个数 
    if(count==userids.length){
        //设置id为all复选框选中
        document.getElementById("all").checked=true;
    }else{
        //设置id为all复选框不选中
        document.getElementById("all").checked=false;
    }   
=======
function checkboxAll(obj) {
	//alert(obj.checked);
	//获取name=box的复选框
	var userids = document.getElementsByName("box");

	//alert(userids.length);
	for (var i = 0; i < userids.length; i++) {
		userids[i].checked = obj.checked;
	}
}

//checkbox全选/取消全选
function selectAll() {
	//获取name=box的复选框
	var userids = document.getElementsByName("box");
	var count = 0;
	//遍历所有的复选框
	for (var i = 0; i < userids.length; i++) {
		if (userids[i].checked) {
			count++;
		}
	}
	//选中复选框的个数==获取复选框的个数 
	if (count == userids.length) {
		//设置id为all复选框选中
		document.getElementById("all").checked = true;
	} else {
		//设置id为all复选框不选中
		document.getElementById("all").checked = false;
	}
>>>>>>> 879d67f145f8eea04057b9e1aba4281e42ce0bce
}

//全选删除容错判断
function delAll() {
<<<<<<< HEAD
    var userids=document.getElementsByName("box");
    var all = document.getElementById("all").checked;
    var count=0;
    //遍历所有的复选框
    for(var i=0;i<userids.length;i++){
        if(userids[i].checked){
                count++;
        }
    };
    // alert(count);
    if(count<=0) {
        alert("至少选择一条条目");
        return false;
    };
    return true;
}
// ajax删除页面选中的条目
function deleteSelected(argument) {
    // body...
    var xmlhttp;
    
=======
	var userids = document.getElementsByName("box");
	var all = document.getElementById("all").checked;
	var count = 0;
	//遍历所有的复选框
	for (var i = 0; i < userids.length; i++) {
		if (userids[i].checked) {
			count++;
		}
	};
	// alert(count);
	if (count <= 0) {
		alert("至少选择一条条目");
		return false;
	};
	return true;
}
// ajax删除页面选中的条目
function deleteSelected(argument) {
	// body...
	var xmlhttp;

>>>>>>> 879d67f145f8eea04057b9e1aba4281e42ce0bce
}

//检查上传文件的类型
function checkUploadFile() {
<<<<<<< HEAD
    var obj = document.getElementById('file')
    if (obj.value == "") {
        alert("请选择要上传的文件");
        return false;	
    }
    var stuff = obj.value.match(/^(.*)(\.)(.{1,8}$/)[3];
    if (stuff != "xls" || stuff != "xlsx") {
        alert("文件类型不正确");
        return false;
    }
    return true;
}

// 管理员账户修改密码,根据checkbox框的状态判断显示/隐藏元素
function checkSelectBox(){
    var check = document.getElementById('changepwd');
    var traget = document.getElementsByClassName('form-group');
    if(check.checked){
        for (var i=3;i<traget.length-1;i++) {
            traget[i].style.display="block";
        }
    }else{
        for (var i=3;i<traget.length-2;i++) {
            traget[i].style.display="none";
        }
    }
=======
	var obj = document.getElementById('file')
	if (obj.value == "") {
		alert("请选择要上传的文件");
		return false;
	}
	var stuff = obj.value.match(/^(.*)(\.)(.{1,8}$/)[3];
	if (stuff != "xls" || stuff != "xlsx") {
		alert("文件类型不正确");
		return false;
	}
	return true;
}

// 管理员账户修改密码,根据checkbox框的状态判断显示/隐藏元素
function checkSelectBox() {
	var check = document.getElementById('changepwd');
	var traget = document.getElementsByClassName('form-group');
	if (check.checked) {
		for (var i = 3; i < traget.length - 1; i++) {
			traget[i].style.display = "block";
		}
	} else {
		for (var i = 3; i < traget.length - 2; i++) {
			traget[i].style.display = "none";
		}
	}
>>>>>>> 879d67f145f8eea04057b9e1aba4281e42ce0bce
}
/*批量选中的效果*/
$('input:checkbox[name="selectall"]').click(function () {
	if ($(this).is(':checked')) {
		$('input:checkbox').each(function () {
			$(this).prop("checked", true);
		});
	} else {
		$('input:checkbox').each(function () {
			$(this).prop("checked", false);
		});
	}
});
<<<<<<< HEAD
/*获取ids,批量删除*/
function batch_del() {
    console.log('batchdel')
=======

/*获取ids,批量删除*/
function batch_del() {
	console.log('batchdel')
>>>>>>> 879d67f145f8eea04057b9e1aba4281e42ce0bce
	var ids = '';
	$('input:checkbox').each(function () {
		if (this.checked == true) {
			ids += this.value + ',';
		}
<<<<<<< HEAD
    });
    console.log(ids)
	//layer.alert(ids);return;
    //下面的ajax根据自己的情况写
    var b = confirm('批量删除后不可恢复，谨慎操作!', {
        icon:7,
        title:'警告'
    });
    
	if (b) {
		$.ajax({
			type: 'POST',
            url: '/book/settings/delall',
			data: { 
                ids: ids, 
            },
=======
	});
	//layer.alert(ids);return;
	//下面的ajax根据自己的情况写
	var b = confirm('批量删除后不可恢复，谨慎操作！', {
		icon: 7,
		title: '警告'
	});

	if (b) {
		$.ajax({
			type: 'POST',
			url: '/book/settings/delall',
			data: {
				ids: ids,
			},
>>>>>>> 879d67f145f8eea04057b9e1aba4281e42ce0bce
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					alert(data.message);
<<<<<<< HEAD
					location.reload();
=======
					location.reload()
>>>>>>> 879d67f145f8eea04057b9e1aba4281e42ce0bce
				} else {
					alert(data.message);
				}
			},
			error: function (data) {
				console.log(data.msg);
			},
		});
<<<<<<< HEAD
	}
}
	
=======

	}
}
>>>>>>> 879d67f145f8eea04057b9e1aba4281e42ce0bce
