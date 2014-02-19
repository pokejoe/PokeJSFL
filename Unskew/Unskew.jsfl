/*
	NOT YET READY FOR PRODUCTION USE

	Unskew
	Converts all skew keyframes to rotation keyframes
	Copyright Joseph Jacir 30 May 2013
	v0.2
*/


var tim = flash.getDocumentDOM().getTimeline();
var skX = 0;	//skew X and Y temp variables
var skY = 0;
var e;	//current element temp variable;
var f = 0; //var for frame number +1, because that's how it's displayed in flash
var avg = 0; //temp for average of skew x and y.
var found = false;	//flag that indicates skews have been found.
var layerfound = false; //flag that indicates skews have been found per layer.

for (j=0; j < tim.layerCount; j++) { //for each layer
	fl.trace("Scanning " + tim.layers[j].name);
	if (tim.layers[j].layerType == "normal") {	//if it isn't a folder layer or other weird type (guide, guided, mask, masked, folder)
		for (i=0;i<tim.layers[j].frameCount;i++) {	//for each frame
			f = i + 1;
			//fl.trace(f);
			if (tim.layers[j].frames[i].elements.length > 0) { //if the frame is not empty
				e = tim.layers[j].frames[i].elements[0]; //assuming one element per frame per layer, e is the current element
				skX = e.skewX;
				skY = e.skewY;
				if(skX != skY && tim.layers[j].frames[i].startFrame == i) {	
				//If they are equal, it's a rotate key. If not, the object is skewed.
				//Also, if it is a keyframe.
					found = true;
					layerfound = true;
					
					//Notify of change
					fl.trace(" f:" + f + "\t| " + " "+ Math.round(skX*100)/100 + ", " + Math.round(skY*100)/100);
					
					//Average the X and Y skews. This tends to approximate rotation if skew is not extreme.
					avg = (skX + skY) / 2;
					e.skewX = avg;
					e.skewY = avg;
					e.rotation = avg;
					avg = 0; //reset
				}
			}
		}
		
		if (!layerfound) {
			fl.trace(" Layer is clean.");
		}
		
		layerfound = false;	//resetting for next layer to be scanned
	}
	else {
		fl.trace(" Skipping folder/non-normal layer");
	}
}

fl.trace("Unskew complete.");

if (!found) {
	fl.trace(" No skew keyframes found. Good work!");
}