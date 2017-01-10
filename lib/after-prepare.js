var fs = require('fs-extra');
var path = require('path');
var parser = require('xmldom').DOMParser;

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
        // TODO
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
