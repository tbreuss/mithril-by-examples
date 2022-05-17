---
title: Component Pojo Add Item
abstract: Component state example using plain old JavaScript object (POJO).
date: 2020-09-24
tags: [component, pojo, state, m.mount, oninit]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This is an example how to use component state with plain old JavaScript objects (POJO).
State can be accessed via the vnode.state property, which is available to all lifecycle methods as well as the view method of a component.

## JavaScript

~~~js
const app = {
  oninit: v => {v.state.els = ["first item"]},
  view: v => [
    m('button', {
      onclick: () => v.state.els.push('another item')
    }, 'add item'),
    m('ul', v.state.els.map(x => m('li', x)))
  ]
}

m.mount(document.body, app)
~~~
