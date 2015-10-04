Package.describe({
  name: 'kidddddd1984:aurelia-ts-jade',
  version: '0.4.0',
  summary: 'Combines the power of Aurelia with magical Meteor. Use typescript and jade to speed up your works',
  git: 'http://github.com/tsumina/aurelia-meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.addFiles([
    'lib/system-polyfills.js',
    'lib/system.js',
    "lib/config.js",
    "lib/aurelia.js"
    ], ["client"]);

  api.addFiles('aurelia-ts-jade.js');
});

Package.registerBuildPlugin({
  name: 'typescript',
  sources : [
    'plugin/ts-handler.js'
  ],
  npmDependencies : {
    'typescript' : '1.6.2' 
  }
});


Package.registerBuildPlugin({
  name : 'es',
  sources : [
    'plugin/es-handler.js'
  ],
  npmDependencies: {
    'babel-core': '5.8.24'
  }
});

Package.registerBuildPlugin({
  name : 'au_html',
  sources : [
    'plugin/html-handler.js'
  ],
  npmDependencies : {
    'html-minifier': '0.8.0'
  }});

Package.registerBuildPlugin({
  name : 'au_jade',
  sources : [
    'plugin/jade-handler.js'
  ],
  npmDependencies : {
    'jade' : '1.11.0'
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('kidddddd1984:aurelia-ts-jade');
  api.addFiles('aurelia-ts-jade-tests.js');
});
