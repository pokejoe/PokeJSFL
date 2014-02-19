//メイン
CreateAvater = function( AvatarMC, Config )
{
	this.AvatarMC = AvatarMC;
	this.Config = Config;
	this.MC = new Object();
	
	this.log ="";
	
	this.efList = new Object();
	this.preEfList = new Object();
	this.loadedEfList = {};

	(lib.EmptyMC = function() {
		this.initialize();
	}).prototype = p = new createjs.Container();

	//this.AvatarMC.removeAllChildren();
	this.AvatarMC.shape.setTransform(2000, 2000); 
	this.setDummyMC();
	this.setBody();
	this.setEyebrow();
	this.setEye();
	this.setFaceAcce();
	this.setMake();
	this.setHair();
	this.setArmor();
	if(Config.helmetId != null) this.setHelmet();
	if(Config.leftWeponId != null) this.setLeftWepon();
	if(Config.rightWeponId != null) this.setRightWepon();
	if(Config.isShadow) this.setShadow();
	
	this.AvatarMC.AvaterObj = this;
	this.AvatarMC.onTick = CreateAvater.prototype._moveTick;
}

//影の生成
CreateAvater.prototype.setShadow = function()
{
	this.MC.ShadowMC.bmp = new createjs.Bitmap( images["shadow"] );
	this.MC.ShadowMC.bmp.setTransform( -110, -10 ,this.Config.pixelRate, this.Config.pixelRate ); 
	this.MC.ShadowMC.addChildAt( this.MC.ShadowMC.bmp );
}

