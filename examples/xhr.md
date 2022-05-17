---
title: XHR Request
abstract: This example was taken from the official website.
date: 2021-10-16
tags: [basics, official, m.request, m.mount, api]
level: beginner
version: latest
author: mithril
layout: layouts/example.html
---

This is a very simple example that shows how to do a request using Mithril.js' `m.request` API method.
When clicking on a button the app is doing a real XHR request and increases a counter.
The example was taken from the official website at <https://mithril.js.org/index.html#xhr>.

## HTML

~~~html
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>XHR</title>
</head>
<body>
</body>
</html>
~~~

## JavaScript

~~~js
var root = document.body
var count = 0

var increment = function() {
  m.request({
    method: "PUT",
    url: "//rem-rest-api.herokuapp.com/api/tutorial/1",
    body: {count: count + 1},
    withCredentials: true,
  })
    .then(function(data) {
      count = parseInt(data.count)
    })
}

var Hello = {
  view: function() {
    return m("main", [
      m("h1", {
        class: "title"
      }, "My first app"),
      m("button", {
        onclick: increment
      }, count + " clicks"),
    ])
  }
}

m.mount(root, Hello)
~~~
