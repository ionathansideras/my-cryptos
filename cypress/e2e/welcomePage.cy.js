describe('template spec', () => {
  beforeEach(() => {
    // Visit the WelcomePage before each test
    cy.visit('http://localhost:5173/my-cryptos/')
  })
  
  it('loads correctly', () => {
    // Check if the main elements of the page are visible
    cy.get('.welcome-page-all').should('be.visible');
    cy.get('.welcome-section').should('be.visible');
    cy.get('.welcome-summary').should('be.visible');
    cy.get('.welcome-footer').should('be.visible');
  });

  it('navigates to login page on "Log In" button click', () => {
    // Click the "Log In" button and check if the URL changes to /login
    cy.get('.section-buttons-container button').contains('Log In').click();
    cy.url().should('include', '/login');
  });

  it('navigates to register page on "Sign Up" button click', () => {
    // Click the "Sign Up" button and check if the URL changes to /register
    cy.get('.section-buttons-container button').contains('Sign Up').click();
    cy.url().should('include', '/register');
  });
})