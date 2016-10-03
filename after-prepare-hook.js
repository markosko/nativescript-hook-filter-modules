var path = require("path");
var shelljs = require("shelljs");
var fs = require('fs');
var findRemoveSync = require('find-remove')
module.exports = function (logger, platformsData, projectData, hookArgs) {

	var deletedFileCounter=0;
	
    var projectDir = projectData.projectDir;
    var platform = hookArgs.platform.toLowerCase();
    process.env.PLATFORM = platform;

    var platformData = platformsData.getPlatformData(platform);
    var platformOutDir = platformData.appDestinationDirectoryPath;
    var platformAppDir = path.join(platformOutDir, "app");
	platformAppDir = path.join(platformAppDir, "tns_modules");
    process.env.PLATFORM_DIR = platformOutDir;

	var SubDirs_to_be_kept=[];
	var SubDirs_to_be_deleted=[];

	var Dirs_to_be_kept=[
		"application",
		"application-settings",
		"camera",
		"color",
		"connectivity",
		"console",
		"css",
		"css-value",
		"data",
		"debugger",
		"fetch",
		"file-system",
		"fps-meter",
		"globals",
		"http",
		"image-source",
		"ios",
		"js-libs",
		"location",
		"platform",
		"text",
		"timer",
		"trace",
		"ui",
		"utils",
		"xhr",
		"xml",
		"tns-core-modules-widgets",
		"@angular",
		"nativescript-angular",
		"nativescript-intl",
		"reflect-metadata",
		"zone.js",
		"rxjs",
		"parse5"
	];
	var Dirs_to_be_deleted=[
		"nativescript-hook-filter-modules"
	];


        
		try{
			var dirs=getDirectories(platformAppDir);
			var JSONFilterFiles=readPackageJson(projectDir);
			Dirs_to_be_kept=Dirs_to_be_kept.concat(JSONFilterFiles.to_be_kept);
			Dirs_to_be_deleted=Dirs_to_be_deleted.concat(JSONFilterFiles.to_be_deleted);


			Dirs_to_be_deleted.forEach(function(item){
				if(item.indexOf("/")>-1){
					SubDirs_to_be_deleted.push(item);
				}
			});

			dirs.forEach(function(item,index){
				if(item=="trace")return;
				var delFolder = Dirs_to_be_kept.indexOf(item)==-1;
				if(item.indexOf("nativescript-")>-1 && item.indexOf(Dirs_to_be_deleted)==-1){
						delFolder=false;
				}
				if(Dirs_to_be_deleted.indexOf(item)>-1){
					delFolder=true;
				}
				if(delFolder){
					var delPath=path.join(platformAppDir, item);
					var result = findRemoveSync(delPath, {dir: "*", files: "*.*"});
					console.log(result);	
					fs.rmdirSync(path.join(platformAppDir, item));				
				}
			});

			SubDirs_to_be_deleted.forEach(function(item){
				if(item=="trace")return;
				var delPath=path.join(platformAppDir, item);
				var result = findRemoveSync(delPath, {dir: "*", files: "*.*"});
				console.log(result);
				fs.rmdirSync(path.join(platformAppDir, item));
			});
			
			result = findRemoveSync(path.join(platformOutDir, "app"), {extensions: ['.ts','.md','.MD','.map']});
			
			if(result!={})console.log(result);
			result = findRemoveSync(path.join(platformOutDir, "app"), {files: ['LICENSE','.gitignore','.npmignore']});
			if(result!={})console.log(result);
			
		}catch(e){
			console.log(e);
			console.log('Shrinking failed.');

		}

};



function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function readPackageJson(dir) {
    var packageJson = path.join(dir, "filter-modules.json");
    if (shelljs.test("-f", packageJson)) {
        return JSON.parse(shelljs.cat(packageJson));
    } else {
        return {};
    }
};