<?php

$mimes = array (
    "css" => "text/css",
    "eot" => "application/vnd.ms-fontobject",
    "otf" => "application/font-sfnt",
    "ttf" => "application/font-sfnt",
    "woff" => "application/font-woff",
    "svg" => "image/svg+xml",
    "js" => "text/javascript",
    "html" => "text/html"
);

$prefix = 'templates';
function binaryFile($mime, $path) {
    $fp = fopen($path, 'rb');
    header("Content-Type: " . $mime);
    header("Content-Length: " . filesize($path));
    fpassthru($fp);
    exit;
}

$split = explode('.', $_SERVER['REQUEST_URI']);
$ext = array_pop($split);
if (!empty($mimes[$ext])) {
    $s = dirname(__FILE__) . '/' . $prefix . $_SERVER["REQUEST_URI"];
    binaryFile($mimes[$ext], $s);
    exit;
}