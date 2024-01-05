describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/my-cryptos/#/login'); // visit the login page before each test
  });

  it('should display validation error if email and password are empty', () => {
    cy.get('.submit-button').click(); // click the login button
    cy.get('.auth-error-display').should('be.visible'); // check if error message is visible
  });

  it('should allow a user to log in', () => {
    cy.login("iona8ansideras@gmail.com", "1234567");

    // check if the user is redirected to the home page
    cy.url().should('include', '/home');
  });

  it('should show and hide password when eye icon is clicked', () => {
    cy.get('input[type="password"]').type('password'); // type in the password
    cy.get('.auth-icons-2').click(); // click the eye icon
    cy.get('input[type="text"]').should('have.attr', 'type', 'text'); // check if password is visible
    cy.get('.auth-icons-2').click(); // click the eye icon again
    cy.get('input[type="password"]').should('have.attr', 'type', 'password'); // check if password is hidden
  });
});