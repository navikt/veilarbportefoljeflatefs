const fraAlder = '2';
const tilAlder = '34';

describe('Sjekk at nytt alders-input fungerer', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til filter-tab', () => {
        cy.klikkTab('FILTER');
    });
    it('Klikk alder-dropdown', () => {
        cy.getByTestId('dropdown-knapp_Alder').click();
    });
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
    it('Klikk velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
    });
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
    it('Klikk velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
    });
    it('Etiketten har "2-34 år"', () => {
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-' + tilAlder + ' år');
    });
    it('Velg checkbox', () => {
        cy.getByTestId('dropdown-knapp_Alder').click();
        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);
        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);
        cy.checkbox('filter_40-49');
        cy.getByTestId('filter_alder-fra').should('have.value', '');
        cy.getByTestId('filter_alder-til').should('have.value', '');
    });
    it('Klikk velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
    });
    it('Etiketten har "40-49 år"', () => {
        cy.getByTestId('filtreringlabel').contains('40-49 år');
    });
    it('Klikk alder-dropdown', () => {
        cy.getByTestId('dropdown-knapp_Alder').click();
    });
    it('Skriv kun inn fra-tall', () => {
        cy.getByTestId('filter_40-49').should('be.checked');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_40-49').should('not.be.checked');
    });
    it('Klikk velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
    });
    it('Etiketten har "2-70 år"', () => {
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-70 år');
    });
    it('Klikk alder-dropdown', () => {
        cy.getByTestId('dropdown-knapp_Alder').click();
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
    it('Klikk velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
    });
    it('Etiketten har "0-34 år"', () => {
        cy.getByTestId('filtreringlabel').contains('0-' + tilAlder + ' år');
    });
});
