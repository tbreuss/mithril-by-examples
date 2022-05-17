---
title: Generic Button Component
abstract: Nice example using a data binding helper function.
date: 2020-09-24
tags: [component, button, m.mount]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This is an example showing a generic button component, that can be used to render buttons in different types, colors, floats, and more.
It shows also, that implementing a custom compononent in Mithril.js is really simple.

## JavaScript

~~~js
const Button = {
  view: ({attrs: {type, text, onclick, color, disabled, left}}) =>
    m('button', {
      class: color || 'grey',
      type:  type  || 'button',
      disabled,
      onclick,
      style: 'float: ' + (left ? 'none' : 'right')
    }, text)
}

const app = {
  view: () =>
    m('div',
      m(Button, {text: 'bye',   color: 'blue', left: true}),
      m(Button, {text: 'hello', color: 'red',  left: true, onclick: () => p('click!')}),
      m(Button, {text: 'error', color: 'green'}),
      m(Button, {text: 'test'})
    )
}

m.mount(document.body, app)
~~~

## CSS

~~~css
button {
   height: 36px;
   margin-left: 10px;
   padding: 0 16px;
   border: 0;
   border-radius: 4px;
   text-transform: uppercase;
   font-weight: 500px;
   font-size: 14px;
   min-width: 64dp;
   cursor: pointer;
   outline: none
}

.grey {
  background-color: #f1f1f1;
  color: #616161
}

.grey:hover {
  background-color: #ccc
}

.blue {
  background-color: #349cfb;
  color: #fff
}

.blue:hover {
  background-color: #2c83d4
}

.red {
  background-color: #eb2024;
  color: #fff
}

.red:hover {
  background-color: #b6191c
}

.green {
  background-color: #33b679;
  color: #fff
}

.green:hover {
  background-color: #2a9928
}
~~~
