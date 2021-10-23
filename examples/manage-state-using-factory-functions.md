---
title: Manage State using Factory Functions
date: 2021-10-19
tags: [state, component, mitosis]
level: intermediate
version: 2.0.4
authors: [kevinfiol]
credits: [porsager, foxdonut]
layout: layouts/example.html
---

In Mithril you are free to structure your state data however you'd like, and Mithril takes care of the rest.

## JavaScript

~~~js
const State = () => ({ count: 0 });

const Actions = state => ({
  increment: () => state.count += 1,
  decrement: () => state.count -= 1
});

const state   = State();
const actions = Actions(state);

const Counter = {
  view: ({ attrs: { state, actions } }) =>
    m('div',
      m('h1', 'Counter'),
      m('p', state.count),
      m('button', { onclick: actions.increment }, '+'),
      m('button', { onclick: actions.decrement }, '-')
    )
};

m.mount(document.body, {
  view: () => m(Counter, { state, actions })
});
~~~
