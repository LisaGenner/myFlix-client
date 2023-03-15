import { useState, useEffect } from "react";
import { Button, Col, Card, Link } from "react-bootstrap";
// import { ProfileView } from "../profile-view/profile-view";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export const FavoriteMovie = ({ user, movies }) => {
    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");
    const [token] = useState(storedToken ? storedToken : null);
    const [favoriteMovie, setFavoriteMovie] = useState([]);

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('');
    // const [birthday, setBirthday] = useState("");
    // const [allMovies] = useState(storedMovies ? storedMovies : movies);
    // const [filteredMovies, setFilteredMovies] = useState([]);

    const getUser = (token) => {
        fetch(`https://myflix-20778.herokuapp.com/movies/profiles/${user.Username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => response.json())
            .then((response) => {
                setFavoriteMovie(response.FavoriteMovie)
            })
    }

    const FavoriteMovie = movies.filter((movie) => favoriteMovie.includes(movie._id));

    // Filter favorite movies for later display
    useEffect(() => {
        const newList = movies.filter((movie) => {
            const hasMovieId = favoriteMovie.some((m) => movie.id === m);
            if (hasMovieId) {
                return movie
            }
        })
        setFavoriteMovie(newList)
        getUser(token);
    }, [])


    return (
        <>
            <h4>Favorite Movies</h4>
            {favoriteMovie.length === 0 ?

                <span>No Movie Selected</span> : FavoriteMovie.map((movies) => (
                    <Col xs={12} md={6} lg={3} key={movies._id}>
                        <img src={movies.ImagePath} />
                        <Link to={'/movies/{movies._id}'}>
                            <h4>{movies.Title}</h4>
                        </Link>
                        <button variant="secondary" onClick={() => removeFavorite(movies._id)}>Remove from list</button>
                        <MovieCard movie={movies} />
                    </Col>
                ))
            }
        </>
    )
}
