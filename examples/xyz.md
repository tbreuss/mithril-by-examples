---
title: XYZ Example to Show How Things Work
abstract: This example is for demonstration purposes only to show how things work.
date: 2021-01-17
tags: [basics, m.mount]
level: beginner
version: latest
author: tbreuss
layout: layouts/example.html
flems:
  files:
    - index.html
    - app.css
    - component.js
    - app.js
---

This example is for demonstration purposes only and shows how things work with Eleventy, markdown, and rendering filters and functions.

## HTML

~~~html
<!-- index.html -->
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>XHR</title>
</head>
<body>
<div id="xyz"></div>
</body>
</html>
~~~

## CSS

~~~css
/* app.css */
@import "https://unpkg.com/water.css@2/out/water.min.css";
~~~

## Component.js

~~~js
// component.js
const XYZ = {
  view: function() {
    return m("main", [
      m("h1", {}, "XYZ Example"),
      m("p", "This is just an example to show how things work.")
    ])
  }
}
~~~

## App.js

~~~js
// app.js
m.mount(document.getElementById('xyz'), XYZ)
~~~
