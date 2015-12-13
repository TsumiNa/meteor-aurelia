var jade = Npm.require('jade');
const crc = Npm.require('crc');
// const debug = Npm.require('debug')('ts:debug:');

Plugin.registerCompiler({
    extensions: ['jade'],
    archMatching: 'web',
    isTemplate: true,
    filenames: []
}, () => {
    return new JadeCompiler();
});

class JadeCompiler extends CachingCompiler {
    constructor() {
        super({
            compilerName: 'JadeCompiler',
            defaultCacheSize: 1024 * 1024 * 10,
        });
    }

    getCacheKey(inputFile) {
        return inputFile.getSourceHash() + crc.crc32(inputFile.getPathInPackage()).toString(32);
    }

    compileResultSize(compileResult) {
        return compileResult.code.length;
    }

    compileOneFile(inputFile) {
        let fileName = inputFile.getPathInPackage();
        let packageName = inputFile.getPackageName();
        let moduleName = fileName.replace(/\\/g, '/').replace('.jade', '');
        moduleName = packageName ? packageName.slice(packageName.indexOf(":") + 1) + '/' + moduleName : moduleName;
        return {
            code: this.buildTemplate(this.renderJade(inputFile), moduleName),
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
        return src
            .replace(/(["\\])/g, '\\$1')
            .replace(/[\f]/g, "\\f")
            .replace(/[\b]/g, "\\b")
            .replace(/[\n]/g, "\\n")
            .replace(/[\t]/g, "\\t")
            .replace(/[\r]/g, "\\r")
            .replace(/[\u2028]/g, "\\u2028")
            .replace(/[\u2029]/g, "\\u2029");
    }
}