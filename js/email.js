
var inforbox=document.getElementById('information');//获取存储个人联系信息的盒子
	var spans=inforbox.getElementsByTagName('span');
	var change=document.getElementById('change-big'); //显示信息
		change.innerHTML="姚小翠";// 初始化值

	for(var i=0;i<spans.length;i++){
		spans[i].index=i;;
		spans[i].onmouseover=function(){//鼠标滑过联系信息时，出现animantion动画
         showBegin(this,change);
		}
		spans[i].onmouseout=function(){//鼠标滑过联系信息时，结束animantion动画
         showStop(this,change);
		}
	}

function showBegin(obj,change){
	var arr=['18010491823','serena_yao@163.com','QQ:983295824'];
	change.style.animation="change 1s";
	change.innerHTML=arr[obj.index];
}
function showStop(obj,change){
	change.style.animation="";
}