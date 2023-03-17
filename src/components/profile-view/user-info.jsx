import react from "react";

function UserInfo({ name, email }) {
    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <div>
                                <h4>User Details</h4>
                                <p>Username: {username}</p>
                                <p>Email: {email}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}




export default UserInfo