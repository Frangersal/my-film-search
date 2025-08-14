import { useState, useEffect } from "react";

export function useFetchMovies(endpoint, query = "") {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false); // antes true
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            // Opcional: mantener resultados previos o limpiarlos
            // setMovies([]);
            // setError(null);
            return;
        }

        const API_KEY = import.meta.env.VITE_TMDB_KEY;
        const URL = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`;

        setLoading(true);
        fetch(URL)
            .then(res => {
                if (!res.ok) throw new Error("Error en la petición");
                console.log(res)
                return res.json();
            })
            .then(data => {
                setMovies(data.results || []);
                console.log(data.results)
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [endpoint, query]);

    return { movies, loading, error };
}
