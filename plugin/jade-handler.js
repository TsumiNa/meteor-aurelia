var jade = Npm.require('jade');

Plugin.registerCompiler({
  extensions: ['jade'],
  filenames: []
}, () =>{
  return new CompilerJADE();
});

class CompilerJADE{


    processFilesForTarget(files) {

        files.forEach(file => {
            // make module name
            var moduleName = file.getPathInPackage().replace(/\\/g, '/').replace('.jade', '');

            var content = this.renderJade(file);

            var path = moduleName + '.tpl.js';

            var output = this.buildTemplate(content, moduleName);

            file.addJavaScript({
                path: path,
                data: output,
                sourcePath: file.getPathInPackage()
            });

        });
    }

    renderJade(file) {
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
