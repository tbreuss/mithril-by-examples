---
title: Generic Button Component
date: 2020-09-24
tags: [component, button, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Nice example using a data binding helper function.

## JS

~~~js
const button = {
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
      m(button, {text: 'bye',   color: 'blue', left: true}),
      m(button, {text: 'hello', color: 'red',  left: true, onclick: () => p('click!')}),
      m(button, {text: 'error', color: 'green'}),
      m(button, {text: 'test'})
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
