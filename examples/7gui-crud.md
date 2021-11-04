---
title: CRUD from 7GUIs
date: 2021-10-18
tags: [7guis]
level: beginner
version: 2.0.4
author: ""
layout: layouts/example.html
---

Challenges: separating the domain and presentation logic, managing mutation, building a non-trivial layout.

The task is to build a frame containing the following elements: a textfield Tprefix, a pair of textfields Tname and Tsurname, a listbox L, buttons BC, BU and BD and the three labels as seen in the screenshot. L presents a view of the data in the database that consists of a list of names. At most one entry can be selected in L at a time. By entering a string into Tprefix the user can filter the names whose surname start with the entered prefix—this should happen immediately without having to submit the prefix with enter. Clicking BC will append the resulting name from concatenating the strings in Tname and Tsurname to L. BU and BD are enabled iff an entry in L is selected. In contrast to BC, BU will not append the resulting name but instead replace the selected entry with the new name. BD will remove the selected entry. The layout is to be done like suggested in the screenshot. In particular, L must occupy all the remaining space.

See <https://eugenkiss.github.io/7guis/tasks#crud>.

**To be done.**

Do you have time and are you able to implement this example?
Then fork this repo and get ready :-)
