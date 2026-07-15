<?php
/**
 * Trojan Horse Static HTML Router
 * This script intercepts WordPress routing and serves our static HTML files instead,
 * automatically injecting the correct absolute paths for assets.
 */

// Get the requested URL path
$request = $_SERVER['REQUEST_URI'];
$request = strtok($request, '?'); // Remove query string
$request = trim($request, '/');

// Default to index.html
$file_to_load = __DIR__ . '/index.html';

// Route based on URL
if ($request === 'aboutus.html' || $request === 'aboutus') {
    $file_to_load = __DIR__ . '/aboutus.html';
} elseif ($request === 'contactus.html' || $request === 'contactus') {
    $file_to_load = __DIR__ . '/contactus.html';
} elseif ($request === 'faq.html' || $request === 'faq') {
    $file_to_load = __DIR__ . '/faq.html';
} elseif ($request === 'terms.html' || $request === 'terms') {
    $file_to_load = __DIR__ . '/terms.html';
}

// Fallback to index if file doesn't exist (though it should)
if (!file_exists($file_to_load)) {
    $file_to_load = __DIR__ . '/index.html';
}

// Read the HTML content
$html = file_get_contents($file_to_load);

// Get the base URL of this theme folder
$theme_url = get_template_directory_uri();

// Inject absolute paths so assets load correctly from the theme folder
$html = str_replace('href="style.css"', 'href="' . $theme_url . '/style.css"', $html);
$html = str_replace('src="app.js"', 'src="' . $theme_url . '/app.js"', $html);
$html = str_replace('src="assets/', 'src="' . $theme_url . '/assets/', $html);
$html = str_replace('url("assets/', 'url("' . $theme_url . '/assets/', $html);
$html = str_replace('url(\'assets/', 'url(\'' . $theme_url . '/assets/', $html);

// Serve the HTML directly to the browser
echo $html;
