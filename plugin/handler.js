var babel = Npm.require('babel-core');

Plugin.registerSourceHandler('babel.js', compile);


function compile(compileStep){

 var content = compileStep.read().toString('utf-8');
 var output = babel.transform(content, {modules: "system"})

 compileStep.addJavaScript({
    path: compileStep.inputPath,
    data: output.code,
    sourcePath: compileStep.inputPath
  });
}




