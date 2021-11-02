---
title: Loading Message
date: 2020-09-24
tags: [loading, m.request, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Example showing a loading message while loading external data.

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
