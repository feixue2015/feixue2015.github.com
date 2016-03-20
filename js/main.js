window.onload = function() {
	var backgd = document.getElementById('backgd'); //主题背景
	var backbtn = document.getElementsByClassName('changeStyle') //背景切换按钮
	var navbox = document.getElementById('nav'); // 导航切换频道
	var lists = navbox.getElementsByTagName('span');
	var bs = navbox.getElementsByTagName('b');

	for (var i = 0; i < lists.length; i++) {
		lists[i].index = i;
		lists[i].onmouseover = function() { //鼠标滑过导航时
			scaleBig(this, bs);
		}
		lists[i].onmouseout = function() { //鼠标离开导航时
			scaleSmall(this, bs);
		}
		lists[i].onclick = function() {
			changeType(this);
		}
	}
	backgd.style.backgroundImage = 'url(image/back1.jpg)'; //主业初始化
	backgd.style.backgroundSize = '100% 100%';
	backbtn[0].onclick = function() {
		changeStyle();
	}
}

function changeStyle() {
	var imgarr = ['image/back1.jpg', 'image/back2.jpg', 'image/back3.jpg', 'image/back4.jpg', 'image/back5.jpg'];
	var num = Math.floor(Math.random() * 5);
	console.log(num);
	backgd.style.backgroundImage = 'url(' + imgarr[num] + ')';
}

function scaleBig(obj, bs) {
	obj.style.transform = "scale(1.75,1.75)";
	bs[obj.index].style.transform = "scale(1,1)";
}

function scaleSmall(obj, bs) {
	obj.style.transform = "scale(1,1)";
	bs[obj.index].style.transform = "scale(0,0)";
}