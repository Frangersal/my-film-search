import React from 'react'
import { useEffect, useState } from 'react'
import { useFetchMovies } from "../hooks/useFetchMovies";

import Header from './Header'
import MenuMobile from './MenuMobile'
import Footer from './Footer'
import './style/App.css'
import './style/index.css'

function App() {
  // Pruebas API
  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")
  const { movies, loading, error } = useFetchMovies("search/movie", query)

  // Manejo del envío: valida entrada vacía y sincroniza 'query' con el input para disparar la búsqueda.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    setQuery(searchInput.trim())
  }

  // Base para construir URLs de pósters de TMDb (tamaño w342).
  const IMG_BASE = 'https://image.tmdb.org/t/p/w342';
  // Fin Pruebas API

  // Tema oscuro/claro
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light')

  // Sincroniza el tema con la clase del <html> y persiste en localStorage.
  useEffect(() => {
    const root = document.documentElement
    if (isLight) {
      root.classList.add('theme-light')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.remove('theme-light')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])
  // Tema oscuro/claro

  // Cierra el menú móvil automáticamente si pasa a viewport de escritorio (> 670px).
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 670) setIsNavOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lógica previa al render: normaliza y formatea datos para la UI.
  const uiMovies = movies
    // Filtra: si no hay póster y tampoco hay calificación (> 0), no se renderiza.
    .filter(movie => {
      const hasPoster = Boolean(movie.poster_path)
      const hasRating = Number.isFinite(movie.vote_average) && movie.vote_average > 0
      return hasPoster || hasRating
    })
    .map(movie => {
      // URL del póster (null si no existe 'poster_path').
      const posterUrl = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null
      // Título seguro para usar en accesibilidad y textos (fallback '—').
      const safeTitle = movie.title || '—'
      // Título truncado a 40 caracteres con "..." para evitar desbordes visuales.
      const displayTitle = safeTitle.length > 40 ? `${safeTitle.slice(0, 40)}...` : safeTitle
      // Año (YYYY) extraído de 'release_date' o '—' si no está disponible.
      const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
      // Puntuación: máximo 1 decimal; si no hay calificación (> 0), muestra '0'.
      const hasRating = Number.isFinite(movie.vote_average) && movie.vote_average > 0
      const rating = hasRating ? +movie.vote_average.toFixed(1) : '0'
      return { id: movie.id, posterUrl, safeTitle, displayTitle, year, rating }
    })

  return (
    <>
      <div className="fs-page">
        <Header
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          isLight={isLight}
          setIsLight={setIsLight}
        />

        <MenuMobile
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          isLight={isLight}
          setIsLight={setIsLight}
        />

        <main className="fs-hero">
          <div className="bg-orb orb-1" aria-hidden="true"></div>
          <div className="bg-orb orb-2" aria-hidden="true"></div>

          <h2 className="hero-title">Encuentra tu próxima película o serie de tv</h2>
          <p className="hero-subtitle">Busca por título, director o género. Descubre joyas ocultas y estrenos imperdibles.</p>

          <form className="fs-search" role="search" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="search-bar">Buscar películas</label>
            <div className="search-field">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M10 2a8 8 0 015.292 13.708l4 4a1 1 0 01-1.414 1.414l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
              <input
                id="search-bar"
                name="q"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar “Oppenheimer”, “Scorsese”, “Sci‑Fi”..."
                autoComplete="off"
                className="search-input"
                required
              />
              <button type="submit" className="search-btn">Buscar</button>
            </div>

            <div className="chips" aria-label="Sugerencias rápidas">
              <button type="button" className="chip">Acción</button>
              <button type="button" className="chip">Drama</button>
              <button type="button" className="chip">Comedia</button>
              <button type="button" className="chip">Ciencia ficción</button>
              <button type="button" className="chip">Animación</button>
            </div>
          </form>
          {loading && <p>Cargando...</p>}
          {error && <p>Error: {error}</p>}
          <section className="fs-suggestions" id="tendencias" aria-labelledby="tendencias-title">
            <h3 className="section-title" id="tendencias-title">Populares esta semana</h3>
            <div className="card-grid">

              {/* <article className="movie-card">
                <div className="poster shimmer"></div>
                <div className="card-body">
                  <h4 className="movie-title">The Night Agent</h4>
                  <p className="movie-meta">Acción • 2023</p>
                </div>
                <span className="badge">8.4</span>
              </article> */}

              {/* Comienzo - Pruebas de renderizado de las peliculas */}
              {uiMovies.map(m => {
                return (
                  <React.Fragment key={m.id}>
                    <article className="movie-card">
                      <div className="poster">
                        {m.posterUrl ? (
                          <img
                            className="poster-img"
                            src={m.posterUrl}
                            alt={`Póster de ${m.safeTitle}`}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : null}
                      </div>
                      <div className="card-body">
                        <h4 className="movie-title">{m.displayTitle}</h4>
                        <p className="movie-meta">Genero • {m.year}</p>
                      </div>
                      <span className="badge">{m.rating}</span>
                    </article>
                  </React.Fragment>
                )
              })}
              {/* Fin - Pruebas de renderizado de las peliculas */}





            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
