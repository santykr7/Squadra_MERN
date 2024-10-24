import React, { useEffect, useState } from 'react';
import './MoviePage.css'; // Import the CSS file for styling

const MoviePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchMovies = async () => {
        try {
            setLoading(true); 
            const response = await fetch('https://dummyapi.online/api/movies');
            const json = await response.json();
            setData(json.slice(0, 10))
        } catch (error) {
            console.error('Error fetching movie data:', error);
            setLoading(false)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="movie-container">
            <h1>Movie List</h1>
            {loading ? ( 
                <p>Loading movies...</p>
            ) : (
                <div className="movie-list">
                    {data.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <div className="movie-info">
                                <h2>{movie.movie}</h2>
                                <p>Rating: {movie.rating}</p>
                                <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">
                                    View on IMDb
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MoviePage;
