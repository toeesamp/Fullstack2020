import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')
    const [notification, setNotification] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        }

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                notificationHelper(`blog added: ${returnedBlog.title}`, 'info', 5000)
                setNewBlogTitle('')
                setNewBlogAuthor('')
                setNewBlogUrl('')
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
        <form onSubmit={addBlog}>

            <h2>blogs</h2>
            <p>
                Logged in as {user.username} <button onClick={handleLogout}>logout</button>
            </p>

            <h2>create new</h2>
            <div>
                title
                    <input
                    type="text"
                    value={newBlogTitle}
                    name="Title"
                    onChange={({ target }) => setNewBlogTitle(target.value)}
                />
            </div>
            <div>
                author
                    <input
                    type="text"
                    value={newBlogAuthor}
                    name="Author"
                    onChange={({ target }) => setNewBlogAuthor(target.value)}
                />
            </div>
            <div>
                url
                    <input
                    type="text"
                    value={newBlogUrl}
                    name="Author"
                    onChange={({ target }) => setNewBlogUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </form>
    )

    return (
        <div>
            {notification === null ?
                null :
                <Notification message={notification.message} type={notification.type} />
            }

            {user === null ?
                loginForm() : blogsForm()
            }
        </div>
    )
}

export default App