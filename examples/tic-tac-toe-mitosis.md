---
title: Tic-Tac-Toe (Mitosis)
date: 2021-10-31
tags: [game, mitosis, m.mount]
level: beginner
version: 2.0.4
author: osban
layout: layouts/example.html
flems:
  files:
    - state.js
    - actions.js
    - square.js
    - board.js
    - game.js
    - .js
    - .css
---

This slim Tic-Tac-Toe example was written using the Mitosis pattern for state management. As an addition it offers a simple undo functionality. Well done!

## State.js
~~~js
// state.js
const State = () => ({
  history: [
    {squares: [...Array(9).fill(null)]}
  ],
  current: {squares: [...Array(9).fill(null)]},
  stepNumber: 0,
  xIsNext: true
})

export default State
~~~

## Actions.js

~~~js
// actions.js
const Actions = (S, A = {
  calculateWinner: squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  },

  jumpTo: step => {
    S.stepNumber = step
    S.current    = S.history[step]
    S.xIsNext    = !(step % 2)
  },

  handleClick: i => {
    const history = S.history.slice(0, S.stepNumber + 1)
    const squares = S.current.squares.slice()

    if (A.calculateWinner(squares) || squares[i]) return
    squares[i] = S.xIsNext ? 'X' : 'O'
    S.stepNumber = S.history.length
    S.history    = [...history, {squares}]
    S.current    = S.history[S.history.length - 1]
    S.xIsNext    = !S.xIsNext
  }
}) => A

export default Actions
~~~

## Square.js

~~~js
// square.js
const Square = {
  view: ({attrs: {S,A, value}}) =>
    m('button.square', {
      onclick: () => A.handleClick(value)
    }, S.current.squares[+value])
}

export default Square
~~~

## Board.js

~~~js
// board.js
import Square from './square'

const Board = {
  view: ({attrs: {S,A}}) =>
    m('div',
      [0,3,6].map(x =>
        m('div.board-row',
          [0,1,2].map(y =>
            m(Square, {S,A, value: x+y})
          )
        )
      )
    )
}

export default Board
~~~

## Game.js

~~~js
// game.js
import Board from './board'

const Game = {
  view: ({attrs: {S,A}}) =>
    m('div.game',
      m('div.game-board',
        m(Board, {S,A})
      ),
      m('div.game-info',
        m('div',
          A.calculateWinner(S.current.squares)
          ? 'Winner: ' + A.calculateWinner(S.current.squares)
          : 'Next player: ' + (S.xIsNext ? 'X' : 'O')
        ),
        m('ol',
          S.history.map((step, move) =>
            m('li', {key: move},
              m('button', {
                onclick: () => A.jumpTo(move)
              }, move ? 'Go to move #' + move : 'Go to game start')
            )
          )
        )
      )
    )
}

export default Game
~~~

## JS

~~~js
import State   from './state'
import Actions from './actions'
import Game    from './game'

const app = () => {
  const S = State()
  const A = Actions(S)

  return {
    view: () => m(Game, {S,A})
  }
}

m.mount(document.body, app)
~~~

## CSS

~~~css
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
~~~
