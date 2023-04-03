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
import { BrowserRouter, Routes, Route, Navigate, Container } from "react-router-dom";
import { toast } from 'react-toastify';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [userQuery, setUserQuery] = useState('');
    console.log(user)

    const showSpinner = function () {
        return (
            <Col className="spinner-wrapper">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        );
    };

    // Logic to render filteredMovies list
    const onSearch = function (searchInput) {
        setUserQuery(searchInput);
    };


    useEffect(
        function () {
            if (!userQuery) {
                setFilteredMovies([]);
            } else {
                let searchResult = movies.filter(function (movie) {
                    const movieLowerCase = movie.Title.toLowerCase();
                    const directorLowerCase = movie.Director.Name.toLowerCase();
                    const genreLowerCase = movie.Genre.Name.toLowerCase();
                    const userQueryLowerCase = userQuery.toLowerCase();

                    return (
                        movieLowerCase.includes(userQueryLowerCase) ||
                        directorLowerCase.includes(userQueryLowerCase) ||
                        genreLowerCase.includes(userQueryLowerCase)
                    );
                });
                setFilteredMovies(searchResult);
            }
        },
        [movies, userQuery]
    );

    // Logic to manage FavoriteMovies list (needed in both ProfileView and MovieCard)
    const addMovie = function (movieId) {
        fetch(
            // http://localhost:5500/users/Brandy/movies/63d00c368356c90ea919014f
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
        fetch(
            `myflix-20778.herokuapp.com/movies/users/${user.Username}/movies/${movieId}`,
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

                const moviesFromApi = data.map((doc) => {
                    const actors = doc.Actors
                    return {
                        id: doc._id,
                        title: doc.Title,
                        imagepath: doc.ImagePath,
                        director: doc.Director.Name,
                        actors: actors,
                        genre: doc.genre
                    };
                });

                setMovies(data);
                localStorage.setItem("movies", JSON.stringify(moviesFromApi))
            });

    }, [token]);

    // Handle changes in the search input field
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
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
            />
            <Row className="justify-content-md-center">
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
                                        {movies.map((movie) => (
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
