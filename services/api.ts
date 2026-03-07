export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
        }
    };

    export const fetchMovies = async ({ query } : { query: string }) => {
        const endpoint = query
            ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }
        const data = await response.json();
        return data.results;
    }


// const url = 'https://api.themoviedb.org/3/discover/movie';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGU0NWNiZGM4OGY5NWI1YzUwM2ZhNmE1NGM0NGFlYiIsIm5iZiI6MTc3Mjg4MjUyNy4wNjksInN1YiI6IjY5YWMwYTVmZjU0YjhmZTE3ZDc5ZjU2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7MTOBqk0mUwQn521OEKs4fepuUi8Kk5K2LOkP3gKi6k'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));