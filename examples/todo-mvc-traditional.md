---
title: Todo MVC (Traditional)
desc: Here is another Todo MVC implementation, this time a more traditional one.
date: 2021-10-29
tags: [todomvc, m.route, dom, onupdate, oninit]
level: expert
version: 2.0.4
author: osban
layout: layouts/example.html
flems:
  files:
    - .html
    - model.js
    - actions.js
    - header.js
    - main.js
    - footer.js
    - app.js
    - .css
---

## Markup

~~~html
<body>
  <section class="todoapp"></section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Created by <a href="http://todomvc.com">people</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
  <!-- Scripts here. Don't remove ↓ -->
  <!-- <script src="node_modules/todomvc-common/base.js"></script>-->
  <!-- <script src="js/app.js"></script>-->
</body>
~~~

## Model.js

~~~js
// model.js
const model = {
  todos: [],
  filters: [
    {filter: 'All', text: 'All'},
    {filter: false, text: 'Active'},
    {filter: true,  text: 'Completed'}
  ],
  filter: 'All',
  all: true,
  enter: 13
}

export default model
~~~

## Actions.js

~~~js
// actions.js
import model from './model'

const actions = {
  init: () => {model.todos = JSON.parse(localStorage.getItem('todos-mithril')) || []},
  clone: x => JSON.parse(JSON.stringify(x)),
  save: () => localStorage.setItem('todos-mithril', JSON.stringify(model.todos)),
  push:  t => {
    model.todos.push(actions.clone(t))
    actions.save()
  },
  done: x => {
    if (x === 'all') {
      model.todos.forEach(x => x.completed = model.all)
      model.all = !model.all
    }
    else model.todos[x].completed = !model.todos[x].completed
    actions.save()
  },
  clear: () => {
    model.todos = model.todos.filter(x => !x.completed)
    model.all = true
  }
}

export default actions
~~~

## Header.js

~~~js
// header.js
import model   from './model'
import actions from './actions'

const header = () => {
  let todon = {}

  const add = () => {
    todon.id = Date.now()
    todon.title.trim()
    todon.completed = false
    actions.push(todon)
    todon = {}
  }

  return {
    view: () =>
      m('header.header',
        m('h1', 'todos'),
        m('input.new-todo', {
          autofocus: true,
          placeholder: 'What needs to be done?',
          oninput: e => todon.title = e.target.value,
          onkeydown: e => {if (e.keyCode === model.enter && e.target.value.trim()) add()},
          value: todon.title
        })
      )
  }
}

export default header
~~~

## Main.js

~~~js
// main.js
import model   from './model'
import actions from './actions'

const main = () => {
  const escape = 27
  let todo = {}

  return {
    view: () =>
      m('section.main',
        m('input.toggle-all', {
          id: 'toggle-all',
          type: 'checkbox',
          checked: model.todos.every(x => x.completed)
        }),
        m('label', {
          for: 'toggle-all',
          onclick: () => actions.done('all')
        }, 'Mark all as complete'),
        model.todos
        .filter(x => model.filter === 'All' ? x : x.completed === model.filter)
        .map((x,i) =>
          m('ul.todo-list',
            m('li', {
                class: `${x.completed ? 'completed' : 'active'} ${x.id === todo.id && 'editing'}`,
              },
              m('.view',
                m('input.toggle', {
                  type: 'checkbox',
                  checked: x.completed,
                  onchange: () => actions.done(i)
                }),
                m('label', {ondblclick: () => todo = actions.clone(x)}, x.title),
                m('button.destroy', {onclick: () => model.todos.splice(i,1)})
              ),
              m('input.edit', {
                onupdate: ({dom}) => dom.focus(),
                oninput: e => todo.title = e.target.value,
                onblur: e => {
                  if (Object.keys(todo).length) {
                    if (!todo.title.trim()) {
                      model.todos.splice(i,1)
                      todo = {}
                    }
                    else {
                      model.todos[i] = actions.clone(todo)
                      actions.save()
                      todo = {}
                    }
                  }
                },
                onkeydown: e => {
                  if (e.keyCode === model.enter) e.target.blur()
                  else if (e.keyCode === escape) todo = {}
                },
                value: todo.title
              })
            )
          )
        )
      )
  }
}

export default main
~~~

## Footer.js

~~~js
// footer.js
import model   from './model'
import actions from './actions'

const footer = () => {
  const left = () => model.todos.filter(x => !x.completed).length

  return {
    view: () =>
      m('footer.footer',
        m('span.todo-count',
          m('strong', left()), ` item${left() === 1 ? '' : 's'} left`
        ),
        m('ul.filters',
          model.filters.map(x =>
            m('li',
              m('a', {
                class: model.filter === x.filter && 'selected',
                onclick: () => {model.filter = x.filter; m.route.set('/' + x.text)}
              }, x.text)
            )
          )
        ),
        model.todos.find(x => x.completed) &&
        m('button.clear-completed', {
          onclick: actions.clear
        }, 'Clear completed')
      )
  }
}

export default footer
~~~

## App.js

~~~js
// app.js
import model   from './model'
import actions from './actions'
import header  from './header'
import main    from './main'
import footer  from './footer'

const app = {
  oninit: () => actions.init(),
  view: () => [
    m(header),
    model.todos.length > 0 && m(main),
    model.todos.length > 0 && m(footer)
  ]
}

m.route(document.querySelector('.todoapp'), '/All', {'/:filter': app})
~~~

## CSS

~~~css
html,
body {
	margin: 0;
	padding: 0;
}

button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body {
	font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #f5f5f5;
	color: #4d4d4d;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-weight: 300;
}

:focus {
	outline: 0;
}

.hidden {
	display: none;
}

.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp input::input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp h1 {
	position: absolute;
	top: -155px;
	width: 100%;
	font-size: 100px;
	font-weight: 100;
	text-align: center;
	color: rgba(175, 47, 47, 0.15);
	-webkit-text-rendering: optimizeLegibility;
	-moz-text-rendering: optimizeLegibility;
	text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	border: 0;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.toggle-all {
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;
}

.toggle-all + label {
	width: 60px;
	height: 34px;
	font-size: 0;
	position: absolute;
	top: -52px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all + label:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
	color: #737373;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: calc(100% - 43px);
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	/*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;
}

.todo-list li .toggle:checked + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: #af5b5e;
}

.todo-list li .destroy:after {
	content: '×';
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}

.footer {
	color: #777;
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	border-top: 1px solid #e6e6e6;
}

.footer:before {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
	            0 8px 0 -3px #f6f6f6,
	            0 9px 1px -3px rgba(0, 0, 0, 0.2),
	            0 16px 0 -6px #f6f6f6,
	            0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
	float: left;
	text-align: left;
}

.todo-count strong {
	font-weight: 300;
}

.filters {
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;
}

.filters li {
	display: inline;
}

.filters li a {
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;
}

.filters li a:hover {
	border-color: rgba(175, 47, 47, 0.1);
  cursor: pointer;
}

.filters li a.selected {
	border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}

.info {
	margin: 65px auto 0;
	color: #bfbfbf;
	font-size: 10px;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio:0) {
	.toggle-all,
	.todo-list li .toggle {
		background: none;
	}

	.todo-list li .toggle {
		height: 40px;
	}
}

@media (max-width: 430px) {
	.footer {
		height: 50px;
	}

	.filters {
		bottom: 10px;
	}
}
~~~
