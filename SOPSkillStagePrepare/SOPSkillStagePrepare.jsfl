/*
	SOPSkillStagePrepare v1.31
	When creating a skill animation for SOP, the image references must be replaced in raidBattle.html. This does the necessary transformations. 
	
		*Depends on JJFileUtils.jsfl being present in Flash Config Directory /PokeResources/
	
		*ASSUMES A CORRECTLY FORMATTED skillStage###.fla AND SKILL DIRECTORY STRUCTURE. 
			CharacterMC layer must exist on the stage
		
		*Also requires PokeResources/raidBattle_SOPSkill.html in the config directory.
		
		*Also requires that image resources for the skill be placed in 00.SkillStage_org/images/
		
		*PNG and JPEG images may not share a name (else there will be an ID collision in the output HTML)
			They should be numbered incrementally anyway, with JPEGs coming first.
		
		*CreateJS Output folder MUST be set to the skill main folder!
	
	Copyright 2014/1/27 Joseph Jacir
	
*/

fl.outputPanel.clear();
fl.getDocumentDOM().exitEditMode();

//#include JJFileUtils
fl.runScript(fl.configURI + "PokeResources/JJFileUtils.jsfl");

var dom = fl.getDocumentDOM();
var tim = dom.getTimeline();
var lib = dom.library;

//Set the character to be a guide layer
charlayer = tim.layers[tim.findLayerIndex("CharacterMC")].frames[0].elements[0].libraryItem.timeline.layers[0];
var charstate = charlayer.layerType;	//Either "guide" or "normal"
var stateloop = 0;
for (stateloop = 1; charlayer.layerType != "guide"; stateloop++) {	//Ridiculous to have to loop, but sometimes the command just doesn't happen when executed. If it doesn't, the stage freezes in the browser.
	charlayer.layerType = "guide";
}

//Adjust the HTML to refer to this skill's ID number
var skilldir = upOne(upOne(fl.getDocumentDOM().pathURI));

var sourcehtml = FLfile.read(fl.configURI+ "PokeResources/raidBattle_SOPSkill.html");	
	//Uses the token SKN instead of the skill number in the HTML code
var skillnum = document.name.split("Stage")[1].split(".")[0];
	//document name should be formatted like "skillStage186.fla"
	//This is the source of the number throughout, so it MUST be right.

var fixedhtml = sourcehtml.replace(/SKN/g,skillnum);
	//Replace all references to the skill number.

//Publish the stage animation data, throw away the generated HTML, and move the JS into the comp.
var cjspub = fl.configURI + "Commands/Publish for CreateJS.jsfl";
	fl.runScript(cjspub);

//CreateJS requires a pause to avoid a race condition, so might as well do the prompt here, rather than an alert box.
var uploc = prompt("Upload? アップしますか？","/var/www/html/ming/flash_test/spa/sop/skill/skill" + skillnum + "/");

fl.trace("Publishing with CreateJS.\nWARNING! If the output folder on the createJS panel is not " + winPath(skilldir) + " then this step will not work right!!\n\nCreateJSでパブリッシュの実行。　注意！　CreateJSの出力フォルダ設定は「" + winPath(skilldir) + "」と違う場合は、このステップは動かなくなります！！\n\n");

//Delete old files and move new ones in
if(!FLfile.remove(skilldir + "/skillStage" + skillnum + ".html")) {
	fl.trace("Couldn't remove skillStage" + skillnum + ".html - Are you sure the CreateJS output path is set to " + winPath(skilldir) + " ? Skipping skillStage###.js copy step.");
} else {
	FLfile.remove(skilldir + "/99_comp/data_skill/id_" + skillnum + "/skillStage" + skillnum + ".js");
	//fl.trace("rm " + skilldir + "/99_comp/data_skill/id_" + skillnum + "/skillStage" + skillnum + ".js");
	FLfile.copy(skilldir + "/skillStage" + skillnum + ".js", skilldir + "/99_comp/data_skill/id_" + skillnum + "/skillStage" + skillnum + ".js");
	//fl.trace("cp " + skilldir + "/skillStage" + skillnum + ".js");
	FLfile.remove(skilldir + "/skillStage" + skillnum + ".js");
	//fl.trace("rm " + skilldir + "/skillStage" + skillnum + ".js");
	//fl.trace("Copied skill stage JS.\nスキルステージJSコピーOK。\n");
}

//Process image files
var imgsrcdir  = skilldir + "/00.SkillStage_org/images/";
var imgdestdir = skilldir + "/99_comp/images/skill/id_" + skillnum + "/";
var images = FLfile.listFolder(imgsrcdir);
var imgrefline = '{src:imgPathSkill + "THISIMGFILE", id:"THISIMGID"},\n';

//Clear out the comp image directory
if (!FLfile.remove(imgdestdir)) 
	fl.trace("Couldn't remove image destination directory. Doesn't exist yet?");
/*else
	fl.trace("Removed folder " + winPath(imgdestdir)); /**/
if (!FLfile.createFolder(imgdestdir)) 
	fl.trace("Couldn't make image destination directory."); 
/*else
	fl.trace("Made folder " + winPath(imgdestdir)); /**/

fl.trace("Copy + HTML reference images/n画像のコピーとHTML参照");
for (var i in images) {
	//Copy each image to the comp image directory for this skill,
	//then add a reference to the HTML.
	FLfile.copy(imgsrcdir + images[i], imgdestdir + images[i]);
	var thisrefline = imgrefline.replace("THISIMGFILE",images[i]);
		thisrefline = thisrefline.replace("THISIMGID",images[i].split(".")[0]);
	fixedhtml = fixedhtml.replace("SKILLIMAGES_REPLACE",thisrefline + "\t\tSKILLIMAGES_REPLACE");
	//fl.trace("	" + images[i]);
}
fixedhtml = fixedhtml.replace("SKILLIMAGES_REPLACE","");
	//Clean up the last replacement token left over.

//Write　raidBattle.html to the 99_comp directory
var outpath = skilldir + "/99_comp/raidBattle.html";
if (!FLfile.remove(outpath)) { fl.trace("Couldn't remove raidBattle.html"); }
if(FLfile.write(outpath, fixedhtml)) {
	fl.trace("\nWrote to " + winPath(outpath) + "\n出力OK.");
	FLfile.runCommandLine('start firefox "' + outpath + '"')
} else {
	fl.trace("Failed to write raidBattle.html! \n出力の失敗！");
}

//Return the character layer its original state (either normal or guide)
while (charlayer.layerType != charstate) {	//Ridiculous to have to loop, but sometimes the command just doesn't happen when executed.
	charlayer.layerType = charstate;
	//fl.trace(stateloop);
}

//Upload if requested (from the prompt answered by the user after publishing)
if(uploc != null && uploc != "") {
	uploadFTP(skilldir + "99_comp/*", uploc);
	var uplink = uploc.replace("/var/www/html/ming/","http://ming-test.pokedev.jp/") + "raidBattle.html"; //Location formatted as web URL
	fl.trace("[To:623091] 矢羽田和徳(kazunori yahata)さん\nお疲れ様です。SOP、スキル" + skillnum + "です。\n\n" + uplink +"\n\nご確認お願いします。");
	FLfile.runCommandLine('start firefox "' + uplink);
} else {
	fl.trace("\nSkipping upload.\nアップしません。");
	FLfile.runCommandLine('start firefox "' + winPath(skilldir + '99_comp/raidBattle.html"'));
}