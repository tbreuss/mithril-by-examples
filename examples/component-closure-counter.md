---
title: Component Closure Counter
abstract: Counter component example based on JavaScript closure.
date: 2020-09-24
tags: [component, pojo, state, counter, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is another example showing a very simple JavaScript closure.
It is one of the classic examples, that shows a counter, that can be increased or decreased by clicking one of two appropriate buttons.
Handling state with JavaScript closures is one of the recommended ways in Mithril.

## JavaScript

~~~js
const closure = () => {
  let count = 0

  return {
    view: () =>
      m('div',
        m('h1', `Count: ${count}`),
        m('button', {onclick: () => count++}, "+"),
        m('button', {onclick: () => count--}, "-")
      )
  }
}

m.mount(document.body, closure)
~~~
