<?php
declare(strict_types=1);
require __DIR__ . '/partials/bootstrap.php';
// Receives the contact form. PHP mail() is unreliable on shared hosts; use the host's SMTP (config.php) when it exists.

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !csrf_ok($_POST['csrf'] ?? null)) { http_response_code(400); exit('Bad request'); }
if (!empty($_POST['website'])) { header('Location: ./?sent=1'); exit; } // honeypot: bots fill the hidden field

$name = trim((string) ($_POST['name'] ?? ''));
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$message = trim((string) ($_POST['message'] ?? ''));
if ($name === '' || !$email || $message === '' || mb_strlen($message) > 5000) { http_response_code(422); exit('Please fill in every field.'); }

$body = "From: {$name} <{$email}>\n\n{$message}\n";
$headers = ['From' => $config['from'], 'Reply-To' => $email, 'Content-Type' => 'text/plain; charset=UTF-8'];
mail($config['to'], 'Website message from ' . str_replace(["\r", "\n"], '', $name), $body, $headers);
header('Location: ./?sent=1#contact');
