before('Start server', () => {
    cy.configure();
});

describe('Diverse', () => {
    it('Verifiser tilbakemeldingsundersøkelse', () => {
        cy.getByTestId('tilbakemelding_modal').should('not.exist');
        cy.getByTestId('tilbakemelding_fab_knapp')
            .should('be.visible')
            .click();
        cy.getByTestId('tilbakemelding_modal').should('be.visible');

        //TODO toggle hvis tilbakemeldingsundersøkelsen er checkboxer/tilfredshet
        //Hvis checkbox
        // cy.getByTestId('tilfredshet_send-knapp')
        //     .click({force: true});
        //
        // cy.getByTestId('tilfredshet_feilmelding')
        //     .should('be.visible');
        //
        // cy.checkbox('checkboxvalg_1');
        // cy.checkbox('checkboxvalg_4');
        // cy.checkbox('checkboxvalg_7');
        // cy.checkbox('checkboxvalg_8');
        //
        // cy.getByTestId('checkboxvalg_2').should('be.disabled');
        // cy.getByTestId('checkboxvalg_3').should('be.disabled');
        // cy.getByTestId('checkboxvalg_5').should('be.disabled');
        // cy.getByTestId('checkboxvalg_6').should('be.disabled');

        // Hvis tilfredshet
        cy.getByTestId('tilfredshet-ikon_5')
            .should('be.visible')
            .click();
        cy.getByTestId('tilfredshet-ikon_5').should('have.class', 'tilfredshet-valg__ikon--valgt');
        cy.getByTestId('tilfredshet-ikon_4').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');
        cy.getByTestId('tilfredshet-ikon_3').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');
        cy.getByTestId('tilfredshet-ikon_2').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');
        cy.getByTestId('tilfredshet-ikon_1').should('have.class', 'tilfredshet-valg__ikon--ikke-valgt');

        cy.getByTestId('tilfredshet_kommentarfelt')
            .should('be.empty')
            .click()
            .type('How do you throw a space party? You planet!');

        cy.wait(1000);
        cy.getByTestId('tilfredshet_send-knapp').click({force: true});
        cy.wait(1000);
        cy.getByTestId('tilfredshet_send-knapp').should('not.exist');
        cy.getByTestId('tilbakemelding_modal_takk').should('be.visible');
        cy.getByTestId('tilbakemelding_modal').should('not.exist');
        cy.getByTestId('tilbakemelding_fab_knapp_trykket')
            .should('be.visible')
            .click();
        cy.get('body').click(20, 500);
        cy.getByTestId('tilbakemelding_fab_knapp').should('not.exist');
        cy.getByTestId('tilbakemelding_modal_takk').should('not.exist');
    });

    it('Paginering', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.get('.brukerliste')
            .children()
            .should('have.length', 50);
        cy.getByTestId('paginering').children().children().should('have.length', 5);
        cy.getByTestId('paginering').children().children().last().click().click();
        cy.get('.brukerliste')
            .children()
            .should('have.length', 23);
        cy.getByTestId('se-flere_knapp')
            .should('be.visible')
            .click();
        cy.wait(1000);
        cy.get('.brukerliste')
            .children()
            .should('have.length', 123);
        cy.getByTestId('se-faerre_knapp')
            .should('be.visible')
            .click();
        cy.gaTilOversikt('enhetens-oversikt');
    });

    const aasen = 'Aasen';
    it('Søk på navn', () => {
        cy.getByTestId('sok-navn-fnr_input')
            .click()
            .type('andersen');
        cy.getByTestId('filtreringlabel_sok-pa-navn')
            .should('be.visible')
            .click();
    });

    it('Søk på fnr', () => {
        cy.getByTestId('sok-navn-fnr_input')
            .click()
            .clear()
            .type('10108000398');
        cy.getByTestId('filtreringlabel_sok-pa-fodselsnummer')
            .should('be.visible')
            .click();
    });

    it('Søk etter veileder', () => {
        cy.get('.navds-loader').should('not.exist');
        cy.getByTestId('sidebar_content-container').should('be.visible');
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true});
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').should('be.checked');

        cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible');
        cy.getByTestId('sok-veileder_knapp').click();
        cy.getByTestId('sok-filter_input')
            .click()
            .type(aasen);
        cy.checkbox('sok-veileder_rad_0');
        cy.getByTestId('sok-veileder_velg-knapp').click();
        cy.getByTestId('filtrering_label-container')
            .contains(aasen)
            .click();
        cy.getByTestId('filtreringlabel_ufordelte-brukere')
            .should('be.visible')
            .click();
    });

    it('Velg andre kolonner', () => {
        cy.getByTestId('alertstripe_filtrering').should('be.visible');
        cy.getByTestId('filter_checkboks-container_iavtaltAktivitet').check({
            force: true
        });
        cy.getByTestId('sorteringheader_veileder').should('be.visible');
        cy.getByTestId('sorteringheader_oppfolging-startet').should('not.exist');
        cy.getByTestId('dropdown-knapp_velg-kolonner')
            .contains('Velg kolonner')
            .click({force: true});
        cy.getByTestId('velg-kolonne-rad_veileder').uncheck({force: true});
        cy.getByTestId('velg-kolonne-rad_oppfolgingstartet')
            .should('be.enabled')
            .check({force: true});
        cy.getByTestId('sorteringheader_veileder').should('not.exist');
        cy.getByTestId('sorteringheader_oppfolging-startet').should('be.visible');
        cy.getByTestId('filtreringlabel_i-avtalt-aktivitet')
            .should('be.visible')
            .click();
    });

    it('Tildel veileder', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');

        cy.getByTestId('tildel-veileder_knapp')
            .should('be.enabled')
            .click({force: true});

        cy.getByTestId('tildel-veileder_dropdown').should('be.visible');

        cy.checkbox('tildel-veileder_valg_0');
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.exist');
        cy.getByTestId(`tildel-veileder_velg-knapp`)
            .should('be.visible')
            .click();
        cy.wait(1000);
        cy.getByTestId('modal-suksess_tildel-veileder')
            .should('be.visible')
            .click();
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.exist');
    });
});
