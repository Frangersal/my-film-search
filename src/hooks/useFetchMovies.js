import { useState, useEffect } from "react";

export function useFetchMovies(endpoint, query = "") {
    // Estados del hook:
    // - movies: resultados devueltos por la API.
    // - loading: indica si hay una petición en curso.
    // - error: mensaje de error en caso de fallo.
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false); // antes true
    const [error, setError] = useState(null);

    useEffect(() => {
        // Early return: si no hay término de búsqueda, evita llamar a la API.
        // Deja de cargar y conserva (o limpia) los estados según convenga.
        if (!query) {
            setLoading(false);
            // Opcional: mantener resultados previos o limpiarlos
            // setMovies([]);
            // setError(null);
            return;
        }

        // Construcción de la URL con:
        // - endpoint dinámico (p. ej., 'search/movie')
        // - API_KEY desde variables de entorno
        // - language forzado a 'es-ES'
        // - query codificada
        const API_KEY = import.meta.env.VITE_TMDB_KEY;
        const URL = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`;

        // Secuencia de fetch:
        // 1) Activa loading
        // 2) Valida respuesta HTTP
        // 3) Parsea JSON y guarda resultados
        // 4) Maneja errores y limpia estados al finalizar
        setLoading(true);
        fetch(URL)
            .then(res => {
                if (!res.ok) throw new Error("Error en la petición");
                // Opcional: logs de diagnóstico
                // console.log(res);
                return res.json();
            })
            .then(data => {
                setMovies(data.results || []);
                setError(null);
                // Opcional: logs de diagnóstico
                // console.log(data.results);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [endpoint, query]);

    // Devuelve un objeto con los estados consumibles por la UI.
    return { movies, loading, error };
}
