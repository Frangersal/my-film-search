import { useEffect, useState } from 'react'
import movielogo from '../assets/icons/film.svg'

import './style/App.css'
import './style/index.css'
import './style/Header.css'

function Header() {
    // Nuevo: estado de tema y sincronización con html + localStorage
    const [isLight, setIsLight] = useState(() => {
        return localStorage.getItem('theme') === 'light'
    })

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

    return (
        <>
            <header className="fs-header">
                <div className="brand">
                    <div className="logo" aria-hidden="true">
                        <img src={movielogo} alt="" />
                    </div>
                    <h1 className="brand-title">Film Search</h1>
                </div>
                <nav className="header-actions" aria-label="Atajos">
                    <a href="#tendencias" className="link">Tendencias</a>
                    <a href="#mejor-valoradas" className="link">Mejor valoradas</a>
                    <a href="https://github.com" className="cta" target="_blank" rel="noreferrer">Repositorio</a>

                    {/* Nuevo: botón de tema */}
                    <button
                        type="button"
                        className="theme-toggle"
                        aria-pressed={isLight}
                        onClick={() => setIsLight(v => !v)}
                        title={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                    >
                        {isLight ? (
                            // Mostrar luna si está en claro (para ir a oscuro)
                            <svg className="toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                            </svg>
                        ) : (
                            // Mostrar sol si está en oscuro (para ir a claro)
                            <svg className="toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.84 19.16l1.79-1.8-1.79-1.79-1.67 1.67 1.67 1.92zM20 11v2h3v-2h-3zm-2.93-6.16l1.8-1.79L21.5 4.84l-1.79 1.79-1.64-1.79zM12 7a5 5 0 100 10 5 5 0 000-10zm7.16 12.32l-1.79-1.8-1.8 1.8 1.8 1.67 1.79-1.67z" />
                            </svg>
                        )}
                        <span className="toggle-label">{isLight ? 'Oscuro' : 'Claro'}</span>
                    </button>
                </nav>
            </header>
        </>
    )
}

export default Header