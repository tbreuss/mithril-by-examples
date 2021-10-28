---
title: Data Binding Helper
date: 2020-09-24
tags: [binding, helper]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Nice example using a data binding helper function.

~~~js
const model = {
  first: 'Joe',
  last: 'Black',
  email: 'joe@black.com',
  color: 'red'
}

const binder = model => ({
  onchange: e => {
    model[e.target.name] = e.target.value
  }
})

const app = {
  view: () => [
    m("div", binder(model),
      m("input", {name: 'first', value: model.first}),
      m("input", {name: 'last',  value: model.last}),
      m("input", {name: 'email', value: model.email}),
      m('select', {name: 'color'},
        ['orange','blue','red','green']
        .map(c => m('option', {selected: c === model.color}, c))
      )
    ),
    m('pre', JSON.stringify(model, null, 2))
  ]
}

m.mount(document.body, app)
~~~
