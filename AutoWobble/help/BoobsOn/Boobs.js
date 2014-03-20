(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.Boobs = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// p04_LeftBoob_g
	this.instance = new lib.p04_LeftBoob_g("synched",0);
	this.instance.setTransform(-59.4,709.8,0.627,0.814,-19.6,0,0,-7.9,-26.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({startPosition:0,_off:false},0).to({regY:-26.9,scaleX:1.24,scaleY:0.75,rotation:0,skewX:3.6,skewY:1.4,x:91.4,y:189},4,cjs.Ease.get(-0.3)).to({regX:-7.9,regY:-26.8,scaleX:0.86,scaleY:1.12,skewX:-0.8,skewY:-1.4,x:103.6,y:146.5},3,cjs.Ease.get(-0.34)).to({regY:-26.7,scaleX:1.1,scaleY:0.88,skewX:1.2,skewY:0.8,x:95.9,y:173.4},3,cjs.Ease.get(0.35)).to({regX:-7.8,regY:-26.8,scaleX:0.92,scaleY:1.07,skewX:-0.2,skewY:-0.4,x:101.3,y:154},3,cjs.Ease.get(-0.34)).to({scaleX:1.06,scaleY:0.93,skewX:0.6,skewY:0.4,x:97.4,y:168.3},3,cjs.Ease.get(0.35)).to({regY:-26.7,scaleX:0.96,scaleY:1.03,rotation:0,skewX:0,skewY:0,x:100.4,y:157.7},3,cjs.Ease.get(-0.34)).to({regY:-26.8,scaleX:1.03,scaleY:0.96,rotation:0.3,x:98.2,y:165.3},3,cjs.Ease.get(0.35)).to({regX:-7.7,regY:-26.7,scaleX:0.98,scaleY:1.02,rotation:0,x:99.7,y:160},3,cjs.Ease.get(-0.34)).to({regX:-7.9,scaleX:1.01,scaleY:0.99,x:98.7,y:163.5},3,cjs.Ease.get(0.35)).to({regX:-7.8,scaleX:0.99,scaleY:1.01,x:99.3,y:161.6},3,cjs.Ease.get(-0.34)).to({regY:-26.8,scaleX:1,scaleY:1,x:99.1,y:162.2},3,cjs.Ease.get(0.35)).to({regY:-26.7,scaleX:1,scaleY:1},4,cjs.Ease.get(-0.34)).wait(36));

	// p05_RightBoob_g
	this.instance_1 = new lib.p05_RightBoob_g("synched",0);
	this.instance_1.setTransform(-84.6,711.9,0.627,0.814,-19.6,0,0,12.1,-26.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(6).to({startPosition:0,_off:false},0).to({regX:11.9,scaleX:1.55,scaleY:0.54,rotation:0,skewX:18.2,skewY:2.4,x:49.3,y:198.5},4,cjs.Ease.get(-0.3)).to({regX:12.1,regY:-26.8,scaleX:0.87,scaleY:1.1,skewX:-0.8,skewY:-1.4,x:62.3,y:144.6},2,cjs.Ease.get(-0.34)).to({regX:12,regY:-26.7,scaleX:1.09,scaleY:0.9,skewX:0.9,skewY:0.6,x:58.6,y:160.5},3,cjs.Ease.get(0.35)).to({regY:-26.8,scaleX:0.94,scaleY:1.05,skewX:-0.3,skewY:-0.4,x:61.1,y:149.6},3,cjs.Ease.get(-0.34)).to({regX:11.9,scaleX:1.05,scaleY:0.94,skewX:0.6,skewY:0.5,x:59.2,y:157.4},3,cjs.Ease.get(0.35)).to({regX:12,regY:-26.7,scaleX:0.97,scaleY:1.02,rotation:0,skewX:0,skewY:0,x:60.6,y:151.8},3,cjs.Ease.get(-0.34)).to({regX:11.9,regY:-26.8,scaleX:1.02,scaleY:0.97,rotation:0.3,x:59.6,y:155.8},3,cjs.Ease.get(0.35)).to({regY:-26.7,scaleX:0.99,scaleY:1.01,rotation:0,x:60.3,y:153.2},3,cjs.Ease.get(-0.34)).to({regX:12,scaleX:1.01,scaleY:0.99,x:59.9,y:154.7},3,cjs.Ease.get(0.35)).to({regX:11.9,scaleX:1,scaleY:1,x:60,y:154.1},3,cjs.Ease.get(-0.34)).to({regX:12,scaleX:1,scaleY:1,y:154.2},4,cjs.Ease.get(0.35)).wait(40));

	// charaAni
	this.instance_2 = new lib.charaAni();
	this.instance_2.setTransform(-1.8,756.8,0.627,0.814,-19.6,0,0,248.3,315.4);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(6).to({_off:false},0).to({scaleX:1,scaleY:1,rotation:0,x:160.3,y:240.4},4,cjs.Ease.get(-0.3)).wait(70));

	// レイヤー 1
	this.instance_3 = new lib.BG_g("synched",0);
	this.instance_3.setTransform(160,240,1,1,0,0,0,160,240);
	this.instance_3.alpha = 0.391;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(80));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,320,480);


