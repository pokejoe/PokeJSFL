/*
	WobblePresetSaveLoad
	This is an auxilary utility for AutoWobble. It is called by the AutoWobble SWF Panel and allows the user to save and load presets for the parameters sent to the AutoWobble command.
	Copyright Joseph Jacir, 7 March 2014
*/

fl.outputPanel.clear();
var prepath = fl.configURI + "PokeResources/WobblePresets.csv";

function wobblePresetPopulate() {
	var all = FLfile.read(prepath);
	return all;
}

function wobblePresetSave(pA) {
	//pA is a string, a single line of text as CSV with preset values to save. Label must be the first value.
	var label = pA.split(",")[0];
	if (confirm("Save new preset: " + label + "?")) {
		FLfile.write(prepath, "\n" + pA + ";", "append");
	} else {
		fl.trace("Did not save preset.");
	}
}

function wobblePresetDelete(index) {
	//Provided the 0-indexed line number of the preset to delete,
	//Removes that preset from the presets file.
	if (confirm("Delete preset?")) {
		var all = FLfile.read(prepath);
		all = all.replace(/\s+/g,"").split(";");
		all.splice(index,1);
		all = all.join(";\n").replace();
		FLfile.write(prepath, all);
	} else {
		fl.trace("Did not delete preset.");
	}
}