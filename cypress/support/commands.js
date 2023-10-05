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

	cy.getByTestId('enhetens-oversikt').contains('Enhetens oversikt').should('exist');
});

Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('gaTilOversikt', side => {
    if (side === 'min-oversikt') {
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return (
                cy.getByTestId(side).click({force: true}) &&
                cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
            );
        }
        return (
            cy.get('.navds-loader').should('be.visible') &&
            cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
        );
    } else if (side === 'enhetens-oversikt') {
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return (
                cy.getByTestId(side).click({force: true}) &&
                cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
            );
        }
        return (
            cy.get('.navds-loader').should('be.visible') &&
            cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        );
    } else if (side === 'veileder-oversikt') {
        if (cy.getByTestId(side).should('not.have.class', '.oversiktslenke--valgt')) {
            return (
                cy.getByTestId(side).click({force: true}) &&
                cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
            );
        }
        return (
            cy.get('.navds-loader').should('be.visible') &&
            cy.url().should('include', '/veilarbportefoljeflatefs/veiledere')
        );
    }
});

Cypress.Commands.add('klikkTab', tab => {
    if (tab === 'VEILEDERGRUPPER') {
        if (cy.getByTestId('sidebar-header').should('not.equal', 'Veiledergrupper')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar-header').contains('Veiledergrupper')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Veiledergrupper');
    } else if (tab === 'MINE_FILTER') {
        if (cy.getByTestId('sidebar-header').should('not.equal', 'Mine filter')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar-header').contains('Mine filter')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Mine filter');
    } else if (tab === 'STATUS') {
        if (cy.getByTestId('sidebar-header').should('not.equal', 'Status')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar-header').contains('Status')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Status');
    } else if (tab === 'FILTER') {
        if (cy.getByTestId('sidebar-header').should('not.equal', 'Filter')) {
            return (
                cy.getByTestId(`sidebar-tab_${tab}`).click({force: true}) &&
                cy.getByTestId('sidebar-header').contains('Filter')
            );
        }
        return cy.getByTestId('sidebar-header').contains('Filter');
    }
});

Cypress.Commands.add('checkbox', testid => {
    cy.getByTestId(testid).should('not.be.checked').check({force: true});
    cy.getByTestId(testid).should('be.checked');
});

Cypress.Commands.add('checkboxFirst', testid => {
    cy.getByTestId(testid).first().should('not.be.checked').check({force: true});
    cy.getByTestId(testid).first().should('be.checked');
});

Cypress.Commands.add('checkboxLast', testid => {
    cy.getByTestId(testid).last().should('not.be.checked').check({force: true});
    cy.getByTestId(testid).last().should('be.checked');
});

Cypress.Commands.add('apneLukkeFilterDropdown', filternavn => {
    cy.getByTestId(`dropdown-knapp_${filternavn}`).should('be.visible').click();
});

Cypress.Commands.add('apneArbeidslistePaPerson', () => {
    cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
        .children()
        .first()
        .children()
        .should('have.class', 'expand')
        .click();

    cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
        .children()
        .first()
        .children()
        .should('have.class', 'collapse')
        .first();
});

Cypress.Commands.add('lukkeArbeidslistePaPerson', () => {
    cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
        .children()
        .first()
        .children()
        .should('have.class', 'collapse')
        .click();

    cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
        .children()
        .first()
        .children()
        .should('have.class', 'expand')
        .first();
});

Cypress.Commands.add('apneArbeidslistepaaNyBruker', () => {
	cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
	cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
	cy.get('.legg-i-arbeidsliste').should('not.exist');
	cy.getByTestId('legg-i-arbeidsliste_knapp')
		.should('be.enabled')
		.click();
	cy.get('.legg-i-arbeidsliste').should('be.visible');
});

Cypress.Commands.add('lagreEtFilter', (filternavn) => {
	cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({
		force: true
	});

	cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible');

	cy.wait(500);
	cy.getByTestId('sidebar-tab_FILTER').click();

	cy.apneLukkeFilterDropdown('alder');

	cy.getByTestId('filter_0-19').check({force: true});

	cy.getByTestId('filtreringlabel_-19-ar').should('be.visible');

	cy.getByTestId('lagre-filter_knapp').click();

	cy.getByTestId('lagre-nytt-filter_modal_knapp').click();

	cy.getByTestId('lagre-nytt-filter_modal_navn-input').clear().type(filternavn);

	cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();

});

Cypress.Commands.add('lagreVeiledergruppe', (gruppenavn) => {
	cy.klikkTab('VEILEDERGRUPPER');
	cy.getByTestId('veiledergruppe_ny-gruppe_knapp').click();

	cy.getByTestId('veiledergruppe_modal_gruppenavn-input').clear();

	cy.wait(1000);

	cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type('Andersen');

	cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
		force: true
	});

	cy.getByTestId('veiledergruppe_modal_sok-veileder-input').clear().type('Johansen');

	cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
		force: true
	});

	cy.getByTestId('veiledergruppe_modal_gruppenavn-input').clear().type(gruppenavn);

	cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
});
