var objStars = function() {
	this.x;
	this.y;
	this.picnum;
};
objStars.prototype.init = function() {
	this.x = Math.random() * 800 + 100;
	this.y = Math.random() * 500 + 50;
	this.picnum = Math.floor(Math.random() * 7);
};
objStars.prototype.updata = function() {
	this.picnum += 1;
	if (this.picnum >= 7) {
		this.picnum = 0;
	}
};
objStars.prototype.draw = function() {
	//drawImage(img ,x,y,xs,ys,xc,yc,xw,yh)
	context.drawImage(star, this.picnum * 7, 0, 7, 7, this.x, this.y, 7, 7);
};

function drawStar() {
	for (var i = 0; i < num; i++) {
		stars[i].updata();
		stars[i].draw();
	}
}