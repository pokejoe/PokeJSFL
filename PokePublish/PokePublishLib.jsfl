/*
	PokePublish v1.1
	A replacement for the default CreateJS Publish command, that includes all adjustments necessary to prepare the file for Pokelabo games.
	
	Copyright 2013 Joseph Jacir
	2013-25-06 ~ 2013-08-07
	dev time: 10hr including control panel, not including conversion code (wrote that previously for site-based converter)
	
	Changelog:
		v1.1 - Added insertion of next_url variable into the HTML; no longer needs to be included in the JS. According to Gu-san it should always have been this way, which makes me worry about every file we've done up until now...
*/

/////////Declarations and Definitions

function upOne(path) {
	//Returns the path of the path argument's parent folder (or containing folder if a file)
	//Returns null if not possible
	if (!path || path.substr(0,8) != "file:///") { return null; }
	
	var parent = path.substr(0,path.lastIndexOf("/")); //chops off the last /
	parent = path.substr(0,path.lastIndexOf("/")); //same line but this time chops off everything after the new last /
	
	if (parent.length < 10) { return null; } // minimum for file protocol and drive
	return parent;
}

//These declarations set the cleaned up code to be inserted into the raw code.
//I took these chunks from this file:	\\POKE-DEV02\pokefs2\02.海外アプリ\11.栄光のガーディアンバトル\06.演出データ\演出ファイル\【Fin】02.lvlup\01.本番\levelup.html
var chunks = new Array();	
	chunks[0] = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>OLDTITLE</title>\n<!-- スマホサイズにfit -->\n<meta id="viewport" name="viewport" content="width=320,initial-scale=1,minimum-scale=1,maximum-scale=1">\n<!--androidはこっち <meta name="viewport" content="initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> -->\n<!-- 電話番号認識の無効化-->\n<meta name="format-detection" content="telephone=no"/>\n<meta name="apple-mobile-web-app-capable" content="yes">\n<style>\n	html {\n		background-color:#000000;\n		width: 100%;\n		height: 100%;\n		margin: 0 auto; padding: 0;\n		display: table;\n	}\n	body {\n		text-align:center;\n		vertical-align:middle;\n		margin: 0 auto; padding: 0;\n		display: table-cell;\n	}\n	a{\n	    -webkit-touch-callout:none;\n	    -webkit-tap-highlight-color:rgba(0,0,0,0);\n	}\n	canvas {\n		vertical-align:middle;\n		border:0px;\n		margin:0px;\n	}\n	#loading {\n		position:absolute;\n		overflow:auto;\n		top:50%;\n		left:50%;\n		text-align:center;\n		height: 24px;\n		width: 24px;\n		margin-top:-12px;\n		margin-left:-12px;\n	}\n</style>';
	chunks[1] = "\n\n	initTouch();";
	chunks[2] = "\n	next_url = 'http://www.google.com';\n\n	document.getElementById('loading').style.visibility=\"hidden\";\n	document.getElementById('loading').style.display=\"none\";";
	chunks[3] = '\n	//▼androidはコメントアウト 画質を上げる\n	defultWidth  = OLDWIDTH;\n	defultHeight  = OLDHEIGHT;\n	if(typeof window.devicePixelRatio === "undefined"){\n		devicePixelRatio = 1;\n	}else{\n		devicePixelRatio = window.devicePixelRatio;\n	}\n	exportRoot.setTransform(0,0,devicePixelRatio,devicePixelRatio);\n	document.getElementById(\'canvas\').width = defultWidth * devicePixelRatio; \n	document.getElementById(\'canvas\').height = defultHeight  * devicePixelRatio; \n	scale =defultWidth  / (defultWidth *  devicePixelRatio) ;\n	document.getElementById(\'viewport\').content= "width="+defultWidth*devicePixelRatio+",initial-scale="+scale+",minimum-scale="+scale+",maximum-scale="+scale; \n	//▲androidはコメントアウト';
	chunks[4] = '<body onload="init();" style="background-color:#000000">'
	chunks[5] = '\n	<div id="loading"><img src=\'images/loader.gif\' /></div>\n\t';
	//These were added later　and are optional, so they are out of order.
	chunks[6] = "\n	DisplayObject.prototype.snapToPixel = true;"; //For CreateJS v1.1
	chunks[9] = "\n createjs.DisplayObject.prototype.snapToPixel = true;"; //For CreateJS v1.2, out of order because it is an alternate of the previous
	chunks[7] = "\n	stage.snapToPixelEnabled = true;"
	chunks[8] = '\nfunction initTouch(){\n\t//document.addEventListener("touchstart", touchHandler, false);\n\tdocument.addEventListener("touchmove", touchHandler, false);\n\t//document.addEventListener("touchend", touchHandler, false);\n\tdocument.addEventListener("touchcancel", touchHandler, false);\n	\n	//画面をスライドさせないようにする\n	function touchHandler(event) {\n		event.preventDefault();\n	}\n}\n\n';

