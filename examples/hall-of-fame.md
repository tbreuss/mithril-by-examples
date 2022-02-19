---
title: Hall of Fame
date: 2021-11-02
tags: [bss, m.mount]
level: beginner
version: 1.1.6
author: artydev
link: https://dev.to/artydev/mithril-hall-of-lame-3f7g
layout: layouts/example.html
flems:
  links:
    - bss@1.5.2
---

This very nice example is showing a *Hall of Fame* of different JavaScript frameworks and libraries.
In the live example you can vote for each framework, the number of votes is shown, and you can reset all votes by clicking a button.
The example shows how to handle state with Mithril.js, and it's also shows the use case of [Better Style Sheets](https://github.com/porsager/bss) (BSS), a simpler way to do CSS in Javascript directly on the elements you're styling.

## JavaScript

~~~js
let root = document.getElementById("root")

let globalCount = 0

b.css('body', b({
   maxWidth: '80%',
   margin: "0 auto"
}))

let cardStyle = "" + b({
	border: '1px solid black',
	width: '250px',
	height: '230px',
  textAlign: "center",
  paddingTop: '20px',
  ':hover' : {
    cursor: 'pointer'
  }
})

let layoutCards = "" + b({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-around"
})

let buttonContainer = "" + b({
	textAlign: "center",
	border: "none",
	marginTop: "10px",
	marginBottom: "10px;",

})

let buttonStyle = "button." + b({
	border: "none",
  width: "250px",
	":hover": {
		cursor: "pointer"
	}
})

let hrefStyle = "a." + b({
  textDecoration: 'none',
  color: "#121212",
  fontSize: "1.2rem"
})

let titleStyle = "h1." + b({
  textAlign: "center",
  fontSize : "2rem"
})

let creditStyle = "p" + b({
  textAlign: "center"
})

let claimStyle = "p" + b({
  textAlign: "left",
  padding:'10px',
  lineHeight: "1.5rem"
})

let unicode = "" + b({
  fontSize: "1.0rem"
})

let statUser = "" + b({
  fontSize: "1.0rem",
  marginTop: "5px"
})

function Card() {
  let clickCard = link => {window.location.href = link}
  let report = count => `like(s) : ${count} (${(100 * count/globalCount).toFixed(2)} %)`
	return {
		view: ({attrs: {name, count, clickHandler}}) =>
			m("",
				m(cardStyle, {onclick: () => clickCard(Links[name])}, [
          m(hrefStyle, {href: Links[name]}, name),
          Claims[name] && m(claimStyle, Claims[name])
        ]),
				m(buttonContainer,
          m(buttonStyle, {onclick: clickHandler},
            m('p', [
              m(unicode, m("span", "Vote \u2192 \ud83d\udc4d")),
              m(statUser, (globalCount > 0 && report(count)))
          ]))
        )
			)
	}
}

function Lib() {
	let count = 0
	let clickHandler = () => {
		globalCount++
		count++
	}
	let getPerCent = () => {
		let percent = 0;
		if (globalCount > 0) {
			percent = 100 * count / globalCount
		}
		return `(${count}) / (${percent})`
	}
	return {
		view: v =>
      m(Card, {
				name: v.attrs.name,
				clickHandler,
				count: globalCount == 0 ? 0 : count,
				getPerCent
			})
	}
}

// I could have done a Json object...this is easier to read
const Libs = ['Mithril.js', 'AppRun', 'HyperApp', "Svelte", "Stencil"]

const Links = {
 Mithril: 'https://mithril.js.org/',
 AppRun: 'https://github.com/yysun/apprun',
 HyperApp: 'https://github.com/jorgebucaran/hyperapp',
 Svelte: 'https://github.com/sveltejs/svelte',
 Stencil: 'https://stenciljs.com/'
}

const Claims = {
  Mithril: "Mithril.js is a modern client-side Javascript framework for building Single Page Applications. It's small (< 8kb gzip), fast and provides routing and XHR utilities out of the box",
  AppRun: "AppRun is a 3K library for building applications using the elm architecture and event publication and subscription.",
  HyperApp: "1 kB JavaScript micro-framework for building declarative web applications ",
  Svelte: "The magical disappearing UI framework The web's JavaScript bloat crisis, solved. Svelte turns your templates into tiny, framework-less vanilla JavaScript.",
  Stencil: "The magical, reusable web component compiler"
}

let App = {
	view: () => [
    m(titleStyle, "Hall of Fame"),
		m(layoutCards, Libs.map(item => m(Lib, { name: item }))),
		m('h2', 'Number of votes: ' + globalCount),
		m('button', {onclick: () => globalCount = 0}, "reset votes"),
    m(creditStyle, "Made with the awesome and lightweight Mithril.js")
	]
}
m.mount(root, App)
~~~

## Markup

~~~html
<div id="root"></div>
~~~
