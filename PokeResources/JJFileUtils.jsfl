﻿/*
	JJFileUtils v2.2
	File utility functions for JSFL on Windows. Tested on Flash CS6.
	Copyright 2013 Joseph Jacir
	
	How to include this file - add this to the top of your script:
		/#include JJFileUtils
		fl.runScript(fl.configURI + "PokeResources/JJFileUtils.jsfl");
	
	WARNING - upOne has been updated to chop greedily, where as old versions would only remove the terminal / if handed a URI ending in /. It will also automatically add the terminal / to any returned path. This means that file management functions should be CAREFULLY inspected to make sure files that use this updated function are not placed in parent directories, and don't manually insert a / after paths using this function.
*/

//#include LocalUserSettings
fl.runScript(fl.configURI + "PokeResources/LocalUserSettings.jsfl");

function upOne(path) {
	//Returns the path of the path argument's parent folder (or containing folder if a file). Both argument and return value must be Flash-format URIs.
	//Returns null if not possible
	if (!path || path.substr(0,8) != "file:///") { return null; }
	
	var parent = path;
	
	if (parent[parent.length-1] == "/") { 
		//chop off the last / if included
		parent = parent.substr(0,parent.length-1);
	}
	
	parent = parent.substr(0,parent.lastIndexOf("/")); //chops off the last / and everything after.
	
	if (parent.length < 10) { return null; } // minimum for file protocol and drive
	return parent + "/";
}

function winPath(path) {
	//Returns a path that Windows can use from a given path that Flash can use. May return gibberish if the argument is improperly formatted.
	return decodeURIComponent(path.split("///")[1].replace("|",":").replace(/\//g,"\\"));
}

function flashURI(windir) {
	//Returns a Flash-usable URI, given a Windows directory path.
	//Returns null if not possible.
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

/*
//Not sure if this works, and not sure how to test it. But theoretically it does.
function writeUTF8(loc, txt) {
	//Requires a blank UTF8 file saved in fl.configURI + "PokeResources/blankUTF8.txt";
	//Accepts a location as FlashURI, and the text to write. Overwrites any existing file.
	var blank = fl.configURI + "PokeResources/blankUTF8.txt";
	FLfile.copy(blank, loc);
	FLfile.write(loc, txt, "append");	
}
/**/

function copyCmd(src, dest) {
	//FLfile.copy() only copies individual files; this can recursively copies directories using the DOS copy command.
	//Accepts two Flash-usable URIs for the source folder and destination folder respectively
	var cmd = '';
	var batloc = fl.configURI + "PokeResources/copyCmd.bat";
	
	wsrc  = '"' + winPath(src)  + '"';
	wdest = '"' + winPath(dest) + '"';
	
	cmd += '::This is an auto-generated batch file by the copyCmd function of JJFileUtils.jsfl. It can safely be deleted; it is stored only for debug purposes.\r\n\r\n';
	cmd += 'cd ' + wsrc + ' \r\n';
	cmd += 'xcopy * ' + wdest + ' /E /R /K /Y /I \r\n';	
	//cmd += 'PAUSE \r\n';
	
	FLfile.write(batloc, cmd);
	FLfile.runCommandLine('"' + winPath(batloc) + '"');
}
	
function uploadFTP(localpath, remotedir) {

	//Assumes a WinSCP installed, with a profile named above, with a stored password! Set this up if not already extant. Set the loc and profile variables above.
	//Accepts two flash URIs.
	//localpath can be a file or a folder, and can use a wildcard "*". Paths with spaces must be enclosed in double quotes and all backslashes "\" must be escaped "\\". eg:
	//C:\\upload
	//"C:\\Users\\me\AppData\\Local\\Adobe\\Flash CS6\\ja_JP\\Configuration\\PokeResources\\"
	//C:\\Projects\\SOP\\BossMotion\\Funbaba\*
	//remotedir should be formatted, for example, like: /var/www/html/ming/flash_test/gemini/SOP/
	
	fl.trace("Uploading from:\n" + winPath(localpath) + "\nTo:\n" + remotedir + "\n\nWarning: If local directory includes CJK characters, this upload may fail.\n\n注意：　英数字のみのローカル保存先が必要です。日本数字が含まている場合はアップロードできない可能があります。\n\n");
	
	//Create the upload script for WinSCP.
	var upscript = "";
	var upscriptloc = fl.configURI + "PokeResources/upscript.txt";
	
	upscript = "#This is an auto-generated WinSCP upload script file generated by the uploadFTP function of JJFileUtils.jsfl. It can safely be deleted; it is stored only for debug purposes. \n\n";
	upscript += "echo on\noption batch continue\noption confirm off\n\nopen " + winSCPprofile + "\n";
	upscript += "mkdir " + remotedir + "\ncd " + remotedir + "\n"; 
	upscript += 'put "' + winPath(localpath) + '"\n';
	upscript += "exit";
	
	FLfile.write(upscriptloc, upscript);
	
	//Create the batch file for Windows to run, which executes WinSCP with the script above.
	var upbatch = "";
	var upbatchloc = fl.configURI + "PokeResources/upbatch.bat";
	
	upbatch += '::This is an auto-generated batch file by the uploadFTP function of JJFileUtils.jsfl. It can safely be deleted; it is stored only for debug purposes.\r\n\r\n';
	upbatch += winSCPloc + ' /script=\"' + winPath(upscriptloc)　+ '"';
	//upbatch += "\r\n\r\nPAUSE";
	
	FLfile.write(upbatchloc, upbatch);
	
	//Execute the batch file to perform the upload.
	FLfile.runCommandLine('"' + winPath(upbatchloc) + '"');
}

