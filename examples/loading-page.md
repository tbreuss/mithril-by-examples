---
title: Loading Page
date: 2020-09-24
tags: [loading, m.mount, oninit]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Example showing a loading page while loading external data.

~~~js
const model = {
  data: []
}

const Loading = {view: () => m('h1', "Loading...")}

const Main = {
  oninit: () => {
    // fetch data here
  },
  view: () => [
    !model.data.length
      ? m(Loading)
      : m('div', "The normal page")
  ]
}

m.mount(document.body, Main)
~~~
