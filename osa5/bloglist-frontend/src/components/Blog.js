import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Blog = ({ blog, likeHandler, deleteHandler }) => {
    const [expandedView, setExpandedView] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisibility = () => {
        setExpandedView(!expandedView)
    }

    return (
        <div className='blog'>
            {expandedView ?
                <div style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link><button onClick={toggleVisibility}>hide</button>
                    <br />
                    {blog.url}
                    <br />
                    likes: {blog.likes} <button onClick={likeHandler}>like</button>
                    <br />
                    {blog.user.username}
                    <br />
                    {deleteHandler === null ?
                        null :
                        <button onClick={deleteHandler}>delete</button>
                    }
                </div> :
                <div style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link><button onClick={toggleVisibility}>show</button>
                </div>
            }
        </div>
    )
}

export default Blog
