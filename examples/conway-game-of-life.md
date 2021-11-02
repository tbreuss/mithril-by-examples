---
title: Conway Game Of Life
date: 2021-10-26
tags: [3rd-party, game, m.stream, m.mount, m.redraw, oninit]
level: expert
version: 2.0.4
author: boazblake
layout: layouts/example.html
flems:
  links:
    - ramda@0.26.1
    - mithril-stream@2.0.0/stream.js
---

Conway Game Of Life using a central model for state management.

## JS

~~~js
const Stream  = m.stream
const compose = R.compose
const range = R.range
const without = R.without
const values = R.values

const siblingCoords = [[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1]]

const model = {
  isRunning: Stream(false),
  board: {},
  delay: Stream(1000),
  randomized: Stream(15),
  size: Stream(30),
  width: Stream(800),
  lifecycle: Stream(0)
}

const restart = (mdl) => {
  mdl.isRunning(false)
  mdl.delay(1000)
  mdl.randomized(15)
  mdl.size(30)
  mdl.width(800)
  mdl.lifecycle(0)
  return mdl
}


const withinBounds = (limit) => (coords) =>
  !(coords.includes(limit) || coords.includes(-1))

const toSiblingModel = (acc, sibling) => {
  acc[sibling] = false
  return acc
}

const calcSiblings = (limit) => (sibCoords) => (coords) =>
  sibCoords
    .map((sib) => [sib[0] + coords[0], sib[1] + coords[1]])
    .filter(withinBounds(limit))
    .reduce(toSiblingModel, {})

const makeCell = (mdl) => (size) => (idx) => {
  let coords = [idx % size, Math.floor(idx / size)]
  let siblings = calcSiblings(size)(siblingCoords)(coords)
  let cell = {
    key: idx,
    value: "",
    isAlive: false,
    coords,
    siblings
  }
  mdl.board[coords] = cell

  return mdl
}

const makeBoardFromSize = (mdl, size) => {
  mdl.size(size)
  return range(0, size * size).map(makeCell(mdl)(size))
}

const calculateCell = (mdl) => {
  Object.keys(mdl.board).map((cell) => {
    let cellsAlive = without([false], values(mdl.board[cell].siblings)).length

    if (mdl.board[cell].isAlive) {
      if (cellsAlive <= 2) {
        mdl.board[cell].isAlive = false
      }

      if ([2, 3].includes(cellsAlive)) {
        mdl.board[cell].isAlive = true
      }

      if (cellsAlive > 3) {
        mdl.board[cell].isAlive = false
      }
    } else {
      if (cellsAlive == 3) {
        mdl.board[cell].isAlive = true
      }
    }
  })
  return mdl
}

const updateSiblings = (mdl) => {
  Object.keys(mdl.board).map((cell) =>
    Object.keys(mdl.board[cell].siblings).map(
      (sibling) =>
        (mdl.board[cell].siblings[sibling] = mdl.board[sibling].isAlive)
    )
  )

  return mdl
}

const runGOL = (mdl) => {
  if (mdl.isRunning()) {
    mdl.lifecycle(mdl.lifecycle() + 1)
    setTimeout(() => {
      m.redraw()
      return runGOL(updateCells(mdl))
    }, mdl.delay())
  } else {
    return mdl
  }
}

const randomizeCells = (mdl) => {
  let randomCells = Object.keys(mdl.board)
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor((mdl.randomized() / 100) * (mdl.size() * mdl.size())))

  randomCells.map((cell) => (mdl.board[cell].isAlive = true))

  return mdl
}


const initBoard = mdl =>   {
  makeBoardFromSize(mdl, Number(mdl.size()))
  createSeed(mdl)
}

const makeNewGame = mdl => e => {
  restart(mdl)
  initBoard(mdl)
}

const advanceLifeCycle = mdl => (e) => {
  mdl.isRunning(false)
  mdl.lifecycle(mdl.lifecycle() + 1)
  updateCells(mdl)
}

const goForth = mdl => (e) => {
  mdl.isRunning(true)
  runGOL(mdl)
}

const randomize = mdl => (e) =>{
  mdl.randomized(e.target.value)
  initBoard(mdl)
}

