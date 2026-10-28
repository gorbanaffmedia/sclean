<?php
/**
 * Lead receiver. Accepts POST with a JSON LeadPayload (see src/lib/lead.ts)
 * and forwards it as a plain-text email.
 */

const MAIL_TO = 'gorban.affmedia@gmail.com';
const MAIL_FROM = 'no-reply@go-sclean.ru';
const MAIL_SUBJECT = 'Новая заявка с сайта go-sclean.ru';
const ALLOWED_ORIGINS = ['https://go-sclean.ru', 'https://www.go-sclean.ru'];

// Keep mail/runtime warnings out of the JSON response; server logging is retained.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

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

$raw = file_get_contents('php://input', false, null, 0, 16385);
if ($raw === false || strlen($raw) > 16384) {
    respond(400, ['ok' => false]);
}
$data = json_decode($raw, true);
if (!is_array($data) || json_last_error() !== JSON_ERROR_NONE) {
    respond(400, ['ok' => false]);
}

$contact = field($data, 'contact');
if (!is_string($data['contact'] ?? null) || !valid_phone($data['contact']) || ($data['consent'] ?? false) !== true) {
    respond(400, ['ok' => false]);
}

$services = [
    'Генеральная уборка', 'Уборка после ремонта', 'Мойка окон', 'Химчистка мягкой мебели',
    'Поддерживающая уборка', 'Чистка кондиционеров', 'Чистка кондиционера', 'Уборка после ЧП', 'Уборка коммерческих объектов',
    'Не знаю', 'не выбрано', 'Генеральная', 'После ремонта', 'Перед заселением', 'После арендаторов',
    'Химчистка мебели', 'Уборка после ЧП (смерть, потоп)',
];
if (!in_array(field($data, 'source'), ['calculator', 'final-cta'], true)
    || !in_array(field($data, 'service'), $services, true)) {
    respond(400, ['ok' => false]);
}

$additional = $data['additionalServices'] ?? [];
if (!is_array($additional) || count($additional) > 3) {
    respond(400, ['ok' => false]);
}
foreach ($additional as $value) {
    if (!is_string($value) || !in_array($value, ['Мойка окон', 'Химчистка мягкой мебели', 'Чистка кондиционеров'], true)
        || $value === field($data, 'service')) respond(400, ['ok' => false]);
}
if (count(array_unique($additional)) !== count($additional)) respond(400, ['ok' => false]);
$data['additionalServices'] = implode(', ', $additional);
$data['consent'] = 'Да — расчёт стоимости и связь по заявке';

$labels = [
    'source'  => 'Форма',
    'service' => 'Услуга',
    'additionalServices' => 'Дополнительные услуги',
    'consent' => 'Согласие на обработку данных',
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

try {
    $sent = @mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);
} catch (Throwable $error) {
    error_log('S-CLEAN: mail transport failed');
    $sent = false;
}

respond($sent ? 200 : 500, ['ok' => $sent]);

/** Reads a scalar field as a trimmed single-line string (max 500 chars). */
function field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    if (!is_scalar($value)) {
        return '';
    }
    $value = preg_replace('/[\r\n\t]+/u', ' ', (string) $value);
    // UTF-8 truncation without requiring the optional mbstring extension.
    if ($value === null || !preg_match('/^.{0,500}/us', trim($value), $matches)) return '';
    return $matches[0];
}

/**
 * Matches the client validator (src/lib/lead.ts): exactly 10 digits after the country code.
 * "+…" must be "+7"; without "+", a leading 7/8 counts as the country code only in an 11-digit number.
 */
function valid_phone(string $value): bool
{
    $trimmed = trim($value);
    if (strlen($value) > 64 || !preg_match('/^\+?[\d\s()-]+$/D', $trimmed)) return false;
    $national = preg_replace('/\D/', '', $trimmed);
    if ($trimmed[0] === '+') {
        if (($national[0] ?? '') !== '7') return false;
        $national = substr($national, 1);
    } elseif (preg_match('/^[78]\d{10}$/D', $national)) {
        $national = substr($national, 1);
    }
    return preg_match('/^\d{10}$/D', $national) === 1;
}

function respond(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
