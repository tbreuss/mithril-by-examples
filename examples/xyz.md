---
title: XYZ Example to Show How Things Work
date: 2021-01-17
tags: [basics]
level: beginner
version: 2.0.4
author: ""
credits: []
links: []
layout: layouts/example.html
flems:
  files:
    - index.html
    - app.css
    - component.js
    - app.js
---

This example is for demonstration purposes only to show how things work.

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
body {
  background-color: lightblue;
  color: darkblue;
}
~~~

## JavaScript

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

~~~js
// app.js
m.mount(document.getElementById('xyz'), XYZ)
~~~
