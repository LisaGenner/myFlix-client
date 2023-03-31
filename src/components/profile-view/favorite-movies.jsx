import { PropTypes } from 'prop-types';
import { useState, useEffect } from "react";
import { Button, Col, Card, Link, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileView } from "../profile-view/profile-view";
import { Link } from "react-router-dom";

export const FavoriteMovie = ({ storedUser, favoriteMoviesList }) => {
    // const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    // // const storedUser = localStorage.getItem("user");
    // const [token] = useState(storedToken ? storedToken : null);
    const [favoriteMovie, setFavoriteMovie] = useState([]);
    // const [user, setUser] = useState(storedUser ? storedUser : null);

    // const [allMovies] = useState(storedMovies ? storedMovies : movies);
    // const [filteredMovies, setFilteredMovies] = useState([]);

    console.log(favoriteMoviesList)


    function FavoriteMovie({ movies }) {
        let favoriteMoviesList = movies.filter((movie) =>
            user.FavoriteMovie.includes(movie._id)
        );

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={12}>
                                <h4>Favorite Movies</h4>
                            </Col>
                        </Row>
                        <Row>
                            {favoriteMoviesList.map(({ movie }) => {
                                return (
                                    <Col xs={6} sm={4} md={2} lg={3} key={movie._id}>
                                        <img src={movie.ImagePath} />
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
            </Container>
        )
    }

    //export FavoriteMovie

    FavoriteMovie.propTypes = {
        movie: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Title: PropTypes.string,
            Genre: PropTypes.string,
            Director: PropTypes.string,
            Actors: PropTypes.string,
            Description: PropTypes.string,
            ImagePath: PropTypes.string.isRequired,
            FavoriteMovie: PropTypes.string.isRequired,
        })
            .isRequired
    };

}
