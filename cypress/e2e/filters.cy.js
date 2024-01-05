describe("filters Functionality", () => {
  it("filters", () => {
    // visit the page and login
    cy.login("iona8ansideras@gmail.com", "1234567");

    // check if the table has only 20 child
    cy.get(".coins-body-table").children().should("have.length", 20);

    // check if the .filters element has a height of '0px'
    cy.get(".filters").should("have.css", "height", "0px");

    // click the filter button
    cy.get(".filter-button").click();

    // check if the .filters element has a height more than '0px'
    cy.get(".filters").then(($filters) => {
      const height = parseInt($filters.css("height"));
      expect(height).to.be.greaterThan(0);
    });

    cy.get(".filters").children().eq(5).click(); // click the 6th filter

    // loop through all the .favorite-star elements and check if the src is equal to '/my-cryptos/src/assets/star2.png'
    cy.get(".favorite-star").each(($el) => {
      cy.wrap($el).should(
        "have.attr",
        "src",
        "/my-cryptos/src/assets/star2.png"
      );
    });

    cy.get(".filters").children().eq(6).click(); // click the 7th filter

    // check if the table has only 20 child
    cy.get(".coins-body-table").children().should("have.length", 20);
  });
});
