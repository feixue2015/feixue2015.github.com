window.onload=function(){
  
	var ulbox=document.getElementById('ulimage');
	var leftbtn=document.getElementById('leftbtn');
	var rightbtn=document.getElementById('rightbtn');
	start(ulbox,leftbtn,rightbtn);
  var timer=null;
  timer=setInterval(function(){
     var left=ulbox.style.left;
    ulbox.style.left=parseInt(left)+600+'px';
    if(parseInt(ulbox.style.left)>0){
      ulbox.style.left='-2400px';
    }
        index++;
        if(index==5){
          index=0;
        }
        indexshow(index);
  },3000);
  ulbox.onmouseover=function(){
    clearInterval(timer);
  }
  ulbox.onmouseout=function(){
    timer=setInterval(function(){
     var left=ulbox.style.left;
    ulbox.style.left=parseInt(left)+600+'px';
    if(parseInt(ulbox.style.left)>0){
      ulbox.style.left='-2400px';
    }
        index++;
        if(index==5){
          index=0;
        }
        indexshow(index);
  },3000);
  }
}
function start (ulbox,leftbtn,rightbtn) {
	leftbtn.onclick=function () {
       onleft(ulbox);
	}
	rightbtn.onclick=function () {
       onright(ulbox);
	}
}

function onleft(obj){
   leftshow(obj,-600);   //轮播图向左
}
function onright(obj){
	rightshow(obj,600);  //轮播图向右
}
//轮播图向左
var index=0;
function leftshow(obj,num) {
    var left=obj.style.left;
    obj.style.left=parseInt(left)+num+'px';
    if(parseInt(obj.style.left)<-2400){
    	obj.style.left=0;
    }
    if(index==0){
      index=5;
    }
    index--;
    indexshow(index);
}
//轮播图向右
function rightshow(obj,num) {
    var left=obj.style.left;
    obj.style.left=parseInt(left)+num+'px';
    if(parseInt(obj.style.left)>0){
    	obj.style.left='-2400px';
    }
        index++;
        if(index==5){
          index=0;
        }
        console.log(index);
    indexshow(index);
}

function indexshow(index){
  var spanbox=document.getElementById('index');
  var spans=spanbox.getElementsByTagName('span');
  for(var i=0;i<spans.length;i++){
    if(i==index){
      spans[i].className='spanclass';
    }
    else{
      spans[i].className='';
    }
  } 
}
