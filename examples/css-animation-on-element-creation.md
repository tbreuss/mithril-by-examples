---
title: CSS Animation on Element Creation
abstract: Animating an element via CSS when the element is created is simple. Just add an animation to a CSS class normally.
date: 2021-10-19
tags: [basics, animation, official, m.mount]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
---

A simple example animating an element via CSS when the element is created.
This is straight-forward by just adding an CSS animation to a class normally.
There is no need for specific Mithril.js code.
This example was taken from the official website at <https://mithril.js.org/animation.html#animation-on-element-creation> and slightly modified.

## Styles

~~~css
.fancy {
  animation:fade-in 2.0s;
  font-size: 2rem;
}
@keyframes fade-in
{
  from {opacity:0;}
  to {opacity:1;}
}
~~~

## JavaScript

~~~js
const FancyComponent = {
    view: function() {
        return m(".fancy", "Hello world")
    }
}

m.mount(document.body, FancyComponent)
~~~
