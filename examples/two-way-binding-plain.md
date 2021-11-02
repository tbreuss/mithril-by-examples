---
title: Two-Way Binding - Plain
date: 2020-09-24
tags: [form, two-way-binding, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---


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
