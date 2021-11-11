---
title: Nested Components Using Vnode Children
desc: This is an example showing nested components using `vnode.children`.
date: 2021-10-27
tags: [component, nested, m.mount, vnode]
level: beginner
version: 2.0.4
author: tbreuss
layout: layouts/example.html
---

~~~js
const Child = {
  view: function(vnode) {
    return m('div',
      m('h3', vnode.attrs.title),
      m('p', vnode.attrs.text)
    );
  }
};

const Parent = {
  view: function(vnode) {
    return m('div', [
      m('h2', 'Parent Title'),
      vnode.children
    ]);
  }
};

const App = {
  view: function() {
    return m(Parent, [
      m(Child, { title: 'Child Title 1', text: 'Text Number 1' }),
      m(Child, { title: 'Child Title 2', text: 'Text Number 2' }),
      m(Child, { title: 'Child Title 3', text: 'Text Number 3' })
    ]);
  }
}

m.mount(document.body, App);
~~~
