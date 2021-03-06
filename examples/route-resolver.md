---
title: Route Resolver
abstract:
date: 2020-09-24
tags: [route, resolver, m.route]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This example shows how to use Mithril.js' own router.

## JavaScript

~~~js
const about = {
  view: () =>
    m('div',
      m('h1', "About"),
      m('a', {onclick: () => m.route.set('/')}, "CLICK")
    )
}

const home = {
  view: () =>
    m('div',
      m('h1', "Home"),
      m('a', {onclick: () => m.route.set('/about')}, "CLICK")
    )
}

m.route(document.body, '/', {
  '/'     : home,
  '/about': about
})
~~~

## CSS

~~~css
a:hover {
  cursor: pointer;
  color: green
}
~~~
