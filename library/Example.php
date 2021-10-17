<?php

namespace ME;

use Spatie\YamlFrontMatter\YamlFrontMatter;

final class Example
{
    private $dir;
    
    public function __construct(string $dir)
    {
        $this->dir = $dir;
    }
    
    public static function create(string $dir)
    {
        return new self($dir);
    }
    
    public function getFiles()
    {
        $files = scandir($this->dir, SCANDIR_SORT_ASCENDING);
        if (is_bool($files)) {
            return [];
        }
        return array_filter($files, function($file) {
            return !in_array($file, ['.', '..']);
        });
    }
    
    public function getPage(string $slug)
    {
        $filepath = $this->dir . '/' . $slug . '.md';
        if (!is_file($filepath) || !is_readable($filepath)) {
            return null;    
        }
        $content = file_get_contents($filepath);
        if (is_bool($content)) {
            return null;
        }
        return YamlFrontMatter::parse($content);
    }
    
    public function getLinks()
    {
        $files = $this->getFiles();
        $links = [];
        foreach ($files as $file) {
            $object = YamlFrontMatter::parse(file_get_contents($this->dir . '/' . $file));
            $links[] = [
                'label' => $object->title,
                'href' => '/examples/' . str_replace('.md', '', $file),
            ];
        }
        return $links;
    }

    public function getFrontMatter()
    {
        $files = $this->getFiles();
        $links = [];
        foreach ($files as $file) {
            $object = YamlFrontMatter::parse(file_get_contents($this->dir . '/' . $file));
            $links[] = $object;
        }
        return $links;
    }    
}
