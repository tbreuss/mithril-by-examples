---
title: Layout with Header, Body, and Footer
date: 2020-09-24
tags: [layout]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

A layout example with header, body, and footer sections.

~~~js
const layout = {
  view: v =>
    m('div',
      m('.header', 'HEADER'),
      v.children,
      m('.footer', 'FOOTER')
    )
}

const page = {
  view: () => m('p', 'page')
}

m.route(document.body, '/', {
  '/': {render: () => m(layout, m(page))}
})
~~~
