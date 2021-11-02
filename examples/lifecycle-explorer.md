---
title: Lifecycle Explorer
date: 2021-10-23
tags: [lifecycle, m.render, m.mount, vnode]
level: beginner
version: 2.0.4
author: barneycarroll
layout: layouts/example.html
---

Interactive sandbox to check the order of Mithrils life cycle events for nested DOM structure.

## JavaScript

~~~js
function Log() {
  let counter = 1
  let log = []
  let me = {
    add(message) {
      log.push({id: counter++, time: new Date(), message: message})
      return me
    },
    log() {
      console.log(log)
    },
    map(f) {
      return log.map(f)
    }
  }
  return me
}

var log = new Log()
//log.add('test 1').add('test 2')
//log.add('test 3')

App = {
  views: {}
}

App.views.Log = function () {
  let dom = undefined
  let me = {
    view: (vnode) => {
      //dom && setTimeout(render)
      return [
        m('button', {
            onclick: () => {
            }
          },
          'Redraw'
        ),
        m('button', {
            onclick: (e) => {
              e.redraw = false
              log = new Log()
              render()
            }
          },
          'Clear'
        ),
        m('button', {
          innerHTML: 'Break',
          onclick: (e) => {
            e.redraw = false
            log.add('***')
            render()
          }
        }),
        m('', {
          oncreate: (vnode) => {
            dom = vnode.dom
            render()
          },
          onupdate: () => render()
        }),
      ]
    }
  }
  return me
  function render() {
    m.render(dom, [
      m("span", ["Current time:", new Date().toString()]),
      log.map((it) => {
        return m('pre', JSON.stringify(it))
      })
    ])

  }
}

App.views.Node = function (vnode) {
  let key = vnode.attrs.key
  let subnodes = []
  return {
    oninit: (vnode) => {
      log.add(key + ' -- oninit')
    },
    oncreate: (vnode) => {
      log.add(key + ' -- oncreate')
    },
    onupdate: (vnode) => {
      log.add(key + ' -- onupdate')
    },
    onbeforeupdate: (vnode) => {
      log.add(key + ' -- onbeforeupdate')
    },
    onbeforeremove: (vnode) => {
      log.add(key + ' -- onbeforeremove')
    },
    onremove: (vnode) => {
      log.add(key + ' -- onremove')
    },
    view: ({
             tag,
             attrs: {remove},
             output,
           }) => {
      log.add(key + ' -- view (start)')
      let retVnode = m('[style=border: 1px solid; padding: .5em; margin: .5em]', {}, [
        'Node',
        key,
        ' ',
        remove && m('button', {
          innerHTML: 'x',
          onclick: remove,
        }),
        m('hr'),
        subnodes.map((key, i) =>
          m(tag, {
            key,
            remove: () =>
              subnodes.splice(i, 1),
          })
        ),
        m('button', {
          innerHTML: '+',
          onclick: () =>
            subnodes.push(key + '.' + (subnodes.length + 1))
        }),
      ])
      //setTimeout(() => {
      log.add(key + ' -- view (end)')
      //})
      return retVnode
    }
  }
}

m.mount(document.body, {
  view() {
    return [
      m('[style=flex: 0 1 50%; overflow-y: auto;]', m(App.views.Node, {key: 1})),
      m('[style=flex: 1 1 50%; overflow-y: auto;]', m(App.views.Log))
    ]
  }
})
~~~
