import { useParams } from 'react-router';
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap/Form";
import { Button } from "react-bootstrap/Button";
import { Container, Col, Row, Card } from "react-bootstrap";
import UserInfo from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovie } from "./favorite-movies";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");


    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");
    // const [FavMovie, setFavMovie] = useState([]);

    const handleUpdate = async (event) => {
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

    {/* <div> UserInfo name={user.Username} email={user.Email}/> </div> */ }
    return (

        <Container>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <div>
                                <h4>User Details</h4>
                                <Col> <span>Username: {username}</span>
                                    <span className='fw-bolder'>{user.Username}</span>
                                </Col>
                                <Col> <span>Email: {email}</span>
                                    <span className='fw-bolder'>{user.Email}</span>
                                </Col>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col >
                    <Card>
                        <Card.Body>
                            <UpdateUser user={user} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        {/* <Card.Body><FavoriteMovie /></Card.Body> */}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
