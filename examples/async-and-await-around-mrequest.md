---
title: Async and Await Around m.request
date: 2021-10-26
tags: [m.request, async-await, m.mount, api, oninit]
level: beginner
version: 2.0.4
author: viniciusCamargo
layout: layouts/example.html
---

Demonstrate async and await around Mitrhils `m.request`.

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
