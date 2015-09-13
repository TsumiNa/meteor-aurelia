Package.describe({
  name: 'ahmedshuhel:aurelia-meteor',
  version: '0.0.1',
  summary: 'Combines the power of Aurelia with magical Meteor',
  git: 'http://github.com/ahmedshuhel/aurelia-meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.addFiles([
    'lib/system.js',
    "lib/aurelia.js"
    ], ["client"]);

  api.addFiles('aurelia-meteor.js');
});

Package.registerBuildPlugin({
  name : 'babel',
  sources : [
    'plugin/handler.js'
  ],
  npmDependencies: {
    'babel-core': '5.8.24'
  }
});
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ahmedshuhel:aurelia-meteor');
  api.addFiles('aurelia-meteor-tests.js');
});

