var hook = require('nativescript-hook')(__dirname);
hook.postinstall();

var path = require("path");
var fs = require("fs");

var projectDir = hook.findProjectDir();
var appDir = path.join(projectDir, "app");

// Create a webpack.config.js file, if not present.
var configTemplatePath = path.join(__dirname, "filter-modules.json.template");
var configPath = path.join(projectDir, "filter-modules.json");
if (!fs.existsSync(configPath)) {
    var configContent = fs.readFileSync(configTemplatePath, "utf8");
    fs.writeFileSync(configPath, configContent);
}
