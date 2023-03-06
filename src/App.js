import React, { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import MoviesList from './components/MoviesList';
import './App.css';

function App(props) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    function addMovieHandler(title, openText, releasedate) {
        console.log(title);
        console.log(openText);
        console.log(releasedate);
    }

    // const [retrying, setRetrying] = useState(true);
    //  const [timeoutId, setTimeoutId] = useState(null);


    useEffect(() => {
        fetchMoviesHandler();
    }, []);
    async function fetchMoviesHandler() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films/');

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
        // if (retrying) {
        //     const id = setTimeout(fetchMoviesHandler, 5000);
        //     setTimeoutId(id);
        // }
    };

    // function cancelRetryHandler() {
    //     setRetrying(false);
    //     clearTimeout(timeoutId);
    //{retrying && < button onClick = { cancelRetryHandler } > Cancel Retry </button>} 
    // }

    return ( <
            React.Fragment >
            <
            MovieForm onAddMovie = { addMovieHandler }
            /> <
            section >
            <
            button onClick = { fetchMoviesHandler } > Fetch Movies < /button>  <
            /section>  <
            section > {!isLoading && < MoviesList movies = { movies }
                />}  {
                    isLoading && < p > Loading... < /p>} {
                        !isLoading && error && < p > { error } < /p>}  <
                            /section>  <
                            /React.Fragment>
                    );
                }

                export default App;