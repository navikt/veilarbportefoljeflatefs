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
    if (tab === "VEILEDERGRUPPER") {
        if (cy.getByTestId("sidebar_content-container").should("not.contain", "Veiledergrupper")) {
            cy.getByTestId(`sidebar-tab_${tab}`).click();
        }
        cy.getByTestId("sidebar_content-container").contains("Veiledergrupper");
    } else if (tab === "MINE_FILTER") {
        if (cy.getByTestId("sidebar_content-container").should("not.contain", "Mine filter")) {
            cy.getByTestId(`sidebar-tab_${tab}`).click();
        }
        cy.getByTestId("sidebar_content-container").contains("Mine filter");
    } else if (tab === "STATUS") {
        if (cy.getByTestId("sidebar_content-container").should("not.contain", "Status")) {
            cy.getByTestId(`sidebar-tab_${tab}`).click();
        }
        cy.getByTestId("sidebar_content-container").contains("Status");
    } else if (tab === "FILTER") {
        if (cy.getByTestId("sidebar_content-container").should("not.contain", "Filter")) {
            cy.getByTestId(`sidebar-tab_${tab}`).click();
        }
        cy.getByTestId("sidebar_content-container").contains("Filter");
    }
})

Cypress.Commands.add("gaTilOversikt", (side) => {
    if (side === 'min-oversikt') {
        if (cy.getByTestId(side).should("not.have.class", ".oversiktslenke--valgt")) {
            cy.getByTestId(side).click({force: true});
        }
        cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
    } else if (side === 'enhetens-oversikt') {
        if (cy.getByTestId(side).should("not.have.class", ".oversiktslenke--valgt")) {
            cy.getByTestId(side).click({force: true})
        }
        cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
    } else if (side === 'veileder-oversikt') {
        if (cy.getByTestId(side).should("not.have.class", ".oversiktslenke--valgt")) {
            cy.getByTestId(side).click({force: true})
        }
        cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
    }
})

Cypress.Commands.add("checkbox", (testid) => {
    cy.getByTestId(testid).should("not.be.checked");
    cy.getByTestId(testid).check({force: true})
    cy.getByTestId(testid).should("be.checked");
})

Cypress.Commands.add("configure", () => {
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

