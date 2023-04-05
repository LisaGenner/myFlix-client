import React from "react";
import { useDispatch, useSelector } from "react";
import { Form } from "react-bootstrap";
import { setFilter } from "react";

export const MoviesFilter = () => {
    const filter = useSelector((state) => state.movies.filter)
    const dispatch = useDispatch();

    return (
        <Form.Control 
        type="text"
        placeholder="search"
        value={filter}
        onChange= { (e) => dispatch(setFilter(e.target.value))}
        />
    )

}