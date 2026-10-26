<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($title ?? '{{name}}') ?></title>
  <meta name="description" content="One sentence about {{name}} (placeholder).">
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap">
      <a href="./"><strong>{{name}}</strong></a>
      <a class="button" href="#contact">Get in touch</a>
    </div>
  </header>
