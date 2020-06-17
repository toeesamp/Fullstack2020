const _ = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likeCounter = ( sum, blog ) => {
        return sum + blog.likes
    }
    return blogs.reduce(likeCounter, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const maxValue = Math.max(...blogs.map(blog => blog.likes), 0)
    const blogWithMostLikes = blogs[blogs.findIndex(blog => blog.likes === maxValue)]
    const { __v, _id, url, ...prunedObject } = blogWithMostLikes
    return prunedObject
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    //discard everything but the author name
    const authors = blogs.map(({ author }) => author)

    //count the occurrences of author names and get the maximum value
    const resultArray = maxPropertyValue(_.countBy(authors))

    const resultObject = {
        'author': resultArray[0],
        'blogs': resultArray[1]
    }
    return resultObject
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    //discard everything but the author name and likes
    const authors = blogs.map(({ author, likes }) => ({ author, likes }))

    const groupedAuthors = _.groupBy(authors, 'author')

    //calculate the total sum of likes for each author
    const likesPerAuthor = _.mapValues(groupedAuthors, blogsByAuthor => _.sumBy(blogsByAuthor, 'likes'))

    const resultArray = maxPropertyValue(likesPerAuthor)

    const resultObject = {
        'author': resultArray[0],
        'likes': resultArray[1]
    }
    return resultObject
}

// Calculates the maximum value of all properties in an object
// Returns a pair (array) with property name and value
const maxPropertyValue = (object) => {
    return _(object)
        //convert to array of pairs for maxBy
        .toPairs()
        //get the pair with largest last element
        .maxBy(_.last)
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}