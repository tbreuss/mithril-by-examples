---
title: Tic Tac Toe
date: 2021-10-26
tags: [game, m.stream, ramda]
level: expert
version: 2.0.4
author: boazblake
layout: layouts/example.html
flems:
  links:
    - ramda@0.26.1
    - mithril-stream@2.0.0/stream.js
---

Tic Tac Toe using a central model for state management.

## HTML

~~~html
<link href="https://fonts.googleapis.com/css?family=Mansalva&display=swap" rel="stylesheet">
~~~

## JS

~~~js
const Stream = m.stream

const calcWidth = mdl => {
  mdl.width(window.innerWidth)
  return mdl
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (1 + max - min) + min)

const players = {
  true: {score:0, mark: 'X' },
  false: {score: 0, mark: 'O'},
}
const boardSizes = R.filter((n) => n % 3 == 0 ,R.range(0,60))


const getDiagAcross =(acc, set, idx) => {
  let r = acc.concat(set[idx])
  return r
}

const getDiagDown =(acc, set, idx) => {
  let r = acc.concat(set[set.length - (idx + 1)])
  return r
}

const winningSetBy = mdl => {
  if(mdl.size) {
    let spaces = R.range(1, (mdl.size * mdl.size + 1))
    let setsAcross = R.splitEvery(mdl.size, spaces)
    let setsDown = R.transpose(setsAcross)
    let setsDiagAcross = setsAcross.reduce(getDiagAcross, [])
    let setsDiagDown = setsDown.reduce(getDiagDown, [])
    let winnings = setsAcross.concat(setsDown).concat([setsDiagAcross].concat([setsDiagDown]))
    return winnings
  } else {
    restart(mdl)
  }
}

const mdl = {
  winnerSets:[],
  winner:null,
  turn: true,
  players,
  board:null,
  size: 0,
  width: Stream(800)
}

const markSelectedSpace = (mdl, key, mark) => {
  const space = R.filter(R.propEq('key', key),mdl.board)
  let updatedSpace = R.set(R.lensProp('value'),mark, R.head(space), mdl.board)
  let index = R.findIndex(R.propEq('key',key))(mdl.board)
  mdl.board =  R.insert(index,updatedSpace,R.without(space,mdl.board))
  return mdl
}

const markRandomSpace = mdl => {
  let emptySpaces = mdl.board.filter(R.propEq('value',''))
  let AISpace = emptySpaces[getRandomInt(0, emptySpaces.length - 1)]
  !mdl.winner && AISpace && markSpace(mdl)(AISpace)
  return mdl
}

const updateTurn = mdl => {
  mdl.turn = !mdl.turn
  return mdl
}

const isWinningSpace = (mdl, key) => {
  let value = R.prop('value',R.head(R.filter(R.propEq('key', key),mdl.board)))
  let sets = R.groupBy(c => c[1])(mdl.board.map(R.props(['key','value'])))
  let keys = R.keys(R.fromPairs(sets[value])).map(Number)
  let isWinner = mdl.winnerSets.map(set => set.every(key => keys.includes(key))).includes(true)
  return isWinner
}

const checkIfDraw = mdl => {
  if(!R.pluck('value',mdl.board).includes('')) {
    mdl.winner = 'No One'
    return mdl
   }
   return mdl
}

const markSpace = mdl => space => {
  let player = mdl.players[mdl.turn].mark
  if(isWinningSpace(markSelectedSpace(mdl, space.key,  player), space.key)) {
    mdl.players[mdl.turn].score ++
    mdl.winner = player
    return mdl
  }
  checkIfDraw(mdl)
  return mdl
}

const nextTurn =  (mdl, space) => {
  return R.compose(updateTurn,
    markRandomSpace,
    updateTurn,
    markSpace(mdl),
  )(space)
  return mdl
}

const restart = mdl => {
  mdl.winner = null
  mdl.size = 0
  mdl.board = null
  mdl.width(800)
}

const makeBoardWithSize = (mdl, size) => {
  mdl.size = size
  mdl.board = R.range(0,size * size).map(n => ({key: n + 1, value: ''}))
  mdl.winnerSets = winningSetBy(mdl)
}

const Space = {
  view: ({attrs:{mdl, key, space}}) =>
   m('.space', {
      style:{
        fontSize:`${(mdl.width()/mdl.size)/2}px`,
        height: `${(mdl.width()/mdl.size)/2}px`,
      flex:`1 1 ${mdl.width()/mdl.size}px`},
      onclick: e => !mdl.winner && !space.value && nextTurn(mdl, space)},
      space.value && m('.value', space.value))
}



const PlayerScore = {
    view : ({attrs:{player, mdl}}) => m('.score-card', [player.mark,':', player.score])
}

const Toolbar = {
  view: ({attrs:{mdl}}) =>
    m('.toolbar', [
      m('button.btn',{onclick: e => restart(mdl)}, 'New Game'),
    Object.keys(mdl.players).map((player, idx) =>
      m(PlayerScore, {key:idx, player: players[player], mdl}))
    ])
}

const Game = {
  view: () =>
    mdl.board ? m('.game', {style:{width:`${mdl.width()}px`}}, mdl.board.map((space) =>
      m(Space, {key:space.key, space, mdl}) ))
      : [ m('h1','select a board size'),
          m('select', {value:mdl.size, onchange: e => makeBoardWithSize(mdl, Number(e.target.value))},
          boardSizes.map(n => m('option', n)),
          mdl.size)]
}

const GameOver = {
  oncreate: () => window.scrollTo(0,0),
  view: ({attrs:{mdl}}) =>
    m('.game-over', {onclick:e => restart(mdl)}, `Game Over ${mdl.winner} is the winner!`)
}

const TicTacToe = {
  view:() => {
    calcWidth(mdl)
    return m('.', [
  m(Toolbar, {mdl}),
  mdl.winner && m(GameOver, {mdl}),
  m(Game, {mdl})
])}
}


m.mount(document.body, TicTacToe)
~~~

## CSS

~~~css

* {
  box-sizing: border-box;
  font-family: 'Mansalva';
}

select {
  width: 80px;
  height: 36px;
  font-size: 30px;
}

.toolbar {
  border: 1px solid green;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}

.score-card {
  padding: 10px;
  font-size: 30px
}

.game {
  display: flex;
  flex-flow: wrap;
}


.space {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
  cursor:pointer;
}

.game-over {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 500px;
  font-size: 90px;
  background: #bdc3c7;
  padding: 4px;
  cursor: pointer;
}

.value {
  font-size: inherit;
}
~~~
