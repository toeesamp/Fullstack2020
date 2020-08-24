import React, { useState, useEffect } from 'react'
import { useLazyQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
    const [token, setToken] = useState(null)
    const [page, setPage] = useState('authors')
    const [getAuthors, authorsResult] = useLazyQuery(ALL_AUTHORS)
    const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
    const client = useApolloClient()

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
        // console.log(authorsResult)
    }, [authorsResult])

    useEffect(() => {
        console.log('booksResult', booksResult)
    }, [booksResult])

    const showAuthors = () => {
        setPage('authors')
        getAuthors()
    }

    const showBooks = () => {
        setPage('books')
        getBooks()
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('login')
    }

    return (
        <div>
            <div>
                <button onClick={() => showAuthors()}>authors</button>
                <button onClick={() => showBooks()}>books</button>
                {token && <button onClick={() => setPage('add')}>add book</button>}
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