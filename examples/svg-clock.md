---
title: SVG Clock
desc: "This example was taken from the official website at <https://mithril.js.org/examples.html> and slightly modified. It shows an animated clock using SVG."
date: 2021-10-27
tags: [animation, official, svg, m.render]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
---

## JS

~~~js
var clock = m("svg[viewBox='0 0 300 300'][xmlns='http://www.w3.org/2000/svg'][xmlns:xlink='http://www.w3.org/1999/xlink']", [
	m("g[transform='translate(150,150)']", [
		m("g", [
			m("circle[fill='none'][r='108'][stroke='gray'][stroke-width='4']"),
			m("circle[fill='none'][r='97'][stroke='black'][stroke-dasharray='4,46.789082'][stroke-width='11'][transform='rotate(-1.5)']"),
			m("circle[fill='none'][r='100'][stroke='black'][stroke-dasharray='2,8.471976'][stroke-width='5'][transform='rotate(-.873)']")
		]),
		m("g[id='hands'][transform='rotate(180)']", [
			m("g[id='hour']", [
				m("line[opacity='.5'][stroke='blue'][stroke-linecap='round'][stroke-width='5'][y2='75']"),
				m("animateTransform[attributeName='transform'][by='360'][dur='12h'][repeatCount='indefinite'][type='rotate']"),
				m("circle[r='7']")
			]),
			m("g[id='minute']", [
				m("line[opacity='.9'][stroke='green'][stroke-linecap='round'][stroke-width='4'][y2='93']"),
				m("animateTransform[attributeName='transform'][by='360'][dur='60min'][repeatCount='indefinite'][type='rotate']"),
				m("circle[fill='red'][r='6']")
			]),
			m("g[id='second']", [
				m("line[stroke='red'][stroke-linecap='round'][stroke-width='2'][y1='-20'][y2='102']"),
				m("animateTransform[attributeName='transform'][by='360'][dur='60s'][repeatCount='indefinite'][type='rotate']"),
				m("circle[fill='blue'][r='4']")
			])
		])
	]),
	m("script", [
		"function setClock() {" +
		"	var date = new Date();" +
		"	var h = parseInt(date.getHours());" +
		"	h = h > 12 ? h-12: h;" +
		"	var m = parseInt(date.getMinutes());" +
		"	var s = parseInt(date.getSeconds());" +
		"" +
		"	var second = 6*s;" +
		"	var minute =(m+s/60)*6;" +
		"	var hour = (h+m/60+s/3600)*30;" +
		"" +
		"	var hourHand = document.getElementById('hour');" +
		"	var minuteHand = document.getElementById('minute');" +
		"	var secondHand = document.getElementById('second');" +
		"" +
		"	hourHand.setAttribute('transform','rotate('+ hour.toString() +')');" +
		"	minuteHand.setAttribute('transform','rotate('+ minute.toString() +')');" +
		"	secondHand.setAttribute('transform','rotate('+ second.toString() +')');" +
		"};" +
		"setClock();"
	]),
])

m.render(document.getElementById("root"), [clock])
~~~

## HTML

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SVG Clock</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
~~~

## CSS

~~~css
#root {
  margin:auto;
  max-width:600px;
  width:100%;
}
~~~
