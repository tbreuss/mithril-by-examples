---
title: Highchart Stream Example
date: 2021-10-26
tags: [charts, stream, highchart]
level: expert
version: 2.0.4
author: skyghis
credits: []
links: []
layout: layouts/example.html
flems:
  files:
    - app.js
  links:
    - mithril@2.0.4/stream/stream.js
    - highcharts@6.1.1
---

How to use highchart lib together with mithril and mithril-stream.

## JavaScript

~~~js
// app.js
function Chart() {
  let chart;
  let dataStream;

  return {
    view: () => m(""),
    oncreate: ({attrs: {data}, dom}) => {
      chart = Highcharts.chart(dom, data());
      dataStream = data.map((options) => chart.update(options, true));
    },
    onremove: () => chart && chart.destroy()
  };
};

const model = {
  serie1: m.stream([]),
  serie2: m.stream([])
};

const actions = {
  clear: () => {
    model.serie1([]);
    model.serie2([]);
  },
  query: {
    data1: () => {
      const rnd = Math.random();
      m.request("https://raw.githubusercontent.com/highcharts/highcharts/master/samples/data/aapl-c.json")
        .then((data)  => data.map(([x, y]) => [x, (y / 100) - rnd]))
        .then((data) => model.serie1(data));
    },
    data2: () => {
      const rnd = Math.random();
      m.request("https://cdn.rawgit.com/highcharts/highcharts/master/samples/data/usdeur.json")
        .then((data)  => data.map(([x, y]) => [x, y + rnd]))
        .then((data) => model.serie2(data))
    }
  }
}

m.mount(document.body, {
  view: () => [
    m("", [
      m("input[type=button][value=load serie 1]", {onclick: actions.query.data1}),
      m("input[type=button][value=load serie 2]", {onclick: actions.query.data2}),
      m("input[type=button][value=clear]", {onclick: actions.clear}),
    ]),
    m(Chart, {data: model.serie1.map((data) => ({
      xAxis: {type: "datetime"},
      series: [{name: "serie 1", data: data}]
    }))}),
    m(Chart, {data: m.stream.merge([model.serie1, model.serie2]).map(([data1, data2]) => ({
      xAxis: {type: "datetime"},
      series: [
        {id: 1, name: "serie 1", data: data1},
        {id: 2, name: "serie 2", data: data2}
      ]
    }))})
  ]
});
~~~
