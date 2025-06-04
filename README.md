# 🎨 ChromaticBot Frontend

**ChromaticBot** es una aplicación web innovadora que utiliza la API de Spotify para analizar y organizar tus álbumes musicales favoritos basándose en su **cromaticidad** y paleta de colores. La aplicación extrae los colores dominantes de las portadas de los álbumes y los organiza de manera visualmente atractiva.

## ✨ Características Principales

### 🎵 Integración con Spotify
- **Autenticación OAuth2** segura con Spotify
- Acceso a tu historial musical personal
- Obtención de tus canciones más escuchadas

### 🎨 Análisis Visual de Álbumes
- **Extracción automática de colores** de las portadas de álbumes
- **Análisis de cromaticidad** para determinar la riqueza de colores
- **Identificación del color dominante** en cada portada
- **Visualización de paleta de colores** completa

### 📊 Personalización de Datos
- **Períodos de tiempo configurables**:
  - 1 mes
  - 6 meses  
  - Todo el tiempo
- **Cantidad de canciones ajustable**: 1-50 tracks
- **Ordenamiento por cromaticidad** automático

### 🌐 Interfaz Multiidioma
- **Español** e **Inglés** disponibles
- Cambio de idioma dinámico
- Persistencia de preferencias en localStorage

### 🎴 Visualización Interactiva
- **Tarjetas de álbum animadas** con efecto flip 3D
- **Vista frontal**: Portada + paleta de colores
- **Vista trasera**: Lista de canciones del álbum
- **Tooltips informativos** con nombres completos
- **Indicador de cantidad** de canciones por álbum

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5** - Framework de CSS
- **NgBootstrap** - Componentes Angular para Bootstrap
- **ngx-translate** - Internacionalización
- **angular-oauth2-oidc** - Autenticación OAuth2
- **RxJS** - Programación reactiva

### Características Técnicas
- **Standalone Components** - Arquitectura moderna de Angular
- **Responsive Design** - Adaptable a dispositivos móviles
- **Animaciones CSS** - Transiciones suaves y efectos visuales
- **Lazy Loading** - Carga optimizada de recursos

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Angular CLI** (`npm install -g @angular/cli`)

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/ChromaticBotFrontEnd.git

# Navegar al directorio
cd ChromaticBotFrontEnd

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Configuración de Spotify API
1. Crear una aplicación en [Spotify for Developers](https://developer.spotify.com/)
2. Configurar la URI de redirección: `http://localhost:4200/callback`
3. Actualizar el `clientId` en `src/app/services/oauthconfig.ts`

## 🎯 Uso de la Aplicación

### 1. **Autenticación**
- Hacer clic en "Login to Spotify"
- Autorizar el acceso a tu cuenta de Spotify
- Serás redirigido de vuelta a la aplicación

### 2. **Configuración de Parámetros**
- **Seleccionar período de tiempo**:
  - 1 mes: Canciones más recientes
  - 6 meses: Tendencias a mediano plazo
  - Todo el tiempo: Historial completo
- **Ajustar cantidad de canciones**: Usar el slider (1-50)

### 3. **Generar Análisis**
- Hacer clic en "Comenzar" / "Start"
- La aplicación procesará tu música en el backend
- Los álbumes aparecerán ordenados por cromaticidad

### 4. **Explorar Resultados**
- **Hacer clic en una tarjeta** para ver las canciones del álbum
- **Observar la paleta de colores** extraída automáticamente
- **Ver el color dominante** en la barra inferior
- **Número de canciones** mostrado en el badge superior

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── models/                 # Interfaces TypeScript
│   │   ├── spotifyLoginInfo.ts # Info del usuario de Spotify
│   │   └── spotifyTopInfo.ts   # Datos de álbum y canciones
│   ├── pages/                  # Componentes de página
│   │   ├── home/              # Página principal
│   │   ├── about-bot/         # Información sobre la app
│   │   └── callback/          # Manejo del callback OAuth
│   ├── services/              # Servicios de negocio
│   │   ├── spotify.service.ts # Integración con Spotify API
│   │   ├── user-info.service.ts # Gestión de estado del usuario
│   │   └── oauthconfig.ts     # Configuración OAuth2
│   ├── ui-components/         # Componentes reutilizables
│   │   ├── nav-bar/           # Barra de navegación
│   │   └── album-card/        # Tarjeta de álbum
│   └── app.component.ts       # Componente raíz
├── assets/
│   └── i18n/                  # Archivos de traducción
│       ├── en.json           # Inglés
│       └── es.json           # Español
└── main.ts                    # Bootstrap de la aplicación
```

## 🌐 Backend Integration

La aplicación se conecta a un backend Python que:
- Recibe el token de acceso de Spotify
- Obtiene las canciones más escuchadas del usuario
- Analiza las portadas de álbumes para extraer colores
- Calcula la cromaticidad y ordena los resultados
- Retorna los datos procesados al frontend

**Endpoint principal**: `POST http://127.0.0.1:5000/get_albums_by_chromaticity`

## 🎨 Características Visuales

### Paleta de Colores
- **Extracción automática** de hasta 8 colores principales
- **Visualización en mosaico** debajo de cada portada
- **Color dominante** destacado en barra inferior

### Animaciones
- **Flip 3D** en tarjetas de álbum
- **Transiciones suaves** entre estados
- **Hover effects** responsivos

### Responsive Design
- **Mobile-first** approach
- **Grid adaptativo**: 1-4 columnas según el dispositivo
- **Navegación móvil** con menú colapsable

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start                # Servidor de desarrollo
npm run watch           # Build automático en cambios

# Producción
npm run build           # Build para producción
npm test               # Ejecutar tests unitarios

# Angular CLI
ng generate component   # Generar nuevo componente
ng generate service     # Generar nuevo servicio
ng help                # Ayuda de Angular CLI
```

## 🌍 Internacionalización

La aplicación soporta múltiples idiomas:

### Idiomas Disponibles
- **🇺🇸 English** (Inglés)
- **🇪🇸 Español** (Español)

### Agregar Nuevo Idioma
1. Crear archivo en `src/assets/i18n/[codigo].json`
2. Agregar traducciones siguiendo la estructura existente
3. Actualizar `NavBarComponent` para incluir el nuevo idioma

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Desarrollo

### Estado del Proyecto
- ✅ **Componentes Standalone** implementados
- ✅ **OAuth2 con Spotify** funcional
- ✅ **Análisis de cromaticidad** operativo
- ✅ **Interfaz responsive** completa
- ✅ **Multiidioma** implementado

### Próximas Características
- 🔄 Modo oscuro/claro
- 📱 PWA (Progressive Web App)
- 🎵 Reproductor integrado
- 📊 Estadísticas avanzadas
- 💾 Guardado de análisis

---

**ChromaticBot** - *Descubre la música a través del color* 🎨🎵
