<?php
  function fileUrl(string $url) {
    return $url . '?' . filemtime(__DIR__ . '/' . $url);
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title>NCG Xport</title>

    <link rel="icon" href="<?= fileUrl('favicon.ico') ?>" sizes="32x32"/>
    <link rel="icon" href="<?= fileUrl('favicon.ico') ?>" sizes="192x192"/>
    <link rel="apple-touch-icon-precomposed" href="<?= fileUrl('favicon.ico') ?>"/>
    <meta name="msapplication-TileImage" content="<?= fileUrl('favicon.ico') ?>"/>

    <base href="/">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"/>

    <link href="<?= fileUrl('plugins/global/plugins.bundle.css') ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= fileUrl('css/app.css') ?>" rel="stylesheet" type="text/css">
</head>
<body>
<noscript>
    <strong>We're sorry but dashboard doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>

<div id="app"></div>

<script src="<?= fileUrl('js/manifest.js') ?>"></script>
<script src="<?= fileUrl('js/vendor.js') ?>"></script>
<script src="<?= fileUrl('js/app.js') ?>"></script>

<script src="<?= fileUrl('plugins/global/plugins.bundle.js') ?>"></script>
</body>
</html>
