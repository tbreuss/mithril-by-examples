---
title: Loading Message
abstract: Example showing a loading message while loading external data.
date: 2020-09-24
tags: [loading, m.request, m.mount, m.redraw]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is an example showing a loading message using the conditional ternary operator while loading external data.
In Mithril.js using the ternary operator is one of the ofting seen practices.

Note: You have to click the refresh button in Flems to see the loading message.

## JavaScript

~~~js
const app = () => {
  let result = ''

  // m.request('/url').then(res => result = res)
  setTimeout(() => {result = 'Woohoo!'; m.redraw()}, 2000)

  return {
    view: () =>
      !result
        ? m('div', 'Loading...')
        : m('div', result)
  }
}

m.mount(document.body, app)
~~~
