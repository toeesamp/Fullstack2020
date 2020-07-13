describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.contains('Log in to application')
        cy.get('#username')
        cy.get('#password')
        cy.get('#login-button')
    })
})