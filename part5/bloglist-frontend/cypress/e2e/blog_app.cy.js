describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'nimi',
      username: 'käyttäjä',
      password: 'salasana'
    }

    cy.request('POST', 'http://localhost:3003/api/users ', user)
  })

  it('loginform with correct credentials -5.18', () => {
    cy.get('#username').type('käyttäjä')
    cy.get('#password').type('salasana')
    cy.contains('login').click()
    cy.contains('Login was successful')
  })

  it('loginform with incorrect credentials -5.18', () => {
    cy.get('#username').type('44444444')
    cy.get('#password').type('salasana')
    cy.contains('login').click()
    cy.contains('error login')
  })

  describe('logged in',() => {

    beforeEach(function() {
      cy.login({ username:'käyttäjä', name:'nimi', password:'salasana' })
      cy.visit('http://localhost:3000')
    })

    describe('blog is submitted 5.19',() => {
      beforeEach(function() {
        cy.contains('create blog').click()
        cy.get('#title').type('title')
        cy.get('#author').type('author')
        cy.get('#url').type('url')
        cy.contains('save').click()

        cy.contains('create blog').click()
        cy.get('#title').type('title2')
        cy.get('#author').type('author2')
        cy.get('#url').type('url2')
        cy.contains('save').click()

      })

      it('user can like 5.20', () => {
        cy.contains('show more').click()
        cy.contains('like').click()
      })

      it('user can delete his blog 5.21', () => {
        cy.contains('show more').click()
        cy.contains('delete').click()
      })

      it('only the creator can see the delete button of a blog, not anyone else 5.22' , () => {
        cy.contains('logout').click()

        const user2 ={
          name: 'name2',
          username:'username2',
          password: 'password2'
        }
        cy.request('POST', 'http://localhost:3003/api/users ', user2)

        cy.contains('show more').click()
        cy.contains('delete').should('not.exist')
      })

      it('blogs are ordered according to likes with the blog with the most likes being first. 5.23' , () => {
        cy.contains('logout').click()

        const user2 ={
          name: 'name2',
          username:'username2',
          password: 'password2'
        }
        cy.request('POST', 'http://localhost:3003/api/users ', user2)

        cy.contains('title2').contains('show more').click()
        cy.contains('like').click()
        cy.contains('like').click()

        cy.visit('http://localhost:3000')
        cy.contains('show more').click()
        cy.contains('Votes: 2')
      })
    })

  })

})