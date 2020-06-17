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
    //const nametest = _.map(blogs, blog => _.pick(blog, ['author']))
    //const nametest = blogs.map(({ author }) => { author })
    //console.log(nametest)
    //const names = blogs.map(({ _id, title, url, likes, __v, ...keepAttrs }) => keepAttrs)
    //console.log(names)
    const authors = blogs.map(({ author }) => author)
    //console.log(authors)

    const countby = _(authors).countBy().value()
    console.log('tää on countby',countby)

    const countbytopairs = _(authors)
        //testi
        .countBy()
        //testi
        .toPairs()
        //testi
        .value()
    console.log('tää on countbytopairs',countbytopairs)

    const countbytopairsmax = _(authors)
        //count the occurrence of author names
        .countBy()
        //
        //.toPairs()
        //testi
        .maxBy()
    console.log('tää on countbytopairsmax',countbytopairsmax)

    //const countbytopairs = countby.toPairs().maxBy(_.last)
    //console.log(countbytopairs)

    //const countby2  = _(nametest).countBy()
    //console.log(countby2)

    //const countby2topairs = countby2.toPairs().maxBy(_.last)
    //console.log(countby2topairs)

    //const result = _(authors).countBy().entries().maxBy(_.last)
    const result = _(authors).countBy().entries().maxBy()
    //const result = _.head(_(authors).countBy().entries().maxBy(_.last))
    //console.log(blogs)
    //console.log(result)
    const test = {
        'author': result[0],
        'blogs': result[1]
    }
    return test
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}