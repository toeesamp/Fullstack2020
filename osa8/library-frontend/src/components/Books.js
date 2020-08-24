import React, { useState } from 'react'
const _ = require('lodash')

const Books = ({ show, books, genreSelectorHandler }) => {
    const [genre, setGenre] = useState(null)
    if (!show) {
        return null
    }
    console.log('books',books)

    // const genres = books.map(book => book.genres)
    const genres = _.uniq(_.flatten(_.map(books, 'genres')))
    // const uniqueGenres = _.uniq(genres)
    // const genres = _.uniq(_.map(books, 'genres'))
    console.log('genres',genres)
    // console.log('uniqueGenres',uniqueGenres)

    

    const filteredBooks = genre ? books.filter(book => book.genres.includes(genre)) : books

    console.log('filteredBooks', filteredBooks)

    const testi = (selectedGenre) => {
        console.log('testi', selectedGenre)
        console.log('genrestate', genre)
        // genreSelectorHandler(genre)
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
                <button key={genre} onClick={() => testi(genre)}>{genre}</button>
            )}
            <button onClick={() => testi(null)}>all genres</button>
        </div>
    )
}

export default Books



//book.genres.includes