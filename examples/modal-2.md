---
title: Modal
date: 2021-10-26
tags: [modal, dialog, component, m.mount]
level: advanced
version: 2.0.4
author: spacejack
layout: layouts/example.html
flems:
  selected: app.js
  files:
    - Overlay.js
    - Modal.js
    - app.js
    - .css
---

## Overlay.js

~~~js
// Overlay.js
/**
This Overlay component provides a full-screen cover element.
It is mounted to a separate V/DOM tree appended to the body.
Children supplied to Overlay are rendered into this tree.
The Overlay component can be nested anywhere within your app's
view but will be rendered to display overtop everything else.
*/

const Overlay = function() {
	let dom
	let children

	const OverlayContainer = {
		view: () => children
	}

	return {
		oncreate(v) {
			children = v.children
			// Append a container to the end of body
			dom = document.createElement('div')
			dom.className = 'overlay'
			document.body.appendChild(dom)
			m.mount(dom, OverlayContainer)
		},
		onbeforeupdate(v) {
			children = v.children
		},
		onbeforeremove(v) {
			// Add a class with fade-out exit animation
			dom.classList.add('hide')
			return new Promise(r => {
				dom.addEventListener('animationend', r)
			})
		},
		onremove() {
			m.mount(dom, null)
			// Destroy the overlay dom tree. Using m.mount with
			// null triggers any modal children removal hooks.
			document.body.removeChild(dom)
		},
		view() {}
	}
}
~~~

## Modal.js

~~~js
// Modal.js
/**
This Modal component uses the Overlay component to provide a
full screen cover and renders a dialog-like widget within that
waits for the user to click a button. A Modal instance can
be nested anywhere within your app's view and will be rendered
on top of everything else.

Expected attrs are as follows:

interface Attrs {
  title: m.Children
  content: m.Children
  buttons: {id: string, text: string}[]
  onClose(id: string): void
}

At least one button should be provided otherwise there
will be no way to close the modal.
*/

const Modal = function(v) {
  let clickedId

  return {
    view({attrs: {title, content, buttons, onClose}}) {
      if (clickedId != null) {
        // We need to allow the Overlay component execute its
        // exit animation. Because it is a child of this component,
        // it will not fire when this component is removed.
        // Instead, we need to remove it first before this component
        // goes away.
				// When a button is clicked, we omit the Overlay component
        // from this Modal component's next view render, which will
        // trigger Overlay's onbeforeremove hook.
        return null
      }
      return m(Overlay,
        {
          onremove() {
            // Wait for the overlay's removal animation to complete.
            // Then we fire our parent's callback, which will
            // presumably remove this Modal component.
            Promise.resolve().then(() => {
              onClose(clickedId)
              m.redraw()
            })
          }
        },
        m('.modal',
          m('h3', title),
          m('.modal-content', content),
          m('.modal-buttons',
            buttons.map(b =>
              m('button',
                {
                  type: 'button',
                  disabled: clickedId != null,
                  onclick() {
                    clickedId = b.id
                  }
                },
                b.text
              )
            )
          )
        )
      )
    }
  }
}
~~~

## app.js

~~~js
// app.js
const App = function() {
  let showModal = false

  return {
    view: () => m('.app',
      m('h1', 'Modal Demo'),
      m('p', 'Click below to open a modal'),
      m('p',
        m('button',
          {
            type: 'button',
            onclick() {
              showModal = true
            }
          },
          'Open Modal'
        ),
        // Even though this modal is nested within our App vdom,
        // it will appear on top of everything else, appended
        // to the end of document body.
        showModal && m(Modal, {
          title: 'Hello Modal!',
          content: 'Click the button below to close.',
          buttons: [{id: 'close', text: 'Close'}],
          onClose(id) {
            showModal = false
          }
        })
      )
    )
  }
}

m.mount(document.body, App)
~~~

## CSS

~~~css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-size: 16px;
}

.app {
  padding: 2em;
}

@keyframes fade-in {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fade-out {
  from {opacity: 1;}
  to {opacity: 0;}
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-in 0.5s;
}
.overlay.hide {
  animation: fade-out 0.5s;
}

.modal {
  text-align: center;
  padding: 2em 4em 3em 4em;
  background-color: #FFF;
  box-shadow: 0.5em 0.5em 2em #999;
  border: #CCC 1px solid;
}

.modal-buttons {
  margin-top: 1em;
}
.modal-buttons button {
  margin: 0 0.5em;
}
~~~
