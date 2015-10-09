# Aurelia Meteor

[![Build Status](https://travis-ci.org/TsumiNa/meteor-aurelia.svg)](https://travis-ci.org/TsumiNa/meteor-aurelia)  [![Join the chat at https://gitter.im/TsumiNa/meteor-typescript](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/TsumiNa/meteor-typescript?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Aurelia](http://aurelia.io) and [Meteor](http://www.meteor.com) power combined.Use typescript and Jade to speed up your works.This package forked from [aurelia-meteor](https://github.com/ahmedshuhel/aurelia-meteor). I add Jade support and html-minify.

**This package use `SystemJS Module loader`. By default it combind with [meteor-typescript](https://github.com/TsumiNa/meteor-typescript). But if you want write codes with typescript, you need add [meteor-typescript](https://github.com/TsumiNa/meteor-typescript) package to you meteor app project.**


## Quick start

1. Install [Meteor](http://docs.meteor.com/#quickstart) `$ curl https://install.meteor.com | /bin/sh`
2. Create a new meteor app using `$ meteor create myapp` or navigate to the root of your existing app
3. Install Aurelia and  meteor-typescript:
```bash
$ meteor add tsumina:meteor-aurelia`
$ meteor add tsumina:meteor-typescript`  # if you need typescript support
```


## Example
- [Example application](https://github.com/tsumina/aurelia-skeleton-ts-jade) : A **meteor-aurelia** port of [skeleton-navigation](http://github.com/aurelia/skeleton-navigation)

## Tutorial

Aurelia use conventions to keep code simple and clean, to bootstrap a aurelia app you need a `index.html` (in the root of an Meteor app), include:

```html
<body>
  <div aurelia-app="client/main"></div>
  
  <script>
    System.import('aurelia-bootstrapper');
  </script>

</body>
```

The `aurelia-app="client/main"` attribute points to the Aurelia configuration file named main, which is `main.au.js`.
  
Assume you use es6 js and html template. In the client folder create main.au.js and insert:


```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(a => a.setRoot('client/app'));
}

```

The `main.au.js` is the file where the configuration is done to bootstrap Aurelia.

In this case the main file tells where the entry point of the app is located ('client/app'), which means go look for the `app.au.html`, `app.au.js` pair.

By convention Aurelia uses view/view-model pairs of the same name.

In the client folder, create app.au.html and insert:

```html
<template>
  <input type="text" placeholder="Your name" value.bind="name">
  <h2>Hello ${name}!</h2>
</template>

```

Then create app.au.js and insert:

```javascript
export class App {
  constructor(){
    this.name = "";
  }
}
```

Infact, if you add [meteor-typescript](https://github.com/TsumiNa/meteor-typescript) to your app, now you can use `SystemJS Module loader` on both client/server. Simple write like this(the root of an Meteor app):

- `index.html`
```html
<body>
  <div aurelia-app="client/main"></div>
</body>
```
  
- `entry.js`
```javascript
if (Meteor.isClient) {
  Meteor.startup(function(){
    System.import('aurelia-bootstrapper');
  })
}

if (Meteor.isServer) {
  Meteor.startup(function(){
    // some codes
  })
}
```

## Conventions

- Use `.au.js` for every javascript file that Aurelia will handle. (with `meteor-typescript` can use `.ts`)
- Use `.au.html` or `.jade` for every Aurelia Templates.

You can mix these things as your wish.


### Copyright and license

Code and documentation &copy; 2015 [TsumiNa](https://github.com/TsumiNa)
Released under the MIT license. 
