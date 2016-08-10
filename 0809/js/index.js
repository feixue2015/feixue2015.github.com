window.onload=function () {
	var startbtn=document.getElementById("start");
	var stopbtn=document.getElementById("stop");
	var dispalybtn=document.getElementById("none");
	var boat1=document.getElementById("boat1");
	var boat1Inner=boat1.getElementsByClassName("boat1_inner")
	var total=document.getElementById("total");
	var i=0;
	var status=true;//表示飞船的状态
	var timer=null;
	var timer2=null;
	var enery=100;//存储能源变量
	var add=0;//增加的能源
	startbtn.onclick=function(){
		if(status){
			changeRotate();
		}
		
	}
	stopbtn.onclick=function(){
		clearTimeout(timer);
		status=true;
	}
	dispalybtn.onclick=function(){
		confirm("确定要销毁飞船");
		if (confirm) {
			console.log(1);
		};
	}
	//开始飞行
	function changeRotate(){
		status=false;
		boat1.style.transform="rotateZ(-"+i+"deg) translateY(210px)";
		i++;
		timer=setTimeout(changeRotate,30);
		plusEngery();
		console.log(boat1Inner);
	}
	//随着飞行能源不断减少
	function plusEngery(){
		boat1Inner[0].style.width=enery+"%";
		enery+=-0.05;
		add+=0.02; //太阳能充电获得的能量
		total.innerHTML=parseInt(enery+add)+"%";
		if(enery+add<0){
			status=true;
			clearTimeout(timer);
		}
	}
}