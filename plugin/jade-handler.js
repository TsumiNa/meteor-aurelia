var jade = Npm.require('jade');

Plugin.registerCompiler({
  extensions: ['jade'],
  filenames: []
}, function () {
  return new CompilerJADE();
});

function CompilerJADE() {}
CompilerJADE.prototype.processFilesForTarget = function (files){

  files.forEach(function (file) {
    // make module name
    var moduleName = file.getPathInPackage().replace(/\\/g,'/').replace('.jade','');

    var content = renderJade(file);

    var path = moduleName + '.tpl.js';

    var output = buildTemplate(content, moduleName);

    file.addJavaScript({
      path: path,
      data: output,
      sourcePath: file.getPathInPackage()
    });

  });
}

function renderJade(file){
  try {
    return jade.render(file.getContentsAsString());
  } catch (err) {
    return file.error({
      message: "Jade syntax error: " + err.message,
      sourcePath: file.getPathInPackage()
    });
  }
}

function buildTemplate(src, moduleName){

return 'System.registerDynamic("'+ moduleName +'.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {'+
'         var global = this, ' +
'            __define = global.define; ' +
'         global.define = undefined; ' +
'         module.exports = "' + clean(src) + 
'         global.define = __define;' +
'         return module.exports;' +
'       });'
}

function clean(src) {
  return src 
    .replace(/(["\\])/g, '\\$1')
    .replace(/[\f]/g, "\\f")
    .replace(/[\b]/g, "\\b")
    .replace(/[\n]/g, "\\n")
    .replace(/[\t]/g, "\\t")
    .replace(/[\r]/g, "\\r")
    .replace(/[\u2028]/g, "\\u2028")
    .replace(/[\u2029]/g, "\\u2029")
  + '";';
}
