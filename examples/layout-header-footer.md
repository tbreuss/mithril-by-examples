---
title: Layout with Header, Body, and Footer
desc: A layout example with header, body, and footer sections.
date: 2020-09-24
tags: [layout, m.route]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

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
