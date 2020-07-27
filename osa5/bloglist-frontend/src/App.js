import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const newBlogFormRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = (blogObject) => {
        newBlogFormRef.current.toggleVisibility()
        console.log(newBlogFormRef)
        console.log(newBlogFormRef.current)
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                dispatch(setNotification(`blog added: ${returnedBlog.title}`, 'info', 5))
            })
            .catch(error => {
                dispatch(setNotification(`Error occurred while adding blog: ${error}`, 'error', 15))
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log('logging in with', username, password)
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            //console.log('user set as ', user)
            setUsername('')
            setPassword('')
            dispatch(setNotification('succesfully logged in', 'info', 5))
        } catch (exception) {
            dispatch(setNotification('wrong credentials', 'error', 5))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        dispatch(setNotification('logged out', 'info', 5))
    }

    const handleLike = async (blogToUpdate) => {
        try {
            blogToUpdate.likes++
            const result = await blogService.update(blogToUpdate.id, blogToUpdate)
            setBlogs(blogs.map(blog => blog.id !== result.id ? blog : blogToUpdate))
        } catch (e) {
            dispatch(setNotification(`Unable to update likes: ${e}`, 'error', 5))
        }
    }

    const handleDelete = async (blogToDelete) => {
        if (!window.confirm(`Delete ${blogToDelete.title}?`)) {
            return
        }
        try {
            await blogService.deleteBlog(blogToDelete.id)
            setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
            dispatch(setNotification(`Deleted ${blogToDelete.title}`, 'info', 5))
        } catch (e) {
            dispatch(setNotification(`Unable to delete ${blogToDelete.title}: ${e}`, 'error', 5))
        }
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
            <Notification  />

            {user === null ?
                loginForm() :
                <>
                    <h2>blogs</h2>
                    <p>Logged in as {user.username} <button onClick={handleLogout}>logout</button></p>
                    {blogsForm()}
                    {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
                        <Blog key={blog.id} blog={blog} likeHandler={() => handleLike(blog)}
                            deleteHandler={setDeleteHandler(blog)} />
                    )}
                </>
            }
        </div>
    )
}

export default App