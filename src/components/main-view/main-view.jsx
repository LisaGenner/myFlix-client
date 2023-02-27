import { React, useState, useEffect } from "react";
//import { title } from "process";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://myflix-20778.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                // const movieFromApi = data.docs.map((doc) => {
                //     return {
                //         id: doc.key,
                //         title: doc.title,
                //         imagepath: img.imagepath,
                //         director: director_name,
                console.log(data);
            });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);

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