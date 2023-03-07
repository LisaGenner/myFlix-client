// import PropTypes from "prop-types";
// import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImagePath} />
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
            <button onClick={onBackClick} className="back-button"
                style={{ cursor: "pointer" }}
            >
                Back
            </button>
        </div>
    );
};

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         director: PropTypes.string.isRequired
//     }).isRequired,
//     onBackClick: PropTypes.func.isRequired
// };