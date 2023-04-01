import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import "./movie-view.scss";
import { HeartSwitch } from '@anatoliygatt/heart-switch';

export const MovieView = ({ addMovie, movies, removeMovie, FavoriteMovies, handleFavorite }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);
    // console.log(movies)
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies ? user.FavoriteMovies : []);

    console.log(FavoriteMovies)

    //Checking if movie is already in user's top movies and setting Liked state, then handling heart switch toggle
    let isLiked = FavoriteMovies.includes(movieId);
    const handleToggle = function (isLiked, movieId) {
        if (!isLiked) {
            addMovie(movieId);
        } else if (isLiked) {
            removeMovie(movieId);
        }
    };

    return (
        <div>
            <div>
                <img className="w-50" src={movie.ImagePath} />
            </div>
            <div>
                <span>Title:</span>
                <span>{movie.Title} </span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Actors:</span>
                <span>{movie.Actors}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{movie.Description.Name}</span>
            </div>
            <div>
                <HeartSwitch
                    activeThumbColor="#ecfeff"
                    activeTrackFillColor="#f7be16"
                    activeTrackStrokeColor="#A78D5C"
                    inactiveThumbColor="#ecfeff"
                    inactiveTrackFillColor="#FFEECA"
                    inactiveTrackStrokeColor="#A78D5C"
                    //checked={isLiked}
                    onChange={function (event) {
                        event.preventDefault();
                        handleToggle(isLiked, movieId);
                    }}
                    size="md"
                />
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>

        </div>
    );
};

// MovieView.propTypes = {
//     addMovie: PropTypes.func.isRequired,
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         ImagePath: PropTypes.string.isRequired,
//         Genre: PropTypes.string.isRequired,
//         Director: PropTypes.string.isRequired
//     })
//         .isRequired,
//     removeMovie: PropTypes.func.isRequired,
//     favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
// };
