//获取name=box的checkbox框的状态
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
}

//全选删除容错判断
function delAll() {
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

}

//检查上传文件的类型
function checkUploadFile() {
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

// 管理员账户修改密码,根据checkbox框的状态判断显示，隐藏元素
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

/*获取ids,批量删除*/
function batch_del() {
	console.log('batchdel')
	var ids = '';
	$('input:checkbox').each(function () {
		if (this.checked == true) {
			ids += this.value + ',';
		}
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
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					alert(data.message);
					location.reload();
				} else {
					alert(data.message);
				}
			},
			error: function (data) {
				console.log(data.msg);
			},
		});
	}
}

/*获取name和ids,批量删除*/
function delete_item() {
	console.log('delete_item')
	var ids = '';
	$('input:checkbox').each(function () {
		if (this.checked == true) {
			ids += this.value + ',';
		}
	});
	//下面的ajax根据自己的情况写
	var b = confirm('批量删除后不可恢复，谨慎操作！', {
		icon: 7,
		title: '警告'
	});
	console.log(ids);
	// var name = document.querySelector('body > div.container-fluid > div > div.col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main > h2').innerText
	var depot = document.getElementById("depotName")
	name = depot.innerText
	// console.log(typeof(name));
	name = encodeURI(name);
	console.log(name);
	// var depotname = $("#depotName").innerText
	console.log(b)
	if (b) {
		$.ajax({
			type: 'POST',
			url: '/'+ name +'/deleteall',
			data: {
				ids: ids,
			},
			dataType: 'json',
			success: function (data) {
				console.log('success',data.code)
				if (data.code == 200) {
					alert(data.message);
					console.log('Refresh');
					location.reload();
				} else {
					alert(data.message);
				}
			},
			error: function (data) {
				location.reload()
				console.log('error:',data.msg);
			},
		});
	}
}