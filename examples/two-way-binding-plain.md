---
title: Two-Way Binding - Plain
abstract: This is an example showing two-way binding with Mithril.js' onboard tools.
date: 2020-09-24
tags: [form, two-way-binding, m.mount]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This is an example showing two-way binding with Mithril.js' onboard tools.
Normally, this is solved by using an oninput event handler together with an external variable.
And exactly this can we see in this example.

## JavaScript

~~~js
const app = () => {
  let text = ''

  return {
    view: () => [
      m('h1', `text: ${text}`),
      m('input', {
        oninput: e => text = e.target.value,
        value: text
      })
    ]
  }
}

m.mount(document.body, app)
~~~
