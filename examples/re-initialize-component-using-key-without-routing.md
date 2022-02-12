---
title: Re-initializing a Component Using Key - Without Routing
abstract: In this example two component instances are created, but only the 'foo' one gets a changeable key, ensuring the re-init when the key changes.
date: 2020-09-24
tags: [component, key, m.mount, vnode, oninit]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

To distinguish similar vnodes from eachother, use the KEY attribute (keyword), and give it a unique value.
Keep in mind that all siblings must be keyed for it to work.
See also the Mithril docs.
This can be used to force a component to re-instantiate/re-initialize.
In this example 2 comp instances are created, but only the 'foo' one gets a changeable key, ensuring the re-init when the key changes.

## JavaScript

~~~js
const comp = {
  oninit: vnode => console.log('init ' + vnode.attrs.name),
  view: vnode => m('div', vnode.attrs.name + ' key: ' + vnode.attrs.key)
}

const app = () => {
  count = 0

  return {
    oninit: () => {console.log('init app')},
    view: () => [
      m('div', 'Test',
        ['foo','bar'].map(x => m(comp, {name: x, key: x === 'foo' && count}))
      ),
      m('button', {onclick: () => count++}, 'click')
    ]
  }
}

m.mount(document.body, app)
~~~
