const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'test1',
        author: 'testauthor1',
        url: 'testurl1',
        likes: 1
    },
    {
        title: 'test2',
        author: 'testauthor2',
        url: 'testurl2',
        likes: 2
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}