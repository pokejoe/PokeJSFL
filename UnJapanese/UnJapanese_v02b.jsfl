/*
	UnJapanese
	Translates Japanese objects to English, and replaces full-width alphanumerics with normal "half-width" characters.
	“ú–{Œê‚É‘‚¢‚Ä‚ ‚é–¼‘O‚ğ‰pŒê‚Ü‚Å–|–ó‚µ‚ÄA‘SŠp‰p”š‚©‚ç”¼Šp‰p”š‚Ü‚Å•ÏŠ·‚µ‚Ü‚·B
	Copyright Joseph Jacir 4 June 2013
	v0.2b
	
	WARNINGS: 
		Does not adjust Hiragana, Katakana, or Kanji.
		
		The Flash library structure uses a dash "-" to delineate folders in names. Because of the way JSFL accesses the name property, I cut off names before the dash, so do not use them in object names!
		
		If you undo immediately after running the script, it will undo the renaming successfully, but it will also flatten your library's directory structure. This is another result of the above ugliness. Better to save first and revert if necessary.
		
		If this script (or any with Japanese characters in it) does not run, check the encoding. Shift-JIS worked for me.
		
	Feature request:
		Replace all instances of a name with Kanji, Hiragana, Katakana included with a new name like "KanjiObj"
*/

fl.outputPanel.clear();

var	words = new Object();		//a list of all Japanese terms used by Flash and their English equivalents
	words.symbol_ = "ƒVƒ“ƒ{ƒ‹ ";
	words.bitmap_ = "ƒrƒbƒgƒ}ƒbƒv ";
	words.layer_ = "ƒŒƒCƒ„[ ";
	words.button_ = "ƒ{ƒ^ƒ“ ";
	words.graphic_ = "ƒOƒ‰ƒtƒBƒbƒN ";
	words.tween_ = "ƒgƒDƒC[ƒ“ ";
	words.movieClip_ = "ƒ€[ƒr[ƒNƒŠƒbƒv ";
	words.untitled_ = "–¼Ì–¢İ’è";
	words.folder_ = "ƒtƒHƒ‹ƒ_[ ";
	words.scene_ = "ƒV[ƒ“ ";
	words._copy = "‚ÌƒRƒs[";
	words.words = "Œ¾—t";
	words.text = "ƒeƒLƒXƒg";
	words.bg = "”wŒi";
	
	
function charSwap(str, index, ch) {		
//Unbelievably, accessing a string as an array is read-only but throws no error if you try to write. So we need this.
//Accepts a string, the index of the character in that string to replace, and the replacement character.
//Returns the string with the single character specified by index swapped out.
    var a = str.split("");
    a[index] = ch;
    return a.join("");
}


var fwDiff = 0xFF10-0x30;	//The difference between the full- and half-width characters, i.e. ‚R to 3.
var fwPatt = /[\uFF01-\uFF65]/;	//matches a single full-width character, e.g. ‚V
var teststr = "this is half width but the rest is full widthIúW”“•úVij–{C|D^‚O‚P‚Q‚R‚S‚T‚U‚V‚W‚XFGƒ„H—‚`‚a‚b‚c‚d‚e‚f‚g‚h‚i‚j‚k‚l‚m‚n‚o‚p‚q‚r‚s‚t‚u‚v‚w‚x‚ym_nOQM‚‚‚‚ƒ‚„‚…‚†‚‡‚ˆ‚‰‚Š‚‹‚Œ‚‚‚‚‚‘‚’‚“‚”‚•‚–‚—‚˜‚™‚š"


function fullToHalf(str) {
	//Accepts a string that may or may not contain full-width characters.
	//Returns the same string but with all important full-width characters converted to half-width.
	var temp = str;
	
	for (j=0; j < temp.length; j++) {	//Look for full-width numbers
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

//fl.trace(teststr);
//fl.trace(fullToHalf(teststr));


function translate(str) {
	//accepts a string, returns the string with Japanese translated to English
	result = str;
	
	for (w in words) {		//First, match and replace known terms
		//fl.trace("  Matching " + w + " = " + words[w]);	//w is an English word, words[w] is its Japanese equivalent.
		while(result != result.replace(words[w],w)) {	//while for the case of nested folders
			fl.trace("   Replacing " + words[w]);
			result = result.replace(words[w],w);
			fl.trace("   Now " + result);
		}
	}
	
	fl.trace("  No more known terms for " + result + ".\n  Looking for full-width characters" );
	
	result = fullToHalf(result);	//Then swap out any full-width characters
	
	fl.trace("  Full width check complete for " + result);
	
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
for (i = items.length-1; i >= 0; i--) { //For some reason these are indexed backwards, so loop backwards
	fl.trace(" Inspecting " + items[i].name);
	items[i].name = translate(items[i].name);
	
	//If the object has a timeline, enter it and scan that too.
	if (items[i].timeline){
		fl.trace(items[i].name + " has a timeline.");
		scanTimeline(items[i].timeline);
	}
	
	fl.trace(" Item complete: #" + i);
	
	//This deals with symbols nested in folders; because of the ugly way JSFL handles the names of items in folders, they get a lot of junk prepended, separated by dashes "-". Therefore, cut off anything before the final dash. The drawback is that you can't use dashes in names or they will get mangled, but oh well.
	var cutoff = items[i].name.split("-");
	items[i].name = cutoff[cutoff.length-1];

} /***/

for(t=0; t < fl.getDocumentDOM().timelines.length; t++) {
	scanTimeline(fl.getDocumentDOM().timelines[t]);
}

fl.trace("Sayonara.");
