// import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    console.log(movies)
    return (
        <div>
            <div>
                <img className="w-100" src={movies.ImagePath} />
            </div>
            <div>
                <span>Title:</span>
                <span>{movies.Title} </span>
            </div>
            {/* <div>
                <span>Genre: </span>
                <span>{movies.Genre.Name}</span>
            </div> */}
            {/* <div>
                <span>Director: </span>
                <span>{movies.Director.Name}</span>
            </div>
            <div>
                <span>Actors:</span>
                <span>{movies.Actors}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{movies.Description.Name}</span>
            </div> */}

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>

        </div>
    );
};

// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         genre: PropTypes.string.isRequired,
//         director: PropTypes.string.isRequired
//     })
//     .isRequired
// };