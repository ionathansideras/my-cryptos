describe('template spec', () => {
  it('passes', () => {
    cy.login("bmckaibmc@gmail.com", "1234567");

    cy.get(".coins-body-table").children().should("have.length", 20);

    cy.get(".glow-on-hover").click(); // click the login button

    cy.get(".coins-body-table").children().should("have.length", 40);
  })
})