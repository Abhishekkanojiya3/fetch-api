import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retrying, setRetrying] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null);




    async function fetchMoviesHandler() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/film/');

            if (!response.ok) {
                throw new Error('Something went wrong....Retrying')
            }
            const data = await response.json()


            const transformedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                };
            });
            setMovies(transformedMovies);

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
        if (retrying) {
            const id = setTimeout(fetchMoviesHandler, 5000);
            setTimeoutId(id);
        }
    };

    function cancelRetryHandler() {
        setRetrying(false);
        clearTimeout(timeoutId);

    }

    return ( <
            React.Fragment >
            <
            section >
            <
            button onClick = { fetchMoviesHandler } > Fetch Movies < /button> {
                retrying && < button onClick = { cancelRetryHandler } > Cancel Retry < /button>} <
                    /section> <
                    section > {!isLoading && < MoviesList movies = { movies }
                        />} {
                            isLoading && < p > Loading... < /p>} {
                                !isLoading && retrying && error && < p > { error } < /p>} <
                                    /section> <
                                    /React.Fragment>
                            );
                        }

                        export default App;