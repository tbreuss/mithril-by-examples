<?php

ini_set('display_errors', '1');
ini_set('log_errors', '0');

require '../vendor/autoload.php';

$templates = new League\Plates\Engine(dirname(__DIR__) . '/views');

$router = new AltoRouter();
$router->addMatchTypes(array('slug' => '[0-9A-Za-z_-]++'));
$router->setBasePath('/');

$router->map('GET', '', function () use ($templates) {
    require dirname(__DIR__) . '/pages/index.php';
});

$router->map('GET', 'impressum', function () use ($templates) {
    require dirname(__DIR__) . '/pages/impressum.php';
});

$router->map('GET', 'examples/[slug:slug]', function ($slug) use ($templates) {
    require dirname(__DIR__) . '/pages/example.php';
});

$router->map('GET', 'examples', function () use ($templates) {
    require dirname(__DIR__) . '/pages/examples.php';
});

try {
    if (is_array($match = $router->match()) && is_callable($match['target'])) {
        call_user_func_array($match['target'], $match['params']);
    } else {
        header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
        echo $templates->render('404');
    }
} catch (Throwable $t) {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    echo $templates->render('404', ['exception' => $t]);
}
