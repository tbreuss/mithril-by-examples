---
title: Modal
abstract:
created: 2021-10-16
modified: 2021-10-16
tags: [modal, dialog]
version: 2.0.4
author: [spacejack]
credits: []
links: [https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css]
layout: layouts/example.njk
---

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
