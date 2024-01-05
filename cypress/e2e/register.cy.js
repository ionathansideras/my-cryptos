describe('Register Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/my-cryptos/?#/register'); // visit the register page before each test
  });

  it('should show an error if passwords do not match', () => {
    cy.get('input[type="email"]').type('testuser@example.com'); // type in the email
    cy.get('input[type="password"]').first().type('password'); // type in the password
    cy.get('input[type="password"]').last().type('differentpassword'); // type in a different password confirmation
    cy.get('.submit-button').click(); // click the register button

    // check if the error message is displayed
    cy.get('.auth-error-display').should('contain', "Passwords don't match. Please try again.");
  });

  it('should navigate to login page when "Go to Log In" button is clicked', () => {
    cy.get('.auth-navigate button').last().click(); // click the "Go to Log In" button
    cy.url().should('include', '/login'); // check if the URL includes '/login'
  });

  it('should navigate to home page when "email-verification" button is clicked', () => {
    cy.get('.auth-navigate button').first().click(); // click the "email-verification" button
    cy.url().should('include', '/email-verification'); // check if the URL includes '/'
  });

  
  it('should show and hide password when eye icon is clicked', () => {
    cy.get('input[type="password"]').first().type('password'); // type in the password
    cy.get('.auth-icons-2').click(); // click the eye icon
    cy.get('input[type="text"]').should('have.attr', 'type', 'text'); // check if password is visible
    cy.get('.auth-icons-2').click(); // click the eye icon again
    cy.get('input[type="password"]').first().should('have.attr', 'type', 'password'); // check if password is hidden
  });
});