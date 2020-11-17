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
        cy.getByTestId('dropdown-knapp_Er-utdanningen-godkjent-og-bestått').click();
    });
});
