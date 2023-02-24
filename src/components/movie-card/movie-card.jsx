//Here you import the proptypes library
import PropTypes from "prop-types";

//The movieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
    );
};

//Here is where you define all the prop contraints for the moviecard

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }),
    onMovieClick: PropTypes.func.isRequired
};

