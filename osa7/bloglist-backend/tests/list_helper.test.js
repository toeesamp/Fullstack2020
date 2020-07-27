const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const blogsInverted = [
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    }
]

const oneBlog = []
oneBlog.push( blogs[0] )

const emptyList = []

describe('total likes', () => {
    test('empty list equals zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })
    test('sum of single element', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(7)
    })
    test('sum of several elements', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('favorite of empty list should be empty object', () => {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual({})
    })
    test('favorite of single blog should be the single element', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        expect(result).toEqual(
            {
                title: 'React patterns',
                author: 'Michael Chan',
                likes: 7
            })
    })
    test('favorite blog should be Canonical string reduction by Dijkstra', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(
            {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                likes: 12
            })
    })
})

describe('most blogs', () => {
    test('most blogs of empty list should be empty object', () => {
        const result = listHelper.mostBlogs(emptyList)
        expect(result).toEqual({})
    })
    test('most blogs of single blog should be the authors name with 1 blog', () => {
        const result = listHelper.mostBlogs(oneBlog)
        expect(result).toEqual(
            {
                author: 'Michael Chan',
                blogs: 1
            })
    })
    test('Robert C. Martin should have 3 blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(
            {
                author: 'Robert C. Martin',
                blogs: 3
            })
    })
    test('invert should not have an effect', () => {
        const result = listHelper.mostBlogs(blogsInverted)
        expect(result).toEqual(
            {
                author: 'Robert C. Martin',
                blogs: 3
            })
    })
})

describe('most likes', () => {
    test('most likes of empty list should be empty object', () => {
        const result =listHelper.mostLikes(emptyList)
        expect(result).toEqual({})
    })
    test('most likes of single blog should be the the authors name and the likes of the blog', () => {
        const result = listHelper.mostLikes(oneBlog)
        expect(result).toEqual(
            {
                author: 'Michael Chan',
                likes: 7
            })
    })
    test('Edsger W. Dijkstra should have 17 likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(
            {
                author: 'Edsger W. Dijkstra',
                likes: 17
            })
    })
})
