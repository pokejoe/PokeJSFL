(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// timeline functions:
	this.frame_0 = function() {
		
		//------------------------------------------------------------------------------
		//						背景切り替えのメソッド
		//------------------------------------------------------------------------------
		
		this.bg_manager = {
			
			tgMC	: rootBG.mc_bg,
			
			//背景を中央に
			disp_center : function()
			{
				var tgMC = rootBG.bg_manager.tgMC;
				tgMC.gotoAndStop("center");
			},
			
			//背景を左に（＝ユーザーにフォーカス当てる）
			disp_left : function()
			{
				var tgMC = rootBG.bg_manager.tgMC;
				tgMC.gotoAndPlay("left");
			},
			
			//左にいった背景を中央に戻す
			disp_leftBack : function()
			{
				var tgMC = rootBG.bg_manager.tgMC;
				tgMC.gotoAndPlay("left_back");
			}
		};
		
		
	}
	this.frame_1 = function() {
		
		this.stop();
		
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(0).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// eff_fade
	this.instance = new lib.mc_effFade();
	this.instance.setTransform(160,115,1,1,0,0,0,160,115);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(2));

	// bg
	this.mc_bg = new lib.mc_bg2();
	this.mc_bg.setTransform(160,120,1,1,0,0,0,160,120);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_bg}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-559.9,0,1440,240);


// symbols:
(lib.mc_effFade = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{FI_black:1,FO_black:9,FI_white:18,FO_white:26},true);

	// timeline functions:
	this.frame_0 = function() {
		
		this.stop();
		
	}
	this.frame_5 = function() {
		
		this.stop();
		
	}
	this.frame_14 = function() {
		
		this.stop();
		
	}
	this.frame_22 = function() {
		
		this.stop();
		
	}
	this.frame_31 = function() {
		
		this.stop();
		
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(0).call(this.frame_0).wait(5).call(this.frame_5).wait(9).call(this.frame_14).wait(8).call(this.frame_22).wait(9).call(this.frame_31).wait(4));

	// white
	this.instance = new lib.トゥイーン1("synched",0);
	this.instance.setTransform(160,115);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18).to({_off:false},0).to({alpha:1},4).wait(4).to({alpha:0},4).to({_off:true},1).wait(4));

	// black
	this.instance_1 = new lib.rect_black("synched",0);
	this.instance_1.setTransform(160,115);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).to({alpha:1},4).wait(4).to({alpha:0},4).to({_off:true},1).wait(21));

}).prototype = p = new cjs.MovieClip();


(lib.トゥイーン1 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ffffff").p("A4/x9MAAAAj8MAyAAAAMAAAgj8MgyAAAA").f();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-159.9,-114.9,320,230);


(lib.rect_black = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").p("AZBR/MAAAgj8MgyAAAAMAAAAj8MAyAAAA").f();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-159.9,-114.9,320,230);


(lib.mc_bg2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{center:0,left:1,left_back:8,rigth:16,rigth_back:23},true);

	// timeline functions:
	this.frame_0 = function() {
		
		this.stop();
		
	}
	this.frame_7 = function() {
		
		this.stop();
		
	}
	this.frame_13 = function() {
		
		this.stop();
		
	}
	this.frame_22 = function() {
		
		this.stop();
		
	}
	this.frame_28 = function() {
		
		this.stop();
		
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(0).call(this.frame_0).wait(7).call(this.frame_7).wait(6).call(this.frame_13).wait(9).call(this.frame_22).wait(6).call(this.frame_28).wait(4));

	// レイヤー 3
	this.instance = new lib.gra_bg_s("synched",0);
	this.instance.setTransform(160.1,120,1,1,0,0,0,320,120);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:200.1},6,cjs.Ease.get(1)).wait(1).to({x:160.1},5,cjs.Ease.get(1)).wait(3).to({x:120.1},6,cjs.Ease.get(1)).wait(1).to({x:160.1},5).wait(1));

	// レイヤー 2
	this.instance_1 = new lib.gra_bg_m("synched",0);
	this.instance_1.setTransform(360.1,120,1,1,0,0,0,480,120);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({x:480},5,cjs.Ease.get(1)).wait(2).to({x:360.1},4,cjs.Ease.get(1)).wait(4).to({x:240.1},5,cjs.Ease.get(1)).wait(2).to({x:360.1},4).wait(1));

	// レイヤー 1
	this.instance_2 = new lib.gra_bg_l("synched",0);
	this.instance_2.setTransform(560.1,120,1,1,0,0,0,640,120);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({x:800},4,cjs.Ease.get(1)).wait(3).to({x:560.1},3,cjs.Ease.get(1)).wait(5).to({x:280.1},4,cjs.Ease.get(1)).wait(3).to({x:560.1},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-559.9,0,1440,240);


(lib.gra_bg_s = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.test_bg_s();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,240);


(lib.test_bg_s = function() {
	this.initialize(images.test_bg_s);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,240);


(lib.gra_bg_m = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.test_bg_m();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,560,240);


(lib.test_bg_m = function() {
	this.initialize(images.test_bg_m);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,560,240);


(lib.gra_bg_l = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.test_bg_l();
	this.instance.setTransform(480,0);

	this.instance_1 = new lib.test_bg_l();
	this.instance_1.setTransform(-479.9,0);

	this.instance_2 = new lib.test_bg_l();

	this.addChild(this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-479.9,0,1440,240);


(lib.test_bg_l = function() {
	this.initialize(images.test_bg_l);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,480,240);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