//アバター用のMC入れ子生成
CreateAvater.prototype.setDummyMC = function(isReset)
{
	//Shadow
	this.MC.ShadowMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.ShadowMC);
	
	//HairBack
	this.MC.HairBackMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.HairBackMC);
	
	//BodyBack
	this.MC.BodyBackMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.BodyBackMC);
	this.MC.BodyBackAttach = new lib.EmptyMC();
	this.MC.BodyBackMC.addChild(this.MC.BodyBackAttach);
	
	//LeftArm
	this.MC.LeftArmMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.LeftArmMC);
	this.MC.LeftArmBody = new lib.EmptyMC();
	this.MC.LeftArmMC.addChild(this.MC.LeftArmBody);
	this.MC.LeftArmAttach = new lib.EmptyMC();
	this.MC.LeftArmMC.addChild(this.MC.LeftArmAttach);
	
	this.MC.LeftHandMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.LeftHandMC);
	this.MC.LeftHandBody = new lib.EmptyMC();
	this.MC.LeftHandMC.addChild(this.MC.LeftHandBody);
	this.MC.LeftHandAttach = new lib.EmptyMC();
	this.MC.LeftHandMC.addChild(this.MC.LeftHandAttach);

	this.MC.LeftArmMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.LeftArmMC);
	this.MC.LeftArmBody = new lib.EmptyMC();
	this.MC.LeftArmMC.addChild(this.MC.LeftArmBody);
	
	this.MC.LeftHandMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.LeftHandMC);
	this.MC.LeftHandBody = new lib.EmptyMC();
	this.MC.LeftHandMC.addChild(this.MC.LeftHandBody);

	this.MC.LeftArm2MC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.LeftArm2MC);
	this.MC.LeftArmAttach = new lib.EmptyMC();
	this.MC.LeftArm2MC.addChild(this.MC.LeftArmAttach);
	
	this.MC.LeftHand2MC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.LeftHand2MC);
	this.MC.LeftHandAttach = new lib.EmptyMC();
	this.MC.LeftHand2MC.addChild(this.MC.LeftHandAttach);

	//LeftWepon
	this.MC.LeftWeponMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.LeftWeponMC);

	//HelmetBack
	this.MC.HelmetBackMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.HelmetBackMC);

	//HipBack & LeftLeg
	this.MC.HipBackMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.HipBackMC);
	this.MC.HipBackAttach = new lib.EmptyMC();
	this.MC.HipBackMC.addChild(this.MC.HipBackAttach);

	this.MC.HipBackAttach = new lib.EmptyMC();
	this.MC.HipBackMC.addChild(this.MC.HipBackAttach);

	this.MC.LeftLegMC = new lib.EmptyMC();
	this.MC.HipBackMC.addChild(this.MC.LeftLegMC);
	this.MC.LeftLegMC.setTransform(13, 32);

	this.MC.LeftLegBody = new lib.EmptyMC();
	this.MC.LeftLegMC.addChild(this.MC.LeftLegBody);
	
	this.MC.LeftFootMC = new lib.EmptyMC();
	this.MC.LeftLegMC.addChild(this.MC.LeftFootMC);
	this.MC.LeftFootMC.setTransform(1, 30);
	this.MC.LeftFootBody = new lib.EmptyMC();
	this.MC.LeftFootMC.addChild(this.MC.LeftFootBody);
	
	this.MC.LeftTiptoeMC = new lib.EmptyMC();
	this.MC.LeftFootMC.addChild(this.MC.LeftTiptoeMC);
	this.MC.LeftTiptoeMC.setTransform(1, 28);
	this.MC.LeftTiptoeBody = new lib.EmptyMC();
	this.MC.LeftTiptoeMC.addChild(this.MC.LeftTiptoeBody);

	this.MC.LeftLeg2MC = new lib.EmptyMC();
	this.MC.HipBackMC.addChild(this.MC.LeftLeg2MC);
	this.MC.LeftLeg2MC.setTransform(13, 32);

	this.MC.LeftLegAttach = new lib.EmptyMC();
	this.MC.LeftLeg2MC.addChild(this.MC.LeftLegAttach);
	
	this.MC.LeftFoot2MC = new lib.EmptyMC();
	this.MC.LeftLeg2MC.addChild(this.MC.LeftFoot2MC);
	this.MC.LeftFoot2MC.setTransform(1, 30);
	this.MC.LeftFootAttach = new lib.EmptyMC();
	this.MC.LeftFoot2MC.addChild(this.MC.LeftFootAttach);
	
	this.MC.LeftTiptoe2MC = new lib.EmptyMC();
	this.MC.LeftFoot2MC.addChild(this.MC.LeftTiptoe2MC);
	this.MC.LeftTiptoe2MC.setTransform(1, 28);
	this.MC.LeftTiptoeAttach = new lib.EmptyMC();
	this.MC.LeftTiptoe2MC.addChild(this.MC.LeftTiptoeAttach);

	//BodyCenter
	this.MC.BodyCenterMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.BodyCenterMC);
	this.MC.BodyCenterBody = new lib.EmptyMC();
	this.MC.BodyCenterMC.addChild(this.MC.BodyCenterBody);

	//HipCenter & RightLeg
	this.MC.HipCenterMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.HipCenterMC);
	this.MC.HipCenterBody = new lib.EmptyMC();
	this.MC.HipCenterMC.addChild(this.MC.HipCenterBody);
	
	this.MC.RightLegMC = new lib.EmptyMC();
	this.MC.HipCenterMC.addChild(this.MC.RightLegMC);
	this.MC.RightLegMC.setTransform(41, 31);
	this.MC.RightLegBody = new lib.EmptyMC();
	this.MC.RightLegMC.addChild(this.MC.RightLegBody);

	this.MC.RightFootMC = new lib.EmptyMC();
	this.MC.RightLegMC.addChild(this.MC.RightFootMC);
	this.MC.RightFootMC.setTransform(3, 30);
	this.MC.RightFootBody = new lib.EmptyMC();
	this.MC.RightFootMC.addChild(this.MC.RightFootBody);
	
	this.MC.RightTiptoeMC = new lib.EmptyMC();
	this.MC.RightFootMC.addChild(this.MC.RightTiptoeMC);
	this.MC.RightTiptoeMC.setTransform(2, 28);
	this.MC.RightTiptoeBody = new lib.EmptyMC();
	this.MC.RightTiptoeMC.addChild(this.MC.RightTiptoeBody);

	//BodyCenter - Attach
	this.MC.BodyCenter2MC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.BodyCenter2MC);
	this.MC.BodyCenterAttach = new lib.EmptyMC();
	this.MC.BodyCenter2MC.addChild(this.MC.BodyCenterAttach);

	//HipCenter & RightLeg - Attach
	this.MC.HipCenterAttach = new lib.EmptyMC();
	this.MC.HipCenterMC.addChild(this.MC.HipCenterAttach);
	
	this.MC.RightLeg2MC = new lib.EmptyMC();
	this.MC.HipCenterMC.addChild(this.MC.RightLeg2MC);
	this.MC.RightLeg2MC.setTransform(41, 31);
	this.MC.RightLegAttach = new lib.EmptyMC();
	this.MC.RightLeg2MC.addChild(this.MC.RightLegAttach);

	this.MC.RightFoot2MC = new lib.EmptyMC();
	this.MC.RightLeg2MC.addChild(this.MC.RightFoot2MC);
	this.MC.RightFoot2MC.setTransform(3, 30);
	this.MC.RightFootAttach = new lib.EmptyMC();
	this.MC.RightFoot2MC.addChild(this.MC.RightFootAttach);
	
	this.MC.RightTiptoe2MC = new lib.EmptyMC();
	this.MC.RightFoot2MC.addChild(this.MC.RightTiptoe2MC);
	this.MC.RightTiptoe2MC.setTransform(2, 28);
	this.MC.RightTiptoeAttach = new lib.EmptyMC();
	this.MC.RightTiptoe2MC.addChild(this.MC.RightTiptoeAttach);

	//Head
	this.MC.HeadMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.HeadMC);
	
	this.MC.FaceMC = new lib.EmptyMC();
	this.MC.HeadMC.addChild(this.MC.FaceMC);
	this.MC.FaceBody = new lib.EmptyMC();
	this.MC.FaceMC.addChild(this.MC.FaceBody);
	this.MC.FaceMC.setTransform(-57, -110);

	//Make
	this.MC.MakeMC = new lib.EmptyMC();
	this.MC.HeadMC.addChild(this.MC.MakeMC);
	this.MC.MakeMC.setTransform(-97, -150);
	
	//EyeMC
	(lib.EyeMC = function(mode,startPosition,loop){
		this.initialize(mode,startPosition,loop,{open:0,close:59,damage:61},true);

		this.Eye1MC = new lib.EmptyMC();
		this.Eye2MC = new lib.EmptyMC();
		this.Eye3MC = new lib.EmptyMC();
		this.Eye4MC = new lib.EmptyMC();

		this.frame_60 = function()
		{
			this.gotoAndPlay("open");
		}

	this.timeline.addTween(createjs.Tween.get(this).wait(60).call(this.frame_60).wait(2));
	this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.Eye1MC}]}).to({state:[{t:this.Eye2MC}]},58).to({state:[{t:this.Eye3MC}]},1).to({state:[{t:this.Eye4MC}]},2).wait(1));

	}).prototype = p = new createjs.MovieClip();
	
	this.MC.EyeMC = new lib.EyeMC();
	this.MC.HeadMC.addChild(this.MC.EyeMC);
	this.MC.EyeMC.setTransform(-53, -50);
	
	this.MC.Eye1MC = this.MC.EyeMC.Eye1MC;
	this.MC.Eye2MC = this.MC.EyeMC.Eye2MC;
	this.MC.Eye3MC = this.MC.EyeMC.Eye3MC;
	this.MC.Eye4MC = this.MC.EyeMC.Eye4MC;
	
	//Eyebrow
	this.MC.EyebrowMC = new lib.EmptyMC();
	this.MC.HeadMC.addChild(this.MC.EyebrowMC);
	this.MC.EyebrowMC.setTransform(-52, -71);
	
	//FaceAcce
	this.MC.FaceAcceMC = new lib.EmptyMC();
	this.MC.HeadMC.addChild(this.MC.FaceAcceMC);
	this.MC.FaceAcceMC.setTransform(-97, -150);

	//HairFront
	this.MC.HairFrontMC = new lib.EmptyMC();
	this.MC.HeadMC.addChild(this.MC.HairFrontMC);
	this.MC.HairFrontMC.setTransform(-116, -156);
	
	//HelmetFront
	this.MC.HelmetFrontMC = new lib.EmptyMC();
	this.MC.HeadMC.addChild(this.MC.HelmetFrontMC);
	
	//HipFront
	this.MC.HipFrontMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.HipFrontMC);
	this.MC.HipFrontAttach = new lib.EmptyMC();
	this.MC.HipFrontMC.addChild(this.MC.HipFrontAttach);
	
	//BodyFront
	this.MC.BodyFrontMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.BodyFrontMC);
	this.MC.BodyFrontBody = new lib.EmptyMC();
	this.MC.BodyFrontMC.addChild(this.MC.BodyFrontBody);
	this.MC.BodyFrontAttach = new lib.EmptyMC();
	this.MC.BodyFrontMC.addChild(this.MC.BodyFrontAttach);

	//RightWepon
	this.MC.RightWeponMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.RightWeponMC);
	
	//RightArm
	this.MC.RightArmMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.RightArmMC);
	this.MC.RightArmBody = new lib.EmptyMC();
	this.MC.RightArmMC.addChild(this.MC.RightArmBody);

	this.MC.RightArm2MC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.RightArm2MC);
	this.MC.RightArmAttach = new lib.EmptyMC();
	this.MC.RightArm2MC.addChild(this.MC.RightArmAttach);

	//RightHand
	this.MC.RightHandMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.RightHandMC);
	this.MC.RightHandBody = new lib.EmptyMC();
	this.MC.RightHandMC.addChild(this.MC.RightHandBody);

	this.MC.RightHand2MC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.RightHand2MC);
	this.MC.RightHandAttach = new lib.EmptyMC();
	this.MC.RightHand2MC.addChild(this.MC.RightHandAttach);
	
	//RightWeponUpper
	this.MC.RightWeponUpperMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.RightWeponUpperMC);

	//RightWeponLock
	this.MC.RightWeponLockMC = new lib.EmptyMC();
	this.MC.RightHand2MC.addChild(this.MC.RightWeponLockMC);
	this.MC.RightWeponLockMC.setTransform(1,21,1,1,-85);

	//EffectMC
	this.MC.EffectMC = new lib.EmptyMC();
	this.AvatarMC.addChild(this.MC.EffectMC);
}

