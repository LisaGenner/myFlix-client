import { useParams } from 'react-router';
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap/Form";
import { Button } from "react-bootstrap/Button";
import { Container, Col, Row, Card } from "react-bootstrap";
import UserInfo from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovie } from "./favorite-movies";
import { Link } from "react-router-dom";



export const ProfileView = ({ user, movies, FavoriteMovies, removeMovie }) => {
    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");
        const [token] = useState(storedToken ? storedToken : null);

    // let FavoriteMovieList = movies.filter(movies => user.FavoriteMovies.includes(movies._id))

    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    //const [email, setEmail] = useState('');
    //const [birthday, setBirthday] = useState("");
    // const [favoriteMovie, setFavoriteMovies] = useState([]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        // const userData = {
        //     username: username,
        //     password: password,
        //     email: email,
        //     birthday: birthday,
        //     FavoriteMovie: FavoriteMovie
        // };


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

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        };
        console.log(data);
    };

    // useEffect(() => {
    //     getUser(token);
    // }, [])

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
                            <FavoriteMovie favoriteMoviesList={storedMovies} movies={storedMovies} storedUser={storedUser} removeMovie={removeMovie} />

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
// export { ProfileView };





