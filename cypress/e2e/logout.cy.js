describe('template spec', () => {
  it('passes', () => {
    cy.login("bmckaibmc@gmail.com", "1234567");

    cy.get(".coins-body-table").children().should("have.length", 20);

    cy.get(".log-out-button").click(); // click the login button

    cy.url().should('include', '/')
  })
})