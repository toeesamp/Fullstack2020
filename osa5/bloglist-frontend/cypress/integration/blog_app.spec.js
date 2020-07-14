describe('Blog app', function () {
    beforeEach(function () {
        //cy.request('POST', 'http://localhost:3001/api/testing/reset')
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
            cy.login({ username: 'test', password: 'test' })
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

        describe('and a blog exists', () => {
            beforeEach(function () {
                cy.createBlog({
                    title: 'testtitle',
                    author: 'testauthor',
                    url: 'testurl'
                })
            })

            it('A blog can be liked', function () {
                cy.contains('testtitle testauthor')
                    .contains('view')
                    .click()

                cy.contains('testtitle testauthor')
                    .contains('likes: 0')

                cy.contains('testtitle testauthor')
                    .contains('like')
                    .click()
                    .click()

                cy.contains('testtitle testauthor')
                    .contains('likes: 2')
            })

            it('A blog can be deleted', function () {
                cy.contains('testtitle testauthor')
                    .contains('view')
                    .click()

                cy.contains('testtitle testauthor')
                    .contains('delete')
                    .click()

                cy.get('html').should('not.contain', 'testtitle testauthor')
            })

            it('blogs are listed in the order of likes', function () {
                cy.createBlog({
                    title: 'testtitle2',
                    author: 'testauthor2',
                    url: 'testurl2'
                })
                cy.createBlog({
                    title: 'testtitle3',
                    author: 'testauthor3',
                    url: 'testurl3'
                })

                cy.contains('testtitle3 testauthor3')
                    .contains('view')
                    .click()

                cy.contains('testtitle3 testauthor3')
                    .contains('like')
                    .click()
                    .click()

                cy.contains('testtitle2 testauthor2')
                    .contains('view')
                    .click()

                cy.contains('testtitle2 testauthor2')
                    .contains('like')
                    .click()
                    .click()
                    .click()

                cy.get('.blog').should(($blogs) => {
                    expect($blogs).to.have.length(3)
                    expect($blogs.eq(0)).to.contain('testtitle2 testauthor2')
                    expect($blogs.eq(1)).to.contain('testtitle3 testauthor3')
                    expect($blogs.eq(2)).to.contain('testtitle testauthor')
                })
            })
        })
    })

})