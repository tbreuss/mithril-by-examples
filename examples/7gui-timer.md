---
title: Timer from 7GUIs
date: 2021-10-18
tags: [7guis]
level: beginner
version: latest
author: ""
layout: layouts/example.html
---

Challenges: concurrency, competing user/signal interactions, responsiveness.

The task is to build a frame containing a gauge G for the elapsed time e, a label which shows the elapsed time as a numerical value, a slider S by which the duration d of the timer can be adjusted while the timer is running and a reset button R. Adjusting S must immediately reflect on d and not only when S is released. It follows that while moving S the filled amount of G will (usually) change immediately. When e ≥ d is true then the timer stops (and G will be full). If, thereafter, d is increased such that d > e will be true then the timer restarts to tick until e ≥ d is true again. Clicking R will reset e to zero.

See <https://eugenkiss.github.io/7guis/tasks#timer>.

**To be done.**

Do you have time and are you able to implement this example?
Then fork this repo and get ready :-)
