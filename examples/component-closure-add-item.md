---
title: Component Closure Add Item
date: 2020-09-24
tags: [component, closure, state]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Component example using javascript closure for state management.

~~~js
const Foo = () => {
  const els = ["first item"]

  return {
    view: () => [
      m('button', {
        onclick: () => {els.push('another item')}
      }, 'add item'),

      m('ul', els.map(item => m('li', item)))
    ]
  }
}

m.mount(document.body, Foo)
~~~
