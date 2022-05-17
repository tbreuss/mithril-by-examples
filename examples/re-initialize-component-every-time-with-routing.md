---
title: Re-initializing a Component Every Time - Without Routing
abstract: Re-init a component every time.
date: 2020-09-24
tags: [component, key, m.route, oninit]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

Re-init a component every time.

## JavaScript

~~~js
const closure = () => {
  console.log('init closure')

  return {
    view: () => [
      m('button', {onclick: () => m.route.set('/plop/123')}, 'click'),
      m('div', 'test')
    ]
  }
}

const pojo = {
  oninit: () => console.log('init pojo'),
  view: () => [
    m('button', {onclick: () => m.route.set('/plop/123')}, 'click'),
    m('div', 'test')
  ]
}

m.route(document.body, '/plop/123', {
  '/plop/:id': {
    onmatch: () => ({view: v => m(closure, v.attrs)})
    // onmatch: () => ({...pojo})
  }
})
~~~
