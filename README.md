# Aurelia Meteor

[![Join the chat at https://gitter.im/ahmedshuhel/aurelia-meteor](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ahmedshuhel/aurelia-meteor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Aurelia](http://aurelia.io) and [Meteor](http://www.meteor.com) power combined.

## Quick start

### Meteor Project

1. Install [Meteor](http://docs.meteor.com/#quickstart) `$ curl https://install.meteor.com | /bin/sh`
2. Create a new meteor app using `$ meteor create myapp` or navigate to the root of your existing app
3. Install Aurelia `$ meteor add ahmedshuhel:aurelia`


## Resources
- [Example application](https://github.com/ahmedshuhel/aurelia-skeleton-meteor) : A `aurelia-meteor` port of [skeleton-navigation](http://github.com/aurelia/skeleton-navigation)
- [Simple Todo Application](https://github.com/Markusxmr/Aurelia-Meteor-Simple-Todo) : A port of official meteor todo application.

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

The aurelia-app="client/main" attribute points to the Aurelia configuration file named main, which is main.es.js.

In the client folder create main.es.js and insert:


```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(a => a.setRoot('client/app'));
}

```

The `main.es.js` is the file where the configuration is done to bootstrap Aurelia.

In this case the main file tells where the entry point of the app is located ('client/app'), which means go look for the `app.tmpl.html`, `app.es.js` pair.

By convention Aurelia uses view/view-model pairs of the same name.

In the client folder, create app.tmpl.html and insert:

```html
<template>
  <input type="text" placeholder="Your name" value.bind="name">
  <h2>Hello ${name}!</h2>
</template>

```

Then create app.es.js and insert:

```javascript
export class App {
  constructor(){
    this.name = "";
  }
}
```

## Extensions

- Use `.es.js` for every javascript file that Aurelia will handle.
- Use `.tmpl.html` for every Aurelia Templates.
- Typescript can be used too. Just `.ts` will work for typescript files.
