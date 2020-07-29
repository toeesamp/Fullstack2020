import React from 'react'
const User = ({ user }) => {

    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

export default User
