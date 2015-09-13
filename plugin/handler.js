var babel = Npm.require('babel-core');

Plugin.registerSourceHandler('babel.js', compile);


function compile(compileStep){

 var content = compileStep.read().toString('utf-8');
 var result = babel.transform(content, {
   modules: "system", optional : [
   "es7.classProperties",
   "es7.decorators",
   "runtime"
 ]}).code;

 var moduleName = compileStep.inputPath.replace(/\.babel\.js$/, '').replace(/\\/g, '/');
 var path = moduleName + '.js';

 var output = result.replace("System.register([", 'System.register("' + moduleName + '",[');

 compileStep.addJavaScript({
    path: path,
    data: output,
    sourcePath: compileStep.inputPath
  });
}

