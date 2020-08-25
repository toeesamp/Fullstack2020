import React, { useState } from 'react'
const _ = require('lodash')

const Books = ({ show, books }) => {
    const [genre, setGenre] = useState(null)
    if (!show) {
        return null
    }
    const genres = _.uniq(_.flatten(_.map(books, 'genres')))
    const filteredBooks = genre ? books.filter(book => book.genres.includes(genre)) : books

    const selectGenre = (selectedGenre) => {
        setGenre(selectedGenre)
    }
    return (
        <div>
            <h2>books</h2>
            {genre && <p>in genre <b>{genre}</b></p>}
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
            {genres.map(genre =>
                <button key={genre} onClick={() => selectGenre(genre)}>{genre}</button>
            )}
            <button onClick={() => selectGenre(null)}>all genres</button>
        </div>
    )
}

export default Books



//book.genres.includes