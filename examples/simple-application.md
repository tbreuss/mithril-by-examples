---
title: Simple Application
date: 2021-10-16
tags: [model, list, form, layout, tutorial, official, m.request, m.route, vnode]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
flems:
  files:
    - UserModel.js
    - UserList.js
    - UserForm.js
    - Layout.js
    - app.js
    - .css
---

This is the simple application from the official Website that shows off how to do most of the major things you would need to deal with while using Mithril.

## UserModel.js

~~~js
// UserModel.js
var User = {
    list: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users",
            withCredentials: true,
        })
        .then(function(result) {
            User.list = result.data
        })
    },

    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
            withCredentials: true,
        })
        .then(function(result) {
            User.current = result
        })
    },

    save: function() {
        return m.request({
            method: "PUT",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
            body: User.current,
            withCredentials: true,
        })
    }
}
~~~

## UserList.js

~~~js
// UserList.js
var UserList = {
    oninit: User.loadList,
    view: function() {
        return m(".user-list", User.list.map(function(user) {
            return m(m.route.Link, {href: "/edit/" + user.id, class: 'user-list-item'}, user.firstName + " " + user.lastName)
        }))
    }
}
~~~

## UserForm.js

~~~js
// UserForm.js
var UserForm = {
    oninit: function(vnode) {User.load(vnode.attrs.id)},
    view: function() {
        return m("form", {
                onsubmit: function(e) {
                    e.preventDefault()
                    User.save()
                }
            }, [
            m("label.label", "First name"),
            m("input.input[type=text][placeholder=First name]", {
                oninput: function(e) {User.current.firstName = e.target.value},
                value: User.current.firstName
            }),
            m("label.label", "Last name"),
            m("input.input[placeholder=Last name]", {
                oninput: function(e) {User.current.lastName = e.target.value},
                value: User.current.lastName
            }),
            m("button.button[type=submit]", "Save"),
        ])
    }
}
~~~


## Layout.js

~~~js
// Layout.js
var Layout = {
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
                m(m.route.Link, {
                  href: '/list'
                }, "Users")
            ]),
            m("section", vnode.children)
        ])
    }
}
~~~

## app.js

~~~js
// app.js
m.route.prefix = '#'
m.route(document.body, "/list", {
    "/list": {
        render: function() {
            return m(Layout, m(UserList))
        }
    },
    "/edit/:id": {
        render: function(vnode) {
            return m(Layout, m(UserForm, vnode.attrs))
        }
    },
})
~~~

## CSS

~~~css
body, .input, .button {
  font: normal 16px Verdana;
  margin: 20px;
}

.layout {
  margin: 10px auto;
  max-width: 1000px;
}

.menu {
  margin: 0 0 30px;
}

.user-list {
  list-style: none;
  margin: 0 0 10px;
  padding: 0;
}

.user-list-item {
  background: #fafafa;
  border: 1px solid #ddd;
  color: #333;
  display: block;
  margin: 0 0 1px;
  padding: 8px 15px;
  text-decoration: none;
}

.user-list-item:hover {
  text-decoration: underline;
}

.label {
  display: block;
  margin: 0 0 5px;
}

.input {
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  margin: 0 0 10px;
  padding: 10px 15px;
  width: 100%;
}

.button {
  background: #eee;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #333;
  display: inline-block;
  margin: 0 0 10px;
  padding: 10px 15px;
  text-decoration: none;
}

.button:hover {
  background: #e8e8e8;
}
~~~
