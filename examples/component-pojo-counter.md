---
title: Component Pojo Counter
date: 2020-09-24
tags: [component, pojo, state, counter, m.mount, oninit]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Counter component example based on plain old javascript object (POJO).

~~~js
const pojo = {
  oninit: v => {v.state.count = 0},
  view: v =>
    m('div',
      m('h1', `Count: ${v.state.count}`),
      m('button', {onclick: () => v.state.count++}, "+"),
      m('button', {onclick: () => v.state.count--}, "-")
    )
}

m.mount(document.body, pojo)
~~~
