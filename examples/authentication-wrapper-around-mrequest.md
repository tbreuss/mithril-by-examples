---
title: Authentication Wrapper Around `m.request`
date: 2021-10-26
tags: [jwt, local storage, wrapper, request]
level: beginner
version: 2.0.4
author: cmnstmntmn
credits: []
links: []
layout: layouts/example.html
---

Example showing an authentication wrapper around Mithrils `m.request`.

## JavaScript

~~~js
var api = {
  request: (options) => {
    options.config = xhr => {
      xhr.setRequestHeader('Authorization', 'Bearer ' + api.token())
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    }

    return m.request(options).catch((error) => {
      if(error.code == 401) m.route.set("/login")

      throw error
    });

  },
  token: (value) => {
    if (value)
      localStorage.setItem('token', value)

    return localStorage.getItem('token')
  },
  tokenRemove: () => localStorage.removeItem('token')
}

// -- utils
function getRequestDemo() {
  api.request({
      method: "GET", url: "https://httpbin.org/headers"
  }).then(function(response) {
    //-- handle response
    console.log('Success, Auth:', response.headers.Authorization)
	}).catch(function(e){
    //-- handle error
    console.error('Error!')
  })
}

function checkAuth() {
  if (!api.token())
    return false
  else
    return true
}

function doFakeLogin(username) {
  // -- simulate login
  api.token(username)
}

// -- app code

var loginForm = {
  model: {
    username: '',
    password: ''
  },
  view: function(vnode) {
      return !checkAuth() ? [
        m('input[type="text"][placeholder="Username"]', {
          onkeyup: function(e){
            vnode.state.model.username = e.target.value
          }
        }),
        m('br'),
        m('input[type="password"][placeholder="Password"]', {
          onkeyup: function(e){
            vnode.state.model.password = e.target.value
          }
        }),
        m('br'),
        m('button', {
        onclick: () => doFakeLogin(vnode.state.model.username)
      }, 'Login')
    ]
    : [
        m('h2', 'Hooray!'),
        m('button[type="button"]', {
          onclick: api.tokenRemove
        }, 'Logout/Destroy token'),
        m('br'),
        m('button[type="button"]', {
          onclick: getRequestDemo
        }, 'Make a POST request'),
        m('span', 'and watch the request in the console')
    ]
  }
}

var app = {
  view: function(vnode) {
    return [
      m('h1', 'Wrapper around m.request to handle authentication with localstorage'),
      m('ol',
        m('li', 'login - markup only;'),
        m('li', 'a token is added to sessionStorage;'),
        checkAuth() && m('li', {style: "color:green"}, 'make a POST request - Authorization header is now present')
      ),
      //--
      m(loginForm)
    ]
  }
}

m.mount(document.body, app);
~~~
