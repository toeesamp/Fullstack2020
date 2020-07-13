import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('blog render tests', () => {
    let blog = {
        title: 'testtitle',
        author: 'testauthor',
        url: 'testurl',
        likes: 12345
    }

    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} />
        )
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent(
            'testtitle'
        )
        expect(component.container).toHaveTextContent(
            'testauthor'
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
})