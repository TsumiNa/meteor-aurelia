Plugin.registerSourceHandler('au.html', compile);

function compile(compileStep){

 var content = compileStep.read().toString('utf-8');

 var moduleName = compileStep.inputPath.replace(/\.au\.html$/, '').replace(/\\/g, '/');
 var path = moduleName + '.tmpl.js';

 var output = buildTemplate(content, moduleName);

 compileStep.addJavaScript({
    path: path,
    data: output,
    sourcePath: compileStep.inputPath
  });
}

function buildTemplate(src, moduleName){

return 'System.registerDynamic("'+ moduleName +'.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {'+
'         ; ' +
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
