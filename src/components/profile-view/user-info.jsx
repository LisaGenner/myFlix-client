import react from "react";
import { Container, Col, Row, Card } from "react-bootstrap";

function UserInfo({ username, email }) {
    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <div>
                                <h4>Your Info</h4>
                                <p>Name: <span className='fw-bolder'> {username}</span></p>
                                <p>Email: <span className='fw-bolder'>{email}</span></p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UserInfo;
