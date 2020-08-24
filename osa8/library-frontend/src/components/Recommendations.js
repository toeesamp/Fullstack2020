import React from 'react'

const Recommendations = ({ show, books, user }) => {
    if (!show) {
        return null
    }

    const filteredBooks = books.filter(book => book.genres.includes(user.me.favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{user.me.favoriteGenre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {filteredBooks.map(book => 
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations