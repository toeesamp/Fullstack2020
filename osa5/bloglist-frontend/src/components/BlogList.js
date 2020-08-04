import React from 'react'
import { Link } from 'react-router-dom'
const BlogList = ({ blogs }) => {

    return (
        <>
            {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
                <li key={blog.id} className='blog' >
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </li>
            )}
        </>
    )
}

export default BlogList
