---
title: Vnode Examples of Passing Variables In
desc: This is an example using Vnodes passing some variables in.
date: 2020-09-24
tags: [vnode, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

## JavaScript

~~~js
const full   = {view: vnode => m('h1', vnode.attrs.test)}
const short  = {view: v => m('h1', v.attrs.test)}
const dest   = {view: ({attrs}) => m('h1', attrs.test)}
const destf  = {view: ({attrs: {test}}) => m('h1', test)}

m.mount(document.body, {
  view: () => [
    m(full,  {test: "full"}),
    m(short, {test: "short"}),
    m(dest,  {test: "destructured"}),
    m(destf, {test: "fully destructured"})
  ]
})
~~~
