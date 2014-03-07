/*
	AutoWobble v1.0
	Copyright Joseph Jacir, 5 March 2014
	
	Automatic bouncy animation. BOIOIOIOING!!
	
	Workflow:
		1) Animate a primary motion - an object moving from one position, rotation, and scale to another. Leave (or create) empty keyframes afterward for the bounce.
		
		2) Select the last keyframe of the motion, and the empty keyframes following it (arbitrary length)
		
		3) If using the GUI, adjust the parameters in the SWF panel. If not using the GUI (i.e. menu or keyboard shortcut), it will use parameters from the last time it was run.
		
		4) Execute script.
	
	TODO:	
		Needs to adapt to short selections. At present, the effect chokes on selections close to the interval size. Adaptively reduce interval size for short selections?
		
		Not sure about this, but maybe a better approach is to check the velocity of the character between the last n frames preceding the bounce (where n is the interval?) rather than checking the previous keyframe. The current approach does not adapt to the length of time that this change takes.
		
		Create global variables to copy from SWF Panel call, so it can be re-run from keyboard shortcut without panel arguments?
		
		Implement preset-related functions on panel
			
	Notes:
		After endless fumbling with a graphing calculator app, I got a nice looking graph with an adjustable factor for firmness from this equation:
			0.8733 * Math.atan(Math.pow(bouncecompletepercent, firmfactor) * -2.1855) + 1;
		Where firmfactor is between 0 and 7, with 1.75 being quite balanced on both sides.
*/

//General declarations
var tim = fl.getDocumentDOM().getTimeline();
var sel = tim.getSelectedFrames();	//0 - layer index. 1 - first frame of selection. 2 - first unselected frame after selection.
var lay = tim.layers[sel[0]];
var now = tim.currentFrame;		//For cleaning up at the end.


function EleMove() {	//Constructor
	//Keeps track of all moving properties of an element. All properties must also be properties of the Element object.
	//Generally should be used for the DIFFERENCE in values between two keyframes.
	this.x = 0;
	this.y = 0;
	this.skewX = 0;
	this.skewY = 0;
	this.scaleX = 0;
	this.scaleY = 0;
}

function firmConvert(f) {
	//Converts number 1 to 100 into firmness factor for bounce dampening equation
	//This is surely a naive way to do it, but I don't math good.
	if (f >= 0 && f <= 50)
		return (f * 1.75) / 50;
	else if (f > 50 && f <=100)
		return 2 * (f/50) * 1.75;
	else {
		alert("Firmness factor conversion error. f = " + f);
		return null;
	}
}

function getFirmBounceFactor(bouncenum, bouncetotal, firmness) {
	//Given the number of this bounce, the number of total bounces, and the object firmness percentage,
	//returns the proportion this bounce to velocity, i.e. bounce factor for a single bounce.
	var firmfactor = firmConvert(firmness);
	var completion = bouncenum / bouncetotal;	//Factor, 0-1, what percentage completion of the wobble this bounce represents
	fl.trace(" %: " + Math.round(completion*10000)/100 + "	f: " + firmfactor);
	var result = (0.8733 * Math.atan(Math.pow(completion, firmfactor) * -2.1855)) + 1;;
	return result;
}


