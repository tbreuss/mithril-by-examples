---
title: Loading Page
abstract: Example showing a loading page while loading external data.
date: 2020-09-24
tags: [loading, m.mount, oninit]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

Here we see an example showing a loading page component while loading external data.
For this we are using the conditional ternary operator.
In Mithril.js the ternary operator is one of the often seen operators in view methods.

Note: You have to click the refresh button in Flems to see the loading message.

## JavaScript

~~~js
const model = {
  data: []
}

const Loading = {
  view: () => m('h1', 'Loading...')
}

const Main = {
  oninit: () => {
    // fake fetching data here
    setTimeout(() => {
      model.data = 'The page data';
      m.redraw()
    }, 2000)
  },
  view: () => [
    !model.data.length
      ? m(Loading)
      : [
        m('h1', 'The page'),
        m('div', model.data)
      ]
  ]
}

m.mount(document.body, Main)
~~~
