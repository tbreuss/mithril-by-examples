---
title: Modal External State
desc:
date: 2020-09-24
tags: [modal, state, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

## JS

~~~js
let state = {
  modal: null
}

const Modal = {
  view: () =>
    m('div.modal',
      m('div.c1',
        m('div.c2', state.modal.text),
        m('button', {onclick: () => state.modal = null}, 'OK')
      )
    )
}

const App = {
  view: () => [
    m('h1', 'TEST'),
    m('button', {onclick: () => state.modal = {text: 'This is a modal'}}, 'show modal'),
    state.modal && m(Modal)
  ]
}

m.mount(document.body, App)
~~~

## CSS

~~~css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.c1 {
  text-align: center;
  padding-bottom: 40px;
  width: 200px;
  height: 100px;
  background: white
}

.c2 {
  padding-top: 40px;
  margin-bottom: 20px
}
~~~
