<?php
/**
 * @var League\Plates\Engine $this
 * @var array $data
 */
?>

<?php $this->layout('template', ['title' => 'Example']) ?>

<h1><?= $data['title'] ?></h1>
<!-- p><?= $data['abstract'] ?></p-->

<ul>
    <li>Created: <?= $data['created'] ?></li>
    <li>Modified: <?= $data['modified'] ?></li>
    <li>Version: <?= $data['version'] ?></li>
    <li>Tags: <?= join(', ', $data['tags']) ?></li>
    <li>Author: <?= join(', ', $data['author']) ?></li>
    <li>Credits: <?= join(', ', $data['credits']) ?></li>
</ul>

<div class="html"><?= $data['html'] ?></div>

<input type="checkbox" id="modal">
<label for="modal" class="example-label">Show Example in Flems</label>
<label for="modal" class="modal-background"></label>

<div class="modal">
    <div class="modal-header">
        <h3><?= $data['title'] ?></h3>
        <label for="modal">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAABNTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU0N3NIOAAAAJnRSTlMAAQIDBAUGBwgRFRYZGiEjQ3l7hYaqtLm8vsDFx87a4uvv8fP1+bbY9ZEAAAB8SURBVBhXXY5LFoJAAMOCIP4VBRXEv5j7H9HFDOizu2TRFljedgCQHeocWHVaAWStXnKyl2oVWI+kd1XLvFV1D7Ng3qrWKYMZ+MdEhk3gbhw59KvlH0eTnf2mgiRwvQ7NW6aqNmncukKhnvo/zzlQ2PR/HgsAJkncH6XwAcr0FUY5BVeFAAAAAElFTkSuQmCC" width="16" height="16" alt="">
        </label>
    </div>
    <div id="flems" class="modal-body"></div>
    <script src="https://flems.io/flems.html" type="text/javascript" charset="utf-8"></script>
    <script>
      Flems(document.getElementById('flems'), {
        files: <?= json_encode($data['flems']['files']) ?>,
        links: <?= json_encode($data['flems']['links']) ?>
      })
    </script>
</div>

<link rel="stylesheet" href="/static/highlight/styles/atom-one-dark.min.css">
<script src="/static/highlight/highlight.min.js"></script>
<script>hljs.highlightAll();</script>

<p style="margin-top:3rem"><a href="/examples">Show all Examples</a></p>
