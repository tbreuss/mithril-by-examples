---
title: Simple Closure Component
desc: This example shows a simple closure component.
date: 2021-10-24
tags: [component, closure, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

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
