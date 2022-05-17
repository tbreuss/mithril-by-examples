---
title: HEX to RGB Converter
abstract: Convert any Hex color code to its RGB value.
date: 2021-10-24
tags: [hex, rgb, converter, m.mount]
level: beginner
version: latest
author: prompt-07
layout: layouts/example.html
---

This example shows a simple converter, that converts any Hex color code to its RGB value.
You can enter e hex color and the appropriate RGB value is shown and the HTML body takes the color you entered.

## JavaScript

~~~js
var root = document.getElementById('wrap');
var userInput = '';
var r = '';
var g = '';
var b = '';
var store = '';
m.mount(root, {
	view: ()=> m(fetchColor, {colorCode: '#4682b4'})
});

function checkForRGB(userInput){
  if(userInput.length == 3){
  	userInput =
      userInput[0]
      +userInput[0]
      +userInput[1]
      +userInput[1]
      +userInput[2]
      +userInput[2];
  }

  r = parseInt(userInput.slice(0,2), 16);
  g = parseInt(userInput.slice(2,4), 16);
  b = parseInt(userInput.slice(4,6), 16);

  if( !(isNaN(r) || isNaN(g) || isNaN(b))){

  	document.body.style.backgroundColor = '#'+userInput;
  	let str = "rgb("+r+","+g+","+b+")";
  	document.getElementById('rgb').innerText = str;
  }


}


function fetchColor({attrs}) {

	const oninput = (e) => {
		userInput = e.target.value;
		if(userInput.length == 3 || userInput.length == 6)
			checkForRGB(userInput);

	}

	const onkeydown = (e) =>{
		if(e.keyCode == 13){

			if(userInput.length == 3 || userInput.length == 6)
				checkForRGB(userInput);

		}
	}

	function view(){

		return m('div.wrap',
			[m('input.hex[placeholder=#hexacode]', {
				oninput,
				onkeydown,
				value: userInput
			}),
			 m('lable#rgb')]
		)
	}


	return {view}
}
~~~

## HTML

~~~html
<div id='wrap'></div>
~~~
