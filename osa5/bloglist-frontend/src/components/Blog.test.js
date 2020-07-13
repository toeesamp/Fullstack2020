import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blog render tests', () => {
    let blog = {
        title: 'testtitle',
        author: 'testauthor',
        url: 'testurl',
        likes: 12345,
        user: {
            username: 'testuser'
        }
    }

    const mockHandler = jest.fn()
    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} likeHandler={mockHandler} />
        )
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent(
            'testtitle'
        )
    })

    test('only title and author are rendered by default', () => {
        expect(component.container).toHaveTextContent(
            'testtitle'
        )
        expect(component.container).toHaveTextContent(
            'testauthor'
        )
        expect(component.container).not.toHaveTextContent(
            'testurl'
        )
        expect(component.container).not.toHaveTextContent(
            '12345'
        )
    })

    test('render url and likes after clicking view', () => {
        expect(component.container).toHaveTextContent(
            'testtitle'
        )
        expect(component.container).toHaveTextContent(
            'testauthor'
        )

        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            'testurl'
        )
        expect(component.container).toHaveTextContent(
            '12345'
        )
    })

    test('event handler for likes is called the correct number of times', () => {
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)

    })
})