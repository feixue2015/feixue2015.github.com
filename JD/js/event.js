//左轮播
function moveLeft(w, id, obj, length) {
	obj.style.left = -w * (id + 1) + "px";
	if (parseInt(obj.style.left) < -w * (length - 1)) {
		obj.style.left = "0px";
	}
	changeIndex(id + 1);
}
// 右轮播
function moveRight(w, id, obj, length) {
	var left = parseInt(obj.style.left);
	obj.style.left = -w * (id - 1) + "px";
	if (parseInt(obj.style.left) > 0) {
		obj.style.left = "-" + w * (length - 1) + "px";
	}
	changeIndex(id - 1);
}
// 轮播按钮
function changeIndex(index) {
	var btns = $("#btns .btnlist")
	if (index > 6)
		index = 0;
	for (var i = 0; i < btns.length; i++) {
		if (btns[i] == btns[index]) {
			$(btns[i]).addClass("on");
		} else
			$(btns[i]).removeClass("on");
	}
}
var hours;
var mins;
var seconds;
var hoursbox;
var minsbox;
var secondsbox;
//获取时间
function plusTime() {
	hoursbox = $(".hour");
	minsbox = $(".mins");
	secondsbox = $(".seconds");
	hours = hoursbox.text();
	mins = minsbox.text();
	seconds = secondsbox.text();
	secondsPlus();
}
//秒针倒计时
function secondsPlus() {
	seconds--;
	if (seconds < 10 && seconds >= 0) {
		seconds = "0" + seconds;
	} else if (seconds < 0) {
		seconds = 59;
		minsPlus();
	}
	if (mins == 0 && hours == 0 && seconds <= 0) {
		secondsbox.text("00");
		return false;
	}
	setTimeout(secondsPlus, 1000);
	secondsbox.text(seconds);
}
//分针倒计时
function minsPlus() {
	mins--;
	if (mins < 10 && mins >= 0) {
		mins = "0" + mins;
	} else if (mins < 0) {
		mins = 59;
		hourPlus();
	}
	minsbox.text(mins);
}
//时针倒计时
function hourPlus() {
	hours--;
	if (hours < 10 && hours >= 0) {
		hours = "0" + hours;
	} else if (hours < 0) {
		return false;
	}
	hoursbox.text(hours);
}

//点击回到顶部事件
var obj = $(window);
var part = 6; //返回的一小段距离
function goTop() {
	var newH = obj.scrollTop();
	obj.scrollTop(newH - newH / part);
	var timer3 = setTimeout(goTop, 10);
	if (parseInt(newH) < 3) {
		obj.scrollTop(0);
		clearTimeout(timer3);
	}
}
var shoplist = $("#recommend-goods"); //商品容器
function addList(total, index, listnum, date) {
	if (listnum * index < total) {
		var html = $(shoplist).html();
		if (total - listnum * index < listnum) {
			for (var i = listnum * index; i < total; i++) {
				html += '<li class="shopping-list"><a href="javascript:void(0)"><div class="image-box"><img class="shop-image" src="recommend/' + date.goods[i].img + '"></div><div class="text-box"><div class="text-name">' + date.goods[i].name + '</div><div class="text-price"><span class="price-ico">￥</span><span class="recprice1">' + date.goods[i].price1 + '</span><b class="point">.</b><span class="recprice2">' + date.goods[i].price2 + '</span><span class="like">看相似</span></div></div></a></li>';
			}
		} else {
			for (var i = listnum * index; i < listnum * (index + 1); i++) {
				html += '<li class="shopping-list"><a href="javascript:void(0)"><div class="image-box"><img class="shop-image" src="recommend/' + date.goods[i].img + '"></div><div class="text-box"><div class="text-name">' + date.goods[i].name + '</div><div class="text-price"><span class="price-ico">￥</span><span class="recprice1">' + date.goods[i].price1 + '</span><b class="point">.</b><span class="recprice2">' + date.goods[i].price2 + '</span><span class="like">看相似</span></div></div></a></li>';
			}
		}
		$(shoplist).html(html);
		$(".shop-image").css({
			"width": $(".recommend").width() / 2 - 4 + "px",
			"height": $(".recommend").width() / 2 - 4 + "px"
		});
		if (listnum * (index + 1) == total) {
			$("#addmore").html("<span>没有更多了</span>");
		}
	}
}