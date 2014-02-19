/*
	SOPBossMotionPrepare v1.22
	Copyright Joseph Jacir 7 February 2014
	
	Creates the 動作確認 folder for the purpose of checking and turning in a Boss Motion for SOP.
	
	Assumes:
		・Depends on JJFileUtils.jsfl being present in Flash Config Directory /PokeResources/
		
		・File must NOT be called boss.fla or it will be overwritten! The script checks for this condition before running.
		
		・Directory structure which includes boss##_name/fla/ and boss##_name/images/. Must be run from a .fla in the former.
		
		・The light version (軽量版) MUST be named as "bossname_light.fla". This script searches for the "_light" and if it is not found, it will assume the full version.
		
		・Likewise, the full character image (i.e. not split into parts) MUST follow this form: "XXX_Full.png". The "_Full" distinguishes the whole character image from its body parts.
		
		・For uploading, assumes WinSCP installed, and a profile called mingtest with saved password.
*/

fl.outputPanel.clear();
//#include JJFileUtils
fl.runScript(fl.configURI + "PokeResources/JJFileUtils.jsfl");

//Safety checks and essential declarations
var safe = true;
var bossdir = upOne(upOne(fl.getDocumentDOM().pathURI));
var images = FLfile.listFolder(bossdir + "images/");
var flaname = fl.getDocumentDOM().pathURI;
flaname = flaname.substr(flaname.lastIndexOf("/")+1,flaname.length).split(".")[0];

//Check that we haven't been working in boss.fla, since that will be deleted. If so, require a change of filename
if(flaname == "boss") {
	safe = false; 
	fl.trace('Filename must not be boss.fla! Light version must end in "_light.fla"\n以外のファイル名に保存してください！軽量版でしたら、ファイル名の最後の部分に「_light.fla」で保存してください。\n');
}

//Look for XXX_Full.png and fail if not found
var foundfull = false;
for (var i in images) {
	if (images[i].indexOf("_Full") == 3) { 
		foundfull = true; 
		break;
	}
}

if (!foundfull) {
	safe = false;
	fl.trace("In " + winPath(bossdir) + "images の中に、");
	fl.trace("XXX_Full.png not found. This should be the name of the full character for the light version.\nXXX_Full.pngを見つけませんでした。軽量版のための全身画像は以上のファイル名でください。\n\n");
}


//End safety checks

