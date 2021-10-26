---
title: Simple Closure Component
date: 2021-10-24
tags: [component, closure]
level: beginner
version: 2.0.4
author: osban
credits: []
links: []
layout: layouts/example.html
---

This example shows a simple closure component.

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
