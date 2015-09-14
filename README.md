# Aurelia Meteor

[![Join the chat at https://gitter.im/ahmedshuhel/aurelia-meteor](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ahmedshuhel/aurelia-meteor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Aurelia](http://aurelia.io) and [Meteor](www.meteor.com) power combined.

## Quick start

### Meteor Project
1. Install [Meteor](http://docs.meteor.com/#quickstart) `$ curl https://install.meteor.com | /bin/sh`
2. Create a new meteor app using `$ meteor create myapp` or navigate to the root of your existing app
3. Install Aurelia `$ meteor add ahmedshuhel:aurelia-meteor`


## Resources
- [Example application](https://github.com/ahmedshuhel/aurelia-skeleton-meteor) : A `aurelia-meteor` port of [skeleton-navigation](http://github.com/aurelia/skeleton-navigation)

## Tutorial

To bootstrap Aurelia, in your root of an Meteor app in the index.html, include:
``
<body>
  <div aurelia-app="client/main"></div>

  <script>
    System.import('aurelia-bootstrapper');
  </script>

</body>
``
The aurelia-app="client/main" attribute points to the Aurelia configuration file named main, which is main.vm.js.
It is located in the root of the client folder.
The main.vm.js is the file where the configuration is done to bootstrap Aurelia.
In this case the main file tells where the entry point of the app is located (client/app), which means go look for the app.tmpl.html, app.vm.js pair.
By convention Aurelia uses view/view-model pairs of the same name.
All Aurelia files should be located in a single client folder.

In the client folder, create and modify app.tmpl.html with following:
``
<template>
  <input type="text" placeholder="Your name" value.bind="name">
  <h2>Hello ${name}!</h2>
</template>

``

Then create and modify app.vm.js with following:
``
export class App {
  constructor(){
    this.name = "";
  }
}
``