//頭装備削除
CreateAvater.prototype.deleteHelmet = function()
{
	this.MC.HelmetFrontMC.removeAllChildren();
	this.MC.HelmetBackMC.removeAllChildren();
}

//右手装備削除
CreateAvater.prototype.deleteLeftWepon = function()
{
	this.MC.LeftWeponMC.removeAllChildren();
}

//左手装備削除
CreateAvater.prototype.deleteRightWepon = function()
{
	this.MC.RightWeponMC.removeAllChildren();
	this.MC.RightWeponUpperMC.removeAllChildren();
	this.MC.RightWeponLockMC.removeAllChildren();
}

//髪の毛削除
CreateAvater.prototype.deleteHair = function()
{
	this.MC.HairFrontMC.removeAllChildren();
	this.MC.HairBackMC.removeAllChildren();
}

//眉毛削除
CreateAvater.prototype.deleteEyebrow = function()
{
	this.MC.EyebrowMC.removeAllChildren();
}

//瞳削除
CreateAvater.prototype.deleteEye = function()
{
	this.MC.Eye1MC.removeAllChildren();
	this.MC.Eye2MC.removeAllChildren();
	this.MC.Eye3MC.removeAllChildren();
	this.MC.Eye4MC.removeAllChildren();
}

//顔アクセサリ削除
CreateAvater.prototype.deleteFaceAcce = function()
{
	this.MC.FaceAcceMC.removeAllChildren();
}

//メイク削除
CreateAvater.prototype.deleteMake = function()
{
	this.MC.MakeMC.removeAllChildren();
}

