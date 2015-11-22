# Aurelia Meteor

[![Build Status](https://travis-ci.org/TsumiNa/meteor-aurelia.svg)](https://travis-ci.org/TsumiNa/meteor-aurelia)  [![Join the chat at https://gitter.im/TsumiNa/meteor-typescript](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/TsumiNa/meteor-typescript?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Aurelia](http://aurelia.io) and [Meteor](http://www.meteor.com) power combined.Use Jade and html-minify to speed up your works.

**This package adds SystemJS Module Loader to your project.** It bundle with [meteor-systemjs](https://github.com/TsumiNa/meteor-systemjs) as default.

**You must remove `blaze-html-templates` and `spacebars` packages** because this package will handle `*.html` files. Just use:
```bash
$ meteor remove blaze-html-templates spacebars
```

## Index
- [Conventions](#conventions)
- [Change Log](#change-log)
- [Quick start](#quick-start)
- [Example](#example)
- [Tutorial](#tutorial)
- [Create Package](#create-package)

## Conventions

- Use `.sys.js` for every javascript file that Aurelia will handle. with `meteor-typescript` can use `.ts`
- Use `.au.html`, `.html` or `.jade` for every Aurelia Templates.

> use `.au.js` for compatible

You can mix these things if your wish.


If you want use typescript, you can add [meteor-typescript](https://github.com/TsumiNa/meteor-typescript) package to you meteor app project. Get corresponding definition files of Aurelia [here](https://github.com/TsumiNa/aurelia-powers-combined/tree/master/aurelia-dts)


## change log

#### 0.9.1
- Update to Aurelia@1.0.0-beta.1

#### 0.8.2
- Improve sourecMap support.
- Fixed some bugs. 

#### 0.8.1
- Add HTML/Jade syntax error check
- Some bug fix

#### 0.8.0
- **[*breaking change*]:**

  - You **must remove `blaze-html-templates` and `spacebars` packages** because this package will take control of the `html` files. Just `meteor remove blaze-html-templates spacebars`
  - Now template files can use `*.html` extension, `*.au.html` is also available for incompatibility.
  - The `index.html` under the root is the only one will be compiled to normal html template. You can't write your body codes here such as `<div aurelia-app="client/app/main"></div>`


## Quick start

1. Install [Meteor](http://docs.meteor.com/#quickstart) `$ curl https://install.meteor.com | /bin/sh`
2. Create a new meteor app using `$ meteor create myapp` or navigate to the root of your existing app
3. Install Aurelia and  meteor-typescript:
```bash
$ meteor remove blaze-html-templates spacebars
$ meteor add tsumina:meteor-aurelia
$ meteor add tsumina:meteor-typescript  # if you need typescript support
```


## Example
- [Example application](https://github.com/tsumina/aurelia-skeleton-jade) : A **meteor-aurelia** port of [skeleton-navigation](http://github.com/aurelia/skeleton-navigation)

- [Aurelia-TODO-App](https://github.com/TsumiNa/Aurelia-TODO-App) is an simple example to show how to play with typescript and aurelia.

- [aurelia-meteor-todos](https://github.com/Markusxmr/aurelia-meteor-todos) is another one port from advanced meteor todos app by [Markusxmr](https://github.com/Markusxmr). Here to see the [live demo](http://aurelia-todos.meteor.com/)


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

The `aurelia-app="client/main"` attribute points to the Aurelia configuration file named main, which is `main.sys.js`.
  
Assume you use es6 js and html template. In the client folder create main.sys.js and insert:


```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(a => a.setRoot('client/app'));
}

```

The `main.sys.js` is the file where the configuration is done to bootstrap Aurelia.

In this case the main file tells where the entry point of the app is located ('client/app'), which means go look for the `app.html`, `app.sys.js` pair.

By convention Aurelia uses view/view-model pairs of the same name.

In the client folder, create app.html and insert:

```html
<template>
  <input type="text" placeholder="Your name" value.bind="name">
  <h2>Hello ${name}!</h2>
</template>

```

Then create app.sys.js and insert:

```javascript
export class App {
  constructor(){
    this.name = "";
  }
}
```

Infact, you can use `SystemJS Module loader` on both client/server. Simple write code like this(the root of an Meteor app):

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
![c/s](https://lh4.googleusercontent.com/-AuGDIhZ7UOA/VhfBSJpGHJI/AAAAAAAAc50/y63NWDadYac/w923-h921-no/%25E5%25B1%258F%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2015-10-09%2B%25E4%25B8%258B%25E5%258D%258810.27.25.png)

## Create Package

See the [example](https://github.com/TsumiNa/meteor-ui-virtualization) here.

#### Details
`meteor-aurelia` and `meteor-typescript` compile files with their package name as root path. If codes not in a package, package name is `null`, for example:
**main.sys.js**
```js
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('tsumina:ui-virtualization');

  aurelia.start().then(a => a.setRoot('client/app'));
}
```
to **main.js**
```js
System.register("client/main",[], function (_export) {
  'use strict';  
  _export('configure', configure);  
  function configure(aurelia) {  
    aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-animator-css').plugin('tsumina:ui-virtualization');
    aurelia.start().then(function (a) {
      return a.setRoot('client/app'); 
    }); 
  } 

  return { 
    setters: [], 
    execute: function () {} 
  }; 
}) 
```

Now assume the **main.sys.js** in a package named **yourname:package-name**. In this case, the package name will be used as the root path. 
 **main.js**
```js
System.register("yourname:package-name/client/main",[], function (_export) {
  'use strict';  
  _export('configure', configure);  
  function configure(aurelia) {  
    aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-animator-css').plugin('tsumina:ui-virtualization');
    aurelia.start().then(function (a) {
      return a.setRoot('client/app'); 
    }); 
  } 

  return { 
    setters: [], 
    execute: function () {} 
  }; 
}) 
```

So if you create a aurelia package with a entry `index.sys.js` at your package root, Name your package **yourname:package-name**, and want other users load it like
```js
plugin('yourname:package-name');
```
you should add a `lib/init.js` file to you package sources with content:
```js
System.registerDynamic("yourname:package-name", ["yourname:package-name/index"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('yourname:package-name');
  global.define = __define;
  return module.exports;
});
```


### Copyright and license

Code and documentation &copy; 2015 [TsumiNa](https://github.com/TsumiNa)
Released under the MIT license. 
