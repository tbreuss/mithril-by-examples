---
title: Blurry Dogs
desc: "This Mithril code example was taken from [Mithril Gitter](https://gitter.im/mithriljs/mithril.js?at=617e0eaf98c13e75500896f2) and slightly edited. It shows random dog images requested by an API and displayed with an adjustable blur effect."
date: 2021-10-31
tags: [animation, m.stream, m.mount, dom, api, oncreate]
level: beginner
version: 2.0.4
author: JAForbes
layout: layouts/example.html
flems:
  links:
    - mithril-stream@2.0.0/stream.js
---

~~~js
function BlurryDog({attrs: {src, blur}}) {

  let el = m.stream()
  let context = el.map(x => x.getContext('2d'))

  let loaded = m.stream()
  let image = src.map(src => {
    let image = new Image()
    image.src = src
    image.onload = () => loaded(true)
    return image
  })

  m.stream.merge([el, context, image, loaded, blur])
    .map(([el, context, image, loaded, blur]) => {

      if (!loaded) return;

      requestAnimationFrame(() => {
        el.width = el.width
        context.filter = `blur(${blur}px)`
        context.drawImage(image, 0, 0, el.width, el.height)
      })
    })

  return {
    view() {
      return m('canvas', {
        width: 200,
        height: 200, oncreate: v => el(v.dom),
        style: 'background: #DDD'
      })
    }
  }
}

function RandomBlurryDog({attrs: {blur}}) {
  let src = m.stream()

  fetch('https://dog.ceo/api/breeds/image/random')
    .then(x => x.json())
    .then(x => src(x.message))

  return {
    view: () => m(BlurryDog, {src, blur})
  }
}

function App() {

  const blur = m.stream(5)
  const count = m.stream(5)

  function view() {
    return m('.app',
      {style: 'display: grid;'},
      m('.form',
        {style: 'display: grid; grid-template-columns: 1fr 3em 3em; gap: 1em;'},
        m('label',
          'Blur', m('input[type=range]', {
            style: 'width: 100%; height: 2em;',
            oninput: e => blur(e.target.valueAsNumber),
            max: 10,
            min: 0,
            value: blur()
          })
        ),
        m('button', {onclick: () => count(count() + 1)}, '+'),
        m('button', {onclick: () => count(count() - 1)}, '-')
      ),
      m('.dogs',
        Array(count()).fill(0).map(() =>
          m(RandomBlurryDog, {blur})
        )
      )
    )
  }

  return {view}
}

m.mount(document.body, App)
~~~
