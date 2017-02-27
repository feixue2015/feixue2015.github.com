var w = $(window).width();
var h = $(window).height();
var width = w > 414 ? 414 : w;
var back = $(".go-back");
back.click(function() {
	window.history.back();
});
var href = window.location.href;
//记录具体新闻的id
var id = href.substring(href.indexOf("=") + 1, href.length);
var arrP = [];
$.getJSON("data.json", function(result) {
	var data = result.data;
	var str1 = "";
	var str2 = "";
	var str3 = "";
	var html = ""; //存储新增的元素
	var arrImg = [];
	var arrSpan = [];
	$.each(data, function(i, field) {
		if (field.style == "slide") {
			$.each(field.content, function(j, arr) {
				if (arr.id == id) {
					console.log(arr);
					$.each(arr.content, function(i, list) {

						$.each(list.infor.img, function(i, img) {
							str1 += '<li class="infor-list swiper-slide"><div class="imgBox"><img src="' + img + '" index=' + i + '></div></li>';

						});
						$.each(list.infor.p, function(k, p) {
							//console.log(list.infor.p);
							arrP.push(p);
						});
						str2 += '<li class="inforbox"><h2>' + arr.title + '</h2><p><span class="p-text">' + list.infor.p + '</span></p></li>';
					});
					html = '<ul class="listBox swiper-wrapper">' + str1 + '</ul>' + '<ul class="listBox-infor">' + str2 + '</ul>';
					$(".infor").html(html);
					TextHeight = $(".p-text").height();


				}
			});
		}


	});

	var imgs = $(".imgBox img");
	var imgBox = $(".imgBox");
	$.each(imgs, function(i, img) {
		var imgHeight = $(img).height();
		if (imgHeight < h) {
			$(imgBox[i]).css({
				"transform": "translate3d(0px, -50%, 0px) translate3d(0px," + (-imgHeight * 0.2) + "px, 0px)"
			});
		}
	});
	$(".infor-list").css({
		"width": width + "px"
	});
	$(".listBox").css({
		"width": width * arrImg.length + "px"
	});
	/*var isShow=true;
	var body=document.getElementsByTagName("body")[0];
	body.addEventListener("touchstart",function(e){ 
	console.log(1);
		e.preventDefault();
			//e.stopPropagation();
		var touch=e.touches[0];	
	},false);
	body.addEventListener("touchmove",function(e){ 
			//e.stopPropagation();
				e.preventDefault();
		var touch=e.touches[0];			
	},false);
	body.addEventListener("touchend",function(e){
			//e.stopPropagation();
				e.preventDefault();
		if(isShow){
			$("body").attr("class","");
			isShow=false;
		}else{
			$("body").attr("class","active");
			isShow=true;
		}
	},false);*/
	var targe;
	//切换图片时，更新文字内容
	var TextHeight; //存储变更文字的元素的高度
	var listBox = document.getElementsByClassName("listBox")[0];

	listBox.addEventListener("touchstart", function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		target = touch.target;
	}, false);
	listBox.addEventListener("touchend", function(e) {
		e.preventDefault();
		for (var i = 0; i < arrP.length; i++) {
			if (i == target.getAttribute("index")) {
				$(".inforbox p").html('<span class="p-text">' + arrP[i] + '</span>');
			}
		}
		TextHeight = $(".p-text").height();


	}, false);
	//变更文字内容的高度
	var listBoxInfor = document.getElementsByClassName("listBox-infor")[0];
	var s_moveY;
	var e_moveY;
	var isAuto = true;
	listBoxInfor.addEventListener("touchstart", function(e) {
		e.stopPropagation();
		e.preventDefault();
		var touch = e.touches[0];
		s_moveY = touch.clientY;
		console.log(2);
	}, false);
	listBoxInfor.addEventListener("touchmove", function(e) {
		e.stopPropagation();
		e.preventDefault();
		var touch = e.touches[0];
		e_moveY = touch.clientY;
		$(".inforbox p").css({
			"-webkit-transition-duration": "0s"
		});
		if (s_moveY - e_moveY > 3) {
			$(".inforbox p").css({
				"height": TextHeight + "px"
			});
			$(".inforbox p").css({
				"-webkit-transition-duration": "0.6s"
			});
			isAuto = false;
		} else if (!isAuto) {
			$(".inforbox p").css({
				"height": "72px"
			});
			$(".inforbox p").css({
				"-webkit-transition-duration": "0.6s"
			});
			isAuto = true;
		}
	}, false);
	listBoxInfor.addEventListener("touchend", function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(".inforbox p").css({
			"-webkit-transition-duration": "0s"
		});


	}, false);
	var isShow=true;
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 1,
		spaceBetween: 0,
		touchMoveStopPropagation: true,
		loop: true
	});

});