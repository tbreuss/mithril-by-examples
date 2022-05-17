---
title: Modal with Bulma
abstract:
date: 2021-10-16
tags: [modal, dialog, m.render, m.mount, vnode, bulma]
level: beginner
version: latest
author: spacejack
layout: layouts/example.html
---

Here is an elegant example for a modal solution using Bulma CSS framework.
The modal is created and rendered separately by using a simple utility function.
It is then appended to the HTML body which ensures that the modal is always on top of everything.
So simple, nice!

## Typescript

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

## HTML

~~~html
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>Modal</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<body>
</body>
</html>
~~~
