<?php
// Local audit only. This file is outside public/ and must never be deployed.
if (getenv('SCLEAN_AUDIT') !== '1' || !in_array('mail', explode(',', ini_get('disable_functions')), true)) {
    throw new RuntimeException('Audit requires the native mail function to be disabled');
}
function mail($to, $subject, $message, $headers = '', $parameters = ''): bool
{
    header('X-Audit-Mail-Calls: 1');
    $GLOBALS['audit_message'] = $message;
    header('X-Audit-Message: ' . base64_encode($message));
    if (($_SERVER['HTTP_X_AUDIT_MAIL'] ?? '') === 'throw') throw new RuntimeException('Mock transport failure');
    return ($_SERVER['HTTP_X_AUDIT_MAIL'] ?? '') === 'success';
}
