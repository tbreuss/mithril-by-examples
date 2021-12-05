---
title: Component Closure Counter
desc: Counter component example based on javascript closure.
date: 2020-09-24
tags: [component, pojo, state, counter, m.mount]
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
