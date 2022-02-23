---
title: Component Class Add Item
abstract: This is an example showing a very simple Component class, that handles state and ads items by cklicking a button.
date: 2020-09-24
tags: [component, class, state, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is an example showing a very simple Component class, that handles state and adds another item when clicking on a button.
Using classes isn't really recommended, but of course if you have to, it will work just fine with Mithril.js.


## JavaScript

~~~js
class app {
  constructor() {
    this.els = ["first item"]
  }

  view() {
    return [
      m('div',
        m('button', {
          onclick: () => {this.els.push('another item')}
        }, 'add item'),

        m('ul', this.els.map(item => m('li', item)))
      )
    ]
  }
}

m.mount(document.body, app)
~~~
