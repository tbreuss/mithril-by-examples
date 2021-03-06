---
title: Lifecycle Methods
abstract: An example showing all lifecycle methods from Mithril.js.
date: 2021-10-19
tags: [component, lifecycle, official, m.mount, vnode, onbeforeupdate, onremove, onbeforeremove, onupdate, oncreate, oninit]
level: intermediate
version: latest
author: mithril
layout: layouts/example.html
---

Here we have an example showing all lifecycle methods from Mithril.js.
This is very useful for seeing how things work and in what order.
The example was taken from the official website at <https://mithril.js.org/components.html#lifecycle-methods> and slightly modified.

## JavaScript

~~~js
var ComponentWithHooks = {
    oninit: function(vnode) {
        console.log("initialized")
    },
    oncreate: function(vnode) {
        console.log("DOM created")
    },
    onbeforeupdate: function(newVnode, oldVnode) {
        return true
    },
    onupdate: function(vnode) {
        console.log("DOM updated")
    },
    onbeforeremove: function(vnode) {
        console.log("exit animation can start")
        return new Promise(function(resolve) {
            // call after animation completes
            resolve()
        })
    },
    onremove: function(vnode) {
        console.log("removing DOM element")
    },
    view: function(vnode) {
        return "hello"
    }
}

function initialize(vnode) {
  console.log("initialized as vnode")
}

m.mount(document.body, {
  view: () => m(ComponentWithHooks, {oninit: initialize})
});
~~~
