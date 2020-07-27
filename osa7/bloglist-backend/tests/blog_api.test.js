const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

describe('testing blog api', () => {

    let token

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()

        const loginUser = {
            username: 'root',
            password: 'sekret'
        }
        const loginResponse = await api
            .post('/api/login')
            .send(loginUser)

        token = loginResponse.body.token
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
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('test3')
    })

    test('post request returns unauthorized without token', async () => {
        const newBlog = {
            title: 'test3',
            author: 'testauthor3',
            url: 'testurl3',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })


    test('empty likes field results in 0', async () => {
        const newBlog = {
            title: 'test3',
            author: 'testauthor3',
            url: 'testurl3'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
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
            .set('Authorization', `bearer ${token}`)
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
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('a blog can be deleted ', async () => {
        const newBlog = {
            title: 'test3',
            author: 'testauthor3',
            url: 'testurl3',
            likes: 3
        }

        const newBlogResponse = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

        await api
            .delete(`/api/blogs/${newBlogResponse.body.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(newBlogResponse.body.title)
    })
})

describe('testing user api', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if username is under 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'aa',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(`Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if password is under 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'aa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})