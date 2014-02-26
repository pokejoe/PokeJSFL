/*
	UnJapanese
	Translates Japanese-named default objects to English, replaces full-width alphanumerics with normal "half-width" characters, and replaces all remaining unrecognized Japanese characters in object names with a numbered "JNAME" token.
	日本語でのデフォールトオブジェクトを英訳して、全角英数字を半角にして、残りの見分けられない日本語を「JNAME」+数字に変更します。
	Copyright Joseph Jacir 4 June 2013
	v1.1
	
	WARNINGS: 		
		If you undo immediately after running the script, it will undo the renaming successfully, but it will also flatten your library's directory structure. This is another result of the above ugliness. Better to save first and revert if necessary.
*/

fl.outputPanel.clear();

var	words = new Object();		//a list of all Japanese terms used by Flash and their English equivalents
	words.Symbol_ = "シンボル ";
	words.Bitmap_ = "ビットマップ ";
	words.Layer_ = "レイヤー ";
	words.Button_ = "ボタン ";
	words.Graphic_ = "グラフィック ";
	words.Tween_ = "トゥイーン ";
	words.MovieClip_ = "ムービークリップ ";
	words.Untitled_ = "名称未設定";
	words.Folder_ = "フォルダー ";
	words.Scene_ = "シーン ";
	words._copy = " のコピー";
	words.Copy = "コピー";
	words.Words = "言葉";
	words.Text = "テキスト";
	words.BG = "背景";
	
var jpatt = /([\u4e00-\u9fbf]|[\u3040-\u309f]|[\u30A0-\u30FF]|[\uFF56-\uFF9F])+/; //matches Kanji, Hiragana, Katakana, and half-width Katakana.
var fwDiff = 0xFF10-0x30;	//The integer difference between the full- and half-width characters, i.e. ３ to 3.
var fwPatt = /[\uFF01-\uFF65]/;	//matches a single full-width character, e.g. ７ or Ｃ or ＆
var teststr = "this is half width but the rest is full width！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";
var jnamecount = 0;		//Appended to Latin tokens for stray Japanese words, in order to prevent collisions.


function charSwap(str, index, ch) {		
//Unbelievably, accessing a string as an array is read-only but throws no error if you try to write. So we need this.
//Accepts a string, the index of the character in that string to replace, and the replacement character.
//Returns the string with the single character specified by index swapped out.
    var a = str.split("");
    a[index] = ch;
    return a.join("");
}


function fullToHalf(str) {
	//Accepts a string that may or may not contain full-width characters.
	//Returns the same string but with all important full-width characters converted to half-width.
	var temp = str;
	
	for (var j=0; j < temp.length; j++) {	//Look for full-width numbers
		//fl.trace(j + " | " + temp[j]);
		if (fwPatt.test(temp[j])) {
			//Get its unicode#, subtract the difference to a half-width character, and convert from unicode# back to character
			var c = String.fromCharCode((temp.charCodeAt(j) - fwDiff)); 
			fl.trace("	" + j + ":	" + temp[j] + " to " + c);
			temp = charSwap(temp, j, c);	//JS doesn't have this ability built into String as an array for some dumb reason.
		}
	}	
	return temp;
}

function strayJapanese(str) {
	//Accepts a string that may or may not contain Japanese characters
	//Returns a string with those characters replaced by a Latin-script token
	
	var result = str;
	
	while (result.replace(jpatt, "JNAME") != result) {
		//fl.trace("   Stray JChars found in " + result);
		result = result.replace(jpatt, "JNAME" + jnamecount++);	//append a digit to the token to prevent collisions, and increment the digit.
		//fl.trace("   Now " + result);
	}
	
	return result;
	
}

//fl.trace(teststr);
//fl.trace(fullToHalf(teststr));


function translate(str) {
	//accepts a string, returns the string with Japanese translated to English
	var result = str;
	
	for (var w in words) {		//First, match and replace known terms
		//fl.trace("  Matching " + w + " = " + words[w]);	//w is an English word, words[w] is its Japanese equivalent.
		while(result != result.replace(words[w],w)) {	//while for the case of nested folders
			fl.trace("   Replacing " + words[w]);
			result = result.replace(words[w],w);
			fl.trace("   Now " + result);
		}
	}
	
	//fl.trace("  No more known terms for " + result + ".\n  Looking for full-width characters" );
	
	result = fullToHalf(result);	//Then swap out any full-width characters
	
	//fl.trace("  Full width check complete for " + result);
	
	result = strayJapanese(result);		//We've caught all the specific Japanese names we can, so now just catch the rest of the Japanese characters and swap in a token.
	
	return result;
}

function scanTimeline(tim) {
	//accepts a Timeline object, replaces Japanese on layer names
	fl.trace("Scanning Timeline object " + tim.name + " for Japanese.") 
	tim.name = translate(tim.name);
	for (k in tim.layers) {
		tim.layers[k].name = translate(tim.layers[k].name);
	}
}




//ENTRY POINT, scan library.	
var items = document.library.items;
fl.trace("Scanning " + items.length + " library items for Japanese");
for (var i = items.length-1; i >= 0; i--) { //For some reason these are indexed backwards, so loop backwards
	fl.trace(" Inspecting " + items[i].name);
	var cutoff = items[i].name.split("/");
	items[i].name = translate(cutoff[cutoff.length-1]);
	
	//If the object has a timeline, enter it and scan that too.
	if (items[i].timeline){
		fl.trace(items[i].name + " has a timeline.");
		scanTimeline(items[i].timeline);
	}
	
	fl.trace(" Item complete: #" + i);
} /***/

for(var t=0; t < fl.getDocumentDOM().timelines.length; t++) {
	scanTimeline(fl.getDocumentDOM().timelines[t]);
}

fl.trace("Sayonara.");