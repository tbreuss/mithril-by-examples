---
title: CSS Animation on Element Removal
date: 2021-10-19
tags: [basics, animation, official, m.mount, vnode, dom, onbeforeremove]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
---

Mithril offers the `onbeforeremove` hook that allows us to defer the removal of an element.


## Styles

~~~css
.fancy {
  font-size: 2rem;
}
.exit {
  animation:fade-out 2.0s;
  font-size: 2rem;
}
@keyframes fade-out {
  from {opacity:1;}
  to {opacity:0;}
}
~~~

## JavaScript

~~~js
var on = true

var Toggler = {
  view: function() {
    return [
      m("button", {onclick: function() {on = !on}}, "Toggle"),
      on ? m(FancyComponent) : null,
    ]
  }
}

var FancyComponent = {
  onbeforeremove: function(vnode) {
    vnode.dom.classList.add("exit")
    return new Promise(function(resolve) {
      vnode.dom.addEventListener("animationend", resolve)
    })
  },
  view: function() {
    return m(".fancy", "Hello world")
  }
}

m.mount(document.body, Toggler)
~~~

This example was taken from the official website at <https://mithril.js.org/animation.html#animation-on-element-removal> and slightly modified.
