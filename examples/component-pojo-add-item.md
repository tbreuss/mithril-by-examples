---
title: Component Pojo Add Item
abstract: Component state example using plain old JavaScript object (POJO).
date: 2020-09-24
tags: [component, pojo, state, m.mount, oninit]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Component state example using plain old JavaScript object (POJO).

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
