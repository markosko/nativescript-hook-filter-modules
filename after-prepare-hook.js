var path = require("path");
var shelljs = require("shelljs");
var fs = require('fs');
var rmdir = require('rmdir');
module.exports = function (logger, platformsData, projectData, hookArgs) {

	
    var projectDir = projectData.projectDir;
    var platform = hookArgs.platform.toLowerCase();
    process.env.PLATFORM = platform;

    var platformData = platformsData.getPlatformData(platform);
    var platformOutDir = platformData.appDestinationDirectoryPath;
    var platformAppDir = path.join(platformOutDir, "app");
	platformAppDir = path.join(platformAppDir, "tns_modules");
    process.env.PLATFORM_DIR = platformOutDir;

	var DirExclude=[
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
		"tns-core-modules-widgets"
	];
	var DirInclude=[
		"nativescript-hook-filter-modules"
	];


        
		try{
			console.log(platformAppDir,projectDir);
			var dirs=getDirectories(platformAppDir);
			var JSONFilterFiles=readPackageJson(projectDir);

			DirExclude.concat(JSONFilterFiles.exclude);
			DirInclude.concat(JSONFilterFiles.include);
			dirs.forEach(function(item,index){
				var delFolder = DirExclude.indexOf(item)==-1;
				if(item.indexOf("nativescript-")>-1 && item.indexOf(DirInclude)==-1){
						delFolder=false;
				}
				if(delFolder){
					var delPath=path.join(platformAppDir, item);
					rmdir(delPath,function(err, dirs, files) {
						  //console.log(err);
						  //console.log(dirs);
						  //console.log(files);
						  console.log('all files are removed');
					});
				}
			});

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
    var packageJson = path.join(dir, "nativescript-filter-modules.json");
    if (shelljs.test("-f", packageJson)) {
        return JSON.parse(shelljs.cat(packageJson));
    } else {
        return {};
    }
};