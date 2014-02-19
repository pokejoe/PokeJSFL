/*
	NOT YET READY FOR USE
	
	Replace Element
	Replaces element 0 on the selected frames with the selected library item.
	選択されたフレームの0番エレメントを選択されたライブラリーアイテムで変換します。
	
	v0.1
	Copyright 5 November 2013 Joseph Jacir
*/

fl.outputPanel.clear();
var tim = fl.getDocumentDOM().getTimeline();
var sel = tim.getSelectedFrames();
//sel is a 1D array of integers, but in groups of 3 - layer index, first selected frame, next unselected frame (last sel. frame +1)

//For resetting after running the script
var now = tim.currentFrame;
var here = tim.currentLayer;
var these = tim.getSelectedFrames();
var that = fl.getDocumentDOM().library.getSelectedItems();

if (!sel.length) {			//No frames selected
	fl.outputPanel.clear();
	fl.trace("No frames selected in the timeline. Select timeline frames and a single library item");
	fl.trace("タイムラインで選択されているフレームを見つかりませんでした。一つ以上のフレームとライブラリーアイテムを1個だけをご選択ください。\n");
}

if (fl.getDocumentDOM().library.getSelectedItems().length != 1) {	//No library item selected
	fl.trace("Please select exactly one library item.");
	fl.trace("ちょうど一つライブラリーアイテムをご選択ください。\n");
	sel = []; //So the lower for loop doesn't iterate, script should then exit.
} else {
	var libi = fl.getDocumentDOM().library.getSelectedItems()[0];	//The selected library item.
}

//This is necessary because the frames have to be in focus, rather than the library item, or the script breaks.
fl.trace("Selected: " + fl.getDocumentDOM().selection + "\n");
//fl.getDocumentDOM().library.selectNone(); 
//tim.setSelectedFrames(these);

for (var i = 0; i < sel.length; i += 3) { //Remove folders from the selection array
	if (tim.layers[sel[i]].layerType == "folder") {
		fl.trace("Deselecting folder " + tim.layers[sel[i]].name);
		sel.splice(i,3);	//Remove 3 elements from the array starting at i, i.e. one full range.
	}
}

for (var i = 0; i < sel.length; i += 3) { //for every selected range
	var layer = sel[i];
	var start = sel[i+1];
	var end = sel[i+2];
	fl.trace("#" + layer + "	" + start + "-" + end + " " + tim.layers[layer].name);
	replaceRange(layer, start, end);
}

function replaceRange(layer, start, end) {
	//If the end is out of range (due to sloppy user selection) set it to the last frame of the layer.
	curlayer = tim.layers[layer];	//Derive layer object from layer index number
	
	if (end > curlayer.frames.length) {
		end = curlayer.frames.length;
	}

	for (var i = curlayer.frames[start].startFrame; i < end; i += curlayer.frames[i].duration) { 
	//For each keyframe in the range. Assumes zero or one element per frame, ignores others' data and destroys them.
		if (curlayer.frames[i].elements.length) {
			tim.currentFrame = i;
			var fr = curlayer.frames[i];
			var el = fr.elements[0];
			fl.trace("f" + i );
			
			//Collect position and animation data from old element
			var posani = {
				startFrame:			fr.startFrame,
				duration:			fr.duration,
				tweenType:			fr.tweenType,
				tweenEasing:		fr.tweenEasing,
				x:					el.x,
				y:					el.y,
				scaleX:				el.scaleX,
				scaleY:				el.scaleY,
				skewX:				el.skewX,
				skewY:				el.skewY
			};
			
			/*Diagnostics */
			for (var j in posani ) {
				fl.trace("	" + j + ":		" + posani[j]);
			} /**/
		
			//Delete the old element
			fr.tweenType = "none";
			el.selected = true;			
			fl.getDocumentDOM().deleteSelection();
			
			//Add the new element
			fl.getDocumentDOM().library.addItemToDocument({x: posani.x, y: posani.y});
			el = fr.elements[0];
			
			//Set the position and animation data of the new element/frame to that stored from the old one
			el.scaleX = posani.scaleX;
			el.scaleY = posani.scaleY;
			el.skewX = posani.skewX;
			el.skewY = posani.skewY;
			fr.tweenType = posani.tweenType;
			fr.tweenEasing = posani.tweenEasing;
			/**/
		}
		
	}
}

/*Reset UI after running script */
tim.setSelectedFrames(these);	//reset the frame selection
tim.currentFrame = now;		//reset the playhead
tim.currentLayer = here;	//reset the current layer
fl.getDocumentDOM().library.selectItem(that); //reset the library selection
/**/