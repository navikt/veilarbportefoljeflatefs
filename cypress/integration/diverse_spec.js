before('Start server', () => {
    cy.configure();
});
describe('Diverse', () => {
    it('Verifiser blå prikk og stepper', () => {
        cy.getByTestId('endringslogg_nye-notifikasjoner').should('be.visible');
        cy.getByTestId('endringslogg-innhold').should('not.exist');
        cy.getByTestId('endringslogg-knapp').click();
        cy.getByTestId('endringslogg-innhold').should('be.visible');
        cy.getByTestId('endringslogg_tour-modal').should('not.exist');
        cy.getByTestId('endringslogg_se-hvordan-knapp')
            .contains('Se hvordan')
            .first()
            .click();
        cy.getByTestId('endringslogg_tour-modal').should('be.visible');
        cy.getByTestId('endringslogg_forrige-knapp').should('be.hidden');
        cy.getByTestId('endringslogg_neste-knapp')
            .contains('Neste')
            .click();
        cy.getByTestId('endringslogg_forrige-knapp').should('be.visible');
        cy.getByTestId('endringslogg_stegviser').then($element => {
            if ($element.find('.stegviser__steg').length === 3) {
                return cy
                    .getByTestId('endringslogg_neste-knapp')
                    .contains('Neste')
                    .click();
            }
        });
        cy.getByTestId('endringslogg_ferdig-knapp')
            .contains('Ferdig')
            .click();
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
        cy.getByTestId('tilfredshet_send-knapp')
            .contains('Send')
            .click({force: true});
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

    it('Paginering og til toppen-knapp', () => {
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
        cy.getByTestId('til-toppen_knapp').should('be.hidden');
        cy.scrollTo(0, 2000);
        cy.getByTestId('til-toppen_knapp')
            .should('not.be.hidden')
            .click();
        cy.getByTestId('til-toppen_knapp').should('be.hidden');
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
        cy.getByTestId('filtreringlabel')
            .contains('Søk på navn')
            .should('be.visible')
            .click();
    });

    it('Søk på fnr', () => {
        cy.getByTestId('sok-navn-fnr_input')
            .click()
            .clear()
            .type('10108000398');
        cy.getByTestId('filtreringlabel')
            .contains('Søk på fødselsnummer')
            .should('be.visible')
            .click();
    });

    it('Søk etter veileder', () => {
        cy.get('.spinner').should('not.exist');
        cy.getByTestId('sidebar_content-container')
            .contains('Status')
            .should('be.visible');
        cy.checkbox('filter_checkboks-container_ufordeltebruker');
        cy.getByTestId('filtreringlabel').contains('Ufordelte brukere');
        cy.getByTestId('sok-veileder_knapp').click();
        cy.getByTestId('sok-filter_input')
            .click()
            .type(forsteVeileder);
        cy.checkbox('sok-veileder_rad_0');
        cy.getByTestId('sok-veileder_velg-knapp').click();
        cy.getByTestId('filtreringlabel')
            .contains(forsteVeileder)
            .click();
        cy.getByTestId('filtreringlabel')
            .contains('Ufordelte brukere')
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
        cy.getByTestId('filtreringlabel')
            .contains('I avtalt aktivitet')
            .should('be.visible')
            .click();
    });

    it('Tildel veileder', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.getByTestId('tildel-veileder_dropdown').should('not.exist');
        cy.getByTestId('tildel-veileder_knapp').click();
        cy.getByTestId('tildel-veileder_dropdown').should('be.visible');
        cy.checkbox('tildel-veileder_valg_0');
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.exist');
        cy.getByTestId(`tildel-veileder_velg-knapp`)
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('modal-suksess_tildel-veileder')
            .should('be.visible')
            .click();
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.exist');
    });
});

describe('Arbeidsliste', () => {
    let fornavn = '';
    let antallMedArbeidsliste = 0;
    let antallMedArbeidslisteEtterOppretting = 0;
    let tittel;
    let kommentar;
    let antallFor = 0;
    let antallEtter = 0;
    const redigertTittel = 'Redigering av tittel';
    const redigertKommentar = 'Redigering av kommentar';
    let antallForSletting = 0;
    let antallEtterSletting = 0;
    const nyTittel = 'Skal ikke lagres';
    const nyKommentar = 'Kommentar skal heller ikke lagres';

    it('Lag én ny arbeidsliste og sjekk validering', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.getByTestId('legg-i-arbeidsliste_knapp')
            .should('be.enabled')
            .contains('Legg i arbeidsliste')
            .click();
        cy.get('.legg-i-arbeidsliste').should('be.visible');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp')
            .contains('Lagre')
            .click();
        cy.getByTestId('modal_arbeidsliste_form').contains('Du må fylle ut en tittel');
        cy.getByTestId('modal_arbeidsliste_form').contains('Du må fylle ut en kommentar');
        cy.getByTestId('modal_arbeidsliste_tittel').type('validering');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp')
            .contains('Lagre')
            .click();
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en tittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar');
        cy.get('#fristInput').type('01.03.2066');
        cy.getByTestId('modal_arbeidslistekategori_GUL').click();
    });
    it('Lagre fornavn', () => {
        cy.getByTestId('modal_legg-i-arbeidsliste_navn').then($navn => {
            fornavn = $navn.text().split(' ')[0];
        });
    });
    it('Lagre ny arbeidsliste', () => {
        cy.getByTestId('modal_arbeidsliste_lagre-knapp')
            .contains('Lagre')
            .click();
        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.getByTestId('brukerliste_element_arbeidsliste-GUL')
            .contains(fornavn)
            .first();
    });
    it('Lagre antall med arbeidsliste', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallMedArbeidsliste += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallMedArbeidsliste).to.be.greaterThan(0);
            });
    });
    it('Lag to nye arbeidslister', () => {
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.checkboxLast('min-oversikt_brukerliste-checkbox');

        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.getByTestId('legg-i-arbeidsliste_knapp')
            .should('be.enabled')
            .contains('Legg i arbeidsliste')
            .click();
        cy.get('.legg-i-arbeidsliste').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');
        cy.getByTestId('modal_arbeidslistekategori_LILLA').click();

        cy.getByTestId('modal_arbeidsliste_tittel_1').type('heiheihei hallå');
        cy.getByTestId('modal_arbeidsliste_kommentar_1').type('Team Voff er best i test hehehe');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp')
            .contains('Lagre')
            .click();
        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallMedArbeidslisteEtterOppretting += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallMedArbeidslisteEtterOppretting).to.be.equals(antallMedArbeidsliste + 2);
            });
    });

    it('Rediger arbeidsliste', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket')
            .first();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen')
            .first();

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').then($tittel => {
            tittel = $tittel.text();
        });

        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').then($kommentar => {
            kommentar = $kommentar.text();
        });
        cy.get('.rediger-arbeidsliste').should('not.exist');
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel')
            .clear()
            .type(redigertTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar')
            .clear()
            .type(redigertKommentar);
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.get('.rediger-arbeidsliste').should('not.exist');

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').contains(redigertTittel);
        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').contains(redigertKommentar);
    });

    it('Slett arbeidsliste via fjern-knapp', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').then(ant => {
            antallFor += Cypress.$(ant).length;
        });
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox_arbeidsliste');
        cy.getByTestId('fjern-fra-arbeidsliste_knapp')
            .should('be.enabled')
            .click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp')
            .should('be.visible')
            .click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .should('be.visible')
            .then(ant => {
                antallEtter += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallEtter).to.be.equals(antallFor - 1);
            });
    });

    it('Slett arbeidsliste via rediger-modal', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').then(ant => {
            antallForSletting += Cypress.$(ant).length;
        });
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket');
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen');
        cy.get('.rediger-arbeidsliste').should('not.exist');
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible');
        cy.getByTestId('modal_rediger-arbeidsliste_fjern-knapp').click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp')
            .should('be.visible')
            .click();
        cy.get('.spinner').should('be.visible');
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');
        cy.get('.spinner').should('not.exist');
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .should('be.visible')
            .then(ant => {
                antallEtterSletting += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallEtterSletting).to.be.equals(antallForSletting - 1);
            });
    });

    it('Sjekk validering i rediger arbeidsliste-modal', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket')
            .first();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen');

        cy.get('.rediger-arbeidsliste').should('not.exist');
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp')
            .contains('Lagre')
            .click();
        cy.getByTestId('modal_rediger-arbeidsliste_form').contains('Du må fylle ut en tittel');
        cy.getByTestId('modal_rediger-arbeidsliste_form').contains('Du må fylle ut en kommentar');

        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann');
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp')
            .contains('Lagre')
            .click();
        cy.getByTestId('modal_rediger-arbeidsliste_form').should('not.contain', 'Du må fylle ut en tittel');

        cy.getByTestId('modal_arbeidsliste_kommentar').type('Her er en kjempefin kommentar truddelu');
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp')
            .contains('Lagre')
            .click();
        cy.get('.rediger-arbeidsliste').should('not.exist');

        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .children()
            .first()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen');
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket');
    });

    it('Avbryt redigering, ingen endringer lagret', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket')
            .first();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .first()
            .click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste')
            .children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen')
            .first();
    });
    it('Lagre tittel og kommentar', () => {
        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').then($tittel => {
            tittel = $tittel.text();
        });
        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').then($kommentar => {
            kommentar = $kommentar.text();
        });
    });

    it('Avbryt redigering, ingen endringer lagret', () => {
        cy.get('.rediger-arbeidsliste').should('not.exist');
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel')
            .clear()
            .type(nyTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar')
            .clear()
            .type(nyKommentar);
        cy.getByTestId('modal_rediger-arbeidsliste_avbryt-knapp')
            .contains('Avbryt')
            .click();

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').should('contain', tittel);
        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').should('contain', kommentar);
    });
});