// symbols:
(lib.BG = function() {
	this.initialize(img.BG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,480);


(lib.p01_BangClosest = function() {
	this.initialize(img.p01_BangClosest);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,121,65);


(lib.p02_BangSpearFront = function() {
	this.initialize(img.p02_BangSpearFront);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,122);


(lib.p03_SplitEnd = function() {
	this.initialize(img.p03_SplitEnd);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,106,103);


(lib.p04_LeftBoob = function() {
	this.initialize(img.p04_LeftBoob);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,73,90);


(lib.p05_RightBoob = function() {
	this.initialize(img.p05_RightBoob);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,62,87);


(lib.p06_ThighDanglyR = function() {
	this.initialize(img.p06_ThighDanglyR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,32,62);


(lib.p07_Loincloth = function() {
	this.initialize(img.p07_Loincloth);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,286,87);


(lib.p08_EyesClosed = function() {
	this.initialize(img.p08_EyesClosed);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,74,37);


(lib.p09_EyesMid = function() {
	this.initialize(img.p09_EyesMid);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,74,36);


(lib.p10_EyesOpen = function() {
	this.initialize(img.p10_EyesOpen);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,65,38);


(lib.p10b_SpearArm = function() {
	this.initialize(img.p10b_SpearArm);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,256);


(lib.p11_FlatChest = function() {
	this.initialize(img.p11_FlatChest);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,169,320);


(lib.p11b_DiagonalHair = function() {
	this.initialize(img.p11b_DiagonalHair);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,157,145);


(lib.p11c_FurthestHair = function() {
	this.initialize(img.p11c_FurthestHair);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,185,105);


(lib.p12_Legs = function() {
	this.initialize(img.p12_Legs);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,289,197);


(lib.p12b_SpearBack = function() {
	this.initialize(img.p12b_SpearBack);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,88,231);


(lib.p13_ForearmR = function() {
	this.initialize(img.p13_ForearmR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,91,130);


(lib.p14_BackPonytail = function() {
	this.initialize(img.p14_BackPonytail);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,141,336);


(lib.p14_BackPonytail_g = function() {
	this.initialize();

	// p14_BackPonytail_g
	this.instance = new lib.p14_BackPonytail();
	this.instance.setTransform(-70.4,-167.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-70.4,-167.9,141,336);


(lib.p13_ForearmR_g = function() {
	this.initialize();

	// p13_ForearmR_g
	this.instance = new lib.p13_ForearmR();
	this.instance.setTransform(-45.4,-64.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-45.4,-64.9,91,130);


(lib.p12b_SpearBack_g = function() {
	this.initialize();

	// p12b_SpearBack_g
	this.instance = new lib.p12b_SpearBack();
	this.instance.setTransform(-43.9,-115.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-43.9,-115.4,88,231);


(lib.p12_Legs_g = function() {
	this.initialize();

	// p12_Legs_g
	this.instance = new lib.p12_Legs();
	this.instance.setTransform(-144.4,-98.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-144.4,-98.4,289,197);


(lib.p11c_FurthestHair_g = function() {
	this.initialize();

	// p11c_FurthestHair_g
	this.instance = new lib.p11c_FurthestHair();
	this.instance.setTransform(-92.4,-52.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-92.4,-52.4,185,105);


(lib.p11b_DiagonalHair_g = function() {
	this.initialize();

	// p11b_DiagonalHair_g
	this.instance = new lib.p11b_DiagonalHair();
	this.instance.setTransform(-78.4,-72.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-78.4,-72.4,157,145);


(lib.p10b_SpearArm_g = function() {
	this.initialize();

	// p10b_SpearArm_g
	this.instance = new lib.p10b_SpearArm();
	this.instance.setTransform(-100.9,-127.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-100.9,-127.9,202,256);


(lib.p07_Loincloth_g = function() {
	this.initialize();

	// p07_Loincloth_g
	this.instance = new lib.p07_Loincloth();
	this.instance.setTransform(-142.9,-43.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-142.9,-43.4,286,87);


(lib.p06_ThighDanglyR_g = function() {
	this.initialize();

	// p06_ThighDanglyR_g
	this.instance = new lib.p06_ThighDanglyR();
	this.instance.setTransform(-15.9,-30.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-15.9,-30.9,32,62);


(lib.p05_RightBoob_g = function() {
	this.initialize();

	// p05_RightBoob_g
	this.instance = new lib.p05_RightBoob();
	this.instance.setTransform(-30.9,-43.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-30.9,-43.4,62,87);


(lib.p04_LeftBoob_g = function() {
	this.initialize();

	// p04_LeftBoob_g
	this.instance = new lib.p04_LeftBoob();
	this.instance.setTransform(-36.4,-44.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36.4,-44.9,73,90);


(lib.p03_SplitEnd_g = function() {
	this.initialize();

	// p03_SplitEnd_g
	this.instance = new lib.p03_SplitEnd();
	this.instance.setTransform(-52.9,-51.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-52.9,-51.4,106,103);


(lib.p02_BangSpearFront_g = function() {
	this.initialize();

	// p02_BangSpearFront_g
	this.instance = new lib.p02_BangSpearFront();
	this.instance.setTransform(-119.9,-60.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-119.9,-60.9,240,122);


(lib.p01_BangClosest_g = function() {
	this.initialize();

	// p01_BangClosest_g
	this.instance = new lib.p01_BangClosest();
	this.instance.setTransform(-60.4,-32.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-60.4,-32.4,121,65);


(lib.BG_g = function() {
	this.initialize();

	// BG_g
	this.instance = new lib.BG();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,320,480);


(lib.charaAni = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// p01_BangClosest_g
	this.instance = new lib.p01_BangClosest_g("synched",0);
	this.instance.setTransform(190.1,97.1,1,1,0,0,0,-50.9,-23.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:-14.5},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:7,x:190.2,y:97.2},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0,x:190.1,y:97.1},3).to({regX:-50.7,scaleX:0.97,scaleY:0.94,rotation:-18.5},2).to({regX:-50.8,scaleX:1,scaleY:1,rotation:0},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0},4).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:-14.5},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:7,x:190.2,y:97.2},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0,x:190.1,y:97.1},3).to({regX:-50.7,scaleX:0.97,scaleY:0.94,rotation:-18.5},2).to({regX:-50.8,scaleX:1,scaleY:1,rotation:0},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0},3).to({startPosition:0},2).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:-14.5},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:7,x:190.2,y:97.2},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0,x:190.1,y:97.1},3).to({regX:-50.7,scaleX:0.97,scaleY:0.94,rotation:-18.5},2).to({regX:-50.8,scaleX:1,scaleY:1,rotation:0},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0},3).wait(1).to({startPosition:0},0).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:-14.5},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:7,x:190.2,y:97.2},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0,x:190.1,y:97.1},3).to({regX:-50.7,scaleX:0.97,scaleY:0.94,rotation:-18.5},2).to({regX:-50.8,scaleX:1,scaleY:1,rotation:0},3).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regY:-23.8,scaleX:1,scaleY:1,rotation:0},3).wait(1).to({startPosition:0},0).to({regY:-23.7,scaleX:1.14,scaleY:0.79,rotation:-6},2).to({regX:-50.7,regY:-23.8,scaleX:1.05,scaleY:0.93,rotation:-11.6,x:190.2,y:97},2).wait(1));

	// p02_BangSpearFront_g
	this.instance_1 = new lib.p02_BangSpearFront_g("synched",0);
	this.instance_1.setTransform(208.1,93.1,1,1,0,0,0,-111.9,-55.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regY:-55.7,scaleX:0.93,rotation:-3.3,x:208},2).to({regX:-111.8,regY:-55.8,scaleX:1,scaleY:1,rotation:0,x:208.1},3).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regX:-111.8,scaleX:1,scaleY:1,rotation:0},2).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regY:-55.7,scaleX:0.93,rotation:-3.3,x:208},2).to({regX:-111.8,regY:-55.8,scaleX:1,scaleY:1,rotation:0,x:208.1},3).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regX:-111.8,scaleX:1.05,scaleY:0.9,rotation:0},2).to({scaleX:1,scaleY:1},1).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regY:-55.7,scaleX:0.93,rotation:-3.3,x:208},2).to({regX:-111.8,regY:-55.8,scaleX:1,scaleY:1,rotation:0,x:208.1},3).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regX:-111.8,scaleX:1,scaleY:1,rotation:0},2).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regY:-55.7,scaleX:0.93,rotation:-3.3,x:208},2).to({regX:-111.8,regY:-55.8,scaleX:1,scaleY:1,rotation:0,x:208.1},3).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regX:-111.9,scaleX:0.97,scaleY:1.09,rotation:1.8},4).to({regX:-111.8,scaleX:1,scaleY:1,rotation:0},2).to({scaleX:1.03,scaleY:0.95,rotation:-2},3).to({regY:-55.9,scaleX:1.01,scaleY:0.98,rotation:-0.9,y:93},1).wait(1));

	// p03_SplitEnd_g
	this.instance_2 = new lib.p03_SplitEnd_g("synched",0);
	this.instance_2.setTransform(395.1,198,1,1,0,0,0,-11.9,44);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.9,scaleY:1.17,rotation:13.5,x:391.1,y:194.1},4,cjs.Ease.get(0.15)).to({regX:-11.7,scaleX:0.95,scaleY:1.12,rotation:16.2,x:383.2,y:214.1},3).to({regX:-11.8,scaleX:1,scaleY:1,rotation:0,x:395.1,y:197},3).to({x:407.1,y:198},2).to({scaleX:1.03,scaleY:1.02,rotation:13.5,x:391,y:194.1},4,cjs.Ease.get(0.15)).to({regX:-11.7,scaleX:0.95,scaleY:1.12,rotation:16.2,x:383.2,y:214.1},3).to({regX:-11.8,scaleX:1,scaleY:1,rotation:0,x:395.1,y:197},2).wait(2).to({y:198},0).to({scaleX:0.9,scaleY:1.17,rotation:13.5,x:391.1,y:194.1},4,cjs.Ease.get(0.15)).to({regX:-11.7,scaleX:0.95,scaleY:1.12,rotation:16.2,x:383.2,y:214.1},3).to({regX:-11.8,scaleX:1,scaleY:1,rotation:0,x:395.1,y:197},3).to({x:407.1,y:198},2).to({scaleX:1.03,scaleY:1.02,rotation:13.5,x:391,y:194.1},4,cjs.Ease.get(0.15)).to({regX:-11.7,scaleX:0.95,scaleY:1.12,rotation:16.2,x:383.2,y:214.1},3).to({regX:-11.8,scaleX:1,scaleY:1,rotation:0,x:395.1,y:197},2).wait(1).to({startPosition:0},0).wait(2).to({y:198},0).to({scaleX:0.9,scaleY:1.17,rotation:13.5,x:391.1,y:194.1},4,cjs.Ease.get(0.15)).to({regX:-11.7,scaleX:0.95,scaleY:1.12,rotation:16.2,x:383.2,y:214.1},3).to({regX:-11.8,scaleX:1,scaleY:1,rotation:0,x:395.1,y:197},3).to({x:407.1,y:198},2).to({scaleX:1.03,scaleY:1.02,rotation:13.5,x:391,y:194.1},4,cjs.Ease.get(0.15)).to({regX:-11.7,scaleX:0.95,scaleY:1.12,rotation:16.2,x:383.2,y:214.1},3).to({regX:-11.8,scaleX:1,scaleY:1,rotation:0,x:395.1,y:197},2).wait(1).to({startPosition:0},0).wait(2).to({y:198},0).to({scaleX:0.9,scaleY:1.17,rotation:13.5,x:391.1,y:194.1},4,cjs.Ease.get(0.15)).to({regX:-11.7,scaleX:0.95,scaleY:1.12,rotation:16.2,x:383.2,y:214.1},3).to({regX:-11.8,scaleX:1,scaleY:1,rotation:0,x:395.1,y:197},3).to({x:407.1,y:198},2).to({scaleX:1.03,scaleY:1.02,rotation:13.5,x:391,y:194.1},4,cjs.Ease.get(0.15)).to({scaleX:1,scaleY:1,rotation:0,x:407.1,y:198},2).wait(1));

	// p06_ThighDanglyR_g
	this.instance_3 = new lib.p06_ThighDanglyR_g("synched",0);
	this.instance_3.setTransform(193.2,397.1,1,1,-24.5,0,0,-13,-23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:-12.8,regY:-23.8,rotation:0,x:193.1},3,cjs.Ease.get(-0.43)).to({regX:-12.9,regY:-23.9,rotation:-13},3,cjs.Ease.get(0.37)).to({rotation:-1.8},3,cjs.Ease.get(-0.31)).to({rotation:-9.4},2,cjs.Ease.get(0.48)).to({regX:-12.8,regY:-23.8,rotation:3.4,y:397.2},2,cjs.Ease.get(-0.26)).to({rotation:0,y:397.1},3,cjs.Ease.get(0.35)).to({regX:-12.9,regY:-23.7,rotation:-24.4,x:193.2},3).to({regX:-12.8,regY:-23.8,rotation:0,x:193.1},3,cjs.Ease.get(-0.43)).to({regX:-12.9,regY:-23.9,rotation:-13},3,cjs.Ease.get(0.37)).to({rotation:-1.8},3,cjs.Ease.get(-0.31)).to({rotation:-9.4},2,cjs.Ease.get(0.48)).to({regX:-12.8,regY:-23.8,rotation:3.4,y:397.2},2,cjs.Ease.get(-0.26)).to({rotation:0,y:397.1},3,cjs.Ease.get(0.35)).to({regX:-12.9,regY:-23.7,rotation:-24.4,x:193.2},3).to({regX:-12.8,regY:-23.8,rotation:0,x:193.1},3,cjs.Ease.get(-0.43)).to({regX:-12.9,regY:-23.9,rotation:-13},3,cjs.Ease.get(0.37)).to({rotation:-1.8},3,cjs.Ease.get(-0.31)).to({rotation:-9.4},2,cjs.Ease.get(0.48)).to({regX:-12.8,regY:-23.8,rotation:3.4,y:397.2},2,cjs.Ease.get(-0.26)).to({rotation:0,y:397.1},3,cjs.Ease.get(0.35)).to({regX:-12.9,regY:-23.7,rotation:-24.4,x:193.2},3).to({regX:-12.8,regY:-23.8,rotation:0,x:193.1},3,cjs.Ease.get(-0.43)).to({regX:-12.9,regY:-23.9,rotation:-13},3,cjs.Ease.get(0.37)).to({rotation:-1.8},3,cjs.Ease.get(-0.31)).to({rotation:-9.4},2,cjs.Ease.get(0.48)).to({regX:-12.8,regY:-23.8,rotation:3.4,y:397.2},2,cjs.Ease.get(-0.26)).to({rotation:0,y:397.1},3,cjs.Ease.get(0.35)).to({regX:-12.9,regY:-23.7,rotation:-24.4,x:193.2},3).to({regX:-12.8,regY:-23.8,rotation:0,x:193.1},3,cjs.Ease.get(-0.43)).to({regX:-12.9,regY:-23.9,rotation:-13},3,cjs.Ease.get(0.37)).to({rotation:-1.8},3,cjs.Ease.get(-0.31)).to({rotation:-9.4},2,cjs.Ease.get(0.48)).to({regY:-23.7,rotation:-24.4,x:193.2},2,cjs.Ease.get(-0.26)).wait(1));

	// p07_Loincloth_g
	this.instance_4 = new lib.p07_Loincloth_g("synched",0);
	this.instance_4.setTransform(221.2,442.1,1,1,0,0,0,-131.8,-3.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleX:0.93,scaleY:1.16,rotation:-10.9,x:221.5,y:442.5},4).to({scaleX:0.98,scaleY:1.13,rotation:-1.3,x:220.5,y:441},5).to({regX:-131.8,scaleX:1.02,scaleY:0.92,rotation:-1,x:223.6,y:444.3},4).to({regX:-131.7,scaleX:0.93,scaleY:1.09,rotation:3.4,x:224,y:443.2},4).to({scaleX:1,scaleY:1,rotation:0,x:221.2,y:442.1},4).to({scaleX:0.93,scaleY:1.16,rotation:-10.9,x:221.5,y:442.5},4).to({scaleX:0.98,scaleY:1.13,rotation:-1.3,x:220.5,y:441},5).to({regX:-131.8,scaleX:1.02,scaleY:0.92,rotation:-1,x:223.6,y:444.3},4).to({regX:-131.7,scaleX:0.93,scaleY:1.09,rotation:3.4,x:224,y:443.2},4).to({scaleX:1,scaleY:1,rotation:0,x:224.2,y:444.1},4).wait(1).to({x:221.2,y:442.1},0).to({scaleX:0.93,scaleY:1.16,rotation:-10.9,x:221.5,y:442.5},4).to({scaleX:0.98,scaleY:1.13,rotation:-1.3,x:220.5,y:441},5).to({regX:-131.8,scaleX:1.02,scaleY:0.92,rotation:-1,x:223.6,y:444.3},4).to({regX:-131.7,scaleX:0.93,scaleY:1.09,rotation:3.4,x:224,y:443.2},4).to({scaleX:1,scaleY:1,rotation:0,x:224.2,y:444.1},4).wait(1).to({x:221.2,y:442.1},0).to({scaleX:0.93,scaleY:1.16,rotation:-10.9,x:221.5,y:442.5},4).to({scaleX:0.98,scaleY:1.13,rotation:-1.3,x:220.5,y:441},5).to({regX:-131.8,scaleX:1.02,scaleY:0.92,rotation:-1,x:223.6,y:444.3},4).to({regX:-131.7,scaleX:0.93,scaleY:1.09,rotation:3.4,x:224,y:443.2},4).to({scaleX:1,scaleY:1,rotation:0,x:224.2,y:444.1},4).wait(1).to({x:221.2,y:442.1},0).to({startPosition:0},2).wait(1));

	// p08_EyesClosed.png
	this.instance_5 = new lib.p08_EyesClosed();
	this.instance_5.setTransform(146,133);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},11).to({state:[]},3).wait(76));

	// p09_EyesMid.png
	this.instance_6 = new lib.p09_EyesMid();
	this.instance_6.setTransform(147,134);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},10).to({state:[]},5).wait(75));

	// p10_EyesOpen.png
	this.instance_7 = new lib.p10_EyesOpen();
	this.instance_7.setTransform(155,131);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).wait(90));

	// p10b_SpearArm_g
	this.instance_8 = new lib.p10b_SpearArm_g("synched",0);
	this.instance_8.setTransform(228.1,205.9,1.111,1.111,1.4,0,0,-81.8,14.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(6).to({startPosition:0},0).to({rotation:0.3,x:221.9,y:203.6},7,cjs.Ease.get(-0.2)).to({rotation:0,x:220.1,y:202.9},8).wait(43).to({startPosition:0},0).to({rotation:1.4,x:228.1,y:205.9},9,cjs.Ease.get(-0.48)).wait(17));

	// p11_FlatChest.png
	this.instance_9 = new lib.p11_FlatChest();
	this.instance_9.setTransform(112,67);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).wait(90));

	// p11b_DiagonalHair_g
	this.instance_10 = new lib.p11b_DiagonalHair_g("synched",0);
	this.instance_10.setTransform(234.2,238.2,1.25,1.25,0,0,0,-65.9,-60.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({scaleX:1.17,scaleY:1.39,rotation:1.7},3).to({scaleX:1.29,scaleY:1.1,rotation:-0.8,y:238.1},3).to({scaleX:1.25,scaleY:1.25,rotation:0,y:238.2},3).to({regY:-60.9,scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.1},3).to({regY:-60.8,scaleX:1.29,scaleY:1.1,rotation:-2},3).to({scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.2},3).to({scaleX:1.25,scaleY:1.25,rotation:0},3).to({scaleX:1.17,scaleY:1.39,rotation:1.7},3).to({scaleX:1.29,scaleY:1.1,rotation:-0.8,y:238.1},3).to({scaleX:1.25,scaleY:1.25,rotation:0,y:238.2},3).to({regY:-60.9,scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.1},3).to({regY:-60.8,scaleX:1.29,scaleY:1.1,rotation:-2},3).to({scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.2},3).to({scaleX:1.25,scaleY:1.25,rotation:0},3).to({scaleX:1.17,scaleY:1.39,rotation:1.7},3).to({scaleX:1.29,scaleY:1.1,rotation:-0.8,y:238.1},3).to({scaleX:1.25,scaleY:1.25,rotation:0,y:238.2},3).to({regY:-60.9,scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.1},3).to({regY:-60.8,scaleX:1.29,scaleY:1.1,rotation:-2},3).to({scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.2},3).to({scaleX:1.25,scaleY:1.25,rotation:0},3).to({scaleX:1.17,scaleY:1.39,rotation:1.7},3).to({scaleX:1.29,scaleY:1.1,rotation:-0.8,y:238.1},3).to({scaleX:1.25,scaleY:1.25,rotation:0,y:238.2},3).to({regY:-60.9,scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.1},3).to({regY:-60.8,scaleX:1.29,scaleY:1.1,rotation:-2},3).to({scaleX:1.17,scaleY:1.39,rotation:1.7,y:238.2},3).to({scaleX:1.25,scaleY:1.25,rotation:0},3).wait(1).to({startPosition:0},0).to({scaleX:1.17,scaleY:1.39,rotation:1.7},3).to({scaleX:1.21,scaleY:1.29,rotation:0.8,x:234.1},1).wait(1));

	// p11c_FurthestHair_g
	this.instance_11 = new lib.p11c_FurthestHair_g("synched",0);
	this.instance_11.setTransform(212.1,281.1,1.429,1.429,0,0,0,-86,-47.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},3).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},2).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},3).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},2).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},3).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},2).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},3).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).to({scaleX:1.34,scaleY:1.34,rotation:-1.5},4).to({scaleX:1.43,scaleY:1.43,rotation:0,x:212.1},2).wait(1).to({startPosition:0},0).to({scaleX:1.5,scaleY:1.25,rotation:1.7,x:212.2},4).wait(1));

	// p12_Legs_g
	this.instance_12 = new lib.p12_Legs_g("synched",0);
	this.instance_12.setTransform(239,443,1.429,1.429);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12}]}).wait(90));

	// p12b_SpearBack_g
	this.instance_13 = new lib.p12b_SpearBack_g("synched",0);
	this.instance_13.setTransform(386.2,326.4,1,1,0,0,0,-34.9,-111.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(6).to({rotation:1.4,x:388,y:331.4},0).to({rotation:0.3,x:384.3,y:326},7,cjs.Ease.get(-0.2)).to({rotation:0,x:383.2,y:324.4},8).wait(43).to({startPosition:0},0).to({x:386.2,y:326.4},9,cjs.Ease.get(-0.48)).wait(17));

	// p13_ForearmR_g
	this.instance_14 = new lib.p13_ForearmR_g("synched",0);
	this.instance_14.setTransform(131,277.2,1,1,-8.4,0,0,33,-48.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({regX:33.1,regY:-48.8,rotation:-14.1,x:131.1,y:277.1},3,cjs.Ease.get(0.17)).to({regX:33,rotation:0,x:131},7,cjs.Ease.get(0.33)).to({regX:32.9,regY:-48.7,rotation:1.8,x:131.1,y:277.2},11,cjs.Ease.get(-0.32)).wait(33).to({startPosition:0},0).to({regX:33,rotation:-8.3,x:131},14).wait(22));

	// p14_BackPonytail_g
	this.instance_15 = new lib.p14_BackPonytail_g("synched",0);
	this.instance_15.setTransform(131,113.1,1,1,0,0,0,60,-137.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({regX:60.1,scaleX:0.99,scaleY:1.02,rotation:-0.6,x:131.4,y:113.5},8,cjs.Ease.get(0.37)).to({regX:60,scaleX:1.04,scaleY:0.97,rotation:0.8,x:133.3,y:114.3},6,cjs.Ease.get(-0.35)).to({scaleX:1,scaleY:1,rotation:0,x:131,y:113.1},7,cjs.Ease.get(-0.38)).to({regX:60.1,scaleX:0.99,scaleY:1.02,rotation:-0.6,x:131.4,y:113.5},8,cjs.Ease.get(0.37)).to({regX:60,scaleX:1.04,scaleY:0.97,rotation:0.8,x:133.3,y:114.3},6,cjs.Ease.get(-0.35)).to({scaleX:1,scaleY:1,rotation:0,x:131,y:113.1},7,cjs.Ease.get(-0.38)).to({regX:60.1,scaleX:0.99,scaleY:1.02,rotation:-0.6,x:131.4,y:113.5},8,cjs.Ease.get(0.37)).to({regX:60,scaleX:1.04,scaleY:0.97,rotation:0.8,x:133.3,y:114.3},6,cjs.Ease.get(-0.35)).to({scaleX:1,scaleY:1,rotation:0,x:131,y:113.1},7,cjs.Ease.get(-0.38)).to({regX:60.1,scaleX:0.99,scaleY:1.02,rotation:-0.6,x:131.4,y:113.5},8,cjs.Ease.get(0.37)).to({regX:60,scaleX:1.04,scaleY:0.97,rotation:0.8,x:133.3,y:114.3},6,cjs.Ease.get(-0.35)).to({scaleX:1,scaleY:1,rotation:0,x:131,y:113.1},7,cjs.Ease.get(-0.38)).to({startPosition:0},5,cjs.Ease.get(0.37)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.5,47.2,495.5,536.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;