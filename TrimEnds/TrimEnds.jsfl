/*
	TrimEnds
	In order to lighten the playback rendering load, deletes the empty frames on any layers after the last blank keyframe in each.
	レンダーを軽量にするために、各レイヤーの最後の空白フレームを削除します。
	
	v1.2
	Copyright 26 July 2013 Joseph Jacir
	Dev time: 2hr
	
*/
fl.outputPanel.clear();

var tim = fl.getDocumentDOM().getTimeline();

//For resetting after running the script
var now = tim.currentFrame;
var here = tim.currentLayer;
var these = tim.getSelectedFrames();

var longestlayer = -1;	//INDEX of the longest layer, not the layer object itself
var lastframe = -1;
var endings = new Array();	//Stores the last frame of each layer

for (var y in tim.layers) {	//Find the longest layer and its last frame, store all layer's last frame indices
	//fl.trace("L: " + y + "	" + tim.layers[y].name);
	endings[y] = tim.layers[y].frameCount;
	if (tim.layers[y].frameCount > lastframe) {
		longestlayer = y;
		lastframe = tim.layers[y].frameCount;
	}
	tim.currentFrame = tim.layers[y].frameCount;
	//fl.trace("		last: " + tim.currentFrame);
}

/* ///Diagnostics
fl.trace("here:	" + here);
fl.trace("curr:	" + tim.currentLayer);
fl.trace("last:	" + lastframe);
fl.trace("long:	" + longestlayer);
/**/

//Add one frame to the end of the timeline and makes all layers end there. This is necessary because the playhead cannot advance beyond the last frame and we need that room to manoeuvre. 
tim.insertFrames(1, true, lastframe);

for (var y = 0; y < tim.layers.length; y++) {		//Chop empty frames off the end of each layer.
	tim.currentLayer = y;
	tim.currentFrame = lastframe;
	fl.trace("L: " + y + "	" + tim.layers[tim.currentLayer].name);
	
	switch (tim.layers[y].layerType) {
		case "normal":
		case "masked":
		case "mask":
		case "guide":
			break;
		default:
			fl.trace("	Folder or other non-normal layer; skipping");
			continue;
	}
	
	if (tim.layers[y].frames[lastframe-1].startFrame != lastframe && tim.layers[y].frames[lastframe-1].elements.length == 0)	{
	//If the last frame is not a keyframe AND it is empty, then it can be removed...
		fl.trace("	Trimming after frame " + (tim.layers[y].frames[lastframe-1].startFrame+1));
		//so find the previous keyframe and remove all frames after it.	
		tim.removeFrames(tim.layers[y].frames[lastframe-1].startFrame+1, lastframe+1)
	}
	
	tim.removeFrames(endings[y], lastframe+1);	//For the ones that are not empty but terminate before the last frame
}

tim.setSelectedFrames(these);
tim.currentFrame = now;		//reset the playhead
tim.currentLayer = here;	//reset the current layer