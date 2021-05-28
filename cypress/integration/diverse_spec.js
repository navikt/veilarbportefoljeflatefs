before('Start server', () => {
    cy.configure();
});

describe('Diverse', () => {
    //TODO toggle denne når tvungen stepper er av/på
    // before('Tvungen stepper', () => {
    //     cy.getByTestId('endringslogg_tour-modal').should('be.visible');
    //     cy.getByTestId('endringslogg_neste-knapp')
    //         .click();
    //     cy.getByTestId('endringslogg_neste-knapp')
    //         .click();
    //     cy.getByTestId('endringslogg_ferdig-knapp')
    //         .click();
    //     cy.getByTestId('endringslogg_tour-modal').should('not.exist');
    // });
    it('Verifiser blå prikk og stepper', () => {
        cy.getByTestId('endringslogg_nye-notifikasjoner').should('be.visible');
        cy.getByTestId('endringslogg-innhold').should('not.exist');
        cy.getByTestId('endringslogg-knapp').click();
        cy.getByTestId('endringslogg-innhold').should('be.visible');
        cy.getByTestId('endringslogg_tour-modal').should('not.exist');
        cy.getByTestId('endringslogg_se-hvordan-knapp')
            .first()
            .click();
        cy.getByTestId('endringslogg_tour-modal').should('be.visible');
        cy.getByTestId('endringslogg_forrige-knapp').should('be.hidden');
        cy.getByTestId('endringslogg_neste-knapp').click();
        cy.getByTestId('endringslogg_forrige-knapp').should('be.visible');
        cy.getByTestId('endringslogg_stegviser').then($element => {
            if ($element.find('.stegviser__steg').length === 3) {
                return cy.getByTestId('endringslogg_neste-knapp').click();
            }
        });
        cy.getByTestId('endringslogg_ferdig-knapp').click();
        cy.getByTestId('endringslogg_tour-modal').should('not.exist');
        cy.getByTestId('endringslogg-innhold').should('be.visible');
        cy.getByTestId('endringslogg-knapp').click();
        cy.getByTestId('endringslogg-innhold').should('not.exist');
        cy.getByTestId('endringslogg_nye-notifikasjoner').should('not.exist');
    });

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
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre').should('be.enabled');
        cy.getByTestId('paginering-tall_7').should('be.visible');
        cy.get('.brukerliste')
            .children()
            .should('have.length', 20);
        cy.getByTestId('se-alle_knapp')
            .should('be.visible')
            .click();
        cy.wait(1000);
        cy.getByTestId('paginering-tall_7').should('not.exist');
        cy.get('.brukerliste')
            .children()
            .should('have.length', 123);
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre').should('be.disabled');
        cy.getByTestId('se-faerre_knapp')
            .should('be.visible')
            .click();
        cy.getByTestId('paginering-tall_2').should('not.exist');
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre')
            .should('be.enabled')
            .click();
        cy.getByTestId('paginering-tall_2').should('be.visible');
        cy.getByTestId('paginering-tall_1')
            .should('be.visible')
            .click();
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre').should('be.enabled');
        cy.gaTilOversikt('enhetens-oversikt');
    });

    const forsteVeileder = 'Aasen, Markus';
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
        cy.get('.spinner').should('not.exist');
        cy.getByTestId('sidebar_content-container').should('be.visible');
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true});
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').should('be.checked');

        cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible');
        cy.getByTestId('sok-veileder_knapp').click();
        cy.getByTestId('sok-filter_input')
            .click()
            .type(forsteVeileder);
        cy.checkbox('sok-veileder_rad_0');
        cy.getByTestId('sok-veileder_velg-knapp').click();
        cy.getByTestId('filtrering_label-container')
            .contains(forsteVeileder)
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
