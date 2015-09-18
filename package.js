Package.describe({
  name: 'ahmedshuhel:aurelia',
  version: '0.1.0',
  summary: 'Combines the power of Aurelia with magical Meteor',
  git: 'http://github.com/ahmedshuhel/aurelia-meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.addFiles([
    'lib/system.js',
    "lib/aurelia.js",
    "lib/config.js"
    ], ["client"]);

  api.addFiles('aurelia-meteor.js');
});


Package.registerBuildPlugin({
  name : 'viewmodel',
  sources : [
    'plugin/viewmodel-handler.js'
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

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ahmedshuhel:aurelia-meteor');
  api.addFiles('aurelia-meteor-tests.js');
});

