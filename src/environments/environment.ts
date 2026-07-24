// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Nota: la URL real del backend se lee en runtime desde assets/config.json;
// este valor es solo el fallback si ese archivo no existe.
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};
