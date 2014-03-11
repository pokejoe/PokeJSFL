/*
	AutoWobble
	Copyright Joseph Jacir, 11 March 2014
	
	This command should call Config/PokeResources/AutoWobbleLib.jsfl. It is intended to be used by the keyboard shortcut, employing the saved arguments set by the the GUI version after it has been run once.
*/
fl.outputPanel.clear();

var wobparams = FLfile.read(fl.configURI + "PokeResources/WobbleLastUsed.csv");

var wobcmd = 'fl.runScript(fl.configURI + "PokeResources/AutoWobbleLib.jsfl", "autoWobble", ' + wobparams + ');';

eval(wobcmd);