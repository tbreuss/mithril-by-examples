---
title: Routing
date: 2021-10-16
tags: [basics]
level: beginner
version: 2.0.4
author: ""
credits: []
links: []
layout: layouts/example.html
---

This example was taken from the official website at <https://mithril.js.org/index.html#routing>.

## HTML

~~~html
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>Routing</title>
</head>
<body>
</body>
</html>
~~~

## JavaScript

~~~js
let root = document.body
let count = 0

let Hello = {
  view: function() {
    return m("main", [
      m("h1", {
        class: "title"
      }, "My first app"),
      m("button", {
        onclick: function() {count++}
      }, count + " clicks"),
    ])
  }
}

let Splash = {
  view: function() {
    return m("a", {
      href: "#!/hello"
    }, "Enter!")
  }
}

m.route(root, "/splash", {
  "/splash": Splash,
  "/hello": Hello,
})
~~~
