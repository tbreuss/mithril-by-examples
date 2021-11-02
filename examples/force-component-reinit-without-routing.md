---
title: Force Component Re-Init without Routing
date: 2021-10-16
tags: [component, key, m.mount, vnode]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

Force a component to re-initialize by using a key attribute.

~~~js
const text = () => [
  m('p', `Keys are used usually to distinguish similar vnodes from one another.
    However, due to how Mithril treats keyed vnodes, we can use keys to force a vnode to be re-created.
    This could be useful for situations wherein we want to, say, modify attributes of a 3rd-party component
    that doesn't provide an API to do so -- we could simply force the component to be re-created with new values.`
  ),
  m('p', `In this example we create 2 instances of component, but assign a key only to the 'foo' instance; note that the
    value of the assigned key changes every time. Thus, on a redraw, when Mithril doesn't find a new vnode
    with the old key, it discards the old vnode, and creates a new one with the new key, and new values.`),
  m('p', `Keep in mind that every sibling needs a key, otherwise it doesn't work.`),
  m('hr')
]

const component = {
  oninit: vnode => console.log('init ' + vnode.attrs.name),
  view: vnode => m('div', vnode.attrs.name + ' key: ' + vnode.attrs.key)
}

const app = () => {
  count = 0

  return {
    oninit: () => {console.log('init app')},
    view: () => [
      text(),
      m('div', 'Test',
        ['foo','bar'].map(x => m(component, {name: x, key: x === 'foo' && count}))
      ),
      m('button', {onclick: () => count++}, 'click')
    ]
  }
}

m.mount(document.body, app)
~~~
