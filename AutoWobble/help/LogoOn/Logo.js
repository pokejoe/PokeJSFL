(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.Logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// OKButton_g
	this.instance = new lib.OKButton_g("synched",0);
	this.instance.setTransform(-81.9,417,1.013,0.999,0,24.8,0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(34).to({startPosition:0,_off:false},0).to({scaleX:1.03,scaleY:0.99,skewX:41.1,x:182},4,cjs.Ease.get(0.34)).to({scaleX:1.04,scaleY:1.03,skewX:49.4,x:189},8,cjs.Ease.get(0.55)).to({scaleX:1.02,scaleY:0.95,skewX:-26.3,x:160},3,cjs.Ease.get(-0.69)).to({scaleX:1,scaleY:1,skewX:1},3,cjs.Ease.get(0.35)).to({scaleX:1,scaleY:1,skewX:-0.1},3,cjs.Ease.get(-0.34)).to({scaleY:1,skewX:0},3,cjs.Ease.get(0.35)).to({startPosition:0},3,cjs.Ease.get(-0.34)).wait(25).to({startPosition:0},0).to({scaleX:1.41,scaleY:0.73,rotation:1.4,x:168,y:419,alpha:0},6,cjs.Ease.get(0.36)).to({_off:true},1).wait(2));

	// Logo_g
	this.instance_1 = new lib.Logo_g("synched",0);
	this.instance_1.setTransform(160,213,2,2,2.2);
	this.instance_1.alpha = 0.23;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(13).to({startPosition:0,_off:false},0).to({scaleX:0.6,scaleY:0.6,rotation:-0.8,y:237.3,alpha:1},3,cjs.Ease.get(-0.55)).to({scaleX:1.17,scaleY:1.17,rotation:0.3,y:241.2},2,cjs.Ease.get(0.5)).to({scaleX:0.92,scaleY:0.92,rotation:0,y:239.5},2,cjs.Ease.get(-0.49)).to({scaleX:1.03,scaleY:1.03,y:240.2},2,cjs.Ease.get(0.5)).to({scaleX:1,scaleY:1,y:240},2,cjs.Ease.get(-0.49)).to({scaleX:1,scaleY:1},2,cjs.Ease.get(0.5)).wait(60).to({startPosition:0},0).to({scaleX:0.89,scaleY:1.77,rotation:-8.3,x:149,y:224,alpha:0},6,cjs.Ease.get(0.36)).to({_off:true},1).wait(2));

	// LogoBG.jpg
	this.instance_2 = new lib.LogoBG();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).wait(95));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,320,480);


// symbols:
(lib.Logo_1 = function() {
	this.initialize(img.Logo_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,316,184);


(lib.LogoBG = function() {
	this.initialize(img.LogoBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,480);


(lib.OKButton = function() {
	this.initialize(img.OKButton);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,160,60);


(lib.OKButton_g = function() {
	this.initialize();

	// OKButton_g
	this.instance = new lib.OKButton();
	this.instance.setTransform(-79.9,-29.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-79.9,-29.9,160,60);


(lib.Logo_g = function() {
	this.initialize();

	// Logo_g
	this.instance = new lib.Logo_1();
	this.instance.setTransform(-157.9,-91.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-157.9,-91.9,316,184);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;