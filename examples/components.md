---
title: Components
abstract: This example was taken from the official website.
date: 2021-10-16
tags: [basics, component, official, m.mount]
level: beginner
version: latest
author: mithril
layout: layouts/example.html
---

This is an example of a very simple Mithril.js component, which is just an object with a view function.
To activate the component, we have to use `m.mount`.
The example was taken from the official website at <https://mithril.js.org/index.html#components>.

## HTML

~~~html
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>Components</title>
</head>
<body>
</body>
</html>
~~~

## JavaScript

~~~js
let root = document.body
let count = 0 // added a variable

let Hello = {
  view: function() {
    return m("main", [
      m("h1", {
        class: "title"
      }, "My first app"),
      m("button", {
        onclick: function() {count++}
      }, count + " clicks")
    ])
  }
}

m.mount(root, Hello)
~~~
