describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'test boi',
            username: 'test',
            password: 'test'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.contains('Log in to application')
        cy.get('#username')
        cy.get('#password')
        cy.get('#login-button')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()

            cy.get('.info').contains('succesfully logged in')
            cy.contains('Logged in as test')

        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('test')
            cy.get('#password').type('asd')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })
})