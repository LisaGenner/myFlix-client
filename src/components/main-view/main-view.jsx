import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    if (!user) {
        return (
            <LoginView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
        );
    }

    useEffect(() => {
        if (!token) return;
        fetch("https://myflix-20778.herokuapp.com/movies", {
            headers: { Authorization: `Bearer $ ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    const moviesFromApi = data.map((doc) => {
        const actors = doc.Actors
        return {
            id: doc._id,
            title: doc.Title,
            imagepath: doc.ImagePath,
            director: doc.Director.Name,
            actors: actors
        };
    });

    setMovies(data);
    // console.log(movieFromApi)


    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView
                        style={{ border: "1px solid green" }}
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}

                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" id={movie._id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};
