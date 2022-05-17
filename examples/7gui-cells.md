---
title: Cells from 7GUIs
date: 2021-10-18
tags: [7guis]
level: beginner
version: latest
author: ""
layout: layouts/example.html
---

Challenges: change propagation, widget customization, implementing a more authentic/involved GUI application.

The task is to create a simple but usable spreadsheet application. The spreadsheet should be scrollable. The rows should be numbered from 0 to 99 and the columns from A to Z. Double-clicking a cell C lets the user change C’s formula. After having finished editing the formula is parsed and evaluated and its updated value is shown in C. In addition, all cells which depend on C must be reevaluated. This process repeats until there are no more changes in the values of any cell (change propagation). Note that one should not just recompute the value of every cell but only of those cells that depend on another cell’s changed value. If there is an already provided spreadsheet widget it should not be used. Instead, another similar widget (like JTable in Swing) should be customized to become a reusable spreadsheet widget.

See <https://eugenkiss.github.io/7guis/tasks#cells>.

**To be done.**

Do you have time and are you able to implement this example?
Then fork this repo and get ready :-)
