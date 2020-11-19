describe('Slett alle filtre', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Velg to statusfiltre', () => {
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({
            force: true
        });
        cy.getByTestId('filter_checkboks-container_inaktiveBrukere').check({
            force: true
        });
        cy.getByTestId('filtreringlabel').contains('Ufordelte brukere');
        cy.getByTestId('filtreringlabel').contains('Ikke servicebehov');
        cy.getByTestId('filtreringlabel').should('have.length', 2);
    });
    it('Klikk på filter-tab', () => {
        cy.klikkTab('FILTER');
    });
    it('Velg to aktivitetsfiltre', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.disabled');
        cy.getByTestId('dropdown-knapp_aktivitet').click();
        cy.getByTestId('filter_aktivitet-STILLING-ja').check({force: true});
        cy.getByTestId('filter_aktivitet-TILTAK-ja').check({force: true});
        cy.getByTestId('filter_aktivitet_velg-knapp').click();
        cy.getByTestId('filtreringlabel').contains('Stilling bruker skal søke: JA');
        cy.getByTestId('filtreringlabel').contains('Tiltak gjennom NAV: JA');
        cy.getByTestId('filtreringlabel').contains('Slett alle filtervalg');
        cy.getByTestId('filtreringlabel').should('have.length', 5);
    });
    it('Velg to tiltakstyper', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype')
            .should('be.enabled')
            .click();

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('filter_PRAKSKJERM').check({force: true});

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('not.be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.visible');
        cy.getByTestId('filter_AVKLARAG').check({force: true});
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .should('be.enabled')
            .click();
    });
    it('Klikk på slett alle filtervalg-etikett', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 7);
        cy.getByTestId('filtreringlabel')
            .contains('Slett alle filtervalg')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
    });
    it('Alertstripen er synlig', () => {
        cy.getByTestId('alertstripe_filtrering')
            .should('be.visible')
            .contains('Du må gjøre en filtrering for å se brukere i listen.');
    });
});
