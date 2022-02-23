---
title: Component External State Counter & Entries
abstract: Component example with counter and entries using external state.
date: 2020-09-24
tags: [component, state, counter, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is an example showing a very simple Component and a simple Pojo for state management.
In this case the model for state management is a global variable.
The example is a variant of the classic counter, that shows a count value together with a list of entries. By clicking a button the counter will increase and a new entry will be appended to the list.
Handling status with global variables works, but for the sake of clarity it only makes sense in very simple projects.

## JavaScript

~~~js
const model = {
  count: 0,
  entries: []
}

const test = () => {
  const update = () => {
    model.count++
    model.entries.push(model.count + " - " + new Date())
  }

  return {
    view: () =>
      m('div',
        m('h1', "Test"),
        m('button', {onclick: update}, "CLICK"),
        m('h2', `Number of clicks: ${model.count}`),
        model.entries.map(x => m('div', x))
      )
  }
}

m.mount(document.body, test)
~~~
