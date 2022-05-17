---
title: Manage State using Factory Functions
abstract: In Mithril.js you are free to structure your state data however you'd like, and Mithril.js takes care of the rest.
date: 2021-10-19
tags: [state, component, mitosis, m.mount]
level: intermediate
version: latest
author: kevinfiol
layout: layouts/example.html
---

In Mithril.js you are free to structure your state data however you'd like, and Mithril.js takes care of the rest.
Credits for porsager and foxdonut.

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
