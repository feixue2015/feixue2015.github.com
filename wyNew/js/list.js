var back = $(".logos");
var topX;
$(window).scroll(function(){
	/************获取滚动条的位置**************/
	topX = $(document).scrollTop();
	/************nav定位为fixed的位置**************/
	var back = $(".suggest-back");
	if (topX >10) {
		back.css({
			"display": "block"
		});
	} else {
		back.css({
			"display": "none"
		});
	}
});
/************点击返回顶部**************/

var goBack = $(".back");
goBack.click(function() {
	$(document).scrollTop("0px");
});
back.click(function() {
	window.history.back();
});
var href = window.location.href;
//记录具体新闻的id
var id = href.substring(href.indexOf("=") + 1, href.length);
$.getJSON("data.json", function(field) {


	var data = field.data;
	var str1 = "";
	var str2 = "";
	var html="";
	$.each(data, function(i, newdata) {


		if (newdata.id == id) {
			var typeLogo=$(".typeBox");
			if(newdata.type==1){
				typeLogo.attr("class","typeBox news_logo");
			}else if(newdata.type==2){
				typeLogo.attr("class","typeBox ent_logo");
			}else{
				typeLogo.attr("class","typeBox");
			}
			console.log(newdata);
			str1 += '<div class="art-titlebox"><div class="art-title">' + newdata.title + '</div><div class="art-timebox"><span class="art-time">' + newdata.times + '</span><span class="art-form">' + newdata.form + '</span></div></div>';
			if (newdata.content.infor.img) {
				$.each(newdata.content.infor.img, function(j, img) {
					str2 += '<div class="art-img"><img src="' + img + '"></div>';
				});
			}
			if (newdata.content.infor.p) {
				$.each(newdata.content.infor.p, function(k, p) {
					str2+='<p>'+p+'</p>';
				});
			}
			html=str1+'<div class="art-text">'+str2+'</div>';
		}
		$(".new-infor").html(html);
	});
});