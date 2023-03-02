import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token)
            return;

        fetch("https://myflix-20778.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    console.log(movies);
    const movieFromApi = movies.map((doc) => {
        const actors = doc.Actors
        return {
            id: doc._id,
            title: doc.Title,
            imagepath: doc.ImagePath,
            director: doc.Director.Name,
            actors: actors
        };
    });


    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <>
                <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
                />
            </>
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