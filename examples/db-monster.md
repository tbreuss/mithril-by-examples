---
title: DB Monster
abstract: This example shows the well know DB monster application.
date: 2021-10-27
tags: [3rd-party, animation, official, m.mount, m.redraw]
level: beginner
version: 2.0.4
author: mithril
layout: layouts/example.html
flems:
  files:
    - ENV.js
    - app.js
    - .html
    - .css
  links:
    - name: perf-monitor.js
      type: script
      url: https://localvoid.github.io/perf-monitor/0.1/perf-monitor.js
---

This example was taken from the official website at <https://mithril.js.org/examples.html> and slightly modified.
It shows the well know DB monster application.

## ENV.js

~~~js
// ENV.js
var ENV = ENV || (function() {

  var first = true;
  var counter = 0;
  var data;
  var _base;
  (_base = String.prototype).lpad || (_base.lpad = function(padding, toLength) {
    return padding.repeat((toLength - this.length) / padding.length).concat(this);
  });

  function formatElapsed(value) {
    str = parseFloat(value).toFixed(2);
    if (value > 60) {
      minutes = Math.floor(value / 60);
      comps = (value % 60).toFixed(2).split('.');
      seconds = comps[0].lpad('0', 2);
      ms = comps[1];
      str = minutes + ":" + seconds + "." + ms;
    }
    return str;
  }

  function getElapsedClassName(elapsed) {
    var className = 'Query elapsed';
    if (elapsed >= 10.0) {
      className += ' warn_long';
    }
    else if (elapsed >= 1.0) {
      className += ' warn';
    }
    else {
      className += ' short';
    }
    return className;
  }

  function countClassName(queries) {
    var countClassName = "label";
    if (queries >= 20) {
      countClassName += " label-important";
    }
    else if (queries >= 10) {
      countClassName += " label-warning";
    }
    else {
      countClassName += " label-success";
    }
    return countClassName;
  }

  function updateQuery(object) {
    if (!object) {
      object = {};
    }
    var elapsed = Math.random() * 15;
    object.elapsed = elapsed;
    object.formatElapsed = formatElapsed(elapsed);
    object.elapsedClassName = getElapsedClassName(elapsed);
    object.query = "SELECT blah FROM something";
    object.waiting = Math.random() < 0.5;
    if (Math.random() < 0.2) {
      object.query = "<IDLE> in transaction";
    }
    if (Math.random() < 0.1) {
      object.query = "vacuum";
    }
    return object;
  }

  function cleanQuery(value) {
    if (value) {
      value.formatElapsed = "";
      value.elapsedClassName = "";
      value.query = "";
      value.elapsed = null;
      value.waiting = null;
    } else {
      return {
        query: "***",
        formatElapsed: "",
        elapsedClassName: ""
      };
    }
  }

  function generateRow(object, keepIdentity, counter) {
    var nbQueries = Math.floor((Math.random() * 10) + 1);
    if (!object) {
      object = {};
    }
    object.lastMutationId = counter;
    object.nbQueries = nbQueries;
    if (!object.lastSample) {
      object.lastSample = {};
    }
    if (!object.lastSample.topFiveQueries) {
      object.lastSample.topFiveQueries = [];
    }
    if (keepIdentity) {
      // for Angular optimization
      if (!object.lastSample.queries) {
        object.lastSample.queries = [];
        for (var l = 0; l < 12; l++) {
          object.lastSample.queries[l] = cleanQuery();
        }
      }
      for (var j in object.lastSample.queries) {
        var value = object.lastSample.queries[j];
        if (j <= nbQueries) {
          updateQuery(value);
        } else {
          cleanQuery(value);
        }
      }
    } else {
      object.lastSample.queries = [];
      for (var j = 0; j < 12; j++) {
        if (j < nbQueries) {
          var value = updateQuery(cleanQuery());
          object.lastSample.queries.push(value);
        } else {
          object.lastSample.queries.push(cleanQuery());
        }
      }
    }
    for (var i = 0; i < 5; i++) {
      var source = object.lastSample.queries[i];
      object.lastSample.topFiveQueries[i] = source;
    }
    object.lastSample.nbQueries = nbQueries;
    object.lastSample.countClassName = countClassName(nbQueries);
    return object;
  }

  function getData(keepIdentity) {
    var oldData = data;
    if (!keepIdentity) { // reset for each tick when !keepIdentity
      data = [];
      for (var i = 1; i <= ENV.rows; i++) {
        data.push({ dbname: 'cluster' + i, query: "", formatElapsed: "", elapsedClassName: "" });
        data.push({ dbname: 'cluster' + i + ' slave', query: "", formatElapsed: "", elapsedClassName: "" });
      }
    }
    if (!data) { // first init when keepIdentity
      data = [];
      for (var i = 1; i <= ENV.rows; i++) {
        data.push({ dbname: 'cluster' + i });
        data.push({ dbname: 'cluster' + i + ' slave' });
      }
      oldData = data;
    }
    for (var i in data) {
      var row = data[i];
      if (!keepIdentity && oldData && oldData[i]) {
        row.lastSample = oldData[i].lastSample;
      }
      if (!row.lastSample || Math.random() < ENV.mutations()) {
        counter = counter + 1;
        if (!keepIdentity) {
          row.lastSample = null;
        }
        generateRow(row, keepIdentity, counter);
      } else {
        data[i] = oldData[i];
      }
    }
    first = false;
    return {
      toArray: function() {
        return data;
      }
    };
  }

  var mutationsValue = 0.5;

  function mutations(value) {
    if (value) {
      mutationsValue = value;
      return mutationsValue;
    } else {
      return mutationsValue;
    }
  }

  var body = document.querySelector('body');
  var theFirstChild = body.firstChild;

  var sliderContainer = document.createElement( 'div' );
  sliderContainer.style.cssText = "display: flex";
  var slider = document.createElement('input');
  var text = document.createElement('label');
  text.innerHTML = 'mutations : ' + (mutationsValue * 100).toFixed(0) + '%';
  text.id = "ratioval";
  slider.setAttribute("type", "range");
  slider.style.cssText = 'margin-bottom: 10px; margin-top: 5px';
  slider.addEventListener('change', function(e) {
    ENV.mutations(e.target.value / 100);
    document.querySelector('#ratioval').innerHTML = 'mutations : ' + (ENV.mutations() * 100).toFixed(0) + '%';
  });
  sliderContainer.appendChild( text );
  sliderContainer.appendChild( slider );
  body.insertBefore( sliderContainer, theFirstChild );

  return  {
    generateData: getData,
    rows: 50,
    timeout: 0,
    mutations: mutations
  };
})();
~~~

