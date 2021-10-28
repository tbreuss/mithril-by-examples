---
title: Re-initializing a Component Every Time - Without Routing
date: 2020-09-24
tags: [component, key]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Re-init a component every time.

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
