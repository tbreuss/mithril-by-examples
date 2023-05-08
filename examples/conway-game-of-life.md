---
title: Conway Game Of Life
abstract: Conway Game Of Life using a central model for state management.
date: 2021-10-26
tags: [3rd-party, game, m.mount, m.redraw, oninit]
level: expert
version: latest
author: boazblake
layout: layouts/example.html
flems:
  links:
    - ramda@0.26.1
---

Conway Game Of Life is a complex example showing a cellular automaton devised by the British mathematician John Horton Conway in 1970.
It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.
This example is using a central model for state management.
Besides that the example requires ramda.js, a practical functional library for JavaScript, and Mithril.js' own stream library.

## JavaScript

~~~js
const compose = R.compose
const flatten = R.flatten
const range = R.range
const without = R.without
const values = R.values
const prop = R.prop
const root = document.getElementById('GameOfLife')
const log = m => v => {console.log(m,v); return v}

const SIBLING_COORDS = [[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1]]

const model = {
  isRunning: false, 
  matrix: [],
  delay: 300,
  size: 50,
  width: 1000,
  generation: 0
}

const restart = (mdl) => {
  mdl.isRunning = false
  mdl.delay = 300
  mdl.size = 50
  mdl.width = 1000
  mdl.generation = 0
  mdl.matrix = []
  return mdl
}

const withinBounds = (limit) => (coords) => 
  !(coords.includes(limit) || coords.includes(-1))
  
const toSiblings = (limit) => (sibCoords) => (coords) =>
  sibCoords
    .map((sib) => [sib[0] + coords[0], sib[1] + coords[1]])
    .filter(withinBounds(limit))

const toCell = (size, coords) =>  {
  let siblings = toSiblings(size)(SIBLING_COORDS)(coords)
  return {
    isAlive: false,
    coords,
    siblings: siblings.map(s => s.toString())
  }
}
const toMatrix = (width, xs) =>
    xs.reduce((rows, key, index) => 
      (index % width == 0 
        ? rows.push([key]) 
        : rows[rows.length-1].push(key)) && rows, 
      []);

const createMatrix = mdl => {
  let cellsArray = range(0, mdl.size * mdl.size)
  let cellsMatrix = toMatrix(mdl.size, cellsArray)
  mdl.matrix = cellsMatrix.map((row, rowIdx) => 
    row.map((key, idx) => 
      toCell(mdl.size, [idx, rowIdx])))
      
  return mdl
}
 
const initGame = ({attrs:{mdl}}) => createMatrix(mdl)
 
const makeNewGame = compose(createMatrix,restart)
 
const calcNextPhase = (mdl) => {
  let cellsArray = flatten(mdl.matrix)
  let cells =  cellsArray.reduce((acc, cell) => {
      acc[cell.coords] = cell.isAlive
      return acc},{})
      
  const getCellStatus = coord => cells[coord.toString()]
  
  cellsArray.map((cell) => {
    let neighborsAlive =  without([false, undefined],(cell.siblings.map(getCellStatus)))
    if (cell.isAlive) {
      if (neighborsAlive.length <= 2) {
        cell.isAlive = false
      }

      if ([2, 3].includes(neighborsAlive.length)) {
        cell.isAlive = true
      }

      if (neighborsAlive.length > 3) {
        cell.isAlive = false
      }
    } else {
      if (neighborsAlive.length == 3) {
        cell.isAlive = true
      }
    }
  })
  return mdl
}

const runGOL = (mdl) => {
  if (mdl.isRunning) {
   mdl.generation++
    setTimeout(() => {
      m.redraw()
      return runGOL(calcNextPhase(mdl))
    }, mdl.delay )
  } else {
    return mdl
  }
}

const advanceLifeCycle = mdl => (e) => {
  mdl.isRunning = false
  mdl.generation++
  calcNextPhase(mdl)
}

const goForth = mdl => (e) => {
  mdl.isRunning = true
  runGOL(mdl)
}

const setDelay = mdl => (e) => mdl.delay = e.target.value

const setMatrixSize = mdl => (e) => {
  mdl.size = e.target.value
  createMatrix(mdl)
}
const Matrix = {
  view: ({ attrs: { mdl } }) =>   
    m('Table',
      { style: { width: `${mdl.width}px` } },
      mdl.matrix.map((row) =>
      m('tr', row.map((cell) => 
        m('td', {
        class: cell.isAlive ? 'alive' : 'dead',
        style: {
          height: `${mdl.width / mdl.size  }px`,
          },
        onclick: () => cell.isAlive = !cell.isAlive}
        )))))
}

const Input =  {
  view: ({ attrs: { mdl, label, min, max, step, value, fn } }) => [
    m('label', [label,
    m('input', {
      inputmode: 'numeric',
      pattern:'[0-9]*',
      type: 'number',
      min,
      max,
      step,
      value,
      oninput: e => fn(e)
    })
    ])
  ]
}

const Button = {
  view:({attrs:{mdl, label, fn}}) => 
    m('button', {onclick: (e) => fn(e)}, label)
}

const TopRow = {
  view:({attrs:{mdl}})=>
   m('.topRow', [
      m(Button, {mdl, fn:() => makeNewGame(mdl), label: 'Restart'}),
      m(Button, {mdl, fn: advanceLifeCycle(mdl), label:'Advance 1 Generation'}),
      m(Button, {mdl, fn:goForth(mdl), label:'Go Forth'})])
}

const BottomRow = {
  view:({attrs:{mdl}})=>
    m('.bottomRow',[
      m(Input, { mdl, label: 'Delay(ms):', min:0, max:1000, step:100, value:mdl.delay, fn:setDelay(mdl) }),
      m(Input, { mdl, label: 'size:', min:10, max:1000, step:10, value:mdl.size, fn: setMatrixSize(mdl) })])
}
 
const Toolbar = {
  view: ({ attrs: { mdl } }) =>
    m('.toolbar', [
      m(TopRow, {mdl}),
      m(BottomRow, {mdl})
    ])
}

const GameOfLife = {
  oninit: initGame,
  view: ({ attrs: { mdl } }) => {
    return m('.container', [
      m('h2', `generation: ${mdl.generation}`),
      m(Toolbar, { mdl }),
      m(Matrix, { mdl }),
    ])
  }
}

m.mount(root, {view:() => m(GameOfLife, {mdl:model})})
~~~

## CSS

~~~css
* {
  font-family: Montserrat, Sans-Serif;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}

.toolbar {
  line-height: 70px;
  padding: 10px;
  border: 1px solid #ecf0f1;
  justify-content: space-between;
}

.topRow {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}

.bottomRow {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}

input,
button {
	text-transform: uppercase;
	background: #ffffff;
	padding: 20px;
	border: 4px solid #20bf6b !important;
	border-radius: 6px;
	display: inline-block;
	transition: all 0.3s ease 0s;

}

input,
button:hover {
/*   color: #20bf6b !important; */
	border-radius: 50px;
	border-color: #494949 !important;
	transition: all 0.3s ease 0s;
}

Table{
  margin: 0 auto;
  border: dashed 1px #8e44ad;
}

td {
  cursor: pointer;
  border-radius: 35%;
}

.alive {
  background: #8e44ad;
}

.dead {
  background: #ecf0f1;
}
~~~



