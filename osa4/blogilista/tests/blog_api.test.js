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

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'test3',
        author: 'testauthor3',
        url: 'testurl3',
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('test3')
})

test('empty likes field results in 0', async () => {
    const newBlog = {
        title: 'test3',
        author: 'testauthor3',
        url: 'testurl3'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const filteredBlogs = response.body.filter(blog => blog.title === 'test3')
    const likes = filteredBlogs.map(blog => blog.likes)
    expect(likes).toContain(0)
})

test('new blog without title results in bad request', async () => {
    const newBlog = {
        author: 'testauthor4',
        url: 'testurl4'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('new blog without url results in bad request', async () => {
    const newBlog = {
        title: 'test5',
        url: 'testurl5'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})