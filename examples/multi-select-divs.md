---
title: Multi Select List of DIVs
desc:
date: 2020-09-24
tags: [select, form, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

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
