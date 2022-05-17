---
title: Wrapper on m.request
abstract: Wrapper example for m.request allowing an easier and snappier api handling.
date: 2020-09-24
tags: [m.request, api, wrapper]
level: beginner
version: latest
author: osban
layout: layouts/example.html
flems:
  files:[]
  links:[]
---

This is an example showing a wrapper for Mithril.js' `m.request` that allows an easier and snappier api handling.
Especially the possibility of adding custom handlers to specific http status codes is a plus.

## JavaScript

~~~js
// m.request wrapper api.js
const handlers = {
  500: err => console.error(err.code, err.response)
}

const request = method => (url, options) =>
  m.request({
    method,
    url: 'https://example.com' + url,
    ...options // might need Object.assign for Edge
  })
    .catch(err => {
      if (err.code in handlers) handlers[err.code](err)
      else throw err
    })

export default {
  get   : request('GET'),
  put   : request('PUT'),
  post  : request('POST'),
  delete: request('DELETE')
}

// usage
import api from './api'

api.get('/foo')
  .then(console.log)
  .catch(console.log)

api.post('/bar', {
  headers: {'Header1': 'header'},
  body: {foo: 'foo'}
})
~~~
