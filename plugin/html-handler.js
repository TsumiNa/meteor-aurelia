var minify = Npm.require('html-minifier').minify;

Plugin.registerCompiler({
  extensions: ['au.html'],
  filenames: []
}, function () {
  return new CompilerHTML();
});

function CompilerHTML() {}
CompilerHTML.prototype.processFilesForTarget = function (files){

  files.forEach(function (file) {
    // make module name
    var moduleName = file.getPathInPackage().replace(/\.au\.html$/, '').replace(/\\/g, '/');
    var path = moduleName + '.tpl.js';

    var output = buildTemplate(file.getContentsAsString(), moduleName);

    file.addJavaScript({
      path: path,
      data: output,
      sourcePath: file.getPathInPackage()
    });

  });
}


function buildTemplate(src, moduleName){

  return 'System.registerDynamic("'+ moduleName +'.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {'+
  '         var global = this, ' +
  '            __define = global.define; ' +
  '         global.define = undefined; ' +
  '         module.exports = "' + clean(src) + '";' + 
  '         global.define = __define;' +
  '         return module.exports;' +
  '       });'
}

function clean(src){
  var result = minify(src, {
      collapseWhitespace: true,
      removeComments: true
    })
    .replace(/(["\\])/g, '\\$1')
    .replace(/[\f]/g, "\\f")
    .replace(/[\b]/g, "\\b")
    .replace(/[\n]/g, "\\n")
    .replace(/[\t]/g, "\\t")
    .replace(/[\r]/g, "\\r")
    .replace(/[\u2028]/g, "\\u2028")
    .replace(/[\u2029]/g, "\\u2029");

  return result;
}
