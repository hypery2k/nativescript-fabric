var fs = require('fs-extra');
var path = require('path');
var parser = require('xmldom').DOMParser;
var xcode = require('xcode');
var plist = require('simple-plist');


module.exports = function ($logger, $projectData, hookArgs) {
    var platform = hookArgs.platform.toLowerCase(),
        fabricJSON = path.join($projectData.projectDir, 'fabric.json');
    return new Promise(function (resolve, reject) {
        if (fs.existsSync(fabricJSON)) {
            var fabricData = require(fabricJSON),
                apiKey = fabricData.apiKey,
                apiSecret = fabricData.apiSecret;
            if (platform === 'android') {
                var fabricProperties = path.join($projectData.projectDir, 'platforms', 'android', 'src', 'main', 'res', 'fabric.properties'),
                    fabricPropertiesData = '# Contains API Secret used to validate your application. Commit to internal source control; avoid making secret public.';
                fabricPropertiesData += '\napiKey = ' + apiKey;
                fabricPropertiesData += '\napiSecret = ' + apiSecret;
                fs.ensureFile(fabricProperties, function (err) {
                    if (!err) {
                        fs.writeFile(fabricProperties, fabricPropertiesData);
                        $logger.trace('Written fabric.properties');
                        resolve();
                    } else {
                        console.error(err);
                        reject();
                    }
                });
            } else if (platform == 'ios') {
                var appName = path.basename($projectData.projectDir);
                var sanitizedName = appName.split('').filter(function (c) { return /[a-zA-Z0-9]/.test(c); }).join('');
                var projectPath = path.join($projectData.projectDir, 'platforms', 'ios', sanitizedName + '.xcodeproj', 'project.pbxproj');
                var plistPath = path.join($projectData.projectDir, 'platforms', 'ios', sanitizedName, sanitizedName + '-Info.plist');
                $logger.trace('Using Xcode project', projectPath);
                $logger.trace('Using Info plist', plistPath);
                var xcodeProject = xcode.project(projectPath);
                xcodeProject.parseSync();
                var options = { shellPath: '${PODS_ROOT}/Fabric/run', shellScript: apiKey + ' ' + apiSecret };
                var buildPhase = xcodeProject.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Configure Fabric', xcodeProject.getFirstTarget().uuid, options).buildPhase;
                $logger.trace('Written Xcode project');
                fs.writeFileSync(projectPath, xcodeProject.writeSync());
                var appPlist = plist.readFileSync(plistPath);
                plist.Fabric = {
                    APIKey: apiKey,
                    Kits: [
                        {
                            KitInfo: '',
                            KiteName: 'Crashlytics'
                        }, {
                            KitInfo: '',
                            KiteName: 'Answers'
                        }
                    ]
                }
                plist.writeFileSync(plistPath, appPlist);
                $logger.trace('Written Info plist');
                resolve();
            } else if (platform == 'windows') {
                //TODO PRs gladly accepted :P
                reject();
            }
        } else {
            $logger.error('Please create a fabric.json file in the root!');
            reject();
        }
    });
};
