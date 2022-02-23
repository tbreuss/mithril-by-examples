---
title: Data Binding Helper
abstract: Nice example using a data binding helper function.
date: 2020-09-24
tags: [binding, helper, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Here we have a nice little example using a data binding helper function.
This function makes data binding very easy by just including the binder in the view method of the component.

## JavaScript

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