var v1_2 = true;	//Adapted from the website-based converter, in this context this value should always be true. Assumes the user has Toolkit for CreateJS v1.2 installed. For later versions, this will PROBABLY need to continue to be set to true - the difference is shown in the chunks[] declaration. Before v1.2, objects like DisplayObject were top level but are now properties of the createjs object.

function convertHTML(title, raw, snap) {
// Accepts a string title, string raw code, and a boolean for the snapToPixel option.

		var clean = "";	//the final output gets built up here
		var temp = "";	//a place to split up the raw code
		
////////Step 0: replace head

	var titlefix = chunks[0].replace("OLDTITLE",title); 
	//insert the user-entered title
	
	temp = raw.split("</title>");
	
	if(temp[1] == undefined) {alert("Error:\n\n<TITLE>は閉まっていません。\n\n <TITLE> tag not closed in raw file.\n"); return;}
	//Handle invalid raw code
	//Error handling works by checking whether the string was split into more than one piece. If not, the search string was not found in the raw code and it is therefore malformed.
	
	clean = titlefix + temp[1];	//replace everything before the raw closing title tag
	
////////Step 1: Add the command initTouch(); to the bottom of the init() function.
	temp = clean.split("loader.loadManifest(manifest);");		//the last line of the raw init() function
	
	if(temp[1] == undefined) {alert("Error:\n\ninit()の不正な形式。\n\n Malformed init() function in raw file."); return;}
	//Handle invalid raw code
	
	clean = temp[0] + "loader.loadManifest(manifest);" + chunks[1] + temp[1];	//re-insert split search string, plus the new line
	
	
////////Step 2: At the top of handleComplete():, copy in the two lines about loading, and next_url
	temp = clean.split("function handleComplete() {");
	
	if(temp[1] == undefined) {alert("Error: \n\nhandleComplete()の欠落。\n\n Missing handleComplete() function in raw file");  return;}
	//Handle invalid raw code
	
	clean = temp[0] + "function handleComplete() {" + chunks[2] + temp[1];
	
////////Step 3: Between stage.addChild(exportRoot); and stage.update();, copy in the part between (and including) the //comments about commenting out for Android.
	temp = clean.split("stage.addChild(exportRoot);");
	
	if(temp[1] == undefined) {alert("Error: \n\nstage.addChild(exportRoot);の欠落。\n\nMissing stage.addChild(exportRoot); command in raw file");  return;}
	//Handle invalid raw code
	
	clean = temp[0] + "stage.addChild(exportRoot);" + chunks[3] + temp[1];
	
////////Step 4: Change the <BODY>'s background color to #000000.
	temp = clean.split('<body onload="init();" style="background-color:#');
	
	clean = temp[0] + '<body onload="init();" style="background-color: #000000' + temp[1].substring(6,temp[1].length-1);
	//Assumes a six-character hex number color code. Will break the HTML if the color is not six characters!!!
	

	
////////Step 5: Copy the loading <DIV> (with gif) line into the top of the <BODY>
	/**/
	
	temp = clean.split('<canvas');		//this case differs, we're inserting stuff BEFORE the split, since the <BODY> tag is unpredictable.
	
	if(temp[1] == undefined) {alert("Error: \n\n\loading.gifの<DIV>の挿入地位そうにゅを見つけられませんでした。n\nCouldn't find insertion point for loading.gif's <DIV>."); return;}
	//Handle invalid raw code
	
	clean = temp[0] + chunks[5] + '\n\t<canvas' + temp[1];
	
	/**/
	
////////Optional Step 6: If snapToPixel is checked, add this to the first line of init
//////////////However, the code is different between CreateJS v1.1 and 1.2, so account for this option.
	if(snap) {
		temp = clean.split("function init() {");
		
		if(temp[1] == undefined) {alert("Error: \n\ninit()の欠落。\n\nCouldn't find init() function.");  return;}
		//Handle invalid raw code
		
		if(!v1_2) {	//CreateJS v1.1 or less
			clean = temp[0] + "function init() {" + chunks[6] + temp[1];
		} else {
			clean = temp[0] + "function init() {" + chunks[9] + temp[1];
		}
	}
	
////////Optional Step 7: If snapToPixel is checked, also put this under the new stage declaration
/////////////Gotcha: The new stage declaration is different in CreateJS v1.1 and 1.2

	if(snap) {
		if(!v1_2) {
			var stagedec = "stage = new Stage(canvas);";
		} else { 
			var stagedec = "stage = new createjs.Stage(canvas);";
		}
			temp = clean.split(stagedec);
			
			if(temp[1] == undefined) {alert("Error: \n\ninit()新しいステージの言明の欠落。\nCreateJSバージョンをご確認ください。\n\nCouldn't find the new stage declaration.\nPlease check your createJS version.");  return;}
			//Handle invalid raw code
			
			clean = temp[0] + stagedec + chunks[7] + temp[1];
		
	}

////////Step 8: Add the body of the initTouch() function at the end of the </script> tag
	temp = clean.split("</script>\n</head>");
	
	if(temp[1] == undefined) {alert("Error:\n\n<HEAD>の終わり前の<SCRIPT>は閉まっていません。\n\n Final <SCRIPT> tag in <HEAD> not closed in raw file.\n");  return;}
	//Handle invalid raw code
	
	clean = temp[0] + chunks[8] + "</script>\n</head>" + temp[1];

	
////////Step 9: Synchronise the height and width in various places
	clean = clean.replace("OLDWIDTH",document.width);
	clean = clean.replace("OLDHEIGHT",document.height);
	clean = clean.replace(/id="canvas" width="\d\d\d" height="\d\d\d" style="background-color:#......"/,'id="canvas" width="' + document.width + '" height="' + document.height + '" style="background-color:#000000"')

///////Finish	
	clean += ">"	//Quick fix - closing HTML tag is broken. I should figure out why, but this patches it.
	
	fl.trace("HTML conversion successful.\nHTML変換完了");
	
	return clean;
}


