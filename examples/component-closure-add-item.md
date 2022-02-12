---
title: Component Closure Add Item
abstract: Component example using JavaScript closure for state management.
date: 2020-09-24
tags: [component, closure, state, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is an example showing a very simple JavaScript closure for state management.
The example shows a list that can be expanded by one item by clicking the add button.
Handling state with JavaScript closures is one of the recommended ways in Mithril.

## JavaScript

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
