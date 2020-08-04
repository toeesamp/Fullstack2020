import React from 'react'
import { Link } from 'react-router-dom'
const BlogList = ({ blogs }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <>
            {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
                <div key={blog.id} className='blog' style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </div>
            )}

        </>
    )
}

export default BlogList