//体削除
CreateAvater.prototype.deleteBody = function()
{
	this.MC.LeftArmBody.removeAllChildren();
	this.MC.LeftHandBody.removeAllChildren();
	this.MC.RightArmBody.removeAllChildren();
	this.MC.RightHandBody.removeAllChildren();
	this.MC.HipCenterBody.removeAllChildren();
	this.MC.BodyCenterBody.removeAllChildren();
	this.MC.RightLegBody.removeAllChildren();
	this.MC.RightFootBody.removeAllChildren();
	this.MC.RightTiptoeBody.removeAllChildren();
	this.MC.LeftLegBody.removeAllChildren();
	this.MC.LeftFootBody.removeAllChildren();
	this.MC.LeftTiptoeBody.removeAllChildren();
	this.MC.FaceMC.removeAllChildren();
}

//体装備削除
CreateAvater.prototype.deleteArmor = function( isReset )
{
	this.MC.LeftLegAttach.removeAllChildren();
	this.MC.LeftFootAttach.removeAllChildren();
	this.MC.LeftTiptoeAttach.removeAllChildren();
	this.MC.HipBackAttach.removeAllChildren();
	this.MC.HipFrontAttach.removeAllChildren();
	this.MC.HipCenterAttach.removeAllChildren();
	this.MC.BodyBackAttach.removeAllChildren();
	this.MC.BodyCenterAttach.removeAllChildren();
	this.MC.BodyFrontAttach.removeAllChildren();
	this.MC.RightLegAttach.removeAllChildren();
	this.MC.RightFootAttach.removeAllChildren();
	this.MC.RightTiptoeAttach.removeAllChildren();
	this.MC.LeftArmAttach.removeAllChildren();
	this.MC.LeftHandAttach.removeAllChildren();
	this.MC.RightArmAttach.removeAllChildren();
	this.MC.RightHandAttach.removeAllChildren();
}

//頭装備生成
CreateAvater.prototype.setHelmet = function()
{
	//HelmetFront
	this.setImage(this.MC.HelmetFrontMC, this.Config.helmetId, 0, 0, 450, 400, -116, -177);

	//HelmetBack
	this.setImage(this.MC.HelmetBackMC, this.Config.helmetId, 450, 0, 450, 400, -116, -177);
}

//左手装備生成
CreateAvater.prototype.setLeftWepon = function()
{
	//LeftWepon
	this.setImage(this.MC.LeftWeponMC, this.Config.leftWeponId, 0, 0, 700, 700, -183, -223);
}

//右手装備生成
CreateAvater.prototype.setRightWepon = function()
{
	//RightWepon
	if(this.Config.isRightWeponUpper)
	{
		if(this.Config.isRightWeponLock)
		{
			this.setImage(this.MC.RightWeponLockMC, this.Config.rightWeponId, 0, 0, 700, 700, -183, -223);
		}
		else
		{
			this.setImage(this.MC.RightWeponUpperMC, this.Config.rightWeponId, 0, 0, 700, 700, -183, -223);
		}
	}
	else
	{
		if(this.Config.is2SwordStyle)
		{
			this.setImage(this.MC.RightWeponMC, this.Config.rightWeponId, 700, 0, 700, 700, -183, -223);
		}
		else
		{
			this.setImage(this.MC.RightWeponMC, this.Config.rightWeponId, 0, 0, 700, 700, -183, -223);
		}
	}
}

//髪の毛生成
CreateAvater.prototype.setHair = function()
{
	//Hair1
	this.setImage(this.MC.HairFrontMC, this.Config.hairId, 0, 0, 450, 580, 0, 0);
		
	//Hair2
	this.setImage(this.MC.HairBackMC, this.Config.hairId, 450, 0, 450, 580, -115, -156);
}

//眉毛生成
CreateAvater.prototype.setEyebrow = function()
{
	this.setImage(this.MC.EyebrowMC, this.Config.eyebrowId, 0, 0, 180, 60, 0, 0);
}

//瞳生成
CreateAvater.prototype.setEye = function()
{
	//Eye1
	this.setImage(this.MC.Eye1MC, this.Config.eyeId, 0, 0, 180, 80, 0, 0);
	
	//Eye2
	this.setImage(this.MC.Eye2MC, this.Config.eyeId, 0, 80, 180, 80, 0, 0);
	
	//Eye3
	this.setImage(this.MC.Eye3MC, this.Config.eyeId, 0, 160, 180, 80, 0, 0);

	//Eye4、damageVer
	this.setImage(this.MC.Eye4MC, this.Config.eyeId, 0, 240, 180, 80, 0, 0);
}

//顔アクセサリ生成
CreateAvater.prototype.setFaceAcce = function()
{
	this.setImage(this.MC.FaceAcceMC, this.Config.faceAcceId, 0, 0, 400, 400, 0, 0);
}

//メイク生成
CreateAvater.prototype.setMake = function()
{
	this.setImage(this.MC.MakeMC, this.Config.makeId, 0, 0, 400, 400, 0, 0);
}

