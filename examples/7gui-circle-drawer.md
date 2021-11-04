---
title: Circle Drawer from 7GUIs
date: 2021-10-18
tags: [7guis]
level: beginner
version: 2.0.4
author: ""
layout: layouts/example.html
---

Challenges: undo/redo, custom drawing, dialog control.

The task is to build a frame containing an undo and redo button as well as a canvas area underneath. Left-clicking inside an empty area inside the canvas will create an unfilled circle with a fixed diameter whose center is the left-clicked point. The circle nearest to the mouse pointer such that the distance from its center to the pointer is less than its radius, if it exists, is filled with the color gray. The gray circle is the selected circle C. Right-clicking C will make a popup menu appear with one entry “Adjust diameter..”. Clicking on this entry will open another frame with a slider inside that adjusts the diameter of C. Changes are applied immediately. Closing this frame will mark the last diameter as significant for the undo/redo history. Clicking undo will undo the last significant change (i.e. circle creation or diameter adjustment). Clicking redo will reapply the last undoed change unless new changes were made by the user in the meantime.

See <https://eugenkiss.github.io/7guis/tasks#circle>.

**To be done.**

Do you have time and are you able to implement this example?
Then fork this repo and get ready :-)
