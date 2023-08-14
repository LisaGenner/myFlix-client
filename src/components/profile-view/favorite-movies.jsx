import React from "react";
import { Card, ListGroup } from "react-bootstrap";

//Favorite movie logic
export const FavoriteMovie = ({
  movies,
  user,
  favoriteMoviesList,
  removeMovie,
}) => {
  const favoriteMovies = movies.filter((m) =>
    favoriteMoviesList.includes(m._id)
  );

  return (
    <ListGroup>
      {favoriteMovies.map((m) => (
        <ListGroup.Item
          key={m._id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <img src={m.ImagePath} />
          </div>
          <div>
            <button onClick={() => removeMovie(m._id)}>Remove</button>
          </div>
        </ListGroup.Item>
      ))}
      {favoriteMovies.length === 0 && (
        <Card.Text>No favorite movies selected yet.</Card.Text>
      )}
    </ListGroup>
  );
};
