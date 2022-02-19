---
layout: layouts/main.html
title: API Methods
---

One of the best things about Mithril.js is that it has a very small footprint.
And most of the time not even all methods are needed.
Therefore, the number of API methods is really manageable.

Often used in a project:

- [m](#m)
- [m.render](#m.render)
- [m.mount](#m.mount)
- [m.route](#m.route)
- [m.request](#m.request)

Rarely or never used in a project:

- [m.jsonp](#m.jsonp)
- [m.parseQueryString](#m.parsequerystring)
- [m.buildQueryString](#m.buildquerystring)
- [m.buildPathname](#m.buildpathname)
- [m.parsePathname](#m.parsepathname)
- [m.trust](#m.trust)
- [m.fragment](#m.fragment)
- [m.redraw](#m.redraw)

This means, you only have to know five API methods to build your brilliant SPA application. 👌

<h2 id="m">m(selector, attributes, children)</h2>

Hyperscript function that represents an HTML element in a Mithril.js view.

~~~js
m("div.class#id", {title: "title"}, ["children"])
~~~

<h2 id="m.render">m.render(element, vnodes)</h2>

Renders a template to the DOM.

~~~js
m.render(document.body, "hello")
// <body>hello</body>
~~~

[Show examples using ”m.render”](/tags/m.render/)

<h2 id="m.mount">m.mount(element, component)</h2>

Activates a component, enabling it to autoredraw on user events.

~~~js
var state = {
  count: 0,
  inc: function() {state.count++}
}

var Counter = {
  view: function() {
    return m("div", {onclick: state.inc}, state.count)
  }
}
m.mount(document.body, Counter)
~~~

[Show examples using ”m.mount”](/tags/m.mount/)


<h2 id="m.route">m.route(root, defaultRoute, routes)</h2>

Navigate between "pages" within an application.

~~~js
var Home = {
  view: function() {
    return "Welcome"
  }
}

m.route(document.body, "/home", {
  "/home": Home, // defines `https://localhost/#!/home`
})
~~~

[Show examples using ”m.route”](/tags/m.route/)


<h2 id="m.route.set">m.route.set(path)</h2>

Redirects to a matching route.

~~~js
m.route.set("/home")
~~~


<h2 id="m.route.get">m.route.get()</h2>

Returns the last fully resolved routing path, without the prefix.

~~~js
var currentRoute = m.route.get()
~~~


<h2 id="m.route.prefix">m.route.prefix</h2>

Defines a router prefix. Must be set before invoking m.route().

~~~js
m.route.prefix = "#!"
~~~


<h2 id="m.route.link">m(m.route.Link, ...)</h2>

Creates a dynamic routable link.

~~~js
m(m.route.Link, {href: "/Home"}, "Go to home page")
~~~


<h2 id="m.route.param">m.route.param()</h2>

Retrieves a route parameter from the last fully resolved route.

~~~js
value = m.route.param(key)
~~~


<h2 id="m.route.skip">m.route.SKIP</h2>

A special value that can be returned from a route resolver's onmatch to skip to the next route.


<h2 id="m.request">m.request(options)</h2>

Makes XHR (aka AJAX) requests, and returns a promise.

~~~js
m.request({
  method: "PUT",
  url: "/api/v1/users/:id",
  params: {id: 1, name: "test"}
})
.then(function(result) {
  console.log(result)
})
~~~

[Show examples using ”m.request”](/tags/m.request/)


<h2 id="m.jsonp">m.jsonp(options)</h2>

Makes JSON-P requests.

~~~js
m.jsonp({
  url: "/api/v1/users/:id",
  params: {id: 1},
  callbackKey: "callback",
})
.then(function(result) {
  console.log(result)
})
~~~


<h2 id="m.parsequerystring">m.parseQueryString(querystring)</h2>

Turns a string of the form `?a=1&b=2` to an object.

~~~js
var object = m.parseQueryString("a=1&b=2")
// {a: "1", b: "2"}
~~~


<h2 id="m.buildquerystring">m.buildQueryString(object)</h2>

Turns an object into a string of form `a=1&b=2`.

~~~js
var querystring = m.buildQueryString({a: "1", b: "2"})
// "a=1&b=2"
~~~


<h2 id="m.buildpathname">m.buildPathname(object)</h2>

Turns a path template and a parameters object into a string of form `/path/user?a=1&b=2`.

~~~js
var querystring = m.buildPathname("/path/:id", {id: "user", a: "1", b: "2"})
// "/path/user?a=1&b=2"
~~~


<h2 id="m.parsepathname">m.parsePathname(string)</h2>

Turns a string of the form `/path/user?a=1&b=2` to an object.

~~~js
var object = m.parsePathname("/path/user?a=1&b=2")
// {path: "/path/user", params: {a: "1", b: "2"}}
~~~


<h2 id="m.trust">m.trust(htmlString)</h2>

Turns an HTML or SVG string into unescaped HTML or SVG.

~~~js
m.render(document.body, m.trust("<h1>Hello</h1>"))
~~~

[Show examples using ”m.trust”](/tags/m.trust/)


<h2 id="m.fragment">m.fragment(attrs, children)</h2>

Allows attaching lifecycle methods to a fragment vnode

~~~js
var groupVisible = true
var log = function() {
  console.log("group is now visible")
}

m("ul", [
  m("li", "child 1"),
  m("li", "child 2"),
  groupVisible ? m.fragment({oninit: log}, [
    // a fragment containing two elements
    m("li", "child 3"),
    m("li", "child 4"),
  ]) : null
])
~~~

<h2 id="m.redraw">m.redraw()</h2>

Updates the DOM after a change in the application data layer.

~~~js
var count = 0
function inc() {
  setInterval(function() {
    count++
    m.redraw()
  }, 1000)
}

var Counter = {
  oninit: inc,
  view: function() {
    return m("div", count)
  }
}

m.mount(document.body, Counter)
~~~

[Show examples using ”m.redraw”](/tags/m.redraw/)

[For more information see official website](https://mithril.js.org/api.html)
