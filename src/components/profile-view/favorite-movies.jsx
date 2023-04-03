import { PropTypes } from 'prop-types';
import { useState, useEffect } from "react";
import { Button, Col, Card, Link, Row, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileView } from "../profile-view/profile-view";
import { FavoriteMovie } from "./favorite-movies";
import { Link } from "react-router-dom";


export const FavoriteMovie = ({ movies, storedUser, favoriteMoviesList, removeMovie }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    // const storedUser = localStorage.getItem("user");
    const [token] = useState(storedToken ? storedToken : null);
    const [favoriteMovies, setFavoriteMovie] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);



    console.log(movies)
    console.log(favoriteMoviesList)
    console.log(user)

    useEffect(() =>
        async function () {
            const userJson = JSON.parse(storedUser);
            console.log('useEffect called', userJson["Username"])
            const response = await fetch(
                `https://myflix-20778.herokuapp.com/users/${userJson.Username}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log('response', response)

            const data = await response.json();

            setFavoriteMovie(data.FavoriteMovies);
        },
        []
    );

    let printFavoriteMovie;

    if (favoriteMovies.length === 0) {
        printFavoriteMovie = (
            <Col className="mt-4">You have not added any Favorite Movies yet.</Col>
        );
    } else {

        printFavoriteMovie = movies.filter((movie) => {
            return favoriteMovies.includes(movie.id);
        }).map(function (movie) {
            return (
                <Col xs={6} sm={4} md={2} lg={3} key={movie._id}>
                    <img src={movie.imagepath} />
                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                        <h4>{movie.Title}</h4>
                    </Link>
                    <Button variant="secondary" onClick={() => removeFav(movie._id)}>Remove from list</Button>
                </Col>

            );
        });
    }

    console.log('printFavoriteMovie', printFavoriteMovie)
    return <>{printFavoriteMovie}</>;
}

