---
title: Re-initializing a Component Using Key - With Routing
abstract: An example showing four options with routing and components which are using key.
date: 2020-09-24
tags: [component, key, m.route, vnode]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

To distinguish similar vnodes from eachother, use the KEY attribute (keyword), and give it a unique value.
Keep in mind that all siblings must be keyed for it to work.
See also the Mithril docs.
This can be used to force a component to re-instantiate/re-initialize.
In this example 4 options with routing. Date.now() is used to make sure the KEY is different each time.
To try out the different options, change the default route to the specific option.

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
    m('p', 'page2 ' + m.route.param('key')),
    m('button', {onclick: () => m.route.set('/page2/' + Date.now())}, 're-init')
  ]
}

// option 3 -> id is passed as url parameter and also used as key
const page3 = {
  oninit: () => {console.log('init3')},
  view: vnode => [
    m('p', 'page3 ' + vnode.attrs.id),
    m('button', {onclick: () => m.route.set('/page3/' + Date.now())}, 're-init')
  ]
}

// option 4 -> use m.route.set() to re-init the current page
const page4 = {
  oninit: () => {console.log('init4')},
  view: vnode => [
    m('p', 'page4 ' + (vnode.attrs.key || '')),
    m('button', {onclick: () => m.route.set(m.route.get(), {key: Date.now()})}, 're-init')
  ]
}

m.route(document.body, '/page4', {
  '/page1'     : page1,
  '/page2/:key': page2,
  '/page3/:id' : {render: vnode => [m(page3, {id: vnode.attrs.id, key: vnode.attrs.id})]},
  '/page4'     : {render: vnode => [m(page4, {key: vnode.attrs.key})]}
})
~~~
