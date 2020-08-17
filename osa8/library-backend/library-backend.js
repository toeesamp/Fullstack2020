const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
//const _ = require('lodash')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = process.env.SECRET

mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`



const resolvers = {
    Query: {
        // bookCount: () => books.length,
        bookCount: () => Book.collection.countDocuments(),
        // bookCount: () => {return 0},
        // authorCount: () => authors.length,
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            return Book.find({}).populate('author')
            // return Book.find({})
            // let result = books
            // if (args.author) {
            //     result = result.filter(book => book.author === args.author)
            // }
            // if (args.genre) {
            //     result = result.filter(book => book.genres.find(genre => genre === args.genre))
            // }
            // return result
        },
        allAuthors: () => {
            // const authors = Author.find({})
            // console.log('authors')
            // console.log(authors)
            // console.log('authors.collection')
            // console.log(authors.collection)
            // return authors.map(author => ({
                //     ...author,
                //     bookCount: 9001
                //     //bookCount: books.filter(book => book.author === author.name).length
            // }))
            // let testi = Author.find({})
            // console.log('sdgfsdfhg')
            // return testi
            // const asd = Author.find({}).then(authors => authors.map(author => ({ ...author,bookCount: 9001 }))).then(authors => console.log(authors))
            // const asd = Author.find({}).then(authors => authors.map(author => console.log(author)))
            // console.log('asd',asd)
            // return asd
            return Author.find({})
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            console.log('argsit')
            console.log(args)

            let authorObject = await Author.findOne({name: args.author})


            if (!authorObject) {
                console.log('luodaan uus')
                authorObject = new Author({name: args.author})
                try {
                    await authorObject.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }
            console.log('löytyi', authorObject)

            const bookObject = {...args, author: authorObject}
            // console.log('bookObject')
            // console.log(bookObject)
            // const book = new Book({ ...args, author: newAuthor._id })
            const book = new Book(bookObject)
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return book
            // if (!authors.find(author => author.name === args.author)) {
            //     authors = authors.concat({name: args.author, id: uuidv4()})
            // }
            // const bookToAdd = {
            //     title: args.title,
            //     published: args.published,
            //     author: args.author,
            //     genres: args.genres,
            //     id: uuidv4()
            // }
            // books = books.concat(bookToAdd)
            // return bookToAdd
        },
        editAuthor: (root, args) => {
            let authorToEdit = authors.find(author => author.name === args.name)
            if (!authorToEdit) {
                return null
            }
            authorToEdit = { ...authorToEdit, born: args.setBornTo }
            authors = authors.map(author => author.name === authorToEdit.name ? authorToEdit : author)
            return authorToEdit
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})