//体生成
CreateAvater.prototype.setBody = function()
{
	//LeftArm
	this.setImage(this.MC.LeftArmBody, this.Config.bodyId, 0, 240, 120, 120, -39, -18);
	
	//LeftHand
	this.setImage(this.MC.LeftHandBody, this.Config.bodyId, 0, 360, 120, 120, -45, -17);
	
	//RightArm
	this.setImage(this.MC.RightArmBody, this.Config.bodyId, 120, 240, 120, 120, -20, -18);
	
	//RightHand
	this.setImage(this.MC.RightHandBody, this.Config.bodyId, 120, 360, 120, 120, -30, -18);
	
	//HipCenter
	this.setImage(this.MC.HipCenterBody, this.Config.bodyId, 240, 140, 120, 100, 0, 0);
		
	//BodyCenter
	this.setImage(this.MC.BodyCenterBody, this.Config.bodyId, 240, 0, 120, 140, -33, -55);
	
	//RightLeg
	this.setImage(this.MC.RightLegBody, this.Config.bodyId, 360, 240, 120, 120, -30, -17);
	
	//RightFoot
	this.setImage(this.MC.RightFootBody, this.Config.bodyId, 360, 360, 120, 120, -30, -16);
	
	//RightTiptoe
	this.setImage(this.MC.RightTiptoeBody, this.Config.bodyId, 360, 120, 120, 120, -32, -30);
	
	//LeftLeg
	this.setImage(this.MC.LeftLegBody, this.Config.bodyId, 240, 240, 120, 120, -30, -16);

	//LeftFoot
	this.setImage(this.MC.LeftFootBody, this.Config.bodyId, 240, 360, 120, 120, -31, -16);
	
	//LeftTiptoe
	this.setImage(this.MC.LeftTiptoeBody, this.Config.bodyId, 360, 0, 120, 120, -32, -30);
	
	//Face
	this.setImage(this.MC.FaceMC, this.Config.bodyId, 0, 0, 240, 240, 0, 0);
}

//体装備生成
CreateAvater.prototype.setArmor = function()
{
	//LeftLeg
	this.setImage(this.MC.LeftLegAttach, this.Config.armorId, 240, 480, 120, 120, -30, -16);
	
	//LeftFoot
	this.setImage(this.MC.LeftFootAttach, this.Config.armorId, 240, 600, 120, 120, -31, -16);
	
	//LeftTiptoe
	this.setImage(this.MC.LeftTiptoeAttach, this.Config.armorId, 480, 480, 120, 120, -32, -30);

	//HipBack
	this.setImage(this.MC.HipBackAttach, this.Config.armorId, 240, 280, 280, 200, -28, -10);
	
	//HipCenter
	this.setImage(this.MC.HipCenterAttach, this.Config.armorId, 520, 280, 200, 200, -28, -10);
	
	//HipFront
	this.setImage(this.MC.HipFrontAttach, this.Config.armorId, 0, 280, 240, 200, -28, -10);

	//BodyBack
	this.setImage(this.MC.BodyBackAttach, this.Config.armorId, 240, 0, 280, 280, -61, -64);

	//BodyCenter
	this.setImage(this.MC.BodyCenterAttach, this.Config.armorId, 520, 0, 200, 280, -61, -64);

	//BodyFront
	this.setImage(this.MC.BodyFrontAttach, this.Config.armorId, 0, 0, 240, 280, -61, -64);

	//RightLeg
	this.setImage(this.MC.RightLegAttach, this.Config.armorId, 360, 480, 120, 120, -30, -17);
	
	//RightFoot
	this.setImage(this.MC.RightFootAttach, this.Config.armorId, 360, 600, 120, 120, -30, -16);
	
	//RightTiptoe
	this.setImage(this.MC.RightTiptoeAttach, this.Config.armorId, 600, 480, 120, 120, -32, -30);
	
	//LeftArm
	this.setImage(this.MC.LeftArmAttach, this.Config.armorId, 0, 480, 120, 120, -39, -18);
	
	//LeftHand
	this.setImage(this.MC.LeftHandAttach, this.Config.armorId, 0, 600, 120, 120, -45, -17);
	
	//RightArm
	this.setImage(this.MC.RightArmAttach, this.Config.armorId, 120, 480, 120, 120, -20, -18);
	
	//RightHand
	this.setImage(this.MC.RightHandAttach, this.Config.armorId, 120, 600, 120, 120, -30, -18);
}

//画像貼り付け
CreateAvater.prototype.setImage = function(mc,img,ix,iy,iw,ih,px,py)
{
	bmp = new createjs.Bitmap( images[img] );
	var x = Math.ceil( ix * this.Config.sizeRate);
	var y = Math.ceil( iy * this.Config.sizeRate);
	bmp.sourceRect = new createjs.Rectangle(
		x,
		y,
		Math.ceil( (ix + iw) * this.Config.sizeRate) - x,
		Math.ceil( (iy + ih) * this.Config.sizeRate) - y
	);
	bmp.setTransform( px, py, this.Config.pixelRate, this.Config.pixelRate ); 
	mc.addChildAt( bmp );
}

//アニメーション設定
CreateAvater.prototype.setAnimation = function( name, isLoop ,isEffect)
{
	if(this.playeAnime == null) isTick = true;

	this.animeFrame = 0;
	this.playeAnime = name;
	this.isLoop = isLoop;
	this.isPlay = true;
	this.isEffect = isEffect;
	this.isAttackStart = false;
	this.isAttackHit = false;
	this.isAttackEnd = false;
	
	this.MC.EffectMC.removeAllChildren();
	
	if(this.isEffect && !this.loadedEfList[this.Config.animationData["motion"] + "_" +this.playeAnime])
	{
		this.preLoadEffect();
		this.loadedEfList[this.Config.animationData["motion"] + "_" + this.playeAnime] = true;
	}

	if(isTick)
	{
		this.AvatarMC.onTick();
	}
}

