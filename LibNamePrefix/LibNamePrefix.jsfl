/*
	LibNamePrefix v1
	Prompts the user for a string, which is prepended onto the names of all selected library items.
	ユーザーに文字列をプロンプトして、選択されたライブラリアイテム名の頭に文字列を入れる。
	Copyright Joseph Jacir 24 February 2014
	Dev. time ~25min
*/

fl.outputPanel.clear();
var sel = document.library.getSelectedItems();

if (!sel.length) {
	fl.trace("Please select library items to prefix before running.\n実行する前に、対応したいライブラリアイテムを選択してください。");
} else {
	var prefix = prompt("Enter prefix　接頭入力");
	if (prefix == null || prefix == "") {
		fl.trace("No string input. Exiting.\n文字列は入力されていません。停止。");
	} else {
		for (var i in sel) {
			if (sel[i].itemType != "folder" && sel[i].itemType != "undefined") {
				var repl = sel[i].name.split("/");
				repl = prefix + repl[repl.length-1];
				sel[i].name = repl;
				//At first I tried to handle the directory structures by naming the items with a slash, but Flash handles this automatically and replaces the slashes with dashes. So just adjust the names while disregarding the folder structure and Flash will keep track of their parent folders.
			}
		}
	}
}



