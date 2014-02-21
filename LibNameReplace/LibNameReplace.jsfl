/*
	LibNameReplace v1.0
	Does a find and replace on user-input text on all names in the library.
	
	
	E.g.	例
	If inputs are:		入力
		Find	検索: 		DOG
		Replace	置換:		PIG
		This feature (temporarily?) removed:
			Img src　画像保存先:	C:\Projects\images
	
	Results are:		結果
		DOG15.png →	PIG15.png
		DOG15 Movie Clip → PIG15 Movie Clip
		This feature (temporarily?) removed:
			C:\Users\SomeoneElse\DOG15.png -> C:\Projects\images\PIG15.png
	
	Copyright 30 January 2014, Joseph Jacir. 
	Dev time: 5.5 hr
*/

fl.outputPanel.clear();

fl.trace("This will find and replace all item names matching a regular expression in the library with a replacement string. \nこのツールは、フラッシュライブラリのアイテムの名前をすべて検索置換します。検索分は、RegExp（正則表現）でご入力ください。\n");

//File utility functions
function upOne(path) {
	//Returns the path of the path argument's parent folder (or containing folder if a file)
	//Returns null if not possible
	if (!path || path.substr(0,8) != "file:///") { return null; }
	
	var parent = path.substr(0,path.lastIndexOf("/")); //chops off the last /
	    parent = path.substr(0,path.lastIndexOf("/")); //same line but this time chops off everything after the new last /
	
	if (parent.length < 10) { return null; } // minimum for file protocol and drive
	return parent;
}

function winPath(path) {
	//Returns a path that Windows can use from a given path that Flash can use.
	return decodeURIComponent(path.split("///")[1].replace("|",":").replace(/\//g,"\\"));
}

function flashURI (windir) {
	//Converts a Windows directory path to a Flash-usable URI.
	var fpath = windir;
	if(fpath) {
		fpath = FLfile.platformPathToURI(unescape(fpath));
		if(fpath.substr(fpath.length-1,1) != "/") {
			fpath += "/";
		}
		return fpath;
	}
	return null;
}

function findAndRepl(find, repl, hits, imgdir) {
	//hits is for recursion, the number of hits when called. Should be 0 for a non-recursed call. This could be done more elegantly but just need to git 'er done for now.
	//This is recursive because for some reason Flash does not record the replacements every time. So run until the match doesn't work anymore.
	
	var lib = fl.getDocumentDOM().library;
	var findrx = new RegExp(find, "g");
	
	
	for (var i in lib.items) {
		//Check each name
		var name = lib.items[i].name;
		var path = name.substr(0,name.lastIndexOf("/"))
		name = name.substr(name.lastIndexOf("/")+1, name.length);
		if(name.search(findrx) != -1) {
		//Replace name if matching
			fl.trace(++hits + ")	" + name);
			name = name.replace(findrx, repl);
			fl.trace(" →\t" + name + "\n");
			lib.items[i].name = name;
			hits = findAndRepl(find, repl, hits, imgdir); //Recurse because JSFL sux
		} else {
			//fl.trace("・	" + name);
		} /**/

		/* //!!!!!!!!!!!!!!!!!!!
		//This part is to replace the source path. It doesn't work because bitmapItem.sourceFilePath is read-only. A possible solution would be to import the new image, plop it into every spot in the flash file where the original is used, then delete the original. But I can't justify the dev time for that now. So I've removed this feature for now.
		
		///Update: I am thinking this feature is not even necessary in the contexts this is used. So I may not implement it at all.
		
		if (lib.items[i].itemType == "bitmap"　&& imgdir) {
		//Replace file source reference if matching and user input a path.
			//fl.trace("	↑ bitmap");
			var srcpath = lib.items[i].sourceFilePath;
			
			if(srcpath.search(findrx) != -1) {
				srcpath = srcpath.substr(srcpath.lastIndexOf("/")+1, srcpath.length);
				srcpath.replace(findrx,repl);
				srcpath = imgdir + srcpath;
				fl.trace(lib.items[i].name + " path: \n" + lib.items[i].sourceFilePath + "　→　" + winPath(srcpath));
				lib.items[i].sourceFilePath = srcpath;
			}
		}
		/**/
	}
	
	return hits;
}



function getImgDir() {
	//Prompts user for Windows format folder path for images folder, returns Flash URI of that folder (or null if not possible)
	var imgdir = prompt("Image directory	画像の保存先：", winPath(upOne(fl.getDocumentDOM().pathURI)) + "\\images\\");
	
	if (imgdir) {
		if (imgdir[imgdir.length-1] != "\\") {
			imgdir = imgdir + "\\";
		}
	}
	
	return flashURI(imgdir);
}


//Entry point
var find = prompt("Find and Replace library item names (RegExp):");

if (find != "" && find != null) {
	var repl = prompt("Replace string　置換文:");
	
	if (repl != "" && repl != null) {
		//var imgdir =　getImgDir();
		fl.trace("Please wait...");
		fl.trace("\nReplaced " + findAndRepl(find, repl, 0, null));
	} else {
		fl.trace("User did not provide a replacement string; quitting.\n置換文現は入力させていないです。停止。");
	}
} else {
	fl.trace("User did not provide search expression; quitting.\n検索生息表現は入力させていないです。停止。");
}

