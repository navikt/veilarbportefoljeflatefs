before('Start server', () => {
    cy.configure();
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
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
        cy.get('.legg-i-arbeidsliste').should('be.visible');
        cy.getByTestId('modal_arbeidsliste_tittel').type('valideringstest på at det ikke er lov med tegn mer enn 30');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();
        cy.getByTestId('modal_arbeidsliste_form').contains('Tittelen kan ikke være lenger enn 30 tegn.');
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en tittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar skal ikke være lengre enn 500 tegn, så her kommer litt lorum ipsum: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.');
        cy.getByTestId('modal_arbeidsliste_form').contains('Du må korte ned teksten til 500 tegn');
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en kommentar');
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_tittel').type('validering');
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar')
        cy.get('#fristDatovelger').type('01.03.2066');
        cy.getByTestId('modal_arbeidslistekategori_GUL').click();
    });

    it('Lagre fornavn', () => {
        cy.getByTestId('modal_legg-i-arbeidsliste_navn').then($navn => {
            fornavn = $navn.text().split(' ')[0];
        });
    });

    it('Lagre ny arbeidsliste', () => {
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');
        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.getByTestId('brukerliste_element_arbeidsliste-GUL').contains(fornavn).first();
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
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.checkboxLast('min-oversikt_brukerliste-checkbox');

        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
        cy.get('.legg-i-arbeidsliste').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');
        cy.getByTestId('modal_arbeidslistekategori_LILLA').click();

        cy.getByTestId('modal_arbeidsliste_tittel_1').type('heiheihei hallå');
        cy.getByTestId('modal_arbeidsliste_kommentar_1').type('Team Voff er best i test hehehe');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();
        cy.get('.legg-i-arbeidsliste').should('not.exist');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallMedArbeidslisteEtterOppretting += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallMedArbeidslisteEtterOppretting).to.be.equals(antallMedArbeidsliste + 2);
            });
    });

    it('Rediger arbeidsliste', () => {
        cy.apneArbeidslistePaPerson();

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').then($tittel => {
            tittel = $tittel.text();
        });

        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').then($kommentar => {
            kommentar = $kommentar.text();
        });

        cy.get('.arbeidsliste-modal').should('not.exist');

        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').should('be.visible').click();

        cy.get('.arbeidsliste-modal').should('be.visible');

        cy.get('.modal-header').contains('Rediger arbeidsliste');

        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(redigertTittel);

        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(redigertKommentar);

        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();

        cy.get('.arbeidsliste-modal').should('not.exist');

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').contains(redigertTittel);

        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').contains(redigertKommentar);
    });

    it('Slett arbeidsliste via fjern-knapp', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').then(ant => {
            antallFor += Cypress.$(ant).length;
        });
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox_arbeidsliste');
        cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('be.enabled').click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');
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

        cy.apneArbeidslistePaPerson();

        cy.get('.arbeidsliste-modal').should('not.exist');

        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();

        cy.get('.arbeidsliste-modal').should('be.visible');

        cy.getByTestId('modal_rediger-arbeidsliste_fjern-knapp').click();

        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();

        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');

        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');

        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

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
        cy.apneArbeidslistePaPerson();

        cy.get('.arbeidsliste-modal').should('not.exist');

        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();

        cy.get('.arbeidsliste-modal').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();
        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann her er det mer enn 30 tegn');
        cy.getByTestId('modal_rediger-arbeidsliste_form').contains('Tittelen kan ikke være lenger enn 30 tegn.');
        cy.getByTestId('modal_rediger-arbeidsliste_form').should('not.contain', 'Du må fylle ut en tittel');
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('Her er en kjempefin kommentar truddelu');
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.get('.arbeidsliste-modal').should('not.exist');

        cy.lukkeArbeidslistePaPerson();
    });

    it('Sjekk at man kan redigere til tom tittel og tom kommentar ', () => {
        cy.apneArbeidslistePaPerson();

        cy.get('.arbeidsliste-modal').should('not.exist');

        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();

        cy.get('.arbeidsliste-modal').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();

        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();

        cy.get('.arbeidsliste-modal').should('not.exist');

        cy.lukkeArbeidslistePaPerson();

    });

    it('Lagre tittel og kommentar', () => {
        cy.apneArbeidslistePaPerson();

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').then($tittel => {
            tittel = $tittel.text();
        });
        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').then($kommentar => {
            kommentar = $kommentar.text();
        });
    });

    it('Avbryt redigering, ingen endringer lagret', () => {
        cy.get('.arbeidsliste-modal').should('not.exist');
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.arbeidsliste-modal').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(nyTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(nyKommentar);
        cy.getByTestId('modal_rediger-arbeidsliste_avbryt-knapp').click();

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').should('contain', tittel);
        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').should('contain', kommentar);

        cy.lukkeArbeidslistePaPerson();
    });
});
