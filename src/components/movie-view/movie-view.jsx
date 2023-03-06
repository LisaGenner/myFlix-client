import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} />
            </div>
            <div>
                <span>Title:</span>
                <span>{movie.Title} </span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Actors:</span>
                <span>{movie.Actors}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{movie.Description.Name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};