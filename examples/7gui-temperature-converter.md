---
title: Temperature Converter from 7GUIs
date: 2021-10-18
tags: [7guis]
level: beginner
version: 2.0.4
authors: [narayand16]
credits: []
links: []
layout: layouts/example.html
---

See <https://eugenkiss.github.io/7guis/tasks#temp>.

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

