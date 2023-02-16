import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Sweet Home Alabama",
            description: "A young woman who has reinvented herself as a New York City socialite must return home to Alabama to obtain a divorce from her husband after seven years of separation.",
            genre: "Romance Comedy",
            director: "Andy Tennant",
            image: "https://m.media-amazon.com/images/I/713QKVcMBeL._SY445_.jpg",
        },
        {
            id: 2,
            title: "Clue",
            description: "Six guests are anonymously invited to a strange mansion for dinner, but after their host is killed, they must cooperate with the staff to identify the murderer as the bodies pile up.",
            genre: "Comedy",
            director: "Jonathan Lynn",
            image: "https://m.media-amazon.com/images/I/51TWNQAJEFL._SY445_.jpg",
        },
        {
            id: 3,
            title: "Three Amigos",
            description: "Three actors accept an invitation to a Mexican village to perform their onscreen bandit fighter roles, unaware that it is the real thing.",
            genre: "Comedy",
            director: "John Landis",
            image: "https://m.media-amazon.com/images/I/91ouVoAeYNL._SY445_.jpg",
        },
    ]);

    const [selectedMovie, setSelectMovie] = useState(null);

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
            {movies.map((movies) => (
                <MovieCard
                    key={movies.id}
                    movies={movies}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};