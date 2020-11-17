const fraAlder = '2';
const tilAlder = '34';

describe('Sjekk at nytt alders-input fungerer', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til filter-tab', () => {
        cy.klikkTab('FILTER');
    });
    it('Klikk utdanningen-godkjent-og-bestatt', () => {
        cy.getByTestId('dropdown-knapp_er-utdanningen-godkjent-og-bestatt').click();
    });
    it('Kontroller oppforsel', () => {
        cy.getByTestId('double-checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('double-checkbox-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('filter_utdanningGodkjent_NEI').click({
            force: true
        });
        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible');
        cy.getByTestId('filter_utdanningGodkjent_NEI').click({
            force: true
        });
        cy.getByTestId('double-checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('filter_utdanningBestatt_JA').click({
            force: true
        });
        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible');

        cy.getByTestId('filter_utdanningBestatt_JA').click({
            force: true
        });

        cy.getByTestId('double-checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');

        cy.getByTestId('filter_utdanningBestatt_JA').click({
            force: true
        });

        cy.getByTestId('filter_utdanningBestatt_NEI').click({
            force: true
        });
        cy.getByTestId('filter_utdanningGodkjent_NEI').click({
            force: true
        });

        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible');
    });

    it('Kontroller korrekt filter labels', () => {
        cy.getByTestId('filter_utdanningBestatt_NEI').should('be.checked');
        cy.getByTestId('filter_utdanningBestatt_JA').should('be.checked');
        cy.getByTestId('filter_utdanningGodkjent_NEI').should('be.checked');

        cy.getByTestId('double-checkbox-filterform_velg-knapp').click();

        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Nei');
        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Ja');
        cy.getByTestId('filtreringlabel').contains('Utdanning godkjent: Nei');
    });
});
