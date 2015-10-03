Package.describe({
  name: 'ahmedshuhel:aurelia',
  version: '0.3.0',
  summary: 'Combines the power of Aurelia with magical Meteor',
  git: 'http://github.com/ahmedshuhel/aurelia-meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.addFiles([
    'lib/system-polyfills.js',
    'lib/system.js',
    "lib/aurelia.js",
    "lib/config.js"
    ], ["client"]);

  api.addFiles('aurelia-meteor.js');
});

Package.registerBuildPlugin({
  name: 'typescript',
  sources : [
    'plugin/typescript-handler.js'
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
  name : 'template',
  sources : [
    'plugin/template-handler.js'
  ]
});

Package.registerBuildPlugin({
  name : 'tmpl_jade',
  sources : [
    'plugin/tmpl-jade-handler.js'
  ],
  npmDependencies : {
    'jade' : '1.11.0' 
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ahmedshuhel:aurelia');
  api.addFiles('aurelia-meteor-tests.js');
});
