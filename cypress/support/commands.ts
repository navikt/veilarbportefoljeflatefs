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

Cypress.Commands.add('configure', () => {
    cy.visit('/');
    cy.url().should('include', '/enhet');
    Cypress.on('uncaught:exception', err => {
        console.log(err);
        return false;
    });
    cy.intercept({
        method: 'GET',
        url: '/api/feature'
    });
    cy.getByTestId('enhetens-oversikt').contains('Enhetens oversikt').should('exist');
});

Cypress.Commands.add('getByTestId', selector => {
    return cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add('findByTestId', {prevSubject: true}, (subject, selector) => {
    return subject.find(`[data-testid=${selector}]`);
});

Cypress.Commands.add('gaTilOversikt', side => {
    const config = {
        'min-oversikt': {
            url: '/portefolje',
            testId: 'min-oversikt'
        },
        'enhetens-oversikt': {
            url: '/enhet',
            testId: 'enhetens-oversikt'
        },
        'veileder-oversikt': {
            url: '/veiledere',
            testId: 'veileder-oversikt'
        }
    };

    const {url, testId} = config[side];

    cy.getByTestId(testId).should('be.visible').click({force: true});
    cy.url().should('include', url);
    cy.get('.navds-loader', {timeout: 15000}).should('not.exist');
    cy.getByTestId(`side-storrelse_${testId}`).should('be.visible');
});

Cypress.Commands.add('faneErApen', tab => {
    return cy.getByTestId(`sidebar__tabinnhold-${tab}`).children().should('have.length.at.least', 1);
});

Cypress.Commands.add('klikkPaSidebarTab', tab => {
    cy.getByTestId(`sidebar-tab_${tab}`).click({force: true});
});

Cypress.Commands.add('klikkTab', (tab) => {
    cy.klikkPaSidebarTab(tab);
    cy.faneErApen(tab);
});

Cypress.Commands.add('checkbox', testid => {
    cy.getByTestId(testid).as('checkbox').should('not.be.checked').check({force: true});
    cy.get('@checkbox').should('be.checked');
});

Cypress.Commands.add('checkboxFirst', testid => {
    cy.getByTestId(testid).not(':disabled').first().as('first-checkbox').should('not.be.checked').check({force: true});
    cy.get('@first-checkbox').should('be.checked');
});

Cypress.Commands.add('checkboxLast', testid => {
    cy.getByTestId(testid).not(':disabled').last().as('last-checkbox').should('not.be.checked').check({force: true});
    cy.get('@last-checkbox').should('be.checked');
});

Cypress.Commands.add('apneLukkeFilterDropdown', filternavn => {
    cy.getByTestId(`dropdown-knapp_${filternavn}`).should('be.visible').click();
    cy.getByTestId(`dropdown-knapp_${filternavn}`).should('be.visible');
});