const setDelay = mdl => (e) => mdl.delay(e.target.value)

const setBoardSize = mdl => (e) => {
  mdl.size(e.target.value)
  initBoard(mdl)
}

const updateCells = compose(calculateCell, updateSiblings)
const createSeed = compose(updateSiblings, randomizeCells)

const Cell = {
  view: ({ attrs: { mdl, cell } }) => {
    return m(".cell", {
      class: cell.isAlive ? "alive" : "dead",
      style: {
        fontSize: `${mdl.width() / mdl.size() / 2}px`,
        height: `${mdl.width() / mdl.size() / 2}px`,
        flex: `1 1 ${mdl.width() / mdl.size()}px`
      },
      onclick: () => {
        mdl.board[cell.coords].isAlive = !cell.isAlive
        updateSiblings(mdl)
      }
    })
  }
}

const Board = ({ attrs: { mdl } }) => {
  makeBoardFromSize(mdl, Number(mdl.size()))
  return {
    oninit: ({ attrs: { mdl } }) => createSeed(mdl),
    view: ({ attrs: { mdl } }) => {
      return m(
        ".board",
        { style: { width: `${mdl.width()}px` } },
        Object.keys(mdl.board).map((coord) => {
          let cell = mdl.board[coord]
          return m(Cell, { key: cell.key, cell, mdl })
        })
      )
    }
  }
}

const Input = () => {
  return {
    view: ({ attrs: { mdl, label, min, max, step, value, fn } }) => [
      m("label", [label,
      m("input[type='number']", {
        inputmode: 'numeric',
        pattern:"[0-9]*",
        min,
        max,
        step,
        value,
        onchange: e => fn(e)
      })
      ])
    ]
  }
}

const Button = () => {
  return {
    view:({attrs:{mdl, label, fn}}) => m(
        "button", {onclick: (e) => fn(e)},
        label
      )
  }
}

const TopRow = {
  view:({attrs:{mdl}})=>
   m('.topRow', [m(Button, {mdl, fn: makeNewGame(mdl), label: 'New Game'}),
      m(Button, {mdl, fn: advanceLifeCycle(mdl), label:"Advance 1 Lifecycle"}),
      m(Button, {mdl, fn:goForth(mdl), label:"Go Forth"})])
}

const BottomRow = {
  view:({attrs:{mdl}})=>
    m('.bottomRow',[
      m(Input, { mdl, label: 'Randomize(%):', min:0, max:100, step:1, value:mdl.randomized(), fn:randomize(mdl) }),
      m(Input, { mdl, label: 'Delay(ms):', min:0, max:1000, step:100, value:mdl.delay(), fn:setDelay(mdl) }),
      m(Input, { mdl, label: 'size:', min:30, max:100, step:10, value:mdl.size(), fn: setBoardSize(mdl) })])
}


const Toolbar = {
  view: ({ attrs: { mdl } }) =>
    m(".toolbar", [
      m(TopRow, {mdl}),
      m(BottomRow, {mdl})
    ])
}

const GameOfLife = {
  view: ({ attrs: { mdl } }) => {
    return m(".container", [
      m(Toolbar, { mdl }),
      m(Board, {
        mdl
      }),
      m("h2", `lifecycle: ${mdl.lifecycle()}`)
    ])
  }
}

m.mount(document.body , {view:() => m(GameOfLife, {mdl:model})})
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

button {
	box-shadow: 0px 10px 14px -7px #276873;
	background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
	background-color:#599bb3;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:20px;
	font-weight:bold;
	padding:13px 32px;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
}
button:hover {
	background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
	background-color:#408c99;
}
button:active {
	position:relative;
	top:1px;
}

label > * {
  padding: 10px;
  margin: 10px;
	background: #1abc9c;
	color: #fff;
	font-size: 1em;
	line-height: 30px;
	text-align: center;
	text-shadow: 0 1px 0 rgba(255,255,255,0.2);
	border-radius: 15px;
}

.board {
  display: flex;
  flex-flow: wrap;
  width: 800px;
  background: #ecf0f1;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #8e44ad;
  cursor: pointer;
}

.alive {
  background: #8e44ad;
}

.dead {
  background: #ecf0f1;
}
~~~



