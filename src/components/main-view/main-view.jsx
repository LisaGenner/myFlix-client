import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);



    useEffect(() => {
        fetch("https://myflix-20778.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                const moviesFromApi = data.map((doc) => {
                    const actors = doc.Actors
                    return {
                        id: doc._id,
                        title: doc.Title,
                        imagepath: doc.ImagePath,
                        director: doc.Director.Name,
                        actors: actors
                    };
                });

                setMovies(data);
                // console.log(movieFromApi)
            });
    }, []);

    if (!user) {
        return <LoginView />;
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};

