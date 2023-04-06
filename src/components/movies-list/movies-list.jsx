import React from "react";
import { useSelector } from "react-redux";
import { MoviesFilter } from "../moviesFilter/movies-filter";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap";

export const MovieList = () => {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) => state.movies.filter).trim().toLowerCase()

    const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(filter)
    )

    return (
        <>
            <Row>
                <MoviesFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col> couldn't find that movie</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movies._id} md={3}>
                            <MovieCard movies={movies} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    )
}
