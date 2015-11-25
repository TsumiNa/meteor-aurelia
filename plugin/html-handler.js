var minify = Npm.require('html-minifier').minify;
// const debug = Npm.require('debug')('ts:debug:');

Plugin.registerCompiler({
    extensions: ['html', 'au.html'],
    archMatching: 'web',
    isTemplate: true,
    filenames: []
}, () => {
    return new CompilerHTML();
});

class CompilerHTML extends CachingCompiler {
    constructor() {
        super({
            compilerName: 'CompilerHTML',
            defaultCacheSize: 1024 * 1024 * 10,
        });
    }

    getCacheKey(inputFile) {
        return inputFile.getSourceHash();
    }

    compileResultSize(compileResult) {
        return compileResult.code.length;
    }

    compileOneFile(inputFile) {
        let fileName = inputFile.getPathInPackage();
        let packageName = inputFile.getPackageName();
        if (fileName === 'index.html') {
            return;
        }
        let moduleName = fileName.replace(/(\.au)?\.html$/, '').replace(/\\/g, '/');
        moduleName = packageName ? packageName + '/' + moduleName : moduleName;
        let src = inputFile.getContentsAsString()
        // Just parse the html to make sure it is correct before minifying
        try {
            HTMLTools.parseFragment(src)
        } catch (err) {
            return inputFile.error({
                message: "HTML syntax error: " + err.message,
                sourcePath: inputFile.getPathInPackage()
            });
        }
        return {
            code: this.buildTemplate(src, moduleName),
            path: fileName + '.js'
        };
    }

    addCompileResult(inputFile, compileResult) {
        inputFile.addJavaScript({
            path: compileResult.path,
            sourcePath: inputFile.getPathInPackage(),
            data: compileResult.code,
            bare: true
        });
    }

    buildTemplate(src, moduleName) {
        // debug('HTML File: %j', moduleName);
        return 'System.registerDynamic("' + moduleName + '.html!github:systemjs/plugin-text@0.0.3", [], true, function(require, exports, module) {' +
            'var global = this,' +
            '__define = global.define;' +
            'global.define = undefined;' +
            'module.exports = "' + this.clean(src) + '";' +
            'global.define = __define;' +
            'return module.exports;' +
            '});'
    }

    clean(src) {
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
}