import React from 'react'
import User from './User'

const Users = ({ users }) => {

    return (
        <>
            <h2>users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map(user =>
                            <User key={user.id} user={user} />
                        )}
                </tbody>
            </table>
        </>
    )
}

export default Users
