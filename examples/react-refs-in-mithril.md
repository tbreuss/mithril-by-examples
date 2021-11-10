---
title: React Refs in Mithril
desc: Shows how access dom nodes of a component, much like reacts refs.
date: 2021-10-26
tags: [dom, react, m.mount, vnode, oncreate]
level: beginner
version: 2.0.4
author: stephanhoyer
layout: layouts/example.html
---

## JavaScript

~~~js
function findRef(dom, ref) {
  return dom.matches(`[ref=${ref}]`) ? dom : dom.querySelector(`[ref=${ref}]`)
}

const MyComponent = {
  oncreate(vnode) {
    const title = findRef(vnode.dom, 'title')
    title.style.color = 'red'
  },
  view() {
     return m('h1', { ref: 'title' }, 'abc')
  }
}

m.mount(document.body, MyComponent)
~~~
