import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        })
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        id='title'
                        type="text"
                        value={newBlogTitle}
                        name="Title"
                        onChange={({ target }) => setNewBlogTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        id='author'
                        type="text"
                        value={newBlogAuthor}
                        name="Author"
                        onChange={({ target }) => setNewBlogAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        id='url'
                        type="text"
                        value={newBlogUrl}
                        name="Author"
                        onChange={({ target }) => setNewBlogUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div >
    )
}

export default NewBlogForm