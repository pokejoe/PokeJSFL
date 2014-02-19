(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.skillStage111 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{init:0,wait:2,aura:4,cutin:19,loop_aura:11});

	// timeline functions:
	this.frame_0 = function() {
		//------------------------------------------------------
		//					初期設定
		//------------------------------------------------------
		//アバター生成
		this.UserAvater = new CreateAvater(
			this.CharacterMC,
			SkillAvaterConfig
		);
		
		//アニメーション名,ループの有無 true:ループ,  エフェクトの有無 true:表示
		//初期ポーズ
		this.UserAvater.setAnimation("wait", true, false);
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_3 = function() {
		//初期ポーズ
		this.UserAvater.setAnimation("wait", true, false);
		
		this.stop();
	}
	this.frame_4 = function() {
		//オーラ演出の終了フラグ
		this.endFlg	= false;
		
		//チャージ
		this.UserAvater.setAnimation("kamae", false, false);
	}
	this.frame_9 = function() {
		//エフェクトの再生
		this.mc_eff_sklSt.gotoAndPlay(0);
	}
	this.frame_10 = function() {
		//間の調整
		this.cnt	= 0;
		this.cMax	= 20;
	}
	this.frame_12 = function() {
		if(this.cnt < this.cMax)
		{
			this.cnt++;
			this.gotoAndPlay("loop_aura");
		}
		else
		{
			this.endFlg	= true;
		}
	}
	this.frame_18 = function() {
		this.endFlg	= true;
		
		this.stop();
	}
	this.frame_25 = function() {
		//振り上げ
		this.UserAvater.setAnimation("furiage", false, false);
	}
	this.frame_55 = function() {
		//溜める
		this.UserAvater.setAnimation("tame", false, false);
	}
	this.frame_65 = function() {
		//斬り
		this.UserAvater.setAnimation("kiri", false, false);
	}
	this.frame_68 = function() {
		//ボスを被弾モーションへ
		rootBoss.bossAnime.damage();
		
		//ボスやや上に飛ばす
		rootBoss.gotoAndPlay("age1");
	}
	this.frame_70 = function() {
		//★ダメージ値を表示
		sop.raidBattle.dmg.dmgON();
	}
	this.frame_75 = function() {
		//斬りから戻す
		this.UserAvater.setAnimation("back", false, false);
	}
	this.frame_78 = function() {
		//待機モーションに戻す
		this.UserAvater.setAnimation("wait", true, false);
	}
	this.frame_80 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(2).call(this.frame_3).wait(1).call(this.frame_4).wait(5).call(this.frame_9).wait(1).call(this.frame_10).wait(2).call(this.frame_12).wait(6).call(this.frame_18).wait(7).call(this.frame_25).wait(30).call(this.frame_55).wait(10).call(this.frame_65).wait(3).call(this.frame_68).wait(2).call(this.frame_70).wait(5).call(this.frame_75).wait(3).call(this.frame_78).wait(2).call(this.frame_80));

	// flash_white
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.298)").s().p("A6jThMAAAgnCMA1GAAAMAAAAnCg");
	this.shape.setTransform(165,120);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.498)").s().p("A6jThMAAAgnCMA1GAAAMAAAAnCg");
	this.shape_1.setTransform(165,120);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},40).to({state:[{t:this.shape_1}]},1).to({state:[]},1).to({state:[{t:this.shape_1}]},14).to({state:[]},1).to({state:[{t:this.shape}]},8).to({state:[]},1).wait(15));

	// eff_aura
	this.mc_eff_sklSt = new lib.mc_eff_skillSt();
	this.mc_eff_sklSt.setTransform(55,215,1.6,1.6);
	this.mc_eff_sklSt._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_eff_sklSt).wait(9).to({_off:false},0).to({_off:true},10).wait(62));

	// eff_hit
	this.instance = new lib.eff_hit();
	this.instance.setTransform(251.5,149,1.25,0.294,38.5);

	this.instance_1 = new lib.eff_hit();
	this.instance_1.setTransform(245.5,170,1.083,0.294,-44.4);

	this.instance_2 = new lib.eff_hit();
	this.instance_2.setTransform(219,179.1,1.015,0.165,-32.6);

	this.instance_3 = new lib.eff_hit();
	this.instance_3.setTransform(214.2,184.5,0.679,0.235,-144.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1,p:{scaleX:1.083,scaleY:0.294,rotation:-44.4,x:245.5,y:170}},{t:this.instance,p:{scaleX:1.25,scaleY:0.294,rotation:38.5,x:251.5,y:149}}]},67).to({state:[{t:this.instance_3,p:{scaleX:0.679,scaleY:0.235,rotation:-144.5,x:214.2,y:184.5}},{t:this.instance_2,p:{scaleX:1.015,scaleY:0.165,rotation:-32.6,x:219,y:179.1}},{t:this.instance_1,p:{scaleX:0.679,scaleY:0.235,rotation:-63,x:267.5,y:115}},{t:this.instance,p:{scaleX:1.015,scaleY:0.165,rotation:48.7,x:273.5,y:119}}]},1).to({state:[{t:this.instance_1,p:{scaleX:1.241,scaleY:0.336,rotation:42,x:244.5,y:143}},{t:this.instance,p:{scaleX:1.574,scaleY:0.355,rotation:155.2,x:211.5,y:168}}]},1).to({state:[{t:this.instance_3,p:{scaleX:0.643,scaleY:0.223,rotation:168.7,x:207.8,y:113.1}},{t:this.instance_2,p:{scaleX:0.962,scaleY:0.156,rotation:-107.5,x:207.3,y:106.3}},{t:this.instance_1,p:{scaleX:0.552,scaleY:0.191,rotation:-63,x:264.4,y:177.6}},{t:this.instance,p:{scaleX:0.826,scaleY:0.134,rotation:13.5,x:269.3,y:180.8}}]},1).to({state:[{t:this.instance_1,p:{scaleX:1.071,scaleY:0.373,rotation:137.2,x:253.9,y:155.5}},{t:this.instance,p:{scaleX:1.259,scaleY:0.321,rotation:-147.2,x:248.3,y:157.5}}]},1).to({state:[]},1).wait(9));

	// eff_slash
	this.instance_4 = new lib.eff_slash();
	this.instance_4.setTransform(84.5,144,0.434,0.738,-13.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.498)").s().p("A6jThMAAAgnCMA1GAAAMAAAAnCg");
	this.shape_2.setTransform(165,120);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("A6jThMAAAgnCMA1GAAAMAAAAnCg");
	this.shape_3.setTransform(165,120);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4,p:{scaleX:0.434,scaleY:0.738,rotation:-13.1,x:84.5,y:144}}]},66).to({state:[{t:this.instance_4,p:{scaleX:0.348,scaleY:1.951,rotation:61.2,x:164.5,y:131}}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.instance_4,p:{scaleX:1.584,scaleY:3.894,rotation:80.9,x:156.5,y:162}}]},1).to({state:[]},1).wait(9));

	// eff_erc
	this.instance_5 = new lib.eff_thunder1();
	this.instance_5.setTransform(80.5,43,1.123,1.123,-148.5);

	this.instance_6 = new lib.eff_thunder1();
	this.instance_6.setTransform(25.5,132,2.346,2.346,35.5);

	this.instance_7 = new lib.eff_thunder2();
	this.instance_7.setTransform(58.5,112,1.585,1.835);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6},{t:this.instance_5,p:{scaleX:1.123,scaleY:1.123,rotation:-148.5,x:80.5,y:43,alpha:1}}]},41).to({state:[{t:this.instance_7,p:{scaleX:1.585,scaleY:1.835,rotation:0,x:58.5,y:112,alpha:1}},{t:this.instance_5,p:{scaleX:1.191,scaleY:3.203,rotation:38,x:126.5,y:127,alpha:1}}]},1).to({state:[{t:this.instance_5,p:{scaleX:0.893,scaleY:2.402,rotation:-4.6,x:41.5,y:87,alpha:1}},{t:this.instance_7,p:{scaleX:1.759,scaleY:1.226,rotation:67.2,x:62.5,y:178,alpha:1}}]},1).to({state:[{t:this.instance_5,p:{scaleX:1.727,scaleY:2.897,rotation:-152.7,x:72.5,y:118,alpha:1}}]},1).to({state:[{t:this.instance_7,p:{scaleX:1.45,scaleY:1.835,rotation:180,x:55.5,y:121,alpha:1}}]},1).to({state:[{t:this.instance_7,p:{scaleX:1.585,scaleY:1.835,rotation:0,x:58.5,y:112,alpha:1}},{t:this.instance_5,p:{scaleX:1.191,scaleY:3.203,rotation:38,x:126.5,y:127,alpha:1}}]},1).to({state:[{t:this.instance_5,p:{scaleX:0.893,scaleY:2.402,rotation:-4.6,x:41.5,y:87,alpha:1}},{t:this.instance_7,p:{scaleX:1.759,scaleY:1.226,rotation:67.2,x:62.5,y:178,alpha:1}}]},1).to({state:[{t:this.instance_6},{t:this.instance_5,p:{scaleX:1.123,scaleY:1.123,rotation:-148.5,x:80.5,y:43,alpha:1}}]},1).to({state:[{t:this.instance_7,p:{scaleX:1.45,scaleY:1.835,rotation:180,x:55.5,y:121,alpha:1}}]},1).to({state:[{t:this.instance_5,p:{scaleX:0.893,scaleY:2.402,rotation:-4.6,x:41.5,y:87,alpha:0.5}},{t:this.instance_7,p:{scaleX:1.759,scaleY:1.226,rotation:67.2,x:62.5,y:178,alpha:0.5}}]},1).to({state:[]},1).wait(30));

	// eff_pillar
	this.instance_8 = new lib.eff_auraPillar();
	this.instance_8.setTransform(55,119,0.6,1.05);
	this.instance_8.alpha = 0.5;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(41).to({_off:false},0).wait(1).to({scaleY:1.03,alpha:0.801},0).wait(1).to({scaleX:1.55,scaleY:1.05,alpha:0.898},0).wait(1).to({scaleX:1,scaleY:1,alpha:1},0).wait(1).to({scaleX:1.05,scaleY:1.05,alpha:0.75},0).wait(1).to({scaleX:1,scaleY:1,alpha:0.898},0).wait(1).to({scaleX:1.05,scaleY:1.05,alpha:0.699},0).wait(1).to({scaleX:1,scaleY:1,alpha:1},0).wait(1).to({scaleX:1.05,scaleY:1.05,alpha:0.5},0).to({_off:true},1).wait(31));

	// eff_ball
	this.instance_9 = new lib.eff_ball();
	this.instance_9.setTransform(55,176,1.2,1.2);
	this.instance_9.alpha = 0.5;

	this.instance_10 = new lib.eff_ball();
	this.instance_10.setTransform(56,178,2.018,2.018,180);
	this.instance_10.alpha = 0.398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9,p:{scaleX:1.2,scaleY:1.2,y:176,alpha:0.5,rotation:0,x:55}}]},39).to({state:[]},1).to({state:[{t:this.instance_9,p:{scaleX:2.4,scaleY:2.4,y:172,alpha:0.5,rotation:0,x:55}}]},17).to({state:[{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.8,scaleY:0.8,y:172,alpha:1,rotation:0,x:55}}]},1).to({state:[{t:this.instance_9,p:{scaleX:3,scaleY:3,y:172,alpha:0.5,rotation:0,x:55}}]},1).to({state:[{t:this.instance_10},{t:this.instance_9,p:{scaleX:1.2,scaleY:1.2,y:172,alpha:1,rotation:0,x:55}}]},1).to({state:[{t:this.instance_9,p:{scaleX:3.594,scaleY:3.594,y:171,alpha:0.5,rotation:46.2,x:64}}]},1).to({state:[{t:this.instance_10},{t:this.instance_9,p:{scaleX:1.65,scaleY:1.65,y:172,alpha:1,rotation:0,x:55}}]},1).to({state:[]},1).wait(18));

	// CharacterMC
	this.CharacterMC = new lib.CharacterMC();
	this.CharacterMC.setTransform(55,215,0.3,0.3,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.CharacterMC).wait(81));

	// eff_kenBlur
	this.instance_11 = new lib.eff_kenBlur();
	this.instance_11.setTransform(91,188.5,0.998,0.919,95.4,0,0,0,20.9);
	this.instance_11.alpha = 0.648;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(28).to({_off:false},0).wait(1).to({rotation:85.6,x:93,y:179.9},0).wait(1).to({regX:0,rotation:69.4,x:91,y:175.4},0).wait(1).to({regX:0,regY:20.8,rotation:47.7,x:87,y:172.9},0).wait(1).to({rotation:28.2,x:87.6,y:165.4},0).wait(1).to({regY:20.7,rotation:10.3,x:83.2,y:163.3},0).to({_off:true},1).wait(47));

	// eff_kenBlur2
	this.instance_12 = new lib.eff_kenBlur();
	this.instance_12.setTransform(91,188.5,0.998,0.919,95.4,0,0,0,20.9);
	this.instance_12.alpha = 0.648;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(29).to({_off:false},0).wait(1).to({rotation:85.6,x:93,y:179.9},0).wait(1).to({regX:-0.1,rotation:69.4,x:91,y:175.3},0).wait(1).to({regX:0,regY:20.8,rotation:47.7,x:87,y:172.9},0).wait(1).to({rotation:28.2,x:87.6,y:165.4},0).wait(1).to({regY:20.7,rotation:10.3,x:83.2,y:163.3},0).to({_off:true},1).wait(46));

	// black
	this.instance_13 = new lib.gra_black("synched",0);
	this.instance_13.setTransform(-9.9,-9.9,3.5,2.6);
	this.instance_13.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(4).to({alpha:0.102},0).to({alpha:0.602},3).to({startPosition:0},8).to({alpha:0.102},3).to({alpha:0},1).to({_off:true},1).wait(61));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.9,-9.9,350,294);


