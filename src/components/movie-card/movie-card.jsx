//Here you import the proptypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";



//The movieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director}</Card.Text>
          <Button onClick={() => 
                onMovieClick(movie)} variant="link">
                Open
                </Button>
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
    }),
    onMovieClick: PropTypes.func.isRequired
};