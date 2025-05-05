describe('Appointments', () => {
  it('should display the appointment in the table', () => {
    // Login first
    cy.visit('http://localhost:3000');
    cy.get('input#username').type('admin');
    cy.get('input#password').type('password');
    cy.get('button[type="submit"]').click();

    // Go to Appointments page
    cy.get('button.dropbtn').click();
    cy.contains('a', 'Appointments').click({ force: true });

    // Check that the appointment exists in the table
    cy.get('table#apptTable').contains('td', 'John Doe').should('exist');
    cy.get('table#apptTable').contains('td', 'Honda Accord 2020').should('exist');
    cy.get('table#apptTable').contains('td', 'Regular check').should('exist');
    cy.get('table#apptTable').contains('td', 'Battery Check').should('exist');
    cy.get('table#apptTable').contains('td', 'Emma Johnson junior').should('exist');
    cy.get('table#apptTable').contains('td', 'No').should('exist');
  });
});