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


Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("klikkTab", (tab) => {
    cy.getByTestId(`sidebar-tab_${tab}`).click();
})

Cypress.Commands.add("gaTilOversikt", (side) => {
    if (side === 'min-oversikt') {
        cy.getByTestId(side).click()
        cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
        // cy.route({
        //     method: 'GET',
        //     url: '/veilarbportefoljeflatefs/api/feature'
        // })
    } else if (side === 'enhetens-oversikt') {
        cy.getByTestId(side).click()
        cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        // cy.route({
        //     method: 'GET',
        //     url: '/veilarbportefoljeflatefs/api/feature'
        // })
    } else if (side === 'veileder-oversikt') {
        cy.getByTestId(side).click()
        cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
    }
    cy.route({
        method: 'GET',
        url: '/veilarbportefoljeflatefs/api/feature'
    })
})
