---
title: Select2 Integration
date: 2021-10-26
tags: [jquery, form, select, 3rd-party, m.mount]
level: beginner
version: 2.0.4
author: kevinfiol
layout: layouts/example.html
flems:
  links:
    - jquery@3.3.1
    - select2@4.0.6-rc.1
---

## HTML

~~~html
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
~~~

## JavaScript

~~~js
const App = {
  view: () => m('div', [
    m('p', 'my select'),
    m('select', {
      name: 'states',
      oncreate: ({dom}) => $(dom).select2()
    }, [
      m('option', { value: 'AL' }, 'Alabama'),
      m('option', { value: 'WI' }, 'Wisconsin')
    ])
  ])
};

m.mount(document.body, App)
~~~
