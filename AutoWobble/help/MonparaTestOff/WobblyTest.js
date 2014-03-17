(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.WobblyTest = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// txtKaede01
	this.instance = new lib.txtKaede01("synched",0);
	this.instance.setTransform(-25.9,182,0.219,0.115,36.2,0,0,-49,-61.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50).to({startPosition:0,_off:false},0).to({regX:-48.8,regY:-60.8,scaleX:1,scaleY:1,rotation:0,x:112.1,y:212.2,alpha:1},3).wait(41).to({startPosition:0},0).to({scaleX:1.31,scaleY:1.31,rotation:12,y:174.2,alpha:0},9,cjs.Ease.get(0.48)).to({_off:true},1).wait(66));

	// txtArisa1
	this.instance_1 = new lib.txtArisa1("synched",0);
	this.instance_1.setTransform(281,92.8,0.061,0.257,-50.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(20).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,rotation:0,x:162,y:409,alpha:1},4,cjs.Ease.get(0.83)).wait(26).to({startPosition:0},0).to({scaleX:1.86,scaleY:1.27,rotation:-17.5,x:178.1,y:453.1,alpha:0},7,cjs.Ease.get(0.71)).to({_off:true},1).wait(112));

	// KaedeAngry
	this.instance_2 = new lib.KaedeAngry();
	this.instance_2.setTransform(-317.9,522.6,0.963,0.963,0,42.2,-137.7,13,216);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49).to({_off:false},0).to({scaleX:1,scaleY:1,skewX:20.5,skewY:-159.3,x:-43.7,y:443.6},3,cjs.Ease.get(-0.29)).wait(112).to({alpha:0},5).wait(1));

	// ArisaHappy
	this.instance_3 = new lib.ArisaHappy();
	this.instance_3.setTransform(275.8,468,0.9,0.9,0,0,0,16.4,241.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({scaleX:0.84,scaleY:0.93},11,cjs.Ease.get(0.4)).wait(6).to({scaleX:0.9,scaleY:0.9},3).wait(75).to({scaleX:0.96,scaleY:0.88,rotation:-0.2},3,cjs.Ease.get(-0.15)).to({regX:16.3,scaleX:0.86,scaleY:0.94,rotation:0,x:275.5,y:468.3},3,cjs.Ease.get(0.11)).to({regX:16.4,scaleX:0.9,scaleY:0.9,x:275.8,y:468},3,cjs.Ease.get(0.66)).wait(56).to({alpha:0},5).wait(1));

	// FineCity_g
	this.instance_4 = new lib.FineCity_g("synched",0);
	this.instance_4.setTransform(160,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(164).to({startPosition:0},0).to({alpha:0},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-158.9,-14.9,638,510);


// symbols:
(lib.ArisaBase = function() {
	this.initialize(img.ArisaBase);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,297,491);


(lib.ArisaEyesHappyClosed = function() {
	this.initialize(img.ArisaEyesHappyClosed);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,297,491);


(lib.ArisaMouthSmileOpen = function() {
	this.initialize(img.ArisaMouthSmileOpen);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,297,491);


(lib.bouncytxt = function() {
	this.initialize(img.bouncytxt);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,199,24);


(lib.dame = function() {
	this.initialize(img.dame);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,170,46);


(lib.FineCity = function() {
	this.initialize(img.FineCity);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,638,510);


(lib.Kaede = function() {
	this.initialize(img.Kaede);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,491);


(lib.KaedeAngryEyeL = function() {
	this.initialize(img.KaedeAngryEyeL);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,491);


(lib.KaedeAngryEyeR = function() {
	this.initialize(img.KaedeAngryEyeR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,491);


(lib.KaedeAngryMouth = function() {
	this.initialize(img.KaedeAngryMouth);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,491);


(lib.KaedeBlinkL = function() {
	this.initialize(img.KaedeBlinkL);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,491);


(lib.KaedeBlinkR = function() {
	this.initialize(img.KaedeBlinkR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,491);


(lib.txtKaede01 = function() {
	this.initialize();

	// bouncytxt.png
	this.instance = new lib.dame();
	this.instance.setTransform(-84.9,-5.9);

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF99CC").ss(5,1,1).p("AVzk+I3bAAQg4i1i1hjQhEglg9gKQg6gLgQASQBkBxgPBzQgFAkgQAgQgNAYgEAAIuBAAQhkAAAABkIAAMAQAABkBkAAMArlAAAQBkAAAAhkIAAsAQAAhkhkAAg");
	this.shape.setTransform(0,0.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.969)").s().p("A1yKKQhjAAAAhkIAAsAQAAhkBjAAIOCAAQADAAANgYQAQggAFgkQAPhzhkhxQAQgSA6ALQA9AKBEAlQC1BjA4C1IXbAAQBjAAAABkIAAMAQAABkhjAAg");
	this.shape_1.setTransform(0,0.4);

	this.addChild(this.shape_1,this.shape,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-149.4,-64.6,299,130.2);


(lib.txtArisa1 = function() {
	this.initialize();

	// bouncytxt.png
	this.instance = new lib.bouncytxt();
	this.instance.setTransform(-98.9,5);

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3A4A6B").ss(5,1,1).p("AIhp+QhkBxAPBzQAFAkAQAgQANAYAEAAIOBAAQBkAAAABkIAAMAQAABkhkAAMgrlAAAQhkAAAAhkIAAsAQAAhkBkAAIXbAAQA4i1C1hjQBEglA9gKQA6gLAQASg");
	this.shape.setTransform(0,0.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.969)").s().p("A1yKKQhjAAAAhkIAAsAQAAhkBjAAIXbAAQA4i1C1hjQBEglA9gKQA6gLAQASQhkBxAPBzQAFAkAQAgQANAYADAAIOCAAQBjAAAABkIAAMAQAABkhjAAg");
	this.shape_1.setTransform(0,0.4);

	this.addChild(this.shape_1,this.shape,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-149.4,-64.6,299,130.2);


(lib.FineCity_g = function() {
	this.initialize();

	// FineCity_g
	this.instance = new lib.FineCity();
	this.instance.setTransform(-318.9,-254.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-318.9,-254.9,638,510);


(lib.KaedeAngry = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// KaedeBlinkR.png
	this.instance = new lib.KaedeBlinkR();
	this.instance.setTransform(-159.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},29).to({state:[]},2).wait(9));

	// KaedeBlinkL.png
	this.instance_1 = new lib.KaedeBlinkL();
	this.instance_1.setTransform(-159.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},29).to({state:[]},2).wait(9));

	// KaedeAngryMouthpng.png
	this.instance_2 = new lib.KaedeAngryMouth();
	this.instance_2.setTransform(-159.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).wait(40));

	// KaedeAngryEyeR.png
	this.instance_3 = new lib.KaedeAngryEyeR();
	this.instance_3.setTransform(-159.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(40));

	// KaedeAngryEyeL.png
	this.instance_4 = new lib.KaedeAngryEyeL();
	this.instance_4.setTransform(-159.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).wait(40));

	// Kaede.png
	this.instance_5 = new lib.Kaede();
	this.instance_5.setTransform(-159.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).wait(40));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.9,-244.9,320,491);


(lib.ArisaHappy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ArisaMouthSmileOpen.png
	this.instance = new lib.ArisaMouthSmileOpen();
	this.instance.setTransform(-147.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(40));

	// ArisaEyesHappyClosed.png
	this.instance_1 = new lib.ArisaEyesHappyClosed();
	this.instance_1.setTransform(-147.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(40));

	// ArisaBase
	this.instance_2 = new lib.ArisaBase();
	this.instance_2.setTransform(-147.9,-244.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).wait(40));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.9,-244.9,297,491);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;