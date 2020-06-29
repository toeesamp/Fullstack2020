const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('_id is converted to id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => expect(blog.id).toBeDefined())
})


afterAll(() => {
    mongoose.connection.close()
})