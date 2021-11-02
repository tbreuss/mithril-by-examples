---
title: Simple Dependency Free Calendar Component
date: 2021-10-16
tags: [calendar, component, m.mount]
level: beginner
version: 2.0.4
author: stephanhoyer
layout: layouts/example.html
---

Simple dependency free calendar component.

## CSS

~~~css
.calendar {
  width: 20rem;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  text-align: center;
}

.days {
  padding: 0;
  grid-column: 1 / 4;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  list-style: none;
}

.day.nextMonth, .day.previousMonth {
  color: silver;
}

.day.weekday-6.nextMonth, .day.weekday-6.previousMonth {
  color: coral;
}
.day.weekday-6 {
  color: red;
}
~~~

## JavaScript

~~~js
function times(n, fn) {
  return Array(n).fill().map((_, index) => fn(index))
}

function daysInMonth (month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getWeekday(year, month, day) {
  return new Date(year, month, day).getDay();
}

function yearView(state) {
  return [
    m('button.previousYear', {
      onclick: () => state.year -= 1
    }, '<'),
    m('.year', state.year),
    m('button.nextYear', {
      onclick: () => state.year += 1
    }, '>'),
  ]
}

function monthView(state) {
  return [
    m('button.previousMonth', {
      onclick: () => {
        if (state.month == 0) {
          state.year -= 1
          state.month = 12
        }
        state.month -= 1
      }
    }, '<'),
    m('.month', state.month + 1),
    m('button.nextMonth', {
      onclick: () => {
        if (state.month == 11) {
          state.year += 1
          state.month = -1
        }
        state.month += 1
      }
    }, '>'),
  ]
}

function daysView(state) {
  const daysInPreviousMonth = daysInMonth(state.month - 1, state.year)
  return [
    m('ul.days', [
      times(getWeekday(state.year, state.month, 0), index => {
        const day = index + 1 + daysInPreviousMonth - getWeekday(state.year, state.month, 0)
        return m('li.day.previousMonth', {
          className: `weekday-${getWeekday(state.year, state.month-1, day)}`
        }, day)
      }),
      times(daysInMonth(state.month, state.year), day => m('li.day', {
        className: `weekday-${getWeekday(state.year, state.month, day)}`
      }, day + 1)),
      times(7 - getWeekday(state.year, state.month + 1, 0), day => {
        return m('li.day.nextMonth', {
          className: `weekday-${getWeekday(state.year, state.month + 1, day)}`
        }, day + 1)
      }),
    ])
  ]
}

const calendarComponent = {
  oninit({state, attrs}) {
    state.year = attrs.date.getFullYear()
    state.month = attrs.date.getMonth()
    state.day = attrs.date.getDate()
  },
  view({state}) {
    return m('.calendar', [
      yearView(state),
      monthView(state),
      daysView(state)
    ])
  }
}

m.mount(document.body, {
  view() {
    return m(calendarComponent, {
      date: new Date()
    })
  }
})
~~~

