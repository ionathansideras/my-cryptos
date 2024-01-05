describe('template spec', () => {
  it('passes', () => {
    // visit the page and login
    cy.login("iona8ansideras@gmail.com", "1234567");

    // check if the table has only 20 child
    cy.get(".coins-body-table").children().should("have.length", 20);

    // click the first row
    cy.get(".coins-body-table").children().eq(0).click();

    // check if the url has changed to '/coin/BTC'
    cy.url().should("include", "/coin/BTC");

    // check this detail-chart element is visible
    cy.get(".detail-chart").should("be.visible");
  })
})