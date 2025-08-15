import React from 'react'
import { useEffect, useState } from 'react'
import { useFetchMovies } from "../hooks/useFetchMovies";
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap CSS
import ModalDetail from './ModalDetail'       // Componente del modal

import Header from './Header'
import MenuMobile from './MenuMobile'
import Footer from './Footer'
import './style/App.css'
import './style/index.css'

function App() {
  // Pruebas API
  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")
  // Nuevo: control de feed (popular | search | trending | top_rated) y ventana de tiempo para tendencias
  const [feed, setFeed] = useState('popular')
  const [timeWindow] = useState('day') // 'day' o 'week'

  // Elegir endpoint según feed
  const endpoint =
    feed === 'search' ? 'search/movie'
    : feed === 'trending' ? `trending/all/${timeWindow}`
    : feed === 'top_rated' ? 'movie/top_rated'
    : 'movie/popular'

  const { movies, loading, error } = useFetchMovies(endpoint, query)

  // Manejo del envío: valida entrada, actualiza query y cambia feed a 'search'
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    setFeed('search')
    setQuery(searchInput.trim())
  }

  // Handler para seleccionar feeds desde el Header
  const handleSelectFeed = (nextFeed) => {
    setFeed(nextFeed)
    setQuery('')         // limpiar búsqueda
    setSearchInput('')   // limpiar input
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

  // Estado para el modal (película activa y visibilidad)
  const [showModal, setShowModal] = useState(false)
  const [activeMovie, setActiveMovie] = useState(null)

  const handleOpenModal = (item) => {
    setActiveMovie(item)
    setShowModal(true)
  }

  // Este onClose lo invoca ModalDetail cuando el modal ya terminó de ocultarse
  const handleCloseModal = () => {
    setShowModal(false)
    setActiveMovie(null)
  }

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
      // Título: soporta películas (title) y TV (name)
      const safeTitle = movie.title || movie.name || '—'
      // Título truncado a 40 caracteres con "..."
      const displayTitle = safeTitle.length > 40 ? `${safeTitle.slice(0, 40)}...` : safeTitle
      // Año: de release_date (pelis) o first_air_date (TV)
      const rawDate = movie.release_date || movie.first_air_date || ''
      const year = rawDate ? rawDate.slice(0, 4) : '—'
      // Puntuación
      const hasRating = Number.isFinite(movie.vote_average) && movie.vote_average > 0
      const rating = hasRating ? +movie.vote_average.toFixed(1) : '0'
      // Datos completos para el modal
      const fullDate = movie.release_date || movie.first_air_date || ''
      const overview = movie.overview || ''
      return {
        id: movie.id,
        posterUrl, safeTitle, displayTitle, year, rating,
        fullDate, overview
      }
    })

  // Título de sección según feed
  const sectionTitle =
    feed === 'search' && query ? 'Resultados de la búsqueda'
    : feed === 'trending' ? 'Tendencias'
    : feed === 'top_rated' ? 'Mejor valoradas'
    : 'Populares esta semana'

  // Nuevo: determina si no hay resultados que mostrar para la búsqueda actual.
  const noResults = !loading && !error && feed === 'search' && Boolean(query) && uiMovies.length === 0

  // Tarjetas ya listas para renderizar
  const uiCards = uiMovies.map(m => (
    <article
      className="movie-card"
      key={m.id}
      onClick={() => handleOpenModal(m)}
      role="button"
      tabIndex={0}
      title={`Ver detalles de ${m.safeTitle}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenModal(m) } }}
    >
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
  ))

  // Contenido de resultados (mensaje vacío o grilla con tarjetas).
  const resultsContent = noResults
    ? <p className="empty-state">Lo sentimos, no se ha encontrado nada...</p>
    : (
      <div className="card-grid">
        {/* Comienzo - Pruebas de renderizado de las peliculas */}
        {uiCards}
        {/* Fin - Pruebas de renderizado de las peliculas */}
      </div>
    )

  return (
    <>
      <div className="fs-page">
        <Header
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          isLight={isLight}
          setIsLight={setIsLight}
          onSelectFeed={handleSelectFeed} // nuevo: pasar handler al Header
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

            {/* 
            No se me ocurrio como incluirlo, pero seguire pensando... 
            <div className="chips" aria-label="Sugerencias rápidas">
              <button type="button" className="chip">Acción</button>
              <button type="button" className="chip">Drama</button>
              <button type="button" className="chip">Comedia</button>
              <button type="button" className="chip">Ciencia ficción</button>
              <button type="button" className="chip">Animación</button>
            </div> */}

          </form>
          {/* {loading && <p>Cargando...</p>}
          {error && <p>Error: {error}</p>} */}
          <section className="fs-suggestions" id="tendencias" aria-labelledby="tendencias-title">
            <h3 className="section-title" id="tendencias-title">{sectionTitle}</h3>
            {resultsContent}
          </section>
        </main>

        {/* Modal de detalle */}
        <ModalDetail
          show={showModal}
          onClose={handleCloseModal}
          item={activeMovie}
        />

        <Footer />
      </div>
    </>
  )
}

export default App
