---
title: Async and Await Around m.request
abstract: Demonstrate async and await around Mithril.js' `m.request`.
date: 2021-10-26
tags: [m.request, async-await, m.mount, api, oninit]
level: beginner
version: latest
author: viniciusCamargo
layout: layouts/example.html
---

This example demonstrates the use of JavaScripts `async` and `await` keywords.
In this case the keywords are used for the `oninit` lifecycle method and act as simple wrapper around Mithril.js' `m.request`.
The api request itself is surrounded by a `try...catch` block.
Let's see the example.

## JavaScript

~~~js
const api = {
  path: 'https://jsonplaceholder.typicode.com',
  getPosts() {
    return m.request({ url: `${api.path}/posts` })
  }
}

const postView = ({ title, body }) => m('div', [
  m('h2', title),
  m('p', body)
])

const Posts = {
  posts: [],
  error: '',

  async oninit({state}) {
    try {
      state.posts = await api.getPosts()
    } catch (error) {
      state.error = error.message
    }
  },

  view({state}) {
    return state.error
      ? m('p', state.error)
      : state.posts.map(postView)
  }
}

m.mount(document.body, Posts)
~~~
