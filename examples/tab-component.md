---
title: Tab Component
abstract: Demonstration how to create a tab view, where tab toggle buttons communicate there activation state though a surrounding wrapper component using tab ids.
date: 2021-10-16
tags: [component, tab, m.mount]
level: beginner
version: 1.1.6
author: barneycarroll
layout: layouts/example.html
flems:
  selected: app.js
  files:
    - Tabs.js
    - app.js
  links:
    - name: tailwind.css
      type: css
      url: https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.css
---

Demonstration how to create a tab view, where tab toggle buttons communicate there activation state though a surrounding wrapper component using tab ids.

## Tabs.js

~~~js
// Tabs.js
const viewOf = v =>
  v.children[0] && typeof v.children[0].children == 'function'
  ? v.children[0].children : () => children

export default ({attrs:{initial = 0}}) => {
  let active = initial
  let tabs   = 0
  let panels = 0

  const Tab = {
    view: ({ state, children, attrs: {tab = tabs++} }) =>
      m('.p-2', {
        class: tab === active
          ? 'border border-blue text-blue rounded'
          : 'hover:text-blue cursor-pointer',
        onclick: () => {
          active = tab
        },
      },
        children,
      ),
  }

  const TabPanel = {
    view: ({ state, children, attrs: {tab = panels++} }) =>
      tab === active && children,
  }

  return {
    view: v => (
      tabs   = 0,
      panels = 0,

      viewOf(v)({
        Tab,
        TabPanel,
      })
    )
  }
}
~~~

## App.js

~~~js
// app.js
import Tabs from "./Tabs";

m.mount(document.body, () => {
  let sidebarIsOpen = false

  return {
    view: () =>
      m('.m-4',
        m("h1.mb-8", "Tabs: Compound components with context"),

        m('h2.mb-4', 'Tabs on the left'),

        m(Tabs, ({Tab, TabPanel}) => [
          m('.flex',
            m('.flex.flex-col.w-32',
              m(Tab, 'One'),
              m(Tab, 'Two'),
              m(Tab, 'Three'),
            ),

            m('.ml-4.p-2.border-l-2',
              m(TabPanel, 'Content Panel One'),
              m(TabPanel, 'Content Panel Two'),
              m(TabPanel, 'Content Panel Three'),
            ),
          ),
        ]),

        m('hr.border.my-8'),

        m('h2', 'Tabs in a sidebar'),

        m('p', 'With named tab references and initial tab declaration'),

        m(Tabs, {initial: 'Two'},  ({Tab, TabPanel}) => [
          m('.p-4.border.my-4.rounded.shadow',
            m(TabPanel, {tab: 'One'}, 'Content Panel One'),
            m(TabPanel, {tab: 'Two'}, 'Content Panel Two'),
            m(TabPanel, {tab: 'Three'}, 'Content Panel Three'),
          ),

          sidebarIsOpen &&
          m('.fixed.pin-r.pin-t.pin-b.w-1/2.bg-white.border',
            m(Tab, {tab: 'One'}, 'One'),
            m(Tab, {tab: 'Two'}, 'Two'),
            m(Tab, {tab: 'Three'}, 'Three'),
          ),

          m('div',
            m('button.p-2.border.rounded.bg-blue.text-white', {
              onclick: () => {
                sidebarIsOpen = !sidebarIsOpen
              },
            }, 'Toggle sidebar')
          ),
        ])
      ),
  }
})
~~~
