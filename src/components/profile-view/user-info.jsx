import react from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function UserInfo({ username, email }) {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h4>Your Information</h4>
                <p>
                  Name: <span className="fw-bolder"> {username}</span>
                </p>
                <p>
                  Email: <span className="fw-bolder">{email}</span>
                </p>
                <Button
                  onClick={() => handleDeregister(user._id)}
                  className="button-delete mt-3"
                  type="submit"
                  variant="danger"
                >
                  Delete Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInfo;
