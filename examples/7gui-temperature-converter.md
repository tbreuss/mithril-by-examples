---
title: Temperature Converter from 7GUIs
date: 2021-10-18
tags: [7guis, m.mount]
level: beginner
version: latest
author: narayand16
layout: layouts/example.html
---

This is the 7GUIs temperature converter example implemented in Mithril.js.
The challenges here are bidirectional data flow and user-provided text input.

The task is to build a frame containing two textfields TC and TF representing the temperature in Celsius and Fahrenheit, respectively. Initially, both TC and TF are empty. When the user enters a numerical value into TC the corresponding value in TF is automatically updated and vice versa. When the user enters a non-numerical string into TC the value in TF is not updated and vice versa. The formula for converting a temperature C in Celsius into a temperature F in Fahrenheit is C = (F - 32) * (5/9) and the dual direction is F = C * (9/5) + 32.

See the original description at the 7GUIs homepage: <https://eugenkiss.github.io/7guis/tasks#temp>.

## JavaScript

~~~js
let root = document.body
let tempInCelsius
let tempInFahrenheit

let temperatureConverter = {
  view: function() {
    return m("main", [
      m("input.input[type=text]", {
        oninput: function(e) {
          tempInCelsius = getParsedInput(e.target.value);
          tempInFahrenheit = tempInCelsius ? ((tempInCelsius * (9/5) + 32).toFixed(1)) : undefined;
        },
        value: tempInCelsius
      }),
      m("label.label", " Celsius = "),
      m("input.input[type=text]", {
        oninput: function(e) {
          tempInFahrenheit = getParsedInput(e.target.value);
          tempInCelsius = tempInFahrenheit ? (((tempInFahrenheit - 32) * (5/9)).toFixed(1)) : undefined;
          },
          value: tempInFahrenheit
      }),
      m("label.label", " Farenheit")
    ])
  }
}

function getParsedInput(input) {
  if(input && input.trim().length > 0) {
    return isNaN(input) ? null : input;
  }
}

m.mount(root, temperatureConverter)
~~~

## HTML

~~~html
<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <title>Temperature Converter</title>
</head>
<body>
</body>
</html>
~~~
