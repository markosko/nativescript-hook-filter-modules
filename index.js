
var path = require("path");
var fs = require("fs");

var tnsPackage = "tns-core-modules";
var tnsModulesDir = path.join("node_modules", tnsPackage);

var platform = process.env.PLATFORM;
var platformOutDir = process.env.PLATFORM_DIR;
/*
exports.readPackageJson = resolver.readPackageJson;
exports.getPackageMain = resolver.getPackageMain;

exports.writePackageJson = function writePackageJson(dir, data) {
    var packageJson = path.join(dir, "package.json");
    fs.writeFileSync(packageJson, JSON.stringify(data, null, 4), 'utf8');
};
*/