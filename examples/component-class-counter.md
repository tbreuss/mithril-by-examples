---
title: Component Class Counter
abstract: "This is not recommended, but if you have to: Counter component example based on a javascript class."
date: 2020-09-24
tags: [component, class, state, counter, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

An example using a Component class, that displays two buttons with onclick-Events.
This is not recommended, but if you have to: Counter component example based on a javascript class.

## JavaScript

~~~js
class app {
  constructor() {
    this.count = 0
  }

  view() {
    return [
      m('div',
        m('h1', `Count: ${this.count}`),
        m('button', {onclick: () => this.count++}, '+'),
        m('button', {onclick: () => this.count--}, "-")
      )
    ]
  }
}

m.mount(document.body, app)
~~~
