---
title: Tweeter Box
abstract: A small nonsense Tweeter Box code example in Mithril.js using Mitosis for state management.
date: 2021-11-01
tags: [form, textarea, state, mitosis, m.mount]
level: beginner
version: 2.0.4
author: tbreuss
layout: layouts/example.html
---

This Mithril.js example is a small nonsense *Tweeter Box* using Mitosis for state management.
It shows a textarea HTML element with a counter starting at 140, that is counted down with every char entered.
The example is inspired by Jorge Bucaran's *Tweeter Box*, who wrote it as an example for Hyperapp.

## Markup

~~~html
<main id="app"></main>
~~~

## JavaScript

~~~js
const MAX_LENGTH = 140

const State = () => ({
  message: '',
  charsLeft: MAX_LENGTH
})

const Actions = state => ({
  update: (text) => {
    state.message = text.substr(0, MAX_LENGTH)
    state.charsLeft = MAX_LENGTH - state.message.length
  },
  reset: () => {
    state.message = ''
    state.charsLeft = MAX_LENGTH
  }
})

const TweeterBox = (state, actions) => [
  m('h1', 'Tweeter 🐤'),
  m('textarea', {
    placeholder: 'What\'s on your mind?',
    rows: 4,
    value: state.message,
    oninput: (e) => actions.update(e.target.value)
  }),
  m('section', [
    state.charsLeft,
    m('button', {
      disabled: state.charsLeft === MAX_LENGTH,
      onclick: actions.reset
    }, 'Tweet')
  ])
]

m.mount(document.getElementById('app'), () => {
  const state = State()
  const actions = Actions(state)
  return {
    view: () => TweeterBox(state, actions)
  }
})
~~~

## Styles

~~~css
@import "https://unpkg.com/water.css@2/out/water.min.css";

body {
  display: flex;
  font-size: 1.5em;
  justify-content: center;
}

main {
  width: clamp(45ch, 50%, 75ch);
  display: flex;
  flex-direction: column;
}

textarea {
	transition: .2s;
  resize: none;
  overflow: hidden;
}

section {
  display: flex;
}

button {
  margin: 0 0 0 auto;
}
~~~
