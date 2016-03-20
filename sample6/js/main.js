var carvasbox;
var carvas;
var context;
var time;
var year = new Image();
var star = new Image();
var screenh;
var screenw;
var num = 80; // 定义星星的数量
var stars = [];

function init() {
	carvas = document.getElementById('carvas'); //获取创建好的画布
	context = carvas.getContext('2d');
	//添加画布背景图片
	year.src = 'picture/newyear.jpg';
	star.src = 'picture/star.png';
	for (var i = 0; i < num; i++) {
		var obj = new objStars();
		stars.push(obj);
		stars[i].init();
	}
	startBegin(); //开始绘制画布
}
// 每隔一段时间刷新carvas上的内容
function startBegin() {
	setTimeout('startBegin()', 80);
	drawBackground();
	drawNewyear();
	drawStar();

}

function drawBackground() {
	context.fillStyle = "#333";
	context.fillRect(0, 0, screenw, screenh);
}

function drawNewyear() {
	context.drawImage(year, 100, 50, 800, 500);
}
