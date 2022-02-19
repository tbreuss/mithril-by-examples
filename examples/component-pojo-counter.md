---
title: Component Pojo Counter
abstract: Counter component example based on plain old JavaScript object (POJO).
date: 2020-09-24
tags: [component, pojo, state, counter, m.mount, oninit]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is a Counter component example based on a plain old JavaScript object (POJO).
State is handled via the vnode.state property, which is available to all lifecycle methods as well as the view method of a component.

## JavaScript

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
