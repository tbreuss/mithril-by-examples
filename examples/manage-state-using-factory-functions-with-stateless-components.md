---
title: Manage State using Factory Functions with Stateless Components
desc: Credits for porsager and foxdonut.
date: 2021-10-16
tags: [mitosis, state, component, m.mount]
level: intermediate
version: 2.0.4
author: kevinfiol
layout: layouts/example.html
---

## JavaScript

~~~js
const State = () => ({ count: 0 });

const Actions = state => ({
  increment: () => state.count += 1,
  decrement: () => state.count -= 1
});

const Counter = (state, actions) =>
  m('div',
    m('h1', 'Counter'),
    m('p', state.count),
    m('button', { onclick: actions.increment }, '+'),
    m('button', { onclick: actions.decrement }, '-'),
    Child(state, actions)
  )
;

const Child = (state, actions) =>
  m('div',
    m('h2', 'Child'),
    m('p', state.count * 2),
    m('button', { onclick: actions.increment }, '+'),
    m('button', { onclick: actions.decrement }, '-'),
  )
;

m.mount(document.body, () => {
  const state   = State();
  const actions = Actions(state);

  return { view: () => Counter(state, actions) };
});
~~~
