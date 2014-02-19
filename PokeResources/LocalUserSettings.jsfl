/*
Local settings for JJFileUtils.jsfl
JJFileUtils.jsflのローカル設定
*/

var winSCPloc = '"C:\\Program Files (x86)\\WinSCP\\WinSCP.com\"';
	//Local Windows path to WinSCP's command-line version.
	//WinSCPのコマンド行版のローカルWindows保存先。

var winSCPprofile = "mingtest";
	//Name of the profile used to upload to the server. Must be set in WinSCP.
	//アップロード関数用のプロファイル名。WinSCPに設定することが必要です。

/////////////////////////////UPDATE　THIS WHEN INSTALLING!
/////////////////////////////インストールしたら、これを更新種てください！
var ftpuserdir = "UnsetUser";
	//Personal user directory on the FTP server. Must be set for each user.　E.g. "gemini" for Joe, "phobos" for Yaguchi-san, etc.
	//ユーザのFTPサーバー上のフォルダー。たとえばジョーだと、"gemini"や、矢口さんだと、"phobos"にしてください。