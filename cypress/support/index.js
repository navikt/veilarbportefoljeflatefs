// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
require('cypress-dark');
require('@4tw/cypress-drag-drop');

before(() => {
    cy.server();
    cy.visit('/')
    cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
    Cypress.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    })
    cy.route({
        method: 'GET',
        url: '/veilarbportefoljeflatefs/api/feature'
    })
    cy.getByTestId('enhetens-oversikt').contains('Enhetens oversikt')
        .should('exist');
})
