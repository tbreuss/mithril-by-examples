---
title: Markdown Editor
abstract: This example shows a very simple markdown editor using marked.js.
date: 2021-10-27
tags: [markdown, editor, official, m.trust, m.mount]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
flems:
  files: []
  links: []
---

This example was taken from the official website at <https://mithril.js.org/examples.html> and slightly modified.
It shows a very simple markdown editor using marked.js.
Visit <https://mithril.js.org/examples.html> to see a live demo.

## JavaScript

~~~js
//model
var state = {
	text: "# Markdown Editor\n\nType on the left panel and see the result on the right panel",
	update: function(value) {
		state.text = value
	}
}

//view
var Editor = {
	view: function() {
		return [
			m("textarea.input", {
				oninput: function (e) {
				  state.update(e.target.value)
        },
				value: state.text
			}),
			m(".preview", m.trust(marked(state.text))),
		]
	}
}

m.mount(document.body, Editor)
~~~

## CSS

~~~css
html, body {
    height: 100%;
    margin: 0;
}

h1, h2, h3, h4, h5, h6, p {
    margin: 0 0 10px;
}

#editor {
    display: flex;
    height: 100%;
}

.input, .preview {
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    padding: 10px;
    width: 50%;
}

.input {
    border: 0;
    border-right: 1px solid #ccc;
    outline: none;
    resize: none;
}
~~~
