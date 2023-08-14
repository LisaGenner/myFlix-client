import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";
import { HeartSwitch } from "@anatoliygatt/heart-switch";

export const MovieView = ({
  addMovie,
  movies,
  removeMovie,
  FavoriteMovies,
  handleFavorite,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [favoriteMovies, setFavoriteMovies] = useState(
    user.FavoriteMovies ? user.FavoriteMovies : []
  );

  //Checking if movie is already in user's favorite movies and setting Liked state, then handling heart switch toggle
  let isLiked = FavoriteMovies.includes(movieId);
  const handleToggle = function (isLiked, movieId) {
    if (!isLiked) {
      addMovie(movieId);
    } else if (isLiked) {
      removeMovie(movieId);
    }
  };

  return (
    <Row>
      <Col className="flex-column mb-4" xs={12} lg={8}>
        <Row>
          <Col>
            <h1>{movie.Title} </h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={2}>Director:</Col>
          <Col>{movie.Director.Name}</Col>
        </Row>
        <Row className="mt-2">
          <Col xs={2}>Genre:</Col>
          <Col>{movie.Genre.Name}</Col>
        </Row>
        <Row className="display-block mb-4 mt-4">
          <Col>{movie.Description}</Col>
        </Row>
        <Row className="mt-2">
          <Col xs={2}>Actors:</Col>
          <Col>{movie.Actors}</Col>
        </Row>
        <Row className="mt-auto">
          <Col>
            <HeartSwitch
              activeThumbColor="#ecfeff"
              activeTrackFillColor="#f7be16"
              activeTrackStrokeColor="#A78D5C"
              inactiveThumbColor="#ecfeff"
              inactiveTrackFillColor="#FFEECA"
              inactiveTrackStrokeColor="#A78D5C"
              checked={isLiked}
              onChange={function (event) {
                event.preventDefault();
                handleToggle(isLiked, movieId);
              }}
              size="md"
            />
          </Col>
          <Col>
            <div className="align-right">
              <Link to={`/`}>
                <Button className="back-button">Back</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Col>

      <Col className="mb-4" xs={12} lg={4}>
        <img src={movie.ImagePath} className="w-100" />
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  addMovie: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
  }).isRequired,
  removeMovie: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