## JavaScript

~~~js
// app.js
perfMonitor.startFPSMonitor()
perfMonitor.startMemMonitor()
perfMonitor.initProfiler("render")

var data = []

m.mount(document.body, {
	view: function() {
		return m("div", [
			m("table", {className: "table table-striped latest-data"}, [
				m("tbody",
					data.map(function(db) {
						return m("tr", {key: db.dbname}, [
							m("td", {className: "dbname"}, db.dbname),
							m("td", {className: "query-count"},  [
								m("span", {className: db.lastSample.countClassName}, db.lastSample.nbQueries)
							]),
							db.lastSample.topFiveQueries.map(function(query) {
								return m("td", {className: query.elapsedClassName}, [
									query.formatElapsed,
									m("div", {className: "popover left"}, [
										m("div", {className: "popover-content"}, query.query),
										m("div", {className: "arrow"})
									])
								])
							})
						])
					})
				)
			])
		])
	}
})

function update() {
	requestAnimationFrame(update)

	data = ENV.generateData().toArray()

	perfMonitor.startProfile("render")
	m.redraw()
	perfMonitor.endProfile("render")
}

update()
~~~

## HTML

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta name="description" content="DBMON Mithril" />
  <meta charset="utf-8">
  <title>DB-Monster</title>
</head>
<body>
<div id="app"></div>
</body>
</html>
~~~

## CSS

~~~css
body {
    color: #333;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    margin: 0;
}

label {
    display: inline-block;
    font-weight: 700;
    margin-bottom: 5px;
}

input[type=range] {
    display: block;
    width: 100%;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

:before, :after {
    box-sizing: border-box;
}

.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    border-top: 1px solid #ddd;
    line-height: 1.42857143;
    padding: 8px;
    vertical-align: top;
}

.table {
    width: 100%;
}

.table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {
    background: #f9f9f9;
}

.label {
    border-radius: .25em;
    color: #fff;
    display: inline;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    padding: .2em .6em .3em;
    text-align: center;
    vertical-align: baseline;
    white-space: nowrap;
}

.label-success {
    background-color: #5cb85c;
}

.label-warning {
    background-color: #f0ad4e;
}

.popover {
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    display: none;
    left: 0;
    max-width: 276px;
    padding: 1px;
    position: absolute;
    text-align: left;
    top: 0;
    white-space: normal;
    z-index: 1010;
}

.popover > .arrow:after {
    border-width: 10px;
    content: "";
}

.popover.left {
    margin-left: -10px;
}

.popover.left > .arrow {
    border-right-width: 0;
    border-left-color: rgba(0, 0, 0, .25);
    margin-top: -11px;
    right: -11px;
    top: 50%;
}

.popover.left > .arrow:after {
    border-left-color: #fff;
    border-right-width: 0;
    bottom: -10px;
    content: " ";
    right: 1px;
}

.popover > .arrow {
    border-width: 11px;
}

.popover > .arrow, .popover > .arrow:after {
    border-color: transparent;
    border-style: solid;
    display: block;
    height: 0;
    position: absolute;
    width: 0;
}

.popover-content {
    padding: 9px 14px;
}

.Query {
    position: relative;
}

.Query:hover .popover {
    display: block;
    left: -100%;
    width: 100%;
}
~~~
