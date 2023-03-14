import react from "react";

function UserInfo({ name, email }) {
    return (
        <>
            <h2>Your Info</h2>
            <p>Username: {name}</p>
            <p>email: {email}</p>
        </>
    )
}

export default UserInfo