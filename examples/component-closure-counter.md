---
title: Component Closure Counter
date: 2020-09-24
tags: [component, pojo, state, counter]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Counter component example based on javascript closure.

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
