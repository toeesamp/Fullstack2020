import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('new blog form render tests', () => {
    test('new blog form updates parent state and calls onSubmit', () => {
        const createBlog = jest.fn()

        const component = render(
            <NewBlogForm createBlog={createBlog} />
        )

        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(titleInput, {
            target: { value: 'testtitle' }
        })
        fireEvent.change(authorInput, {
            target: { value: 'testauthor' }
        })
        fireEvent.change(urlInput, {
            target: { value: 'testurl' }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        const mockBlog = createBlog.mock.calls[0][0]
        expect(mockBlog.title).toBe('testtitle')
        expect(mockBlog.author).toBe('testauthor')
        expect(mockBlog.url).toBe('testurl')
    })
})