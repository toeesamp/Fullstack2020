import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
    const [page, setPage] = useState('authors')
    const [getAuthors, authorsResult] = useLazyQuery(ALL_AUTHORS)
    const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        getAuthors()
    }, [getAuthors])

    useEffect(() => {
        console.log('authorsResult',authorsResult)
        // console.log(authorsResult)
    }, [authorsResult])

    useEffect(() => {
        console.log(booksResult)
    }, [booksResult])

    const showAuthors = () => {
        setPage('authors')
        getAuthors()
    }

    const showBooks = () => {
        setPage('books')
        getBooks()
    }

    return (
        <div>
            <div>
                <button onClick={() => showAuthors()}>authors</button>
                <button onClick={() => showBooks()}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>
            {authorsResult.data &&
                <Authors
                    show={page === 'authors'}
                    authors={authorsResult.data.allAuthors}
                />
            }

            {booksResult.data &&
                <Books
                    show={page === 'books'}
                    books={booksResult.data.allBooks}
                />
            }
            <NewBook
                show={page === 'add'}
            />

        </div>
    )
}

export default App