---
title: Vnode Examples of Passing Variables In
abstract: This is an example using Vnodes passing some variables in.
date: 2020-09-24
tags: [vnode, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is an example that shows how to pass variables into a component using Vnode.
The first variant is using vnode itself, while the second one is using the same, but with a shorter variable name.
More interesting are the other two, that are using destructuring assignment JavaScript expressions, the latter one even with nested destructuring.

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
