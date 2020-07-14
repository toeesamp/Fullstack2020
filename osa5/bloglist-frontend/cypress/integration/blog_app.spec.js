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

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()

            cy.get('.info').contains('succesfully logged in')
            cy.contains('Logged in as test')
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('testtitle')
            cy.get('#author').type('testauthor')
            cy.get('#url').type('testurl')
            cy.get('#create-blog-button').click()

            cy.contains('testtitle')
            cy.contains('testauthor')
        })

        it('A blog can be liked', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('testtitle')
            cy.get('#author').type('testauthor')
            cy.get('#url').type('testurl')
            cy.get('#create-blog-button').click()

            cy.contains('testtitle testauthor')
                .contains('view')
                .click()

            cy.contains('testtitle testauthor')
                .contains('likes: 0')



            cy.contains('testtitle testauthor')
                .contains('like')
                .click()

            cy.contains('testtitle testauthor')
                .contains('likes: 1')

        })
    })

})