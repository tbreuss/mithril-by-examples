---
title: Component External State Counter & Entries
date: 2020-09-24
tags: [component, state, counter]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Component example with counter and entries using external state.

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
