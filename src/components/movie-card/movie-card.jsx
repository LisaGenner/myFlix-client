//Here you import the proptypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

//The movieCard function component
const MovieCard = ({ movie, isFavMovieCard, removeMovie }) => {
  return (
    <Card className="card h-100 movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title className="fs-6 fw-bolder">{movie.Title}</Card.Title>
        <Card.Text> Directed by: {movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">View Movie Info</Button>
        </Link>
        {isFavMovieCard ? (
          <div className="align-right">
            <Button
              className="btn-secondary"
              onClick={function (event) {
                event.preventDefault();
                removeMovie(movie._id);
              }}
              size="sm"
              variant="secondary"
            >
              Remove
            </Button>
          </div>
        ) : (
          false
        )}
      </Card.Body>
    </Card>
  );
};
export { MovieCard };

//Here is where you define all the prop contraints for the moviecard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Genre: PropTypes.string,
    Director: PropTypes.string,
    Actors: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
