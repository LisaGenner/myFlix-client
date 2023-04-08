import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Spinner from 'react-bootstrap/Spinner';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate, Container, Form } from "react-router-dom";
import { toast } from 'react-toastify';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [userQuery, setUserQuery] = useState('');
    const showSpinner = function () {
        return (
            <Col className="spinner-wrapper">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        );
    };

    // Logic to manage FavoriteMovies list (needed in both ProfileView and MovieCard)
    const addMovie = function (movieId) {
        fetch(
            `https://myflix-20778.herokuapp.com/users/${user.Username}/movies/${movieId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(function (response) {
                if (response.status === 401) {
                    throw new Error(
                        "Sorry, you're not authorized to access this resource. "
                    );
                } else if (response.status === 409) {
                    throw new Error('You already added this movie to the list.');
                } else if (response.ok) {
                    return response.json();
                }
            })
            .then(function (updatedUser) {
                toast.success('Movie has been added to your Favorite Movies.');
                setUser(updatedUser);
            })
            .catch(function (error) {
                if (error.message) {
                    toast.error(error.message);
                } else {
                    toast.error(
                        'An error occurred while trying to add movie. Please try again later.'
                    );
                }
                console.error('An error occurred:' + error);
            });
    };
    const removeMovie = function (movieId) {
        console.log(movieId)
        fetch(
            `https://myflix-20778.herokuapp.com/users/${user.Username}/movies/${movieId}`,

            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(function (response) {
                if (response.status === 401) {
                    throw new Error(
                        "Sorry, you're not authorized to access this resource. "
                    );
                } else if (response.ok) {
                    return response.json();
                }
            })
            .then(function (updatedUser) {
                toast.success('Movie has been removed from your Favorite Movies.');
                setUser(updatedUser);
            })
            .catch(function (error) {
                if (error.message) {
                    toast.error(error.message);
                } else {
                    toast.error(
                        'An error occurred while trying to delete. Please try again later.'
                    );
                }
                console.error('An error occurred:' + error);
            });
    };
    // To be run whenever user logs out (or is logged out)
    const onLoggedOut = function () {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    useEffect(() => {
        if (!token) {
            return;
        }
        setLoading(true);

        fetch("https://myflix-20778.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())


            .then((data) => {
                setMovies(data);
            });
    }, [token]);

    useEffect(() => {
        setFilteredMovies(movies)
    }, [movies])

    // Handle changes in the search input field
    const handleSearchInput = (e) => {
        const searchWord = e.target.value.toLowerCase();
        let tempArray = movies.filter(m => m.Title.toLowerCase().includes(searchWord))
        setFilteredMovies(tempArray)
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                handleSearchInput={handleSearchInput}
            />
            <Row className="justify-content-md-center mt-5 main-body-container">
                <Routes>
                    <Route
                        path='/signup'
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        < SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path='/login'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <>{showSpinner()}</>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            addMovie={addMovie}
                                            movies={movies}
                                            removeMovie={removeMovie}
                                            username={user.Username}
                                            FavoriteMovies={user.FavoriteMovies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            onLoggedOut={onLoggedOut}
                                            removeMovie={removeMovie}
                                            setUser={setUser}
                                            token={token} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <div>The list is empty!</div>
                                ) : (
                                    <>
                                        {filteredMovies.map((movie) => (
                                            <Col className="mb-5" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
