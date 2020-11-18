const fraAlder = '2';
const tilAlder = '34';
const hoyAlder = '88';

before('Start server', () => {
    cy.configure();
});

beforeEach('Gå til filter-tab', () => {
    cy.klikkTab('FILTER');
    cy.getByTestId('dropdown-knapp_alder').click();
});

afterEach('Gå til status-tab', () => {
    cy.klikkTab('STATUS');
});

describe('Alder-input', () => {
    it('Skal validere for stor fra-alder', () => {
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
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Fra-alder kan ikke være større enn til-alder.');
        cy.get('body').click(20, 500);
    });

    it('Skal fungere med riktig input-verdier og med checkboxer', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-' + tilAlder + ' år');
        cy.getByTestId('dropdown-knapp_alder').click();
        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);
        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);
        cy.checkbox('filter_40-49');
        cy.getByTestId('filter_alder-fra').should('have.value', '');
        cy.getByTestId('filter_alder-til').should('have.value', '');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('40-49 år');
    });

    it('Skal fungere med tomt til-input', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.be.visible');
        cy.getByTestId('filter_40-49').should('not.be.checked');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-70 år');
    });

    it('Skal validere med for høy fra-input og tomt til-input', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(hoyAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .should('have.value', '');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Du må skrive et tall lavere enn 70 i fra-feltet hvis til-feltet står tomt.');
    });

    it('Skal fungere med tomt fra-input', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear();
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('0-' + tilAlder + ' år');
    });
});
