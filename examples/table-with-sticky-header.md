---
title: Table with Sticky Header
date: 2021-10-24
tags: [table, sticky, header, m.mount]
level: beginner
version: 2.0.4
author: spacejack
layout: layouts/example.html
---

This example shows how to create a table with a sticky header.

## CSS

~~~css
.sticky-table {
  display: inline-block;
  max-height: 30em;
  overflow-x: hidden; /* Prevent Firefox h-scrollbar */
  overflow-y: auto;
  border: #666 1px solid;
  border-collapse: collapse;
}

.sticky-table th {
  text-align: left;
  position: sticky;
  top: 0;
  background-color: #DDD;
}

.sticky-table td {
  padding-right: 1em; /* Prevent Firefox overlap scrollbar */
}
~~~

## JavaScript

~~~js
function range(n) {
  return Array.from(Array(n).keys())
}

const randText = (function(){
  const letters = 'abcdefghijklmnopqrstuvwxyz '
  return function randText() {
    const len = 3 + Math.floor(Math.random() * 12)
    let s = ''
    for (let i = 0; i < len; ++i) {
      s += letters[Math.floor(Math.random() * letters.length)]
    }
    return s
  }
}())

const rows = 75
const cols = 5

const data = range(rows).map(() => range(cols).map(randText))

const StickyTable = {
  view() {
    return m('table.sticky-table',
      m('thead',
        m('tr',
          range(cols).map(c => m('th', randText()))
        )
      ),
      m('tbody',
        data.map(row => m('tr',
          row.map(col => m('td', col))
        ))
      )
    )
  }
}

m.mount(document.body, StickyTable)
~~~
