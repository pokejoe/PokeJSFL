/*	
	Encapsulate in Movie Clip
	Takes selected library items (bitmaps, graphics, and movie clips) and centers them in a new movie clip each.
	ライブラリの選択範囲のアイテム（ビットマップ、グラフィック、ムービークリップ）を新しいムービークリップの中に置きます。
	Copyright Joseph Jacir, 13 June 2013
	v1.6
*/

fl.outputPanel.clear();

var sel = document.library.getSelectedItems();


for (var i in sel) {
	var clipname = sel[i].name.replace(/\....$/,"") + "_m";	//replaces 3-letter filename extension　at the end of a string.
	var itemindex = document.library.findItemIndex(sel[i].name);
	//fl.trace(sel[i].name + "	" + sel[i].itemType + "	" + clipname);
	
	if (sel[i].itemType == "bitmap" || sel[i].itemType == "movie clip" || sel[i].itemType == "graphic") {
		var clippath = "Autoclip/" + clipname;
		document.library.addNewItem("movie clip", clippath);
		fl.trace("Made clip " + clipname );
		document.library.editItem(clippath);	
		fl.getDocumentDOM().addItem({x:0, y:0},sel[i]);
		document.library.items[document.library.findItemIndex(clippath)].timeline.layers[0].name = clipname;		
		fl.getDocumentDOM().exitEditMode();
	}
}

document.library.expandFolder(true, false, "Autoclip");
document.library.selectNone();

for (var i in document.library.items ) {
	if (document.library.items[i].name.split("Autoclip/").length > 1) {
		//fl.trace("selecting " + document.library.items[i].name);	
		document.library.selectItem(document.library.items[i].name, false, true);				
	}
}