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

    const resultArray =_(authors)
        //count the occurrence of author names
        .countBy()
        //convert to array of [author, count] pairs for maxBy
        .toPairs()
        //get the pair with largest count
        .maxBy()

    const resultObject = {
        'author': resultArray[0],
        'blogs': resultArray[1]
    }
    return resultObject
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}