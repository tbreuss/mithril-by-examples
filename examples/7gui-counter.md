---
title: Counter from 7GUIs
date: 2021-10-18
tags: [7guis, m.mount]
level: beginner
version: latest
author: narayand16
layout: layouts/example.html
---

This is the 7GUIs counter example implemented in Mithril.js.
The challenge here is to understand the basic ideas of a language/toolkit.

The task is to build a frame containing a label or read-only textfield T and a button B.
Initially, the value in T is “0” and each click of B increases the value in T by one.

See the original description at the 7GUIs homepage: <https://eugenkiss.github.io/7guis/tasks#counter>.

## JavaScript

~~~js
let root = document.body
let count = 0

let Counter = {
  view: function() {
    return m("main", [
      m("input[readonly=true]", {
        value: count
      }),
      m("button", {
        onclick: function() {count++}
      }, "Count")
    ])
  }
}

m.mount(root, Counter)
~~~

## HTML

~~~html
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>Counter</title>
</head>
<body>
</body>
</html>
~~~
