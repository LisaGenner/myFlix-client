import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import { FavoriteMovie } from "./favorite-movies";
import UserInfo from "./user-info";

export const ProfileView = ({ user, movies, removeMovie }) => {
    const [favoriteMovies, setFavoriteMovies] = useState(
        user.FavoriteMovies || []
    );

    useEffect(() => {
        localStorage.setItem(
            "user",
            JSON.stringify({ ...user, FavoriteMovies: favoriteMovies })
        );
    }, [favoriteMovies, user]);

    const handleFavoriteMovieChange = (newFavorites) => {
        setFavoriteMovies(newFavorites);
    };

    movies = movies || [];
    console.log("userPV: ", user);
    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <UserInfo username={user.Username} email={user.Email} />
                            <div className="align-center mt-auto"></div>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <UpdateUser user={user.Username} />
                            <div className="align-right mt-auto"></div>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <h3>Favorite Movies:</h3>

                            <FavoriteMovie
                                movies={movies}
                                user={user}
                                favoriteMoviesList={favoriteMovies}
                                removeMovie={removeMovie}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}


