---
title: Force Component Re-Init with Routing
abstract: Force a component to re-initialize by passing a key attribute when changing routes (four examples).
date: 2021-10-16
tags: [component, key, m.route, vnode, oninit]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This is an example that forces a component to re-initialize by passing a key attribute when changing routes (four examples).
Keys are used usually to distinguish similar vnodes from one another.
However, due to how Mithril.js treats keyed vnodes, we can use keys to force a vnode to be re-created.
This could be useful for situations wherein we want to, say, modify attributes of a 3rd-party component that doesn't provide an API to do so - we could simply force the component to be re-created with new values.

In this example we see four options with routing.
Date.now() is used to make sure the key is different each time.
Thus, on a redraw, when Mithril.js doesn't find a new vnode with the old key, it discards the old vnode, and creates a new one with the new key, and new values.

Keep in mind that every sibling needs a key, otherwise it doesn't work.

## JavaScript

~~~js
// option 1 -> key is passed via attrs
const page1 = {
  oninit: () => {console.log('init1')},
  view: vnode => [
    m('p', 'page1 ' + (vnode.attrs.key || '')),
    m('button', {onclick: () => m.route.set('/page1', {key: Date.now()})}, 're-init')
  ]
}

// option 2 -> key is passed as url parameter
const page2 = {
  oninit: () => {console.log('init2')},
  view: () => [
    text(),
    m('p', 'page2 ' + m.route.param('key')),
    m('button', {onclick: () => m.route.set('/page2/' + Date.now())}, 're-init')
  ]
}

// option 3 -> id is passed as url parameter and also used as key
const page3 = {
  oninit: () => {console.log('init3')},
  view: vnode => [
    text(),
    m('p', 'page3 ' + vnode.attrs.id),
    m('button', {onclick: () => m.route.set('/page3/' + Date.now())}, 're-init')
  ]
}

// option 4 -> use m.route.set() to re-init the current page
const page4 = {
  oninit: () => {console.log('init4')},
  view: vnode => [
    text(),
    m('p', 'page4 ' + (vnode.attrs.key || '')),
    m('button', {onclick: () => m.route.set(m.route.get(), {key: Date.now()})}, 're-init')
  ]
}

m.route(document.body, '/page1', { // change to /page2/1, /page3/1, or /page4
  '/page1'     : page1,
  '/page2/:key': page2,
  '/page3/:id' : {render: vnode => m(page3, {id: vnode.attrs.id, key: vnode.attrs.id})},
  '/page4'     : {render: vnode => m(page4, {key: vnode.attrs.key})}
})
~~~
