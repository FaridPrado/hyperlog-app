# HYPERLOG

**HYPERLOG** es una aplicación web progresiva (PWA) para crear rutinas de entrenamiento, registrar cada sesión y consultar el progreso de forma rápida, clara y privada. Está pensada para reemplazar hojas de cálculo y registros manuales por una experiencia móvil centrada en el entrenamiento real.

## Objetivo

HYPERLOG busca que registrar una rutina sea tan sencillo como entrenarla. La aplicación concentra en un solo lugar la planificación, el registro de series y la consulta histórica, evitando tablas extensas, fórmulas frágiles y navegación innecesaria.

El flujo principal está diseñado para responder tres preguntas:

1. **¿Qué me toca entrenar?**
2. **¿Qué hice la última vez?**
3. **¿Estoy progresando?**

## Diferenciadores

- **Mobile-first:** interfaz optimizada para registrar datos durante el entrenamiento con pocos toques.
- **Rutinas flexibles:** permite trabajar con días fijos de la semana o rotaciones cada cierto número de días.
- **Importación inteligente:** una rutina escrita en lenguaje natural puede analizarse localmente y convertirse en sesiones y ejercicios editables.
- **RIR integrado:** cada serie efectiva puede registrar repeticiones en reserva junto con carga y repeticiones.
- **Historial desacoplado de la rutina:** modificar la estructura actual no elimina los entrenamientos ya registrados.
- **Progreso útil:** visualiza e1RM, volumen, carga y repeticiones a partir de registros válidos.
- **Privacidad local:** no requiere cuenta, servidor ni base de datos remota para almacenar el progreso.
- **Funcionamiento sin conexión:** una vez instalada y cargada, la PWA puede utilizarse sin Internet.
- **Bilingüe:** interfaz disponible en Español e English (US).

## Público objetivo

HYPERLOG está orientada a personas que realizan entrenamiento de fuerza o hipertrofia y quieren llevar un registro estructurado sin depender de una hoja de cálculo. Resulta especialmente útil para usuarios que trabajan con:

- rangos de repeticiones;
- RIR objetivo;
- doble progresión;
- series de aproximación;
- descansos definidos;
- rutinas Full Body, Torso/Pierna, Push/Pull/Legs u otras estructuras personalizadas;
- rotaciones que no dependen de días fijos de la semana.

## Funcionalidades principales

### Creación de rutina

El usuario puede crear su programa desde cero definiendo:

- nombre y fecha de inicio;
- duración;
- sesiones;
- frecuencia por días fijos o cada X días;
- orden de los ejercicios;
- series efectivas;
- rango de repeticiones;
- RIR objetivo o rango de RIR;
- descanso;
- series de aproximación;
- prioridad y notas técnicas.

También puede pegar una rutina escrita previamente. El importador intenta identificar la estructura y solicita únicamente los campos obligatorios que no pueda interpretar con suficiente seguridad.

### Entrenamiento

Durante una sesión se puede:

- registrar carga, repeticiones y RIR por serie;
- registrar aproximaciones;
- consultar el entrenamiento anterior;
- copiar referencias previas;
- añadir notas de la sesión;
- usar un temporizador de descanso desplazable;
- avanzar entre ejercicios;
- visualizar el progreso de la sesión.

Los cambios se guardan automáticamente mientras se registran.

### Inicio

El panel principal muestra de forma resumida:

- semana actual del programa;
- porcentaje completado;
- volumen semanal;
- RIR medio;
- próxima sesión pendiente;
- distribución semanal;
- actividad reciente;
- avisos sobre datos que requieren revisión.

### Historial

Permite consultar y editar los registros anteriores mediante filtros por:

- ejercicio;
- sesión;
- estado del registro.

Los registros históricos conservan la información necesaria para interpretar cómo estaba prescrito el ejercicio cuando se realizó.

### Progreso

Para cada ejercicio puede consultarse:

- **e1RM:** estimación de una repetición máxima mediante la fórmula de Epley;
- **Volumen:** carga × repeticiones acumuladas;
- **Carga:** mayor carga válida registrada;
- **Reps:** mayor cantidad válida de repeticiones registrada.

La aplicación muestra evolución por entrenamiento, valores recientes, mejores marcas y resúmenes semanales.

### Datos y seguridad

HYPERLOG dispone de:

