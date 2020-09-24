// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('start', () => {
    before('Åpne browser med oversikten', () => {
        cy.server();
        cy.visit('/')
        cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        Cypress.on('uncaught:exception', (err) => {
            console.log(err);
            return false;
        })
        cy.get('[data-testid=enhetens-oversikt]').contains('Enhetens oversikt')
            .should('exist')
    })
})
