---
title: Simple Closure Component
abstract: This example shows a simple closure component.
date: 2021-10-24
tags: [component, closure, m.mount]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This example shows a simple closure component.

## JavaScript

~~~js
const closure = () => {
  let count = 0

  return {
    view: () => [
      m('div',
        m('h1', `Count: ${count}`),
        m('button', {onclick: () => count++}, "+"),
        m('button', {onclick: () => count--}, "-")
      )
    ]
  }
}

m.mount(document.body, closure)
~~~
