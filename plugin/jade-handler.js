var jade = Npm.require('jade');
// const debug = Npm.require('debug')('ts:debug:');

Plugin.registerCompiler({
    extensions: ['jade'],
    archMatching: 'web',
    filenames: []
}, () => {
    return new CompilerJADE();
});

class CompilerJADE extends CachingCompiler {
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
        let moduleName = inputFile.getPathInPackage().replace(/\\/g, '/').replace('.jade', '');
        let ret = {};
        ret.code = this.buildTemplate(this.renderJade(inputFile), moduleName);
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

    renderJade(file) {
        // debug('Jade File: %j', inputFile.getPathInPackage());
        try {
            return jade.render(file.getContentsAsString());
        } catch (err) {
            return file.error({
                message: "Jade syntax error: " + err.message,
                sourcePath: file.getPathInPackage()
            });
        }
    }

    buildTemplate(src, moduleName) {

        return 'System.registerDynamic("' + moduleName + '.html!github:systemjs/plugin-text@0.0.2", [], true, function(require, exports, module) {' +
            '         var global = this, ' +
            '            __define = global.define; ' +
            '         global.define = undefined; ' +
            '         module.exports = "' + this.clean(src) +
            '         global.define = __define;' +
            '         return module.exports;' +
            '       });'
    }

    clean(src) {
        return src
            .replace(/(["\\])/g, '\\$1')
            .replace(/[\f]/g, "\\f")
            .replace(/[\b]/g, "\\b")
            .replace(/[\n]/g, "\\n")
            .replace(/[\t]/g, "\\t")
            .replace(/[\r]/g, "\\r")
            .replace(/[\u2028]/g, "\\u2028")
            .replace(/[\u2029]/g, "\\u2029") + '";';
    }
}