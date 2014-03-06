/*
	AutoWobble v0.3
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
		
		GUI and params in place to adjust proportions for pos/rot/scale, but not yet implemented.
		
		Add calls to hook in from SWF Panel.
		
		Create global variables to copy from SWF Panel call, so it can be re-run from keyboard shortcut without panel arguments?
		
	Along with the GUI, some way of saving (or at least loading?) presets for the above settings? Preset for speak bubbles, preset for breasts, preset for logos hitting the screen, etc.
			
	Notes:
		After endless fumbling with a graphing calculator app, I got a nice looking graph with an adjustable factor for firmness from this equation:
			0.8733 * Math.atan(-1 * bouncenum ^ firmfactor * 2.1855) + 1;
		Where firmfactor is between 0 and 7, with 1.75 being quite balanced on both sides.
*/

fl.outputPanel.clear();

var tim = fl.getDocumentDOM().getTimeline();
var sel = tim.getSelectedFrames();	//0 - layer index. 1 - first frame of selection. 2 - first unselected frame after selection.
var lay = tim.layers[sel[0]];
var now = tim.currentFrame;


function EleMove() {	//Constructor
	//Keeps track of all moving properties of an element.
	//Generally should be used for the DIFFERENCE in values between two frames.
	this.x = 0;
	this.y = 0;
	this.skewX = 0;
	this.skewY = 0;
	this.scaleX = 0;
	this.scaleY = 0;
}

function firmConvert(f) {
	//Converts number 1 to 100 into the firmness factor for bounce dampening equation
	//This is surely a naive way to do it, but I don't math good. See notes at top.
	if (f >= 0 && f >= 50)
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
	var f = firmConvert(firmness);
	var completion = bouncenum / bouncetotal;	//Factor, 0-1, what percentage completion of the wobble this bounce represents
	return 0.8733 * Math.atan((completion ^ firmfactor) * -2.1855) + 1;
}


function autoWobble (interval, firmness, easing, posfactor, skewfactor, scalefactor) {
	//Main function. Accepts parameters for bouncing from SWF Panel. Tests the environment for the timeline selection (and establishes safety of timeline selection)
	var safe = true;	//Set to false if preconditions for running aren't met; main code won't run.

	//Convert percentages
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
			alert("Can't start on the first frame. There must be a motion leading up to the beginning of the selection.\n\nタイムラインの最初のフレームに始まらりません。揺れの前の動きが必要ですから。");
			safe = false;
		} else if (sel[2] - sel[1] < 3) { //UNCOMMENT FOR PRODUCTION RELEASE!!!
			alert("Please select at least 3 frames. The first selected frame should be the end of the movement. The wobble will be filled in on the rest of the frames.\n\n3フレーム以上を選択してください。最初の選択されたフレームは動きの終わりにしてください。残りのフレームは揺れになります。");
			safe = false;
			/**else if (sel[2] - sel[1] < 12) {
			alert("Debug requirement: please select at least 12 frames.");
			safe = false;	///**/
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
		var interval = 3;	//The number of frames between one extreme and the next. (Make this more sophisticated, but for now, one int.)
		var maxbounce = 0.2;	//Multiplier for motion vector that will become the maximum secondary motion.
		var bias = -67;		//I.e. ease for tweens
		var inputvect = new EleMove();	//Holds the velocity (as change) of the original motion we are wobbling
		var el = lay.frames[sel[1]].elements[0];
		var woblength = sel[2] - sel[1];	//Length in frames of wobbling animation
		var keycount = Math.floor(woblength / interval) - 1;
		var dampening = 1 / keycount;	//Amount to reduce bounce by each time;
		var direction = -1;	//So the keyframes alternate between going with and against the input vector
		
		fl.trace("	Duration: " + woblength);
		fl.trace("	Interval: " + interval);
		fl.trace("	Bounces: " + keycount);
		fl.trace("_______________");
		
		//Store initial velocity as change between our first key and its previous key
		fl.trace("Initial motion delta:");
		for (var k in inputvect) {
			inputvect[k] = (prevel[k] - el[k]) * maxbounce;
			fl.trace("	" + k + ": " + inputvect[k]);
		}
		fl.trace("");
		
		/**/
		//The first frame is the target, so copy that to the end. Tween the range.
		tim.insertKeyframe(sel[2] - 1);
		lay.frames[sel[1]].tweenType = "none";
		tim.createMotionTween(sel[1]);
		lay.frames[sel[1]].tweenEasing = bias;
		/**/
		
		//Set all keys with alternating tweens but no other property changes, initially.
		var biasflip = -1;
		for (var i = 1; i <= keycount; i++) {
			tim.insertKeyframe(sel[1] + (i*interval));
			lay.frames[sel[1] + (i*interval)].tweenEasing = bias * biasflip;
			biasflip *= -1;
		}
		
		for (var i = 0; i < keycount; i++) {
			var nel = lay.frames[sel[1] + (interval * i)].elements[0];	//next bounce keyframe's element
			var bounce = maxbounce - (i * dampening * maxbounce);	//reduce bounce each iteration
			fl.trace("Bounce #" + i + " amt: " + bounce);
			for (var k in inputvect) {
				nel[k] = nel[k] + (inputvect[k] * bounce * direction);
				fl.trace("	" + k + ": " + nel[k]);
			}
			direction *= -1;	//Change direction of movement for next bounce
			fl.trace("");
		}
		
	} else {
		fl.trace("Couldn't wobble. Alas :(");
	}

	/* Reset UI after running */
	tim.setSelectedFrames(sel);
	tim.currentFrame = now;
	/**/

}



//////////TEMPORARY ENTRY POINT - get rid of this when this script is called by the GUI.
autoWobble(3, 50, -35, 25, 5, 100);
