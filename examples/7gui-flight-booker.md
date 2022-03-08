---
title: Flight Booker from 7GUIs
date: 2022-03-08
tags: [7guis]
level: beginner
version: 2.0.4
author: tbreuss
layout: layouts/example.html
---

This is the 7GUIs flight booker example implemented in Mithril.js.
The challenges here are constraints.

The task is to build a frame containing a combobox C with the two options “one-way flight” and “return flight”, two textfields T1 and T2 representing the start and return date, respectively, and a button B for submitting the selected flight. T2 is enabled iff C’s value is “return flight”. When C has the value “return flight” and T2’s date is strictly before T1’s then B is disabled. When a non-disabled textfield T has an ill-formatted date then T is colored red and B is disabled. When clicking B a message is displayed informing the user of his selection (e.g. “You have booked a one-way flight on 04.04.2014.”). Initially, C has the value “one-way flight” and T1 as well as T2 have the same (arbitrary) date (it is implied that T2 is disabled).

See <https://eugenkiss.github.io/7guis/tasks#flight>.

## JavaScript

~~~js
const ONE_WAY = 'one-way'
const TWO_WAY = 'two-way'

const parseDate = (str) => {
  const m = str && str.match(/^(\d{2}).(\d{2}).(\d{4})$/)
  return m ? Date.parse(`${m[3]}-${m[2]}-${m[1]}`) : m
}

const formatDate = (time) => {
  const D = new Date(time)
  let d = D.getDate()
  d = (d <= 9 ? '0' : '') + d
  let m = D.getMonth() + 1
  m = (m <= 9 ? '0' : '') + m
  return `${d}.${m}.${D.getFullYear()}`
}

const canBook = (state) => {
  const leave = parseDate(state.leave)
  if (!leave) {
    return false
  }
  if (state.way === ONE_WAY) {
    return true
  }
  const back = parseDate(state.back)
  if (!back) {
    return false
  }
  return back > leave
}

const State = () => ({
})

const Actions = state => ({
  setDepart: () => {
    console.log('Set Depart')
  },
  setWay: () => {
    console.log('Set Way')
  },
  setReturn: () => {
    console.log('Set Return')
  },
  book: () => {
    console.log('Book')
  }
})

const FlightBooker = (state, actions) => [
  m('h1', 'Flight Booker'),
  m('div',
    m('select', { onchange: actions.setWay },
      m('option', {value: ONE_WAY}, "One Way Flight"),
      m('option', {value: TWO_WAY}, "Return Flight"),
    )
  ),
  m('.depart',
    m('label', 'Depart:'),
    m('input', { oninput: actions.setDepart })
  ),
  m('.return',
    m('label', 'Return:'),
    m('input', { oninput: actions.setReturn })
  ),
  m('div',
    m('button', {
      onclick: actions.book
    }, 'Book')
  )
]

m.mount(document.body, () => {
  const state = State()
  const actions = Actions(state)
  return {
    view: () => FlightBooker(state, actions)
  }
})
~~~

## HTML

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Flight Booker</title>
</head>
<body>
</body>
</html>
~~~
