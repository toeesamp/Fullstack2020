import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

const App = () => {
    const [token, setToken] = useState(null)
    const [page, setPage] = useState('authors')
    // const [genreQuery, setGenreQuery] = useState(ALL_BOOKS)
    const [getAuthors, authorsResult] = useLazyQuery(ALL_AUTHORS)
    // const [getBooks, booksResult] = useLazyQuery(genreQuery)
    const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
    const [getUser, userResult] = useLazyQuery(ME)
    const client = useApolloClient()
    // const user = useQuery(ME)


    useEffect(() => {
        const token = localStorage.getItem('library-user-token')
        if (token) {
            setToken(token)
        }
    }, [])

    useEffect(() => {
        getAuthors()
    }, [getAuthors])

    useEffect(() => {
        console.log('authorsResult', authorsResult)
    }, [authorsResult])

    useEffect(() => {
        console.log('booksResult', booksResult)
    }, [booksResult])

    useEffect(() => {
        console.log('userResult', userResult)
    }, [userResult])

    const showAuthors = () => {
        setPage('authors')
        getAuthors()
    }

    const showBooks = () => {
        setPage('books')
        getBooks()
    }

    const showRecommended = () => {
        setPage('recommended')
        getBooks()
        getUser()
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('login')
    }

    const getBooksWithGenre = (genre) => {

    }

    return (
        <div>
            <div>
                <button onClick={() => showAuthors()}>authors</button>
                <button onClick={() => showBooks()}>books</button>
                {token && <button onClick={() => setPage('add')}>add book</button>}
                {/* {token && <button onClick={() => setPage('recommended')}>recommended</button>} */}
                {token && <button onClick={() => showRecommended()}>recommended</button>}
                {token && <button onClick={logout} >logout</button>}
                {!token && <button onClick={() => setPage('login')}>login</button>}

            </div>
            {authorsResult.data &&
                <Authors
                    show={page === 'authors'}
                    authors={authorsResult.data.allAuthors}
                    token={token}
                />
            }

            {booksResult.data &&
                <Books
                    show={page === 'books'}
                    books={booksResult.data.allBooks}
                    genreSelectorHandler={() => getBooksWithGenre()}
                />
            }
            {/* {booksResult.data && user.data && */}
            {booksResult.data && userResult.data &&
                <Recommendations
                    show={page === 'recommended'}
                    books={booksResult.data.allBooks}
                    user={userResult.data}
                />
            }
            <NewBook
                show={page === 'add'}
            />
            <div>
                <LoginForm
                    show={page === 'login'}
                    setToken={setToken}
                    redirect={() => showAuthors()}
                />
            </div>
        </div>
    )
}

export default App