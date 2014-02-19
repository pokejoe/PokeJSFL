/*
	Pixalign
	Makes sure the position values of the objects in the selected frames are integers (hence lined up with pixels). If nothing is selected, gives the user the option to operate on the entire scene.
	
	v3.2
	Copyright 11 July 2013 Joseph Jacir
	
	TODO:
		Adapt this process for Unskew
*/

fl.outputPanel.clear();

var tim = fl.getDocumentDOM().getTimeline();
var sel = tim.getSelectedFrames();
//sel is a 1D array of integers, but in groups of 3 - layer index, first selected frame, next unselected frame (last sel. frame +1)

var fixcount = 0;		//Just for final infodump
var keycount = 0;

if (!sel.length) {		//If nothing is selected, prompt to select the whole timeline.
	if(confirm("No frame selection. Operate on entire timeline?\n選択されたフレームを見つかりませんでした。全タイムラインで実行しますか？")){
		var currentlayer = 0;
		for (var i = 0; i < tim.layers.length * 3; i += 3) {
			sel[i]   = currentlayer;
			sel[i+1] = 0;	//Start from 0 on every layer
			sel[i+2] = tim.layers[currentlayer].frames.length;	//Select whole layer
			//fl.trace("Selecting Layer " + sel[i] + "\n	" + tim.layers[currentlayer].name + "\n	length: " + sel[i+2]);
			currentlayer++;
		}
	} else {
		fl.trace("Exiting. Please select timeline frames to align.\n終了中。整列の希望のフレームをタイムラインにご選択ください。");
	}
}

for (var i = 0; i < sel.length; i += 3) {	//Send every individual range to the align function
	var layer = sel[i];
	var start = sel[i+1];
	var end = sel[i+2];
	fl.trace("#" + layer + "	" + start + "-" + end + " " + tim.layers[layer].name);
	alignRange(layer, start, end);
}

fl.trace("\nInspected	Fixed\n確認		修正\n" + keycount + "			" + fixcount);

function alignRange(layer, start, end) {
	//If the end is out of range (due to sloppy user selection) set it to the last frame of the layer.
	if (end > tim.layers[layer].frames.length) {
		end = tim.layers[layer].frames.length;
	}
	
	if (tim.layers[layer].layerType != "folder") {		
		for (var i = tim.layers[layer].frames[start].startFrame; i < end; i+=tim.layers[layer].frames[i].duration) { 
		//for each keyframe in the given range
			if (tim.layers[layer].frames[i] && tim.layers[layer].frames[i].startFrame == i) {	
			//check for existance as well as keyframeyness
				fl.trace("	key: " + i + "		elements: " + tim.layers[layer].frames[i].elements.length);
				for (var j in tim.layers[layer].frames[i].elements) {
					alignElement(tim.layers[layer].frames[i].elements[j]);
				}
			}
		}
	} else {
		fl.trace("	Skipping folder");
	}
}

function alignElement(el) {
	keycount++;
	if (el.x == Math.round(el.x) && el.y == Math.round(el.y)) {
		fl.trace("			OK");
	} else {
		fl.trace("		x:" + el.x + "		y:" + el.y);
		el.x = Math.round(el.x);
		el.y = Math.round(el.y); 
		fixcount++;
	}
}