- guardado local redundante;
- copia de seguridad en JSON;
- restauración de copias de HYPERLOG;
- exportación de registros a CSV compatible con Excel y otras hojas de cálculo;
- validación de cargas anómalas para evitar que errores de digitación contaminen las métricas;
- solicitud opcional de almacenamiento persistente cuando el navegador lo permite.

## Privacidad y almacenamiento

HYPERLOG funciona sin una cuenta de usuario y no necesita enviar el historial de entrenamiento a un servidor.

Los datos se almacenan en el dispositivo utilizando dos mecanismos del navegador:

- `localStorage` para persistencia inmediata;
- `IndexedDB` como copia redundante de recuperación.

> **Importante:** borrar los datos del sitio, restablecer el navegador o desinstalar aplicaciones eliminando sus datos puede borrar el progreso local. Se recomienda descargar copias de seguridad periódicamente desde **Ajustes → Datos → Copia de seguridad**.

La importación de rutinas escritas se procesa en el propio navegador.

## Instalación en Android

La forma recomendada de utilizar HYPERLOG es publicarla mediante HTTPS e instalarla como PWA.

1. Abre la URL publicada en **Google Chrome**.
2. Entra en **Ajustes → Instalación** y pulsa **Instalar**, o utiliza el menú de Chrome y selecciona **Instalar aplicación**.
3. Confirma la instalación.
4. HYPERLOG aparecerá en la pantalla de inicio y podrá abrirse como una aplicación independiente.

Después de una primera carga correcta, los archivos esenciales quedan disponibles para uso sin conexión.

## Uso en escritorio

La aplicación también funciona en navegadores modernos de escritorio. Puede utilizarse desde la URL publicada y, cuando el navegador lo permita, instalarse como aplicación web.

## Publicación

HYPERLOG es una aplicación estática y no requiere proceso de compilación.

### Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. Importa el repositorio en Vercel.
3. Utiliza **Other** como Framework Preset si Vercel solicita uno.
4. No es necesario definir un comando de build.
5. Publica el proyecto.

El archivo `vercel.json` contiene cabeceras recomendadas para la PWA y la política de caché de los archivos críticos.

### Otros servicios

Puede publicarse en cualquier hosting estático con HTTPS. El proyecto incluye también `netlify.toml` para una configuración equivalente en Netlify.

## Estructura del proyecto

```text
hyperlog-app/
├── index.html
├── HYPERLOG_Respaldo_Local.html
├── service-worker.js
├── manifest.webmanifest
├── vercel.json
├── netlify.toml
├── README.md
├── .gitignore
└── icons/
    ├── icon-1-0-192.png
    ├── icon-1-0-512.png
    ├── icon-1-0-maskable-512.png
    └── logo-1-0-512.png
```

### Archivos principales

- **`index.html`**: interfaz, lógica de la aplicación y persistencia.
- **`HYPERLOG_Respaldo_Local.html`**: copia equivalente del archivo principal para uso o recuperación local junto con la carpeta `icons/`.
- **`service-worker.js`**: caché y funcionamiento sin conexión.
- **`manifest.webmanifest`**: metadatos de instalación de la PWA.
- **`vercel.json` / `netlify.toml`**: cabeceras y configuración del hosting.
- **`icons/`**: recursos visuales para navegador, instalación y Android.

## Compatibilidad

La aplicación está diseñada principalmente para navegadores modernos con soporte para:

- JavaScript moderno;
- Local Storage;
- IndexedDB;
- Service Workers;
- Web App Manifest.

Para la instalación PWA es obligatorio servir el proyecto mediante **HTTPS** (excepto entornos de desarrollo local permitidos por el navegador).

## Copias de seguridad y migración

Una copia de seguridad de HYPERLOG contiene la rutina, historial y preferencias necesarias para recuperar el estado de la aplicación.

Para restaurarla:

1. abre **Ajustes → Datos → Restaurar datos**;
2. selecciona el archivo JSON generado previamente por HYPERLOG;
3. confirma el reemplazo de los datos locales.

También es posible restaurar una copia durante la configuración inicial.

## Tecnología

HYPERLOG está desarrollada sin frameworks ni dependencias externas de ejecución:

- HTML5;
- CSS moderno;
- JavaScript nativo;
- PWA / Service Worker;
- Local Storage;
- IndexedDB.

Esto mantiene la aplicación ligera, portable y fácil de desplegar en hosting estático.

## Versión

**HYPERLOG 1.0.0**
