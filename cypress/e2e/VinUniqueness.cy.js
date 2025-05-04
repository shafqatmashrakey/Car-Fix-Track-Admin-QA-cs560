describe('License Plate Uniqueness', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    // Ensure logged out before each test
    cy.get('body').then($body => {
      if ($body.find('a:contains("Logout")').length) {
        cy.contains('a', 'Logout').click({ force: true });
      }
    });
    // Login
    cy.get('input#username').type('admin');
    cy.get('input#password').type('password');
    cy.get('button[type="submit"]').click();
  });

  it('should prevent saving a duplicate license plate and show an error', () => {
    cy.get('button.dropbtn').click();
    cy.contains('a', 'Vehicles').click({ force: true });
    cy.get('button#addVehicle').click();

    // Add a vehicle with a unique license plate
    const testPlate = 'TEST123';
    cy.get('input#licensePlate').type(testPlate);
    cy.get('input#carMake').type('Honda');
    cy.get('input#carModel').type('Accord');
    cy.get('input#carYear').type('2020');
    // Select a state and owner if required
    cy.get('select#state').select('CA');
    cy.get('select#customers').select(1); // Select first owner, adjust as needed
    cy.get('input#addcar').click();

    // Try to add another vehicle with the same license plate
    cy.get('button#addVehicle').click();
    cy.get('input#licensePlate').type(testPlate);
    cy.get('input#carMake').type('Toyota');
    cy.get('input#carModel').type('Camry');
    cy.get('input#carYear').type('2021');
    cy.get('select#state').select('CA');
    cy.get('select#customers').select(1);
    cy.get('input#addcar').click();

    // Check for error message or that save is prevented
    cy.contains('License plate already exists').should('be.visible');
    // Or, if the submit button is disabled:
    // cy.get('input#addcar').should('be.disabled');
  });
});