---
title: Redraw Event Introspection
desc: 'This example shows a solution to introspect m.request, and all other event handlers, that triggers an m.redraw. This answers a question that virtually everyone in Mithril.js wonders about: when does an m.redraw fire? The example was taken from Mithrils [Gitter channel](https://gitter.im/mithriljs/mithril.js?at=620cd454dc191b3d69b45b9d). Thanks go to JAForbes for this useful script.'
date: 2022-02-16
tags: [event, m.mount, m.redraw, m.request]
level: expert
version: 2.0.4
author: JAForbes
layout: layouts/example.html
flems:
  links:
    - name: bss.js
      type: script
      url: https://unpkg.com/bss@1.6.4/bss.js
---

## JavaScript

~~~js
let oldM = window.m
let m = (...args) => {
  let x = oldM(...args)
  let stack = (new Error().stack+'').split(/\bat\b/gm)[2].trim()
  let selector = args[0]
  let [column, ln, file, protocol] = stack.split(':').reverse()
  column = column.match(/\d+/)[0]

  if( x.attrs ) {
    for(let k of Object.keys(x.attrs)){
      if ( k.slice(0,2) == 'on' ) {
        let old = x.attrs[k]
        x.attrs[k] = (...args) => {
          m.redraw.cause.unshift({
            type: 'event',
            selector,
            vnode: x,
            where: {
              column, ln, file, protocol
            }
          })
          return old(...args)
        }
      }
    }
  }

  return x
}

m.oldRequest = oldM.request
const newRequest = (...args) => {

  let [url, options] =
    typeof args[0] != 'string'
    ? [args[0].url, args[0]||{}]
    : args.concat({})

  let out = m.oldRequest(...args)

  let stack = (new Error().stack+'').split(/\bat\b/gm)[2].trim()
  let selector = args[0]
  let [column, ln, file, protocol] = stack.split(':').reverse()
  column = column.match(/\d+/)[0]

  out.finally( () => {
    m.redraw.cause.unshift({
      type: 'request',
      url,
      options,
      where: {
        column, ln, file, protocol
      }
    })
  })
  return out
}

Object.assign(m, oldM, { request: newRequest })
m.redraw.cause = []

let renders = 0
m.mount(document.body, () => ({
  view: () => [
    m('button.a', { onclick(){} }, 'Button A'),
    m('button.b', { onclick(){
      m.request('https://jsonplaceholder.typicode.com/todos/1')
    } }, 'Button B'),
    m('input[type=date]', { oninput(){} }),
    m('input[type=text]', { oninput(){} }),
    m('p','Renders: ', ++renders),
    m.redraw.cause.flatMap(({ vnode, type, url, options, selector, where }) =>
      type == 'event'
      ? [
        m('pre', m('code', `m("${selector}", ${JSON.stringify(vnode.attrs)}, ${vnode.text ? `"${vnode.text}"` : ''})`)),
        ,m('.table'
          ,Object.entries({ selector, ...where }).map(
            ([k,v]) =>
              m('.row'
                  ,m('.key', k), m('.value', v)
              )
          )
        )
      ]
      : type == 'request'
      ? [
        ,m('pre', m('code', `m.request("${url}", ${JSON.stringify(options)})`))
        ,m('.table'
          ,Object.entries({ ...where }).map(
            ([k,v]) =>
              m('.row'
                  ,m('.key', k), m('.value', v)
              )
          )
        )
      ]
      : null
    )
  ]
}))
~~~

## CSS

~~~css
.row {
  display: grid;
  grid-template-columns: 4em 1fr;
  gap: 1em;
}

.row .key {
  font-weight: bold;
}
~~~
