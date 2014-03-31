/*
	Replace Element
	Replaces element 0 on the selected frames with the selected library item.
	選択されたフレームの0番エレメントを選択されたライブラリーアイテムで変換します。
	
	v1.2
	Copyright 5 November 2013 Joseph Jacir
*/

fl.outputPanel.clear();
var dom = fl.getDocumentDOM();
var tim = dom.getTimeline();
var lib = dom.library;
var sel = tim.getSelectedFrames();
//sel is a 1D array of integers, but in groups of 3 - layer index, first selected frame, next unselected frame (last sel. frame +1)

//For resetting the UI after running the script
var now = tim.currentFrame;
var here = tim.currentLayer;
var these = tim.getSelectedFrames();
var that = lib.getSelectedItems();

if (!sel.length) {			//No frames selected
	fl.outputPanel.clear();
	fl.trace("No frames selected in the timeline. Select timeline frames and a single library item");
	fl.trace("タイムラインから選択されているフレームを見つかりませんでした。一つ以上のフレームとライブラリーアイテムを1個だけを選択してください。\n");
}

if (lib.getSelectedItems().length != 1) {	//No or multiple library items selected
	fl.trace("Please select exactly one library item.");
	fl.trace("ちょうど一つライブラリーアイテムを選択してください。\n");
	sel = []; //So the lower for loop doesn't iterate; script should then exit.
} else {
	var libi = lib.getSelectedItems()[0];	//The selected library item.
	document.selectNone();
	lib.selectNone();
}

//This may be necessary because the frames have to be in focus, rather than the library item, or the script breaks.
//fl.trace("Selected: " + fl.getDocumentDOM().selection + "\n");
//lib.selectNone(); 
//tim.setSelectedFrames(these);

for (var i = 0; i < sel.length; i += 3) { //Remove folders and locked layers from the selection array
	//fl.trace("i = " + i);
	if (tim.layers[sel[i]].layerType == "folder") {
		fl.trace("x  Folder " + tim.layers[sel[i]].name);
		sel.splice(i,3);	//Drop 3 elements from the array starting at i, i.e. one full range.
		i -= 3;
	} else {
		if (tim.layers[sel[i]].locked) {
			fl.trace("x Locked " + tim.layers[sel[i]].name);
			sel.splice(i,3);	//Drop 3 elements from the array starting at i, i.e. one full range.
			i -= 3;
		}
	}
}

for (var i = 0; i < sel.length; i += 3) { //for every selected range
	var layer = sel[i];
	var start = sel[i+1];
	var end = sel[i+2];
	fl.trace("L" + layer + "	" + start + "-" + end + " " + tim.layers[layer].name);
	replaceRange(layer, start, end);
}

function replaceRange(layer, start, end) {
	//If the end is out of range (due to sloppy user selection) set it to the last frame of the layer.
	curlayer = tim.layers[layer];	//Derive layer object from layer index number
	
	//Copy name to layer
	var namecopy = libi.name.split("/");
	namecopy = namecopy[namecopy.length-1];
	curlayer.name = namecopy;
	
	if (end > curlayer.frames.length) {
		end = curlayer.frames.length;
	}

	if (curlayer.frames[start]) {
	//Make sure that there is frame data on this part of the selection
		for (var i = curlayer.frames[start].startFrame; i < end; i += curlayer.frames[i].duration) { 
		//For each keyframe in the range. Assumes zero or one element per frame, ignores others' data and destroys them.
			if (curlayer.frames[i].elements.length) {
				tim.currentFrame = i;
				var fr = curlayer.frames[i];
				var el = fr.elements[0];
				fl.trace("	f" + i );
				
				dom.selectNone();
				dom.selection = [el];
				dom.swapElement(libi.name)
			}
			
		}
	}
}

/*Reset UI after running script */
tim.setSelectedFrames(these);	//reset the frame selection
tim.currentFrame = now;		//reset the playhead
tim.currentLayer = here;	//reset the current layer
lib.selectItem(that); //reset the library selection
/**/