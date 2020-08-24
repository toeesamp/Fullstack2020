import React from 'react'
import BirthyearForm from './BirthyearForm'

const Authors = ({ show, authors, token }) => {
    if ( !show ) {
        return null
    }
    console.log('authors',authors)

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
                        </th>
                        <th>
                            books
                        </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {token && <BirthyearForm authors={authors} />}
        </div>
    )
}

export default Authors
