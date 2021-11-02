---
title: Focus an Input
date: 2021-10-22
tags: [form, input, focus, dom, m.mount]
level: beginner
version: 2.0.4
author: stephanhoyer
layout: layouts/example.html
---

Shows how to focus an input element on load right away.

~~~js
m.mount(document.body, {
  view: () => [
    m('input[autofocus]', {
      oncreate: ({dom}) => setTimeout(() => dom.focus())
    }),
    m('p', 'Click the refresh button in Flems to see the effect')
  ]
})
~~~
