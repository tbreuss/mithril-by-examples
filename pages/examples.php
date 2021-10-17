<?php
/**
 * @var League\Plates\Engine $templates
 */

$links = ME\Example::create(dirname(__DIR__) . '/examples')->getLinks();

echo $templates->render('examples', ['links' => $links]);
