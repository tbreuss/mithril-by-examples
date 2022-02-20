---
title: Modal with Internal State
abstract:
date: 2020-09-24
tags: [modal, state, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

In this example we see a Modal component using internal state.
For the content of the modal we have a Content component, that supports different types of modals like Alert, Confirmation, or others.
Type and message attributes are injected into the Modal component, therefore no external state is needed.

## JavaScript

~~~js
const Content = {
  alert: {
    view: ({attrs: {text, click}}) => [
      m('div.c1',
        m('div.c2', text),
        m('button', {onclick: click}, "OK")
      )
    ]
  }
}

const Modal = {
  view: ({attrs: {type, content}}) => [
    m('div.modal',
      m(Content[type], content)
    )
  ]
}

const App = () => {
  let showmodal = false

  return {
    view: () => [
      m('h1', "TEST"),
      m('button', {onclick: () => showmodal = true}, "modal"),
      showmodal &&
      m(Modal, {type: 'alert', content: {text: "This is an alert", click: () => showmodal = false}})
    ]
  }
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
