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


    console.log(_(authors).countBy().value())

    const resultArray = calculateMaximum(_.countBy(authors))
    //const resultArray =_(authors)
    //    //count the occurrence of author names
    //    .countBy()
    //    //convert to array of [author, count] pairs for maxBy
    //    .toPairs()
    //    //get the pair with largest count (last element in the tuple)
    //    .maxBy(_.last)

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

    console.log(likesPerAuthor)
    const resultArray = calculateMaximum(likesPerAuthor)
    //const resultArray = _(likesPerAuthor)
    //    //convert to array of [author, likes] pairs for maxBy
    //    .toPairs()
    //    //get the pair with most likes (last element in the tuple)
    //    .maxBy(_.last)

    const resultObject = {
        'author': resultArray[0],
        'likes': resultArray[1]
    }
    return resultObject
}

const calculateMaximum = (object) => {
    return _(object)
        //convert to array of pairs for maxBy
        .toPairs()
        //get the pair with largest last last element
        .maxBy(_.last)
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}