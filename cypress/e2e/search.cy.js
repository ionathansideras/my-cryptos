describe("Search Functionality", () => {
  it('should display only one result when "solana" is searched', () => {
    // visit the page and login
    cy.login("bmckaibmc@gmail.com", "1234567");

    // type "solana" in the search input
    cy.get(".inputSearch").type("solana");

    cy.get(".glow-on-hover").should("not.be.visible"); // check if the load more button is not visible

    // check if the table has only one child
    cy.get(".coins-body-table").children().should("have.length", 1);
  });
});