//エフェクト画像先読み
CreateAvater.prototype.preLoadEffect = function()
{
	for (this.i = 0; this.i < this.Config.animationData[this.playeAnime].length; this.i++)
	{
		if(typeof this.Config.animationData[this.playeAnime][this.i]["ef"] != 'undefined')
		{
			for (this.s = 0; this.s < this.Config.animationData[this.playeAnime][this.i]["ef"].length; this.s++)
			{
				if(typeof images[this.Config.animationData[this.playeAnime][this.i]["ef"][this.s]["img"]] == 'undefined')
				{
					images[this.Config.animationData[this.playeAnime][this.i]["ef"][this.s]["img"]] = new Image();
//					images[this.Config.animationData[this.playeAnime][this.i]["ef"][this.s]["img"]].src = "images/ef/" + 
					images[this.Config.animationData[this.playeAnime][this.i]["ef"][this.s]["img"]].src = this.Config.efPath  + 
						this.Config.animationData[this.playeAnime][this.i]["ef"][this.s]["img"];
				}
			}
		}
	}
}

//アニメーションファイルの変更
CreateAvater.prototype.setAnimationData = function( animationData, name, isLoop ,isEffect)
{
//	this.AvaterObj.Config.animationData = animationData;
//	this.CreateAvater.prototype.setAnimation( animationData, name, isLoop ,isEffect)
	this.Config.animationData = animationData;
	this.setAnimation(name, isLoop ,isEffect)
}

