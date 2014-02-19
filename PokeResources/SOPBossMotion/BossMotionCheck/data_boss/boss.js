(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.boss = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{base:1,center:7,center_age:13,center_ageDown:17,back:23,age1:28,age2:39,age2_down:44,hake:51,hakeBack:57});

	// timeline functions:
	this.frame_0 = function() {
		//ダメージMCを非表示
		this.mc_dmgPt.visible = false;
		
		//ダメージMCの表示位置（ベース）
		this.dmgPosX	= 240;
		this.dmgPosY	= 40;
		
		//死亡状況
		this.dieFlg = false;
		
		//被弾エフェクト非表示
		this.mc_boss.mc_effHitAttri.gotoAndPlay("hide");
		
		//==============================================
		//					変数
		//==============================================
		//打ち上げた際のステイフラグ
		this.ageStayFlg = false;
		
		
		//==============================================
		//			アニメーションのメソッド
		//==============================================
		this.bossAnime = {
			
			tgMC : rootBoss.mc_boss,
			
			//待機
			wait : function()
			{
				rootBoss.bossAnime.tgMC.gotoAndPlay("wait");
			},
			
			//攻撃
			atk : function()
			{
				rootBoss.bossAnime.tgMC.gotoAndPlay("atk");
			},
			
			//混乱
			confu : function()
			{
				rootBoss.bossAnime.tgMC.gotoAndPlay("confu");
			},
			
			//被弾
			damage : function()
			{
				//被弾モーション
				rootBoss.bossAnime.tgMC.gotoAndPlay("damage");
			},
			
			//死亡
			death : function()
			{
				rootBoss.bossAnime.tgMC.gotoAndPlay("death");
			},
			
			//切り上げステイ（真ん中）
			ageCenter : function(flg)
			{
				rootBoss.ageStayFlg = flg;				//滞空フラグ
				rootBoss.gotoAndPlay("center_age");		//アニメON
			},
			
			//切り上げ滞空から戻す（真ん中）
			ageCenterBack : function()
			{
				rootBoss.gotoAndPlay("center_ageDown");
			},
			
			//切り上げステイ（右端）
			ageRight : function(flg)
			{
				rootBoss.ageStayFlg = flg;				//滞空フラグ
				rootBoss.gotoAndPlay("age2");			//アニメON
			},
			
			//切り上げ滞空から戻す（右端）
			ageRightBack : function()
			{
				rootBoss.gotoAndPlay("age2_down");
			}
			
		};
	}
	this.frame_6 = function() {
		this.stop();
	}
	this.frame_9 = function() {
		this.stop();
	}
	this.frame_13 = function() {
		//影消す
		this.mc_boss.mc_shadow.visible = false;
	}
	this.frame_16 = function() {
		if(this.ageStayFlg == true)
		{
			this.stop();
		}
	}
	this.frame_17 = function() {
		//フラグ戻す
		this.ageStayFlg = false;
	}
	this.frame_19 = function() {
		//影表示
		this.mc_boss.mc_shadow.visible = true;
	}
	this.frame_22 = function() {
		this.stop();
	}
	this.frame_25 = function() {
		this.stop();
	}
	this.frame_28 = function() {
		//影消す
		this.mc_boss.mc_shadow.visible = false;
	}
	this.frame_34 = function() {
		//影表示
		this.mc_boss.mc_shadow.visible = true;
	}
	this.frame_37 = function() {
		this.stop();
	}
	this.frame_39 = function() {
		//影消す
		this.mc_boss.mc_shadow.visible = false;
	}
	this.frame_42 = function() {
		if(this.ageStayFlg == true)
		{
			this.stop();
		}
	}
	this.frame_44 = function() {
		//フラグ戻す
		this.ageStayFlg = false;
	}
	this.frame_46 = function() {
		//影表示
		this.mc_boss.mc_shadow.visible = true;
	}
	this.frame_50 = function() {
		this.stop();
	}
	this.frame_54 = function() {
		this.stop();
	}
	this.frame_60 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6).wait(3).call(this.frame_9).wait(4).call(this.frame_13).wait(3).call(this.frame_16).wait(1).call(this.frame_17).wait(2).call(this.frame_19).wait(3).call(this.frame_22).wait(3).call(this.frame_25).wait(3).call(this.frame_28).wait(6).call(this.frame_34).wait(3).call(this.frame_37).wait(2).call(this.frame_39).wait(3).call(this.frame_42).wait(2).call(this.frame_44).wait(2).call(this.frame_46).wait(4).call(this.frame_50).wait(4).call(this.frame_54).wait(6).call(this.frame_60).wait(5));

	// mc_dmgPt
	this.mc_dmgPt = new lib.mc_dmgPt();
	this.mc_dmgPt.setTransform(240,40);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_dmgPt}]}).wait(66));

	// mc_boss
	this.mc_boss = new lib.mc_boss();
	this.mc_boss.setTransform(255,215,1,1,0,0,0,5,85);

	this.timeline.addTween(cjs.Tween.get(this.mc_boss).wait(7).to({x:175},2,cjs.Ease.get(1)).wait(3).to({y:175},3,cjs.Ease.get(0.8)).wait(2).to({y:219},2,cjs.Ease.get(-0.79)).to({y:211},1).to({y:217},1).to({y:215},1).wait(1).to({x:255},2,cjs.Ease.get(1)).wait(3).to({y:195},2,cjs.Ease.get(1)).wait(2).to({y:217},2,cjs.Ease.get(-0.79)).to({y:211},1).to({y:217},1).to({y:215},1).wait(2).to({y:155},3,cjs.Ease.get(0.9)).wait(2).to({y:219},2,cjs.Ease.get(-0.79)).to({y:207},1,cjs.Ease.get(-0.59)).to({y:217},1).to({y:211},1).to({y:215},1).wait(1).to({x:505},3,cjs.Ease.get(1)).wait(3).to({x:255},3,cjs.Ease.get(1)).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(177,27.5,126,25);


// symbols:
(lib.dmgNum0 = function() {
	this.initialize(img.dmgNum0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum1 = function() {
	this.initialize(img.dmgNum1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum2 = function() {
	this.initialize(img.dmgNum2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum3 = function() {
	this.initialize(img.dmgNum3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum4 = function() {
	this.initialize(img.dmgNum4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum5 = function() {
	this.initialize(img.dmgNum5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum6 = function() {
	this.initialize(img.dmgNum6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum7 = function() {
	this.initialize(img.dmgNum7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum8 = function() {
	this.initialize(img.dmgNum8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.dmgNum9 = function() {
	this.initialize(img.dmgNum9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.eff_bossDie4 = function() {
	this.initialize(img.eff_bossDie4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,71,71);


(lib.eff_bossDie5 = function() {
	this.initialize(img.eff_bossDie5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,19,53);


(lib.eff_hitAttri1_1 = function() {
	this.initialize(img.eff_hitAttri1_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri1_2 = function() {
	this.initialize(img.eff_hitAttri1_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri1_3 = function() {
	this.initialize(img.eff_hitAttri1_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri1_4 = function() {
	this.initialize(img.eff_hitAttri1_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri2_1 = function() {
	this.initialize(img.eff_hitAttri2_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri2_2 = function() {
	this.initialize(img.eff_hitAttri2_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri2_3 = function() {
	this.initialize(img.eff_hitAttri2_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri2_4 = function() {
	this.initialize(img.eff_hitAttri2_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri3_1 = function() {
	this.initialize(img.eff_hitAttri3_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri3_2 = function() {
	this.initialize(img.eff_hitAttri3_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri3_3 = function() {
	this.initialize(img.eff_hitAttri3_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri3_4 = function() {
	this.initialize(img.eff_hitAttri3_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri4_1 = function() {
	this.initialize(img.eff_hitAttri4_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri4_2 = function() {
	this.initialize(img.eff_hitAttri4_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri4_3 = function() {
	this.initialize(img.eff_hitAttri4_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri4_4 = function() {
	this.initialize(img.eff_hitAttri4_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri5_1 = function() {
	this.initialize(img.eff_hitAttri5_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri5_2 = function() {
	this.initialize(img.eff_hitAttri5_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri5_3 = function() {
	this.initialize(img.eff_hitAttri5_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri5_4 = function() {
	this.initialize(img.eff_hitAttri5_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri6_1 = function() {
	this.initialize(img.eff_hitAttri6_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri6_2 = function() {
	this.initialize(img.eff_hitAttri6_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri6_3 = function() {
	this.initialize(img.eff_hitAttri6_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_hitAttri6_4 = function() {
	this.initialize(img.eff_hitAttri6_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,105);


(lib.eff_status_confu1 = function() {
	this.initialize(img.eff_status_confu1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,25);


(lib.eff_status_poison1 = function() {
	this.initialize(img.eff_status_poison1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,55);


(lib.eff_status_poison2 = function() {
	this.initialize(img.eff_status_poison2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,34,54);


(lib.KEN_armL = function() {
	this.initialize(img.KEN_armL);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,24);


(lib.KEN_armR = function() {
	this.initialize(img.KEN_armR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,74,136);


(lib.KEN_arrow = function() {
	this.initialize(img.KEN_arrow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,26);


(lib.KEN_body = function() {
	this.initialize(img.KEN_body);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,38,38);


(lib.KEN_body2 = function() {
	this.initialize(img.KEN_body2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,80,52);


(lib.KEN_eff_ball = function() {
	this.initialize(img.KEN_eff_ball);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,100);


(lib.KEN_eff_en = function() {
	this.initialize(img.KEN_eff_en);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,100);


(lib.KEN_eff_hit = function() {
	this.initialize(img.KEN_eff_hit);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,52);


(lib.KEN_eff_line = function() {
	this.initialize(img.KEN_eff_line);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,96);


(lib.KEN_eff_lineAura = function() {
	this.initialize(img.KEN_eff_lineAura);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,36,180);


(lib.KEN_eff_shot = function() {
	this.initialize(img.KEN_eff_shot);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,70,110);


(lib.KEN_eff_windAura = function() {
	this.initialize(img.KEN_eff_windAura);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,120,110);


(lib.KEN_head = function() {
	this.initialize(img.KEN_head);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,110,100);


(lib.KEN_leg1 = function() {
	this.initialize(img.KEN_leg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,60);


(lib.KEN_leg2 = function() {
	this.initialize(img.KEN_leg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,54);


(lib.KEN_tail = function() {
	this.initialize(img.KEN_tail);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,32,50);


(lib.shadow_boss = function() {
	this.initialize(img.shadow_boss);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,40);


(lib.mc_effLigthBall = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(255,255,255,0.8)","rgba(255,255,255,0)"],[0.169,0.463,1],0,0,0,0,0,51.3).s().p("AlgFhQiTiSAAjPQAAjNCTiTQCSiTDOAAQDPAACSCTQCTCTAADNQAADPiTCSQiSCTjPAAQjOAAiSiTg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.9,-49.9,100,100);


(lib.mc_effLightLine = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,255,255,0)","rgba(255,255,255,0.667)","rgba(255,255,255,0.702)"],[0,0.51,1],0,-71.9,0.1,70).s().p("Ah3sjQABAGB2AIIB4AFIiAY1gAh3skIAAABIAAgBg");
	this.shape.setTransform(0,-80.4);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12,-160.9,24.1,161);


(lib.mc_effHitAttri_p4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.eff_hitAttri1_4();
	this.instance.setTransform(-52.4,-52.4);

	this.instance_1 = new lib.eff_hitAttri2_4();
	this.instance_1.setTransform(-52.4,-52.4);

	this.instance_2 = new lib.eff_hitAttri3_4();
	this.instance_2.setTransform(-52.4,-52.4);

	this.instance_3 = new lib.eff_hitAttri4_4();
	this.instance_3.setTransform(-52.4,-52.4);

	this.instance_4 = new lib.eff_hitAttri5_4();
	this.instance_4.setTransform(-52.4,-52.4);

	this.instance_5 = new lib.eff_hitAttri6_4();
	this.instance_5.setTransform(-52.4,-52.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.4,-52.4,105,105);


(lib.mc_effHitAttri_p3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.eff_hitAttri1_3();
	this.instance.setTransform(-52.4,-52.4);

	this.instance_1 = new lib.eff_hitAttri2_3();
	this.instance_1.setTransform(-52.4,-52.4);

	this.instance_2 = new lib.eff_hitAttri3_3();
	this.instance_2.setTransform(-52.4,-52.4);

	this.instance_3 = new lib.eff_hitAttri4_3();
	this.instance_3.setTransform(-52.4,-52.4);

	this.instance_4 = new lib.eff_hitAttri5_3();
	this.instance_4.setTransform(-52.4,-52.4);

	this.instance_5 = new lib.eff_hitAttri6_3();
	this.instance_5.setTransform(-52.4,-52.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.4,-52.4,105,105);


(lib.mc_effHitAttri_p2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.eff_hitAttri1_2();
	this.instance.setTransform(-52.4,-52.4);

	this.instance_1 = new lib.eff_hitAttri2_2();
	this.instance_1.setTransform(-52.4,-52.4);

	this.instance_2 = new lib.eff_hitAttri3_2();
	this.instance_2.setTransform(-52.4,-52.4);

	this.instance_3 = new lib.eff_hitAttri4_2();
	this.instance_3.setTransform(-52.4,-52.4);

	this.instance_4 = new lib.eff_hitAttri5_2();
	this.instance_4.setTransform(-52.4,-52.4);

	this.instance_5 = new lib.eff_hitAttri6_2();
	this.instance_5.setTransform(-52.4,-52.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.4,-52.4,105,105);


(lib.mc_effHitAttri_p1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.eff_hitAttri1_1();
	this.instance.setTransform(-52.4,-52.4);

	this.instance_1 = new lib.eff_hitAttri2_1();
	this.instance_1.setTransform(-52.4,-52.4);

	this.instance_2 = new lib.eff_hitAttri3_1();
	this.instance_2.setTransform(-52.4,-52.4);

	this.instance_3 = new lib.eff_hitAttri4_1();
	this.instance_3.setTransform(-52.4,-52.4);

	this.instance_4 = new lib.eff_hitAttri5_1();
	this.instance_4.setTransform(-52.4,-52.4);

	this.instance_5 = new lib.eff_hitAttri6_1();
	this.instance_5.setTransform(-52.4,-52.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.4,-52.4,105,105);


(lib.gra_shadow = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.shadow_boss();
	this.instance.setTransform(-79.9,-21.9,0.8,1.1);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-79.9,-21.9,160,44);


(lib.gra_effBakuha2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.eff_bossDie5();
	this.instance.setTransform(-9.4,-26.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-9.4,-26.4,19,53);


(lib.gra_effBakuha1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.eff_bossDie4();
	this.instance.setTransform(-35.4,-35.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-35.4,-35.4,71,71);


(lib.eff_windAura = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_eff_windAura();
	this.instance.setTransform(-59.9,-54.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-59.9,-54.9,120,110);


(lib.eff_shot = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_eff_shot();
	this.instance.setTransform(-34.9,-54.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-34.9,-54.9,70,110);


(lib.eff_pole = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_eff_lineAura();
	this.instance.setTransform(-17.9,-89.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.9,-89.9,36,180);


(lib.eff_line = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_eff_line();
	this.instance.setTransform(-19.9,-47.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-19.9,-47.9,40,96);


(lib.eff_hit1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_eff_hit();
	this.instance.setTransform(-74.9,-25.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-74.9,-25.9,150,52);


(lib.eff_en = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_eff_en();
	this.instance.setTransform(-49.9,-49.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.9,-49.9,100,100);


(lib.eff_aura = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_eff_ball();
	this.instance.setTransform(-49.9,-49.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.9,-49.9,100,100);


(lib.boss_tail = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_tail();
	this.instance.setTransform(-15.9,-24.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-15.9,-24.9,32,50);


(lib.boss_leg2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_leg2();
	this.instance.setTransform(-19.9,-26.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-19.9,-26.9,40,54);


(lib.boss_leg1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_leg1();
	this.instance.setTransform(-19.9,-29.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-19.9,-29.9,40,60);


(lib.boss_head = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_head();
	this.instance.setTransform(-54.9,-49.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-54.9,-49.9,110,100);


(lib.boss_boy2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_body2();
	this.instance.setTransform(-39.9,-25.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-39.9,-25.9,80,52);


(lib.boss_body1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_body();
	this.instance.setTransform(-18.9,-18.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-18.9,-18.9,38,38);


(lib.boss_arrow = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_arrow();
	this.instance.setTransform(-49.9,-12.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.9,-12.9,100,26);


(lib.boss_armR = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_armR();
	this.instance.setTransform(-36.9,-67.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36.9,-67.9,74,136);


(lib.boss_armL = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.KEN_armL();
	this.instance.setTransform(-17.9,-11.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.9,-11.9,36,24);


(lib.mc_eff_confu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.eff_status_confu1();
	this.instance.setTransform(-24.9,-12.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{scaleX:1,scaleY:1,rotation:0,x:-24.9,y:-12.4}}]}).to({state:[{t:this.instance,p:{scaleX:0.9,scaleY:0.6,rotation:180,x:27.5,y:9.5}}]},3).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.9,-12.4,50,25);


(lib.mc_dmgPtNum = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.dmgNum0();
	this.instance.setTransform(-8.9,-12.4);

	this.instance_1 = new lib.dmgNum1();
	this.instance_1.setTransform(-8.9,-12.4);

	this.instance_2 = new lib.dmgNum2();
	this.instance_2.setTransform(-8.9,-12.4);

	this.instance_3 = new lib.dmgNum3();
	this.instance_3.setTransform(-8.9,-12.4);

	this.instance_4 = new lib.dmgNum4();
	this.instance_4.setTransform(-8.9,-12.4);

	this.instance_5 = new lib.dmgNum5();
	this.instance_5.setTransform(-8.9,-12.4);

	this.instance_6 = new lib.dmgNum6();
	this.instance_6.setTransform(-8.9,-12.4);

	this.instance_7 = new lib.dmgNum7();
	this.instance_7.setTransform(-8.9,-12.4);

	this.instance_8 = new lib.dmgNum8();
	this.instance_8.setTransform(-8.9,-12.4);

	this.instance_9 = new lib.dmgNum9();
	this.instance_9.setTransform(-8.9,-12.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.9,-12.4,18,25);


(lib.mc_effHitAttribute = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{st:0,hide:7});

	// timeline functions:
	this.frame_0 = function() {
		this.eff1.gotoAndStop(this.dispFrm);
	}
	this.frame_1 = function() {
		this.eff2.gotoAndStop(this.dispFrm);
	}
	this.frame_3 = function() {
		this.eff3.gotoAndStop(this.dispFrm);
	}
	this.frame_4 = function() {
		this.eff4.gotoAndStop(this.dispFrm);
	}
	this.frame_11 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(2).call(this.frame_3).wait(1).call(this.frame_4).wait(7).call(this.frame_11));

	// レイヤー 6
	this.eff4 = new lib.mc_effHitAttri_p4();
	this.eff4.setTransform(0,0,0.9,0.9);
	this.eff4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff4).wait(4).to({_off:false},0).to({scaleX:1.1,scaleY:1.1,alpha:0.199},2).to({_off:true},1).wait(5));

	// レイヤー 3
	this.eff3 = new lib.mc_effHitAttri_p3();
	this.eff3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff3).wait(3).to({_off:false},0).to({_off:true},1).wait(8));

	// レイヤー 2
	this.eff2 = new lib.mc_effHitAttri_p2();
	this.eff2.setTransform(0,0,0.7,0.7);
	this.eff2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff2).wait(1).to({_off:false},0).wait(1).to({scaleX:0.8,scaleY:0.8,rotation:90},0).to({_off:true},1).wait(9));

	// レイヤー 1
	this.eff1 = new lib.mc_effHitAttri_p1();
	this.eff1.setTransform(0,0,0.8,0.8);

	this.timeline.addTween(cjs.Tween.get(this.eff1).to({_off:true},1).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.9,-41.9,84,84);


(lib.boss_All = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.boss_head();
	this.instance.setTransform(-21.4,8.5,1,1,-11.1,0,0,-14.4,29.5);

	this.instance_1 = new lib.boss_armL();
	this.instance_1.setTransform(-11.3,13.5,1,1,-84.6,0,0,9.6,-5.4);

	this.instance_2 = new lib.boss_body1();
	this.instance_2.setTransform(-25.9,34,1,1,-16.9,0,0,-5.9,12);

	this.instance_3 = new lib.boss_leg1();
	this.instance_3.setTransform(-4.4,46.1,1,1,0,0,0,1.5,-15.9);

	this.instance_4 = new lib.boss_leg1();
	this.instance_4.setTransform(30.5,43.6,1.06,1.06,0,0,0,1.4,-16.4);

	this.instance_5 = new lib.boss_boy2();
	this.instance_5.setTransform(-3.9,45);

	this.instance_6 = new lib.boss_leg2();
	this.instance_6.setTransform(-39.4,47.6,1,1,0,0,0,9.5,-16.4);

	this.instance_7 = new lib.boss_leg2();
	this.instance_7.setTransform(9,48.1,1,1,0,0,0,9,-15.9);

	this.instance_8 = new lib.boss_tail();
	this.instance_8.setTransform(29.1,31.5,1,1,0,0,0,-9.9,14.5);

	this.instance_9 = new lib.boss_armR();
	this.instance_9.setTransform(-33.3,16.5,0.899,0.899,-77.9,0,0,28,13.5);

	this.addChild(this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-117.2,-82.9,172.3,175.8);


(lib.mc_dmgPt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{wait:0,"st":1});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		//----------------------------------------ダメージ値表示処理↓↓↓↓↓
		//ダメージを文字列化
		var dmgStr = "" + this.dmgPt;
		
		//ダメージの桁を算出
		var dmgLen = dmgStr.length;
		
		//ダメージ値のMAX桁数
		var dmgMaxLen = 7;
		
		//ｘ座標の始点を算出
		var stX = 16 * dmgLen / 2;
		
		for(var i = 0; i < dmgMaxLen; i++)
		{
			var tgMC = this["n" + i];
			
			if(i < dmgLen)
			{
				var dispFrm	= dmgStr.substr((dmgLen -i -1), 1);
				
				tgMC.visible = true;
				tgMC.gotoAndStop(dispFrm);
				
				//座標の調整
				tgMC.x = stX -8 + (-16*i);
			}
			else
			{
				tgMC.visible = false;
			}
		}
		//----------------------------------------ダメージ値表示処理↑↑↑↑↑
	}
	this.frame_9 = function() {
		//ダメージ値を非表示
		sop.raidBattle.dmg.bossOFF();
		
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(8).call(this.frame_9));

	// mc
	this.n6 = new lib.mc_dmgPtNum();
	this.n6.setTransform(-53.9,0);

	this.n0 = new lib.mc_dmgPtNum();
	this.n0.setTransform(54,0);

	this.n5 = new lib.mc_dmgPtNum();
	this.n5.setTransform(-35.9,0);

	this.n4 = new lib.mc_dmgPtNum();
	this.n4.setTransform(-17.9,0);

	this.n1 = new lib.mc_dmgPtNum();
	this.n1.setTransform(36,0);

	this.n2 = new lib.mc_dmgPtNum();
	this.n2.setTransform(18,0);

	this.n3 = new lib.mc_dmgPtNum();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.n3},{t:this.n2},{t:this.n1},{t:this.n4},{t:this.n5},{t:this.n0},{t:this.n6}]}).wait(10));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.9,-12.4,126,25);


(lib.mc_boss = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"wait":0,howl:14,atk_1:35,atk_2:79,damage:139,poison:148,confu:159,death:193});

	// timeline functions:
	this.frame_0 = function() {
		//死亡状況
		rootBoss.dieFlg = false;
	}
	this.frame_13 = function() {
		//咆哮するか
		var animeID = Math.floor(Math.random()*5);
		
		if(animeID == 0)
		{
			this.gotoAndPlay("howl");
		}
		else
		{
			this.gotoAndPlay("wait");
		}
	}
	this.frame_34 = function() {
		this.gotoAndPlay("wait");
	}
	this.frame_35 = function() {
		//ボスを手前に
		sop.raidBattle.boss.dispFront();
	}
	this.frame_60 = function() {
		//ユーザーの被弾判定
		sop.raidBattle.user.hitCheck();
	}
	this.frame_76 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_78 = function() {
		//待機モーションへ
		this.gotoAndPlay("wait");
	}
	this.frame_79 = function() {
		//ボスを手前に
		sop.raidBattle.boss.dispFront();
	}
	this.frame_125 = function() {
		//ユーザーの被弾判定
		sop.raidBattle.user.hitCheck();
	}
	this.frame_136 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_138 = function() {
		//待機モーションへ
		this.gotoAndPlay("wait");
	}
	this.frame_139 = function() {
		//属性別被弾エフェクトの判定＆実行
		sop.raidBattle.effHitAttri.boss_dispON();
	}
	this.frame_145 = function() {
		//生死判定　※nextAnimeGoでやる
		//sop.raidBattle.boss.damageCheck();
	}
	this.frame_147 = function() {
		//待機モーションへ
		this.gotoAndPlay("wait");
	}
	this.frame_148 = function() {
		//ダメージ値を表示
		sop.raidBattle.dmg.dmgON();
		
		//サウンド：状態異常_毒
		require(['coffee/poke/native'], function(nativeProxy){
		    nativeProxy.playSe('087_poisoned');
		});
	}
	this.frame_156 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_158 = function() {
		//待機モーションへ
		this.gotoAndPlay("wait");
	}
	this.frame_159 = function() {
		//サウンド：状態異常_混乱
		require(['coffee/poke/native'], function(nativeProxy){
		    nativeProxy.playSe('086_confused');
		});
	}
	this.frame_180 = function() {
		//ダメージを表示
		sop.raidBattle.dmg.dmgON();
	}
	this.frame_190 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_192 = function() {
		//待機モーションへ
		this.gotoAndPlay("wait");
	}
	this.frame_193 = function() {
		//死亡状況
		rootBoss.dieFlg = true;
		
		//ボスを手前に
		sop.raidBattle.boss.dispFront();
	}
	this.frame_214 = function() {
		//勝利ロゴ出す
		sop.raidBattle.resultWindow.dispON("win");
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(13).call(this.frame_13).wait(21).call(this.frame_34).wait(1).call(this.frame_35).wait(25).call(this.frame_60).wait(16).call(this.frame_76).wait(2).call(this.frame_78).wait(1).call(this.frame_79).wait(46).call(this.frame_125).wait(11).call(this.frame_136).wait(2).call(this.frame_138).wait(1).call(this.frame_139).wait(6).call(this.frame_145).wait(2).call(this.frame_147).wait(1).call(this.frame_148).wait(8).call(this.frame_156).wait(2).call(this.frame_158).wait(1).call(this.frame_159).wait(21).call(this.frame_180).wait(10).call(this.frame_190).wait(2).call(this.frame_192).wait(1).call(this.frame_193).wait(21).call(this.frame_214));

	// eff_white
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.4)").s().p("A8HTiMAAAgnDMA4OAAAMAAAAnDg");
	this.shape.setTransform(-87.9,-16.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.2)").s().p("A8HTiMAAAgnDMA4OAAAMAAAAnDg");
	this.shape_1.setTransform(-87.9,-16.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.098)").s().p("A8HTiMAAAgnDMA4OAAAMAAAAnDg");
	this.shape_2.setTransform(-87.9,-16.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.298)").s().p("A8HTiMAAAgnDMA4OAAAMAAAAnDg");
	this.shape_3.setTransform(-87.9,-16.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.149)").s().p("A8GTiMAAAgnCMA4OAAAMAAAAnCg");
	this.shape_4.setTransform(-91.9,-20.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0.298)").s().p("A8GTiMAAAgnCMA4OAAAMAAAAnCg");
	this.shape_5.setTransform(-91.9,-20.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0.447)").s().p("A8GTiMAAAgnCMA4OAAAMAAAAnCg");
	this.shape_6.setTransform(-91.9,-20.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("A8GTiMAAAgnCMA4OAAAMAAAAnCg");
	this.shape_7.setTransform(-91.9,-20.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},60).to({state:[]},1).to({state:[{t:this.shape_1}]},28).to({state:[]},1).to({state:[{t:this.shape_1}]},7).to({state:[]},1).to({state:[{t:this.shape_1}]},3).to({state:[]},1).to({state:[{t:this.shape_2}]},4).to({state:[{t:this.shape_3}]},1).to({state:[]},1).to({state:[{t:this.shape_1}]},11).to({state:[]},1).to({state:[{t:this.shape}]},3).to({state:[]},1).to({state:[{t:this.shape_1}]},43).to({state:[]},1).to({state:[{t:this.shape_3}]},11).to({state:[]},1).to({state:[{t:this.shape_4}]},16).to({state:[{t:this.shape_5}]},4).to({state:[{t:this.shape_6}]},4).to({state:[{t:this.shape_7}]},4).to({state:[{t:this.shape_5}]},1).to({state:[]},2).wait(4));

	// poison_1
	this.instance = new lib.eff_status_poison1();
	this.instance.setTransform(-35.9,-101.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},148).to({state:[]},2).to({state:[{t:this.instance}]},1).to({state:[]},2).to({state:[{t:this.instance}]},1).to({state:[]},2).to({state:[]},37).wait(22));

	// poison_2
	this.instance_1 = new lib.eff_status_poison2();
	this.instance_1.setTransform(-36.9,-95.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},150).to({state:[]},1).to({state:[{t:this.instance_1}]},2).to({state:[]},1).to({state:[]},39).wait(22));

	// confu
	this.instance_2 = new lib.mc_eff_confu();
	this.instance_2.setTransform(-24.9,-66.9);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(159).to({_off:false},0).wait(8).to({x:-0.8,y:-84.8},2).wait(5).to({x:-48.2,y:-56},3).to({x:-24.8,y:-66.8},2).to({_off:true},1).wait(35));

	// hitAttri
	this.mc_effHitAttri = new lib.mc_effHitAttribute();
	this.mc_effHitAttri.setTransform(-25.9,34);

	this.timeline.addTween(cjs.Tween.get(this.mc_effHitAttri).to({_off:true},193).wait(22));

	// eff_shot
	this.instance_3 = new lib.eff_line();
	this.instance_3.setTransform(-243.9,13,0.544,1.928,164);

	this.instance_4 = new lib.eff_line();
	this.instance_4.setTransform(-153.9,-8.9,0.438,2.006,-166.9);

	this.instance_5 = new lib.eff_line();
	this.instance_5.setTransform(-108.9,0,0.487,2.478,-150.2);

	this.instance_6 = new lib.eff_en();
	this.instance_6.setTransform(-193.6,76.4,1.8,0.42);

	this.instance_7 = new lib.eff_hit1();
	this.instance_7.setTransform(-192.9,72,0.84,0.84);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7,p:{scaleX:0.84,scaleY:0.84,y:72,alpha:1}},{t:this.instance_6,p:{scaleX:1.8,scaleY:0.42,alpha:1}},{t:this.instance_5,p:{scaleX:0.487,scaleY:2.478,x:-108.9,y:0,alpha:1}},{t:this.instance_4,p:{x:-153.9,y:-8.9,alpha:1}},{t:this.instance_3,p:{scaleX:0.544,scaleY:1.928,x:-243.9,y:13,alpha:1}}]},125).to({state:[{t:this.instance_6,p:{scaleX:2.578,scaleY:0.602,alpha:0.5}},{t:this.instance_7,p:{scaleX:1.159,scaleY:1.159,y:70,alpha:0.699}},{t:this.instance_5,p:{scaleX:0.307,scaleY:2.808,x:-75.9,y:-61.9,alpha:0.602}},{t:this.instance_4,p:{x:-132.9,y:-91.9,alpha:0.602}},{t:this.instance_3,p:{scaleX:0.393,scaleY:2.165,x:-262.9,y:-65.9,alpha:0.602}}]},1).to({state:[{t:this.instance_6,p:{scaleX:2.898,scaleY:0.676,alpha:0.301}},{t:this.instance_7,p:{scaleX:1.333,scaleY:1.333,y:70,alpha:0.398}},{t:this.instance_5,p:{scaleX:0.307,scaleY:2.808,x:-75.9,y:-61.9,alpha:0.199}},{t:this.instance_4,p:{x:-132.9,y:-91.9,alpha:0.199}},{t:this.instance_3,p:{scaleX:0.393,scaleY:2.165,x:-262.9,y:-65.9,alpha:0.199}}]},1).to({state:[{t:this.instance_6,p:{scaleX:3.338,scaleY:0.779,alpha:0.102}}]},1).to({state:[]},1).to({state:[]},64).wait(22));

	// eff_line2
	this.instance_8 = new lib.eff_line();
	this.instance_8.setTransform(-192.9,80,0.25,2.5);
	this.instance_8.alpha = 0.602;

	this.instance_9 = new lib.eff_line();
	this.instance_9.setTransform(-167.9,-69.9,0.25,3,180);

	this.instance_10 = new lib.eff_line();
	this.instance_10.setTransform(-216.9,-70.9,0.316,2.08);
	this.instance_10.alpha = 0.801;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_10,p:{x:-216.9,y:-70.9,alpha:0.801}},{t:this.instance_9,p:{x:-167.9,y:-69.9,alpha:1}},{t:this.instance_8,p:{x:-192.9,y:80,alpha:0.602}}]},122).to({state:[{t:this.instance_10,p:{x:-231.9,y:46,alpha:0.801}},{t:this.instance_9,p:{x:-197.9,y:-109.9,alpha:1}},{t:this.instance_8,p:{x:-169.9,y:79,alpha:0.602}}]},1).to({state:[{t:this.instance_10,p:{x:-179.2,y:68.5,alpha:0.801}},{t:this.instance_9,p:{x:-180.2,y:-129.4,alpha:1}},{t:this.instance_8,p:{x:-227.2,y:-56.4,alpha:0.602}}]},1).to({state:[{t:this.instance_10,p:{x:-170.5,y:78.1,alpha:0.801}},{t:this.instance_9,p:{x:-210.5,y:5.1,alpha:1}},{t:this.instance_8,p:{x:-185.5,y:-48.8,alpha:0.602}}]},1).to({state:[{t:this.instance_10,p:{x:-203.5,y:-27.3,alpha:0.801}},{t:this.instance_9,p:{x:-162.6,y:20.6,alpha:1}},{t:this.instance_8,p:{x:-189.5,y:103.6,alpha:0.602}}]},1).to({state:[{t:this.instance_10,p:{x:-200.9,y:75,alpha:0.301}},{t:this.instance_9,p:{x:-162.9,y:-78.9,alpha:0.301}},{t:this.instance_8,p:{x:-226.9,y:-42.9,alpha:0.301}}]},1).to({state:[]},1).to({state:[]},65).wait(22));

	// eff_hit
	this.instance_11 = new lib.eff_en();
	this.instance_11.setTransform(-179.9,48.5,1.988,0.295,3);

	this.instance_12 = new lib.eff_hit1();
	this.instance_12.setTransform(-179.9,49,0.733,0.615,3.8);

	this.instance_13 = new lib.eff_en();
	this.instance_13.setTransform(-25.9,-61.9,0.5,0.5);
	this.instance_13.alpha = 0.801;

	this.instance_14 = new lib.eff_aura();
	this.instance_14.setTransform(-25.9,-60.9,2.54,2.54);
	this.instance_14.alpha = 0.199;

	this.instance_15 = new lib.eff_shot();
	this.instance_15.setTransform(-19.9,-135.9,0.44,2.3,180);
	this.instance_15.alpha = 0.801;

	this.instance_16 = new lib.eff_line();
	this.instance_16.setTransform(-80.9,4.5,0.307,2.808,-66.4);
	this.instance_16.alpha = 0.602;

	this.instance_17 = new lib.eff_line();
	this.instance_17.setTransform(-119.9,-36.4,0.374,2.577,-70.2);
	this.instance_17.alpha = 0.602;

	this.instance_18 = new lib.eff_line();
	this.instance_18.setTransform(69,-20.4,0.431,2.055,-84);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12,p:{scaleX:0.733,scaleY:0.615,alpha:1,rotation:3.8,x:-179.9,y:49}},{t:this.instance_11,p:{scaleX:1.988,scaleY:0.295,alpha:1,rotation:3,x:-179.9,y:48.5}}]},60).to({state:[{t:this.instance_12,p:{scaleX:1.124,scaleY:0.943,alpha:1,rotation:3.8,x:-179.9,y:49}},{t:this.instance_11,p:{scaleX:2.865,scaleY:0.485,alpha:0.5,rotation:3,x:-179.9,y:48.5}}]},1).to({state:[{t:this.instance_12,p:{scaleX:1.228,scaleY:1.031,alpha:0.5,rotation:3.8,x:-179.9,y:49}},{t:this.instance_11,p:{scaleX:3.235,scaleY:0.547,alpha:0.25,rotation:3,x:-179.9,y:48.5}}]},1).to({state:[]},1).to({state:[{t:this.instance_11,p:{scaleX:2.2,scaleY:2.2,alpha:0.199,rotation:0,x:-25.9,y:-61.9}}]},26).to({state:[{t:this.instance_11,p:{scaleX:1,scaleY:1,alpha:0.5,rotation:0,x:-25.9,y:-61.9}}]},1).to({state:[{t:this.instance_13},{t:this.instance_11,p:{scaleX:2.109,scaleY:0.14,alpha:0.238,rotation:0,x:-25.9,y:-61.9}}]},1).to({state:[{t:this.instance_14,p:{scaleX:2.54,scaleY:2.54,alpha:0.199}}]},1).to({state:[]},1).to({state:[{t:this.instance_14,p:{scaleX:1.56,scaleY:1.56,alpha:0.422}}]},2).to({state:[]},1).to({state:[{t:this.instance_14,p:{scaleX:1.88,scaleY:1.88,alpha:0.301}}]},1).to({state:[]},1).to({state:[{t:this.instance_14,p:{scaleX:1.461,scaleY:1.461,alpha:0.461}}]},2).to({state:[{t:this.instance_14,p:{scaleX:1.902,scaleY:1.902,alpha:0.352}}]},1).to({state:[{t:this.instance_14,p:{scaleX:2.181,scaleY:2.181,alpha:0.238}}]},1).to({state:[{t:this.instance_14,p:{scaleX:1.461,scaleY:1.461,alpha:0.531}}]},1).to({state:[]},1).to({state:[{t:this.instance_14,p:{scaleX:3.021,scaleY:3.021,alpha:0.469}}]},1).to({state:[{t:this.instance_14,p:{scaleX:1.16,scaleY:1.16,alpha:0.301}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.44,scaleY:2.3,y:-135.9,alpha:0.801,rotation:180,x:-19.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.24,scaleY:2.936,y:-155.9,alpha:0.398,rotation:180,x:-19.9}}]},1).to({state:[]},1).to({state:[{t:this.instance_15,p:{scaleX:1.372,scaleY:1.31,y:-125.9,alpha:1,rotation:0,x:-193.9}}]},14).to({state:[{t:this.instance_15,p:{scaleX:0.312,scaleY:2.655,y:-115.9,alpha:1,rotation:0,x:-193.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:1.054,scaleY:2.273,y:-15.9,alpha:1,rotation:0,x:-193.9}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.312,scaleY:3.236,y:14,alpha:0.5,rotation:0,x:-193.9}}]},1).to({state:[]},1).to({state:[{t:this.instance_11,p:{scaleX:0.675,scaleY:0.213,alpha:0.801,rotation:100,x:-74.9,y:-5.9}}]},40).to({state:[{t:this.instance_11,p:{scaleX:1.807,scaleY:0.57,alpha:0.602,rotation:100,x:-74.9,y:-5.9}},{t:this.instance_17,p:{scaleX:0.374,scaleY:2.577,rotation:-70.2,x:-119.9,y:-36.4,alpha:0.602}},{t:this.instance_16,p:{scaleY:2.808,rotation:-66.4,x:-80.9,y:4.5,alpha:0.602,scaleX:0.307}}]},1).to({state:[{t:this.instance_11,p:{scaleX:2.224,scaleY:0.702,alpha:0.301,rotation:100,x:-74.9,y:-5.9}},{t:this.instance_16,p:{scaleY:3.37,rotation:-68.5,x:-114.9,y:-21.4,alpha:0.398,scaleX:0.307}}]},1).to({state:[{t:this.instance_11,p:{scaleX:2.359,scaleY:0.745,alpha:0.102,rotation:100,x:-74.9,y:-5.9}}]},1).to({state:[]},1).to({state:[{t:this.instance_12,p:{scaleX:0.582,scaleY:0.582,alpha:1,rotation:51.2,x:-14.9,y:-42.4}},{t:this.instance_11,p:{scaleX:1.474,scaleY:0.344,alpha:1,rotation:53.2,x:-16.9,y:-44.4}},{t:this.instance_18,p:{x:69,y:-20.4,alpha:1}},{t:this.instance_17,p:{scaleX:0.511,scaleY:1.426,rotation:-131.3,x:25,y:-86.4,alpha:1}},{t:this.instance_16,p:{scaleY:2.061,rotation:-152.1,x:-4.9,y:-118.4,alpha:1,scaleX:0.283}}]},9).to({state:[{t:this.instance_11,p:{scaleX:2.055,scaleY:0.48,alpha:0.602,rotation:53.2,x:-16.9,y:-44.4}},{t:this.instance_12,p:{scaleX:0.839,scaleY:0.839,alpha:0.5,rotation:51.2,x:-14.9,y:-42.4}},{t:this.instance_18,p:{x:108,y:-21.4,alpha:0.699}},{t:this.instance_17,p:{scaleX:0.511,scaleY:1.426,rotation:-131.3,x:62,y:-113.4,alpha:0.699}},{t:this.instance_16,p:{scaleY:2.061,rotation:-152.1,x:6,y:-146.4,alpha:0.699,scaleX:0.283}}]},1).to({state:[{t:this.instance_11,p:{scaleX:2.39,scaleY:0.558,alpha:0.301,rotation:53.2,x:-16.9,y:-44.4}}]},1).to({state:[]},1).to({state:[]},10).wait(22));

	// eff_charge
	this.instance_19 = new lib.eff_windAura();
	this.instance_19.setTransform(-23.9,-59.9,2.6,2.6);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(89).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},3).to({scaleX:0.8,scaleY:0.8},12).to({scaleX:1.6,scaleY:1.6,alpha:0.602},1).to({scaleX:0.44,scaleY:0.44,alpha:1},1).to({_off:true},1).wait(108));

	// eff_line
	this.instance_20 = new lib.eff_line();
	this.instance_20.setTransform(-196.9,-1.4,0.75,2.253,-174.6);

	this.instance_21 = new lib.eff_line();
	this.instance_21.setTransform(-144.9,-9.9,0.6,2.458,-174.6);

	this.instance_22 = new lib.eff_line();
	this.instance_22.setTransform(-105.9,24,0.528,2.458,46.6);
	this.instance_22.alpha = 0.699;

	this.instance_23 = new lib.eff_pole();
	this.instance_23.setTransform(-23.9,-20.9,0.5,1.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21,p:{x:-144.9,y:-9.9,alpha:1,scaleX:0.6,scaleY:2.458,rotation:-174.6}},{t:this.instance_20,p:{x:-196.9,y:-1.4,alpha:1,scaleX:0.75,scaleY:2.253,rotation:-174.6}}]},60).to({state:[{t:this.instance_21,p:{x:-143.9,y:-23.9,alpha:0.5,scaleX:0.6,scaleY:2.458,rotation:-174.6}},{t:this.instance_20,p:{x:-193.9,y:-25.4,alpha:0.5,scaleX:0.75,scaleY:2.253,rotation:-174.6}}]},1).to({state:[]},1).to({state:[{t:this.instance_22,p:{rotation:46.6,x:-105.9,y:24,alpha:0.699}},{t:this.instance_21,p:{x:-101.9,y:-94.9,alpha:1,scaleX:0.528,scaleY:1.518,rotation:115}},{t:this.instance_20,p:{x:69,y:-86.9,alpha:1,scaleX:0.316,scaleY:2.08,rotation:-107.3}}]},27).to({state:[]},1).to({state:[{t:this.instance_22,p:{rotation:76,x:-140.9,y:-22.9,alpha:0.5}},{t:this.instance_21,p:{x:-60.9,y:-134.9,alpha:0.699,scaleX:0.528,scaleY:1.518,rotation:153.5}},{t:this.instance_20,p:{x:71,y:9,alpha:1,scaleX:0.316,scaleY:2.08,rotation:-54.1}}]},7).to({state:[]},1).to({state:[{t:this.instance_22,p:{rotation:46.6,x:-105.9,y:24,alpha:0.602}},{t:this.instance_21,p:{x:-101.9,y:-94.9,alpha:1,scaleX:0.528,scaleY:1.518,rotation:115}},{t:this.instance_20,p:{x:69,y:-86.9,alpha:0.602,scaleX:0.316,scaleY:2.08,rotation:-107.3}}]},3).to({state:[]},1).to({state:[{t:this.instance_23,p:{scaleX:0.5,alpha:1,x:-23.9}}]},4).to({state:[{t:this.instance_23,p:{scaleX:3.2,alpha:0.602,x:-23.9}}]},1).to({state:[{t:this.instance_23,p:{scaleX:3.3,alpha:0.398,x:-23.9}}]},1).to({state:[{t:this.instance_23,p:{scaleX:3.4,alpha:0.199,x:-23.9}}]},1).to({state:[{t:this.instance_23,p:{scaleX:3.4,alpha:0.102,x:-23.9}}]},1).to({state:[]},1).to({state:[{t:this.instance_23,p:{scaleX:0.318,alpha:0.5,x:-195.4}}]},8).to({state:[{t:this.instance_23,p:{scaleX:2.546,alpha:0.602,x:-195.4}}]},1).to({state:[{t:this.instance_23,p:{scaleX:2.626,alpha:0.5,x:-195.4}}]},1).to({state:[{t:this.instance_23,p:{scaleX:2.706,alpha:0.5,x:-195.4}}]},1).to({state:[{t:this.instance_23,p:{scaleX:2.6,alpha:0.398,x:-195.4}}]},6).to({state:[{t:this.instance_23,p:{scaleX:3,alpha:0.301,x:-195.4}}]},1).to({state:[{t:this.instance_23,p:{scaleX:3.1,alpha:0.102,x:-195.4}}]},1).to({state:[]},1).to({state:[]},62).wait(22));

	// arrow
	this.instance_24 = new lib.boss_arrow();
	this.instance_24.setTransform(-19.3,26,1,1,-14.1,0,0,41.8,0.3);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(84).to({_off:false},0).wait(1).to({regX:41.7,rotation:38.5,x:-26.3,y:16},0).wait(1).to({regX:41.6,rotation:88.5,x:-17.4,y:11},0).to({y:23},4).to({y:26},16).wait(1).to({scaleX:1.56,scaleY:0.42,y:-96.9},0).to({_off:true},1).wait(52).to({scaleX:1,scaleY:1,rotation:-22.1,x:-16,y:26.2,_off:false},0).to({rotation:13.2,x:-21,y:21.3},2).to({rotation:13.2,x:-9,y:25.3},5).to({scaleX:1.47,scaleY:0.63,rotation:20.6,x:-101,y:-17.5},1).to({regY:0.2,scaleX:1,scaleY:1,rotation:20.5,x:-217.9,y:-61.5},1).to({_off:true},1).wait(9).to({regX:41.5,regY:0.3,scaleX:1.2,scaleY:1,rotation:-17.3,x:139.5,y:-98.6,_off:false},0).wait(1).to({scaleX:1.5,scaleY:0.8,x:97.4,y:-79.5},0).to({_off:true},1).wait(34));

	// head
	this.instance_25 = new lib.boss_head();
	this.instance_25.setTransform(-21.4,8.5,1,1,-11.1,0,0,-14.4,29.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).to({regY:29.6,scaleX:1,scaleY:1,rotation:-13.8,y:11.6},6).to({regY:29.5,scaleX:1,scaleY:1,rotation:-11,y:8.5},7).to({regY:29.6,rotation:-24.1,x:-29.1,y:14},4).to({rotation:-32.1,x:-30.2,y:18},3).to({rotation:-6.6,x:6.7,y:-17},2).to({regX:-14.4,regY:29.5,rotation:-2.6,x:14.6,y:-18.5},6).to({regX:-14.3,regY:29.6,rotation:-35.3,x:-29.4,y:13.1},3).to({regY:29.5,rotation:-11,x:-21.3,y:8.5},3).to({regY:29.6,rotation:-19.4,x:-18.9,y:12.2},3).to({y:17.2},3).to({rotation:-22.7,x:-76.9,y:-22.5},2).to({rotation:-24.1,x:-169.1,y:14},2).to({rotation:-32.1,x:-170.2,y:18},4).to({rotation:-6.6,x:-132.2,y:-17},1).to({regX:-14.4,rotation:-17.8,x:-131.4,y:-22.1},6).to({regX:-14.2,rotation:-3.7,x:-123.8,y:-22.8},4).to({regX:-14.3,rotation:-32.1,x:-170.2,y:18},1).to({x:-169.2,y:15},4).wait(3).to({x:-170.2,y:18},2).to({y:19},2).to({rotation:-28,x:-78.1,y:-36.3},2).to({regY:29.5,rotation:-11,x:-21.3,y:10.5},2).to({rotation:-11,y:8.5},2).wait(1).to({rotation:-20.4,x:-25.1,y:7.4},3).to({regX:-14.4,rotation:-22.1,y:7.5},2).to({regY:29.4,rotation:47.5,x:-2.4,y:17.3},3).wait(20).to({rotation:53.7,x:-2.3,y:20.3},1).to({rotation:48.7,y:17.3},2).wait(6).to({rotation:57.7,y:19.4},2).to({regX:-14.3,regY:29.6,rotation:-13.5,x:-22.1,y:9},4).to({regY:29.5,rotation:-11,x:-21.3,y:8.5},2).to({regY:29.6,scaleX:1,scaleY:1,rotation:-13.8,y:11.6},7).to({regY:29.5,scaleX:1,scaleY:1,rotation:-11,y:8.5},7).wait(1).to({regX:-14.4,rotation:-19,x:-1.7,y:-0.3},2).wait(1).to({scaleX:1,scaleY:1,rotation:-16.1,x:-4.8,y:-5.1},0).wait(1).to({regY:29.6,scaleX:1,scaleY:1,rotation:-18.8,x:-5.7,y:1.7},0).wait(1).to({x:-4.7,y:-3.1},0).wait(1).to({regY:29.5,scaleX:1,scaleY:1,rotation:-22.4,x:1.3,y:2.4},0).wait(1).to({regX:-14.3,rotation:-11,x:-21.3,y:8.5},0).wait(2).to({regX:-14.4,rotation:-19,x:-1.7,y:-0.3},2).wait(1).to({scaleX:1,scaleY:1,rotation:-16.1,x:-4.8,y:-5.1},0).wait(1).to({regY:29.6,scaleX:1,scaleY:1,rotation:-18.8,x:-5.7,y:1.7},0).wait(1).to({x:-4.7,y:-3.1},0).wait(1).to({regY:29.5,scaleX:1,scaleY:1,rotation:-22.4,x:1.3,y:2.4},0).wait(1).to({rotation:-19,x:-1.7,y:-0.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:-16.1,x:-4.8,y:-5.1},0).wait(1).to({regY:29.6,scaleX:1,scaleY:1,rotation:-18.8,x:-5.7,y:1.7},0).wait(1).to({regX:-14.3,regY:29.5,scaleX:1,scaleY:1,rotation:-11,x:-21.3,y:8.5},0).wait(2).to({regY:29.4,rotation:-17.2,x:-19,y:7.4},3).to({regY:29.5,rotation:-21.7,x:-18.9,y:8.5},5).to({regY:29.6,rotation:-4.4,x:-1,y:-10.6},2).to({regY:29.4,rotation:-17.2,x:3.4,y:-14.7},3).to({rotation:-14.7,x:5.4,y:-15.3},2).to({regY:29.6,rotation:-24.1,x:-29.1,y:14},3).to({regY:29.5,rotation:-11,x:-21.3,y:8.5},2).to({rotation:-45.6,x:-27.6,y:5.9},1).to({regY:29.4,rotation:-62.6,x:-35.7,y:7},1).to({rotation:-70.3},2).wait(3).to({regY:29.6,rotation:-73.1,x:-36.3,y:9.2},2).to({regY:29.5,rotation:-11,x:-21.3,y:8.5},2).to({_off:true},3).wait(22));

	// arm_L
	this.instance_26 = new lib.boss_armL();
	this.instance_26.setTransform(-11.3,13.5,1,1,-84.6,0,0,9.6,-5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).to({rotation:-78.6,y:16.5},6).to({rotation:-84.5,y:13.5},7).to({regY:-5.4,rotation:-77.7,x:-18.3,y:17.6},4).to({regY:-5.5,rotation:-61.7,y:19.6},3).to({regX:9.5,regY:-5.4,rotation:-111.9,x:16.7,y:-10.5},2).to({regX:9.4,regY:-5.3,rotation:-107.9,x:24.4,y:-11.1},6).to({regY:-5.4,rotation:-75.7,x:-19.4,y:14.4},3).to({regX:9.6,regY:-5.3,rotation:-84.5,x:-11.2,y:13.5},3).to({regX:9.5,rotation:-86.5,x:-8.3,y:16.7},3).to({x:-7.3,y:21.7},3).to({regY:-5.4,rotation:-101.3,x:-69.1,y:-13.6},2).to({regX:9.6,rotation:-77.7,x:-158.3,y:17.6},2).to({regY:-5.5,rotation:-61.7,y:19.6},4).to({regX:9.5,regY:-5.4,rotation:-111.9,x:-122.1,y:-10.5},1).to({regY:-5.3,rotation:-123.1,x:-120,y:-17.7},6).to({regX:9.3,rotation:-123.7,x:-114.2,y:-15.6},4).to({regX:9.6,regY:-5.5,rotation:-61.7,x:-158.3,y:19.6},1).to({x:-157.3,y:16.6},4).wait(3).to({x:-158.3,y:19.6},2).to({y:20.6},2).to({regY:-5.3,rotation:-129.7,x:-67.1,y:-34.6},2).to({rotation:-84.5,x:-11.2,y:15.5},2).to({y:13.5},2).wait(1).to({rotation:-81,x:-14.4,y:10.8},3).to({rotation:-76.2,x:-14.3},2).to({regY:-5.5,rotation:31.8,x:1.3,y:24.2},3).to({rotation:15.3,y:29.2},4).to({regX:9.5,rotation:-0.7},16).to({rotation:-54.4,x:1.4,y:32.1},1).to({regX:9.4,regY:-5.6,rotation:-69.9,x:1.3,y:29.1},4).wait(4).to({regX:9.6,regY:-5.4,rotation:-52,x:1.4,y:31.1},2).to({regX:9.5,regY:-5.3,rotation:-87,x:-11.9,y:13.5},4).to({regX:9.6,rotation:-84.5,x:-11.2},2).to({rotation:-78.6,y:16.5},7).to({rotation:-84.5,y:13.5},7).wait(1).to({rotation:-82,x:6.4,y:7.2},2).wait(1).to({rotation:-79.3,x:3,y:2.7},0).wait(1).to({scaleX:1,scaleY:1,rotation:-82,x:2.4,y:9.2},0).wait(1).to({x:3.4,y:4.2},0).wait(1).to({regY:-5.4,scaleX:1,scaleY:1,rotation:-85.5,x:9.9,y:9.6},0).wait(1).to({regY:-5.3,rotation:-84.5,x:-11.2,y:13.5},0).wait(2).to({rotation:-82,x:6.4,y:7.2},2).wait(1).to({rotation:-79.3,x:3,y:2.7},0).wait(1).to({scaleX:1,scaleY:1,rotation:-82,x:2.4,y:9.2},0).wait(1).to({x:3.4,y:4.2},0).wait(1).to({regY:-5.4,scaleX:1,scaleY:1,rotation:-85.5,x:9.9,y:9.6},0).wait(1).to({regY:-5.3,rotation:-82,x:6.4,y:7.2},0).wait(1).to({rotation:-79.3,x:3,y:2.7},0).wait(1).to({scaleX:1,scaleY:1,rotation:-82,x:2.4,y:9.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:-84.5,x:-11.2,y:13.5},0).wait(2).to({rotation:-26.3,x:-9.3,y:13.2},3).to({rotation:-94.3,x:-7.3,y:12.2},5).to({regX:9.8,rotation:-148.6,x:11.4,y:-5.8},2).to({regX:9.7,rotation:-94.5,x:16.3,y:-10.2},3).to({rotation:-92,x:18.1,y:-10.3},2).to({regX:9.6,regY:-5.4,rotation:-77.7,x:-18.3,y:17.6},3).to({regY:-5.3,rotation:-84.5,x:-11.2,y:13.5},2).to({regX:9.5,regY:-5.2,rotation:-84.4,x:-16.6,y:8.4},1).to({regY:-5.3,rotation:-126.4,x:-24.4,y:6.1},1).to({rotation:-143.6,x:-24.5,y:5.2},2).wait(3).to({rotation:-146.4,x:-25.3,y:6.8},2).to({regX:9.6,rotation:-84.5,x:-11.2,y:13.5},2).to({_off:true},3).wait(22));

	// body
	this.instance_27 = new lib.boss_body1();
	this.instance_27.setTransform(-25.9,34,1,1,-16.9,0,0,-5.9,12);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).to({scaleX:1,scaleY:1,rotation:-16.6,y:37.1},6).to({scaleX:1,scaleY:1,rotation:-16.8,y:34},7).to({rotation:-29.9,x:-27.8,y:39.9},4).to({y:41.9},3).to({regY:11.9,rotation:-4.4,x:-1.3,y:5.4},2).to({regX:-5.9,regY:12,rotation:-0.4,x:5,y:3.4},6).to({regX:-5.8,rotation:-37.6,x:-25.6,y:38.6},3).to({rotation:-16.8,x:-25.8,y:34},3).to({rotation:-25.2,x:-19.6,y:38.2},3).to({x:-18.6,y:42.2},3).to({regY:12.1,rotation:9,x:-89.1,y:-0.4},2).to({regY:12,rotation:-29.9,x:-167.8,y:39.9},2).to({rotation:-29.9,y:41.9},4).to({regY:11.9,rotation:-4.4,x:-140.3,y:5.4},1).to({regX:-5.9,regY:12,rotation:-15.6,x:-134.8,y:1.5},6).to({regY:11.8,rotation:-1.5,x:-133.1,y:-0.6},4).to({regX:-5.8,regY:12,rotation:-29.9,x:-167.8,y:41.9},1).to({x:-166.8,y:38.9},4).wait(3).to({x:-167.8,y:41.9},2).to({y:42.9},2).to({regY:12.1,rotation:-33.7,x:-74.9,y:-10.6},2).to({regY:12,rotation:-16.8,x:-25.8,y:36},2).to({y:34},2).wait(1).to({regX:-5.7,rotation:-26.2,x:-25.3,y:33.4},3).wait(2).to({regX:-5.8,rotation:30.5,x:-23.5,y:29.4},3).wait(20).to({rotation:30.5},0).to({y:32.4},1).to({y:29.4},2).wait(6).to({y:31.4},2).to({regY:12.1,rotation:-19.2,x:-25.4,y:34.6},4).to({regY:12,rotation:-16.8,x:-25.8,y:34},2).to({scaleX:1,scaleY:1,rotation:-16.6,y:37.1},7).to({scaleX:1,scaleY:1,rotation:-16.8,y:34},7).wait(1).to({regY:11.9,rotation:0,x:-13.3,y:22.7},2).wait(1).to({rotation:2.7,x:-17.5,y:17.3},0).wait(1).to({regX:-5.7,rotation:0,x:-17.2,y:24.7},0).wait(1).to({x:-16.2,y:19.7},0).wait(1).to({regX:-5.8,rotation:-3.5,x:-8.8,y:26.3},0).wait(1).to({regY:12,rotation:-16.8,x:-25.8,y:34},0).wait(2).to({regY:11.9,rotation:0,x:-13.3,y:22.7},2).wait(1).to({rotation:2.7,x:-17.5,y:17.3},0).wait(1).to({regX:-5.7,rotation:0,x:-17.2,y:24.7},0).wait(1).to({x:-16.2,y:19.7},0).wait(1).to({regX:-5.8,rotation:-3.5,x:-8.8,y:26.3},0).wait(1).to({rotation:0,x:-13.3,y:22.7},0).wait(1).to({rotation:2.7,x:-17.5,y:17.3},0).wait(1).to({regX:-5.7,rotation:0,x:-17.2,y:24.7},0).wait(1).to({regX:-5.8,regY:12,rotation:-16.8,x:-25.8,y:34},0).wait(2).to({rotation:-12,x:-25.5,y:32.6},3).wait(5).to({regX:-5.7,rotation:-12.5,x:-7.3,y:13.3},2).to({regY:11.9,rotation:-15.6,x:-1.5,y:9.6},3).to({rotation:-13.1,x:-0.5,y:8.8},2).to({regX:-5.8,regY:12,rotation:-29.9,x:-27.8,y:39.9},3).to({rotation:-16.8,x:-25.8,y:34},2).to({rotation:-30.7,y:31.8},1).to({rotation:-47.7,x:-26.4,y:31.3},1).wait(5).to({rotation:-50.5,x:-26,y:32.9},2).to({rotation:-16.8,x:-25.8,y:34},2).to({_off:true},3).wait(22));

	// legL_front
	this.instance_28 = new lib.boss_leg1();
	this.instance_28.setTransform(-4.4,46.1,1,1,0,0,0,1.5,-15.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(20).to({regY:-15.9,rotation:-21,x:-8.3,y:43.1},1).to({regX:1.7,regY:-15.7,rotation:65.7,x:-15.4,y:26.1},1).to({regX:1.6,regY:-15.8,scaleX:1,scaleY:1,rotation:112,x:-14.8,y:21},2).to({regY:-15.7,rotation:83.3,x:-13.8,y:20},2).to({regY:-15.8,scaleX:1,scaleY:1,rotation:120.9,x:-11.7,y:19.1},2).to({regX:1.5,scaleX:1,scaleY:1,rotation:50.5,x:-9.2,y:34.2},1).to({scaleX:1,scaleY:1,rotation:0,x:-4.3,y:43.1},1).to({y:46.1},1).wait(3).to({scaleY:0.9,y:51.1},3).wait(3).to({scaleY:1,rotation:56.7,x:-83.8,y:19.8},2).to({rotation:0,x:-144.3,y:46.1},2).wait(4).to({regY:-15.6,rotation:1,x:-154.3,y:26.2},1).to({regX:1.6,regY:-15.7,scaleX:1,scaleY:1,rotation:113.2,x:-152.6,y:22.6},3).to({scaleX:1,scaleY:1,rotation:120.9,x:-150.9,y:19.1},3).to({regX:1.5,rotation:130.1,x:-148.9,y:15.9},4).to({regY:-15.8,rotation:0,x:-144.3,y:46.1},1).wait(11).to({regX:1.6,rotation:53.9,x:-69.9,y:7.3},2).to({regX:1.5,rotation:0,x:-4.3,y:46.1},2).wait(63).to({rotation:42.5,x:-0.8,y:43.1},2).wait(1).to({regX:1.6,scaleX:1,scaleY:1,rotation:45.1,x:-5.9,y:38.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:42.4,x:-4.7,y:45.2},0).wait(1).to({x:-3.7,y:40.2},0).wait(1).to({regY:-15.9,scaleX:1,scaleY:1,rotation:39,x:5,y:45.8},0).wait(1).to({regX:1.5,regY:-15.8,rotation:0,x:-4.3,y:46.1},0).wait(2).to({rotation:42.5,x:-0.8,y:43.1},2).wait(1).to({regX:1.6,scaleX:1,scaleY:1,rotation:45.1,x:-5.9,y:38.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:42.4,x:-4.7,y:45.2},0).wait(1).to({x:-3.7,y:40.2},0).wait(1).to({regY:-15.9,scaleX:1,scaleY:1,rotation:39,x:5,y:45.8},0).wait(1).to({regX:1.5,regY:-15.8,rotation:42.5,x:-0.8,y:43.1},0).wait(1).to({regX:1.6,scaleX:1,scaleY:1,rotation:45.1,x:-5.9,y:38.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:42.4,x:-4.7,y:45.2},0).wait(1).to({regX:1.5,scaleX:1,scaleY:1,rotation:0,x:-4.3,y:46.1},0).wait(10).to({regX:1.6,regY:-15.7,rotation:11.5,x:-7.5,y:35.1},2).to({regX:1.5,rotation:7.2,x:-6.1,y:32.1},3).to({regY:-15.8,rotation:9.7,x:-6.2,y:31},2).to({rotation:0,x:-4.3,y:46.1},3).wait(13).to({_off:true},3).wait(22));

	// legL_back
	this.instance_29 = new lib.boss_leg1();
	this.instance_29.setTransform(30.5,43.6,1.06,1.06,0,0,0,1.4,-16.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(40).to({regX:1.5,regY:-16.4,rotation:-36.3,x:-39.7,y:25.5},2).to({regX:1.4,regY:-16.3,rotation:0,x:-109.3,y:43.6},2).wait(4).to({x:-108.3},1).wait(10).to({x:-109.3},1).wait(11).to({rotation:18.6,x:-26,y:17.2},2).to({rotation:0,x:30.5,y:43.6},2).wait(65).wait(1).to({rotation:2.7,x:25.4,y:40.2},0).wait(1).to({rotation:0,x:26.6,y:45.6},0).wait(1).to({x:27.6,y:40.6},0).wait(1).to({rotation:-3.3,x:36.3,y:44.4},0).wait(1).to({rotation:0,x:30.5,y:43.6},0).wait(4).wait(1).to({rotation:2.7,x:25.4,y:40.2},0).wait(1).to({rotation:0,x:26.6,y:45.6},0).wait(1).to({x:27.6,y:40.6},0).wait(1).to({rotation:-3.3,x:36.3,y:44.4},0).wait(1).to({rotation:0,x:30.5,y:43.6},0).wait(1).to({rotation:2.7,x:25.4,y:40.2},0).wait(1).to({rotation:0,x:26.6,y:45.6},0).wait(1).to({x:30.5,y:43.6},0).wait(33).to({_off:true},3).wait(22));

	// body2
	this.instance_30 = new lib.boss_boy2();
	this.instance_30.setTransform(-3.9,45);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).to({y:48},6).to({y:45},7).to({rotation:-3,x:-4.4,y:49.4},4).to({y:51.4},3).to({rotation:39.3,x:4.9,y:31.2},2).to({rotation:50.5,x:8.4,y:29.4},6).to({rotation:-4.8,x:-4.1,y:48.4},3).to({rotation:0,x:-3.8,y:45},3).to({rotation:-6.5,x:0.1,y:47.7},3).to({x:1.1},3).to({rotation:14.5,x:-73.5,y:18.2},2).to({rotation:-3,x:-144.4,y:49.4},2).to({rotation:-3,y:51.4},4).to({rotation:39.3,x:-133.9,y:31.2},1).to({rotation:50.5,x:-130.5,y:29.4},6).to({rotation:56.5,x:-129.9,y:28.4},4).to({rotation:-3,x:-144.4,y:51.4},1).to({rotation:-3,x:-143.4,y:48.4},4).wait(3).to({x:-144.4,y:51.4},2).to({y:52.4},2).to({rotation:18.9,x:-59.1,y:7.3},2).to({rotation:0,x:-3.8,y:47},2).to({y:45},2).wait(6).to({rotation:17,x:-8.1,y:47.5},3).wait(20).to({y:50.5},1).to({y:47.5},2).wait(6).to({y:49.5},2).to({rotation:-2.3,x:-3.1,y:44.6},4).to({rotation:0,x:-3.8,y:45},2).to({y:48},7).to({y:45},7).wait(1).to({rotation:13.5,x:2.8,y:41.2},2).wait(1).to({scaleX:1,scaleY:1,rotation:16,x:-2.1,y:36.4},0).wait(1).to({rotation:13.3,x:-1.1,y:43.2},0).wait(1).to({x:0,y:38.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:10,x:8.5,y:43.6},0).wait(1).to({rotation:0,x:-3.8,y:45},0).wait(2).to({rotation:13.5,x:2.8,y:41.2},2).wait(1).to({scaleX:1,scaleY:1,rotation:16,x:-2.1,y:36.4},0).wait(1).to({rotation:13.3,x:-1.1,y:43.2},0).wait(1).to({x:0,y:38.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:10,x:8.5,y:43.6},0).wait(1).to({rotation:13.5,x:2.8,y:41.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:16,x:-2.1,y:36.4},0).wait(1).to({rotation:13.3,x:-1.1,y:43.2},0).wait(1).to({scaleX:1,scaleY:1,rotation:0,x:-3.8,y:45},0).wait(10).to({rotation:21.7,x:6,y:36.6},2).to({rotation:35.4,x:6.7,y:36.7},3).to({rotation:37.9,x:6.5,y:36.2},2).to({rotation:-3,x:-4.4,y:49.4},3).to({rotation:0,x:-3.8,y:45},2).wait(7).to({x:-4.8,y:47},2).to({x:-3.8,y:45},2).to({_off:true},3).wait(22));

	// legR_front
	this.instance_31 = new lib.boss_leg2();
	this.instance_31.setTransform(-39.4,47.6,1,1,0,0,0,9.5,-16.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(20).to({regY:-16.2,rotation:-26.5,x:-35.2,y:40.7},1).to({regX:9.6,regY:-16.4,rotation:82,x:-19.3,y:13.6},1).to({regX:9.5,regY:-16.2,rotation:69.9,x:-18.9,y:10.3},2).to({scaleX:1,scaleY:1,rotation:106.2,x:-16.3,y:8},2).to({regX:9.6,regY:-16.4,scaleX:1,scaleY:1,rotation:102.4,x:-13.8,y:5.9},2).to({scaleX:1,scaleY:1,rotation:49.2,x:-22.2,y:19.9},1).to({regX:9.5,regY:-16.3,scaleX:1,scaleY:1,rotation:0,x:-34.3,y:40.6},1).to({x:-39.3,y:47.6},1).wait(3).to({scaleY:0.9,rotation:7,x:-31.3,y:52.6},3).wait(3).to({scaleY:1,rotation:51.7,x:-108.6,y:11.9},2).to({rotation:0,x:-179.3,y:47.6},2).wait(4).to({rotation:25.8,x:-160.8,y:11.7},1).to({scaleX:1,scaleY:1,rotation:131.7,x:-155.3,y:9.8},3).to({regX:9.6,scaleX:1,scaleY:1,rotation:115.9,x:-149.8,y:7.9},3).to({regY:-16.4,rotation:121.9,x:-149.6,y:2.6},4).to({regX:9.5,regY:-16.3,rotation:0,x:-179.3,y:47.6},1).wait(11).to({regX:9.6,rotation:53.6,x:-90.5,y:-1.2},2).to({regX:9.5,rotation:0,x:-39.3,y:47.6},2).wait(63).to({regX:9.6,rotation:46.7,x:-29,y:35.5},2).wait(1).to({regX:9.5,scaleX:1,scaleY:1,rotation:49.4,x:-33.8,y:29.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:46.6,x:-33.1,y:37.5},0).wait(1).to({x:-32.1,y:32.5},0).wait(1).to({regX:9.6,regY:-16.2,scaleX:1,scaleY:1,rotation:43.2,x:-23.8,y:40},0).wait(1).to({regX:9.5,regY:-16.3,rotation:0,x:-39.3,y:47.6},0).wait(2).to({regX:9.6,rotation:46.7,x:-29,y:35.5},2).wait(1).to({regX:9.5,scaleX:1,scaleY:1,rotation:49.4,x:-33.8,y:29.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:46.6,x:-33.1,y:37.5},0).wait(1).to({x:-32.1,y:32.5},0).wait(1).to({regX:9.6,regY:-16.2,scaleX:1,scaleY:1,rotation:43.2,x:-23.8,y:40},0).wait(1).to({regY:-16.3,rotation:46.7,x:-29,y:35.5},0).wait(1).to({regX:9.5,scaleX:1,scaleY:1,rotation:49.4,x:-33.8,y:29.3},0).wait(1).to({scaleX:1,scaleY:1,rotation:46.6,x:-33.1,y:37.5},0).wait(1).to({scaleX:1,scaleY:1,rotation:0,x:-39.3,y:47.6},0).wait(10).to({regX:9.6,regY:-16.4,rotation:10.3,x:-27.6,y:27.3},2).to({regY:-16.3,rotation:-3.3,x:-23.7,y:19.8},3).to({rotation:-0.8,x:-23.2,y:18},2).to({regX:9.5,rotation:0,x:-39.3,y:47.6},3).wait(13).to({_off:true},3).wait(22));

	// legR_back
	this.instance_32 = new lib.boss_leg2();
	this.instance_32.setTransform(9,48.1,1,1,0,0,0,9,-15.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(40).to({regY:-15.9,rotation:-46.8,x:-61.7,y:24.4},2).to({regY:-15.8,rotation:0,x:-130.8,y:48.1},2).wait(4).to({x:-129.8},1).wait(10).to({x:-130.8},1).wait(11).to({rotation:20.2,x:-47.8,y:14.4},2).to({rotation:0,x:9,y:48.1},2).wait(65).wait(1).to({regY:-15.9,rotation:2.7,x:3.6,y:43.6},0).wait(1).to({regY:-15.8,rotation:0,x:5,y:50.1},0).wait(1).to({x:6,y:45.1},0).wait(1).to({rotation:-3.3,x:15.1,y:50.2},0).wait(1).to({rotation:0,x:9,y:48.1},0).wait(4).wait(1).to({regY:-15.9,rotation:2.7,x:3.6,y:43.6},0).wait(1).to({regY:-15.8,rotation:0,x:5,y:50.1},0).wait(1).to({x:6,y:45.1},0).wait(1).to({rotation:-3.3,x:15.1,y:50.2},0).wait(1).to({rotation:0,x:9,y:48.1},0).wait(1).to({regY:-15.9,rotation:2.7,x:3.6,y:43.6},0).wait(1).to({regY:-15.8,rotation:0,x:5,y:50.1},0).wait(1).to({x:9,y:48.1},0).wait(33).to({_off:true},3).wait(22));

	// tail
	this.instance_33 = new lib.boss_tail();
	this.instance_33.setTransform(29.1,31.5,1,1,0,0,0,-9.9,14.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).to({regY:14.6,rotation:12.2,y:34.6},6).to({regY:14.5,rotation:0,y:31.5},7).to({rotation:15.1,x:27.7,y:34.2},4).to({regX:-9.9,regY:14.4,rotation:31.1,y:36.2},3).to({regX:-9.8,regY:14.5,rotation:6.4,x:39.1,y:41.7},2).to({regY:14.4,rotation:-3,x:39.9,y:46.2},6).to({regY:14.5,rotation:8.5,x:27.6,y:29.2},3).to({rotation:0,x:29.1,y:31.5},3).to({regY:14.6,rotation:-18.2,x:31.4,y:30.5},3).to({rotation:-27.2,x:32.4},3).to({rotation:50.7,x:-37.2,y:9.7},2).to({regY:14.5,rotation:15.1,x:-112.1,y:34.2},2).to({regX:-9.9,regY:14.4,rotation:31.1,x:-112.2,y:36.2},4).to({regX:-9.8,regY:14.5,rotation:6.4,x:-99.7,y:41.7},1).to({regY:14.4,rotation:-3,x:-98.9,y:46.2},6).to({rotation:2.8,x:-100.2,y:48.4},4).to({regX:-9.9,rotation:31.1,x:-112.2,y:36.2},1).to({x:-111.2,y:33.2},4).wait(3).to({x:-112.2,y:36.2},2).to({y:37.2},2).to({rotation:52.7,x:-22.5,y:4},2).to({regX:-9.8,regY:14.5,rotation:0,x:29.1,y:33.5},2).to({y:31.5},2).wait(6).to({regY:14.6,rotation:62.5,x:34.3,y:44.3},3).wait(20).to({regY:14.5,rotation:98,x:34.4,y:47.4},1).to({y:44.3},2).wait(6).to({rotation:102,x:34.2,y:46.4},2).to({regX:-9.9,regY:14.4,rotation:-2.3,x:29.1,y:29.7},4).to({regX:-9.8,regY:14.5,rotation:0,y:31.5},2).to({regY:14.6,rotation:12.2,y:34.6},7).to({regY:14.5,rotation:0,y:31.5},7).wait(1).to({regX:-9.9,rotation:66.7,x:41.6,y:36.8},2).wait(1).to({regY:14.6,scaleX:1,scaleY:1,rotation:69.4,x:36.7,y:33.9},0).wait(1).to({scaleX:1,scaleY:1,rotation:66.7,x:37.5,y:38.8},0).wait(1).to({x:38.5,y:33.9},0).wait(1).to({regX:-9.8,scaleX:1,scaleY:1,rotation:63.2,x:46.9,y:37},0).wait(1).to({regY:14.5,rotation:0,x:29.1,y:31.5},0).wait(2).to({regX:-9.9,rotation:66.7,x:41.6,y:36.8},2).wait(1).to({regY:14.6,scaleX:1,scaleY:1,rotation:69.4,x:36.7,y:33.9},0).wait(1).to({scaleX:1,scaleY:1,rotation:66.7,x:37.5,y:38.8},0).wait(1).to({x:38.5,y:33.9},0).wait(1).to({regX:-9.8,scaleX:1,scaleY:1,rotation:63.2,x:46.9,y:37},0).wait(1).to({regX:-9.9,regY:14.5,rotation:66.7,x:41.6,y:36.8},0).wait(1).to({regY:14.6,scaleX:1,scaleY:1,rotation:69.4,x:36.7,y:33.9},0).wait(1).to({scaleX:1,scaleY:1,rotation:66.7,x:37.5,y:38.8},0).wait(1).to({regX:-9.8,regY:14.5,scaleX:1,scaleY:1,rotation:0,x:29.1,y:31.5},0).wait(2).to({rotation:-15.7},3).to({rotation:0},5).to({regX:-9.9,regY:14.6,rotation:49.2,x:41.7,y:36.4},2).to({regX:-9.8,rotation:74.3,x:41.4,y:45},3).to({rotation:76.8,x:40.8,y:46},2).to({regY:14.5,rotation:15.1,x:27.7,y:34.2},3).to({rotation:0,x:29.1,y:31.5},2).to({regY:14.6,rotation:-31.2},1).to({regX:-9.7,rotation:-35.6},1).wait(5).to({regX:-9.8,rotation:-41.8,x:29},2).to({regY:14.5,rotation:0,x:29.1},2).to({_off:true},3).wait(22));

	// armR
	this.instance_34 = new lib.boss_armR();
	this.instance_34.setTransform(-33.3,16.5,0.899,0.899,-77.9,0,0,28,13.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).to({regX:27.9,rotation:-87,x:-33.3,y:19.6},6).to({regX:28,rotation:-77.8,x:-33.2,y:16.5},7).to({regX:27.9,regY:13.4,rotation:-108.2,x:-39.1,y:24.6},4).to({y:26.6},3).to({regY:13.5,rotation:-52.2,x:-4.9,y:-13.1},2).to({rotation:-48.2,x:2.8,y:-15.3},6).to({rotation:-98.7,x:-38.8,y:25},3).to({regX:28,rotation:-77.8,x:-33.2,y:16.5},3).to({regX:27.9,rotation:-106.7,x:-29.7,y:21.9},3).to({x:-28.7,y:25.9},3).to({rotation:-5.2,x:-92.2,y:-17.5},2).to({regY:13.4,rotation:-108.2,x:-179.1,y:24.6},2).to({y:26.6},4).to({regY:13.5,rotation:-52.2,x:-143.9,y:-13.1},1).to({rotation:-63.4,x:-142,y:-16},6).to({regX:27.8,rotation:-67.7,x:-135.8,y:-19.4},4).to({regX:27.9,regY:13.4,rotation:-108.2,x:-179.1,y:26.6},1).to({x:-178.1,y:23.6},4).wait(3).to({x:-179.1,y:26.6},2).to({y:27.6},2).to({regX:28.1,regY:13.5,rotation:-92.1,x:-85,y:-27.5},2).to({regX:28,rotation:-77.8,x:-33.2,y:18.5},2).to({y:16.5},2).wait(1).to({regX:27.9,rotation:-96.2,x:-35.7,y:17.4},3).to({rotation:-100.7,x:-35.6,y:17.3},2).to({regX:28,regY:13.4,scaleX:1,scaleY:1,rotation:64.5,x:-17.8,y:12},3).wait(20).to({rotation:64.5},0).to({y:15},1).to({y:12},2).wait(6).to({rotation:67.7,y:14},2).to({scaleX:0.9,scaleY:0.9,rotation:-80.3,x:-33.9,y:17.4},4).to({regY:13.5,rotation:-77.8,x:-33.2,y:16.5},2).to({regX:27.9,rotation:-87,x:-33.3,y:19.6},7).to({regX:28,rotation:-77.8,x:-33.2,y:16.5},7).wait(1).to({regX:27.9,regY:13.4,rotation:-81,x:-15.5,y:3.9},2).wait(1).to({rotation:-78.3,x:-18.8,y:-1.6},0).wait(1).to({rotation:-81,x:-19.6,y:5.8},0).wait(1).to({x:-18.6,y:0.9},0).wait(1).to({regY:13.3,rotation:-84.5,x:-12.1,y:7.5},0).wait(1).to({regX:28,regY:13.5,rotation:-77.8,x:-33.2,y:16.5},0).wait(2).to({regX:27.9,regY:13.4,rotation:-81,x:-15.5,y:3.9},2).wait(1).to({rotation:-78.3,x:-18.8,y:-1.6},0).wait(1).to({rotation:-81,x:-19.6,y:5.8},0).wait(1).to({x:-18.6,y:0.9},0).wait(1).to({regY:13.3,rotation:-84.5,x:-12.1,y:7.5},0).wait(1).to({regY:13.4,rotation:-81,x:-15.5,y:3.9},0).wait(1).to({rotation:-78.3,x:-18.8,y:-1.6},0).wait(1).to({rotation:-81,x:-19.6,y:5.8},0).wait(1).to({regX:28,regY:13.5,rotation:-77.8,x:-33.2,y:16.5},0).wait(2).to({regX:27.9,regY:13.4,rotation:-14.1,x:-30.6,y:15.4},3).to({rotation:-14.1},5).to({regY:13.5,rotation:-14.6,x:-12.7,y:-3.6},2).to({rotation:-73.1,x:-10.9,y:-7.8},3).to({rotation:-70.6,x:-9.2,y:-9},2).to({regY:13.4,rotation:-108.2,x:-39.1,y:24.6},3).to({regX:28,regY:13.5,rotation:-77.8,x:-33.2,y:16.5},2).to({regX:27.9,regY:13.6,rotation:-71.2,x:-37.2,y:16.7},1).to({regY:13.5,rotation:-108.7,x:-41.8,y:20.2},1).to({regY:13.6,rotation:-116.9,x:-41.7,y:20.1},2).wait(3).to({regY:13.7,rotation:-119.7,y:22.6},2).to({regX:28,regY:13.5,rotation:-77.8,x:-33.2,y:16.5},2).to({_off:true},3).wait(22));

	// eff_die2
	this.instance_35 = new lib.gra_effBakuha1();
	this.instance_35.setTransform(-22.9,15);
	this.instance_35.alpha = 0.5;
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(204).to({_off:false},0).wait(2).to({scaleX:2.38,scaleY:2.38,alpha:1},1).to({scaleX:4.2,scaleY:4.2,rotation:30,alpha:0.5},2).to({scaleX:5.01,scaleY:5.01,rotation:33.1,alpha:0.148},2).to({_off:true},1).wait(3));

	// eff_die1
	this.instance_36 = new lib.gra_effBakuha2("synched",0);
	this.instance_36.setTransform(60.5,73,1.872,1.913,124.4);

	this.instance_37 = new lib.gra_effBakuha2("synched",0);
	this.instance_37.setTransform(-103.4,81,2.169,2.661,-124.9);

	this.instance_38 = new lib.gra_effBakuha2("synched",0);
	this.instance_38.setTransform(-143.4,-55.9,2.555,4.579,-65.6);

	this.instance_39 = new lib.gra_effBakuha2("synched",0);
	this.instance_39.setTransform(34.5,-69.9,2.368,3.162,31.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_39},{t:this.instance_38},{t:this.instance_37,p:{scaleX:2.169,scaleY:2.661,rotation:-124.9,x:-103.4,y:81}},{t:this.instance_36,p:{scaleX:1.872,scaleY:1.913,rotation:124.4,x:60.5,y:73}}]},207).to({state:[{t:this.instance_37,p:{scaleX:2.368,scaleY:3.162,rotation:-26.3,x:-91.4,y:-120.9}},{t:this.instance_36,p:{scaleX:2.368,scaleY:3.162,rotation:-102.8,x:-185.4,y:45}}]},1).to({state:[]},1).to({state:[]},5).wait(1));

	// eff_dieBall
	this.instance_40 = new lib.mc_effLigthBall();
	this.instance_40.setTransform(-23.9,20,0.4,0.4);
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(193).to({_off:false},0).to({scaleX:0.6,scaleY:0.6},11).to({_off:true},1).wait(10));

	// eff_dieLine
	this.instance_41 = new lib.mc_effLightLine();
	this.instance_41.setTransform(-54.9,-57.4,0.62,1,-23.1,0,0,0,-80.5);

	this.instance_42 = new lib.mc_effLightLine();
	this.instance_42.setTransform(-54.9,-57.4,0.62,1,-23.1,0,0,0,-80.5);

	this.instance_43 = new lib.mc_effLightLine();
	this.instance_43.setTransform(47.3,51.9,0.62,1,111.8,0,0,0,-80.5);

	this.instance_44 = new lib.mc_effLightLine();
	this.instance_44.setTransform(-54.9,-57.4,0.62,1,-23.1,0,0,0,-80.5);

	this.instance_45 = new lib.mc_effLightLine();
	this.instance_45.setTransform(-54.9,-57.4,0.62,1,-23.1,0,0,0,-80.5);

	this.instance_46 = new lib.mc_effLightLine();
	this.instance_46.setTransform(47.3,51.9,0.62,1,111.8,0,0,0,-80.5);

	this.instance_47 = new lib.mc_effLightLine();
	this.instance_47.setTransform(-54.9,-57.4,0.62,1,-23.1,0,0,0,-80.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_41,p:{rotation:-23.1,x:-54.9,y:-57.4,scaleX:0.62,scaleY:1,regX:0,regY:-80.5}}]},194).to({state:[{t:this.instance_42,p:{scaleX:0.62,scaleY:1,rotation:-23.1,x:-54.9,y:-57.4,regX:0}},{t:this.instance_41,p:{rotation:111.8,x:47.3,y:51.9,scaleX:0.62,scaleY:1,regX:0,regY:-80.5}}]},3).to({state:[{t:this.instance_44,p:{rotation:-23.1,x:-54.9,y:-57.4,scaleX:0.62,scaleY:1}},{t:this.instance_43,p:{scaleX:0.62,scaleY:1,rotation:111.8,x:47.3,y:51.9}},{t:this.instance_42,p:{scaleX:0.928,scaleY:0.859,rotation:51.8,x:35.5,y:-19.9,regX:0}},{t:this.instance_41,p:{rotation:-143.1,x:-64.3,y:71.8,scaleX:0.928,scaleY:0.859,regX:0,regY:-80.5}}]},2).to({state:[{t:this.instance_45,p:{regY:-80.5,scaleY:1,rotation:-23.1,x:-54.9,y:-57.4}},{t:this.instance_44,p:{rotation:111.8,x:47.3,y:51.9,scaleX:0.62,scaleY:1}},{t:this.instance_43,p:{scaleX:0.928,scaleY:0.859,rotation:51.8,x:35.5,y:-19.9}},{t:this.instance_42,p:{scaleX:0.928,scaleY:0.859,rotation:-143.1,x:-64.3,y:71.8,regX:0}},{t:this.instance_41,p:{rotation:-56.1,x:-112.2,y:-35.9,scaleX:0.62,scaleY:1.459,regX:-0.1,regY:-80.5}}]},2).to({state:[{t:this.instance_47},{t:this.instance_46},{t:this.instance_45,p:{regY:-80.4,scaleY:1.517,rotation:-98.1,x:-145.1,y:40}},{t:this.instance_44,p:{rotation:51.8,x:35.5,y:-19.9,scaleX:0.928,scaleY:0.859}},{t:this.instance_43,p:{scaleX:0.928,scaleY:0.859,rotation:-143.1,x:-64.3,y:71.8}},{t:this.instance_42,p:{scaleX:0.62,scaleY:1.459,rotation:-56.1,x:-112.2,y:-35.9,regX:-0.1}},{t:this.instance_41,p:{rotation:29.6,x:13.6,y:-51.8,scaleX:0.62,scaleY:1,regX:0,regY:-80.4}}]},1).to({state:[]},3).to({state:[]},9).wait(1));

	// deathAnime
	this.instance_48 = new lib.boss_All();
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(193).to({_off:false},0).to({_off:true},15).wait(7));

	// shadow
	this.mc_shadow = new lib.gra_shadow();
	this.mc_shadow.setTransform(-9.9,87,1.27,0.5);

	this.timeline.addTween(cjs.Tween.get(this.mc_shadow).to({scaleX:1.36},6).to({scaleX:1.27},7).to({scaleX:1.32},4).wait(3).to({scaleX:1.26},2).wait(6).to({scaleX:1.33},3).to({scaleX:1.27},3).to({scaleX:1.32},3).wait(3).to({scaleX:1.44,x:-69.8,alpha:0.699},2).to({scaleX:1.32,x:-156.8,alpha:1},2).wait(4).to({scaleX:1.17},4).wait(7).to({scaleX:1.3,x:-159.8},1).wait(11).to({scaleX:1.32,x:-62.8,alpha:0.699},2).to({scaleX:1.27,x:-9.8,alpha:1},2).wait(92).to({scaleX:1.14,x:-7.8},5).wait(2).to({scaleX:1.34,x:-9.8},3).to({scaleX:1.27},2).to({scaleX:1.34},1).wait(8).to({scaleX:1.27},2).to({_off:true},18).wait(7));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.9,-7.9,119.2,100.8);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;