---
title: Icon Component
abstract: This example shows a solution for a simple Icon component and suitable SVG icons.
date: 2022-02-06
tags: [component, icons, m.mount, svg]
level: beginner
version: 2.0.4
author: tbreuss
layout: layouts/example.html
---

Have you already needed icons in your Mithril.js project and didn't know the easiest way to do this? Here comes a solution with a simple Icon component and suitable SVG icons. In this case we are using icons from [Feather Icons](https://feathericons.com/). So, the idea is to put the SVG code into the Icon Component, give it a suitable name and then use it by simply applying the Icon Component with the appropriate parameters. And the nice thing is, that you can use your own CSS classes too, see below.

## JavaScript

~~~js
const icons = {
  'heart': (cssClass) => `<svg class="${cssClass}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  'checked': (cssClass) => `<svg class="${cssClass}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`,
  'help': (cssClass) => `<svg class="${cssClass}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
}

const Icon = {
  view: (v) => {
    if (v.attrs.name in icons) {
      let cssClass = v.attrs.class || ''
      return m.trust(icons[v.attrs.name](cssClass))
    }
    return ''
  }
}

const app = () => {
  return {
    view: () => m('div',
      m('h1', 'The Mithril.js Way'),
      m('ul',
        m('li', m(Icon, {name: 'help', class: 'yellow'}), m('span', 'Doubt it?')),
        m('li', m(Icon, {name: 'checked', class: 'green'}), m('span', 'Try it.')),
        m('li', m(Icon, {name: 'heart', class: 'red'}), m('span', 'Love it!'))
      )
    )
  }
}

m.mount(document.body, app)
~~~

## Styles

~~~css
@import "https://unpkg.com/water.css@2/out/water.min.css";
ul {
  padding-left: 0;
}
li {
  list-style-type: none;
  margin-bottom: 1rem;
}
span {
  font-size: 2.2rem;
  line-height: 2.2rem;
  display: inline-block;
  vertical-align: top;
  margin-left: 1rem;
}
svg {
  height: 2.2rem;
  width: auto;
}
.red {
  stroke: red;
  fill: red;
}
.green {
  stroke: green;
}
.yellow {
  stroke: yellow;
}
~~~
