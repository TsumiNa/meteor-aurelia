Package.describe({
    name: 'tsumina:meteor-aurelia',
    version: '0.6.0',
    summary: 'Combines the power of Aurelia with magical Meteor. Use Jade to speed up your works',
    git: 'http://github.com/tsumina/meteor-aurelia',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');
    api.use('isobuild:compiler-plugin@1.0.0');
    api.use('tsumina:meteor-systemjs@0.0.3');
    api.addFiles([
        "lib/config.js",
        "lib/aurelia.js"
    ], ["client"]);
});


Package.registerBuildPlugin({
    name: 'es',
    use: [
        'ecmascript@0.1.5',
        'caching-compiler@1.0.0'
    ],
    sources: [
        'lib/utils.js',
        'plugin/es-handler.js'
    ],
    npmDependencies: {
        'chalk': '1.1.1',
        'babel-core': '5.8.24'
    }
});

Package.registerBuildPlugin({
    name: 'au_html',
    use: [
        'ecmascript@0.1.5',
        'caching-compiler@1.0.0'
    ],
    sources: [
        'plugin/html-handler.js'
    ],
    npmDependencies: {
        'html-minifier': '0.8.0'
    }
});

Package.registerBuildPlugin({
    name: 'au_jade',
    use: [
        'ecmascript@0.1.5',
        'caching-compiler@1.0.0'
    ],
    sources: [
        'plugin/jade-handler.js'
    ],
    npmDependencies: {
        'jade': '1.11.0'
    }
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('ecmascript');
    api.use('tsumina:meteor-aurelia');
    api.addFiles('meteor-aurelia-tests.js');
});