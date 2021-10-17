<?php
/** 
 * @var League\Plates\Engine $templates
 * @var string $slug  
 */

use League\CommonMark\CommonMarkConverter;

$page = ME\Example::create(dirname(__DIR__) . '/examples')->getPage($slug);

if ($page === null) {
    throw new \Exception('Page not found'); // TODO handle http exception
}

$body = $page->body();

$html = (new CommonMarkConverter())->convertToHtml($body);

$flemsFiles = [];

preg_match('/<code class="language-html">(.*?)<\/code>/s', $html, $matches);
if (!empty($matches)) {
    $flemsFiles[] = [
        'name' => '.html',
        'content' => str_replace("", ' ', html_entity_decode($matches[1]))
    ];
}

preg_match('/<code class="language-ts">(.*?)<\/code>/s', $html, $matches);
if (!empty($matches)) {
    $flemsFiles[] = [
        'name' => '.ts',
        'content' => $flemsTs[] = str_replace("", ' ', html_entity_decode($matches[1]))
    ];
}

preg_match('/<code class="language-js">(.*?)<\/code>/s', $html, $matches);
if (!empty($matches)) {
    $flemsFiles[] = [
        'name' => '.js',
        'content' => $flemsTs[] = str_replace("", ' ', html_entity_decode($matches[1]))
    ];    
}

$flemsLinks = [];
$flemsLinks[] = [
    'name' => 'mithril',
    'type' => 'script',
    'url' => 'https://unpkg.com/mithril',    
];

if (($links = $page->matter('links'))) {
    foreach ($links as $link) {
        $flemsLinks[] = [
            #'name' => 'link',
            'type' => 'style',
            'url' => $link,
        ];
    }
}

$data = [
    'title' => $page->matter('title'),
    'abstract' => $page->matter('abstract'),
    'created' => date('Y-m-d', $page->matter('created')),
    'modified' => date('Y-m-d', $page->matter('modified')),
    'tags' => $page->matter('tags'),
    'version' => $page->matter('version'),
    'author' => $page->matter('author'),
    'credits' => $page->matter('credits'),
    'html' => $html,
    'flems' => [
        'files' => $flemsFiles,
        'links' => $flemsLinks
    ]
];

echo $templates->render('example', ['data' => $data]);
