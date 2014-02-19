/*
	MakaiKakuseiPreview v1.1
	Automatically publishes HTML and SWF documents for the left and right views of a kakusei animation for Makai Gakuen. This script ASSUMES A CORRECTLY FORMATTED KAKUSEI FLA; it is for a very narrow purpose and useless otherwise. Puts the files, plus an index, in the parent directory, and interfaces with WinSCP to upload them to the preview server. WINDOWS ONLY
	
	Copyright 2013/11/29 Joseph Jacir
	
	TODO:
		This was written before I made my file and upload management utilities. Integrate them!
*/

fl.outputPanel.clear();
fl.getDocumentDOM().exitEditMode();

var doc = fl.getDocumentDOM();
var tim = doc.getTimeline();

function winPath(path) {
	//Returns a path that Windows can use from a given path that Flash can use.
	return decodeURIComponent(path.split("///")[1].replace("|",":").replace(/\//g,"\\"));
}

function upOne(path) {
	//Returns the path of the path argument's parent folder (or containing folder if a file)
	//Returns null if not possible
	if (!path || path.substr(0,8) != "file:///") { return null; }
	
	var parent = path.substr(0,path.lastIndexOf("/")); //chops off the last /
	    parent = path.substr(0,path.lastIndexOf("/")); //same line but this time chops off everything after the new last /
	
	if (parent.length < 10) { return null; } // minimum for file protocol and drive
	return parent;
}

var thisdir = upOne(fl.getDocumentDOM().pathURI);
var parentdir = upOne(thisdir);
var tempdir = fl.configURI+ "PokeToolsTemp";	//Ugly, but JSFL and Windows don't play nice with encoding and Japanese characters in path names.
var docname = document.name.substr(0,document.name.length-4); //cut off the .fla

if (!FLfile.createFolder(tempdir)) {
	alert("Warning: couldn't create temp folder. May already exist.\n注意：tempフォルダーを作れませんでした。たぶんすでに作りました。");
}

function plopAndPublish(clipname) {
	//Accepts a string which should either be "left" or "right"
	//Put the clip on the main timeline, publish, then clean up.
	tim.addNewLayer(clipname + " TEMP");
	doc.library.addItemToDocument({x:0,y:0},clipname);
	var el = tim.layers[0].frames[0].elements[0];
	el.x = 0; 
	el.y = 0;
	doc.publish();
	adjustOutput(clipname);
	tim.deleteLayer(0);
}

function adjustOutput(clipname) {	
	//Delete existing copies in parent directory, since copy function can't overwrite.
	if(!FLfile.remove(parentdir + "/" + docname + "_" + clipname + ".swf")) {fl.trace("Failed to remove swf from parent directory to make room for new one.");};
	FLfile.remove(parentdir + "/" + docname + "_" + clipname + ".html");

	//Adjust HTML to account for difference between _left and _right
	var adjhtml = FLfile.read(thisdir + "/" + docname + ".html");
	adjhtml = adjhtml.replace(new RegExp(docname, 'g'), docname + "_" + clipname);
		//Regex matches all instances rather than just the first
	adjhtml = adjhtml.replace('</body>','<DIV style="position:absolute; left:1em; top:495px;"><A href="index.html">List all</A></DIV>\n</body>');
		//add link to index
	FLfile.write(thisdir + "/" + docname + "_" + clipname + ".html", adjhtml);
	FLfile.remove(thisdir + "/" + docname + ".html");
	
	//Rename (copy and delete original) to add _left and _right to swf and all links.
	FLfile.copy(thisdir + "/" + docname + ".swf", parentdir + "/" + docname + "_" + clipname + ".swf")
	FLfile.remove(thisdir + "/" + docname + ".swf");
	FLfile.copy(thisdir + "/" + docname + "_" + clipname + ".html", parentdir + "/" + docname + "_" + clipname + ".html")
	FLfile.remove(thisdir + "/" + docname + "_" + clipname + ".html");
}


/////Entry point
plopAndPublish("left");
plopAndPublish("right");

//Collect list of HTML files in parent folder (excluding an already existing index) and copy them to temp dir for uploading, along with corresponding SWF
var allfiles = FLfile.listFolder(parentdir, "files");
var list = "\n<OL>\n";
for (i in allfiles) {
	//fl.trace(allfiles[i]);
	if (allfiles[i].substr(allfiles[i].length-5,allfiles[i].length-1) == ".html" && allfiles[i] != "index.html") {
	//Exclude the index at this point because if it exists, it might be out of date.
		list += '<LI><A href="' + allfiles[i] + '">' + allfiles[i] + '</A><BR>\n';
		FLfile.copy(parentdir + "/" + allfiles[i], tempdir + "/" + allfiles[i]);
		var curswf = allfiles[i].substr(0,allfiles[i].lastIndexOf(".")) + ".swf";
		FLfile.copy(parentdir + "/" + curswf, tempdir + "/" + curswf);
	}
}
list += "</OL>\n";
//fl.trace(list);

//Make index
var indexhtml = "<HTML><HEAD><TITLE>docname</TITLE><\HEAD>\n<BODY>\nlist\n</BODY></HTML>";
indexhtml = indexhtml.replace("docname", docname.split("_")[0]);
indexhtml = indexhtml.replace("list", list);

FLfile.write(parentdir + "/index.html", indexhtml);
FLfile.copy (parentdir + "/index.html", tempdir + "/index.html") //Copy index to temp dir for uploading


//Build temporary upload script for WinSCP
//Assumes a WinSCP profile called "mingtest" with a stored password! Set this up if not already extant.

var kakuseinum = docname.split("_")[0].split("Assets")[1];
upscript = "echo on\noption batch continue\noption confirm off\n\nopen mingtest\ncd /var/www/html/ming/flash_test/gemini/MakaiGakuen/Awakening/\nmkdir KAKUSEINUM\ncd KAKUSEINUM\n#PUTLIST\nexit";
upscript = upscript.replace(RegExp("KAKUSEINUM", 'g'), kakuseinum);

//Loop through again, add "put" command for all HTMLs and SWFs
var allfiles = FLfile.listFolder(tempdir);
var list = "\n";
for (i in allfiles) {
	//fl.trace(allfiles[i]);
	////if (allfiles[i].substr(allfiles[i].length-5,allfiles[i].length-1) == ".html" ||allfiles[i].substr(allfiles[i].length-4,allfiles[i].length-1) == ".swf" ) {
		list += 'put "' + winPath(tempdir) + '\\' + allfiles[i] + '"\n';
	////}
}
upscript = upscript.replace("#PUTLIST",list);
FLfile.write(tempdir + "/upscript.txt", upscript);


//Perform the upload
var upbatch = '"C:\\Program Files (x86)\\WinSCP\\WinSCP.com\" /script=\"' + winPath(tempdir) + '\\upscript.txt\"';
//upbatch += "\nPAUSE";		//Comment out to remove the pause before this tool cleans up after itself.
FLfile.write(tempdir + "/upbatch.bat", upbatch);
FLfile.runCommandLine('"' +winPath(tempdir) + '\\upbatch.bat"');


//Output message for Yahata-san
fl.trace("[To:623091] 矢羽田和徳(kazunori yahata)さん\n\nお疲れ様です。魔界学園、覚醒演出" + kakuseinum + "です。 \n\nhttp://ming-test.pokedev.jp/flash_test/gemini/MakaiGakuen/Awakening/" + kakuseinum + "/index.html\n\nご確認をよろしくお願いします。");


FLfile.remove(tempdir);