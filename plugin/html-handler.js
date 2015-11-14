var minify = Npm.require('html-minifier').minify;

Plugin.registerCompiler({
  extensions: ['html', 'au.html'],
  archMatching: 'web',
  filenames: []
}, () =>{
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
        if (fileName === 'index.html') { return; }
        let moduleName = fileName.replace(/(\.au)?\.html$/, '').replace(/\\/g, '/');
        let ret = {};
        ret.code = this.buildTemplate(inputFile.getContentsAsString(), moduleName);
        ret.path = moduleName + '.tpl.js';
        return ret;
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

        return 'System.registerDynamic("' + moduleName + '.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {' +
            '         var global = this, ' +
            '            __define = global.define; ' +
            '         global.define = undefined; ' +
            '         module.exports = "' + this.clean(src) + '";' +
            '         global.define = __define;' +
            '         return module.exports;' +
            '       });'
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
