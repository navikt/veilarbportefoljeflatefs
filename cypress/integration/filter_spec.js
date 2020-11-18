const fraAlder = '2';
const tilAlder = '34';
const hoyAlder = '88';

const klikkVelg = () => {
    it('Klikk velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
    });
};

const klikkAlderDropdown = () => {
    it('Klikk alder-dropdown', () => {
        cy.getByTestId('dropdown-knapp_alder').click();
    });
};

it('Start server', () => {
    cy.configure();
});

describe('Sjekk at alders-input fungerer', () => {
    it('Gå til filter-tab', () => {
        cy.klikkTab('FILTER');
    });
    klikkAlderDropdown();
    it('Skriv inn tall i inputfeltene', () => {
        cy.getByTestId('checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('filter_alder-fra')
            .click()
            .type(tilAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .type(fraAlder);
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('not.be.visible');
    });
    klikkVelg();
    it('Se validering', () => {
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Fra-alder kan ikke være større enn til-alder.');
    });
    it('Skriv inn riktige tall i inputfeltene', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.be.visible');
    });
    klikkVelg();
    it('Etiketten har "2-34 år"', () => {
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-' + tilAlder + ' år');
    });
    it('Velg checkbox', () => {
        cy.getByTestId('dropdown-knapp_alder').click();
        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);
        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);
        cy.checkbox('filter_40-49');
        cy.getByTestId('filter_alder-fra').should('have.value', '');
        cy.getByTestId('filter_alder-til').should('have.value', '');
    });
    klikkVelg();
    it('Etiketten har "40-49 år"', () => {
        cy.getByTestId('filtreringlabel').contains('40-49 år');
    });
    klikkAlderDropdown();
    it('Skriv kun inn fra-tall', () => {
        cy.getByTestId('filter_40-49').should('be.checked');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.be.visible');
        cy.getByTestId('filter_40-49').should('not.be.checked');
    });
    klikkVelg();
    it('Etiketten har "2-70 år"', () => {
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-70 år');
    });
    klikkAlderDropdown();
    it('Validering av for høyt tall', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(hoyAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .should('have.value', '');
    });
    klikkVelg();
    it('Se validering', () => {
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Du må skrive et tall lavere enn 70 i fra-feltet hvis til-feltet står tomt.');
    });
    it('Skriv kun inn til-tall', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear();
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
    });
    klikkVelg();
    it('Etiketten har "0-34 år"', () => {
        cy.getByTestId('filtreringlabel').contains('0-' + tilAlder + ' år');
    });
});

describe('Sjekk at "utdanningen godkjent og bestått" fungerer', () => {
    it('Gå til filter-tab', () => {
        cy.klikkTab('FILTER');
    });
    it('Klikk "Er utdanningen godkjent og bestått"-dropdown', () => {
        cy.getByTestId('dropdown-knapp_er-utdanningen-godkjent-og-bestatt').click();
    });

    it('Kontroller oppforsel utdanningGodkjent', () => {
        cy.getByTestId('double-checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('double-checkbox-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('filter_utdanningGodkjent_NEI').check({force: true});

        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('Utdanning godkjent: Nei');

        cy.getByTestId('dropdown-knapp_er-utdanningen-godkjent-og-bestatt').click();
    });

    it('Kontroller oppforsel utdanningBestatt', () => {
        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});
        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible');
        cy.getByTestId('filter_utdanningBestatt_JA').uncheck({force: true});

        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});
        cy.getByTestId('filter_utdanningBestatt_NEI').check({force: true});

        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();

        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Nei');
        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Ja');
    });
});