function autoWobble (interval, maxbounce, firmness, easing, posfactor, skewfactor, scalefactor) {
	//Main function. Accepts parameters for bouncing from SWF Panel. Tests the environment for the timeline selection (and establishes safety of timeline selection)
	fl.outputPanel.clear();
	
	var safe = true;	//Set to false if preconditions for running aren't met; main code won't run.
	
	 /* Check argument integrity *
	 fl.trace("interval:		" + interval);
	 fl.trace("maxbounce:		" + maxbounce);
	 fl.trace("firmness:		" + firmness);
	 fl.trace("easing:			" + easing);
	 fl.trace("posfactor:		" + posfactor);
	 fl.trace("skewfactor:		" + skewfactor);
	 fl.trace("scalefactor:		" + scalefactor);
	 fl.trace("_______________");
	 /**/
	
	//Convert percentages to factors
	maxbounce /= 100;
	posfactor /= 100;
	skewfactor /= 100;
	scalefactor /= 100;
	
	//Safety checks
	if (sel.length != 3) {
		alert("Please select one keyframe range on the timeline. The first selected frame should be the end of the movement. The wobble will be filled in on the rest of the frames.\n\nタイムラインに選択範囲を1本選択してください。最初の選択されたフレームは動きの終わりにしてください。残りのフレームは揺れになります。");
		safe = false;
	} else {
		fl.trace("Wobble on L" + sel[0] + ": " + lay.name + ", f" + sel[1] + "-" + (sel[2] - 1) );
		if (sel[1] == 0) {
			alert("Can't start on the first frame. There must a motion leading up to the beginning of the selection.\n\nタイムラインの最初のフレームに始まらりません。揺れの前の動きが必要ですから。");
			safe = false;
		} else if (sel[2] - sel[1] < 3) { 
			alert("Please select at least 3 frames. The first selected frame should be the end of the movement. The wobble will be filled in on the rest of the frames.\n\n3フレーム以上を選択してください。最初の選択されたフレームは動きの終わりにしてください。残りのフレームは揺れになります。");
			safe = false;	/**/
		/**else if (sel[2] - sel[1] < 12) {	//For debug purposes, use this instead of above code in this block.
			alert("Debug requirement: please select at least 12 frames.");
			safe = false;	/**/
		} else if (lay.frames[sel[1]].startFrame != sel[1]) {
			//fl.trace("sel[1]: " + sel[1] + "	k: " + lay.frames[sel[1]].startFrame);
			alert("First frame must be a keyframe. The rest must not be keyframes.\n必ず最初の選択されたフレームをキーフレームにしてください。残るフレームは、すべて不キーフレームにしてください。"); 
			safe = false;
		}　else {
			var prevel = lay.frames[lay.frames[sel[1]-1].startFrame].elements[0];
			//The element in the keyframe before the selection. Used in main code!
			if (typeof prevel == "undefined") {
				alert("Selection must follow another keyframe. This tool is intended to finish an existing movement with a wobble.\n\n選択されたフレーム範囲はほかのキーフレームの後に現れなければなりません。このツールの目標は、現在の動きを揺れに閉まるつもりです。");
				safe = false;
			}　else {
				for (var i = sel[1]+1; i < sel[2]; i++) {//Make sure there are no keyframes after the first.
					if (lay.frames[i].startFrame != sel[1]) {	//If the start frame (keyframe) of each frame is not the first frame of the selection
						//fl.trace("i: " + i);
						//fl.trace("i.sF: " + lay.frames[i].startFrame + " sel[1]: " + sel[1]);
						alert("Only the first frame should be a keyframe. The rest must not be keyframes.\n最初の選択されたフレームだけをキーフレームにしてください。残るフレームは、すべて不キーフレームにしてください。"); 
						safe = false;
						break;
					}
				}
			}
		}
	}

	//Main code for when safety is established.

	if (safe) {		
		var inputvect = new EleMove();	//Holds the velocity (as change) of the original motion we are wobbling
		var el = lay.frames[sel[1]].elements[0];
		var woblength = sel[2] - sel[1];	//Length in frames of wobbling animation
		var keycount = Math.floor(woblength / interval) - 1;
		
		fl.trace("	Duration: " + woblength);
		fl.trace("	Bounces: " + keycount);
		fl.trace("_______________");
		
		//Store initial velocity as change between our first key and its previous key
		//TODO - do this in a way that accounts for velocity at the end of the previous motion, rather than just the difference between motion end and motion beginning.
		fl.trace("Initial motion delta:");
		for (var k in inputvect) {
			inputvect[k] = (el[k] - prevel[k]);
			fl.trace("	" + k + ": " + inputvect[k]);
		}
		fl.trace("");
		
		/**/
		//The first frame is the target, so copy that to the end. Tween the range.
		tim.insertKeyframe(sel[2] - 1);
		lay.frames[sel[1]].tweenType = "none";
		tim.createMotionTween(sel[1]);
		lay.frames[sel[1]].tweenEasing = easing;
		/**/
		
		//Set all keys with alternating tween easing but no other property changes, initially.
		var biasflip = -1;
		for (var i = 1; i <= keycount; i++) {
			tim.insertKeyframe(sel[1] + (i*interval));
			lay.frames[sel[1] + (i*interval)].tweenEasing = easing * biasflip;
			biasflip *= -1;
		}
		
		/**/
		//Transform the element of each new key according to the bounce algorithm
		var direction = 1;	//So the keyframes alternate between going with and against the input vector
		for (var i = 0; i < keycount; i++) {
			var cel = lay.frames[sel[1] + (interval * i)].elements[0];	//current bounce keyframe's element
			var bounce = getFirmBounceFactor(i, keycount, firmness) * maxbounce;	//reduce bounce each iteration, always a fraction of the max bounce
			fl.trace("Bounce #" + i + " amt: " + Math.round(bounce*100000) / 1000 + "%");

			cel.x = cel.x + (inputvect.x * bounce * posfactor * direction);
			cel.y = cel.y + (inputvect.y * bounce * posfactor * direction);
			cel.skewX = cel.skewX + (inputvect.skewX * bounce * skewfactor * direction);
			cel.skewY = cel.skewY + (inputvect.skewY * bounce * skewfactor * direction);
			cel.scaleX = cel.scaleX + (inputvect.scaleX * bounce * scalefactor * direction);
			cel.scaleY = cel.scaleY + (inputvect.scaleY * bounce * scalefactor * direction);

			direction *= -1;	//Change direction of movement for next bounce
			fl.trace("");
		}
		/**/
	} else {
		fl.trace("Couldn't wobble. Alas :(");
	}
	
	/* Reset UI after running */
	tim.setSelectedFrames(sel);
	//tim.currentFrame = now; //Actually, it's more useful to go to the beginning of the lead-up motion so you can watch the result.
	tim.currentFrame = prevel.startFrame;
	/**/
}

