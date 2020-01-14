describe('My First Test', function() {
  it('Visits the Main page', function() {
    cy.visit('http://localhost:3000/?validation=3&acc=97')
  })
})
