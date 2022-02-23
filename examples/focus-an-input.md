---
title: Focus an Input
abstract: Shows how to focus an input element on load right away.
date: 2021-10-22
tags: [form, input, focus, dom, m.mount, oncreate]
level: beginner
version: 2.0.4
author: stephanhoyer
layout: layouts/example.html
---

This example shows how to focus an input element on load right away.
It is doing so by using Mithril.js' `oncreate` lifecycle method, that is called after a DOM element is created and attached to the document.

## JavaScript

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
