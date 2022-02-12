---
title: Autocomplete Component
abstract: Autocomplete component with local options, conversion from a react example
date: 2021-10-26
tags: [autocomplete, form, input, m.mount]
level: beginner
version: 2.0.4
author: stephanhoyer
layout: layouts/example.html
flems:
  files:
    - Autocomplete.js
    - App.js
    - .css
---

This example shows an autocomplete component with local options.
The code is a conversion from a React component example from <https://blog.bitsrc.io/building-a-react-autocomplete-component-from-scratch-3f4d5618aa14>.
In this snippet several events like `onclick`, `oninput`, and `onkeydown` are used.
The last one allows you to select and accept a suggestion using the up, down, and enter key.

## Autocomplete.js

~~~js
// Autocomplete.js
const KEY_CODE_ENTER = 13
const KEY_CODE_UP = 38
const KEY_CODE_DOWN = 40

function Autocomplete ({attrs}) {
  const options = attrs.options
  let activeOption = 0
  let filteredOptions = []
  let showOptions = false
  let userInput = ''

  const oninput = (e) => {
    userInput = e.target.value
    showOptions = true
    activeOption = 0
    filteredOptions = options.filter(
      optionName => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )
  }

  const onclick = (e) => {
    filteredOptions = []
    showOptions = false
    userInput = e.currentTarget.innerText
  }

  const onkeydown = (e) => {
    if (e.keyCode === KEY_CODE_ENTER) {
      userInput = filteredOptions[activeOption]
      activeOption = 0
      showOptions = false
    } else if (e.keyCode === KEY_CODE_UP) {
      if (activeOption === 0) {
        return;
      }
      activeOption--
    } else if (e.keyCode === KEY_CODE_DOWN) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      activeOption++
    }
  };

  function view() {
    let optionList
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = m(
          'ul.options',
          filteredOptions.map((optionName, index) => m(
            'li',
            {
              className: index === activeOption ? 'option-active' : '',
              key: optionName,
              onclick
            },
            optionName
          ))
        )
      } else {
        optionList = m('.no-options', m('em', 'No Option!'))
      }
    }
    return [
      m('.search', [
        m('input.search-box[type=text]', {
          oninput,
          onkeydown,
          value: userInput
        }),
        m('input.search-btn[type=submit][value=]')
      ]),
      optionList
    ]
  }

  return { view }
}
~~~

## App.js

~~~js
// App.js
m.mount(document.body, {
  view: () => m(Autocomplete, {
    options: [
      'Papaya',
      'Persimmon',
      'Paw Paw',
      'Prickly Pear',
      'Peach',
      'Pomegranate',
      'Pineapple'
    ]
  })
});
~~~

## CSS

~~~css
body {
  background: #00b4cc;
}
.search {
  width: 30rem;
  margin: 10rem auto 2rem auto;
  text-align: right;
  position: relative;
}
.search-box {
  border: 4px solid transparent;
  border-radius: 2px;
  font-size: 2rem;
  width: 100%;
  padding: 1rem;
  transition: width 0.3s;
}
.search-box:focus {
  width: 100%;
  outline: none;
  border: 4px solid #08a1b6;
}
.search-btn {
  height: 100%;
  width: 4em;
  margin-top: -2em;
  position: absolute;
  top: 50%;
  right: 0.5rem;

  opacity: 0.2;
  background-color: transparent;
  border: 0;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAACnElEQVR4AcXZsUsbYRjH8e+dh2s1SyAGJwMJuDj1BIcEhJQIOnTq5F+QOf0jIq79A7oFh7aYyVBEkaZDC3awECc1AUXRIqUQotfFocnjJe/dk+b9PKP65Md7z13ee3Uwk2SNHKmngs5TnbDLJQqjA+RYZ4OXuDzvkSYf+cAJ44fPAYFhHeAzVhlqBBGrRoax8KjSJYhRXap4KCVoECiqQQKFLC0CZbXIElOBOwJ9cUchzm2Y5QsveN4tdfY4o00HSDHHPKuUmOV5v/D5SSSJ0MXfIY+HBB55dkIvRIIIvJDR28dnFJ/9kHH0MFaVDehRxlSZnuxAFUMZunKQKBJFUQ4wXTIYqcmPZ5GoFmUEahjw5eJTJI6ivBD4jCS/csrEVZZfU4yQk5OPhrwjcoRygQ0GVdCQf73OUEfisaMkHk1HDJHkYeDX82jlBzo+kCSEyxruwDP/EK1DbsWnhHDFgNTpodWjLgY9NECKfnvoyS4p8wBngN5Z/ABtQK8dP0AH0OuYB5iMqfAAMque7HJtHmAOPdnlxjzAPHqyy5V5gFX0ZJfj8AAn9CvhoeVRol8zPMAuj/xrlhW0Vpg1D3ApflhGR3b4wTlDvI24i4u+w9y0uyVrM213U1qxuy2/Z8bui8m23VezgGW7L6cBLdIWXs9FBAsHFCLCJI9opFMKXEzkkEp/IbK0bEdI0LARQRzVWoigPKy+Z5tlWooIiuP6NhVmAEiPNwLkqHDEw5CGx2wyDQDRI8T7l80U19xwxTFNmpwzKM1nFsyeCw7jFymCAxYjrHDp8r9cUOCUYRZ4Bw6AxVV47QJYXIVXLliNsOSC1Qh/XLAa4ZuDmmIcH1l2AaytwhZfmaAkn/qOb7eYBofJekOJJX7znfccAvwFyB3OeNys7d4AAAAASUVORK5CYII=");
}
.search-btn:hover {
  outline: none;
  opacity: 0.4;
  cursor: pointer;
}
.search-btn:focus {
  outline: none;
  opacity: 0.6;
}

ul.options {
  display: block;
  list-style: none;
  width: 30rem;
  transition: width 0.3s;
  margin: auto;
  position: relative;
}

ul.options li {
  display: block;
  background: white;
  margin: 10px auto;
  padding: 10px;
  font-size: 1.2rem;
  width: 100%;
  border-radius: 2px;
}
ul.options li:hover {
  font-weight: bold;
  color: #00b4cc;
  cursor: pointer;
  transition: 0.3s all;
}

ul.options li.option-active {
  background: whitesmoke;
  font-size: 1.5rem;
  color: #00b4cc;
}
.no-options {
  color: white;
}
~~~
