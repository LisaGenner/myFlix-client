//Here you import the proptypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


//The movieCard function component
const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text> Directed by: {movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">More Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}
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
    })
        .isRequired
};
