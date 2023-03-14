import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Col, Row, Card } from "react-bootstrap";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";
import FavoriteMovies from "./favorite-movies";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, movies }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const ProfileView = ({ user, favoriteMovies, toggleFavorite, token }) => {
        const [updateUser, setUpdateUser] = useState(false);
        const [username, setUsername] = useState(user.username);
        const [password, setPassword] = useState(user.password);
        const [email, setEmail] = useState(user.email);
        const [birthday, setBirthday] = useState(user.birthday);
        const handleUpdate = async () => {
            event.preventDefault();

            const userData = {
                username: username,
                password: password,
                email: email,
                birthday: birthday,
            };

            const response = await fetch(
                `https://myflix-20778.herokuapp.com/movies${user.username}`,
                {
                    method: "PUT",
                    body: JSON.stringify(userData),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { success, message, data } = await response.json();
            if (success) {
                alert(message);
                window.location.reload();
            } else {
                alert("Update failed");
            }
        };

        const handleDeleteUser = () => { };
        const handleToggle = (movie) => {
            toggleFavorite(movie);
        };

        const formatDate = (birthday) => {
            const date = new Date(birthday);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}-${month}-${day}`;
        };

        return (
            <React.Fragment>
                <div className="min-vh-100">

                    {!updateUser ? (
                        <Row className="d-flex justify-content-center p-4">
                            <Col sm={8} md={6} lg={5} xl={4} xxl={3}>
                                <Card
                                    style={{ minWidth: "20rem", maxWidth: "40rem" }}
                                    className="shadow-lg p-3 rounded-4 text-center"
                                    text="secondary"
                                >
                                    <Card.Img
                                        variant="top"
                                        src={avatar}
                                        className="rounded-0"
                                        height={100}
                                    />
                                    <Card.Body>
                                        <Card.Title>Profile Information</Card.Title>
                                        <Card.Text></Card.Text>
                                    </Card.Body>
                                    <ListGroup className="text-start">
                                        <ListGroup.Item className="text-bg-dark">
                                            Username: {user.username}
                                        </ListGroup.Item>
                                        <ListGroup.Item className="text-bg-dark">
                                            Password: **********
                                        </ListGroup.Item>
                                        <ListGroup.Item className="text-bg-dark">
                                            Email: {user.email}
                                        </ListGroup.Item>
                                        <ListGroup.Item className="text-bg-dark">
                                            Birthday: {formatDate(user.birthday)}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <div className="text-center">
                                            <Button
                                                variant="primary"
                                                onClick={() => setUpdateUser(true)}
                                            >
                                                EDIT
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Row className="d-flex justify-content-center p-4">
                            <Col sm={8} md={6} lg={5} xl={4} xxl={3}>
                                <Card
                                    style={{ minWidth: "20rem", maxWidth: "40rem" }}
                                    className="shadow-lg p-3 rounded-4 text-center"
                                    text="secondary"
                                >
                                    <Card.Img
                                        variant="top"
                                        src={avatar}
                                        className="rounded-0"
                                        height={100}
                                    />
                                    <Card.Body>
                                        <Card.Title>Profile Information</Card.Title>
                                        <Card.Text></Card.Text>
                                        <Form onSubmit={handleUpdate} className="w-100">
                                            <Form.Group controlId="formUsername" className="mb-4">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Username"
                                                    defaultValue={user.username}
                                                    onChange={(event) => setUsername(event.target.value)}
                                                    autoComplete="username"
                                                    minLength="3"
                                                    maxLength="30"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formPassword" className="mb-4">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    defaultValue={user.password}
                                                    onChange={(event) => setPassword(event.target.value)}
                                                    autoComplete="current-password"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formEmail" className="mb-4">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email"
                                                    defaultValue={user.email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    autoComplete="email"
                                                    required
                                                />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBirthday" className="mb-4">
                                                <Form.Control
                                                    type="date"
                                                    placeholder="Birthday"
                                                    onChange={(event) => setBirthday(event.target.value)}
                                                    autoComplete="date"
                                                    required
                                                />
                                            </Form.Group>
                                            <div className="d-flex justify-content-around">
                                                <Button variant="primary" type="submit">
                                                    SAVE
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleDeleteUser()}
                                                >
                                                    DELETE
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => setUpdateUser(false)}
                                                >
                                                    CANCEL
                                                </Button>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                    <Row className="justify-content-center py-5">
                        <h2 className="text-center mb-5">Favorite Movies</h2>
                        {favoriteMovies.length ? (
                            favoriteMovies.map((movie) => (
                                <MovieCard
                                    movie={movie}
                                    isFavorite="true"
                                    toggleFavorite={handleToggle}
                                    key={movie.id}
                                />
                            ))
                        ) : (
                            <p>No favorite movies</p>
                        )}
                    </Row>
                </div>
            </React.Fragment>
        );
    };
}
