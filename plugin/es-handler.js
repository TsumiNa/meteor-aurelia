var babel = Npm.require('babel-core');
// const debug = Npm.require('debug')('ts:debug:');

Plugin.registerCompiler({
    extensions: ['au.js'],
    filenames: []
}, () => {
    return new CompilerES();
});

function prepareSourceMap(sourceMapContent, fileContent, sourceMapPath) {
    let sourceMapJson = sourceMapContent;
    sourceMapJson.sourcesContent = [fileContent];
    sourceMapJson.sources = [sourceMapPath];
    return sourceMapJson;
}


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
        let fileName = inputFile.getPathInPackage();
        let fileContent = inputFile.getContentsAsString();
        let packageName = inputFile.getPackageName();
        let sourceMapPath = inputFile.getDisplayPath();

        // debug('Javascript File: %j', inputFile.getPathInPackage());
        try {
            var result = babel.transform(fileContent, {
                modules: "system",
                sourceMaps: true,
                optional: [
                    "es7.classProperties",
                    "es7.decorators",
                    "optimisation.modules.system"
                ]
            });
        } catch (err) {
            return inputFile.error({
                message: "Javascript syntax error: " + err.message,
                sourcePath: fileName
            });
        }

        // get transpiled code
        let moduleName = fileName.replace(/\.au\.js$/, '').replace(/\\/g, '/');
        moduleName = packageName ? packageName + '/' + moduleName : moduleName;
        let code = result.code.replace("System.register([", 'System.register("' + moduleName + '",[');
        code = code.slice(0, code.lastIndexOf("//#"));

        // get source map
        let map = prepareSourceMap(
            result.map,
            fileContent,
            sourceMapPath);

        // push to result
        return {
            code: code,
            path: moduleName + '.js',
            map: map
        };
    }

    addCompileResult(inputFile, compileResult) {
        inputFile.addJavaScript({
            path: compileResult.path,
            sourcePath: inputFile.getPathInPackage(),
            data: compileResult.code,
            sourceMap: compileResult.map,
            bare: true
        });
    }
}