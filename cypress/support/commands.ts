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
    cy.url().should('include', '/veilarbportefoljeflatefs/enhet');
    Cypress.on('uncaught:exception', err => {
        console.log(err);
        return false;
    });
    cy.intercept({
        method: 'GET',
        url: '/veilarbportefoljeflatefs/api/feature'
    });
    cy.getByTestId('enhetens-oversikt').contains('Enhetens oversikt').should('exist');
});

Cypress.Commands.add('getByTestId', (selector) => {
    return cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add('findByTestId', {prevSubject: true}, (subject, selector) => {
    return subject.find(`[data-testid=${selector}]`);
});

/* Ting eg ikkje forstår med denne funksjonen (2025-02-05, Ingrid)
* - Kvifor forventer vi loader når vi allereie er på ei side? Vi har ikkje trykka på noko her.
* - Kvifor returnerer vi kalla, i staden for å berre kalle dei? Vi bruker ikkje funksjonen i nøsting uansett.
*   (Det ville dessutan vore meir fornuftig/lettlest å returnere berre oversikt-elementet.)
* - Prøver vi nokon gong å gå til ei side vi ikkje er på? Treng vi den koden i det heile? Og om vi prøver, er ikkje
*   rett oppførsel at vi trykkar på ting?
* */
Cypress.Commands.add('gaTilOversikt', side => {
    if (side === 'min-oversikt') {
        // Om vi ikkje er på den valgte oversiktsida frå før
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return (
                // trykk på den og sjekk at vi får rett url
                cy.getByTestId(side).click({force: true}) &&
                cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
            );
        }
        // Om vi er på sida allereie
        return (
            // Sjekker at vi ser loader og at url er rett
            cy.get('.navds-loader').should('be.visible') &&
            cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
        );
    } else if (side === 'enhetens-oversikt') {
        // Om vi ikkje er på den valgte oversiktsida frå før
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return (
                // trykk på den og sjekk at vi får rett url
                cy.getByTestId(side).click({force: true}) &&
                cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
            );
        }
        // Om vi er på sida allereie
        return (
            // Sjekker at vi ser loader og at url er rett
            cy.get('.navds-loader').should('be.visible') &&
            cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        );
    } else if (side === 'veileder-oversikt') {
        // Om vi ikkje er på den valgte oversiktsida frå før
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            // trykk på den og sjekk at vi får rett url
            return (
                cy.getByTestId(side).click({force: true}) &&
                cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
            );
        }
        // Om vi er på sida allereie
        return (
            // Sjekker at vi ser loader og at url er rett
            cy.get('.navds-loader').should('be.visible') &&
            cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
        );
    }
});

Cypress.Commands.add('faneErApen', tab => {
    return (cy.getByTestId(`sidebar__tabinnhold-${tab}`).children().should('have.length.at.least', 1));
})

Cypress.Commands.add('faneErLukket', tab => {
        return (cy.getByTestId(`sidebar__tabinnhold-${tab}`).children().should('have.length', 0));
    }
)

Cypress.Commands.add('klikkPaSidebarTab', tab => {
    cy.getByTestId(`sidebar-tab_${tab}`).click({force: true})
})

Cypress.Commands.add('klikkTab', (tab) => {
    if (tab === 'VEILEDERGRUPPER') {
        if (cy.faneErLukket('VEILEDERGRUPPER')) {
            return (
                cy.klikkPaSidebarTab(tab) && cy.faneErApen('VEILEDERGRUPPER')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Veiledergrupper');
    } else if (tab === 'MINE_FILTER') {
        if (cy.faneErLukket('MINE_FILTER')) {
            return (
                cy.klikkPaSidebarTab(tab) && cy.faneErApen('MINE_FILTER')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Mine filter');
    } else if (tab === 'STATUS') {
        if (cy.faneErLukket('STATUS')) {
            return (
                cy.klikkPaSidebarTab(tab) &&  cy.faneErApen('STATUS')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Status');
    } else if (tab === 'FILTER') {
        if (cy.faneErLukket('FILTER')) {
            return (
                cy.klikkPaSidebarTab(tab) && cy.faneErApen('FILTER')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Filter');
    }
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
});
