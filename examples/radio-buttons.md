---
title: Radio Buttons
abstract:
date: 2020-09-24
tags: [form, input, radiobutton, m.mount]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

Handling radio and checkboxes is often a little bit special.
This example demonstrates how to use radio buttons in a Mithril.js application.

## JavaScript

~~~js
const model = {
  yesno: "Yes"
}

const app = {
  view: () => [
    m('h1', "Radio"),
    ["Yes", "No"].map(x =>
      m('label',
        m('input', {
          type: 'radio',
          id: x,
          name: 'test',
          checked: model.yesno === x,
          onchange: () => model.yesno = x,
          value: x
        }),
        x
      )
    )
  ]
}

m.mount(document.body, app)
~~~

## CSS

~~~css
label {
  display: block
}
~~~
