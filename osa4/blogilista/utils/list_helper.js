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
        //get the pair with largest count (last element in the tuple)
        .maxBy(_.last)

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

    //const authors = blogs.map(({ author }) => author)
    //console.log(authors)
    //const uniqueAuthors = _.uniq(authors)
    //console.log('unique authors \n',uniqueAuthors)




    //const authorsAndLikes = blogs.map(({ author, likes }) => [author, likes])
    //const obj = Object.fromEntries(authorsAndLikes)
    //console.log(obj)
    //console.log('authors and likes \n',authorsAndLikes)

    //const authorsAndLikesObject = _.fromPairs(authorsAndLikes)
    //console.log('authors and likes object \n',authorsAndLikesObject)


    const test = blogs.map(({ author, likes }) => ({ author, likes }))
    console.log(test)


    //const uniqueAuthorsWithLikes = _.uniq(authorsAndLikes, 'author')
    //console.log('unique authors with likes\n',uniqueAuthorsWithLikes)


    const test2 = _.groupBy(test, 'author')
    console.log(test2)

    //const test3 = _.mapValues(test2, blogsByAuthor => _.sum(blogsByAuthor))
    //const test3 = _.mapValues(test2, blogsByAuthor => blogsByAuthor.map(_.toPairs(blogsByAuthor)))

    //#############
    //tää on se oikee
    //const test3 = _.mapValues(test2, blogsByAuthor => {
    //    console.log('new array', blogsByAuthor)
    //    const sum = _.sumBy(blogsByAuthor, 'likes')
    //    console.log(sum)
    //    //blogsByAuthor.map(a => console.log(a))
    //})
    const test3 = _.mapValues(test2, blogsByAuthor => _.sumBy(blogsByAuthor, 'likes'))

    console.log('test3',test3)

    const test4 = _(test3).toPairs().value()
    console.log('test4', test4)

    const final = _(test3).toPairs().maxBy(_.last)
    console.log('final', final)

    //var objects = [
    //    { 'n': 4 },
    //    { 'n': 6 }
    //]

    //var testsum = _.sum(objects, 'n')
    //console.log('testsum', testsum)

    //var testsum2 = _.sumBy(objects, function(object) {
    //    return object.n
    //})
    //console.log('testsum2', testsum2)

    //console.log(test3)

    //const test3 = _.groupBy(authorsAndLikes)
    //console.log(test3)
    //split attribute names
    //sum
    //sama kun most blogs
    const resultObject = {
        'author': final[0],
        'likes': final[1]
    }
    return resultObject
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}