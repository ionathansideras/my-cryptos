describe('Theme Change Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/my-cryptos/'); // visit the welcome page before each test
  });

  it('should change the color theme when .header-sun is clicked', () => {
    // get the current color theme
    cy.get('.welcome-section').then(($section) => {
      const initialTheme = $section.css('background-color');

      // click the .header-sun element
      cy.get('.header-sun').click();

      // check if the color theme has changed
      cy.get('.welcome-section').should(($section) => {
        expect($section.css('background-color')).not.to.eq(initialTheme);
      });
    });
  });
});