---
title: Two-Way Binding - With m.stream
desc: This is an example showing two-way binding with mithrils own stream library.
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


~~~js
const s = m.stream

const app = () => {
  const text = s('')

  return {
    view: () => [
      m('h1', `text: ${text()}`),
      m('input', {oninput: e => text(e.target.value)})
    ]
  }
}

m.mount(document.body, app)
~~~
