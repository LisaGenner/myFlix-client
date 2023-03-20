import { useState, useEffect } from "react";
import { Button, Col, Card, Link } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export const FavoriteMovie = ({ storedUser, movies }) => {
    // const storedToken = localStorage.getItem("token");
    // const storedMovies = JSON.parse(localStorage.getItem("movies"))
    // const storedUser = localStorage.getItem("user");
    // const [token] = useState(storedToken ? storedToken : null);
    // const [favoriteMovie, setFavoriteMovie] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    // let favoriteMoviesList = movies.filter((m) =>
    //     user.FavoriteMovie.includes(m.id)
    // );
    function FavoriteMovie(favoriteMoviesList) {
        return (
            <>
                <Row>
                    <Col xs={2}>
                        <h4>Favorite Movies</h4>
                    </Col>
                </Row>
                <Row>
                    {favoriteMoviesList.map((movie) => {
                        return (
                            <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
                                <img src={movies.ImagePath} />
                                <Link to={'/movies/{movies._id}'}>
                                    <h4>{movie.Title}</h4>
                                </Link>
                                <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
                            </Col>
                        )
                    })
                    }

                </Row >
            </>

        );
    }
}
export default FavoriteMovie




