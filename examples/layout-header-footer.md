---
title: Layout with Header, Body, and Footer
abstract: A layout example with header, body, and footer sections.
date: 2020-09-24
tags: [layout, m.route]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

This is an example that shows, how to use a minimal Layout component with a simplified header and footer section together with a minimal Page component, that is responsible for rendering the content section.
The example is greatly simplified, but shows the basic use case.

## JavaScript

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
