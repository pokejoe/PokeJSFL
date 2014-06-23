/*
	SequenceFrameNames
	Strips trailing numbers from the names of selected frames and re-sequences them.
	
	v1.0
	Copyright 23 June 2014 Joseph Jacir
*/

fl.outputPanel.clear();
var dom = fl.getDocumentDOM();
var tim = dom.getTimeline();
var sel = tim.getSelectedFrames();
//sel is a 1D array of integers, but in groups of 3: layer index, first selected frame, next unselected frame (last sel. frame +1)

//For resetting the UI after running the script
var now = tim.currentFrame;
var here = tim.currentLayer;
var these = tim.getSelectedFrames();

if (!sel.length) {			//No frames selected
	fl.outputPanel.clear();
	fl.trace("No frames selected in the timeline. Select ranges to re-number.");
	fl.trace("タイムラインから選択されているフレームを見つかりませんでした。番号を付け直したいフレーム範囲を選択してください。\n");
}

for (var i = 0; i < sel.length; i += 3) { //Remove folders from the selection array
	//fl.trace("i = " + i);
	if (tim.layers[sel[i]].layerType == "folder") {
		fl.trace("x  Folder " + tim.layers[sel[i]].name);
		sel.splice(i,3);	//Drop 3 elements from the array starting at i, i.e. one full range.
		i -= 3;
	}
}

for (var i = 0; i < sel.length; i += 3) { //for every selected range
	var layer = sel[i];
	var start = sel[i+1];
	var end = sel[i+2];
	fl.trace("L" + layer + "	" + start + "-" + end + " " + tim.layers[layer].name);
	renumberRange(layer, start, end);
}

function renumberRange(layer, start, end) {
	curlayer = tim.layers[layer];	//Derive layer object from layer index number
	
	//If the end is out of range (due to sloppy user selection) set it to the last frame of the layer.
	if (end > curlayer.frames.length) {
		end = curlayer.frames.length;
	}
	
	var firsttime = true;	//Only true for the first loop iteration that finds a valid name.
	var serial = 0;

	for (var i = curlayer.frames[start].startFrame; i < end; i += curlayer.frames[i].duration) { //For each keyframe
	
		oldname = curlayer.frames[i].name;
		if (!oldname) {	//Unnamed keyframe
			fl.trace("\tunlabeled");
			continue;
		}
		
		if (firsttime) {	//If base name hasn't been determined yet,
			//Get basename and serial.
			basename = oldname.replace(/\d+$/, ""); //Strip numbers to get basename
			fl.trace("(basename): " + basename);
			//Strip basename to get the starting serial number, 0 if not found.
			serial = oldname.replace(basename, "");
			fl.trace("(first#): " + serial);
			if (serial == "" || isNaN(serial)) {	
				serial = 0;
			}			
		} else {			//If base name has been determined,
			if (oldname.replace(/\d+$/, "") != basename) { //If this frame is not part of the seqquence
				continue;
			}
			
		}
		
		//If we get here, we should be able to assume that the current frame part of the sequence we're renumbering. Rename it, iterate the serial, and make sure that we don't do preliminaries again.
		newname = ("" + basename) + Math.floor(serial).toString();
		fl.trace("\tf" + i + "\t" + oldname + "→" + newname);
		curlayer.frames[i].name = newname;
		serial++;
		firsttime = false;
	}
	
}

/*Reset UI after running script */
tim.setSelectedFrames(these);	//reset the frame selection
tim.currentFrame = now;		//reset the playhead
tim.currentLayer = here;	//reset the current layer
/**/