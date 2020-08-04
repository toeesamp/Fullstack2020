import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory,
} from 'react-router-dom'
import { Form, Button, Navbar, Nav } from 'react-bootstrap'

import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog, addComment } from './reducers/blogReducer'
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
            .then(dispatch(setNotification(`blog added: ${blogObject.title}`, 'success', 5)))
            .catch(error => {
                dispatch(setNotification(`Error occurred while adding blog: ${error}`, 'danger', 15))
            })
    }

    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(login(username, password))
            .then(
                dispatch(setNotification('succesfully logged in', 'success', 5))
            )
            .catch(error => {
                console.log(error.response.data.error)
                dispatch(setNotification(`error logging in ${error}`, 'danger', 5))
            })
        setUsername('')
        setPassword('')
        history.push('/')
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(logout())
        dispatch(setNotification('logged out', 'success', 5))
    }

    const handleLike = (id) => {
        const blogToLike = blogs.find(blog => blog.id === id)
        dispatch(likeBlog(blogToLike))
        dispatch(setNotification(`you liked '${blogToLike.title}'`, 'success', 5))
    }

    const handleDelete = (blogToDelete) => {
        dispatch(deleteBlog(blogToDelete.id))
            .then(dispatch(setNotification(`Deleted ${blogToDelete.title}`, 'success', 5)))
            .catch(e => {
                dispatch(setNotification(`Unable to delete ${blogToDelete.title}: ${e}`, 'danger', 5))
            })
    }

    const setDeleteHandler = (blog) => {
        if (!loggedInUser) {
            return null
        }
        if (blog.user.username !== loggedInUser.username) {
            return null
        }
        return () => handleDelete(blog)
    }

    const loginForm = () => (
        <Form onSubmit={handleLogin}>
            <Form.Group>
                <h2>Log in to application</h2>
                <Form.Label>username:</Form.Label>
                <Form.Control
                    id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />

                <Form.Label>password:</Form.Label>
                <Form.Control
                    id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />

                <Button variant="primary" id="login-button" type="submit">login</Button>
            </Form.Group>
        </Form>
    )

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
            <NewBlogForm
                createBlog={addBlog}
            />
        </Togglable>
    )

    const Users = ({ users }) => {
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

    const [newComment, setNewComment] = useState('')

    const handleNewComment = (blog) => (event) => {
        event.preventDefault()

        dispatch(addComment(blog, newComment))
            .then(
                dispatch(setNotification(`added comment ${newComment}`, 'success', 5))
            )
            .catch(error => {
                console.log(error.response.data.error)
                dispatch(setNotification(`error adding comment ${error}`, 'danger', 5))
            })
        setNewComment('')
    }
    const BlogDetails = ({ blog, likeHandler, deleteHandler }) => {
        return (
            <>
                <h2>{blog.title} {blog.author}</h2>
                <a href={blog.url}>{blog.url}</a>
                <p>likes: {blog.likes} <button onClick={likeHandler}>like</button></p>
                <p>added by {blog.user.name ? blog.user.name : blog.user.username}</p>
                <h3>comments</h3>

                {commentForm(blog)}
                {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
            </>
        )
    }

    const commentForm = (blog) => (
        <form onSubmit={handleNewComment(blog)}>
            <input
                id='comment'
                type="text"
                value={newComment}
                name="NewComment"
                onChange={({ target }) => setNewComment(target.value)}
                autoFocus
            />
            <button id="comment-button" type="submit">add comment</button>
        </form>
    )

    const padding = {
        padding: 5
    }

    return (
        <div className="container">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/users">users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            {loggedInUser
                                ? <span style={padding}> logged in as {loggedInUser.name ? loggedInUser.name : loggedInUser.username} <button onClick={handleLogout}>logout</button></span>
                                : <Link style={padding} to="/login">login</Link>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Notification />
            <h2>blog app</h2>
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
                    {loggedInUser ?
                        <>
                            {blogForm()}
                            <BlogList blogs={blogs} />
                        </> :
                        loginForm()
                    }
                </Route>
            </Switch>

        </div>
    )
}

export default App