---
title: Markdown Editor
date: 2021-10-27
tags: [markdown, editor, official]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
flems:
  links:
    - name: marked.min.js
    - type: js
    - url: https://cdnjs.cloudflare.com/ajax/libs/marked/3.0.8/marked.min.js
---

This example was taken from the official website at <https://mithril.js.org/examples.html> and slightly modified.
It shows a very simple markdown editor using marked.js.

## JS

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
