# Aurelia Meteor

[Aurelia](http://aurelia.io) and [Meteor](http://www.meteor.com) power combined.Use typescript and Jade to speed up your works.

This package forked from [aurelia-meteor](https://github.com/ahmedshuhel/aurelia-meteor). I add Jade support and html-minify.

## Quick start

### Meteor Project

1. Install [Meteor](http://docs.meteor.com/#quickstart) `$ curl https://install.meteor.com | /bin/sh`
2. Create a new meteor app using `$ meteor create myapp` or navigate to the root of your existing app
3. Install Aurelia `$ meteor add kidddddd1984:aurelia-ts-jade`


## Resources
- [Example application](https://github.com/tsumina/aurelia-skeleton-ts-jade) : A `aurelia-meteor` port of [skeleton-navigation](http://github.com/aurelia/skeleton-navigation)

## Tutorial

To bootstrap Aurelia, in the index.html (the root of an Meteor app), include:

```html
<body>
  <div aurelia-app="client/main"></div>

  <script>
    System.import('aurelia-bootstrapper');
  </script>

</body>
```

The aurelia-app="client/main" attribute points to the Aurelia configuration file named main, which is `main.au.js` or `main.au.ts`.

Assume you use es6 js. In the client folder create main.au.js and insert:


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

## Conventions

- Use `.au.js` or `.au.ts` for every javascript file that Aurelia will handle.
- Use `.au.html` or `.au.jade` for every Aurelia Templates.

You can mix these things as your wish.
