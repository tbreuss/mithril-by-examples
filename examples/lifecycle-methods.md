---
title: Lifecycle Methods
abstract: An example showing all lifecycle methods from Mithril.
date: 2021-10-19
tags: [component, lifecycle, official, m.mount, vnode, onbeforeupdate, onremove, onbeforeremove, onupdate, oncreate, oninit]
level: intermediate
version: 2.0.4
author: mithril
layout: layouts/example.html
---

An example showing all lifecycle methods from Mithril.

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


This example was taken from the official website at <https://mithril.js.org/components.html#lifecycle-methods> and slightly modified.
