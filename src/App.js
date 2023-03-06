import React, { useState, useEffect, useRef } from 'react';
import MovieForm from './components/MovieForm';
import MoviesList from './components/MoviesList';
import './App.css';

function App(props) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    async function addMovieHandler(movie) {
        const response = await fetch('https://http-react-1dd05-default-rtdb.firebaseio.com//movies.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        fetchMoviesHandler()
    }


    // const [retrying, setRetrying] = useState(true);
    //  const [timeoutId, setTimeoutId] = useState(null);


    useEffect(() => {
        fetchMoviesHandler();
    }, []);
    async function fetchMoviesHandler(props) {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://http-react-1dd05-default-rtdb.firebaseio.com/movies.json');

            if (!response.ok) {
                throw new Error('Something went wrong....Retrying')
            }
            const data = await response.json()



            const loadedMovies = [];

            for (const key in data) {
                loadedMovies.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                })
            }
            setMovies(loadedMovies);

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
            />  <
            section >
            <
            button onClick = { fetchMoviesHandler } > Fetch Movies < /button>  <
            /section>   <
            section > {!isLoading && < MoviesList movies = { movies }
                />}   {
                    isLoading && < p > Loading... < /p>} {
                        !isLoading && error && < p > { error } < /p>}  <
                            /section> 

                        <
                        /React.Fragment>
                    );
                }

                export default App;