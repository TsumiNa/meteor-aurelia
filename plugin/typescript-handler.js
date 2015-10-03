var typescript = Npm.require('typescript');

Plugin.registerSourceHandler('au.ts', function(compileStep) {
  var output = typescript.transpile(compileStep.read().toString('utf8'), { module : typescript.ModuleKind.System });
  var moduleName = compileStep.inputPath.replace(/\\/g,'/').replace('.au.ts','');
  output = output.replace("System.register([",'System.register("'+moduleName+'",[');

  compileStep.addJavaScript({
    path : compileStep.inputPath.replace('.au.ts', '.js'),
    data : output,
    sourcePath: compileStep.inputPath
  });
});
