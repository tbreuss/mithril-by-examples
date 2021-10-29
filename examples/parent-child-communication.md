---
title: Parent-Child Communication
date: 2020-09-24
tags: [component, communication]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Parent-child communication where a child changes the parent.

~~~js
const getmsg = {
  view: v =>
    m("input", {
      value: v.attrs.msg,
      oninput: e => v.attrs.change(e.target.value)
    })
}

const app = () => {
  let msg = 'start'

  return {
    view: () => [
      m(getmsg, {
        msg,
        change: value => {msg = value}
      }),
      m('h1', msg)
    ]
  }
}

m.mount(document.body, app)
~~~