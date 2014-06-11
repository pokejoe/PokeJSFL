/*
	SamukinPublish
	Uses the Publish LWF plugin to publish for Samukin, then handles repetitive file management operations.
	
	Requirements:
		・Both the Publish for LWF script, and the LWFS daemon must be installed.　The latter must be RUNNING.
		・The project folder must be located in the LWFS_work folder on the desktop.
		・The .fla file and its containing folder must have the same name.
		・If compressed images exist, they must be in a folder called "compressed" in the same directory as the .fla file.
		・JJFileUtils v3+ must be present in  Flash Config Directory /PokeResources/
		・The upload function also requires WinSCP and related settings. See JJFileUtils for more information.
	
	v1.0
	Copyright 10 June 2014 Joseph Jacir
*/

//#include JJFileUtils
fl.runScript(fl.configURI + "PokeResources/JJFileUtils.jsfl");

fl.outputPanel.clear();

//Basic declarations
var safe = true;
var dom = fl.getDocumentDOM();
var dir = upOne(dom.pathURI);
var dir_work = upOne(dir);
var dir_work_output = upOne(dir_work) + "LWFS_work_output/";
var dir_comp = dir + "compressed/";
var projname = itemName(dom.pathURI).replace(".fla","");

/**
//Check variables
fl.trace(projname);
fl.trace(dir);
fl.trace(dir_work);
fl.trace(dir_work_output);
fl.trace(dir_comp);
/**/

//Safety checks 

if (itemName(dir_work) != "LWFS_work") {
	safe = false;
	fl.trace("Error: Project folder must be located under the LWFS_work folder.");
}
if (projname != itemName(dir)) {
	safe = false;
	fl.trace("Error: Project folder name and .fla document filename must be the same.");
}


//When safety is established, do the main stuff
if (safe) {

	//Empty the image destination folder before publishing
	var dir_imgdest = dir_work_output + "html5/list/" + projname + "/_/";
	FLfile.remove(dir_imgdest);

	//Publish LWF
	fl.runScript(fl.configURI + "Commands/Publish for LWF.jsfl");
	
	//Copy compressed images into the appropriate output directory (called simply "_")
	var dir_imgdest = dir_work_output + "html5/list/" + projname + "/_/";
	
	var compimgs = FLfile.listFolder(dir_comp);
	var outfiles = FLfile.listFolder(dir_imgdest);
	fl.trace("This will hang if the LWFS daemon is not running!\nLWFSのstartが事項されていない場合は、このスクリプトが落ちる！");
	fl.trace("Found " + compimgs.length + " compressed images.");
	var waitcount = 0;
	while(outfiles.length == 0) { 
		//Wait for LWF publishing output, should be a few seconds...
		outfiles = FLfile.listFolder(dir_imgdest);
		waitcount++;
	}
	
	fl.trace("waitcount: " + waitcount);
	//Prompt user whether to upload and where
	//Also functions as a delaying tactic while LWFS populates folder
	var uploc = prompt("Upload? アップしますか？","/var/www/html/ming/flash_test/" + ftpuserdir + "/LWFS_work_output/html5/list/" + projname);
	
	outfiles = FLfile.listFolder(dir_imgdest);
	fl.trace("Found " + outfiles.length + " files in image output dir (ideally 3 more).");
	
	var copycount = 0;
	var overwritecount = 0;
	for (var i in compimgs) {
		if (FLfile.copy(dir_comp + compimgs[i], dir_imgdest + compimgs[i])) {
			fl.trace("・Copied	" + compimgs[i]);
			copycount++;
		} else {
			if (FLfile.remove(dir_imgdest + compimgs[i])) {
				if (FLfile.copy(dir_comp + compimgs[i], dir_imgdest + compimgs[i])) {
					fl.trace("・Overwrote	" + compimgs[i]);
					overwritecount++;
				} else {
					fl.trace("! Deleted old " + compimgs[i] + " but failed to copy new one");
				}
			} else {
				fl.trace("! Failure deleting old " + compimgs[i]);
			}
		}
	}
	
	outfiles = FLfile.listFolder(dir_imgdest);
	fl.trace("Now " + outfiles.length + " files in image output dir (ideally the same as before).\n\n");
	
	//Upload if requested
	if(uploc != null && uploc != "") {
		//TODO: upload project to FTP
		var dir_projout = upOne(dir_imgdest);
		uploadFTP(dir_projout + "*", uploc);
		var uplink = uploc.replace("/var/www/html/ming/","http://ming-test.pokedev.jp/");
		fl.trace("\n[To:623091] 矢羽田和徳(kazunori yahata)さん\nお疲れ様です。サムキン、" + projname + "を完成しました。\n\n" + uplink +"/index-canvas.html\n\nご確認お願いします。");
	} else {
		fl.trace("Skipping upload.　アップロードしません。");
	}
	
} else {
	fl.trace("\nSafety checks failed. Please make sure this is a valid Samukin animation, located in the correct place before running this command.");
}