---
title: Select
desc:
date: 2020-09-24
tags: [form, select, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

## JS

~~~js
const app = () => {
  let choice = 'Item2'

  return {
    view: () => [
      m('h1', 'Select'),
      m('select', {
          onchange: e => choice = e.target.value,
          value: choice
        },
        ['Item1', 'Item2', 'Item3'].map(x =>
          m('option', x)
        )
      )
    ]
  }
}

m.mount(document.body, app)
~~~

## CSS

~~~css
label {
  display: block
}
~~~