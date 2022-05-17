---
title: Loading Button Component
abstract: Here is an example of a button whose loading and disabled states are controlled by the parent component.
date: 2022-01-29
tags: [animation, button, component, loading, m.mount, m.redraw, vnode]
level: beginner
version: latest
author: tbreuss
layout: layouts/example.html
---

Here is an example of a button whose loading and disabled states are controlled by the parent component.
When you click the button, a loading animation is displayed.
At the same time, the button goes into the `disabled` state.
After the work is done (i.e. a server response received), the button returns to its initial state.
The animation in this example was made with pure CSS animation.

## JavaScript

~~~js
const LoadingButton = {
  view: (v) => m('button', {
      type: v.attrs.type || 'submit',
      class: v.attrs.class || '',
      onclick: v.attrs.onclick || null,
      disabled: v.attrs.loading
    }, [
    v.attrs.loading ? m('div.spinner') : '',
    m('div', v.children),
  ])
}

const request = () => new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
    resolve('Response received')
  }, 1500)
})

const state = {
  loading: false,
  text: []
}

const app = () => {
  return {
    view: () => m('div',
      m('h1', 'Loading Button'),
      m('div.buttons',
        m(LoadingButton, {
          loading: state.loading,
          onclick: () => {
            state.loading = true
            state.text.push('Request sent')
            m.redraw()
            request().then((response) => {
              state.loading = false
              state.text.push(response)
              m.redraw() // not necessary in a real m.request
            })
          }
        }, 'Make Request'),
        state.text.length ? m(LoadingButton, {
          onclick: () => {
            state.text = []
          }
        }, 'Reset Log') : '',
      ),
      m('div.log',
        state.text.map((t) => m('div', '> ' + t))
      )
    )
  }
}

m.mount(document.body, app)
~~~

## Styles

~~~css
@import "https://unpkg.com/water.css@2/out/water.min.css";

div.buttons {
  margin-bottom: 0.5em;
}

button div {
  float: left;
}

.spinner,
.spinner:after {
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
}

.spinner {
  margin-right: 0.5em;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: .2em solid white;
  border-right: .2em solid white;
  border-bottom: .2em solid white;
  border-left: .2em solid transparent;
  transform: translateZ(0);
  animation: spinning 1s infinite linear;
}

@keyframes spinning {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
~~~
