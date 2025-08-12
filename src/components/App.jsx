
import Header from './Header'
import './style/App.css'
import './style/index.css'

function App() {
  return (
    <>
      <div className="fs-page">
        <Header />

        <main className="fs-hero">
          <div className="bg-orb orb-1" aria-hidden="true"></div>
          <div className="bg-orb orb-2" aria-hidden="true"></div>

          <h2 className="hero-title">Encuentra tu próxima película</h2>
          <p className="hero-subtitle">Busca por título, director o género. Descubre joyas ocultas y estrenos imperdibles.</p>

          <form className="fs-search" action="/search" role="search">
            <label className="visually-hidden" htmlFor="search-bar">Buscar películas</label>
            <div className="search-field">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M10 2a8 8 0 015.292 13.708l4 4a1 1 0 01-1.414 1.414l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"/>
              </svg>
              <input
                id="search-bar"
                name="q"
                type="search"
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

          <section className="fs-suggestions" id="tendencias" aria-labelledby="tendencias-title">
            <h3 className="section-title" id="tendencias-title">Populares esta semana</h3>
            <div className="card-grid">
              <article className="movie-card">
                <div className="poster shimmer"></div>
                <div className="card-body">
                  <h4 className="movie-title">The Night Agent</h4>
                  <p className="movie-meta">Acción • 2023</p>
                </div>
                <span className="badge">8.4</span>
              </article>

              <article className="movie-card">
                <div className="poster poster-alt"></div>
                <div className="card-body">
                  <h4 className="movie-title">Past Lives</h4>
                  <p className="movie-meta">Romance/Drama • 2023</p>
                </div>
                <span className="badge">8.1</span>
              </article>

              <article className="movie-card">
                <div className="poster poster-blue"></div>
                <div className="card-body">
                  <h4 className="movie-title">Dune: Part Two</h4>
                  <p className="movie-meta">Sci‑Fi • 2024</p>
                </div>
                <span className="badge">8.7</span>
              </article>

              <article className="movie-card">
                <div className="poster poster-purple"></div>
                <div className="card-body">
                  <h4 className="movie-title">Spider‑Verse</h4>
                  <p className="movie-meta">Animación • 2023</p>
                </div>
                <span className="badge">8.9</span>
              </article>

              <article className="movie-card">
                <div className="poster poster-red"></div>
                <div className="card-body">
                  <h4 className="movie-title">Oppenheimer</h4>
                  <p className="movie-meta">Biografía • 2023</p>
                </div>
                <span className="badge">8.6</span>
              </article>

              <article className="movie-card">
                <div className="poster poster-green"></div>
                <div className="card-body">
                  <h4 className="movie-title">Poor Things</h4>
                  <p className="movie-meta">Comedia • 2023</p>
                </div>
                <span className="badge">8.2</span>
              </article>
            </div>
          </section>
        </main>

        <footer className="fs-footer">
          <p>© {new Date().getFullYear()} Film Search — Proyecto de Francisco G. — Cine para todos.</p>
        </footer>
      </div>
    </>
  )
}

export default App
