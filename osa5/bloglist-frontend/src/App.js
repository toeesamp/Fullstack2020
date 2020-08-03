import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useHistory,
} from 'react-router-dom'

import Blog from './components/Blog'
//import Users from './components/Users'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const newBlogFormRef = useRef()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const loggedInUser = useSelector(state => state.user)
    const users = useSelector(state => state.users)


    const blogRouteMatcher = useRouteMatch('/blogs/:id')
    const blogMatch = blogRouteMatcher
        ? blogs.find(blog => blog.id.valueOf() === blogRouteMatcher.params.id.valueOf())
        : null

    //TODO kuuluuko tähän?
    const history = useHistory()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(getUsers())
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
        if (blog.user.username !== loggedInUser.username) {
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

    const Users = ({ users }) => {
        //const Users = () => {
        return (
            <>
                <h2>users</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map(user =>
                                <tr key={user.id}>
                                    <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </>
        )
    }

    const User = () => {
        //TODO tänne vai alkuun?
        const userRouteMatcher = useRouteMatch('/users/:id')
        if (!users) {
            return null
        }
        const user = userRouteMatcher
            ? users.find(userMatch => userMatch.id.valueOf() === userRouteMatcher.params.id.valueOf())
            : null
        if (!user) {
            return null
        }
        //console.log(users)
        return (
            <>
                <h2>{user.name ? user.name : user.username}</h2>
                <h3>added blogs</h3>
                {user.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </>
        )
    }

    const BlogDetails = ({ blog, likeHandler, deleteHandler }) => {
        return (
            <>
                <h2>{blog.title} {blog.author}</h2>
                <a href={blog.url}>{blog.url}</a>
                <p>likes: {blog.likes} <button onClick={likeHandler}>like</button></p>
                <p>added by {blog.user.name ? blog.user.name : blog.user.username}</p>
            </>
        )
    }

    const padding = {
        padding: 5
    }

    return (
        <div>
            <div style={{ backgroundColor: 'grey' }}>
                <Link style={padding} to="/">blogs</Link>
                <Link style={padding} to="/users">users</Link>
                {loggedInUser
                    ? <span style={padding}>{loggedInUser.name ? loggedInUser.name : loggedInUser.username} logged in</span>
                    : <Link style={padding} to="/login">login</Link>
                }
            </div>
            <Notification />
            <h2>blogs</h2>
            {loggedInUser &&
                <p>Logged in as {loggedInUser.username} <button onClick={handleLogout}>logout</button></p>
            }
            <Switch>
                <Route path="/blogs/:id">
                    {blogMatch &&
                        <BlogDetails blog={blogMatch} likeHandler={() => handleLike(blogMatch.id)}
                            deleteHandler={setDeleteHandler(blogMatch)} />
                    }
                </Route>
                <Route path="/users/:id">
                    <User />
                </Route>
                <Route path="/users">
                    <Users users={users} />
                </Route>
                <Route path="/login">
                    {loginForm()}
                </Route>
                <Route path="/">

                    {loggedInUser === null ?
                        loginForm() :
                        <>
                            {blogsForm()}
                            {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
                                <Blog key={blog.id} blog={blog} likeHandler={() => handleLike(blog.id)}
                                    deleteHandler={setDeleteHandler(blog)} />
                            )}
                        </>
                    }
                </Route>
            </Switch>

        </div>
    )
}

export default App