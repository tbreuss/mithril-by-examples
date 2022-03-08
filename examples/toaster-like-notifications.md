---
title: Toaster-like Notifications
date: 2022-03-09
tags: []
level: beginner
version: 2.0.4
author: tbreuss
layout: layouts/example.html
flems:
  files:
    - helpers.js
    - Notifications.js
    - Layout.js
    - Page.js
    - .css
---

This example shows Mithril.js toaster-like notifications with proper CSS fade-out and fade-in animation.

The example was taken from [here](https://gist.github.com/tabula-rasa/61d2ab25aac779fdf9899f4e87ab8306), modified and brought into a runnable form by [tbreuss](/contributors/tbreuss/). The original author of the example is [tabula-rasa](https://gist.github.com/tabula-rasa).

## helpers.js

~~~js
// helpers.js
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
~~~

## Notifications.js

~~~js
// Notifications.js
let state = {
  list: [],
  destroy(msg) {
    let index = state.list.findIndex(x => x.id === msg.id)
    state.list.splice(index, 1)
  }
}

function addSuccess(text, timeout = 3000) {
  state.list.push({ id: guid(), type: 'success', text, timeout })
}
function addInfo(text, timeout = 3000) {
  state.list.push({ id: guid(), type: 'info', text, timeout })
}
function addWarning(text, timeout = 3000) {
  state.list.push({ id: guid(), type: 'warning', text, timeout })
}
function addDanger(text, timeout = 3000) {
  state.list.push({ id: guid(), type: 'danger', text, timeout })
}

let Notifications = {
  oninit(vnode) {
    if (state.list.length == 0) {
      //demo messages
      addInfo("Info message!")
      addWarning("Warning message!")
      addDanger("This is danger message! Take care.")
      addSuccess("Operation successful.")
    }
  },
  view(vnode) {
    let ui = vnode.state
    return state.list ?
      m('.m-notifications', state.list.map((msg) => {
        return m('div', { key: msg.id }, m(Notification, msg)) //wrap in div with key for proper dom updates
      })) : null
  }
}

let Notification = {
  oninit(vnode) {
    setTimeout(() => {
      Notification.destroy(vnode)
    }, vnode.attrs.timeout)
  },
  notificationClass(type) {
    const types = ['info', 'warning', 'success', 'danger']
    if (types.indexOf(type) > -1)
      return type
    return 'info'
  },
  destroy(vnode) {
    vnode.dom.classList.add('destroy')
    setTimeout(() => {
      state.destroy(vnode.attrs)
      m.redraw()
    }, 300)
  },
  view(vnode) {
    let ui = vnode.state
    let msg = vnode.attrs
    return m('.m-notification', { class: ui.notificationClass(msg.type), onclick: () => { ui.destroy(vnode) } }, msg.text)
  }
}
~~~

## Layout.js

~~~js
// Layout.js
const Layout = {
  view: function (vnode) {
    return m(".layout", [
      vnode.children,
      m(Notifications),
    ]);
  }
}
~~~

## Page.js

~~~js
// Page.js
const Page = {
  view(vnode) {
    return m('.page', [
      m('h1', 'Toaster-like Notifications'),
      m('p', 'Click the buttons to see toasts in the lower right corner.'),
      m('button[type=button]', {
        onclick: () => {
          addSuccess('Hey, this is a success message!', 5000)
        }},
        'Show success message'
      ),
      m('button[type=button]', {
        onclick: () => {
          addWarning('And this is a warning message!', 5000)
        }},
        'Show warning message'
      ),
      m('button[type=button]', {
        onclick: () => {
          addInfo('Wow, this a info message!', 5000)
        }},
        'Show info message'
      ),
      m('button[type=button]', {
        onclick: () => {
          addDanger('And this is a danger message!', 5000)
        }},
        'Show danger message'
      ),
    ])
  }
}

m.route(document.body, '/', {
  '/': {render: () => m(Layout, m(Page))}
})
~~~

## CSS

~~~css
@import "https://unpkg.com/water.css@2/out/water.min.css";

button {
  margin: 0.25rem 0;
}
.m-notifications {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10;
}

.m-notification {
  width: auto;
  margin-bottom: 0.25rem;
  max-width: 400px;
  cursor: pointer;
  animation: fade-in 0.3s;
}

.m-notification:hover {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.m-notification.destroy {
  animation: fade-out 0.3s;
}

.m-notification.info {
  color: #0c5460;
  background-color: #d1ecf1;
  padding: 0.75rem 1.25rem;
  border: 1px solid #bee5eb;
  border-radius: 0.25rem;
}

.m-notification.warning {
  color: #856404;
  background-color: #fff3cd;
  padding: 0.75rem 1.25rem;
  border: 1px solid #ffeeba;
  border-radius: 0.25rem;
}

.m-notification.danger {
  color: #721c24;
  background-color: #f8d7da;
  padding: 0.75rem 1.25rem;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
}

.m-notification.success {
  color: #155724;
  background-color: #d4edda;
  padding: 0.75rem 1.25rem;
  border: 1px solid #c3e6cb;
  border-radius: 0.25rem;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
~~~
