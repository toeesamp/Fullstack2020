import React, { useState } from 'react'

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
        <>
            {expandedView ?
                <div style={blogStyle}>
                    {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
                    <br/>
                    {blog.url}
                    <br/>
                    likes: {blog.likes} <button onClick={likeHandler}>like</button>
                    <br/>
                    {blog.user.username}
                    <br/>
                    {deleteHandler === null ?
                        null :
                        <button onClick={deleteHandler}>delete</button>
                    }
                    
                </div> :
                <div style={blogStyle}>
                    {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
                </div>
            }
        </>
    )
}

export default Blog