var workingpath = upOne(upOne(fl.getDocumentDOM().pathURI));
var productionpath = workingpath + "/01.本番/";
var imagespath = productionpath + "/images/";
var docname = document.name.substr(0,document.name.length-4); //cut off the .fla




//////MAIN FUNCTION, entry point
function buttonPoke(anititle, snappx, comppath) {
	//Called by a button press on the PokePublish panel.
	//Accepts the string title of the animation, boolean whether to remove unused library items, boolean whether to enable the snapToPixel option, string compressed image path
	
	//TODO: save the panel info to the file. Related - in the AS3, load this info if available
	
	fl.outputPanel.clear();
	
	
	//Compressed path validation
	if(comppath) {
		comppath = FLfile.platformPathToURI(unescape(comppath));
		if(comppath.substr(comppath.length-1,1) != "/") {
			comppath += "/";
		}
	}
	
	//Delete out-of-date contents in the production folder
	var oldcontent = FLfile.listFolder(productionpath);
	if (!oldcontent.length) {
		fl.trace("01.本番 is empty\n01.本番　の空白");
	}
	for (var i in oldcontent) {
		fl.trace("Found old content: " + oldcontent[i]);
		var killme = productionpath + oldcontent[i];
		if (FLfile.remove(killme)) { 
			fl.trace("	Deleted."); 
		} else { 
			fl.trace("	Warning: could not delete"); 
		}
	}
	
	//Run the vanilla toolkit's publish command
	var cjspub = fl.configURI + "Commands/Publish for CreateJS.jsfl";
	fl.runScript(cjspub);
	alert('Warning: Please wait for CreateJS ouput to appear in the output panel, then click OK. Otherwise the script with run before publishing and the conversion will fail.\n注意：出力パネルにCreateJSの出力が出て来ましたら、OKをクリックしてください。そうしないと、HTMLがパブリッシュされず、このスクリプトが走って失敗になります。');
	//Workaround: chokes without an artificial pause


	//Run the HTML conversion
	var infile = productionpath + docname + ".html";
	var rawhtml = FLfile.read(infile);
	if(!rawhtml) { fl.trace("No text in raw CreateJS output file. Please wait for CreateJS to finish　publishing before clicking OK. This sometimes requires two tries. \nCreateJS出力ファイルが空白です。OKをクリック前に、CreateJSのパブリッシュをお待ちください。このコマンドは、時々2回やってみることが必要です。"); }
	////Insert a panel-based textbox for the title, and a checkbox here for the snapToPixel option
	rawhtml = convertHTML(anititle, rawhtml, snappx); //pending panel
	FLfile.write(infile, rawhtml);
		
	//Replace the published images with compressed ones
	var compressed = new Array();
	if (comppath) {	compressed = FLfile.listFolder(comppath, "files");	}
		
	if(comppath && compressed.length) {
		fl.trace("From " + comppath + " から");
		fl.trace("Overwriting images with compressed files:\n画像を軽量版で上書き中：");
		var savings = 0;
		for (var i in compressed ) {
			fl.trace("	" + compressed[i]);
			var origsize = FLfile.getSize(imagespath + compressed[i]);
			var compsize = FLfile.getSize(comppath + compressed[i]);
			savings += origsize - compsize;
			fl.trace(Math.round(origsize/1024) + "Kb ->" + Math.round(compsize/1024) + "Kb");
			FLfile.remove(imagespath + compressed[i]);
			FLfile.copy(comppath + compressed[i], imagespath + compressed[i]);
		}
		fl.trace("Compression saved " + Math.round(savings/1024) + "Kb.");
	} else {
		fl.trace("No compressed files found.\n軽量されたファイルを見つけられませんでした。");
	}

	//Drop in loader.gif
	var loadergif = fl.configURI + "WindowSWF/" +"PokePublish_loader.gif"
	if(FLfile.copy(loadergif, imagespath + "loader.gif")) {
		fl.trace("\nCopied loader.gif.\nloader.gifをコピーしました。");
	} else {
		fl.trace("\nloader.gif copy failed. Already exists?\nloader.gifのコピーの失敗。すでに入っていますか？");
	}

}