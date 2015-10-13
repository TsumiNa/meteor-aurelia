var babel = Npm.require('babel-core');

Plugin.registerCompiler({
    extensions: ['au.js'],
    filenames: []
}, () => {
    return new CompilerES();
});

class CompilerES extends CachingCompiler {
    constructor() {
        super({
            compilerName: 'CompilerES',
            defaultCacheSize: 1024 * 1024 * 10,
        });
        // starting message
        msg[2](' Using Systemjs Loader...             ');
        msg[2](' Using Aurelia Framework...           ');
    }

    getCacheKey(inputFile) {
        return inputFile.getSourceHash();
    }

    compileResultSize(compileResult) {
        return compileResult.code.length + compileResult.map.length;
    }

    compileOneFile(inputFile) {
        let result = babel.transform(inputFile.getContentsAsString(), {
            modules: "system",
            sourceMaps: true,
            optional: [
                "es7.classProperties",
                "es7.decorators"
            ]
        });

        let moduleName = inputFile.getPathInPackage().replace(/\.au\.js$/, '').replace(/\\/g, '/');
        let ret = {};
        ret.code = result.code.replace("System.register([", 'System.register("' + moduleName + '",[');
        ret.path = moduleName + '.js';
        ret.map = result.map;
        return ret;
    }

    addCompileResult(inputFile, compileResult) {
        inputFile.addJavaScript({
            path: compileResult.path,
            sourcePath: inputFile.getPathInPackage(),
            data: compileResult.code,
            sourceMap: compileResult.map
        });
    }
}