var typescript = Npm.require('typescript');

Plugin.registerSourceHandler('ts', function(compileStep) {
  var output = typescript.transpile(compileStep.read().toString('utf8'), { module : typescript.ModuleKind.System });
  var moduleName = compileStep.inputPath.replace(/\\/g,'/').replace('.ts','');
  output = output.replace("System.register([",'System.register("'+moduleName+'",[');

  compileStep.addJavaScript({
    path : compileStep.inputPath.replace('.ts', '.js'),
    data : output,
    sourcePath: compileStep.inputPath
  });
});
