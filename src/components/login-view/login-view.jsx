import React from "react";

export const LoginView = () => {
    const handleSubmit = (event) => {
        //this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
        const data = {
            access: username,
            password: password
        };
        fetch("https://myflix-20778.herokuapp.com/movies", {
            method: "POST",
            body: JSON.stringify(data)
        });
    };

    return (
        <form on Submit={handleSubmit}>
            <label>
                Username:
                <input type="text" />
            </label>
            <label>
                Password:
                <input type="password" />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    );
};