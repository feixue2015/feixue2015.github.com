var mybox = document.getElementById('work-box');
var lists = mybox.getElementsByClassName('list'); //我的作品列表1
var lists2=mybox.getElementsByClassName('lists'); //我的作品列表2
var imagebox=mybox.getElementsByClassName('image');//获取class为image的元素
start();

function start() {
	for (var i = 0; i < lists.length; i++) {
		lists[i].index = i;
		var bkarr=['image/bk1.png','image/bk2.png','image/bk3.png','image/bk4.png','image/bk5.png','image/bk6.png'];
		imagebox[i].style.background='url('+bkarr[i]+')';
		imagebox[i].style.backgroundSize=' 100% 100%';
		lists[i].onclick = function() {
			Bombbox(this);
		}
	}
	for(var i=0;i<lists2.length;i++){
		var bkarr2=['','',''];
		lists2[i].style.background=url();
		lists2[i].onclick=function(){
			window.open('http://www.baidu.com');
		}
	}
}

function Bombbox(obj) {
	var w = document.documentElement.clientWidth; //获取屏幕可见宽度
	var h = document.documentElement.clientHeight; //获取屏幕可见高度
	var ids = ['iframe1', 'iframe2', 'iframe3', 'iframe4','iframe5'];
	var bkarr=['image/bk1.png','image/bk2.png','image/bk3.png','image/bk4.png','image/bk5.png','image/bk6.png'];
	document.body.style.overflow = "hidden";

	var mark = document.createElement('div'); //创建遮罩层
	mark.className = "mark";
	mark.style.width = w + 'px';
	mark.style.height = h + 'px';
	mark.style.top = document.body.scrollTop + 'px'; //与鼠标距离定点的位置一致
	document.body.appendChild(mark);

	var markbox = document.createElement('div'); //产品容器
	markbox.className = "mark-box ";
	markbox.style.animation = "animation1 1s";
	mark.appendChild(markbox);

	var markbtn = document.createElement('div'); //关闭按钮
	markbtn.className = "markbtn";
	markbox.appendChild(markbtn);

	var container = document.createElement('div');
	container.className = "container";
	container.style.background=' rgba(9,9,9,0.5) url('+bkarr[obj.index]+') no-repeat';
	container.style.backgroundSize=' 100% 100%';
	markbox.appendChild(container);

	markbtn.onclick = function() {
		btnclose(mark);
	};
	var openmark = document.createElement('div');//设置产品播放开关遮罩层
	openmark.className='openmark';

	container.appendChild(openmark);
	var openbtn = document.createElement('span');//设置产品播放开关
	openbtn.className='openbtn';
	openmark.appendChild(openbtn);

	var sample = document.createElement('iframe'); //添加样品
	sample.id = ids[obj.index];
	sample.name = "iframe";
	sample.className = 'iframeclass';
	sample.scrolling = "yes";
	container.appendChild(sample);
	
    openbtn.onclick=function(){   //作品显示
    opensample(openmark,sample,obj);
    }	
}

function btnclose(obj) {
	obj.style.display = "none";
	document.body.style.overflow = "scroll";
}

function opensample(obj1,sample,obj2){
	obj1.style.display='none';
	var containbox = ['sample1/tupian3D.html','sample2/jianbihua.html','sample3/zhaopianqiang.html','sample4/Carousel.html','sample5/wooden horse3D.html','sample6/NewYear.html'];
	sample.src=containbox[obj2.index];
	sample.marginHeight="10px";	
}