if(safe) {
	fl.saveDocument(fl.getDocumentDOM());
	
	//Declarations
	var raidbattlehtml = FLfile.read(fl.configURI + "PokeResources/SOPBossMotion/BossMotionCheck/raidBattle.html")
	
	
	//Copy to a fresh boss.fla and publish.
	FLfile.remove(bossdir + "fla/boss.fla");
	fl.trace("bossdir: " + bossdir);
	FLfile.copy(fl.getDocumentDOM().pathURI, bossdir + "fla/boss.fla");
	var bossdotfla = fl.openDocument(bossdir + "fla/boss.fla");
	//alert("Publishing with CreateJS.");	//Pause is necessary or it will not publish from the new copy :/
	fl.runScript(fl.configURI + "Commands/Publish for CreateJS.jsfl");
	
	//CreateJS requires a pause to avoid a race condition, so might as well do the prompt here, rather than an alert box.
	var uploc = prompt("Upload? アップしますか？","/var/www/html/ming/flash_test/" + ftpuserdir + "/SOP/" + flaname + "/");

	//Check for light version based on .fla filename (islight will be true or false)
	islight = flaname.indexOf("_light");
	if (islight == -1) { islight = false; } else { islight = true; }


	var checkdir = "";
	//Set local check directory, depending on if light or not
	if (islight) {
		//Light version
		//checkdir = flashURI(winPath(bossdir) + "動作確認(軽量版)\\");
		checkdir = flashURI(winPath(bossdir) + "BossMoCheck_light\\");
		fl.trace("Publishing BossMotion (light version)\nボスモーション(軽量版）をパブリッシュします。");
	} else {
		//checkdir = flashURI(winPath(bossdir) + "動作確認\\");
		checkdir = flashURI(winPath(bossdir) + "BossMoCheck\\");
		fl.trace("Publishing BossMotion (normal version)\nボスモーション(普通版）をパブリッシュします。");
	}
	/*fl.trace(checkdir);
	fl.trace(winPath(checkdir));/**/


	//Copy template files and insert animation JS
	//fl.trace("remove " + winPath(checkdir));
	FLfile.remove(checkdir);// ? fl.trace("remove OK") : fl.trace("remove failed")
	copyCmd(fl.configURI + "PokeResources/SOPBossMotion/BossMotionCheck/", checkdir);
	
	
	//Adjust the list of images, depending on whether this is the light version or not
	if (islight) {
		for (var i in images) {
			if (images[i].indexOf("_Full") == 3) { 
			//Find the full image, copy to a new array, then use it instead of the original images array.
				var fullonly = [images[i]];
				images = fullonly;
				break;
			}
		}
	} else {
		for (var i in images) {
			if (images[i].indexOf("_Full") == 3) { 
			//Find the full image, then cut it out of the images array.
				images.splice(i,1);
				break;
			}
		}
	}
	
	//Make HTML references for images, and copy image files
	var imghtml = "";
	for (var i in images) {
		imghtml += '\t\t{src:imgPathBoss + "' + images[i] + '", id:"' + images[i].split(".")[0] + '"},\n';
		FLfile.copy(bossdir + "images/" + images[i], checkdir + "images/boss/" + images[i]);
	}
	//fl.trace(imghtml);
	
	//Insert image references into the HTML, then overwrite the file.
	var raidbattlehtml = FLfile.read(checkdir + "raidBattle.html");
	raidbattlehtml = raidbattlehtml.replace("//BOSSIMG",imghtml);
	FLfile.write(checkdir + "raidBattle.html", raidbattlehtml);
	
	//Adjust boss animation data
	var bossjs = FLfile.read(bossdir + "fla/boss.js");
	/**/
	dmgmc = fl.findObjectInDocByName("mc_dmgPt", fl.getDocumentDOM())[0].obj;
	bossjs = bossjs.replace(/this\.dmgPosX\t= \d+/, "this.dmgPosX	= " + dmgmc.x);
	bossjs = bossjs.replace(/this\.dmgPosY\t= \d+/, "this.dmgPosY	= " + dmgmc.y);
	/**/

	//Copy boss animation data to check directory
	FLfile.write(bossdir + "fla/boss.js", bossjs);
	FLfile.remove(checkdir + "data_boss/boss.js");
	FLfile.copy(bossdir + "fla/boss.js", checkdir + "data_boss/boss.js");
	
	//Upload if requested (from the prompt answered by the user after publishing)
	if(uploc != null && uploc != "") {
		uploadFTP(checkdir + "*", uploc);
		var uplink = uploc.replace("/var/www/html/ming/","http://ming-test.pokedev.jp/") + "raidBattle.html"; //Location formatted as web URL
		fl.trace("[To:623091] 矢羽田和徳(kazunori yahata)さん\nお疲れ様です。SOP、" + flaname.replace("_light","(軽量版)") +"ボスモーションです。\n\n" + uplink +"\n\nご確認お願いします。");
		FLfile.runCommandLine('start firefox "' + uplink);
	} else {
		fl.trace("Skipping upload.\nアップしません。");
		FLfile.runCommandLine('start firefox "' + winPath(checkdir) + 'raidBattle.html"');
	}
	
	//Cleanup 
	/**/
	fl.closeDocument(bossdotfla, false);
	FLfile.remove(bossdir + "fla/boss.fla");
	FLfile.remove(bossdir + "fla/boss.html");
	FLfile.remove(bossdir + "fla/boss.js");
	/**/
	

	
} else {
	fl.trace("Please be sure to format this boss motion file and directory properly, then try again.\nこのファイルとフォルダを再確認してください。直したら、もう一回このコマンドを実行してください。");
}