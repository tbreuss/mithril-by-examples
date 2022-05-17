---
title: Multi Select List of DIVs
abstract:
date: 2020-09-24
tags: [select, form, m.mount]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This is an example, that shows a checkbox like behavior, but for DIV elements.
So, clicking on a div item in a list, toggles it to checked/uncheck state.

## JavaScript

~~~js
const app = () => {
  let arr = [
    {checked: false, text: 'Item1'},
    {checked: false, text: 'Item2'},
    {checked: false, text: 'Item3'}
  ]

  return {
    view: () => [
      m('h1', 'Select'),
      arr.map((x,i) =>
        m('div', {
          style: `color: ${arr[i].checked ? 'red' : 'blue'}; cursor: pointer`,
          onclick: () => arr[i].checked = !arr[i].checked
        }, x.text)
      )
    ]
  }
}

m.mount(document.body, app)
~~~
