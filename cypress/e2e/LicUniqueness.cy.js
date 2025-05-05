describe('License Plate Uniqueness', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should prevent saving a duplicate license plate and show an error', () => {
    // First login
    cy.get('input#username').type('admin');
    cy.get('input#password').type('password');
    cy.get('button[type="submit"]').click();

    cy.get('button.dropbtn').click();
    cy.contains('a', 'Vehicles').click({ force: true });

    cy.get('button#addVehicle').click();

    const testPlate = 'TEST123';
    cy.get('input#licensePlate').type(testPlate);
    cy.get('input#carMake').type('Honda');
    cy.get('input#carModel').type('Accord');
    cy.get('input#carYear').type('2020');
    cy.get('select#state').select('California');
    cy.get('select#customers').select(1);
    cy.get('input#addcar').click();

    // Wait for modal to close
    cy.get('#modal .close').click(); // or whatever your close button selector is
    cy.get('#modal').should('not.be.visible');

    // Log in again
    cy.visit('http://localhost:3000');
    cy.get('input#username').type('admin');
    cy.get('input#password').type('password');
    cy.get('button[type="submit"]').click();

    cy.get('button.dropbtn').click();
    cy.contains('a', 'Vehicles').click({ force: true });

    cy.get('button#addVehicle').click({ force: true });
    cy.get('input#licensePlate').type(testPlate);
    cy.get('input#carMake').type('Toyota');
    cy.get('input#carModel').type('Camry');
    cy.get('input#carYear').type('2021');
    cy.get('select#state').select('CA');
    cy.get('select#customers').select(1);
    cy.get('input#addcar').click();

    // Check for error message or that save is prevented

  });
});
