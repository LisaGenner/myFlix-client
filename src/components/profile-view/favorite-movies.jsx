import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export const FavoriteMovie = ({
    movies,
    user,
    favoriteMoviesList,
    removeMovie,
}) => {
    const favoriteMovies = movies.filter((m) =>
        favoriteMoviesList.includes(m._id)
    );
    //     console.log(movies)
    console.log(favoriteMovies)
    //     console.log(user)

    return (
        <ListGroup>
            {favoriteMovies.map((m) => (
                <ListGroup.Item
                    key={m._id}
                    className="d-flex justify-content-between align-items-center"
                >
                    <div>
                        {/* {m.Title} */}
                        <img src={m.ImagePath} />
                        {/* <Link to={`/movies/${encodeURIComponent(m._id)}`}> */}
                    </div>
                    <div>
                        <button onClick={() => removeMovie(m._id)}>
                            Remove
                        </button>
                    </div>
                </ListGroup.Item>
            ))}
            {favoriteMovies.length === 0 && (
                <Card.Text>No favorite movies selected yet.</Card.Text>
            )}
        </ListGroup>
    );
};

// import { PropTypes } from 'prop-types';
// import { useState, useEffect } from "react";
// import { Button, Col, Card, Link, Row, Container } from "react-bootstrap";
// import { MovieCard } from "../movie-card/movie-card";
// import { ProfileView } from "../profile-view/profile-view";
// import { FavoriteMovie } from "./favorite-movies";
// import { Link } from "react-router-dom";
