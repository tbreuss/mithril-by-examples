---
title: Route Resolver
desc:
date: 2020-09-24
tags: [route, resolver, m.route]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

## JS

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
