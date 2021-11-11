---
title: Components
desc: "This example was taken from the official website at <https://mithril.js.org/index.html#components>."
date: 2021-10-16
tags: [basics, component, official, m.mount]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
---

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
