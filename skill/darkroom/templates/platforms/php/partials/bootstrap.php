<?php
declare(strict_types=1);
// Shared helpers. Settings live in config.php (copied from config.example.php, never committed).
session_start();
$configFile = __DIR__ . '/../config.php';
$config = require(is_file($configFile) ? $configFile : __DIR__ . '/../config.example.php');

function e(?string $s): string { return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

function csrf_token(): string {
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
  return $_SESSION['csrf'];
}

function csrf_ok(?string $t): bool { return is_string($t) && hash_equals($_SESSION['csrf'] ?? '', $t); }
