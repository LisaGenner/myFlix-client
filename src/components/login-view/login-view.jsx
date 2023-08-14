import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { ButtonSpinner } from "../button-spinner/button-spinner.jsx";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    setLoading(true);

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myflix-20778.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }) // Extracts JWT from response content in JSON format
      .then(function (response) {
        setLoading(false);
        return response.json();
      })
      .then(function (data) {
        if (data.message === "Incorrect username.") {
          throw new Error(
            "No account with that username. Please try again or sign up with a new account."
          );
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <Card className="card mb-4">
      <Card.Body>
        <Card.Title className="mb-4">Login</Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="align-right mt-3">
            {loading ? (
              <Button
                className="spinner-button"
                type="button"
                variant="primary"
              >
                <ButtonSpinner />
              </Button>
            ) : (
              <Button
                className="spinner-button"
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            )}
          </div>
        </Form>
        <Link to="/signup">Not registered yet? Sign up here.</Link>
      </Card.Body>
    </Card>
  );
};
