import React from 'react'

const NewBlogForm = ({
    handleAddBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    newBlogTitle,
    newBlogAuthor,
    newBlogUrl
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddBlog}>
                <div>
                    title
                    <input
                        type="text"
                        value={newBlogTitle}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={newBlogAuthor}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={newBlogUrl}
                        name="Author"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div >
    )
}

export default NewBlogForm