//アニメーションTick
CreateAvater.prototype._moveTick = function()
{
	playeAnime = this.AvaterObj.playeAnime;
	animeFrame = this.AvaterObj.animeFrame;
	Config = this.AvaterObj.Config;
	isPlay = this.AvaterObj.isPlay;
	isLoop = this.AvaterObj.isLoop;
	efList = this.AvaterObj.efList;
	isShadow = this.AvaterObj.Config.isShadow;
	
	playeAnimeObj = Config.animationData[playeAnime];
	
	if(!isPlay) return;
	
	if( typeof playeAnimeObj[animeFrame]["as"] != 'undefined')
	{
		this.AvaterObj.isAttackStart = true;
	}
	if( typeof playeAnimeObj[animeFrame]["ah"] != 'undefined')
	{
		this.AvaterObj.isAttackHit = true;
	}
	if( typeof playeAnimeObj[animeFrame]["ae"] != 'undefined')
	{
		this.AvaterObj.isAttackEnd = true;
	}

	this.AvaterObj.MC.HipCenterMC.x = playeAnimeObj[animeFrame]["m0"][0];
	this.AvaterObj.MC.HipCenterMC.y = playeAnimeObj[animeFrame]["m0"][1];
	this.AvaterObj.MC.HipCenterMC.rotation = playeAnimeObj[animeFrame]["m0"][2];
	
	this.AvaterObj.MC.HipBackMC.x = playeAnimeObj[animeFrame]["m0"][0];
	this.AvaterObj.MC.HipBackMC.y = playeAnimeObj[animeFrame]["m0"][1];
	this.AvaterObj.MC.HipBackMC.rotation = playeAnimeObj[animeFrame]["m0"][2];
	
	this.AvaterObj.MC.HipFrontMC.x = playeAnimeObj[animeFrame]["m0"][0];
	this.AvaterObj.MC.HipFrontMC.y = playeAnimeObj[animeFrame]["m0"][1];
	this.AvaterObj.MC.HipFrontMC.rotation = playeAnimeObj[animeFrame]["m0"][2];
	
	this.AvaterObj.MC.BodyFrontMC.x = playeAnimeObj[animeFrame]["m1"][0];
	this.AvaterObj.MC.BodyFrontMC.y = playeAnimeObj[animeFrame]["m1"][1];
	this.AvaterObj.MC.BodyFrontMC.rotation = playeAnimeObj[animeFrame]["m1"][2];
	
	this.AvaterObj.MC.BodyCenterMC.x = playeAnimeObj[animeFrame]["m1"][0];
	this.AvaterObj.MC.BodyCenterMC.y = playeAnimeObj[animeFrame]["m1"][1];
	this.AvaterObj.MC.BodyCenterMC.rotation = playeAnimeObj[animeFrame]["m1"][2];
	
	this.AvaterObj.MC.BodyCenter2MC.x = playeAnimeObj[animeFrame]["m1"][0];
	this.AvaterObj.MC.BodyCenter2MC.y = playeAnimeObj[animeFrame]["m1"][1];
	this.AvaterObj.MC.BodyCenter2MC.rotation = playeAnimeObj[animeFrame]["m1"][2];

	this.AvaterObj.MC.BodyBackMC.x = playeAnimeObj[animeFrame]["m1"][0];
	this.AvaterObj.MC.BodyBackMC.y = playeAnimeObj[animeFrame]["m1"][1];
	this.AvaterObj.MC.BodyBackMC.rotation = playeAnimeObj[animeFrame]["m1"][2];
	
	this.AvaterObj.MC.HeadMC.x = playeAnimeObj[animeFrame]["m2"][0];
	this.AvaterObj.MC.HeadMC.y = playeAnimeObj[animeFrame]["m2"][1] - 3;
	this.AvaterObj.MC.HeadMC.rotation = playeAnimeObj[animeFrame]["m2"][2];
	
	this.AvaterObj.MC.HairBackMC.x = playeAnimeObj[animeFrame]["m2"][0];
	this.AvaterObj.MC.HairBackMC.y = playeAnimeObj[animeFrame]["m2"][1]- 3;
	this.AvaterObj.MC.HairBackMC.rotation = playeAnimeObj[animeFrame]["m2"][2];
	
	this.AvaterObj.MC.HelmetBackMC.x = playeAnimeObj[animeFrame]["m2"][0];
	this.AvaterObj.MC.HelmetBackMC.y = playeAnimeObj[animeFrame]["m2"][1]- 3;
	this.AvaterObj.MC.HelmetBackMC.rotation = playeAnimeObj[animeFrame]["m2"][2];
	
	this.AvaterObj.MC.LeftArmMC.x = playeAnimeObj[animeFrame]["m3"][0];
	this.AvaterObj.MC.LeftArmMC.y = playeAnimeObj[animeFrame]["m3"][1];
	this.AvaterObj.MC.LeftArmMC.rotation = playeAnimeObj[animeFrame]["m3"][2];
	
	this.AvaterObj.MC.LeftHandMC.x = playeAnimeObj[animeFrame]["m4"][0];
	this.AvaterObj.MC.LeftHandMC.y = playeAnimeObj[animeFrame]["m4"][1];
	this.AvaterObj.MC.LeftHandMC.rotation = playeAnimeObj[animeFrame]["m4"][2];
	
	this.AvaterObj.MC.LeftArm2MC.x = playeAnimeObj[animeFrame]["m3"][0];
	this.AvaterObj.MC.LeftArm2MC.y = playeAnimeObj[animeFrame]["m3"][1];
	this.AvaterObj.MC.LeftArm2MC.rotation = playeAnimeObj[animeFrame]["m3"][2];
	
	this.AvaterObj.MC.LeftHand2MC.x = playeAnimeObj[animeFrame]["m4"][0];
	this.AvaterObj.MC.LeftHand2MC.y = playeAnimeObj[animeFrame]["m4"][1];
	this.AvaterObj.MC.LeftHand2MC.rotation = playeAnimeObj[animeFrame]["m4"][2];

	this.AvaterObj.MC.RightArmMC.x = playeAnimeObj[animeFrame]["m5"][0];
	this.AvaterObj.MC.RightArmMC.y = playeAnimeObj[animeFrame]["m5"][1];
	this.AvaterObj.MC.RightArmMC.rotation = playeAnimeObj[animeFrame]["m5"][2];
	
	this.AvaterObj.MC.RightHandMC.x = playeAnimeObj[animeFrame]["m6"][0];
	this.AvaterObj.MC.RightHandMC.y = playeAnimeObj[animeFrame]["m6"][1];
	this.AvaterObj.MC.RightHandMC.rotation = playeAnimeObj[animeFrame]["m6"][2];

	this.AvaterObj.MC.RightArm2MC.x = playeAnimeObj[animeFrame]["m5"][0];
	this.AvaterObj.MC.RightArm2MC.y = playeAnimeObj[animeFrame]["m5"][1];
	this.AvaterObj.MC.RightArm2MC.rotation = playeAnimeObj[animeFrame]["m5"][2];
	
	this.AvaterObj.MC.RightHand2MC.x = playeAnimeObj[animeFrame]["m6"][0];
	this.AvaterObj.MC.RightHand2MC.y = playeAnimeObj[animeFrame]["m6"][1];
	this.AvaterObj.MC.RightHand2MC.rotation = playeAnimeObj[animeFrame]["m6"][2];
	
	this.AvaterObj.MC.LeftLegMC.rotation = playeAnimeObj[animeFrame]["m7"][0];
	this.AvaterObj.MC.LeftFootMC.rotation = playeAnimeObj[animeFrame]["m8"][0];
	this.AvaterObj.MC.LeftTiptoeMC.rotation =  playeAnimeObj[animeFrame]["m9"][0];
	
	this.AvaterObj.MC.LeftLeg2MC.rotation = playeAnimeObj[animeFrame]["m7"][0];
	this.AvaterObj.MC.LeftFoot2MC.rotation = playeAnimeObj[animeFrame]["m8"][0];
	this.AvaterObj.MC.LeftTiptoe2MC.rotation =  playeAnimeObj[animeFrame]["m9"][0];
	
	this.AvaterObj.MC.RightLegMC.rotation = playeAnimeObj[animeFrame]["m10"][0];
	this.AvaterObj.MC.RightFootMC.rotation = playeAnimeObj[animeFrame]["m11"][0];
	this.AvaterObj.MC.RightTiptoeMC.rotation = playeAnimeObj[animeFrame]["m12"][0];

	this.AvaterObj.MC.RightLeg2MC.rotation = playeAnimeObj[animeFrame]["m10"][0];
	this.AvaterObj.MC.RightFoot2MC.rotation = playeAnimeObj[animeFrame]["m11"][0];
	this.AvaterObj.MC.RightTiptoe2MC.rotation = playeAnimeObj[animeFrame]["m12"][0];
	
	this.AvaterObj.MC.LeftWeponMC.x = playeAnimeObj[animeFrame]["w1"][0];
	this.AvaterObj.MC.LeftWeponMC.y = playeAnimeObj[animeFrame]["w1"][1];
	this.AvaterObj.MC.LeftWeponMC.rotation = playeAnimeObj[animeFrame]["w1"][2];

	if(Config.isRightWeponUpper)
	{
		if(!Config.isRightWeponLock)
			{
			this.AvaterObj.MC.RightWeponUpperMC.x = playeAnimeObj[animeFrame]["w2"][0];
			this.AvaterObj.MC.RightWeponUpperMC.y = playeAnimeObj[animeFrame]["w2"][1];
			this.AvaterObj.MC.RightWeponUpperMC.rotation = playeAnimeObj[animeFrame]["w2"][2];
		}
	}
	else
	{
		this.AvaterObj.MC.RightWeponMC.x = playeAnimeObj[animeFrame]["w2"][0];
		this.AvaterObj.MC.RightWeponMC.y = playeAnimeObj[animeFrame]["w2"][1];
		this.AvaterObj.MC.RightWeponMC.rotation = playeAnimeObj[animeFrame]["w2"][2];
	}
	
	if(this.AvaterObj.isEffect)
	{
		if(typeof playeAnimeObj[animeFrame]["ef"] !=  'undefined')
		{
			for (i = 0; i < playeAnimeObj[animeFrame]["ef"].length; i++)
			{
				id = playeAnimeObj[animeFrame]["ef"][i]["id"];
				
				if(typeof this.AvaterObj.efList[id] == 'undefined')
				{
//					this.AvaterObj.log +=  "add:" + animeFrame + "/" + id + "\n";
					this.AvaterObj.efList[id] = new Object();
					this.AvaterObj.efList[id].bmp = new createjs.Bitmap( images[playeAnimeObj[animeFrame]["ef"][i]["img"]] );
					this.AvaterObj.MC.EffectMC.addChildAt( this.AvaterObj.efList[id].bmp, 0);
					this.AvaterObj.efList[id].bmp.regX = images[playeAnimeObj[animeFrame]["ef"][i]["img"]].width / 2 ;
					this.AvaterObj.efList[id].bmp.regY = images[playeAnimeObj[animeFrame]["ef"][i]["img"]].height  /2 ;
				}

				this.AvaterObj.efList[id].bmp.x = playeAnimeObj[animeFrame]["ef"][i]["x"];
				this.AvaterObj.efList[id].bmp.y = playeAnimeObj[animeFrame]["ef"][i]["y"];
				this.AvaterObj.efList[id].bmp.rotation = playeAnimeObj[animeFrame]["ef"][i]["r"];
				this.AvaterObj.efList[id].bmp.scaleX = playeAnimeObj[animeFrame]["ef"][i]["sx"];
				this.AvaterObj.efList[id].bmp.scaleY = playeAnimeObj[animeFrame]["ef"][i]["sy"];
				this.AvaterObj.efList[id].bmp.alpha = playeAnimeObj[animeFrame]["ef"][i]["a"];
				
				this.AvaterObj.efList[id].isUsed = true;
			}
			
			backAnimeFrame = animeFrame - 1;
			
			if(backAnimeFrame < 0)
			{
				backAnimeFrame = playeAnimeObj.length - 1;
			}

			if(typeof playeAnimeObj[backAnimeFrame]["ef"] !=  'undefined')
			{
				for (i = 0; i < playeAnimeObj[backAnimeFrame]["ef"].length; i++)
				{
					id = playeAnimeObj[backAnimeFrame]["ef"][i]["id"];
					
					if(!this.AvaterObj.efList[id].isUsed)
					{
//						this.AvaterObj.log +=  "delete:" + animeFrame + "/" + id + "\n";
						this.AvaterObj.MC.EffectMC.removeChild(this.AvaterObj.efList[id].bmp);
						delete(this.AvaterObj.efList[id]);
					}
				}
			}
			
			for (i in this.AvaterObj.efList)
			{
				this.AvaterObj.efList[i].isUsed = false;
			}
		}
		else
		{
			this.AvaterObj.MC.EffectMC.removeAllChildren();
			this.AvaterObj.efList = new Object();
		}
	}	


	if(isShadow)
	{
		this.AvaterObj.MC.ShadowMC.scaleX = 1 - this.AvaterObj.MC.HipFrontMC.y * -0.002;
		this.AvaterObj.MC.ShadowMC.scaleY = 1 - this.AvaterObj.MC.HipFrontMC.y * -0.002;
		this.AvaterObj.MC.ShadowMC.alpha = 1 - this.AvaterObj.MC.HipFrontMC.y * -0.002;
	}

	this.AvaterObj.animeFrame++;
	
	if(this.AvaterObj.animeFrame >= playeAnimeObj.length)
	{
		if(typeof avaterEvent !=  'undefined')
		{
			if(typeof avaterEvent["endAnimeFnc"] !=  'undefined') avaterEvent["endAnimeFnc"]();
		}
		this.AvaterObj.isEndAnime = true;
	}
	else
	{
		this.AvaterObj.isEndAnime = false;
	}

	if(isLoop)
	{
		if(this.AvaterObj.animeFrame >= playeAnimeObj.length - 1)
		{
			this.AvaterObj.animeFrame = 0;
			this.AvaterObj.isAttackStart = false;
			this.AvaterObj.isAttackHit = false;
			this.AvaterObj.isAttackEnd = false;
//			alert(this.AvaterObj.log);
		}
	}
	else
	{
		if(this.AvaterObj.animeFrame >= playeAnimeObj.length)
		{
			this.AvaterObj.isPlay = false;
		}
	}
}

//アニメーション用tick停止
CreateAvater.prototype.animeStop = function()
{
	delete(this.AvatarMC.onTick);
}


//アニメーション用tick再生
CreateAvater.prototype.animePlay = function()
{
	this.AvatarMC.onTick = CreateAvater.prototype._moveTick;
}

//目をつむる
CreateAvater.prototype.eyeClose = function()
{
	this.MC.EyeMC.gotoAndStop("close");
}

//目を開ける
CreateAvater.prototype.eyeOpen = function()
{
	this.MC.EyeMC.gotoAndPlay("open");
}

//目を><にする
CreateAvater.prototype.eyeDamage = function()
{
	this.MC.EyeMC.gotoAndStop("damage");
}