// symbols:
(lib.skill111_1 = function() {
	this.initialize(img.skill111_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,24,54);


(lib.skill111_2 = function() {
	this.initialize(img.skill111_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,178,177);


(lib.skill111_3 = function() {
	this.initialize(img.skill111_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,52,63);


(lib.skill111_4 = function() {
	this.initialize(img.skill111_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,219,205);


(lib.skill111_5 = function() {
	this.initialize(img.skill111_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


(lib.skill111_6 = function() {
	this.initialize(img.skill111_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,182,230);


(lib.skill111_7 = function() {
	this.initialize(img.skill111_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,74,120);


(lib.line = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,255,255,0.2)","rgba(255,255,217,0.8)"],[0,1],-17.9,-8.2,8.7,4).s().p("AEeuyIh+JKIFTq3MgPAAg9IglACg");
	this.shape.setTransform(0,-105.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.8,-211.2,99.9,211.3);


(lib.gra_eff1 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(255,255,216,0.8)","rgba(255,253,75,0)"],[0.118,0.318,1],0,0,0,0,0,25.2).s().p("AiwCwQhIhJgBhnQABhmBIhKQBKhIBmgBQBnABBJBIQBKBKAABmQAABnhKBJQhJBKhnAAQhmAAhKhKg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-24.9,-24.9,50,50);


(lib.gra_eff_elec2 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,153,0.906)").s().p("AgNgTIiUAtIDKiFIgVCkICNiHIiZC6g");
	this.shape.setTransform(0,-10.7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-16.1,-21.5,32.4,21.6);


(lib.gra_eff_elec1 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF99").s().p("ABXCHIALgEIAigdIgFgOIABAAIhOg9Ig/AbIAQAFIgYACIAVgmIgBAAIgfgEIgsACIgWikIhKA/IBLhUIAtBCIgRATIAEBPIBUABIBKAGIArACIATAVIAGA6IgPAKIgIAVIAMAVIAXAGIgmATg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.3,-16.5,34.8,33.2);


(lib.gra_black = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AnzHzIAAvmIPmAAIAAPmg");
	this.shape.setTransform(50,50);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,100,100);


(lib.eff_anime_skillStAura = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,253,98,0)","rgba(255,255,229,0.4)"],[0.035,1],0,-33.7,0,2.7).s().p("AjGFYIiXq6IK7AAIiXK6QhoALhiAAQhkAAhfgLg");
	this.shape.setTransform(0,0.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-34.9,-34.9,70,71.1);


(lib.CharacterMC = function() {
	this.initialize();

	// Maker
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(5,1,1).p("AAAnzIAAHzIH0AAAAAH0IAAn0InzAA");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.9,-49.9,100,100);


(lib.eff_thunder2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill111_7();
	this.instance.setTransform(-36.9,-59.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36.9,-59.9,74,120);


(lib.eff_thunder1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill111_3();
	this.instance.setTransform(-25.9,-31.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-25.9,-31.4,52,63);


(lib.eff_slash = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill111_2();
	this.instance.setTransform(-88.9,-88.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-88.9,-88.4,178,177);


(lib.eff_kenBlur = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill111_1();
	this.instance.setTransform(-11.9,-26.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-11.9,-26.9,24,54);


(lib.eff_hit = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill111_4();
	this.instance.setTransform(-109.4,-102.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-109.4,-102.4,219,205);


(lib.eff_ball = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill111_5();
	this.instance.setTransform(-59.9,-59.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-59.9,-59.9,120,120);


(lib.eff_auraPillar = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill111_6();
	this.instance.setTransform(-90.9,-114.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-90.9,-114.9,182,230);


(lib.mc_eff_skillSt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_19 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(19).call(this.frame_19));

	// レイヤー 2
	this.instance = new lib.gra_eff_elec2("synched",0);
	this.instance.setTransform(-14.7,-29.6,0.599,0.2,0,-126.5,-124,0,-11.1);

	this.instance_1 = new lib.gra_eff_elec2("synched",0);
	this.instance_1.setTransform(19.8,-10.2,0.999,0.3,147.4,0,0,0,-10.9);

	this.instance_2 = new lib.gra_eff_elec1("synched",0);
	this.instance_2.setTransform(-9.9,-14.9,0.575,0.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1,p:{regX:0,regY:-10.9,rotation:147.4,x:19.8,y:-10.2}},{t:this.instance,p:{regY:-11.1,skewX:-126.5,skewY:-124,x:-14.7,y:-29.6,scaleX:0.599,regX:0}}]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:-9.9,y:-14.9}},{t:this.instance_1,p:{regX:-0.1,regY:-11,rotation:-59,x:17.1,y:-25.5}},{t:this.instance,p:{regY:-11.2,skewX:-94.3,skewY:-91.8,x:-10.2,y:-49.8,scaleX:0.599,regX:0}}]},1).to({state:[]},1).to({state:[{t:this.instance_2,p:{rotation:-126,x:-12.9,y:-28.9}},{t:this.instance_1,p:{regX:-0.1,regY:-11,rotation:-59,x:17.1,y:-14.5}},{t:this.instance,p:{regY:-11.1,skewX:111.1,skewY:113.5,x:16.1,y:-56.1,scaleX:0.499,regX:0}}]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:18,y:-49.9}},{t:this.instance,p:{regY:-11.1,skewX:-116.5,skewY:-114,x:-11.9,y:-19.9,scaleX:0.599,regX:-0.1}}]},1).to({state:[]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:-19.9,y:-19.9}},{t:this.instance_1,p:{regX:-0.1,regY:-11,rotation:-59,x:20.1,y:-29.5}},{t:this.instance,p:{regY:-11.2,skewX:-94.3,skewY:-91.8,x:-20.2,y:-59.8,scaleX:0.599,regX:0}}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:-10.9,rotation:147.4,x:29.8,y:-10.2}},{t:this.instance,p:{regY:-11.1,skewX:-126.5,skewY:-124,x:-19.7,y:-39.6,scaleX:0.599,regX:0}}]},1).to({state:[]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:-19.9,y:-19.9}},{t:this.instance_1,p:{regX:-0.1,regY:-11,rotation:-59,x:20.1,y:-29.5}},{t:this.instance,p:{regY:-11.2,skewX:-94.3,skewY:-91.8,x:29.8,y:-69.8,scaleX:0.599,regX:0}}]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:18,y:-49.9}},{t:this.instance,p:{regY:-11.1,skewX:-116.5,skewY:-114,x:-19.9,y:-19.9,scaleX:0.599,regX:-0.1}}]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:-19.9,y:-9.9}},{t:this.instance_1,p:{regX:-0.1,regY:-11,rotation:-59,x:20.1,y:-29.5}},{t:this.instance,p:{regY:-11.2,skewX:-94.3,skewY:-91.8,x:-20.2,y:-59.8,scaleX:0.599,regX:0}}]},1).to({state:[]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:20,y:-59.9}},{t:this.instance,p:{regY:-11.1,skewX:-116.5,skewY:-114,x:-22.9,y:-19.9,scaleX:0.599,regX:-0.1}}]},1).to({state:[{t:this.instance_2,p:{rotation:0,x:-9.9,y:-14.9}},{t:this.instance_1,p:{regX:-0.1,regY:-11,rotation:-59,x:17.1,y:-25.5}},{t:this.instance,p:{regY:-11.2,skewX:-94.3,skewY:-91.8,x:-10.2,y:-49.8,scaleX:0.599,regX:0}}]},1).to({state:[]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:-10.9,rotation:147.4,x:19.8,y:-10.2}},{t:this.instance,p:{regY:-11.1,skewX:-126.5,skewY:-124,x:-14.7,y:-29.6,scaleX:0.599,regX:0}}]},2).to({state:[]},1).wait(1));

	// レイヤー 1
	this.instance_3 = new lib.gra_eff1("synched",0);
	this.instance_3.setTransform(0,0,1,0.3);
	this.instance_3.alpha = 0.199;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:1.2,scaleY:0.4,alpha:1},3,cjs.Ease.get(1)).to({startPosition:0},12).to({scaleX:1.6,scaleY:0.53,alpha:0.199},3).to({_off:true},1).wait(1));

	// レイヤー 4
	this.instance_4 = new lib.line("synched",0);
	this.instance_4.setTransform(-33.9,-31.4,0.503,0.329,0,4,-175.9,0,-105.6);

	this.instance_5 = new lib.line("synched",0);
	this.instance_5.setTransform(-28.9,-31.4,0.503,0.329,0,4,-175.9,0,-105.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[]},1).to({state:[{t:this.instance_4,p:{regX:0,regY:-105.6,scaleY:0.329,skewX:4,skewY:-175.9,x:-33.9,y:-31.4}}]},1).to({state:[]},1).to({state:[{t:this.instance_4,p:{regX:0.1,regY:-105.5,scaleY:0.594,skewX:27,skewY:-152.9,x:18,y:-67.8}}]},1).to({state:[{t:this.instance_4,p:{regX:0.1,regY:-105.6,scaleY:0.485,skewX:12.7,skewY:-167.2,x:-17.9,y:-49.9}}]},1).to({state:[{t:this.instance_5},{t:this.instance_4,p:{regX:0,regY:-105.5,scaleY:0.626,skewX:31.2,skewY:-148.7,x:26.5,y:-65}}]},1).to({state:[]},1).wait(13));

	// レイヤー 5
	this.instance_6 = new lib.eff_anime_skillStAura("synched",0);
	this.instance_6.setTransform(0,3.5,1,0.333,0,0,0,0,35.6);
	this.instance_6.alpha = 0.199;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2).to({startPosition:0,_off:false},0).to({regY:35.5,scaleY:2.75,alpha:1},5,cjs.Ease.get(-0.79)).to({startPosition:0},7).to({regY:35.6,scaleX:0.86,scaleY:2.35,y:3.7,alpha:0.199},3,cjs.Ease.get(-0.99)).to({_off:true},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.9,-2.2,50,4.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;