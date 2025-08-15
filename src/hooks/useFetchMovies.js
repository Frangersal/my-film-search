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
        const isSearch = endpoint.startsWith('search/');

        // Si es búsqueda y no hay query, no llamar a la API.
        if (isSearch && !query) {
            setLoading(false);
            // Opcional: mantener resultados previos o limpiarlos
            // setMovies([]);
            // setError(null);
            return;
        }

        const API_KEY = import.meta.env.VITE_TMDB_KEY;
        const baseURL = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=es-ES`;
        const URL = isSearch
            ? `${baseURL}&query=${encodeURIComponent(query)}`
            : baseURL;

        setLoading(true);
        fetch(URL)
            .then(res => {
                if (!res.ok) throw new Error("Error en la petición");
                return res.json();
            })
            .then(data => {
                setMovies(data.results || []);
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [endpoint, query]);

    // Devuelve un objeto con los estados consumibles por la UI.
    return { movies, loading, error };
}