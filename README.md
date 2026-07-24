# ChromaticBot — Frontend

Ordena tus álbumes más escuchados de Spotify por color. El backend analiza las
carátulas con ColorThief y este frontend (Angular 22) las muestra como un
espectro: por matiz, saturación o brillo. También genera un póster 1080×1920
para compartir, renderizado completamente en el navegador.

Backend: [ChromaticBotBackEnd](https://github.com/BalaclavaAM/ChromaticBotBackEnd)

## Correr en local

Necesitas Node 22+ y el backend corriendo en el puerto 8080.

```bash
npm ci
npm start          # http://localhost:4200
```

La URL del backend se lee en runtime de `src/assets/config.json` (por defecto
`http://localhost:8080`). En el contenedor la genera el entrypoint a partir de
la variable `API_BASE_URL`, así que la misma imagen sirve para cualquier entorno.

Para que el login funcione necesitas una app en el
[dashboard de Spotify](https://developer.spotify.com/dashboard) con la redirect
URI `http://127.0.0.1:4200/callback` — Spotify ya no acepta `localhost`, así
que entra a la app por `http://127.0.0.1:4200` — y tu `clientId` en
`src/app/services/oauthconfig.ts`.

## Tests y build

```bash
npm test           # Vitest
npm run build      # dist/chromatic-bot
```

## Docker

```bash
docker build -t chromaticbot-front .
docker run -p 8080:80 -e API_BASE_URL=https://tu-backend chromaticbot-front
```

nginx sirve la SPA con fallback a `index.html` y headers de seguridad
(`nginx.conf` + `nginx-security-headers.conf`).

## La letra pequeña de Spotify

Desde 2025 Spotify no acepta solicitudes de quota extendida de individuos, así
que la app vive en Development mode: solo pueden loguearse las cuentas
agregadas en User Management del dashboard (máximo 25). Si quieres correr tu
propia instancia, crea tu app en el dashboard y cambia el `clientId` — es
gratis y toma cinco minutos.

## Stack

Angular 22 (standalone, control flow nuevo), Bootstrap 5.3 + ng-bootstrap,
angular-oauth2-oidc (Authorization Code + PKCE), ngx-translate (es/en) y
Vitest. El despliegue está pensado para Northflank; la guía completa vive en
`DEPLOYMENT.md` del repo del backend.
