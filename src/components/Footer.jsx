import './style/App.css'

function Footer({}) {
    return (
        
        <footer className="fs-footer">
          <p>© {new Date().getFullYear()} Film Search — Proyecto de Francisco G. — Cine para todos.</p>
          <p>Gracias a <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">The Movie Database (TMDb)</a> por su API pública.</p>
          <p>Esta proyecto utiliza la API de TMDb pero no está avalado ni certificado por TMDb.</p>
        </footer>
    )
}

export default Footer