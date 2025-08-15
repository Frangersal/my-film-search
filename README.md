# My Film Search ​​🎬​

Buscador de películas y series que consume la API de TMDb. Incluye búsqueda por texto, feeds (populares, tendencias, mejor valoradas), tema claro/oscuro, menú móvil y un modal de detalle con Bootstrap.<>

Finalmente el proyecto fue desplegado en netlify [My Film Search](https://myfilmsearchfgsm.netlify.app/).
<!-- captura: portada de la app -->
<img src="/public/img/ss-1-d.png" alt="Home" />

## Características​🎞️

- Búsqueda con debida validación y resultados en español.
- Feeds disponibles:
  - Populares (por defecto al abrir).
  - Tendencias (día/semana) usando trending/all.
  - Mejor valoradas (movie/top_rated).
  - Resultados de búsqueda (search/movie).
- Tarjetas con:
  - Póster responsivo (aspect-ratio 2/3 y object-fit: cover).
  - Título truncado.
  - Año (YYYY) y puntuación con máximo 1 decimal.
- Modal de detalle (Bootstrap) con:
  - Título, póster, fecha completa (dd/mm/aaaa), overview y vote_average.
  - Accesible: manejo de foco al cerrar y atributos ARIA.
  - Estilo translúcido con blur, consistente con el diseño del sitio.
- Tema claro/oscuro persistente (localStorage).
- Menú móvil y de escritorio con acciones equivalentes.

<!-- captura: resultados de búsqueda -->
<img src="/public/img/screenshot-search.png" alt="Resultados de búsqueda" />

<!-- captura: modal abierto -->
<img src="/public/img/ss-4-l" alt="Modal de detalle" />

## Tecnologías 🎥

- React + Vite.
- Bootstrap (CSS/JS) para el modal.
- Fetch nativo para llamadas a la API.
- CSS propio (Header.css, App.css, etc.) con efectos de blur y gradientes.

## Configuración ​📽️​

1) Variables de entorno (crear `.env` en la raíz):
```
VITE_TMDB_KEY=tu_api_key_de_tmdb
```

2) Instalación:
```
npm install
```

3) Desarrollo:
```
npm run dev
```

4) Build:
```
npm run build
```

## API y Endpoints 📼​

- Popular: `GET /movie/popular?language=es-ES`
- Tendencias: `GET /trending/all/{time_window}?language=es-ES` (time_window: `day` o `week`)
- Mejor valoradas: `GET /movie/top_rated?language=es-ES`
- Búsqueda: `GET /search/movie?language=es-ES&query={texto}`

La app decide el endpoint según el “feed” activo:
- Sin búsqueda: popular.
- “Tendencias” (header/menú móvil): trending/all/{day|week}.
- “Mejor valoradas”: movie/top_rated.
- Enviar formulario: search/movie.

## Detalles de implementación 🍿

- useFetchMovies:
  - Construye la URL según endpoint y query.
  - Early return si es búsqueda sin query.
  - Manejo de loading/error y normalización de datos.
- Normalización UI:
  - Título: `title || name`.
  - Fecha: año desde `release_date || first_air_date` y fecha completa formateada a `dd/mm/aaaa`.
  - Puntuación: 1 decimal, sin “.0”.
  - Filtro: no renderizar ítems sin póster y sin calificación.
- Accesibilidad/performance:
  - Imágenes con `loading="lazy"` y contenedores con `aspect-ratio` para evitar CLS.
  - Modal: `role="dialog"`, `aria-modal="true"`, manejo de foco en `hide.bs.modal`.

## Capturas 🧑‍💻

<!-- captura: tema claro/oscuro -->
<img src="/public/img/ss-1-d.png" alt="Tema claro/oscuro" />
<img src="/public/img/ss-2-l.png" alt="Tema claro/oscuro" />
<img src="/public/img/ss-3-d.png" alt="Tema claro/oscuro" />
<img src="/public/img/ss-4-l.png" alt="Tema claro/oscuro" />
<img src="/public/img/ss-5-d.png" alt="Tema claro/oscuro" />
<img src="/public/img/ss-6-l.png" alt="Tema claro/oscuro" />

## Créditos

- Agradecimientos a The Movie Database (TMDb) por su API pública.
- Este producto utiliza la API de TMDb pero no está avalado ni certificado por TMDb.

