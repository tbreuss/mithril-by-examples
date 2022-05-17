---
title: Markdown Editor
abstract: This example shows a very simple markdown editor using marked.js.
date: 2021-10-27
tags: [3rd-party, markdown, editor, official, m.trust, m.mount]
level: beginner
version: latest
author: mithril
layout: layouts/example.html
flems:
  links:
   - marked@0.6.0
---

This example shows a very simple markdown editor using marked.js.
Here we can also see how easy it is with Mithril.js to integrate and use 3rd-party libraries.
The example was taken from the official website at <https://mithril.js.org/examples.html> and slightly modified.

## JavaScript

~~~js
//model
var state = {
	text: "# Markdown Editor\n\nType on the top panel and see the result on the bottom panel",
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
    height: 50%;
    margin: 0;
    padding: 10px;
    width: 100%;
}

.input {
    border: 0;
    border-bottom: 1px solid #ccc;
    outline: none;
    resize: none;
}
~~~
