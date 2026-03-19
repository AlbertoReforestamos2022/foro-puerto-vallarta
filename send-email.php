<?php
// ─── Configuración ────────────────────────────────────────────────────────────
$RESEND_API_KEY  = 're_FC6PvAtw_4gVAWmHpLjepKTofh8hSeAga';
$FROM_EMAIL      = 'foro@reforestamosmexico.org';       // debe estar verificado en Resend
$FROM_NAME       = 'Foro Arbolado Urbano';
$ADMIN_EMAILS    = [
    'admin1@correo.com',   // ← reemplaza con el correo real
    'admin2@correo.com',   // ← reemplaza con el correo real
];

// ─── CORS ─────────────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: https://albertto-rm.github.io');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ─── Leer datos del formulario ─────────────────────────────────────────────────
$data = json_decode(file_get_contents('php://input'), true);

$nombre = htmlspecialchars($data['nombre'] ?? 'Participante');
$correo = filter_var($data['correo'] ?? '', FILTER_VALIDATE_EMAIL);

if (!$correo) {
    http_response_code(400);
    echo json_encode(['error' => 'Correo inválido']);
    exit;
}

// ─── Función para enviar via Resend ───────────────────────────────────────────
function sendEmail($apiKey, $from, $fromName, $to, $subject, $html) {
    $payload = json_encode([
        'from'    => "$fromName <$from>",
        'to'      => is_array($to) ? $to : [$to],
        'subject' => $subject,
        'html'    => $html,
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
    ]);
    $response = curl_exec($ch);
    $status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ['status' => $status, 'body' => $response];
}

// ─── 1. Correo de confirmación al registrante ─────────────────────────────────
$htmlConfirmacion = "
<div style='font-family:sans-serif;max-width:600px;margin:auto'>
  <h2 style='color:#036935'>¡Gracias por registrarte, {$nombre}!</h2>
  <p>Tu registro al <strong>Foro de Arbolado Urbano como Semilla de Resiliencia</strong> ha sido recibido exitosamente.</p>
  <p>En los próximos días recibirás más información sobre el evento.</p>
  <hr style='border-color:#eee'>
  <p style='color:#999;font-size:.85rem'>
    Reforestamos México A.C. · reforestamosmexico.org
  </p>
</div>
";

$r1 = sendEmail($RESEND_API_KEY, $FROM_EMAIL, $FROM_NAME, $correo, '¡Tu registro al Foro está confirmado!', $htmlConfirmacion);

// ─── 2. Notificación a admins ─────────────────────────────────────────────────
$detalles = '';
foreach ($data as $key => $val) {
    if ($key === 'correo' || $key === 'nombre') continue;
    $valStr   = is_array($val) ? implode(', ', $val) : htmlspecialchars((string)$val);
    $detalles .= "<tr><td style='padding:4px 8px;color:#555'><b>" . htmlspecialchars($key) . "</b></td><td style='padding:4px 8px'>{$valStr}</td></tr>";
}

$htmlAdmin = "
<div style='font-family:sans-serif;max-width:700px;margin:auto'>
  <h2 style='color:#036935'>Nuevo registro — Foro Arbolado Urbano</h2>
  <p><strong>Nombre:</strong> {$nombre}<br><strong>Correo:</strong> {$correo}</p>
  <table style='width:100%;border-collapse:collapse;margin-top:1rem'>
    {$detalles}
  </table>
</div>
";

$r2 = sendEmail($RESEND_API_KEY, $FROM_EMAIL, $FROM_NAME, $ADMIN_EMAILS, "Nuevo registro: {$nombre}", $htmlAdmin);

// ─── Respuesta ─────────────────────────────────────────────────────────────────
if ($r1['status'] === 200 || $r1['status'] === 201) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al enviar correo', 'detail' => $r1['body']]);
}
