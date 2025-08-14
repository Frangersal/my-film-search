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
  const {movies, loading, error } = useFetchMovies("search/movie", query)

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // La búsqueda se actualiza automáticamente por el hook
  // };
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    setQuery(searchInput.trim())
  }
const IMG_BASE = 'https://image.tmdb.org/t/p/w342';
  // Fin Pruebas API
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light')
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

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 670) setIsNavOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])



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

          <h2 className="hero-title">Encuentra tu próxima película</h2>
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


            {/* Comienzo - Pruebas de renderizado de las peliculas */}
            <ul>
              {movies.map(movie => {
                const posterUrl = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;
                return (
                  <React.Fragment key={movie.id}>
                    <li>{movie.title} ({movie.release_date})</li>
                    <li>
                      {posterUrl ? (
                        <img
                          src={posterUrl}
                          alt={`Póster de ${movie.title}`}
                          width="170"
                          height="255"
                          loading="lazy"
                        />
                      ) : (
                        <span>Sin póster</span>
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
            {/* Fin - Pruebas de renderizado de las peliculas */}


            <div className="card-grid">
              {/* <article className="movie-card">
                <div className="poster shimmer"></div>
                <div className="card-body">
                  <h4 className="movie-title">The Night Agent</h4>
                  <p className="movie-meta">Acción • 2023</p>
                </div>
                <span className="badge">8.4</span>
              </article> */}

              <article className="movie-card">
                <div className="poster "></div>
                <div className="card-body">
                  <h4 className="movie-title">Past Lives</h4>
                  <p className="movie-meta">Romance/Drama • 2023</p>
                </div>
                <span className="badge">8.1</span>
              </article>

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
