---
title: Tweeter Box
date: 2021-11-01
tags: [form, textarea, state, mitosis]
level: beginner
version: 2.0.4
author: tbreuss
layout: layouts/example.html
---

A small nonsense Tweeter Box using Mitosis for state management.
This example is inspired by the Tweeter Box from Jorge Bucaran written as an example for Hyperapp.

~~~html
<main id="app"></main>
~~~

~~~js
const MAX_LENGTH = 140

const State = () => ({
  text: '',
  count: MAX_LENGTH
})

const Actions = state => ({
  text: (text) => {
    state.text = text
    state.count = MAX_LENGTH - text.length
  },
  reset: () => {
    state.text = ''
    state.count = MAX_LENGTH
  }
});

const TweeterBox = (state, actions) => [
  m('h1', 'Tweeter 📦'),
  m('textarea', {
    placeholder: 'What\'s on your mind?',
    rows: 4,
    maxlength: MAX_LENGTH,
    value: state.text,
    oninput: (e) => actions.text(e.target.value)
  }),
  m('section', [
    state.count,
    m('button', {
      disabled: state.count >= MAX_LENGTH,
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
