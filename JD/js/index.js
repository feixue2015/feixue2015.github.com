$(document).ready(function() {
	var width = $(window).width(); //获取屏幕的宽度
	var maxWidth = 800; //自定义页面的最大宽度
	//判断屏幕的大小与自定义宽度的比较
	var lastWidth = width > maxWidth ? maxWidth : width;
	var nav = $("#nav_list");
	var lis = $("#nav_list .list"); //轮播图列表

	$(".head").css({
		"height": parseInt(lastWidth * 0.6) + "px"
	});
	var length = lis.length;
	for (var i = 0; i < lis.length; i++) {
		$(lis[i]).css({
			"width": lastWidth + "px",
			"height": parseInt(lastWidth * 0.6) + "px"
		});
	}
	nav.css({
		width: lastWidth * length + "px",
		left: 0
	});
	var starPoint; //开始触摸屏幕时的X坐标
	var endPoint; //结束触摸屏幕时的X坐标
	var target; //触摸的dom节点目标
	var id; //存储dom的序列号
	var navEvent = document.getElementById("nav_list");
	navEvent.addEventListener("touchstart", function(e) {
		e.preventDefault();
		clearInterval(timer);
		var touch = e.touches[0];
		starPoint = touch.clientX;
		target = touch.target;
		id = parseInt(target.getAttribute("class").substr(target.getAttribute("class").length - 1, 1));
	}, false);

	navEvent.addEventListener("touchmove", function(e) {
		var touch = e.touches[0];
		endPoint = touch.clientX;
	}, false);
	navEvent.addEventListener("touchend", function(e) {
		var distance = parseInt(starPoint - endPoint);
		if (distance > 15) {
			moveLeft(lastWidth, id, navEvent, length);
		} else if (distance < -15) {
			moveRight(lastWidth, id, navEvent, length);
		}
		setInterval(anmationScroll, 3000);
	}, false);

	//自动轮播计时器
	var timer;

	function anmationScroll() {
		var i = 0;
		timer = setInterval(function() {
			if (i >= length)
				i = 0;
			moveLeft(lastWidth, i, navEvent, length);
			i++;
			changeIndex(i);
		}, 3000);
	}
	anmationScroll();

	//商品2
	$(".goods-box").css({
		"height": lastWidth / 1.6 + "px"
	});
	//页面滚动时搜索框置顶
	$(window).scroll(function() {
		var searchTop = $("#top");
		var scroll = $(document).scrollTop();
		searchTop.css({
			"background": "red",
			"transition": "all 0.8s"
		});
		if (scroll < 3) {
			searchTop.css({
				"background": "transparent",
				"transition": "all 0s"
			});
		}
	});
	var marginTop = ($(".timetitle").height() - $(".more").height()) / 2;
	$(".more").css({
		"marginTop": marginTop + "px"
	});
	$(".more-icon").css({
		"marginTop": marginTop + "px"
	});
	//秒杀倒计时
	var timew = $(".timetitle").height();
	var timebox = $(".timebox").height();
	$(".timebox").css({
		"marginTop": (timew - timebox) / 2 + "px"
	});
	$(".save-time").css({
		"height": lastWidth / 1.8 + "px"
	});
	$(".list2").css({
		"width": parseInt(lastWidth / 3.2) + "px"
	});
	plusTime();

	//设置秒杀商品的排列
	var timeul = $("#scroll-ul-list");
	var timeli = $(".list2")
	var timeLength = timeli.length;
	var scrollstartX;
	var scrollmoveX;
	var isMouseDown = false;
	var distance;
	var timeUl = document.getElementById("scroll-ul-list");
	timeul.css({
		"width": timeli.width() * timeLength + "px",
		"left": "0px"
	});

	function scrolleft(obj) {
		var newleft = parseInt(timeUl.style.left);
		var disleft = parseInt(obj.style.width) - parseInt(lastWidth / 3.2) * 4;
		if (newleft < -disleft) {
			timeUl.style.left = "0px";
		} else {
			timeUl.style.left = newleft - parseInt(lastWidth / 3.2) + "px";
		}
	}

	function scrollright(obj) {
		var newleft = parseInt(timeUl.style.left);
		var disleft = parseInt(obj.style.width) - parseInt(lastWidth / 3.2) * 3;
		console.log(newleft);
		if (newleft >= 0) {
			timeUl.style.left = -disleft + "px";
		} else {
			timeUl.style.left = newleft + parseInt(lastWidth / 3.2) + "px";
		}
	}
	timeUl.addEventListener("touchstart", function(e) {
		isMouseDown = true;
		var touch = e.touches[0];
		scrollstartX = touch.clientX;
	}, false);
	timeUl.addEventListener("touchmove", function(e) {
		var touch = e.touches[0];
		scrollmoveX = touch.clientX;
		distance = scrollmoveX - scrollstartX;
		if (distance > 15 || distance < -15) {
			e.preventDefault();
		}
	}, false);
	timeUl.addEventListener("touchend", function(e) {
		var _this = this;
		if (distance > 15) {
			scrollright(_this);
		} else if (distance < -15) {
			scrolleft(_this);
		}
	}, false);
	//商品4
	$(".showlist").css({
		"width": lastWidth + "px"
	});
	//商品5
	$(".lifelist").css({
		"height": $(".lifelist").width() * 1 + "px"
	});
	//横幅1
	var linebox = $("#line");
	var linelist = $("#line .list");
	var linebox2 = $("#line2");
	var linelist2 = $("#line2 .list");
	var linelength = linelist.length;
	var length1 = linelist.length;
	linelist.css({
		width: lastWidth + "px"
	});
	linebox.css({
		width: lastWidth * linelength + "px"
	});
	linelist2.css({
		width: lastWidth + "px"
	});
	linebox2.css({
		width: lastWidth * linelength + "px"
	});
	var lineBox1 = document.getElementById("line");
	var lineBox2 = document.getElementById("line2");
	startListener(lineBox1);
	startListener(lineBox2);

	function startListener(obj) {
		obj.addEventListener("touchstart", function(e) {
			// e.preventDefault();
			clearInterval(timer);
			var touch = e.touches[0];
			starPoint = touch.clientX;
			target = touch.target;
			id1 = parseInt(target.getAttribute("class").substr(target.getAttribute("class").length - 1, 1));
		}, false);

		obj.addEventListener("touchmove", function(e) {
			var touch = e.touches[0];
			endPoint = touch.clientX;
		}, false);
		obj.addEventListener("touchend", function(e) {
			var distance = parseInt(starPoint - endPoint);
			if (distance > 10) {
				e.preventDefault();
				moveLeft(lastWidth, id1, obj, length1);
			} else if (distance < -10) {
				e.preventDefault();
				moveRight(lastWidth, id1, obj, length1);
			}

		}, false);
	}

	// 点击回到顶部事件
	var documentH = $(document).height(); //文档的高度
	var screenH = $(window).height(); //屏幕的可视高度
	var totop = $("#gotop");
	var scrollH;
	$(window).scroll(function() {
		scrollH = $(this).scrollTop(); //滚动条距离顶部的高度
		if (screenH * 2 < scrollH) {
			totop.css({
				"display": "block"
			});
		} else {
			totop.css({
				"display": "none"
			});
		}
	});
	var toTop = document.getElementById("gotop");
	toTop.addEventListener("touchend", function() {
		goTop();
	}, false);

	// 添加推荐商品列表
	var totalist;
	var listnum = 18;
	var date;
	var num = 0; //商品加载更多的次数
	// 继续更多商品
	var shoplist = $("#recommend-goods"); //商品容器
	// 获取商品数据信息
	$.getJSON("infor.json", function(result) {
		date = result;
		totalist = date.goods.length;
		addList(totalist, num, listnum, date);
	});
	$("#addmore").click(function() {
		num++;
		addList(totalist, num, listnum, date);
	});
	// 点击加载更多
	var addmore = document.getElementById("addmore");
	addmore.addEventListener("touchend", function() {
		num++;
		addList(totalist, num, listnum, date);
	}, false);
});