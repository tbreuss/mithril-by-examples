---
title: Wrapper on m.request
abstract: Wrapper example for m.request allowing an easier and snappier api handling.
date: 2020-09-24
tags: [m.request, api, wrapper]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
flems:
  files:[]
  links:[]
---

Wrapper example for m.request allowing an easier and snappier api handling.

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
