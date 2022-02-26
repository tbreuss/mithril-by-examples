---
layout: layouts/main.html
title: Lifecycle Methods
---

# Lifecycle Methods

Components and virtual DOM nodes can have lifecycle methods, also known as hooks, which are called at various points during the lifetime of a DOM element.

Lifecycle methods are only called as a side effect of a [m.render()](/tags/m.render/) call. They are not called if the DOM is modified outside of Mithril.js.

- [oninit](#oninit)
- [oncreate](#oncreate)
- [onupdate](#onupdate)
- [onbeforeremove](#onbeforeremove)
- [onremove](#onremove)
- [onbeforeupdate](#onbeforeupdate)

## oninit

The oninit(vnode) hook is called before a vnode is touched by the virtual DOM engine.
This hook does not get called when an element is updated, but it does get called if an element is recycled.

[Show examples using ”oninit”](/tags/oninit/)

## oncreate

The oncreate(vnode) hook is called after a DOM element is created and attached to the document.
This hook does not get called when an element is updated.

[Show examples using ”oncreate”](/tags/oncreate/)

## onupdate

The onupdate(vnode) hook is called after a DOM element is updated, while attached to the document.
This hook is only called if the element existed in the previous render cycle.
It is not called when an element is created or when it is recycled.

[Show examples using ”onupdate”](/tags/onupdate/)

## onbeforeremove

The onbeforeremove(vnode) hook is called before a DOM element is detached from the document.
If a Promise is returned, Mithril.js only detaches the DOM element after the promise completes.
This hook is only called on the DOM element that loses its parentNode, but it does not get called in its child elements.

[Show examples using ”onbeforeremove”](/tags/onbeforeremove/)

## onremove

The onremove(vnode) hook is called before a DOM element is removed from the document.
If a onbeforeremove hook is also defined, the onremove hook runs after the promise returned from onbeforeremove is completed.
This hook is called on any element that is removed from the document.

[Show examples using ”onremove”](/tags/onremove/)

## onbeforeupdate

The onbeforeupdate(vnode, old) hook is called before a vnode is diffed in an update.
If this function is defined and returns false, Mithril.js prevents a diff from happening to the vnode, and consequently to the vnode's children.

[Show examples using ”onbeforeupdate”](/tags/onbeforeupdate/)

[For detailed information see official website](https://mithril.js.org/lifecycle-methods.html)
