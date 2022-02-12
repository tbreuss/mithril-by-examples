---
title: Manage State using Pojos
abstract: In Mithril you are free to structure your state data however you'd like, and Mithril takes care of the rest.
date: 2021-10-19
tags: [state, component, pojo, m.mount]
level: intermediate
version: 2.0.4
author: kevinfiol
layout: layouts/example.html
---

In Mithril you are free to structure your state data however you'd like, and Mithril takes care of the rest.
Below is a versatile state container using plain JavaScript objects for state and actions.

## JavaScript

~~~js
const state = { count: 0 };

const actions = {
  increment: () => state.count += 1,
  decrement: () => state.count -= 1
};

const Counter = {
  view: () =>
    m('div',
      m('h1', 'Counter'),
      m('p', state.count),
      m('button', { onclick: actions.increment }, '+'),
      m('button', { onclick: actions.decrement }, '-')
    )
};

m.mount(document.body, Counter);
~~~

With the above solution we are not modifying the state directly from within the view.
This way the Counter component becomes more terse, yet more expressive.
