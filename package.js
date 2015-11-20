Package.describe({
    name: 'tsumina:meteor-aurelia',
    version: '0.9.1',
    summary: 'Combines the power of Aurelia with magical Meteor. Use Jade to speed up your works',
    git: 'http://github.com/tsumina/meteor-aurelia',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');
    api.use('isobuild:compiler-plugin@1.0.0');
    api.use('tsumina:meteor-systemjs@0.2.0');
    api.addFiles([
        "lib/config.js",
        "lib/aurelia.js"
    ], ["client"]);
});


Package.registerBuildPlugin({
    name: 'index_compiler',
    use: [
        'caching-html-compiler@1.0.2',
        'ecmascript@0.1.6',
        'templating-tools@1.0.0',
        'underscore@1.0.4'
    ],
    sources: [
        'plugin/index-handle/html-compiler.js',
        'plugin/index-handle/html-scanner.js',
        'plugin/index-handle/index-handle.js'
    ]
});

Package.registerBuildPlugin({
    name: 'sysjs_compiler',
    use: [
        'ecmascript@0.1.6',
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
    name: 'html_compiler',
    use: [
        'ecmascript@0.1.6',
        'caching-compiler@1.0.0',
        'html-tools@1.0.5'
    ],
    sources: [
        'plugin/html-handler.js'
    ],
    npmDependencies: {
        'html-minifier': '1.0.0'
    }
});

Package.registerBuildPlugin({
    name: 'jade_compiler',
    use: [
        'ecmascript@0.1.6',
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