<?php
/**
 * Lead receiver. Accepts POST with a JSON LeadPayload (see src/lib/lead.ts)
 * and forwards it as a plain-text email.
 */

const MAIL_TO = 'gorban.affmedia@gmail.com';
const MAIL_FROM = 'no-reply@go-sclean.ru';
const MAIL_SUBJECT = 'Новая заявка с сайта go-sclean.ru';
const ALLOWED_ORIGINS = ['https://go-sclean.ru', 'https://www.go-sclean.ru'];

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['ok' => false]);
}

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    $data = [];
}

$contact = field($data, 'contact');
if ($contact === '') {
    respond(400, ['ok' => false]);
}

$labels = [
    'source'  => 'Форма',
    'service' => 'Услуга',
    'product' => 'Карточка',
    'area'    => 'Площадь',
    'when'    => 'Когда',
    'contact' => 'Контакт',
    'page'    => 'Страница',
    'sentAt'  => 'Отправлено',
];

$lines = [];
foreach ($labels as $key => $label) {
    $value = field($data, $key);
    $lines[] = $label . ': ' . ($value === '' ? '—' : $value);
}
$lines[] = '';
$lines[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '—');

$body = implode("\r\n", $lines) . "\r\n";

$headers = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode('S-CLEAN ОМСК') . '?= <' . MAIL_FROM . '>',
    'Reply-To: ' . MAIL_FROM,
    'Bcc: S-clean55@yandex.ru',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$subject = '=?UTF-8?B?' . base64_encode(MAIL_SUBJECT) . '?=';

$sent = mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);

respond($sent ? 200 : 500, ['ok' => $sent]);

/** Reads a scalar field as a trimmed single-line string (max 500 chars). */
function field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    if (!is_scalar($value)) {
        return '';
    }
    $value = preg_replace('/[\r\n\t]+/u', ' ', (string) $value);
    return mb_substr(trim($value), 0, 500);
}

function respond(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
