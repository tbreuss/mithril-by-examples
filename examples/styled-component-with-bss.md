---
title: Styled Component with BSS
abstract: Use bss (Better Style Sheets) like styled components, but way simpler.
date: 2021-10-16
tags: [bss, css, m.mount]
level: beginner
version: 1.1.6
author: porsager
layout: layouts/example.html
flems:
  links:
    - bss@1.2.10
---

Use bss (Better Style Sheets) like styled components, but way simpler.

## JavaScript

~~~js
const Button = 'button' + b`
  bc tomato
  c white
  p 12 24
  fs 16
  tt uppercase
  border none
  br 3
  min-width 120
  cursor pointer
  transition 0.3 transform, 0.3 opacity
  bs 0 1 2 rgba(0,0,0,.35)
  -webkit-font-smoothing: antialiased;
`.$hover`
  transform translateY(-1px)
  filter brightness(130%)
  bs 0 1 5 rgba(0,0,0,.35)
`.$active`
  filter brightness(100%)
  transform translateY(0)
  filter
  bs 0 1 0 rgba(0,0,0,.35)
`

m.mount(document.body, {
  view: () =>
    m(Button, {
      onclick: () => p('clicked')
    }, 'Test button')
})
~~~

