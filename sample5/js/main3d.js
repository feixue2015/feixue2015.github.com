;(function($){
	var Carousel=function(poster){
		var self=this;
		//保存单个旋转木马对象
		this.poster=poster;
		// console.log(postor.attr('data-setting'));
		this.posterItemMain=poster.find('ul.poster-list');
		this.nextBtn=poster.find('div.poster-next-btn');
		this.prevBtn=poster.find('div.poster-prev-btn');
	
		//保存第一帧
		//保存幻灯片张数
		this.posterItems=poster.find('li.poster-item');
		this.posterFirstItem=this.posterItems.first();
		//保存最后一帧
		this.posterLastItem=this.posterItems.last();
		//console.log(this.posterLastItem);
		//默认配置参数
		this.setting={
			'width':1000,  //幻灯片的宽度
	  		'height':406,  //幻灯片的高度
	  		'postetWidth':650,  //幻灯片第一帧宽度
	  		'posterHeight':270,   //幻灯片第一帧高度
	  		'scale':0.8,     // 记录显示比例关系
	  		'speed':500,
	  		'verticalAlign':'middle'  //幻灯片对齐方式
		};


	$.extend(this.setting,this.getSetting());
		console.log(this.setting);
		//设置配置参数值
		this.setSettingValue();
		this.setPosterPos();
		//左旋幻灯片
		this.nextBtn.click(function(){
			self.rotate('right');
		});
		//右旋幻灯片  
		this.prevBtn.click(function(){
			self.rotate('left');
		}); 
	};
    Carousel.prototype={
    	//设置剩余广告位置
    	setPosterPos:function(){
    		var self=this;
    		var sliceItems=this.posterItems.slice(1);
    		var sliceSize=sliceItems.size()/2,
    		rightSlice=sliceItems.slice(0,sliceSize),
    		level=Math.floor(this.posterItems.size()/2);
    		
    		var rw=this.setting.postetWidth;
    		var rh=this.setting.posterHeight;
    		leftSlice=sliceItems.slice(sliceSize);
    			// alert(rh);
    		//幻灯片之间的间隙
    		var gap=((this.setting.width-this.setting.postetWidth)/2)/level;
    		//未参与变幻时第一帧left值
    		var firstLeft=(this.setting.width-this.setting.postetWidth)/2;
    		//固定变化left值
    		var fixOffsetLeft=firstLeft+rw;

    		//设置右边帧的位置关系和宽度高度
    		rightSlice.each(function(i){
    			level--;
    			rw=rw*self.setting.scale;
    			rh=rh*self.setting.scale;
    		var j=i;
    		
    			$(this).css({
    				zIndex:level,
    				width:rw,
    				height:rh,
    				opacity:1/(++i),
    				left:fixOffsetLeft+(++j)*gap-rw,
    				top:self.setVertucalAlign(rh)
    			});
    		});
    		//设置左边帧的位置关系和宽度高度
    		var lw=rightSlice.last().width();
    		var lh=rightSlice.last().height();
    		var level2=Math.floor(this.posterItems.size()/2);
    		leftSlice.each(function(i){

    			$(this).css({
    				zIndex:level++,
    				width:lw,
    				height:lh,
    				opacity:1/level2,
    				left:i*gap,
    				top:self.setVertucalAlign(lh)
    			});
    			lw=lw/self.setting.scale;
    			lh=lh/self.setting.scale;
    			level2--;
    		});
    	},
    	//设置垂直排列
    	setVertucalAlign:function(height){
    		var verticalType=this.setting.verticalAlign;
    		var top=0;
    		if(verticalType==='middle'){
    			top=(this.setting.height-height)/2;
    		}else if (verticalType==='bottom'){
    			top=this.setting.height-height;
    		}else if (verticalType==='top'){
    			top=0;
    		};
    		
    		return top;
    	},
    	//设置参数值控制基本的宽度高度
    	setSettingValue:function(){
    		this.poster.css({
    			width:this.setting.width,
    			height:this.setting.height
    		});
    		this.posterItemMain.css({
    			width:this.setting.width,
    			height:this.setting.height
    		});
    		var w=(this.setting.width-this.setting.postetWidth)/2;
    		this.nextBtn.css({
    			width:w,
    			height:this.setting.height,
    			zIndex:Math.ceil(this.posterItems.size()/2)
    		});
    		this.prevBtn.css({
    			width:w,
    			height:this.setting.height,
    			zIndex:Math.ceil(this.posterItems.size()/2)
    		});
    		this.posterFirstItem.css({
    			width:this.setting.postetWidth,
    			height:this.setting.posterHeight,
    			left:w,
    			zIndex:Math.floor(this.posterItems.size()/2)
    		});

    	},
    	//获取人工配置参数
    	getSetting:function(){
    		var setting=this.poster.attr('data-setting');
    		if(setting&&setting!=""){
    			 return  $.parseJSON(setting);
    		}else{
    			return {};
    		};
    	},
    	//左右旋幻灯片
    	rotate:function(direction){
    		var _this_=this;
    		var zIndexArr=[];
    		if(direction==='left'){
    			this.posterItems.each(function(){
    				var self=$(this);
    				var prev=self.prev().get(0)?self.prev():_this_.posterLastItem;
    				console.log(prev);
    				var width=prev.width();
    				var height=prev.height();
    				var zIndex=prev.css('zIndex');
    				var opacity=prev.css('opacity');
    				var left=prev.css('left');
    				var top=prev.css('top');
    				zIndexArr.push(zIndex);
    				self.animate({
    					width:width,
    					height:height,
    					// zIndex:zIndex,
    					opacity:opacity,
    					left:left,
    					top:top
    				});
    			});
    			this.posterItems.each(function(i){
    				$(this).css({'zIndex':zIndexArr[i]});
    			});
    		}else if(direction==='right'){
    			this.posterItems.each(function(){
    				var self=$(this);
    				var next=self.next().get(0)?self.next():_this_.posterFirstItem;
    				console.log(next);
    				var width=next.width();
    				var height=next.height();
    				var zIndex=next.css('zIndex');
    				var opacity=next.css('opacity');
    				var left=next.css('left');
    				var top=next.css('top');
    				zIndexArr.push(zIndex);
    				self.animate({
    					width:width,
    					height:height,
    					zIndex:zIndex,
    					opacity:opacity,
    					left:left,
    					top:top
    				});
    			});
    			this.posterItems.each(function(i){
    					$(this).css({'zIndex':zIndexArr[i]});
    			});
    	
    		}   
    	}	
    };
    //初始化页面中传进来的所有集合
    Carousel.init=function(posters){
    	var _this_=this;
    	posters.each(function(){
    		new _this_($(this));
    	});
    };
window['Carousel']=Carousel;  //全局注册 解决闭包无法访问

})(jQuery);