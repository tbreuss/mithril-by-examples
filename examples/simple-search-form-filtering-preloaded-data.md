---
title: Simple Search Form Filtering Prefetched Data
desc: This example shows a simple search form that filters prefetched data. It is using the Mitosis pattern for stage management. A live example can be seen here on this website.
date: 2021-11-27
tags: [form, m.mount, m.request, oninit, oncreate, onupdate, state, mitosis]
level: advanced
version: 2.0.4
author: tbreuss
layout: layouts/example.html
---

## JavaScript

~~~js
  const State = () => ({
    formData: {
      input: ''
    },
    rawData: [],
    filteredData: [],
  })

  const Actions = state => ({
    filter: (input) => {
      state.formData.input = input
      input = input.trim()
      if (input.length === 0) {
        state.filteredData = []
        return
      }
      const words = input.split(/\s+/)
      state.filteredData = state.rawData.filter(example => {
        let filtered = false
        words.map(word => {
          if (example.title.toLowerCase().indexOf(word.toLowerCase()) > -1) {
            filtered = true
          }
        })
        return filtered
      })
    },
    reset: () => {
      state.formData.input = ''
      state.filteredData = []
    }
  })

  const focus = ({dom}) => setTimeout(() => dom.focus())

  const filter = (e) => actions.filter(e.target.value)

  const Form = {
    view: ({attrs: {state, actions}}) => m('.search', [
      m('input[type=text]', {
        placeholder: 'Search for examples...',
        value: state.formData.input,
        oncreate: focus,
        onupdate: focus,
        oninput: filter
      }),
      state.formData.input.length > 0
        ? m('button', {onclick: actions.reset}, 'Reset')
        : ''
    ])
  }

  const List = {
    view: ({attrs: {state, actions}}) => {
      return state.filteredData.length > 0
        ? m('ul', state.filteredData.map(example => {
            return m('li', example.title)
          })
        )
        : state.formData.input.length > 0
          ? m('p', 'Your search did not match any examples.')
          : ''
    }
  }

  const apiUrl = 'https://mithril-by-examples.js.org/api/examples.json'
  const state = State()
  const actions = Actions(state)

  m.mount(document.body, {
    oninit: async function () {
      state.rawData = await m.request(apiUrl)
    },
    view: () => [
      m(Form, {state, actions}),
      m(List, {state, actions})
    ]
  })
~~~

## CSS

~~~css
@import "https://unpkg.com/water.css@2/out/water.min.css";
input {
  display: inline;
}
~~~
