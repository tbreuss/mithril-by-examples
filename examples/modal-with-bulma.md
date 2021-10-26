---
title: Modal with Bulma
date: 2021-10-26
tags: [modal, bulma]
level: beginner
version: 2.0.4
author: mike-ward
credits: []
links: [https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css]
layout: layouts/example.html
flems:
  links:
    - name: bulma.css
      type: css
      url: https://unpkg.com/bulma@0.7.2/css/bulma.css
---

Modal using Bulma CSS framework.

## TypeScript

~~~ts
function modal(content: string | m.Vnode) {
  const view =
    m('.modal is-active',
      m('.modal-background', { onclick: () => modalContainer.remove() }),
      m('.modal-content', m('.box', content)));

  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  m.render(modalContainer, view);
}
~~~

## JavaScript

~~~js
const modalContent =
  m('.title.has-text-centered', 'Title',
    m('.subtitle', 'some content here'));

const app = {
  view: () => m('.section',
    m('button.button.subtitle',
    { onclick: () => modal(modalContent) },
    'Show Modal')
    )
}

m.mount(document.body, app)
~~~
