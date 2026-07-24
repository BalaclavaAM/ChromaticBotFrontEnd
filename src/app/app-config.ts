import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
}

// Configuración resuelta en runtime (assets/config.json) antes del bootstrap,
// para poder cambiar la URL del backend sin rebuildeard la imagen.
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
