import { PropTypes } from 'prop-types';
import { useState, useEffect } from "react";
import { Button, Col, Card, Link, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export const FavoriteMovie = ({ storedUser, favoriteMoviesList }) => {
    // const storedToken = localStorage.getItem("token");
    // const storedMovies = JSON.parse(localStorage.getItem("movies"))
    // // const storedUser = localStorage.getItem("user");
    // const [token] = useState(storedToken ? storedToken : null);
    // const [favoriteMovie, setFavoriteMovie] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);

    // const [allMovies] = useState(storedMovies ? storedMovies : movies);
    // const [filteredMovies, setFilteredMovies] = useState([]);

    // let favoriteMoviesList = movies.filter((movie) =>
    //     user.FavoriteMovie.includes(movie._id)
    // );


    function FavoriteMovie(favoriteMoviesList) {
        console.log(favoriteMoviesList)
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <h4>Favorite Movies</h4>
                        </Col>
                    </Row>
                    <Row>
                        {favoriteMoviesList.map(({ movie, ImagePath, Title }) => {
                            return (
                                <Col xs={6} sm={4} md={2} lg={3} key={movie._id} className="fav-movie">
                                    <img src={movie.imagepath} />
                                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                                        <h4>{movie.Title}</h4>
                                    </Link>
                                    <Button variant="secondary" onClick={() => removeFav(movie._id)}>Remove from list</Button>
                                </Col>
                            )
                        })
                        }
                    </Row >
                </Card.Body>
            </Card>
        )
    }

    //export default FavoriteMovie

    // FavoriteMovie.propTypes = {
    //     movie: PropTypes.shape({
    //         Title: PropTypes.string,
    //         Genre: PropTypes.string,
    //         Director: PropTypes.string,
    //         Actors: PropTypes.string,
    //         Description: PropTypes.string,
    //         ImagePath: PropTypes.string.isRequired,
    //     })
    //         .isRequired
    // };

}
