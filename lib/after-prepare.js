var fs = require('fs-extra');
var path = require('path');
var parser = require('xmldom').DOMParser;
var xcode = require('xcode');
var plist = require('simple-plist');

const gradleRuntime = `
buildscript {
    repositories {
        maven { url 'https://maven.fabric.io/public' }
    }

    dependencies {
        classpath 'io.fabric.tools:gradle:1.+'
    }
}

apply plugin: 'io.fabric'
`;

const settingsInclude = `

include "fabric"
project(":fabric").projectDir = file("build-tools/fabric-devtools")
`;


module.exports = function($logger, $projectData, hookArgs) {
    var platform = hookArgs.platform.toLowerCase(),
        fabricJSON = path.join($projectData.projectDir, 'fabric.json');
    return new Promise(function(resolve, reject) {
        var isNativeProjectPrepared = !hookArgs.nativePrepare || !hookArgs.nativePrepare.skipNativePrepare;
        var hasFabricJSONFile = fs.existsSync(fabricJSON);
        if (hasFabricJSONFile && isNativeProjectPrepared) {
            try {
                var fabricData = require(fabricJSON),
                    apiKey = fabricData.apiKey,
                    apiSecret = fabricData.apiSecret;
                if (platform === 'android') {
                    var fabricProperties = path.join($projectData.projectDir, 'platforms', 'android', 'src', 'main', 'res', 'fabric.properties'),
                        fabricPropertiesData = '# Contains API Secret used to validate your application. Commit to internal source control; avoid making secret public.';
                    fabricPropertiesData += '\napiKey = ' + apiKey;
                    fabricPropertiesData += '\napiSecret = ' + apiSecret;
                    fs.ensureFile(fabricProperties, function(err) {
                        if (!err) {
                            fs.writeFile(fabricProperties, fabricPropertiesData);
                            $logger.trace('Written fabric.properties');
                        } else {
                            console.error(err);
                            reject();
                        }

                        const gradleScriptDir = path.join($projectData.projectDir, 'platforms', 'android', 'build-tools', 'fabric-devtools');
                        const gradleScript = path.join(gradleScriptDir, 'build.gradle');
                        fs.ensureDir(gradleScriptDir, function(err) {
                            if (err) {
                                try {
                                    gradleScriptDir
                                    .split(path.sep)
                                    .reduce((currentPath, folder) => {
                                        currentPath += folder + path.sep;
                                        if (!fs.existsSync(currentPath)){
                                          fs.mkdirSync(currentPath);
                                        }
                                        return currentPath;
                                    }, '');
                                } catch(err) {
                                    console.error(err);
                                    reject();
                                };
                            }
                            fs.writeFileSync(gradleScript, gradleRuntime);
                            $logger.trace('Written build.gradle');
                            const settingsGradle = path.join($projectData.projectDir, 'platforms', 'android', 'settings.gradle');
                            fs.ensureFile(settingsGradle, function(err) {
                                if (!err) {
                                    let content = fs.readFileSync(settingsGradle).toString();
                                    if (!content.match(/.*fabric.*/)) {
                                        content += settingsInclude;
                                        fs.writeFileSync(settingsGradle, content);
                                        $logger.trace('Written settings.gradle');
                                    }
                                    resolve();
                                } else {
                                    console.error(err);
                                    reject();
                                }
                            });
                        });
                    });
                } else if (platform == 'ios') {
                    var appName = path.basename($projectData.projectDir);
                    var sanitizedName = appName.split('').filter(function(c) { return /[a-zA-Z0-9]/.test(c); }).join('');
                    var projectPath = path.join($projectData.projectDir, 'platforms', 'ios', sanitizedName + '.xcodeproj', 'project.pbxproj');
                    var plistPath = path.join($projectData.projectDir, 'platforms', 'ios', sanitizedName, sanitizedName + '-Info.plist');
                    var podsPath = path.join($projectData.projectDir, 'platforms', 'ios', 'Pods');
                    $logger.trace('Using Xcode project', projectPath);
                    $logger.trace('Using Info plist', plistPath);
                    $logger.trace('Using Pods path', podsPath);
                    var xcodeProject = xcode.project(projectPath);
                    xcodeProject.parseSync();
                    var options = { shellPath: '/bin/sh', shellScript: podsPath + '/Fabric/run ' + apiKey + ' ' + apiSecret };
                    var buildPhase = xcodeProject.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Configure Fabric', xcodeProject.getFirstTarget().uuid, options).buildPhase;
                    $logger.trace('Written Xcode project');
                    fs.writeFileSync(projectPath, xcodeProject.writeSync());
                    var appPlist = plist.readFileSync(plistPath);
                    plist.Fabric = {
                        APIKey: apiKey,
                        Kits: [{
                            KitInfo: '',
                            KiteName: 'Crashlytics'
                        }, {
                            KitInfo: '',
                            KiteName: 'Answers'
                        }]
                    }
                    plist.writeFileSync(plistPath, appPlist);
                    $logger.trace('Written Info plist');
                    resolve();
                } else if (platform == 'windows') {
                    //TODO PRs gladly accepted :P
                    reject();
                }
            } catch (e) {
                $logger.error('Unknown error during prepare fabric', e);
                reject();
            }
        } else if (!hasFabricJSONFile) {
            $logger.error('Please create a fabric.json file in the root!');
            reject();
        } else {
            $logger.trace("Native project not prepared.");
            resolve();
        }
    });
};
