---
title: Radio Buttons
date: 2020-09-24
tags: [form, input, radiobutton]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
---

~~~js
const model = {
  yesno: "Yes"
}

const app = {
  view: () => [
    m('h1', "Radio"),
    ["Yes", "No"].map(x =>
      m('label',
        m('input', {
          type: 'radio',
          id: x,
          name: 'test',
          checked: model.yesno === x,
          onchange: () => model.yesno = x,
          value: x
        }),
        x
      )
    )
  ]
}

m.mount(document.body, app)
~~~

~~~css
label {
  display: block
}
~~~
