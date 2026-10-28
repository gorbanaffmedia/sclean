<?php
// Simulates a static site mounted at /new-site/; no production server settings.
require __DIR__ . '/audit-mail.php';
$root = realpath(getenv('SCLEAN_AUDIT_DIST'));
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($url === '/new-site') {
    header('Location: /new-site/', true, 301);
    exit;
}
if (!str_starts_with($url, '/new-site/')) {
    http_response_code(404);
    exit;
}
$relative = substr($url, strlen('/new-site/'));
$file = realpath($root . DIRECTORY_SEPARATOR . ($relative === '' ? 'index.html' : $relative));
if ($file && is_dir($file)) $file = realpath($file . DIRECTORY_SEPARATOR . 'index.html');
if (!$file || !str_starts_with($file, $root . DIRECTORY_SEPARATOR) || !is_file($file)) {
    http_response_code(404);
    exit;
}
if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
    require $file;
    exit;
}
$types = ['html' => 'text/html', 'js' => 'text/javascript', 'css' => 'text/css', 'webp' => 'image/webp', 'svg' => 'image/svg+xml'];
header('Content-Type: ' . ($types[pathinfo($file, PATHINFO_EXTENSION)] ?? 'application/octet-stream'));
readfile($file);
