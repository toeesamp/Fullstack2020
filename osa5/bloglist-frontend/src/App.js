import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const newBlogFormRef = useRef()

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

    const notificationHelper = (notificationMessage, notificationType, timeout) => {
        setNotification({ message: notificationMessage, type: notificationType })
        setTimeout(() => {
            setNotification(null)
        }, timeout)
    }

    const addBlog = (blogObject) => {
        newBlogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                notificationHelper(`blog added: ${returnedBlog.title}`, 'info', 5000)
            })
            .catch(error => {
                notificationHelper(`Error occurred while adding blog: ${error}`, 'error', 15000)
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            console.log('user set as ', user)
            setUsername('')
            setPassword('')
            notificationHelper('succesfully logged in', 'info', 5000)
        } catch (exception) {
            notificationHelper('wrong credentials', 'error', 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        notificationHelper('logged out', 'info', 5000)
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>Log in to application</h2>
            <div>
                username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
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
            {notification === null ?
                null :
                <Notification message={notification.message} type={notification.type} />
            }

            {user === null ?
                loginForm() :
                <>
                    <h2>blogs</h2>
                    <p>Logged in as {user.username} <button onClick={handleLogout}>logout</button></p>
                    {blogsForm()}
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                </>
            }
        </div>
    )
}

export default App