---
title: Manage state using Mitosis pattern
created: 2021-10-16
modified: 2021-10-16
tags: [mitosis, state, component]
level: intermediate
version: 2.0.4
authors: [kevinfiol]
credits: [porsager, foxdonut]
layout: layouts/example.html
---

Simple example using Mitosis to manage state.
Mitosis is named after the equally awesome Meiosis pattern.
Credits go to @porsager and @foxdonut.

## HTML

~~~html
<div id="app"></div>
~~~

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
