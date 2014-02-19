/*
	Plop to Layer
	Takes selected library items and puts them each on a new layer, properly named, with the first frame at the current time.
	各の選択されたライブラリーアイテムを正しい名前の新しいレイヤーの現在のフレームに置きます。
	Copyright Joseph Jacir, 25 June 2013
	v2.1
*/

//fl.outputPanel.clear();

var tim = fl.getDocumentDOM().getTimeline();
var now = tim.currentFrame;
var sel = document.library.getSelectedItems();

//For centering the object, half the width and height if it's the main timeline, or {0,0} if it's a symbol.
//From the documentation: "If the timeline's libraryItem property is null, the timeline belongs to a scene. If it's not null, you can treat it like a LibraryItem object. "
if(!tim.libraryItem) {
	var here = {x: fl.getDocumentDOM().width / 2, y: fl.getDocumentDOM().height / 2};
	//fl.trace("Working on the main timeline");
} else {
	var here = {x: 0, y: 0};
	//fl.trace("Working on " + tim.libraryItem.name);
}


for (var i in sel) {
	if (sel[i].itemType != "folder" && sel[i].itemType != "undefined") {
		var namecopy = sel[i].name.split("/");
		namecopy = namecopy[namecopy.length-1];		//Strip folder path.
		tim.addNewLayer(namecopy);
		document.library.addItemToDocument(here, sel[i].name);
		var thing = tim.layers[tim.currentLayer].frames[0].elements[0]; 		//the just-added thing in the new layer
		thing.x = Math.round(thing.x);
		thing.y = Math.round(thing.y);
		if (now > 1) {		//The next step will delete the thing if the playhead was on the first frame, so test for that.
			tim.insertKeyframe(now);
			tim.insertBlankKeyframe(1);
			tim.clearKeyframes(0);
		} else if (now == 1) {	//It will also mess up on the second frame, so here's another special case.
			tim.insertKeyframe(2);
			tim.insertBlankKeyframe(1);
			tim.clearKeyframes(0);
			tim.copyFrames(2);
			tim.pasteFrames(1);
			tim.clearKeyframes(2);
		}
	}
}

tim.currentFrame = now;