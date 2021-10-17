<?php
/**
 * @var League\Plates\Engine $this
 * @var array $links
 */
?>

<?php $this->layout('template', ['title' => 'Examples']) ?>

<h1>Examples</h1>

<ul>
<?php foreach ($links as $link): ?>
    <li><a href="<?= $link['href'] ?>"><?= $link['label'] ?></a></li>
<?php endforeach; ?>
</ul>