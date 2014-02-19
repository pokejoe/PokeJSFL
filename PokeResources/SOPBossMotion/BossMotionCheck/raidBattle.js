(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.raidBattle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"init":0,"wait":1});

	// timeline functions:
	this.frame_0 = function() {
		//名前空間
		//window.sop = window.sop || {};
		//sop.raidBattle = {};
		
		//深度
		sop.raidBattle.depth = [
								100,		//ボス
								200,		//メイン（制御） & ユーザー 
								];
		
		
		//====================================================================
		//							ゲームマスター
		//====================================================================
		sop.raidBattle.gameMaster = {
			sceneID		: "none",			//今、なんのシーン？
			animeData	: [],				//再生するアニメのデータ群
			animeCnt	: 0,				//再生したアニメの回数
			animeCntMax	: 0,				//再生するアニメの回数
			
			//演出再生
			animePlay : function(setData)
			{
				//演出データを格納
				sop.raidBattle.gameMaster.animeData = [];
				sop.raidBattle.gameMaster.animeData = setData;
				
				//演出の回数（例：ユーザーの攻撃　→　ボスの反撃　＝　２回）
				sop.raidBattle.gameMaster.animeCnt		= 0;
				sop.raidBattle.gameMaster.animeCntMax	= setData.length;
				
				//演出を再生
				sop.raidBattle.gameMaster.nowAnimePlay();
			},
			
			//今のアニメを再生する
			nowAnimePlay : function()
			{
				var animeData	= sop.raidBattle.gameMaster.getAnimeData();
				var animeID		= animeData["animeID"];
				var tgVec		= animeData["actionTeam"];
				
				//★イレギュラースキルの対応
				var isFlg = sop.raidBattle.gameMaster.irregularSkillCheck();
				if(isFlg)
				{
					sop.raidBattle.gameMaster.irregularSkillON(animeData);
				}
				else
				{
					//通常攻撃
					if(animeID == "attack")
					{
						//ユーザーの攻撃
						if(tgVec == 1)
						{
							sop.raidBattle.user.attack(animeData);
						}
						//ボスの攻撃
						else if(tgVec == 2)
						{
							sop.raidBattle.boss.attack(animeData);
						}
					}
					//HP回復（ユーザーのみ）
					else if(animeID == "heal")
					{
						sop.raidBattle.user.heal(animeData);
					}
					//ステータス異常回復（ユーザーのみ）
					else if(animeID == "cure")
					{
						sop.raidBattle.user.cure(animeData);
					}
					//復活（ユーザーのみ）
					else if(animeID == "resurrection")
					{
						sop.raidBattle.user.resurrection(animeData);
					}
					//ジョブレベルアップの場合
					else if(animeID == "jobLvUP")
					{
						sop.raidBattle.user.jobLvUP(animeData);
					}
					//追加ダメージ（毒or混乱）
					else if(animeID == "damage")
					{
						var sickID = animeData["sickID"];
						
						//ユーザーの攻撃
						if(tgVec == 1)
						{
							//毒
							if(sickID == 1)
							{
								sop.raidBattle.user.addDamage_poison(animeData);
							}
							//混乱
							else if(sickID == 2)
							{
								sop.raidBattle.user.addDamage_confu(animeData);
							}
						}
						//ボスの攻撃
						else if(tgVec == 2)
						{
							//毒
							if(sickID == 1)
							{
								sop.raidBattle.boss.addDamage_poison(animeData);
							}
							//混乱
							else if(sickID == 2)
							{
								sop.raidBattle.boss.addDamage_confu(animeData);
							}
						}
					}
					//スキルの場合
					else if(animeID == "skill")
					{
						sop.raidBattle.user.skill(animeData);
					}
				}
			},
			
			//次のアニメを再生
			nextAnimeGo : function()
			{
				//★終了処理
				sop.raidBattle.gameMaster.nowAnimeEnd();
		
				//アニメカウント更新
				sop.raidBattle.gameMaster.animeCnt++;
				
				//次の処理を判定
				var nowCnt	= sop.raidBattle.gameMaster.animeCnt;
				var maxCnt	= sop.raidBattle.gameMaster.animeCntMax;
				
				if(nowCnt < maxCnt)
				{
					//アニメ再生
					sop.raidBattle.gameMaster.nowAnimePlay();
				}
				else
				{
					console.log("演出終わりです");
					
					//ユーザーを手前に表示
					//sop.raidBattle.user.dispFront();
					
					animeEnd();
				}
			},
			
			//今のアニメデータを取得する
			getAnimeData : function()
			{
				var resData = {};
				
				var nowCnt		= sop.raidBattle.gameMaster.animeCnt;
				var animeData	= sop.raidBattle.gameMaster.animeData[nowCnt];
				
				resData = animeData;
				
				return resData;
			},
			
			//アニメの終了処理　※主にスキルまわり＋追加ダメージによる死亡演出
			nowAnimeEnd : function()
			{
				var animeData	= sop.raidBattle.gameMaster.getAnimeData();
				var animeID		= animeData["animeID"];
				
				//スキルの場合
				if(animeID == "skill")
				{
					//表示を調整
					skillDispAdjust_end();
					
					//ダメージ値を非表示
					sop.raidBattle.dmg.userOFF();
				}
				
				//イレギュラースキルの対応
				var isFlg = sop.raidBattle.gameMaster.irregularSkillCheck();
				if(isFlg)
				{
					sop.raidBattle.gameMaster.irregularSkillON_end(animeData);
				}
				
				//★追加ダメージによる死亡演出
				if(animeData["user_death"] != undefined && animeData["user_death"] == true)
				{
					//死亡演出へ
					if(sop.raidBattle.user.tgMC.dieFlg == false)
					{
						sop.raidBattle.user.die(animeData);
					}
				}
				if(animeData["boss_death"] != undefined && animeData["boss_death"] == true)
				{
					//死亡演出へ
					if(rootBoss.dieFlg == false)
					{
						sop.raidBattle.boss.death();
					}
				}
			},
			
			//戦闘結果の表示
			resultON : function()
			{
				if(sop.raidBattle.resultID == "win")
				{
					resultWindowON("win");
				}
				else if(sop.raidBattle.resultID == "lose")
				{
					resultWindowON("lose");
				}
				else
				{
					resultWindowON();
				}
			},
			
			//ファイル起動時の生存演出
			aliveDraw : function()
			{
				//ユーザーが死んでる
				if(sop.raidBattle.userAliveFlg == false)
				{
					//死亡アニメへ
					sop.raidBattle.user.die_stop();
				}
				
				//ボスが死んでる
				if(sop.raidBattle.bossAliveFlg == false)
				{
					//ボス消しておく
					rootBoss.mc_boss.visible = false;
				}
			},
		
			//スキル　ポップアップで停止してた演出のリスタート
			userSkill_restart_popupWindow : function()
			{
				rootSkill.gotoAndPlay("popUpWindow_restart");
			},
			
			//イレギュラースキルの効果が発動したか判定
			irregularSkillCheck : function()
			{
				var resFlg		= false;
				var animeData	= sop.raidBattle.gameMaster.getAnimeData();
				
				if(animeData["extra"] != undefined)
				{
					if(
						animeData["extra"]["cutin_scapegoat"] == true ||
						animeData["extra"]["cutin_counter"] == true ||
						animeData["extra"]["cutin_counter"] == false
					)
					{
						resFlg = true;
					}
				}
				
				return resFlg;
			},
			
			//イレギュラースキルの効果発動
			irregularSkillON : function(animeData)
			{
				//スケープゴート
				if(animeData["extra"]["cutin_scapegoat"] == true)
				{
					//カットインON
					sop.raidBattle.cutin.scapegoatON();
					
					//演出ON
					exportRoot.mc_user.gotoAndPlay("skill45_in");
					
					//ボスの攻撃データを渡す
					exportRoot.mc_user.animeData = animeData;
				}
				//カウンター　発動
				else if(animeData["extra"]["cutin_counter"] == true)
				{
					//カットインON
					sop.raidBattle.cutin.counterON();
					
					//ボスの攻撃開始
					sop.raidBattle.boss.attack(animeData);
				}
				//カウンター　閉じる
				else if(animeData["extra"]["cutin_counter"] == false)
				{
					//ユーザーの攻撃開始
					sop.raidBattle.user.attack(animeData);
				}
			},
			
			//イレギュラースキルの効果発動後の処理
			irregularSkillON_end : function(animeData)
			{
				//スケープゴートのカットインを閉じる
				if(animeData["extra"]["cutin_scapegoat"] == true)
				{
					console.log("スケープゴートのカットイン閉じる");
					sop.raidBattle.cutin.scapegoatOFF();
				}
				//カウンターのカットインを閉じる
				else if(animeData["extra"]["cutin_counter"] == false)
				{
					sop.raidBattle.cutin.counterOFF();
				}
			},
			
			//-----------------------------------------------------
			//	背景関連
			//-----------------------------------------------------
			//背景を左へ
			bgMoveLeft : function()
			{
				test_bg_move();
			},
			
			//背景を中央へ戻す
			bgMoveLeftBack : function()
			{
				test_bg_moveBack();
			},
			
			//背景のフェードイン黒
			bgFadeinBlack : function()
			{
				test_bg_fadeIN_black();
			},
			
			//背景のフェードアウト黒
			bgFadeoutBlack : function()
			{
				test_bg_fadeOUT_black();
			},
			
			//背景のフェードイン白
			bgFadeinWhite : function()
			{
				test_bg_fadeIN_white();
			},
			
			//背景のフェードアウト白
			bgFadeoutWhite : function()
			{
				test_bg_fadeOUT_white();
			},
			
			//ダメージポイント　ポジション設定
			setDamagePts : function(type, num)
			{
				setDamageNumDom(type, num);
			},
			
			//ダメージアニメーション再生
			startDamageAnime : function()
			{
				startDamageDom();
			}
			
			
		};
		
		//====================================================================
		//							ユーザー関連
		//====================================================================
		sop.raidBattle.user = {
			tgMC	: exportRoot.mc_user,
			
			//通常攻撃
			attack : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("attack");
			},
			
			//HP回復
			heal : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("heal");
				
				//回復値を代入
				sop.raidBattle.user.tgMC.dmgPt = animeData["damage"];
			},
			
			//ステータス異常回復
			cure : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("heal_status");
			},
			
			//復活（＝気絶回復）
			resurrection : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("alive");
				
				//回復値を代入
				sop.raidBattle.user.tgMC.dmgPt = animeData["damage"];
			},
			
			//ジョブレベルアップ
			jobLvUP : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("jobLvUP");
			},
			
			//被弾
			hit_damage : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("dmg");
				
				//属性別被弾エフェクトの処理
				sop.raidBattle.effHitAttri.checkPlay(animeData);
			},
			
			//回避
			avoid : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("avoid");
			},
			
			//死亡
			die : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("die");
			},
			
			//死亡　※ファイル起動時にすでに死んでいる場合
			die_stop : function()
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("die_stop");
			},
			
			//追加ダメージ　※毒
			addDamage_poison : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("dmg_poison");
			},
			
			//追加ダメージ　※混乱
			addDamage_confu : function(animeData)
			{
				sop.raidBattle.user.tgMC.gotoAndPlay("dmg_confu");
			},
			
			//スキル発動
			skill : function(animeData)
			{
				//スキルにデータを渡しておく
				rootSkill.animeData = animeData;
				
				//スキル開始
				exportRoot.mc_skill_control.gotoAndPlay("start");
			},
			
			//被弾後のダメージチェック
			damageCheck		: function()
			{
				var animeData	= sop.raidBattle.gameMaster.getAnimeData();
				var dieFlg		= animeData["user_death"];
				
				if(dieFlg)
				{
					//死亡演出へ
					sop.raidBattle.user.die(animeData);
				}
				else
				{
					//待機
					sop.raidBattle.user.tgMC.gotoAndStop("wait");
				}
			},
			
			hitCheck : function()
			{
				//今のアニメーデータを取得
				var animeData = sop.raidBattle.gameMaster.getAnimeData();
				
				//被弾か回避の判定
				if(animeData["avoid"] != undefined && animeData["avoid"] == true)
				{
					//★スケープゴート対応
					var isFlg = sop.raidBattle.gameMaster.irregularSkillCheck();
					if(isFlg)
					{
						//スケープゴートの場合
						if(animeData["extra"]["cutin_scapegoat"] == true)
						{
							exportRoot.mc_user.gotoAndPlay("skill45_out");
						}
						
						//カウンターの場合
						if(animeData["extra"]["cutin_counter"] == true)
						{
							sop.raidBattle.user.avoid(animeData);
						}
					}
					else
					{
						//回避
						sop.raidBattle.user.avoid(animeData);
					}
				}
				else
				{
					//被弾
					sop.raidBattle.user.hit_damage(animeData);
					
					//ダメージ値表示
					sop.raidBattle.dmg.dmgON();
				}
			},
			
			//ユーザーを手前に表示
			dispFront : function()
			{
				ChangeZindex("mc_boss", sop.raidBattle.depth[0]);
				ChangeZindex("mc_battleCtr", sop.raidBattle.depth[1]);
			},
			
		};
		
		//====================================================================
		//							ボス関連
		//====================================================================
		sop.raidBattle.boss = {
			bossMC			: rootBoss.mc_boss,		//レイドボスMC
			
			//ノーマル攻撃
			attack : function(animeData)
			{
				//攻撃パターン算出
				var atkID	= animeData["bossAtkID"];
				var setFrm	= "atk_" + atkID;
				
				//攻撃再生
				sop.raidBattle.boss.bossMC.gotoAndPlay(setFrm);
			},
			
			//待機
			wait : function()
			{
				sop.raidBattle.boss.bossMC.gotoAndPlay("wait");
			},
			
			//死亡アニメーション
			death : function()
			{
				sop.raidBattle.boss.bossMC.gotoAndPlay("death");
				
				//★★★★★討伐イベント用：勝利時＆宝箱演出の場合★★★★★
				var animeData	= sop.raidBattle.gameMaster.getAnimeData();
				var rare		= animeData["evCarnival_getItem"];
				if(rare > 0 && rare != undefined)
				{
					//数秒後に宝箱演出を再生する
					sop.raidBattle.ev28Work.goAnime(rare);
				}
			},
			
			//追加ダメージ　毒
			addDamage_poison : function(animeData)
			{
				sop.raidBattle.boss.bossMC.gotoAndPlay("poison");
			},
			
			//追加ダメージ　混乱
			addDamage_confu : function(animeData)
			{
				sop.raidBattle.boss.bossMC.gotoAndPlay("confu");
			},
			
			//被弾後の生死判定
			damageCheck : function()
			{
				//今のアニメーデータを取得
				var animeData = sop.raidBattle.gameMaster.getAnimeData();
				
				//判定
				if(animeData["boss_death"] != undefined && animeData["boss_death"] == true)
				{
					//ボスの死亡アニメーション再生
					sop.raidBattle.boss.death();
				}
				else
				{
					//待機へ
					sop.raidBattle.boss.wait();
				}
			},
			
			//ボスを手前に表示
			dispFront : function()
			{
				//※イレギュラースキルでカットイン表示ある場合は、深度変更を調整
				ChangeZindex("mc_battleCtr", sop.raidBattle.depth[0]);
				ChangeZindex("mc_boss", sop.raidBattle.depth[1]);
			},
		
		};
		
		//====================================================================
		//				カットイン関連（イレギュラースキルの対応）
		//====================================================================
		sop.raidBattle.cutin = {
			tgMC_counter		: exportRoot.mc_cutinCounter,			//カウンター
			tgMC_scapegoat		: exportRoot.mc_cutinScapegoat,			//スケープゴート
			
			//カウンターのカットインON
			counterON	: function()
			{
				sop.raidBattle.cutin.tgMC_counter.gotoAndPlay("in");
			},
			
			//カウンターのカットインOFF
			counterOFF	: function()
			{
				sop.raidBattle.cutin.tgMC_counter.gotoAndPlay("out");
			},
			
			//カウンターのカットインを隠す
			counterHide	: function()
			{
				sop.raidBattle.cutin.tgMC_counter.gotoAndStop("hide");
			},
			
			//スケープゴートのカットインON
			scapegoatON	: function()
			{
				sop.raidBattle.cutin.tgMC_scapegoat.gotoAndPlay("in");
			},
			
			//スケープゴートのカットインOFF
			scapegoatOFF	: function()
			{
				sop.raidBattle.cutin.tgMC_scapegoat.gotoAndPlay("out");
			},
			
			//スケープゴートのカットインを隠す
			scapegoatHide	: function()
			{
				sop.raidBattle.cutin.tgMC_scapegoat.gotoAndStop("hide");
			}
		};
		
		//====================================================================
		//							結果ウィンドウ
		//====================================================================
		sop.raidBattle.resultWindow = {
			tgMC	: exportRoot.mc_resultWindow,
			
			dispON : function(rID)
			{
				var tgMC		= sop.raidBattle.resultWindow.tgMC;
				tgMC.visible	= true;
				tgMC.gotoAndPlay(rID);
			},
			
			dispOFF : function()
			{
				var tgMC		= sop.raidBattle.resultWindow.tgMC;
				tgMC.visible	= false;
			}
		};
		
		//====================================================================
		//						属性別被弾エフェクト
		//====================================================================
		sop.raidBattle.effHitAttri = {
			tgMC		: exportRoot.mc_user.mc_effHitAttri,	//ユーザーの被弾エフェクト
			tgMC_boss	: rootBoss.mc_boss.mc_effHitAttri,		//ボスの被弾エフェクト
			
			//起動判定と実行
			checkPlay : function(animeData)
			{
				if(animeData["attributeID"] != undefined && animeData["attributeID"] > 0)
				{
					var setID = animeData["attributeID"];
					sop.raidBattle.effHitAttri.dispON(setID);
				}
				else
				{
					sop.raidBattle.effHitAttri.dispOFF();
				}
			},
			
			//表示
			dispON : function(setID)
			{
				sop.raidBattle.effHitAttri.tgMC.dispFrm = setID -1;
				sop.raidBattle.effHitAttri.tgMC.gotoAndPlay("st");
			},
			
			//非表示
			dispOFF : function()
			{
				sop.raidBattle.effHitAttri.tgMC.gotoAndPlay("hide");
			},
			
			//ボスの被弾エフェクト起動
			boss_dispON : function()
			{
				//今のアニメーデータを取得
				var animeData = sop.raidBattle.gameMaster.getAnimeData();
				
				if(animeData["attributeID"] != undefined && animeData["attributeID"] > 0)
				{
					var setID = animeData["attributeID"];
					sop.raidBattle.effHitAttri.tgMC_boss.dispFrm = setID -1;
					sop.raidBattle.effHitAttri.tgMC_boss.gotoAndPlay("st");
				}
				else
				{
					sop.raidBattle.effHitAttri.boss_dispOFF();
				}
			},
			
			//ボスの被弾エフェクトを非表示
			boss_dispOFF : function()
			{
				sop.raidBattle.effHitAttri.tgMC_boss.gotoAndPlay("hide");
			},
			
		};
		
		
		//====================================================================
		//						ダメージ表示関連
		//====================================================================
		sop.raidBattle.dmg = {
			tgMC		: exportRoot.mc_dmgPt,
			tgMC_boss	: rootBoss.mc_dmgPt,
			
			//アバターのダメージ座標
			userPosX	: 68,
			userPosY	: 104,
			
			//ボスのダメージ座標
			bossPosX	: rootBoss.dmgPosX,
			bossPosY	: rootBoss.dmgPosY,
			
			//ダメージ値の画像のサイズ
			imgW		: 18,
			imgH		: 25,
		
			//ダメージの表示　※旧コード対応な為、結構ちから技
			dmgON : function()
			{
				//アニメデータ取得
				var animeData = sop.raidBattle.gameMaster.getAnimeData();
				
				//追加ダメージの場合
				if(animeData["sickID"] != undefined)
				{
					if(animeData["actionTeam"] == 1)
					{
						//ユーザーにダメージ表示
						//sop.raidBattle.gameMaster.setDamagePts(1, Number(animeData["damage"]));
						sop.raidBattle.dmg.userON(animeData["damage"], true);
					}
					else if(animeData["actionTeam"] == 2)
					{
						//ボスにダメージ表示
						//sop.raidBattle.gameMaster.setDamagePts(2, Number(animeData["damage"]));
						sop.raidBattle.dmg.bossON(animeData["damage"], true);
					}
				}
				//それ以外（通常攻撃、スキル）
				else
				{
					//ユーザーの攻撃（ボス位置にダメージ表示）
					if(animeData["actionTeam"] == 1)
					{
						//sop.raidBattle.gameMaster.setDamagePts(2, Number(animeData["damage"]));
						sop.raidBattle.dmg.userON(animeData["damage"], false);
					}
					//ボスの攻撃（ユーザー位置にダメージ表示）
					else if(animeData["actionTeam"] == 2)
					{
						//sop.raidBattle.gameMaster.setDamagePts(1, Number(animeData["damage"]));
						sop.raidBattle.dmg.bossON(animeData["damage"], false);
					}
				}
			},
			
			//ユーザーのダメージ値を表示
			userON : function(dmgPt, sickFlg)
			{
				//Dom版ダメージ表示
				//sop.raidBattle.gameMaster.startDamageAnime();
				
				sop.raidBattle.dmg.tgMC.visible	= true;
				sop.raidBattle.dmg.tgMC.dmgPt	= dmgPt;
				sop.raidBattle.dmg.tgMC.gotoAndPlay("st");
				
				//座標調整
				if(sickFlg == true)
				{
					sop.raidBattle.dmg.tgMC.x	= sop.raidBattle.dmg.userPosX;
					sop.raidBattle.dmg.tgMC.y	= sop.raidBattle.dmg.userPosY;
				}
				else
				{
					sop.raidBattle.dmg.tgMC.x	= sop.raidBattle.dmg.bossPosX;
					sop.raidBattle.dmg.tgMC.y	= sop.raidBattle.dmg.bossPosY;
				}
			},
			
			//ユーザーのダメージ値を非表示
			userOFF : function()
			{
				sop.raidBattle.dmg.tgMC.visible = false;
			},
			
			//ボスのダメージ値を表示
			bossON : function(dmgPt, sickFlg)
			{
				//Dom版ダメージ表示
				//sop.raidBattle.gameMaster.startDamageAnime();
				
				sop.raidBattle.dmg.tgMC_boss.visible	= true;
				sop.raidBattle.dmg.tgMC_boss.dmgPt		= dmgPt;
				sop.raidBattle.dmg.tgMC_boss.gotoAndPlay("st");
				
				//座標調整
				if(sickFlg == true)
				{
					sop.raidBattle.dmg.tgMC_boss.x	= sop.raidBattle.dmg.bossPosX;
					sop.raidBattle.dmg.tgMC_boss.y	= sop.raidBattle.dmg.bossPosY;
				}
				else
				{
					sop.raidBattle.dmg.tgMC_boss.x	= sop.raidBattle.dmg.userPosX;
					sop.raidBattle.dmg.tgMC_boss.y	= sop.raidBattle.dmg.userPosY;
				}
				
			},
			
			//ボスのダメージ値を非表示
			bossOFF : function()
			{
				sop.raidBattle.dmg.tgMC_boss.visible = false;
			},
		
		};
		
		//====================================================================
		//					討伐イベントの追加機能
		//====================================================================
		sop.raidBattle.ev28Work = {
			tgMC	: exportRoot.mc_ev28,
		
			//討伐イベントの演出を再生
			goAnime : function(rareID)
			{
				var tgMC = sop.raidBattle.ev28Work.tgMC;
				
				//パーツゲット演出再生
				tgMC.rareID = rareID;
				tgMC.gotoAndPlay("st");
			},
		};
		
		//==================================================================
		//							初期描画
		//==================================================================
		//ファイル起動時の生死状態対応
		//sop.raidBattle.gameMaster.aliveDraw();
		
		//勝敗結果の表示
		sop.raidBattle.gameMaster.resultON();
		
		//イレギュラースキルのカットインを非表示
		sop.raidBattle.cutin.counterHide();
		sop.raidBattle.cutin.scapegoatHide();
		
		//属性別被弾エフェクトを非表示
		sop.raidBattle.effHitAttri.dispOFF();
		sop.raidBattle.effHitAttri.boss_dispOFF();
		
		//ダメージ値を非表示
		sop.raidBattle.dmg.userOFF();
		sop.raidBattle.dmg.bossOFF();
	}
	this.frame_1 = function() {
		//※最初の受付
		animeEnd();
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1));

	// mask
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhOHBOHMAAAicOMCcOAAAMAAACcOgA4/R+MAx/AAAMAAAgj7Mgx/AAAg");
	this.shape.setTransform(160,115);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).wait(2));

	// skillControl
	this.mc_skill_control = new lib.mc_skill_control();
	this.mc_skill_control.setTransform(340,10,1,1,0,0,0,10,10);
	this.mc_skill_control.alpha = 0.012;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_skill_control}]}).wait(2));

	// window_result
	this.mc_resultWindow = new lib.mc_window_result();
	this.mc_resultWindow.setTransform(160,115,1,1,0,0,0,160,115);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_resultWindow}]}).wait(2));

	// evCarnival
	this.mc_ev28 = new lib.mc_ev28();
	this.mc_ev28.setTransform(160,115,1,1,0,0,0,160,115);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_ev28}]}).wait(2));

	// user_dmg
	this.mc_dmgPt = new lib.mc_dmgPt();
	this.mc_dmgPt.setTransform(68,104);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_dmgPt}]}).wait(2));

	// user
	this.mc_user = new lib.mc_user();
	this.mc_user.setTransform(50,210,1,1,0,0,0,50,210);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_user}]}).wait(2));

	// cutin_counter
	this.mc_cutinCounter = new lib.mc_cutin_counter();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_cutinCounter}]}).wait(2));

	// cutin_scapegoat
	this.mc_cutinScapegoat = new lib.mc_cutin_scapegoat();
	this.mc_cutinScapegoat.setTransform(160,115,1,1,0,0,0,160,115);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_cutinScapegoat}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-339.9,-384.9,1000,1000);


