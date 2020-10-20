describe('Spørreundersøkelse', () => {
    it('Start server', () => {
        cy.configure();
    })
    it('Klikk på tilbakemeldingsknapp', () => {
        cy.getByTestId('tilbakemelding_modal').should('not.be.visible');
        cy.getByTestId('tilbakemelding_fab_knapp').should('be.visible').click();
        cy.getByTestId('tilbakemelding_modal').should('be.visible');
    })
    it('Legg igjen tilbakemelding', () => {
        cy.getByTestId('tilfredshet-ikon_5').should('be.visible').click();
        cy.getByTestId('tilfredshet-ikon_5').should('have.class', 'tilfredshet-valg__ikon--valgt');
        cy.getByTestId('tilfredshet-ikon_4').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');
        cy.getByTestId('tilfredshet-ikon_3').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');
        cy.getByTestId('tilfredshet-ikon_2').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');
        cy.getByTestId('tilfredshet-ikon_1').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');
        cy.getByTestId('tilfredshet_kommentarfelt').should('be.empty').click()
            .type('How do you throw a space party? You planet!');
    })
    it('Send undersøkelse og lukk modal', () => {
        cy.getByTestId('tilfredshet_send-knapp').contains('Send').click();
        cy.getByTestId('tilbakemelding_modal_takk').should('be.visible');
        cy.getByTestId('tilbakemelding_modal').should('not.be.visible');
        cy.getByTestId('tilbakemelding_fab_knapp_trykket').should('be.visible').click();
        cy.getByTestId('tilbakemelding_modal_takk').should('not.be.visible');
        cy.getByTestId('tilbakemelding_fab_knapp_trykket').should('not.be.visible');
    })
})
