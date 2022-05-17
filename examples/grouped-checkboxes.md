---
title: Grouped Checkboxes
abstract: Form with multiple checkboxes that are grouped so that only one checkbox per group can be selected, like radio buttons.
date: 2021-10-24
tags: [form, checkbox, radiobutton, m.mount]
level: beginner
version: latest
author: osban
layout: layouts/example.html
---

This example shows a form with multiple checkboxes that are grouped so that only one checkbox per group can be selected.
So, the behavior of the checkboxes is like radio buttons.
The example shows also, how to use simple helper functions to make Mithril.js code simpler.

## JavaScript

~~~js
const list = [
  [
    {label: "1", groupId: 0},
    {label: "2", groupId: 0},
    {label: "5", groupId: 0}
  ],
  [
    {label: "4", groupId: 1},
    {label: "3", groupId: 1}
  ],
  [
    {label: "6", groupId: 2},
    {label: "7", groupId: 2}
  ]
]

const model = []

const checkboxView = ({groupId, label}) => {
  const checked = model[groupId] === label
  return m('label',
    m('input[type=checkbox]', {
      checked,
      onchange: () => model[groupId] = checked ? '' : label,
    }),
    label
  )
}

const groupView = attrs => m('div', attrs.map(checkboxView))

const app = {
  view: () => [
    m('h1', 'Checkbox Groups'),
    list.map(groupView),
    m('p', model.filter(x => x).join(',')),
  ]
}

m.mount(document.body, app)
~~~

## CSS

~~~css
label { display: inline-block }
~~~
