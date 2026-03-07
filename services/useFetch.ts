import { useState, useEffect, use } from 'react';

// fetchMovies is a function that fetches movies from the TMDB API. It takes an optional query parameter to search for movies. If no query is provided, it fetches popular movies. The function returns a promise that resolves to an array of movie results.
// fetchMovieDetails is a function that fetches detailed information about a specific movie from the TMDB API. It takes a movie ID as a parameter and returns a promise that resolves to the movie details.

// useFetch is a custom hook that abstracts the logic for fetching data from an API. It takes a fetch function as a parameter and an optional autoFetch boolean to determine whether to fetch data immediately or not. The hook manages the loading state, error state, and the fetched data, providing a clean interface for components to use when fetching data.
// useFetch(fetchMovies) would allow a component to easily fetch movies and handle loading and error states without having to write the fetching logic directly in the component.

const useFetch = <T> (fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
            
        } catch (err) {
            //@ts-ignore
            setError (err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    };
    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }
    , []);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;