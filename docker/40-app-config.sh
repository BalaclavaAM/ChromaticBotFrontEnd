#!/bin/sh
# Genera la configuración runtime del frontend a partir de variables de entorno.
# Así la misma imagen sirve para cualquier entorno sin rebuild.
set -e

CONFIG_FILE=/usr/share/nginx/html/assets/config.json

if [ -z "${API_BASE_URL}" ]; then
  echo "[app-config] WARNING: API_BASE_URL no está definida; se mantiene la config por defecto ($(cat "$CONFIG_FILE" 2>/dev/null || echo 'ninguna'))" >&2
  exit 0
fi

cat > "$CONFIG_FILE" <<EOF
{
  "apiBaseUrl": "${API_BASE_URL}"
}
EOF

echo "[app-config] assets/config.json generado con apiBaseUrl=${API_BASE_URL}"
