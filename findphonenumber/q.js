function $(objID){return document.getElementById(objID);}
function selmobtext(){$('m').select();$('m').focus();}
function query()
{
	// 如果为空，显示错误并返回
	if ($("m").value.replace(/(^\s*)|(\s*$)/g,"").length == 0)
	{
		$("txtError").innerHTML = "请输入手机号码。";
		$("panelResult").style.display=$("panelNotice").style.display="none";$("panelError").style.display="block";
		selmobtext();
		return false;
	}
	
	// 读取归属数据，成功后调用 querycallback 函数
	var oHead = document.getElementsByTagName('head')[0];
	var oTar = document.getElementById("remotejs");
	
	if (oTar)	oHead.removeChild(oTar);
	
	var oScript = document.createElement('script');
	oScript.type = "text/javascript";
	oScript.id = "remotejs";
	oScript.src = "http://v.showji.com/Locating/showji.com2016234999234.aspx?m=" + escape($("m").value) + "&output=json&callback=querycallback&timestamp=" + new Date().getTime();
	oHead.appendChild(oScript);
	
	return false;
}
function querycallback(obj)
{
	// 检查是否成功获取手机归属信息
	if (obj["QueryResult"] != "True")
	{
		$("txtError").innerHTML = "您输入的手机号码格式有误，请重新输入。";
		$("panelResult").style.display=$("panelNotice").style.display="none";$("panelError").style.display="block";
	}
	else
	{
		// 对于直辖市，不显示“省”部分
		//if (obj["City"] == obj["Province"])
		//	obj["Province"] = "";

		// 显示查询到的归属信息
		if ($("txtMobile")!=null)	$("txtMobile").innerHTML=obj["Mobile"];
		if ($("txtTO")!=null)		$("txtTO").innerHTML=obj["TO"];
		if ($("txtProvince")!=null)	$("txtProvince").innerHTML=obj["Province"];
		if ($("txtCity")!=null)		$("txtCity").innerHTML=obj["City"];
		if ($("txtAreaCode")!=null)	$("txtAreaCode").innerHTML=obj["AreaCode"];
		if ($("txtPostCode")!=null)	$("txtPostCode").innerHTML=obj["PostCode"];
		if ($("txtVNO") != null)	$("txtVNO").innerHTML = obj["VNO"];
		if ($("txtCard") != null)	$("txtCard").innerHTML = obj["TO"];			// 2014-4-17：该行代码仅为兼容原接口而保留，即将废弃。
		
		if($("panelResult").style.display!="block")
		{$("panelError").style.display=$("panelNotice").style.display="none";$("panelResult").style.display="block";}
	}
	selmobtext();
}

function QueryString(name)
{
	var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"), r;
	if (r=window.location.search.match(reg)) return unescape(r[2]);
	return "";
}
if(typeof(strMobile)=='undefined')strMobile=QueryString("m");
if(strMobile.length>0){$("m").value=strMobile;query();}
selmobtext();