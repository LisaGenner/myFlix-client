import { useState, useEffect } from "react";
import { Button, Col, Card, Link } from "react-bootstrap";
import { ProfileView } from "../profile-view/profile-view";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ user, movies }) => {
    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");

    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const [allMovies] = useState(storedMovies ? storedMovies : movies);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const getUser = (token) => {
        fetch(`https://myflix-20778.herokuapp.com/movies/profiles/${user.Username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => response.json())
            .then((response) => {
                console.log("getUser response", response)
                setUsername(response.Username);
                setEmail(response.Email);
                setPassword(response.Password);
                setBirthday(response.Birthday);
                setFavoriteMovies(response.FavoriteMovies)
            })
    }
    console.log("user.FavoriteMovies", favoriteMovies)

    const favMovies = movies.filter((movie) => favoriteMovies.includes(movie.id));

    console.log("favoriteMovies", favoriteMovies)

    //Filter favorite movies for later display
    useEffect(() => {
        const newList = allMovies.filter((movie) => {
            const hasMovieId = favoriteMovies.some((m) => movie.id === m);
            if (hasMovieId) {
                return movie
            }
        })
        setFavoriteMovies(newList)
        getUser(token);
    }, [])


    return (
        <>
            <Row>
                <Col xs={12}>
                    <h4>Favorite Movies</h4>
                </Col>
            </Row>
            <Row>
                {favoriteMovies.map((movies) => {
                    return (
                        <Col xs={12} md={6} lg={3} key={movies._id}>
                            <img src={movies.ImagePath} />
                            <Link to={'/movies/${movies._id}'}>
                                <h4>{movies.Title}</h4>
                            </Link>
                            <button variant="secondary" onClick={() => removeFavorite(movies._id)}>Remove from list</button>
                        </Col>
                    )
                })
                }
            </Row>
        </>
    )
}





export default FavoriteMovies