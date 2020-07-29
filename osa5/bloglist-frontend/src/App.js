import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const newBlogFormRef = useRef()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }, [dispatch])

    const addBlog = (blogObject) => {
        newBlogFormRef.current.toggleVisibility()
        dispatch(createBlog(blogObject))
            .then(dispatch(setNotification(`blog added: ${blogObject.title}`, 'info', 5)))
            .catch(error => {
                dispatch(setNotification(`Error occurred while adding blog: ${error}`, 'error', 15))
            })
    }

    const handleLogin = (event) => {
        event.preventDefault()
        //try {
        dispatch(login(username, password))
            .then(
                dispatch(setNotification('succesfully logged in', 'info', 5))
            )
            .catch(error => {
                console.log(error.response.data.error)
                dispatch(setNotification(`error logging in ${error}`, 'error', 5))
            })
        setUsername('')
        setPassword('')
        //    dispatch(setNotification('succesfully logged in', 'info', 5))
        //} catch (exception) {
        //    dispatch(setNotification('wrong credentials', 'error', 5))
        //}
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        //setUser(null)'
        dispatch(logout())
        dispatch(setNotification('logged out', 'info', 5))
    }

    const handleLike = (id) => {
        const blogToLike = blogs.find(blog => blog.id === id)
        dispatch(likeBlog(blogToLike))
        dispatch(setNotification(`you liked '${blogToLike.title}'`, 'info', 5))
    }

    const handleDelete = (blogToDelete) => {
        dispatch(deleteBlog(blogToDelete.id))
            .then(dispatch(setNotification(`Deleted ${blogToDelete.title}`, 'info', 5)))
            .catch(e => {
                dispatch(setNotification(`Unable to delete ${blogToDelete.title}: ${e}`, 'error', 5))
            })
    }

    const setDeleteHandler = (blog) => {
        if (blog.user.username !== user.username) {
            return null
        }
        return () => handleDelete(blog)
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>Log in to application</h2>
            <div>
                username
                <input
                    id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    )

    const blogsForm = () => (
        <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
            <NewBlogForm
                createBlog={addBlog}
            />
        </Togglable>
    )

    return (
        <div>
            <Notification />

            {user === null ?
                loginForm() :
                <>
                    <h2>blogs</h2>
                    <p>Logged in as {user.username} <button onClick={handleLogout}>logout</button></p>
                    {blogsForm()}
                    {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
                        <Blog key={blog.id} blog={blog} likeHandler={() => handleLike(blog.id)}
                            deleteHandler={setDeleteHandler(blog)} />
                    )}
                </>
            }
        </div>
    )
}

export default App