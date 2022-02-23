---
title: Manage State using Simple Variables
abstract: An example as a simple Counter application written with Mithril.js.
date: 2021-10-19
tags: [state, component, m.mount]
level: intermediate
version: 2.0.4
author: kevinfiol
layout: layouts/example.html
---

In Mithril.js you are free to structure your state data however you'd like, and Mithril.js takes care of the rest.
Below is an example of a simple Counter application written with Mithril.js.

## JavaScript

~~~js
let count = 0;

const App = {
  view: () =>
    m('div',
      m('h1', 'Counter'),
      m('p', count),
      m('button', { onclick: () => count += 1 }, '+'),
      m('button', { onclick: () => count -= 1 }, '-')
    )
};

m.mount(document.body, App);
~~~

In this example the state is just a single primitive variable!
For small applications, simple widgets or one-off UI components, the above solution is largely sufficient.
