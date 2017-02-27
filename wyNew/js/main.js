//获取屏幕的尺寸
// var w=docuemnt.docuemntElement.clientWidth||docuemnt.body.clientWidth;
// var h=docuemnt.docuemntElement.clientHeight||docuemnt.body.clientHeight;
var w = $(window).width();
var h = $(window).height();
var width = w > 414 ? 414 : w;
console.log(w);
console.log(h);
//设置slide的宽
var slides = $(".slide-list");
slides.css({
	"width": w + "px"
});
var slideBox = $("#slide");
slideBox.css({
	"width": w * slides.length + "px",
	"transform": "translate3(0px,0px,0px)",
	"tansition-duration": "0.6s"
});
//触摸屏幕事件
//屏幕开始滚动时触发nav为fixed
var headNav = $(".head-nav");
var navContain = $(".nav-contain");
navContain.css({
	"height": "0px"
});
var topX = 0;
$(window).scroll(function() {
	/************获取滚动条的位置**************/
	topX = $(document).scrollTop();
	/************nav定位为fixed的位置**************/
	if (topX == 0) {
		headNav.attr("class", "head-nav");
	}
	if (topX != 0) {
		headNav.attr("class", "head-nav head-navScroll");
		headNav.css({
			"width": width + "px"
		});
	}
	var back = $(".suggest-back");
	if (topX > 100) {
		back.css({
			"display": "block"
		});
	} else {
		back.css({
			"display": "none"
		});
	}
});
var sanIcon = $(".san-icon");
var ifShow = true;
sanIcon.click(function() {
	if (ifShow == true) {
		navContain.css({
			"height": "31rem"
		});
		ifShow = false;
		sanIcon.css({
			"background": "url('img/scroll-bottom.png') no-repeat",
			"background-size": "1.2rem 0.5rem",
			"background-position": "0.5rem 0.7rem"
		});
	} else if (ifShow == false) {
		navContain.css({
			"height": "0px"
		});
		ifShow = true;
		sanIcon.css({
			"background": "url('img/scroll.png') no-repeat",
			"background-size": "1.2rem 0.5rem",
			"background-position": "0.5rem 1.2rem"
		});
	}
});
/*************点击用户登录***************/
var user = $(".user");
var userMark = $(".user-mark");
var userLogin = $(".user-login");
user.click(function() {
	userMark.attr("class", "user-mark show");
	userLogin.attr("class", "user-login show");
});
userMark.click(function() {
	userMark.attr("class", "user-mark");
	userLogin.attr("class", "user-login");
});
/************点击返回顶部**************/

var goBack = $(".back");
goBack.click(function() {
	$(document).scrollTop("0px");
});

/***********点击切换新闻频道***********/
var data;
$.getJSON("data.json", function(result) {
	data = result.data;
	addLoad();
	showNew(0, data);
	$(".slide-box").css({
		"transform": "translate3d(0px, 0px, 0px)",
		"transition-duration": "0.5s"
	});
	//touch轮播图
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true
    });
});
var types = $("#type .list");
types.click(function() {
	addLoad();
	var index = $(this).index();
	showNew(index, data);
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true
    });
});

function showNew(index, data) {
	var newarr = []; //存储slide的图片数量
	if(data){
		$(".main").html("");
	}
	$.each(data, function(i, field) {
		if (field.type == index) {
			var html = " ";	
			if (field.style == "slide") {
				var str = "";
				$.each(field.content, function(i, arr) {
					newarr.push(arr.img);
					str += '<li class="slide-list swiper-slide"><a class="slide-list-a" href="imgInfor.html?id='+field.content[i].id+'"><img src="' + arr.img + '" /><span class="list-title">' + field.content[i].title + '</span></a></li>';
				});
				html = '<div class="slide swiper-container"><ul class="slide-box swiper-wrapper" id="slide-box">' + str + '</ul><div class="pageBox"><span class="current">' + (++i) + '</span><b>/</b><span class="total">' + newarr.length + '</span></div></div>';
			}
			if (field.style == "list") {
				html += '<div class="news"><div class="news-list"><a href="list.html?id='+field.id+'"><div class="img"><img src="' + field.img + '"></div><div class="infor"><div class="infor-top"><span>' + field.title + '</span></div><div class="infor-bottom"><div class="infor-time"><span>' + field.times + '</span></div><div class="infor-like"><span class="icon">0</span><span class="num">' + field.like + '</span></div></div></div></a></div></div>';
			}
			if (field.style == "lists") {
				html += '<div class="news-list news-item"><a href="list.html?id='+field.id+'"><div class="item-title">' + field.title + '</div><div class="item-img"><div class="item-ingBox"><img src="' + field.img1 + '" alt=""><img src="' + field.img2 + '" alt=""><img src="' + field.img3 + '" alt=""></div></div><div class="item-bottom"><div class="infor-time"><span>' + field.times + '</span></div><div class="infor-like"><span class="icon">0</span><span class="num">' + field.like + '</span></div></div></a></div>';
			}
			$(".main").append(html);
		}
	});
	$(".slide-list").css({
		"width": width + "px"
	});
	$("#slide-box").css({
		"width": width * newarr.length + "px"
	});
}
//获取数据前提示正在加载
function addLoad(){
	var load=$('<div class="loading"><div class="load-box"><span class="load-icon"></span><span class="load-font">正在加载......</span></div></div>');
	$(".main").html(load);
}