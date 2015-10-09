var babel = Npm.require('babel-core');

Plugin.registerCompiler({
    extensions: ['au.js'],
    filenames: []
}, () =>{
    return new CompilerES();
});

class CompilerES {

    processFilesForTarget(files) {

        files.forEach(file => {
            var result = babel.transform(file.getContentsAsString(), {
                modules: "system",
                optional: [
                    "es7.classProperties",
                    "es7.decorators"
                ]
            }).code;

            var moduleName = file.getPathInPackage().replace(/\.au\.js$/, '').replace(/\\/g, '/');
            var path = moduleName + '.js';

            var output = result.replace("System.register([", 'System.register("' + moduleName + '",[');

            file.addJavaScript({
                path: path,
                data: output,
                sourcePath: file.getPathInPackage()
            });
        });
    }
}