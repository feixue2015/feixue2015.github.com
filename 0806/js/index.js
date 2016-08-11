window.onload = function() {
	setLiPosition();
}

function getIndex(height, minH) {
	for (var i = 0; i < height.length; i++) {
		if (minH == height[i])
			return i;
	}
}
window.onscroll = function() {
	if (checkHeight()) {
		createLi();
		setLiPosition();
	}
}

function setLiPosition() {
	var box = document.getElementById("list");
	//获取屏幕的宽度
	var screenWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	console.log(screenWidth);
	//获取每张图片容器的宽度
	var lis = document.getElementsByTagName("li");
	var lisWidth = lis[0].offsetWidth;
	var num = Math.floor(screenWidth / lisWidth);
	//设置瀑布流的容器宽度
	box.style.width = lisWidth * num + "px";
	var heights = []; //存储每列的高度
	for (var i = 0; i < lis.length; i++) {
		if (i < num) {
			heights[i] = lis[i].offsetHeight;
			console.log(heights[i]);
		} else {
			var minHeight = Math.min.apply("", heights);
			//获取高度最小的下标
			var index = getIndex(heights, minHeight);
			//将后面的图片一次排在每个高度最低的列表下面
			lis[i].style.position = "absolute";
			lis[i].style.left = lis[index].offsetLeft + "px";
			lis[i].style.top = minHeight + "px";
			heights[index] += lis[i].offsetHeight;
		}
	}
}
//判断屏幕高度+滚动条高度是否>文档内容的高度
function checkHeight() {
	var box = document.getElementById("list");
	var lis = box.getElementsByTagName("li");
	var docHeight = Math.floor(lis[lis.length - 1].offsetHeight / 2) + lis[lis.length - 1].offsetTop;
	var changeHeight = document.documentElement.clientHeight || window.innerHeight;;
	var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
	return docHeight < changeHeight + scrollHeight ? true : false;
}
//随着滚动条的滚动产生图片
function createLi() {
	var box = document.getElementById("list");
	var lis = box.getElementsByTagName("li");
	for (var i = 0; i < 20; i++) {
		var liNode = document.createElement("li");
		box.appendChild(liNode);
		var divNode = document.createElement("div");
		liNode.appendChild(divNode);
		var img = document.createElement("img");
		// imgNode.src = "images/" + (currNodeNum+i+1) + ".jpg";
		img.src = "images/" + (i + 1) + ".jpg";
		divNode.appendChild(img);
	}
}