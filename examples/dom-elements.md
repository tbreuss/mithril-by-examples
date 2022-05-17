---
title: DOM Elements
abstract: This example was taken from the official website.
date: 2021-10-16
tags: [basics, official, m.render]
level: beginner
version: latest
author: mithril
layout: layouts/example.html
---

This is a basic example showing Mithril.js' `m()` function to describe any HTML structure you want.
So, here we see some markup together with a CSS class on the title element.
This example was taken from the official website at <https://mithril.js.org/index.html#dom-elements>.

## HTML

~~~html
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>DOM Elements</title>
</head>
<body>
</body>
</html>
~~~

## JavaScript

~~~js
let root = document.body
m.render(root, [
  m("main", [
    m("h1", {class: "title"}, "My first app"),
    m("button", "A button"),
  ])
])
~~~
