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
    cy.server();
    cy.visit('/');
    cy.url().should('include', '/veilarbportefoljeflatefs/enhet');
    Cypress.on('uncaught:exception', err => {
        console.log(err);
        return false;
    });
    cy.route({
        method: 'GET',
        url: '/veilarbportefoljeflatefs/api/feature'
    });
    cy.getByTestId('enhetens-oversikt')
        .contains('Enhetens oversikt')
        .should('exist');
});

Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('gaTilOversikt', side => {
    console.log('SIDE', side);
    console.log(cy.url());
    if (side === 'min-oversikt') {
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return cy
                .getByTestId(side)
                .click({force: true})
                .cy.url()
                .should('include', '/veilarbportefoljeflatefs/portefolje');
        }
        return cy
            .get('.spinner')
            .should('be.visible')
            .cy.url()
            .should('include', '/veilarbportefoljeflatefs/portefolje');
    } else if (side === 'enhetens-oversikt') {
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return cy
                .getByTestId(side)
                .click({force: true})
                .cy.url()
                .should('include', '/veilarbportefoljeflatefs/enhet');
        }
        return cy
            .get('.spinner')
            .should('be.visible')
            .cy.url()
            .should('include', '/veilarbportefoljeflatefs/enhet');
    } else if (side === 'veileder-oversikt') {
        console.log('den kom hit');
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return (
                cy.getByTestId(side).click({force: true}) &&
                cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
            );
        }
        console.log('den kom hit', cy.url());
        return (
            cy.get('.spinner').should('be.visible') && cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
        );
    }
});

Cypress.Commands.add('klikkTab', tab => {
    cy.get('.spinner').should('not.be.visible');
    if (tab === 'VEILEDERGRUPPER') {
        if (cy.getByTestId('sidebar_content-container').should('not.contain', 'Veiledergrupper')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar_content-container').contains('Veiledergrupper')
            );
        }
        return cy.getByTestId('sidebar_content-container').contains('Veiledergrupper');
    } else if (tab === 'MINE_FILTER') {
        if (cy.getByTestId('sidebar_content-container').should('not.contain', 'Mine filter')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar_content-container').contains('Mine filter')
            );
        }
        return cy.getByTestId('sidebar_content-container').contains('Mine filter');
    } else if (tab === 'STATUS') {
        if (cy.getByTestId('sidebar_content-container').should('not.contain', 'Status')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar_content-container').contains('Status')
            );
        }
        return cy.getByTestId('sidebar_content-container').contains('Status');
    } else if (tab === 'FILTER') {
        if (cy.getByTestId('sidebar_content-container').should('not.contain', 'Filter')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar_content-container').contains('Filter')
            );
        }
        return cy.getByTestId('sidebar_content-container').contains('Filter');
    }
});
// const overskrift = () => {
//     if (tab === 'VEILEDERGRUPPER') {
//         return 'Veiledergrupper';
//     } else if (tab === 'MINE_FILTER') {
//         return 'Mine filter';
//     } else if (tab === 'STATUS') {
//         return 'Status';
//     } else if (tab === 'FILTER') {
//         return 'Filter';
//     }
// };
//
// cy.getByTestId(`sidebar-tab_${tab}`).click({force: true});
// cy.getByTestId('sidebar_content-container').contains(overskrift());
// });

Cypress.Commands.add('checkbox', testid => {
    cy.getByTestId(testid)
        .should('not.be.checked')
        .check({force: true});
    cy.getByTestId(testid).should('be.checked');
});

Cypress.Commands.add('checkboxFirst', testid => {
    cy.getByTestId(testid)
        .first()
        .should('not.be.checked')
        .check({force: true});
    cy.getByTestId(testid)
        .first()
        .should('be.checked');
});

Cypress.Commands.add('checkboxLast', testid => {
    cy.getByTestId(testid)
        .last()
        .should('not.be.checked')
        .check({force: true});
    cy.getByTestId(testid)
        .last()
        .should('be.checked');
});

Cypress.Commands.add('apneFilterDropdown', filternavn => {
    cy.getByTestId(`dropdown-knapp_${filternavn}`)
        .should('be.visible')
        .click();
});