function quickUndoWobble() {
//When run from the panel, using the normal undo function undoes each step, one by one, rather than the whole command.
//This is annoying, so allow the user to simply undo the whole thing from a button.
//Despite safety checks, can conceivably be misued on a range of frames other than one created by autoWobble(). Unavoidable risk, user will have to be careful.

	//Safety checks - similar to, but slightly different from autoWobble()'s, so not encapsulating.
	var safe = true
	var unsafemsg = "The wobbled range (exactly) must be selected. You can still use normal undo, but it will undo each step one at a time.\n\nちょうどWobbleされた範囲が選択されていない場合は、「Revert」を実行できません。普通の取り消しは使えますが、段階を追って取り消します。";
	if (sel.length != 3) {	//More than one range selected
			alert(unsafemsg);
			safe = false;
	} else {
		if (sel[1] == 0) {	//First frame in timeline selected
			alert(unsafemsg);
			fl.trace("First frame in timeline selected");
			safe = false;
		} else if (sel[2] - sel[1] < 3) {	//Fewer than three frames selected
			alert(unsafemsg);
			fl.trace("Fewer than three frames selected");
			safe = false;
		} else if (lay.frames[sel[1]].startFrame != sel[1]) {	//First frame is not a keyframe
			alert(unsafemsg);
			fl.trace("First frame is not a keyframe");
			safe = false;
		}　else if (lay.frames[sel[2]-1].startFrame != sel[2]-1) {	//Last frame is not a keyframe
			alert(unsafemsg);
			fl.trace("Last frame is not a keyframe");
			safe = false;
		}
	}
	
	if (safe) {
		//Clear all but last keyframe
		tim.clearKeyframes(sel[1],sel[2]-2);
		
		//Copy last keyframe to the beginning and remove any tween
		tim.copyFrames(sel[2]-1);
		tim.pasteFrames(sel[1]);
		lay.frames[sel[1]].tweenType = "none";
		
		//Clear last keyframe
		tim.clearKeyframes(sel[2]-1);
	}
	
	
	
	/* Reset UI after running */
	tim.setSelectedFrames(sel);
	tim.currentFrame = now;
	/**/
}