function $(objID){return document.getElementById(objID);}
function selmobtext(){$('m').select();$('m').focus();}
function query()
{
	// ���Ϊ�գ���ʾ���󲢷���
	if ($("m").value.replace(/(^\s*)|(\s*$)/g,"").length == 0)
	{
		$("txtError").innerHTML = "�������ֻ����롣";
		$("panelResult").style.display=$("panelNotice").style.display="none";$("panelError").style.display="block";
		selmobtext();
		return false;
	}
	
	// ��ȡ�������ݣ��ɹ������ querycallback ����
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
	// ����Ƿ�ɹ���ȡ�ֻ�������Ϣ
	if (obj["QueryResult"] != "True")
	{
		$("txtError").innerHTML = "��������ֻ������ʽ�������������롣";
		$("panelResult").style.display=$("panelNotice").style.display="none";$("panelError").style.display="block";
	}
	else
	{
		// ����ֱϽ�У�����ʾ��ʡ������
		//if (obj["City"] == obj["Province"])
		//	obj["Province"] = "";

		// ��ʾ��ѯ���Ĺ�����Ϣ
		if ($("txtMobile")!=null)	$("txtMobile").innerHTML=obj["Mobile"];
		if ($("txtTO")!=null)		$("txtTO").innerHTML=obj["TO"];
		if ($("txtProvince")!=null)	$("txtProvince").innerHTML=obj["Province"];
		if ($("txtCity")!=null)		$("txtCity").innerHTML=obj["City"];
		if ($("txtAreaCode")!=null)	$("txtAreaCode").innerHTML=obj["AreaCode"];
		if ($("txtPostCode")!=null)	$("txtPostCode").innerHTML=obj["PostCode"];
		if ($("txtVNO") != null)	$("txtVNO").innerHTML = obj["VNO"];
		if ($("txtCard") != null)	$("txtCard").innerHTML = obj["TO"];			// 2014-4-17�����д����Ϊ����ԭ�ӿڶ�����������������
		
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