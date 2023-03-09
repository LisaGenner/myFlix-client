//Here you import the proptypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


//The movieCard function component
export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                //<Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

//Here is where you define all the prop contraints for the moviecard

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    })
        .isRequired
};