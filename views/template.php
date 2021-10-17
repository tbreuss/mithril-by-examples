<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?= $this->e($title) ?> / MithrilJS by Examples</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">
    <link rel="stylesheet" href="/static/css/pure-min.css">
    <link rel="stylesheet" href="/static/css/grids-responsive-min.css">
    <link rel="stylesheet" href="/static/css/styles.css">
    <link rel="stylesheet" href="/static/css/modal.css">
</head>
<body>

<div class="header">
    <div class="container">
        <div class="pure-menu pure-menu-horizontal">
            <a class="pure-menu-heading pure-menu-link v-link-active" href="/">MithrilJS <span>Examples</span></a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item">
                    <a class="pure-menu-link v-link-active" href="/">Homepage</a>
                </li>
                <li class="pure-menu-item">
                    <a class="pure-menu-link" href="/examples">Examples</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="container">
    <div class="pure-g">
        <div class="pure-u-1">
            <?= $this->section('content') ?>
        </div>
    </div>
</div>

<div class="footer">
    <div class="container">
        <div class="pure-g">
            <div class="pure-u-1 pure-u-md-1-2 footer-about">
                <h3>MithrilJS Examples</h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
            </div>
            <div class="pure-u-1 pure-u-md-1-4 footer-links">
            </div>
            <div class="pure-u-1 pure-u-md-1-4">
                <h3>Links</h3>
                <ul>
                    <li><a target="_blank" href="https://mithril.js.org/">MithrilJS</a></li>
                    <li><a target="_blank" href="https://github.com/MithrilJS/mithril.js">GitHub</a></li>
                    <li><a target="_blank" href="https://gitter.im/mithriljs/mithril.js">Chat</a></li>
                </ul>
            </div>
        </div>
        <hr>
        <div class="pure-g">
            <div class="pure-u-1 footer-copyright">
                &copy; <?= date('Y') ?> A tiny <a target="_blank" href="https://www.tebe.ch">tebe.ch</a> project
            </div>
        </div>
    </div>
</div>
</body>
</html>
