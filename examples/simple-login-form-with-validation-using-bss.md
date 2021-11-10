---
title: Simple Login Form with Validation using BSS
desc: Form for user name and email with validation and error messages.
date: 2021-10-16
tags: [form, login, bss, validation, m.mount]
level: beginner
version: 2.0.4
author: smuemd
layout: layouts/example.html
flems:
  links:
    - bss@1.2.8
---

~~~js
import b from 'bss'

const username = {
  label: 'username',
  value: '',
  error: ''
}

const email = {
  label: 'email',
  value: '',
  error: ''
}

const input = (attrs) =>
  m('label' + b.d('flex').m(8),
    m('span' + b.w(100), attrs.label),
    m('input', {
      value: attrs.value,
      oninput: e => {
        attrs.value = e.target.value
        attrs.error && validate()
      }
    }),
    attrs.error && m('span' + b.c('white').bc('tomato'), attrs.error)
  )


const validate = () => {
  username.error = username.value.length < 4
    && 'Please enter a username longer than 4 characters'

  email.error = !email.value.match(/.+@.+\..+/)
    && 'Please enter a valid email'
}

const onsubmit = e => {
  e.preventDefault()
  validate()
  if (username.error || email.error)
    return true

  alert('Hello ' + username.value + ' i will spam you at ' + email.value)
}

m.mount(document.body, {
  view: () =>
    m('form', {
      onsubmit,
    },
      input(username),
      input(email),
      m('button', 'submit')
    )
})
~~~
