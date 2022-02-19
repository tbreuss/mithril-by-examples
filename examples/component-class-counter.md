---
title: Component Class Counter
abstract: This is the classic counter example, that shows a value, that can be increased or decreased by clicking on of two buttons.
date: 2020-09-24
tags: [component, class, state, counter, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is another example showing a very simple Component class.
It is one of the classic examples, that shows a counter, that can be increased or decreased by clicking one of two appropriate buttons.
Using classes isn't really recommended, but of course if you have to, it will work just fine with Mithril.js.

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
