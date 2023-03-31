
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import "./movie-view.scss";

export const MovieView = ({ movies, isFavorite, handleFavorite }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);
    // console.log(movies)
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies ? user.FavoriteMovies : []);
    const [isFavorite, setIsFavorite] = useState(false);

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

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
            {/* added favorite button 3/31 */}
            {!isFavorite ? (
                <Button
                    className="my-4 ml-2"
                    variant="outline-primary"
                    onClick={() => handleFavorite(movie._id, "add")}
                >
                    Add to favorite movies
                </Button>
            ) : (
                <Button
                    className="my-4 ml-2"
                    variant="outline-primary"
                    onClick={() => handleFavorite(movie._id, "add")}
                >
                    Added to your favorite movie list
                </Button>
            )}
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired
    })
        .isRequired
};