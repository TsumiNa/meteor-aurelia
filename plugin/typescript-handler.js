var ts = Npm.require('typescript');

Plugin.registerSourceHandler('au.ts', function(compileStep) {

  var moduleName = compileStep.inputPath.replace(/\\/g,'/').replace('.au.ts','');

  var output = ts.transpileModule(compileStep.read().toString('utf8'), {
    compilerOptions: {
      emitDecoratorMetadata: true,
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.System
    },
    reportDiagnostics: false,
    moduleName: moduleName
  }).outputText;
  // output = output.replace("System.register([",'System.register("'+moduleName+'",[');

  compileStep.addJavaScript({
    path : compileStep.inputPath.replace('.au.ts', '.js'),
    data : output,
    sourcePath: compileStep.inputPath
  });
});
