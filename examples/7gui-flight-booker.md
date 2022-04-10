---
title: Flight Booker from 7GUIs
date: 2022-03-28
tags: [7guis, mitosis, m.mount]
level: beginner
version: 2.0.4
author: tbreuss
layout: layouts/example.html
---

This is the 7GUIs flight booker example implemented in Mithril.js.
The challenges here are constraints between a select box and two input text fields.
For the state management the Mitosis pattern is used.

The task is to build a frame containing a combobox C with the two options “one-way flight” and “return flight”, two textfields T1 and T2 representing the start and return date, respectively, and a button B for submitting the selected flight. T2 is enabled iff C’s value is “return flight”. When C has the value “return flight” and T2’s date is strictly before T1’s then B is disabled. When a non-disabled textfield T has an ill-formatted date then T is colored red and B is disabled. When clicking B a message is displayed informing the user of his selection (e.g. “You have booked a one-way flight on 04.04.2014.”). Initially, C has the value “one-way flight” and T1 as well as T2 have the same (arbitrary) date (it is implied that T2 is disabled).

See <https://eugenkiss.github.io/7guis/tasks#flight>.

## JavaScript

~~~js
const ONE_WAY = 'one-way'
const TWO_WAY = 'two-way'

// helpers

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

const isValidDate = (date) => {
  const isValidDate = parseDate(date)
  if (isValidDate) {
    return true
  }
  return Number.isNaN(isValidDate)
}

// state

const State = () => ({
  way: ONE_WAY,
  departDate: formatDate(Date.now()),
  returnDate: formatDate(Date.now()),
  confirmMsg: ''
})

// actions

const Actions = state => ({
  setWay: (way) => {
    state.way = way
  },
  setDepart: (date) => {
    state.departDate = date
  },
  setReturn: (date) => {
    state.returnDate = date
  },
  canBook: () => {
    const departDate = parseDate(state.departDate)
    if (!departDate) {
      return false
    }
    if (state.way === ONE_WAY) {
      return true
    }
    const returnDate = parseDate(state.returnDate)
    if (!returnDate) {
      return false
    }
    return returnDate > departDate
  },
  book: () => {
    book = JSON.parse(JSON.stringify(state)) // clone state object
    if (book.way === ONE_WAY) {
      state.confirmMsg = `You booked a one way flight. Depart: ${book.departDate}`
    } else {
    state.confirmMsg = `You booked a two way flight. Depart: ${book.departDate} Return: ${book.returnDate}`
    }
  }
})

// ui

const FlightBooker = (state, actions) => [
  m('h1', 'Flight Booker ✈️'),
  m('div',
    m('select', {
        onchange: (e) => actions.setWay(e.target.value)
      },
      m('option', {value: ONE_WAY}, "One Way Flight"),
      m('option', {value: TWO_WAY}, "Return Flight"),
    )
  ),
  m('.depart',
    m('label', 'Depart:'),
    m('input[size=10][maxlength=10]', {
      placeholder: 'DD.MM.YYYY',
      value: state.departDate,
      oninput: (e) => actions.setDepart(e.target.value),
      class: !isValidDate(state.departDate) ? 'error' : ''
    }),
  ),
  m('.return',
    m('label', 'Return:'),
    m('input[size=10][maxlength=10]', {
      placeholder: 'DD.MM.YYYY',
      value: state.returnDate,
      oninput: (e) => actions.setReturn(e.target.value),
      disabled: state.way === ONE_WAY,
      class: (state.way === TWO_WAY && !isValidDate(state.returnDate)) ? 'error' : ''
    })
  ),
  m('div',
    m('button', {
      onclick: actions.book,
      disabled: actions.canBook() === false
    }, 'Book')
  ),
  state.confirmMsg ? m('h3', state.confirmMsg) : ''
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

## CSS

~~~css
@import "https://unpkg.com/water.css@2/out/water.min.css";

.error {
  color: red;
}
~~~
