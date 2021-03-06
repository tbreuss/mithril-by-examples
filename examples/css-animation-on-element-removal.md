---
title: CSS Animation on Element Removal
abstract: Mithril.js offers the `onbeforeremove` hook that allows us to defer the removal of an element.
date: 2021-10-19
tags: [basics, animation, official, m.mount, vnode, dom, onbeforeremove]
level: beginner
version: latest
author: mithril
layout: layouts/example.html
---

This is an example using CSS animation on element removal.
The difficulty here is that we must wait until the animation is complete before we can actually remove the element.
Therefore Mithril.js offers the `onbeforeremove` hook that allows us to defer the removal of an element.
This example was taken from the official website at <https://mithril.js.org/animation.html#animation-on-element-removal> and slightly modified.

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
