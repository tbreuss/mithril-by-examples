---
title: Mosaic
date: 2021-10-27
tags: [animation, mosaic, official, m.render]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
---

This example was taken from the official website at <https://mithril.js.org/examples.html> and slightly modified.
It shows a mosaic effect on a picture using CSS.

## JS

~~~js
var root = document.body

var empty = []
var full = []
for (var i = 0; i < 100; i++) full.push(i)

var cells

function view() {
	return m(".container", cells.map(function(i) {
		return m(".slice", {
			style: {
			  backgroundPosition: (i % 10 * 11) + "% " + (Math.floor(i / 10) * 11) + "%"
      },
			onbeforeremove: exit
		})
	}))
}

function exit(vnode) {
	vnode.dom.classList.add("exit")
	return new Promise(function(resolve) {
		setTimeout(resolve, 1000)
	})
}

function run() {
	cells = cells === full ? empty : full
	m.render(root, [view()])
	setTimeout(run, 2000)
}

run()
~~~

## CSS

~~~css
#root {
  margin:auto;
  max-width:600px;
  width:100%;
}
.slice {
  animation:enter 1s;
  animation-fill-mode:forwards;
  background-image:url(https://raw.githubusercontent.com/MithrilJS/mithril.js/master/examples/animation/flowers.jpg);
  height:60px;
  float:left;
  opacity:0;
  width:60px;
}
.slice:nth-child(10n) {
  clear:right;
}
.exit {
  animation:exit 1s;
}

@keyframes enter {
	from {
    opacity:0;
    transform:rotate(-90deg) scale(0);
  }
	to {
    opacity:1;
    transform:rotate(0) scale(1);
  }
}

@keyframes exit {
	from {
    opacity:1;
    transform:rotate(0) scale(1);
  }
	to {
    opacity:0;
    transform:rotate(90deg) scale(0);
  }
}
~~~