// symbols:
(lib.画面モック = function() {
	this.initialize(img.画面モック);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,230);


(lib.backLight = function() {
	this.initialize(img.backLight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,130,130);


(lib.cutin_counter = function() {
	this.initialize(img.cutin_counter);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,52);


(lib.cutin_scapegoat = function() {
	this.initialize(img.cutin_scapegoat);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,52);


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


(lib.eff_alive = function() {
	this.initialize(img.eff_alive);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,205);


(lib.eff_heal_w = function() {
	this.initialize(img.eff_heal_w);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,100,44);


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


(lib.ev28_getCard1 = function() {
	this.initialize(img.ev28_getCard1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getCard2 = function() {
	this.initialize(img.ev28_getCard2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getCard3 = function() {
	this.initialize(img.ev28_getCard3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getCard4 = function() {
	this.initialize(img.ev28_getCard4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getCard5 = function() {
	this.initialize(img.ev28_getCard5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getCard6 = function() {
	this.initialize(img.ev28_getCard6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getCard7 = function() {
	this.initialize(img.ev28_getCard7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getCard8 = function() {
	this.initialize(img.ev28_getCard8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,90);


(lib.ev28_getEff1 = function() {
	this.initialize(img.ev28_getEff1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,50);


(lib.ev28_getEff2 = function() {
	this.initialize(img.ev28_getEff2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,50);


(lib.ev28_getEff3 = function() {
	this.initialize(img.ev28_getEff3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,50);


(lib.ev28_getEff4 = function() {
	this.initialize(img.ev28_getEff4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,50);


(lib.ev28_getEffP = function() {
	this.initialize(img.ev28_getEffP);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,98);


(lib.ev28_getText1 = function() {
	this.initialize(img.ev28_getText1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,52);


(lib.ev28_getText2 = function() {
	this.initialize(img.ev28_getText2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,52);


(lib.ev28_icon = function() {
	this.initialize(img.ev28_icon);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,40,36);


(lib.ev28_inText1 = function() {
	this.initialize(img.ev28_inText1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,70,35);


(lib.ev28_inText2 = function() {
	this.initialize(img.ev28_inText2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,70,35);


(lib.ev28_inText3 = function() {
	this.initialize(img.ev28_inText3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,70,35);


(lib.ev28_logoNextBoss = function() {
	this.initialize(img.ev28_logoNextBoss);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,260,118);


(lib.ev28_shadow = function() {
	this.initialize(img.ev28_shadow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,40);


(lib.ev28_treasureBox1 = function() {
	this.initialize(img.ev28_treasureBox1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,112,88);


(lib.ev28_treasureBox2 = function() {
	this.initialize(img.ev28_treasureBox2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,112,88);


(lib.ev28_treasureBox3 = function() {
	this.initialize(img.ev28_treasureBox3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,112,88);


(lib.getItem_HR = function() {
	this.initialize(img.getItem_HR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,79,79);


(lib.getItem_R = function() {
	this.initialize(img.getItem_R);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,79,79);


(lib.getItem_SR = function() {
	this.initialize(img.getItem_SR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,79,79);


(lib.getItem_SSR = function() {
	this.initialize(img.getItem_SSR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,79,79);


(lib.getText_HR = function() {
	this.initialize(img.getText_HR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,146,70);


(lib.getText_R = function() {
	this.initialize(img.getText_R);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,146,70);


(lib.getText_SR = function() {
	this.initialize(img.getText_SR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,146,70);


(lib.getText_SSR = function() {
	this.initialize(img.getText_SSR);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,146,70);


(lib.miss = function() {
	this.initialize(img.miss);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,68,26);


(lib.nextBoss1 = function() {
	this.initialize(img.nextBoss1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.recNum0 = function() {
	this.initialize(img.recNum0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum1 = function() {
	this.initialize(img.recNum1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum2 = function() {
	this.initialize(img.recNum2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum3 = function() {
	this.initialize(img.recNum3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum4 = function() {
	this.initialize(img.recNum4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum5 = function() {
	this.initialize(img.recNum5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum6 = function() {
	this.initialize(img.recNum6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum7 = function() {
	this.initialize(img.recNum7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum8 = function() {
	this.initialize(img.recNum8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.recNum9 = function() {
	this.initialize(img.recNum9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,18,25);


(lib.skill45_eff1 = function() {
	this.initialize(img.skill45_eff1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,56,92);


(lib.skill45_eff2 = function() {
	this.initialize(img.skill45_eff2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,92,86);


(lib.skill45_eff3 = function() {
	this.initialize(img.skill45_eff3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,80,52);


(lib.skill45_eff4 = function() {
	this.initialize(img.skill45_eff4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,82,80);


(lib.test = function() {
	this.initialize(img.test);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,230);


(lib.text_joblvup = function() {
	this.initialize(img.text_joblvup);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,92,32);


(lib.text_lose = function() {
	this.initialize(img.text_lose);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,308,72);


(lib.text_win = function() {
	this.initialize(img.text_win);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,306,72);


(lib.mc_txt_avoid = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.miss();
	this.instance.setTransform(-33.9,-12.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-33.9,-12.9,68,26);


(lib.mc_skill_control = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{wait:0,start:1,loop1:15});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		//表示調整
		skillDispAdjust_start();
		
		//ユーザーユニット位置をリセット
		rootSkill.x = 0;
		
		//待機
		rootSkill.gotoAndStop("wait");
	}
	this.frame_6 = function() {
		//背景を動かす
		sop.raidBattle.gameMaster.bgMoveLeft();
		
		//ボスをはける
		rootBoss.gotoAndPlay("hake");
		
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 5;
	}
	this.frame_7 = function() {
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 7.5;
	}
	this.frame_8 = function() {
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 9;
	}
	this.frame_9 = function() {
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 10;
	}
	this.frame_12 = function() {
		//スキル名を表示
		skillNameWindowDisp(true);
	}
	this.frame_14 = function() {
		//オーラ演出ON
		rootSkill.gotoAndPlay("aura");
	}
	this.frame_16 = function() {
		//オーラ演出が終わったかのチェック
		if(rootSkill.endFlg == false)
		{
			this.gotoAndPlay("loop1");
		}
		else
		{
			//スキル起動
			rootSkill.gotoAndPlay("cutin");
			
			//スキル名を非表示　※スキルによってはskillStage内で指定してもOK
			skillNameWindowDisp(false);
		}
	}
	this.frame_17 = function() {
		//背景戻す
		sop.raidBattle.gameMaster.bgMoveLeftBack();
		
		//ボス戻す
		rootBoss.gotoAndPlay("hakeBack");
		
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 5;
	}
	this.frame_18 = function() {
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 2.5;
	}
	this.frame_19 = function() {
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 1;
	}
	this.frame_20 = function() {
		//ユーザーユニットを動かす（※直打ちでアニメ）
		rootSkill.x = 0;
	}
	this.frame_21 = function() {
		//※スキル終了→次の処理はskillStageの最後のフレームに記述してる
		
		
		this.gotoAndStop("wait");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(5).call(this.frame_6).wait(1).call(this.frame_7).wait(1).call(this.frame_8).wait(1).call(this.frame_9).wait(3).call(this.frame_12).wait(2).call(this.frame_14).wait(2).call(this.frame_16).wait(1).call(this.frame_17).wait(1).call(this.frame_18).wait(1).call(this.frame_19).wait(1).call(this.frame_20).wait(1).call(this.frame_21));

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66FF00").s().p("AhjBjIAAjGIDGAAIAADGg");
	this.shape.setTransform(10,10);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[]},1).wait(21));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,20,20);


(lib.mc_eff_confu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.eff_status_confu1();
	this.instance.setTransform(-24.9,-12.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{scaleX:1,scaleY:1,rotation:0,x:-24.9,y:-12.4}}]}).to({state:[{t:this.instance,p:{scaleX:0.9,scaleY:0.6,rotation:180,x:27.5,y:9.5}}]},3).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.9,-12.4,50,25);


(lib.CharacterMC = function() {
	this.initialize();

	// Maker
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(5,1,1).p("AAAnzIAAHzIH0AAAAAH0IAAn0InzAA");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.9,-49.9,100,100);


(lib.mc_ev28TreasureBox = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_2 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2));

	// レイヤー 1
	this.instance = new lib.ev28_treasureBox1();
	this.instance.setTransform(-55.9,-43.9);

	this.instance_1 = new lib.ev28_treasureBox2();
	this.instance_1.setTransform(-55.9,-43.9);

	this.instance_2 = new lib.ev28_treasureBox3();
	this.instance_2.setTransform(-55.9,-43.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.9,-43.9,112,88);


(lib.mc_ev28GetText = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_2 = function() {
		//サウンド：HR獲得
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('CarnivalEvent11_HRget'); });
	}
	this.frame_3 = function() {
		//サウンド：SR獲得
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('CarnivalEvent12_SRget'); });
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1).call(this.frame_3));

	// img
	this.instance = new lib.getText_R();
	this.instance.setTransform(-72.9,-34.9);

	this.instance_1 = new lib.getText_HR();
	this.instance_1.setTransform(-72.9,-34.9);

	this.instance_2 = new lib.getText_SR();
	this.instance_2.setTransform(-72.9,-34.9);

	this.instance_3 = new lib.getText_SSR();
	this.instance_3.setTransform(-72.9,-34.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.9,-34.9,146,70);


(lib.mc_ev28GetPartsEff1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ev28_getEffP();
	this.instance.setTransform(-48.9,-48.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-48.9,-48.9,98,98);


(lib.mc_ev28EffBall = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ev28_getEff4();
	this.instance.setTransform(-24.9,-24.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-24.9,-24.9,50,50);


(lib.mc_ev24Shadow = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ev28_shadow();
	this.instance.setTransform(-99.9,-19.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-99.9,-19.9,200,40);


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


(lib.mc_curePtNum = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var num = this.curePts;
		this.gotoAndStop(num);
		//this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9));

	// レイヤー 2
	this.instance = new lib.recNum0();
	this.instance.setTransform(-8.9,-12.4);

	this.instance_1 = new lib.recNum1();
	this.instance_1.setTransform(-8.9,-12.4);

	this.instance_2 = new lib.recNum2();
	this.instance_2.setTransform(-8.9,-12.4);

	this.instance_3 = new lib.recNum3();
	this.instance_3.setTransform(-8.9,-12.4);

	this.instance_4 = new lib.recNum4();
	this.instance_4.setTransform(-8.9,-12.4);

	this.instance_5 = new lib.recNum5();
	this.instance_5.setTransform(-8.9,-12.4);

	this.instance_6 = new lib.recNum6();
	this.instance_6.setTransform(-8.9,-12.4);

	this.instance_7 = new lib.recNum7();
	this.instance_7.setTransform(-8.9,-12.4);

	this.instance_8 = new lib.recNum8();
	this.instance_8.setTransform(-8.9,-12.4);

	this.instance_9 = new lib.recNum9();
	this.instance_9.setTransform(-8.9,-12.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.9,-12.4,18,25);


(lib.mc_animeStCtr = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{st:1});

	// timeline functions:
	this.frame_0 = function() {
		//インターバルの定義
		this.cnt	= 0;
		this.cntMax	= 45;
		
		
		this.stop();
	}
	this.frame_2 = function() {
		if(this.cnt < this.cntMax)
		{
			this.cnt++;
			this.gotoAndPlay("st");
		}
		else
		{
			//演出開始
			this.parent.gotoAndPlay("goAnime");
			
			//リセット
			this.gotoAndStop(0);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2));

	// marker
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.098)").s().p("AhAA3IAAhtICBAAIAABtg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[]},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-5.4,13,11);


(lib.kira = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AABAZQgBgRgCgDQgDgDgOgBIgKgBIgEAAIAPAAQAOAAACgDQACgCAAgQIABgPIABAQQACAQABABQADACAMABIAOAAIgNABQgMABgEADQgCADgCARIAAAMIAAgMg");
	this.shape.setTransform(3.4,3.8);

	// レイヤー 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#B4F3F1","rgba(84,255,193,0.027)"],[0,0.761],0,0,0,0,0,2.5).s().p("AgMANQgFgFAAgIQAAgGAFgGQAGgFAGgBQAHABAGAFQAFAGAAAGQAAAIgFAFQgGAGgHgBQgGABgGgGg");
	this.shape_1.setTransform(3.5,3.8);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,6.8,7.6);


(lib.gra_skill45_charaDie = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill45_eff2();
	this.instance.setTransform(-45.9,-42.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-45.9,-42.9,92,86);


(lib.gra_skill45_chara = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.skill45_eff1();
	this.instance.setTransform(-27.9,-91.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-27.9,-91.9,56,92);


(lib.gra_logo_win = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.text_win();
	this.instance.setTransform(-152.9,-35.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-152.9,-35.9,306,72);


(lib.gra_logo_lose = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.text_lose();
	this.instance.setTransform(-153.9,-35.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-153.9,-35.9,308,72);


(lib.gra_joblvup = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.text_joblvup();
	this.instance.setTransform(-45.9,-15.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-45.9,-15.9,92,32);


(lib.gra_healEff = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.eff_heal_w();
	this.instance.setTransform(-49.9,-21.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-49.9,-21.9,100,44);


(lib.gra_heal_p2 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,255,255,0.051)","rgba(226,254,220,0.6)","rgba(160,233,144,0.702)"],[0,0.357,1],0,-46.9,0,33).s().p("AnBH0IAAvmIODAAIAAPmg");
	this.shape.setTransform(0,-49.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-44.9,-99.9,90,100);


(lib.gra_heal_p1 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,255,255,0.6)","rgba(140,255,121,0.502)","rgba(140,255,121,0)"],[0.118,0.651,1],0,0,0,0,0,50.1).s().p("AmDAwQihgUAAgcQAAgbChgVQChgVDiAAQDjAAChAVQChAVAAAbQAAAcihAUQihAWjjAAQjiAAihgWg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-54.9,-6.9,110,14);


(lib.gra_eff_heal_upLine = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFEF1","rgba(255,254,241,0.2)"],[0.196,1],0,0,0,0,0,5.4).s().p("AgiAjQgPgPAAgUQAAgTAPgPQAPgPATAAQAUAAAPAPQAPAPAAATQAAAUgPAPQgPAPgUAAQgTAAgPgPg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-4.9,-4.9,10,10);


(lib.gra_cutinScapegoatIMG = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cutin_scapegoat();
	this.instance.setTransform(-159.9,-25.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-159.9,-25.9,320,52);


(lib.gra_cutinCounterIMG = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cutin_counter();
	this.instance.setTransform(-159.9,-25.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-159.9,-25.9,320,52);


(lib.gra_cure_p1 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,255,255,0.8)","rgba(255,253,121,0.8)","rgba(255,253,121,0.8)","rgba(255,253,121,0)"],[0.051,0.259,0.745,1],0,0,0,0,0,51.7).s().p("AmDGBQihihAAjgQAAjfChikQChihDiAAQDjAAChChQChCkAADfQAADgihChQihCkjjAAQjiAAihikg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-54.9,-54.9,110,110);


(lib.gra_black = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgxAxIAAhiIBiAAIAABig");
	this.shape.setTransform(5,5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,10,10);


(lib.gra_alive_p2 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(254,255,231,0.039)","rgba(254,255,230,0.302)","rgba(250,255,163,0.6)","rgba(250,255,163,0.6)"],[0,0.282,0.565,1],0.1,-68.9,0,51).s().p("AmOLuIAA3bIMdAAIAAXbg");
	this.shape.setTransform(0,-74.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-39.9,-149.9,80,150);


(lib.gra_alive_p1 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,253,121,0.8)","#FDFFD7","rgba(253,255,215,0.8)","rgba(253,255,215,0)"],[0.102,0.259,0.573,1],0,0,0,0,0,53.6).s().p("AmDGBQihihAAjgQAAjfChikQChihDiAAQDjAAChChQChCkAADfQAADgihChQihCkjjAAQjiAAihikg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-54.9,-54.9,110,110);


(lib.gra_alive_eff1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.eff_alive();
	this.instance.setTransform(-119.9,0);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-119.9,0,240,205);


(lib.eff_cure_p2 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,253,99,0.102)","rgba(255,255,206,0.918)","rgba(255,255,255,0.902)","rgba(255,255,255,0.902)","rgba(255,255,206,0.8)","rgba(255,253,99,0.102)"],[0,0.365,0.447,0.541,0.616,1],-3.9,0,4,0).s().p("AgmSvMAAAgldIBNAAMAAAAldg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-3.9,-119.9,8,240);


(lib.cutinEffWhite = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A4/R+MAAAgj7MAx/AAAMAAAAj7g");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-159.9,-114.9,320,230);


(lib.gra_backLight = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.backLight();
	this.instance.setTransform(-64.9,-64.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-64.9,-64.9,130,130);


(lib.getCards = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// getItemIMG
	this.instance = new lib.getItem_R();
	this.instance.setTransform(-39.4,-39.4);

	this.instance_1 = new lib.getItem_HR();
	this.instance_1.setTransform(-39.4,-39.4);

	this.instance_2 = new lib.getItem_SR();
	this.instance_2.setTransform(-39.4,-39.4);

	this.instance_3 = new lib.getItem_SSR();
	this.instance_3.setTransform(-39.4,-39.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.4,-39.4,79,79);


(lib.shape21 = function() {
	this.initialize();

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgGAJIgXAEIAQgPIgKgWIAVALIAPgRIgEAYIAVAJIgXAEIgEAYg");
	this.shape.setTransform(21.4,3.4);

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(255,255,204,0.498)").ss(1,1,1).p("ABIAkQAsgLAPgQQAdgdiUgWQg3gIgpAKQgjAIgMATQgKAQASARQAUATAvAH");
	this.shape_1.setTransform(20.3,-1.1);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(6.7,-5.8,27.3,12.4);


(lib.shape20 = function() {
	this.initialize();

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgCAJIgOAFIAIgNIgKgKIAPADIAGgNIACAPIAOAEIgNAFIAAAPg");
	this.shape.setTransform(24.1,-7.5);

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgHAHIgVgHIAVgGIACgYIAMATIAWgFIgNAQIAMAUIgWgIIgNATg");
	this.shape_1.setTransform(11.7,5.8);

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(255,255,204,0.498)").ss(1,1,1).p("AB3g2QAOAGgBALQgDAWhPAaAh3A3QgOgHACgKQAEgWBSgV");
	this.shape_2.setTransform(19,-0.9);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(5.7,-9.5,26.6,18.6);


(lib.shape19 = function() {
	this.initialize();

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgIAHIgVgJIAXgEIAEgYIAJAWIAXgEIgQAPIAKAWIgVgLIgPARg");
	this.shape.setTransform(18.6,-3.3);

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(255,255,204,0.498)").ss(1,1,1).p("AhHgjQgsALgPAQQgdAdCUAWQA3AIApgKQAjgIAMgTQAKgQgSgRQgUgTgvgH");
	this.shape_1.setTransform(19.7,1.2);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(6.1,-6.4,27.3,12.4);


(lib.shape18 = function() {
	this.initialize();

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgEAEIgOgEIAOgDIACgQIAGANIAPgEIgJAKIAIANIgPgFIgHAMg");
	this.shape.setTransform(13.9,-7.3);

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgEANIgWAIIAMgUIgPgQIAXAFIALgUIADAYIAWAGIgWAHIABAYg");
	this.shape_1.setTransform(26.7,5.6);

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(255,255,204,0.498)").ss(1,1,1).p("Ah4gyQgNAFABAMQADAVBQAYAB5AzQAOgGgCgLQgFgWhSgT");
	this.shape_2.setTransform(19.2,-0.8);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(5.9,-9.4,26.8,18.2);


(lib.mc_window_result = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{win:0,lose:14});

	// timeline functions:
	this.frame_13 = function() {
		this.stop();
	}
	this.frame_25 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(13).call(this.frame_13).wait(12).call(this.frame_25));

	// win
	this.instance = new lib.gra_logo_win("synched",0);
	this.instance.setTransform(160,115,1.5,1.5);
	this.instance.alpha = 0.102;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.4,scaleY:1.4,alpha:0.602},9).to({scaleX:0.8,scaleY:0.8,alpha:1},2).to({scaleX:1.1,scaleY:1.1},1).to({scaleX:1,scaleY:1},1).to({_off:true},1).wait(12));

	// lose
	this.instance_1 = new lib.gra_logo_lose("synched",0);
	this.instance_1.setTransform(160.5,95);
	this.instance_1.alpha = 0.102;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({startPosition:0,_off:false},0).to({y:115,alpha:1},6,cjs.Ease.get(0.8)).wait(1));

	// black
	this.instance_2 = new lib.gra_black("synched",0);
	this.instance_2.setTransform(160,115,33,24,0,0,0,5,5);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({startPosition:0,_off:false},0).to({alpha:0.602},8,cjs.Ease.get(0.8)).to({startPosition:0},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(55.8,206.5,688.5,162);


(lib.mc_eff_particleAnime1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.cnt = Math.floor(Math.random() *3);
	}
	this.frame_1 = function() {
		if(this.cnt != 0)
		{
			this.gotoAndPlay(0);
		}
	}
	this.frame_8 = function() {
		this.gotoAndPlay(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(7).call(this.frame_8));

	// レイヤー 1
	this.instance = new lib.gra_eff_heal_upLine("synched",0);
	this.instance.setTransform(0,0,0.25,4.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({startPosition:0,_off:false},0).to({scaleX:0.2,y:-79.8,alpha:1},2).to({scaleX:0.25,y:-159.8,alpha:0},2).to({_off:true},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.mc_eff_jobLvUP = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{loop:4,end:9});

	// timeline functions:
	this.frame_0 = function() {
		this.status = "animeON";
	}
	this.frame_1 = function() {
		//ＭＣを再生
		//for(var i = 0; i < 6; i++)
		//{
		//	var tgMC = this["eff_line" + (i+1)];
		//	tgMC.gotoAndPlay(0);
		//}
	}
	this.frame_3 = function() {
		this.cnt	= 0;
		this.cMax	= 15;
	}
	this.frame_5 = function() {
		if(this.cnt < this.cMax)
		{
			this.cnt++;
			this.gotoAndPlay("loop");
		}
	}
	this.frame_6 = function() {
		this.status = "animeOFF";
	}
	this.frame_8 = function() {
		this.stop();
	}
	this.frame_9 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(2).call(this.frame_3).wait(2).call(this.frame_5).wait(1).call(this.frame_6).wait(2).call(this.frame_8).wait(1).call(this.frame_9));

	// レイヤー 4
	this.eff_line5 = new lib.mc_eff_particleAnime1();
	this.eff_line5.setTransform(-15.9,-29.9);

	this.eff_line6 = new lib.mc_eff_particleAnime1();
	this.eff_line6.setTransform(5,-38.9,0.8,0.8);

	this.eff_line2 = new lib.mc_eff_particleAnime1();
	this.eff_line2.setTransform(-22.9,3);

	this.eff_line3 = new lib.mc_eff_particleAnime1();
	this.eff_line3.setTransform(-3.9,-5.9,0.8,0.8);

	this.eff_line4 = new lib.mc_eff_particleAnime1();
	this.eff_line4.setTransform(13,-15.9);

	this.eff_line1 = new lib.mc_eff_particleAnime1();
	this.eff_line1.setTransform(23,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.eff_line1},{t:this.eff_line4},{t:this.eff_line3},{t:this.eff_line2},{t:this.eff_line6},{t:this.eff_line5}]},1).to({state:[]},5).to({state:[]},3).wait(1));

	// レイヤー 3
	this.instance = new lib.gra_joblvup("synched",0);
	this.instance.setTransform(0,-5.9,0.7,0.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({startPosition:0,_off:false},0).to({scaleX:1.1,scaleY:1.1},1).to({scaleX:1,scaleY:1},1).to({startPosition:0},2).to({alpha:0.199},2).to({_off:true},1).wait(2));

	// レイヤー 2
	this.instance_1 = new lib.gra_alive_p2("synched",0);
	this.instance_1.setTransform(0,1,0.7,0.205,0,0,0,0,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:0.9,scaleY:1.46},2).to({startPosition:0},3).to({scaleX:1,alpha:0.199},2).to({_off:true},1).wait(2));

	// レイヤー 1
	this.instance_2 = new lib.gra_alive_p1("synched",0);
	this.instance_2.setTransform(0,0,0.6,0.12);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.9},2).to({startPosition:0},3).to({scaleX:1,alpha:0.199},2).to({_off:true},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.7,-5.3,39.6,6.3);


(lib.mc_cutin_scapegoat = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{begin:0,"in":1,out:7,hide:12});

	// timeline functions:
	this.frame_0 = function() {
		sop.raidBattle.cutin.scapegoatHide();
	}
	this.frame_1 = function() {
		this.sID = "in";
	}
	this.frame_5 = function() {
		//ユーザーを手前に表示
		sop.raidBattle.user.dispFront();
	}
	this.frame_6 = function() {
		this.sID = "in_end";
		
		this.stop();
	}
	this.frame_7 = function() {
		this.sID = "out";
	}
	this.frame_11 = function() {
		this.sID = "out_end";
		
		this.stop();
	}
	this.frame_12 = function() {
		this.sID = "hide";
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(4).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(4).call(this.frame_11).wait(1).call(this.frame_12));

	// white
	this.instance = new lib.cutinEffWhite("synched",0);
	this.instance.setTransform(160,115);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({startPosition:0,_off:false},0).to({scaleY:0.2,y:46},1).to({scaleY:0.26,alpha:0.5},1).to({_off:true},1).wait(9));

	// レイヤー 8
	this.instance_1 = new lib.cutinEffWhite("synched",0);
	this.instance_1.setTransform(160,46,1,0.043);
	this.instance_1.alpha = 0.5;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({startPosition:0,_off:false},0).wait(1).to({scaleY:0.01,alpha:1},0).to({_off:true},1).wait(2));

	// レイヤー 3
	this.instance_2 = new lib.gra_cutinScapegoatIMG("synched",0);
	this.instance_2.setTransform(160,46,1.06,1.06);
	this.instance_2.alpha = 0.602;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({startPosition:0,_off:false},0).wait(1).to({scaleX:1.1,scaleY:1.1,alpha:0.301},0).to({_off:true},1).wait(7));

	// レイヤー 2
	this.instance_3 = new lib.gra_cutinScapegoatIMG("synched",0);
	this.instance_3.setTransform(160,46,1,1.18);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({startPosition:0,_off:false},0).to({scaleY:1},1).to({startPosition:0},3).to({scaleY:1.1},1).to({scaleY:0.2},1).to({_off:true},1).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.mc_cutin_counter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"begin":0,"in":1,"out":7,"hide":12});

	// timeline functions:
	this.frame_0 = function() {
		sop.raidBattle.cutin.counterHide();
	}
	this.frame_1 = function() {
		this.sID = "in";
	}
	this.frame_5 = function() {
		//ユーザーを手前に表示
		sop.raidBattle.user.dispFront();
	}
	this.frame_6 = function() {
		//★★★ダメージ値の座標を調整★★★
		sop.raidBattle.dmg.bossPosY = 100;
		
		
		this.sID = "in_end";
		
		this.stop();
	}
	this.frame_7 = function() {
		this.sID = "out";
	}
	this.frame_11 = function() {
		//★★★ダメージ値の座標を戻す★★★
		sop.raidBattle.dmg.bossPosY = rootBoss.dmgPosY;
		
		
		this.sID = "out_end";
		
		this.stop();
	}
	this.frame_12 = function() {
		this.sID = "hide";
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(4).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(4).call(this.frame_11).wait(1).call(this.frame_12));

	// white
	this.instance = new lib.cutinEffWhite("synched",0);
	this.instance.setTransform(160,115);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({startPosition:0,_off:false},0).to({scaleY:0.2,y:46},1).to({scaleY:0.26,alpha:0.5},1).to({_off:true},1).wait(9));

	// レイヤー 8
	this.instance_1 = new lib.cutinEffWhite("synched",0);
	this.instance_1.setTransform(160,46,1,0.043);
	this.instance_1.alpha = 0.5;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({startPosition:0,_off:false},0).wait(1).to({scaleY:0.01,alpha:1},0).to({_off:true},1).wait(2));

	// レイヤー 7
	this.instance_2 = new lib.gra_cutinCounterIMG("synched",0);
	this.instance_2.setTransform(160,46,1.06,1.06);
	this.instance_2.alpha = 0.602;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({startPosition:0,_off:false},0).wait(1).to({scaleX:1.1,scaleY:1.1,alpha:0.301},0).to({_off:true},1).wait(7));

	// cutin
	this.instance_3 = new lib.gra_cutinCounterIMG("synched",0);
	this.instance_3.setTransform(160,46,1,1.18);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({startPosition:0,_off:false},0).to({scaleY:1},1).to({startPosition:0},3).to({scaleY:1.1},1).to({scaleY:0.2},1).to({_off:true},1).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.mc_ev28GetCards = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"loop":8});

	// timeline functions:
	this.frame_1 = function() {
		//表示調整
		var setFrm = this.parent.rareID -1;
		this.card.gotoAndStop(setFrm);
	}
	this.frame_8 = function() {
		//表示調整
	}
	this.frame_28 = function() {
		this.gotoAndPlay("loop");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(7).call(this.frame_8).wait(20).call(this.frame_28));

	// item
	this.card = new lib.getCards();
	this.card.setTransform(0,0,0.6,0.6);
	this.card.alpha = 0.5;
	this.card._off = true;

	this.timeline.addTween(cjs.Tween.get(this.card).wait(1).to({_off:false},0).to({scaleX:1.1,scaleY:1.1,alpha:1},2).to({scaleX:0.95,scaleY:0.95},1).to({scaleX:1,scaleY:1},1).wait(3).to({y:-9.8},10).to({y:0},10).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.mc_effHitAttribute = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"begin":0,"st":1,"hide":8});

	// timeline functions:
	this.frame_0 = function() {
		sop.raidBattle.effHitAttri.dispOFF();
	}
	this.frame_1 = function() {
		this.eff1.gotoAndStop(this.dispFrm);
	}
	this.frame_2 = function() {
		this.eff2.gotoAndStop(this.dispFrm);
	}
	this.frame_4 = function() {
		this.eff3.gotoAndStop(this.dispFrm);
	}
	this.frame_5 = function() {
		this.eff4.gotoAndStop(this.dispFrm);
	}
	this.frame_12 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(2).call(this.frame_4).wait(1).call(this.frame_5).wait(7).call(this.frame_12));

	// レイヤー 6
	this.eff4 = new lib.mc_effHitAttri_p4();
	this.eff4.setTransform(0,0,0.9,0.9);
	this.eff4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff4).wait(5).to({_off:false},0).to({scaleX:1.1,scaleY:1.1,alpha:0.199},2).to({_off:true},1).wait(5));

	// レイヤー 3
	this.eff3 = new lib.mc_effHitAttri_p3();
	this.eff3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff3).wait(4).to({_off:false},0).to({_off:true},1).wait(8));

	// レイヤー 2
	this.eff2 = new lib.mc_effHitAttri_p2();
	this.eff2.setTransform(0,0,0.7,0.7);
	this.eff2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff2).wait(2).to({_off:false},0).to({scaleX:0.8,scaleY:0.8,rotation:90},1).to({_off:true},1).wait(9));

	// レイヤー 1
	this.eff1 = new lib.mc_effHitAttri_p1();
	this.eff1.setTransform(0,0,0.8,0.8);
	this.eff1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff1).wait(1).to({_off:false},0).to({_off:true},1).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.mc_dmgPt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"wait":0,"st":1});

	// timeline functions:
	this.frame_0 = function() {
		console("mc_dmgPtの0フレーム");
		
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
		
		//ダメージ数値画像の横幅
		var dmgImgW = sop.raidBattle.dmg.imgW;
		
		//ｘ座標の始点を算出
		var stX = dmgImgW * dmgLen / 2;
		
		for(var i = 0; i < dmgMaxLen; i++)
		{
			var tgMC = this["n" + i];
			
			if(i < dmgLen)
			{
				var dispFrm	= dmgStr.substr((dmgLen -i -1), 1);
				
				tgMC.visible = true;
				tgMC.gotoAndStop(dispFrm);
				
				//座標の調整
				tgMC.x = stX - (dmgImgW * i) - (dmgImgW);
			}
			else
			{
				tgMC.visible = false;
			}
		}
		//----------------------------------------ダメージ値表示処理↑↑↑↑↑
	}
	this.frame_11 = function() {
		//ダメージ値を非表示
		sop.raidBattle.dmg.userOFF();
		
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(10).call(this.frame_11));

	// mc
	this.n6 = new lib.mc_dmgPtNum();
	this.n6.setTransform(-53.9,0);

	this.n5 = new lib.mc_dmgPtNum();
	this.n5.setTransform(-35.9,0);

	this.n4 = new lib.mc_dmgPtNum();
	this.n4.setTransform(-17.9,0);

	this.n0 = new lib.mc_dmgPtNum();
	this.n0.setTransform(54,0);

	this.n1 = new lib.mc_dmgPtNum();
	this.n1.setTransform(36,0);

	this.n2 = new lib.mc_dmgPtNum();
	this.n2.setTransform(18,0);

	this.n3 = new lib.mc_dmgPtNum();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.n3},{t:this.n2},{t:this.n1},{t:this.n0},{t:this.n4},{t:this.n5},{t:this.n6}]}).wait(12));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.9,-12.4,126,25);


(lib.mc_curePt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"wait":0,"st":1});

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
		
		//ダメージ数値画像の横幅
		var dmgImgW = 18;
		
		//ｘ座標の始点を算出
		var stX = dmgImgW * dmgLen / 2;
		
		for(var i = 0; i < dmgMaxLen; i++)
		{
			var tgMC = this["n" + i];
			
			if(i < dmgLen)
			{
				var dispFrm	= dmgStr.substr((dmgLen -i -1), 1);
				tgMC.visible = true;
				tgMC.curePts = parseInt(dispFrm);
				tgMC.gotoAndStop(parseInt(dispFrm));
				
				//座標の調整
				//tgMC.x = stX - (dmgImgW * i) - (dmgImgW);
				tgMC.x = stX - (dmgImgW * i) - (dmgImgW /2) - ((dmgMaxLen-dmgLen)*4);
				
			}
			else
			{
				tgMC.visible = false;
			}
		}
		//----------------------------------------ダメージ値表示処理↑↑↑↑↑
	}
	this.frame_5 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(4).call(this.frame_5));

	// mc
	this.n6 = new lib.mc_curePtNum();
	this.n6.setTransform(-53.9,0);

	this.n5 = new lib.mc_curePtNum();
	this.n5.setTransform(-35.9,0);

	this.n4 = new lib.mc_curePtNum();
	this.n4.setTransform(-17.9,0);

	this.n0 = new lib.mc_curePtNum();
	this.n0.setTransform(54,0);

	this.n1 = new lib.mc_curePtNum();
	this.n1.setTransform(36,0);

	this.n2 = new lib.mc_curePtNum();
	this.n2.setTransform(18,0);

	this.n3 = new lib.mc_curePtNum();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.n3},{t:this.n2},{t:this.n1},{t:this.n0},{t:this.n4},{t:this.n5},{t:this.n6}]}).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.9,-12.4,126,25);


(lib.mc_eff_swoon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{wait_on:9});

	// timeline functions:
	this.frame_8 = function() {
		this.gotoAndPlay(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(8).call(this.frame_8).wait(9));

	// Layer 3
	this.instance = new lib.shape18("synched",0);

	this.instance_1 = new lib.shape20("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[]},2).to({state:[{t:this.instance_1}]},2).to({state:[]},2).wait(12));

	// Layer 2
	this.instance_2 = new lib.shape19("synched",0);

	this.instance_3 = new lib.shape21("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},2).to({state:[]},2).to({state:[{t:this.instance_3}]},2).to({state:[]},3).wait(9));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.9,-9.4,26.8,18.2);


(lib.eff_backLight = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.gra_backLight("synched",0);
	this.instance.setTransform(0,0,1.4,1.4);
	this.instance.alpha = 0.199;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:2.2,scaleY:2.2,alpha:0.648},19).to({scaleX:1.4,scaleY:1.4,alpha:0.199},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-127.3,-127.3,254.8,254.8);


(lib.mc_eff = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{heal:0,cure:27,resurrection:51,none:90});

	// timeline functions:
	this.frame_0 = function() {
		this.status = "anime_on";
		
		//回復値を非表示
		this.mc_curePt.visible = false;
	}
	this.frame_7 = function() {
		//回復値を表示
		this.mc_curePt.visible	= true;
		this.mc_curePt.dmgPt	= this.healPt;
		this.mc_curePt.gotoAndPlay("st");
	}
	this.frame_20 = function() {
		//回復値を非表示
		this.mc_curePt.visible = false;
	}
	this.frame_26 = function() {
		this.status = "anime_off";
		
		this.stop();
	}
	this.frame_27 = function() {
		this.status = "anime_on";
		
		//回復値を非表示
		this.mc_curePt.visible = false;
	}
	this.frame_29 = function() {
		//ＭＣを再生
		//for(var i = 0; i < 6; i++)
		//{
		//	var tgMC = this["eff_line" + (i+1)];
		//	tgMC.gotoAndPlay(0);
		//}
	}
	this.frame_50 = function() {
		this.status = "anime_off";
		
		this.stop();
	}
	this.frame_51 = function() {
		this.status = "anime_on";
		
		//回復値を非表示
		this.mc_curePt.visible = false;
	}
	this.frame_52 = function() {
		//サウンド：復活
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('089_revival'); });
	}
	this.frame_55 = function() {
		//ＭＣを再生
		//for(var i = 0; i < 6; i++)
		//{
		//	var tgMC = this["eff_line" + (i+1)];
		//	tgMC.gotoAndPlay(0);
		//}
	}
	this.frame_65 = function() {
		//回復値を表示
		this.mc_curePt.visible	= true;
		this.mc_curePt.dmgPt	= this.healPt;
		this.mc_curePt.gotoAndPlay("st");
	}
	this.frame_86 = function() {
		//回復値を非表示
		this.mc_curePt.visible = false;
	}
	this.frame_89 = function() {
		this.status = "anime_off";
		
		this.stop();
	}
	this.frame_90 = function() {
		//状態管理
		this.status = "none";
		
		//回復値を非表示
		this.mc_curePt.visible = false;
		
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7).call(this.frame_7).wait(13).call(this.frame_20).wait(6).call(this.frame_26).wait(1).call(this.frame_27).wait(2).call(this.frame_29).wait(21).call(this.frame_50).wait(1).call(this.frame_51).wait(1).call(this.frame_52).wait(3).call(this.frame_55).wait(10).call(this.frame_65).wait(21).call(this.frame_86).wait(3).call(this.frame_89).wait(1).call(this.frame_90));

	// curePt
	this.mc_curePt = new lib.mc_curePt();
	this.mc_curePt.setTransform(16,50);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_curePt}]}).wait(91));

	// レイヤー 18
	this.instance = new lib.kira("synched",0);
	this.instance.setTransform(30,40,2,2,45,0,0,3.4,3.8);

	this.instance_1 = new lib.kira("synched",0);
	this.instance_1.setTransform(10.1,20,2.5,2.5,45,0,0,3.4,3.8);

	this.instance_2 = new lib.kira("synched",0);
	this.instance_2.setTransform(-29.9,40,2,2,45,0,0,3.4,3.8);

	this.instance_3 = new lib.kira("synched",0);
	this.instance_3.setTransform(-9.9,40.1,2.596,2.596,-126.2,0,0,3.4,3.8);

	this.instance_4 = new lib.kira("synched",0);
	this.instance_4.setTransform(17.1,-26.9,2,2,-126.2,0,0,3.4,3.8);

	this.instance_5 = new lib.kira("synched",0);
	this.instance_5.setTransform(-29.9,30,2,2,45,0,0,3.4,3.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2,p:{rotation:45,y:40,x:-29.9}},{t:this.instance_1,p:{scaleX:2.5,scaleY:2.5,x:10.1,y:20}},{t:this.instance,p:{rotation:45,x:30,y:40,scaleX:2,scaleY:2}}]},59).to({state:[{t:this.instance_4,p:{rotation:-126.2,x:17.1,y:-26.9,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.596,scaleY:2.596,rotation:-126.2,x:-9.9,y:40.1}},{t:this.instance_2,p:{rotation:-126.2,y:0,x:-29.9}},{t:this.instance_1,p:{scaleX:3,scaleY:3,x:30,y:10}},{t:this.instance,p:{rotation:-126.2,x:-19.9,y:-39.9,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_4,p:{rotation:45,x:20,y:40,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:40,y:0}},{t:this.instance_2,p:{rotation:45,y:-10,x:0}},{t:this.instance_1,p:{scaleX:2.5,scaleY:2.5,x:-29.9,y:30}},{t:this.instance,p:{rotation:45,x:-29.9,y:-40,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_5},{t:this.instance_4,p:{rotation:45,x:10,y:10,scaleX:2.5,scaleY:2.5}},{t:this.instance_3,p:{scaleX:2,scaleY:2,rotation:45,x:30,y:40}},{t:this.instance_2,p:{rotation:45,y:-29,x:34}},{t:this.instance_1,p:{scaleX:2,scaleY:2,x:-9.9,y:-50}},{t:this.instance,p:{rotation:45,x:-25.9,y:-18,scaleX:2.5,scaleY:2.5}}]},2).to({state:[{t:this.instance_4,p:{rotation:45,x:20,y:40,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:37,y:0}},{t:this.instance_2,p:{rotation:45,y:-13,x:0}},{t:this.instance_1,p:{scaleX:2.5,scaleY:2.5,x:-29.9,y:30}},{t:this.instance,p:{rotation:45,x:-29.9,y:-40,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_4,p:{rotation:-126.2,x:20.1,y:-27.9,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.596,scaleY:2.596,rotation:-126.2,x:-9.9,y:40.1}},{t:this.instance_2,p:{rotation:-126.2,y:0,x:-29.9}},{t:this.instance_1,p:{scaleX:3,scaleY:3,x:30,y:10}},{t:this.instance,p:{rotation:-126.2,x:-19.9,y:-47.9,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_4,p:{rotation:45,x:-29.9,y:30,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:0,y:0}},{t:this.instance_2,p:{rotation:45,y:40,x:30}},{t:this.instance_1,p:{scaleX:2,scaleY:2,x:30,y:-30}},{t:this.instance,p:{rotation:45,x:-9.9,y:-50,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_2,p:{rotation:45,y:5,x:-29.9}},{t:this.instance_1,p:{scaleX:2.5,scaleY:2.5,x:18,y:37}},{t:this.instance,p:{rotation:45,x:20,y:-20,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_4,p:{rotation:45,x:20,y:40,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:40,y:0}},{t:this.instance_2,p:{rotation:45,y:-10,x:0}},{t:this.instance_1,p:{scaleX:2.5,scaleY:2.5,x:-29.9,y:30}},{t:this.instance,p:{rotation:45,x:-29.9,y:-40,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_5},{t:this.instance_4,p:{rotation:45,x:10,y:10,scaleX:2.5,scaleY:2.5}},{t:this.instance_3,p:{scaleX:2,scaleY:2,rotation:45,x:30,y:40}},{t:this.instance_2,p:{rotation:45,y:-29,x:34}},{t:this.instance_1,p:{scaleX:2,scaleY:2,x:-9.9,y:-50}},{t:this.instance,p:{rotation:45,x:-25.9,y:-18,scaleX:2.5,scaleY:2.5}}]},2).to({state:[{t:this.instance_4,p:{rotation:45,x:20,y:40,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:37,y:0}},{t:this.instance_2,p:{rotation:45,y:-13,x:0}},{t:this.instance_1,p:{scaleX:2.5,scaleY:2.5,x:-29.9,y:30}},{t:this.instance,p:{rotation:45,x:-29.9,y:-40,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_4,p:{rotation:-126.2,x:20.1,y:-27.9,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.596,scaleY:2.596,rotation:-126.2,x:-9.9,y:40.1}},{t:this.instance_2,p:{rotation:-126.2,y:0,x:-29.9}},{t:this.instance_1,p:{scaleX:3,scaleY:3,x:30,y:10}},{t:this.instance,p:{rotation:-126.2,x:-19.9,y:-47.9,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_4,p:{rotation:45,x:-29.9,y:30,scaleX:2,scaleY:2}},{t:this.instance_3,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:0,y:0}},{t:this.instance_2,p:{rotation:45,y:40,x:30}},{t:this.instance_1,p:{scaleX:2,scaleY:2,x:30,y:-30}},{t:this.instance,p:{rotation:45,x:-9.9,y:-50,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_2,p:{rotation:45,y:5,x:-29.9}},{t:this.instance_1,p:{scaleX:2.5,scaleY:2.5,x:18,y:37}},{t:this.instance,p:{rotation:45,x:20,y:-20,scaleX:2,scaleY:2}}]},2).to({state:[]},2).to({state:[]},3).wait(1));

	// レイヤー 11
	this.instance_6 = new lib.gra_alive_eff1("synched",0);
	this.instance_6.setTransform(0,-173.9,0.167,0.619,12.5,0,0,0,2.5);
	this.instance_6.alpha = 0.5;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(51).to({startPosition:0,_off:false},0).to({regX:0.1,regY:2.6,scaleY:1.35,rotation:-11.1,y:-173.7,alpha:0.801},15).to({regX:0.4,rotation:10.1,alpha:0.301},21).to({_off:true},1).wait(3));

	// レイヤー 14
	this.instance_7 = new lib.gra_alive_eff1("synched",0);
	this.instance_7.setTransform(0.1,-169.2,0.167,1.101,-9.9,0,0,0.4,2.6);
	this.instance_7.alpha = 0.199;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(53).to({startPosition:0,_off:false},0).to({regX:0,rotation:6.9,y:-169,alpha:0.801},14).to({rotation:-9.8,y:-169.1,alpha:0.301},20).to({_off:true},1).wait(3));

	// レイヤー 17
	this.instance_8 = new lib.gra_healEff("synched",0);
	this.instance_8.setTransform(0,49,0.96,0.64);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(57).to({startPosition:0,_off:false},0).to({_off:true},31).wait(3));

	// レイヤー 12
	this.instance_9 = new lib.gra_alive_p1("synched",0);
	this.instance_9.setTransform(0,53,1,0.12);
	this.instance_9.alpha = 0.199;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(51).to({startPosition:0,_off:false},0).to({alpha:1},7).to({startPosition:0},28).to({alpha:0.199},2).to({_off:true},1).wait(2));

	// レイヤー 13
	this.instance_10 = new lib.gra_alive_p2("synched",0);
	this.instance_10.setTransform(0,55,1,0.166,0,0,0,0,0.9);
	this.instance_10.alpha = 0.398;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(56).to({startPosition:0,_off:false},0).to({regY:1,scaleY:1,alpha:1},6,cjs.Ease.get(0.8)).to({startPosition:0},19).to({scaleY:0.36,alpha:0.199},7).to({_off:true},1).wait(2));

	// レイヤー 7
	this.eff_line5 = new lib.mc_eff_particleAnime1();
	this.eff_line5.setTransform(-22.9,15);

	this.eff_line6 = new lib.mc_eff_particleAnime1();
	this.eff_line6.setTransform(3,4,0.8,0.8);

	this.eff_line2 = new lib.mc_eff_particleAnime1();
	this.eff_line2.setTransform(-24.9,48);

	this.eff_line3 = new lib.mc_eff_particleAnime1();
	this.eff_line3.setTransform(-3.9,39,0.8,0.8);

	this.eff_line4 = new lib.mc_eff_particleAnime1();
	this.eff_line4.setTransform(20,29);

	this.eff_line1 = new lib.mc_eff_particleAnime1();
	this.eff_line1.setTransform(30,50);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.eff_line1,p:{rotation:0}},{t:this.eff_line4,p:{rotation:0}},{t:this.eff_line3,p:{scaleX:0.8,scaleY:0.8,rotation:0}},{t:this.eff_line2,p:{rotation:0}},{t:this.eff_line6,p:{scaleX:0.8,scaleY:0.8,rotation:0}},{t:this.eff_line5,p:{rotation:0}}]},29).to({state:[]},18).to({state:[{t:this.eff_line1,p:{rotation:6}},{t:this.eff_line4,p:{rotation:4}},{t:this.eff_line3,p:{scaleX:1,scaleY:1,rotation:-3.9}},{t:this.eff_line2,p:{rotation:-5.9}},{t:this.eff_line6,p:{scaleX:1,scaleY:1,rotation:2}},{t:this.eff_line5,p:{rotation:-3.9}}]},8).to({state:[]},32).to({state:[]},3).wait(1));

	// レイヤー 9
	this.instance_11 = new lib.gra_healEff("synched",0);
	this.instance_11.setTransform(0,49,0.8,0.66);
	this.instance_11.alpha = 0.301;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(28).to({startPosition:0,_off:false},0).to({scaleX:0.9,scaleY:0.68,alpha:1},2).to({scaleX:1.1,scaleY:0.74,alpha:0.199},3).to({_off:true},1).wait(1).to({scaleX:0.8,scaleY:0.66,alpha:0.301,_off:false},0).to({scaleX:0.9,scaleY:0.68,alpha:1},2).to({scaleX:1.1,scaleY:0.74,alpha:0.199},3).to({_off:true},1).wait(1).to({scaleX:0.8,scaleY:0.66,alpha:0.301,_off:false},0).to({scaleX:0.9,scaleY:0.68,alpha:1},2).to({scaleX:1.1,scaleY:0.74,alpha:0.199},3).to({_off:true},1).wait(43));

	// レイヤー 8
	this.instance_12 = new lib.gra_cure_p1("synched",0);
	this.instance_12.setTransform(0,53,0.5,0.1);
	this.instance_12.alpha = 0.5;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(27).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:0.12,alpha:1},4,cjs.Ease.get(0.8)).to({startPosition:0},15).to({alpha:0.199},3).to({_off:true},1).wait(41));

	// レイヤー 10
	this.instance_13 = new lib.eff_cure_p2("synched",0);
	this.instance_13.setTransform(0,-67.9);
	this.instance_13.alpha = 0.301;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(27).to({startPosition:0,_off:false},0).to({scaleX:10,alpha:0.801},4,cjs.Ease.get(0.6)).to({startPosition:0},14).to({alpha:0.199},3).to({_off:true},1).wait(42));

	// レイヤー 6
	this.instance_14 = new lib.kira("synched",0);
	this.instance_14.setTransform(30,40,2,2,45,0,0,3.4,3.8);

	this.instance_15 = new lib.kira("synched",0);
	this.instance_15.setTransform(10.1,20,2.5,2.5,45,0,0,3.4,3.8);

	this.instance_16 = new lib.kira("synched",0);
	this.instance_16.setTransform(-29.9,40,2,2,45,0,0,3.4,3.8);

	this.instance_17 = new lib.kira("synched",0);
	this.instance_17.setTransform(-9.9,40.1,2.596,2.596,-126.2,0,0,3.4,3.8);

	this.instance_18 = new lib.kira("synched",0);
	this.instance_18.setTransform(17.1,-26.9,2,2,-126.2,0,0,3.4,3.8);

	this.instance_19 = new lib.kira("synched",0);
	this.instance_19.setTransform(-29.9,30,2,2,45,0,0,3.4,3.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16,p:{rotation:45,y:40,x:-29.9}},{t:this.instance_15,p:{scaleX:2.5,scaleY:2.5,x:10.1,y:20}},{t:this.instance_14,p:{rotation:45,x:30,y:40,scaleX:2,scaleY:2}}]},4).to({state:[{t:this.instance_18,p:{rotation:-126.2,x:17.1,y:-26.9,scaleX:2,scaleY:2}},{t:this.instance_17,p:{scaleX:2.596,scaleY:2.596,rotation:-126.2,x:-9.9,y:40.1}},{t:this.instance_16,p:{rotation:-126.2,y:0,x:-29.9}},{t:this.instance_15,p:{scaleX:3,scaleY:3,x:30,y:10}},{t:this.instance_14,p:{rotation:-126.2,x:-19.9,y:-39.9,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_18,p:{rotation:45,x:20,y:40,scaleX:2,scaleY:2}},{t:this.instance_17,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:40,y:0}},{t:this.instance_16,p:{rotation:45,y:-10,x:0}},{t:this.instance_15,p:{scaleX:2.5,scaleY:2.5,x:-29.9,y:30}},{t:this.instance_14,p:{rotation:45,x:-29.9,y:-40,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_19},{t:this.instance_18,p:{rotation:45,x:10,y:10,scaleX:2.5,scaleY:2.5}},{t:this.instance_17,p:{scaleX:2,scaleY:2,rotation:45,x:30,y:40}},{t:this.instance_16,p:{rotation:45,y:-29,x:34}},{t:this.instance_15,p:{scaleX:2,scaleY:2,x:-9.9,y:-50}},{t:this.instance_14,p:{rotation:45,x:-25.9,y:-18,scaleX:2.5,scaleY:2.5}}]},2).to({state:[{t:this.instance_18,p:{rotation:45,x:20,y:40,scaleX:2,scaleY:2}},{t:this.instance_17,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:37,y:0}},{t:this.instance_16,p:{rotation:45,y:-13,x:0}},{t:this.instance_15,p:{scaleX:2.5,scaleY:2.5,x:-29.9,y:30}},{t:this.instance_14,p:{rotation:45,x:-29.9,y:-40,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_18,p:{rotation:-126.2,x:20.1,y:-27.9,scaleX:2,scaleY:2}},{t:this.instance_17,p:{scaleX:2.596,scaleY:2.596,rotation:-126.2,x:-9.9,y:40.1}},{t:this.instance_16,p:{rotation:-126.2,y:0,x:-29.9}},{t:this.instance_15,p:{scaleX:3,scaleY:3,x:30,y:10}},{t:this.instance_14,p:{rotation:-126.2,x:-19.9,y:-47.9,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_18,p:{rotation:45,x:-29.9,y:30,scaleX:2,scaleY:2}},{t:this.instance_17,p:{scaleX:2.5,scaleY:2.5,rotation:45,x:0,y:0}},{t:this.instance_16,p:{rotation:45,y:40,x:30}},{t:this.instance_15,p:{scaleX:2,scaleY:2,x:30,y:-30}},{t:this.instance_14,p:{rotation:45,x:-9.9,y:-50,scaleX:2,scaleY:2}}]},2).to({state:[{t:this.instance_16,p:{rotation:45,y:5,x:-29.9}},{t:this.instance_15,p:{scaleX:2.5,scaleY:2.5,x:18,y:37}},{t:this.instance_14,p:{rotation:45,x:20,y:-20,scaleX:2,scaleY:2}}]},2).to({state:[]},2).to({state:[]},70).wait(1));

	// レイヤー 3
	this.instance_20 = new lib.gra_healEff("synched",0);
	this.instance_20.setTransform(0,48.4,0.9,0.7);
	this.instance_20.alpha = 0.199;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).to({alpha:1},3).to({scaleY:0.68,y:49},4).to({scaleY:0.7,y:48.4},4).to({scaleY:0.68,y:49},4).to({scaleY:0.7,y:48.4},4).to({scaleY:0.68,y:49,alpha:0.199},4).to({_off:true},1).wait(67));

	// レイヤー 4
	this.instance_21 = new lib.gra_heal_p1("synched",0);
	this.instance_21.setTransform(0,52,0.8,0.8);
	this.instance_21.alpha = 0.301;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).to({scaleX:0.91,scaleY:1.43,alpha:1},2).to({scaleX:1,scaleY:1},16).to({alpha:0.199},3).to({_off:true},1).wait(69));

	// レイヤー 5
	this.instance_22 = new lib.gra_heal_p2("synched",0);
	this.instance_22.setTransform(0,51.6,0.889,0.204,0,0,0,0,-1.9);
	this.instance_22.alpha = 0.5;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(2).to({startPosition:0,_off:false},0).to({scaleX:0.93,scaleY:1,y:50.1,alpha:1},5,cjs.Ease.get(0.8)).to({startPosition:0},9).to({scaleY:0.51,alpha:0.199},4).to({_off:true},1).wait(70));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.9,37.5,126,60.6);


(lib.mc_ev28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{"st":1,goAnime:3});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		//再生時間を調整します
		this.stCtr.gotoAndPlay("st");
	}
	this.frame_2 = function() {
		this.stop();
	}
	this.frame_3 = function() {
		//WIN消す
		sop.raidBattle.resultWindow.dispOFF();
	}
	this.frame_4 = function() {
		//宝箱閉じてる
		this.mc_box.gotoAndStop(0);
		
		//サウンド：宝箱落下
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('CarnivalEvent08_BoxDrop'); });
	}
	this.frame_18 = function() {
		//宝箱あく
		this.mc_box.gotoAndPlay(1);
		
		//サウンド：宝箱オープン
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('046_treasurebox_open'); });
	}
	this.frame_20 = function() {
		//カード出現
		this.mc_getCards.gotoAndPlay(0);
	}
	this.frame_23 = function() {
		//高レアリティ時のテキスト
		var setFrm = this.rareID -1;
		this.mc_getText.gotoAndStop(setFrm);
	}
	this.frame_26 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(14).call(this.frame_18).wait(2).call(this.frame_20).wait(3).call(this.frame_23).wait(3).call(this.frame_26));

	// ctl
	this.stCtr = new lib.mc_animeStCtr();
	this.stCtr.setTransform(346.5,5.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.stCtr}]}).wait(27));

	// getText
	this.mc_getText = new lib.mc_ev28GetText();
	this.mc_getText.setTransform(160,78,0.6,0.6);
	this.mc_getText.alpha = 0.398;
	this.mc_getText._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_getText).wait(23).to({_off:false},0).to({scaleX:1.1,scaleY:1.1,alpha:1},2).to({scaleX:1,scaleY:1},1).wait(1));

	// getCards
	this.mc_getCards = new lib.mc_ev28GetCards();
	this.mc_getCards.setTransform(160,130);
	this.mc_getCards._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_getCards).wait(20).to({_off:false},0).wait(7));

	// eff_open
	this.instance = new lib.mc_ev28GetPartsEff1();
	this.instance.setTransform(156,156);
	this.instance.alpha = 0.699;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({scaleX:1.65,scaleY:1.65,y:152,alpha:1},2).to({scaleX:1.8,scaleY:1.8,y:159,alpha:0.199},3).to({_off:true},1).wait(2));

	// eff_openBall
	this.instance_1 = new lib.mc_ev28EffBall();
	this.instance_1.setTransform(156,166);
	this.instance_1.alpha = 0.801;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({_off:false},0).to({scaleX:2,scaleY:2,y:154,alpha:0.949},2).to({scaleX:2.5,scaleY:2.5,alpha:0.102},3).to({_off:true},1).wait(2));

	// eff_backLight
	this.instance_2 = new lib.eff_backLight();
	this.instance_2.setTransform(160,124);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(26).to({_off:false},0).wait(1));

	// treasureBox
	this.mc_box = new lib.mc_ev28TreasureBox();
	this.mc_box.setTransform(326,98,0.699,0.699,23.3);
	this.mc_box.alpha = 0.398;
	this.mc_box._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_box).wait(4).to({_off:false},0).to({scaleX:0.85,scaleY:0.85,x:217.5,y:109,alpha:1},2,cjs.Ease.get(-0.59)).to({scaleX:1.2,scaleY:0.9,rotation:0,x:171,y:185},2).to({scaleX:1,scaleY:1,x:170,y:182},1).wait(3).to({scaleX:1.2,scaleY:0.85,x:171,y:188.5},4).wait(2).to({scaleX:1,scaleY:1,rotation:10.8,y:168.5},1).to({y:163.5},1).to({y:167.5},2).to({scaleX:1.1,scaleY:0.94,rotation:0,y:185},2).to({scaleX:1,scaleY:1,x:170,y:182},1).wait(2));

	// treasureBox_shadow
	this.mc_boxShadow = new lib.mc_ev24Shadow();
	this.mc_boxShadow.setTransform(200,215,0.6,0.7);
	this.mc_boxShadow.alpha = 0.398;
	this.mc_boxShadow._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_boxShadow).wait(6).to({_off:false},0).to({scaleX:0.7,x:158,alpha:1},2).wait(4).to({scaleX:0.76},4).wait(3).to({scaleX:0.7,alpha:0.699},0).wait(4).to({alpha:1},0).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(340,0,13,11);


(lib.mc_user = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{init:0,"wait":1,attack:2,atk_short:3,atk_middle:23,atk_long:41,"heal":54,heal_status:65,alive:76,dmg:87,avoid:97,die:110,die_stop:118,jobLvUP:119,dmg_poison:138,dmg_confu:151,skill45_in:167,atk_loop1:10,atk_loop2:28,atk_loop3:43,heal_loop1:56,heal_loop2:67,heal_loop3:78,avoid_loop:101,jlu_loop:130,confu_loop:157,skill45_out:172});

	// timeline functions:
	this.frame_0 = function() {
		//-----------------------------------------------------------
		//	アバター生成
		//-----------------------------------------------------------
		this.UserAvater = new CreateAvater(
			this.CharacterMC,
			MainAvaterConfig
		);
		
		
		//-----------------------------------------------------------
		//	関数
		//-----------------------------------------------------------
		//攻撃ヒット時の処理（被弾モーション、ダメージ表示）
		this.atkHitWork = function()
		{
			if(this.UserAvater.isAttackHit == true)
			{
				//フラグ更新
				this.UserAvater.isAttackHit = false;
				
				//ボスを被弾モーションへ
				rootBoss.bossAnime.damage();		
				
				//ダメージ値表示
				sop.raidBattle.dmg.dmgON();
			}
		}
		
		
		//-----------------------------------------------------------
		//	初期設定
		//-----------------------------------------------------------
		//死亡状態
		this.dieFlg	= false;
		
		//モーションごとの攻撃移動を判定
		this.motionDistanceID = MainAvaterConfig.animationData.motion;
		
		//モーションごとのID　※攻撃時のSE判定
		this.motionSEID = MainAvaterConfig.animationData.id;
		
		//攻撃モーション終わりの取得
		this.AtkMotionEndFlg = false;
		
		//回復エフェクトは非表示
		this.eff_cure.visible = false;
		
		//初期ポーズ（アニメーション名, ループの有無, エフェクトの有無）
		this.UserAvater.setAnimation("idle2", true, true);
		
		//★ファイル起動時の生死状態対応
		sop.raidBattle.gameMaster.aliveDraw();
		
		
		this.stop();
	}
	this.frame_1 = function() {
		//死亡状態
		this.dieFlg	= false;
		
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
		
		//目パチ
		this.UserAvater.eyeOpen();
		
		
		this.stop();
	}
	this.frame_2 = function() {
		//ユーザーを手前に表示
		sop.raidBattle.user.dispFront();
		
		//攻撃完了フラグを更新
		this.AtkMotionEndFlg = false;
		
		//目パチON
		this.UserAvater.eyeOpen();
		
		//---------------------------------------------------
		//モーションの攻撃タイプに対応
		//---------------------------------------------------
		//遠距離（弓、銃、本など）
		if(this.motionDistanceID == 1)
		{
			this.gotoAndPlay("atk_long");
		}
		//中距離（斧、槍など）
		else if(this.motionDistanceID == 2)
		{
			this.gotoAndPlay("atk_middle");
		}
		//近距離
		else
		{
			this.gotoAndPlay("atk_short");
		}
	}
	this.frame_3 = function() {
		//前方向へ飛ぶ
		this.UserAvater.setAnimation("front_jump", false, true);
	}
	this.frame_7 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_9 = function() {
		//攻撃
		this.UserAvater.setAnimation("attack_l", false, true);
	}
	this.frame_11 = function() {
		//攻撃モーション終わりチェック
		if(this.AtkMotionEndFlg == false)
		{
			this.gotoAndPlay("atk_loop1");
		}
		
		//攻撃ヒット時の処理
		this.atkHitWork();
	}
	this.frame_12 = function() {
		//バックジャンプ
		this.UserAvater.setAnimation("back_jump", true, true);
	}
	this.frame_16 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_19 = function() {
		//フラグを戻す
		this.AtkMotionEndFlg = false;
		
		//ダメージ値を非表示
		sop.raidBattle.dmg.userOFF();
		
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_22 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_23 = function() {
		//走る
		this.UserAvater.setAnimation("run", true, true);
	}
	this.frame_27 = function() {
		//攻撃
		this.UserAvater.setAnimation("attack_l", false, true);
	}
	this.frame_29 = function() {
		//攻撃モーション終わりチェック
		if(this.AtkMotionEndFlg == false)
		{
			this.gotoAndPlay("atk_loop2");
		}
		
		//攻撃ヒット時の処理
		this.atkHitWork();
	}
	this.frame_30 = function() {
		//バックジャンプ
		this.UserAvater.setAnimation("back_jump", true, true);
	}
	this.frame_34 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_37 = function() {
		//フラグを戻す
		this.AtkMotionEndFlg = false;
		
		//ダメージ値を非表示
		sop.raidBattle.dmg.userOFF();
		
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_40 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_41 = function() {
		//攻撃
		this.UserAvater.setAnimation("attack_l", false, true);
	}
	this.frame_44 = function() {
		//攻撃モーション終わりチェック
		if(this.AtkMotionEndFlg == false)
		{
			this.gotoAndPlay("atk_loop3");
		}
		
		//攻撃ヒット時の処理
		this.atkHitWork();
	}
	this.frame_45 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_50 = function() {
		//フラグを戻す
		this.AtkMotionEndFlg = false;
		
		//ダメージ値を非表示
		sop.raidBattle.dmg.userOFF();
		
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_53 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_54 = function() {
		//回復エフェクト再生
		this.eff_cure.visible = true;
		this.eff_cure.gotoAndPlay("heal");
	}
	this.frame_55 = function() {
		//回復値を代入
		this.eff_cure.healPt = this.dmgPt;
	}
	this.frame_57 = function() {
		if(this.eff_cure.status != "anime_off")
		{
			this.gotoAndPlay("heal_loop1");
		}
	}
	this.frame_63 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
		
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_65 = function() {
		//回復エフェクト再生
		this.eff_cure.visible = true;
		this.eff_cure.gotoAndPlay("cure");
	}
	this.frame_68 = function() {
		if(this.eff_cure.status != "anime_off")
		{
			this.gotoAndPlay("heal_loop2");
		}
	}
	this.frame_74 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
		
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_76 = function() {
		//回復エフェクト再生
		this.eff_cure.visible = true;
		this.eff_cure.gotoAndPlay("resurrection");
	}
	this.frame_77 = function() {
		//回復値を代入
		this.eff_cure.healPt = this.dmgPt;
	}
	this.frame_79 = function() {
		if(this.eff_cure.status != "anime_off")
		{
			this.gotoAndPlay("heal_loop3");
		}
	}
	this.frame_81 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
		
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_87 = function() {
		//被弾
		this.UserAvater.setAnimation("damage", false, true);
		
		//目パチ
		this.UserAvater.eyeOpen();
	}
	this.frame_94 = function() {
		//ダメージ後のHPチェック（待機 or 死亡アニメ）
		sop.raidBattle.user.damageCheck();
	}
	this.frame_97 = function() {
		//バックジャンプ
		this.UserAvater.setAnimation("back_jump", false, true);
	}
	this.frame_99 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_100 = function() {
		this.cnt	= 0;
		this.cMax	= 15;
	}
	this.frame_102 = function() {
		if(this.cnt < this.cMax)
		{
			this.cnt++;
			this.gotoAndPlay("avoid_loop");
		}
	}
	this.frame_107 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_110 = function() {
		//死亡状態チェック
		this.dieFlg	= true;
		
		//死にモーション（※攻撃直後用）
		this.UserAvater.setAnimation("die", false, true);
		
		//瞳を閉じる
		this.UserAvater.eyeClose();
	}
	this.frame_111 = function() {
		//サウンド：気絶
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('088_fainted'); });
	}
	this.frame_117 = function() {
		this.stop();
	}
	this.frame_118 = function() {
		//死亡状態チェック
		this.dieFlg	= true;
		
		//----------------------------------------------------------
		//★ページ遷移直後、死んでる状態に対応
		//----------------------------------------------------------
		this.UserAvater.setAnimation("die_stop", false, true);
		this.UserAvater.eyeClose();
		
		
		this.stop();
	}
	this.frame_119 = function() {
		//レベルアップのモーション（※モーションに溜めがあるので、その分フレームを設けてる）
		this.UserAvater.setAnimation("powerup", false, true);
	}
	this.frame_128 = function() {
		//ジョブレベルアップの演出開始
		this.mc_jobLvUP.gotoAndPlay(0);
	}
	this.frame_131 = function() {
		if(this.mc_jobLvUP.status != "animeOFF")
		{
			this.gotoAndPlay("jlu_loop");
		}
	}
	this.frame_132 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_135 = function() {
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_137 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_138 = function() {
		//被弾
		this.UserAvater.setAnimation("damage", false, true);
	}
	this.frame_139 = function() {
		//ダメージ値を表示
		sop.raidBattle.dmg.dmgON();
		
		//サウンド：状態異常_毒
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('087_poisoned'); });
	}
	this.frame_145 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_148 = function() {
		//ダメージ値を非表示
		sop.raidBattle.dmg.userOFF();
		
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_150 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_151 = function() {
		//攻撃完了フラグを更新（※念のため）
		this.AtkMotionEndFlg = false;
		
		//サウンド：状態異常_混乱
		//require(['coffee/poke/native'], function(nativeProxy){ nativeProxy.playSe('086_confused'); });
	}
	this.frame_156 = function() {
		//攻撃　※エフェクト無し
		this.UserAvater.setAnimation("attack_l", false, false);
	}
	this.frame_158 = function() {
		//攻撃モーション終わりチェック
		if(this.AtkMotionEndFlg == false)
		{
			this.gotoAndPlay("confu_loop");
		}
		
		
		//攻撃ヒット時の処理
		if(this.UserAvater.isAttackHit == true)
		{
			//フラグ更新
			this.UserAvater.isAttackHit = false;
			
			//ダメージ値を表示
			sop.raidBattle.dmg.dmgON();
		}
	}
	this.frame_159 = function() {
		//待機
		this.UserAvater.setAnimation("idle2", true, true);
	}
	this.frame_164 = function() {
		//ダメージ値を非表示
		sop.raidBattle.dmg.userOFF();
		
		//攻撃完了
		sop.raidBattle.gameMaster.nextAnimeGo();
	}
	this.frame_166 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}
	this.frame_167 = function() {
		//状況フラグ
		this.skill45_status = "active";
		
		//後ろに飛ぶ
		this.UserAvater.setAnimation("back_jump", false, true);
	}
	this.frame_171 = function() {
		//状況フラグ
		this.skill45_status = "set_end";
		
		//ボスの攻撃を開始
		sop.raidBattle.boss.attack(this.animeData);
		
		
		this.stop();
	}
	this.frame_172 = function() {
		//状況フラグ
		this.skill45_status = "endAnime";
	}
	this.frame_179 = function() {
		//前方向へ飛ぶ
		this.UserAvater.setAnimation("front_jump", false, true);
	}
	this.frame_182 = function() {
		//待機へ
		this.gotoAndStop("wait");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(4).call(this.frame_7).wait(2).call(this.frame_9).wait(2).call(this.frame_11).wait(1).call(this.frame_12).wait(4).call(this.frame_16).wait(3).call(this.frame_19).wait(3).call(this.frame_22).wait(1).call(this.frame_23).wait(4).call(this.frame_27).wait(2).call(this.frame_29).wait(1).call(this.frame_30).wait(4).call(this.frame_34).wait(3).call(this.frame_37).wait(3).call(this.frame_40).wait(1).call(this.frame_41).wait(3).call(this.frame_44).wait(1).call(this.frame_45).wait(5).call(this.frame_50).wait(3).call(this.frame_53).wait(1).call(this.frame_54).wait(1).call(this.frame_55).wait(2).call(this.frame_57).wait(6).call(this.frame_63).wait(2).call(this.frame_65).wait(3).call(this.frame_68).wait(6).call(this.frame_74).wait(2).call(this.frame_76).wait(1).call(this.frame_77).wait(2).call(this.frame_79).wait(2).call(this.frame_81).wait(6).call(this.frame_87).wait(7).call(this.frame_94).wait(3).call(this.frame_97).wait(2).call(this.frame_99).wait(1).call(this.frame_100).wait(2).call(this.frame_102).wait(5).call(this.frame_107).wait(3).call(this.frame_110).wait(1).call(this.frame_111).wait(6).call(this.frame_117).wait(1).call(this.frame_118).wait(1).call(this.frame_119).wait(9).call(this.frame_128).wait(3).call(this.frame_131).wait(1).call(this.frame_132).wait(3).call(this.frame_135).wait(2).call(this.frame_137).wait(1).call(this.frame_138).wait(1).call(this.frame_139).wait(6).call(this.frame_145).wait(3).call(this.frame_148).wait(2).call(this.frame_150).wait(1).call(this.frame_151).wait(5).call(this.frame_156).wait(2).call(this.frame_158).wait(1).call(this.frame_159).wait(5).call(this.frame_164).wait(2).call(this.frame_166).wait(1).call(this.frame_167).wait(4).call(this.frame_171).wait(1).call(this.frame_172).wait(7).call(this.frame_179).wait(3).call(this.frame_182));

	// text_avoid
	this.instance = new lib.mc_txt_avoid();
	this.instance.setTransform(50,200,0.6,0.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(98).to({_off:false},0).to({scaleX:1.2,scaleY:1.2},1).to({scaleX:1,scaleY:1},1).wait(2).to({alpha:0.102},2).to({_off:true},1).wait(78));

	// eff_die
	this.eff_death = new lib.mc_eff_swoon();
	this.eff_death.setTransform(23.9,169.5,1.8,1.8,0,0,0,16.6,-0.3);
	this.eff_death._off = true;

	this.timeline.addTween(cjs.Tween.get(this.eff_death).wait(117).to({_off:false},0).wait(1).to({x:69.9},0).to({_off:true},1).wait(64));

	// eff_hitAttri
	this.mc_effHitAttri = new lib.mc_effHitAttribute();
	this.mc_effHitAttri.setTransform(45,168);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_effHitAttri}]}).wait(183));

	// eff_heal
	this.eff_cure = new lib.mc_eff();
	this.eff_cure.setTransform(50,210,1,1,0,0,0,0,50);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.eff_cure}]}).wait(183));

	// eff_jobLvUP
	this.mc_jobLvUP = new lib.mc_eff_jobLvUP();
	this.mc_jobLvUP.setTransform(50,210);
	this.mc_jobLvUP._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_jobLvUP).wait(128).to({_off:false},0).to({_off:true},4).wait(51));

	// eff_poison1
	this.instance_1 = new lib.eff_status_poison1();
	this.instance_1.setTransform(32,102);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},138).to({state:[]},2).to({state:[{t:this.instance_1}]},1).to({state:[]},2).to({state:[{t:this.instance_1}]},1).to({state:[]},2).wait(37));

	// eff_poison2
	this.instance_2 = new lib.eff_status_poison2();
	this.instance_2.setTransform(31,102);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},140).to({state:[]},1).to({state:[{t:this.instance_2}]},2).to({state:[]},1).wait(39));

	// eff_confu
	this.instance_3 = new lib.mc_eff_confu();
	this.instance_3.setTransform(50,138);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(151).to({_off:false},0).to({_off:true},13).wait(19));

	// user
	this.CharacterMC = new lib.CharacterMC();
	this.CharacterMC.setTransform(50,210,0.3,0.3,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.CharacterMC).wait(3).to({x:180,y:188},2).to({x:210,y:210},2).wait(5).to({x:140,y:196},2).to({x:50,y:210},2).wait(7).to({x:170},4,cjs.Ease.get(-0.49)).wait(3).to({x:125,y:190},2).to({x:50,y:210},2).wait(53).to({x:52,y:208},1).to({x:47,y:212},1).to({x:48,y:208},1).to({x:53,y:213},1).to({x:48,y:209},1).to({x:53,y:207},1).to({x:50,y:210},1).wait(3).to({x:20},2,cjs.Ease.get(1)).wait(5).to({x:50},3,cjs.Ease.get(0.6)).wait(31).to({x:52,y:208},1).to({x:48,y:212},1).to({x:51,y:211},1).to({x:47,y:208},1).to({x:54,y:211},1).to({x:52,y:208},1).to({x:47,y:212},1).to({x:50,y:210},1).wait(21).to({x:-49.8,y:190},3,cjs.Ease.get(-0.79)).wait(9).to({x:50,y:210},3,cjs.Ease.get(0.8)).wait(1));

	// skill45_eff1
	this.instance_4 = new lib.skill45_eff4();
	this.instance_4.setTransform(15.2,138,0.8,0.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4,p:{scaleX:0.8,scaleY:0.8,x:15.2,y:138}}]},174).to({state:[{t:this.instance_4,p:{scaleX:1,scaleY:1,x:7,y:130}}]},1).to({state:[]},1).wait(7));

	// skill45_eff2
	this.instance_5 = new lib.skill45_eff3();
	this.instance_5.setTransform(20,148,0.8,0.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5,p:{scaleX:0.8,scaleY:0.8,x:20,y:148}}]},172).to({state:[{t:this.instance_5,p:{scaleX:1.108,scaleY:1.108,x:7.7,y:140}}]},1).to({state:[]},1).wait(9));

	// skill45_particle
	this.instance_6 = new lib.gra_skill45_charaDie("synched",0);
	this.instance_6.setTransform(50,167,0.6,0.6);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(173).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1},2).to({scaleX:1.3,scaleY:1.3,alpha:0.102},3).to({_off:true},1).wait(4));

	// skill45_dummy
	this.instance_7 = new lib.gra_skill45_chara("synched",0);
	this.instance_7.setTransform(-29.9,150.1,1,1,0,0,0,0,-45.9);
	this.instance_7.alpha = 0.199;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(168).to({startPosition:0,_off:false},0).to({regY:-45.9,scaleY:0.92,x:50,y:169.1,alpha:1},2,cjs.Ease.get(0.6)).to({regY:-45.8,scaleY:1,y:164.1},1).to({scaleX:0.9,scaleY:0.9},1).to({scaleX:1.2,scaleY:1.2,alpha:0.102},3).to({_off:true},1).wait(7));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3,193,126,84.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;