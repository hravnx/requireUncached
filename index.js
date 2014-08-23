var path = require('path');
var callsite = require('callsite');

function isCandidateForDeletion(childPath, parentPath) {
  return childPath.indexOf('node_modules') === -1 &&
         childPath.indexOf(parentPath) === 0;
}

function uncacheModuleRec(name, parentPath) {

  var moduleId;
  try {
    moduleId = require.resolve(path.resolve(parentPath, name));
  } catch(e) {
    //console.log('Module "' + name + '" not found on disk');
    return;
  }

  var cachedModule = require.cache[moduleId];
  if(!cachedModule) {
    //console.log('Module "' + name + '" not found in cache');
    return;
  } 

  for (var k in cachedModule.children) {
    ch = cachedModule.children[k];
    childPath = path.dirname(ch.id);
    if(isCandidateForDeletion(childPath, parentPath)) {
      uncacheModuleRec(ch.id, childPath);
    }
  }
  //console.log('deleting', moduleId);
  delete require.cache[moduleId];
}

module.exports = function(name) {
  var stack = callsite();
  var callingFile = stack[1].getFileName();
  var contextPath = path.dirname(callingFile);

  var moduleName = path.resolve(contextPath, name);
  var mod = require(moduleName);
  uncacheModuleRec(moduleName, path.dirname(moduleName));
  return mod;
};
