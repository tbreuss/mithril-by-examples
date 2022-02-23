---
title: Two-Way Binding - With m.stream
abstract: This is an example showing two-way binding with mithrils own stream library.
date: 2020-09-24
tags: [form, two-way-binding, m.stream, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
flems:
  links:
    - mithril-stream/stream.js
---

This is an example showing two-way binding with Mithril.js' own stream library.
Here we can see the use of `m.stream` for a single variable which is then updated in the oninput event handler.

## JavaScript

~~~js
const s = m.stream

const app = () => {
  const text = s('')

  return {
    view: () => [
      m('h1', `text: ${text()}`),
      m('input', {
        oninput: e => text(e.target.value)
      })
    ]
  }
}

m.mount(document.body, app)
~~~
