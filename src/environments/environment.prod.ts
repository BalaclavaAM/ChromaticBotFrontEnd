// Nota: la URL real del backend se lee en runtime desde assets/config.json,
// que el contenedor genera al arrancar a partir de la variable API_BASE_URL.
// Este valor es solo el fallback si ese archivo no existe.
export const environment = {
  production: true,
  apiBaseUrl: ''
};
