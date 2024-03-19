before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();

    // Gå til Min oversikt-fana
    cy.gaTilOversikt('min-oversikt');
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
        // Vel fyrste brukar i lista
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');

        // Opne legg-i-arbeidsliste-modal
        cy.get('.legg-i-arbeidsliste_modal').should('not.exist');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
        cy.get('.legg-i-arbeidsliste_modal').should('be.visible');

        // Testar validering av tittel-input
        cy.getByTestId('modal_arbeidsliste_tittel').type('valideringstest på at det ikke er lov med tegn mer enn 30');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();
        cy.getByTestId('modal_arbeidsliste_form').contains('Tittelen kan ikke være lenger enn 30 tegn.');
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en tittel');

        // Testar validering av kommentar-input
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar skal ikke være lengre enn 500 tegn, så her kommer litt lorum ipsum: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release...');
        cy.getByTestId('modal_arbeidsliste_form').contains('Du må korte ned teksten til 500 tegn');
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en kommentar');

        // Nullstillar tittel og kommentar og skriv inn gyldig input
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_tittel').type('validering');
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar');

        // Set ein frist og kategori
        cy.get('#fristDatovelger').type('01.03.2066');
        cy.getByTestId('modal_arbeidslistekategori_GUL').click();

        // Lagrar ikkje arbeidslista i denne testen
    });

    it('Lagre fornavn til valgt bruker', () => {
        cy.getByTestId('modal_legg-i-arbeidsliste_navn').then($navn => {
            fornavn = $navn.text().split(' ')[0];
        });
    });

    it('Lagre ny arbeidsliste', () => {
        // Lagre innholdet som vart skrive inn i test "Lag én ny arbeidsliste og sjekk validering"
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();

        // Laster-modal
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

        // Sjekk at brukaren er i lista
        cy.get('.legg-i-arbeidsliste_modal').should('not.exist');
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
        // Vel fyrste og siste brukar i arbeidslista
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.checkboxLast('min-oversikt_brukerliste-checkbox');

        // Opne legg-til-i-arbeidsliste-modal
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.get('.legg-i-arbeidsliste_modal').should('not.exist');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
        cy.get('.legg-i-arbeidsliste_modal').should('be.visible');

        // Fyll ut innhald for fyrste brukar
        cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');
        cy.getByTestId('modal_arbeidslistekategori_LILLA').click();

        // Fyll ut innhald for andre brukar
        cy.getByTestId('modal_arbeidsliste_tittel_1').type('heiheihei hallå');
        cy.getByTestId('modal_arbeidsliste_kommentar_1').type('Team Voff er best i test hehehe');

        // Lagre arbeidslistene
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();

        // Sjekk at modal er lukka og laster-modal fungerer
        cy.get('.legg-i-arbeidsliste_modal').should('not.exist');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

        // Sjekk at det no er 2 fleire personar med arbeidsliste
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallMedArbeidslisteEtterOppretting += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallMedArbeidslisteEtterOppretting).to.be.equals(antallMedArbeidsliste + 2);
            });
    });

    it('Sjekker åpning og lukking av arbeidslistepanel i oversikten', () => {
        cy.apneForsteArbeidslistepanelOgValiderApning();
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_tittel').should('be.visible')

        cy.lukkForsteArbeidslistepanelOgValiderLukking();
    })


    it('Rediger arbeidsliste', () => {
        // Finn den fyrste personen med arbeidsliste, trykk på chevron og sjekk at det fungerte
        cy.apneForsteArbeidslistepanel();

        // Trykk på redigerknapp
        cy.get('.arbeidsliste-modal').should('not.exist');
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').should('be.visible').click();

        // Modalen viser rett ting
        cy.get('.arbeidsliste-modal').should('be.visible');
        cy.get('.modal-header').contains('Rediger arbeidsliste');

        // Skriv inn ny tekst for tittel og kommentar
        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(redigertTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(redigertKommentar);

        // Lagrar og lukkar modal
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.get('.arbeidsliste-modal').should('not.exist');

        // Sjekkar at arbeidlista er oppdatert
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_tittel').contains(redigertTittel);
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_kommentar').contains(redigertKommentar);
    });

    it('Slett arbeidsliste via fjern-knapp', () => {
        // Tel kor mange arbeidslister det er
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').then(ant => {
            antallFor += Cypress.$(ant).length;
        });

        // Finn checkboksen til den fyrste personen med arbeidsliste
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox_arbeidsliste');

        // Fjern personen frå arbeidslista
        cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('be.enabled').click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();

        // Laster-modal oppfører seg som venta
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');

        // Sjekk at det er 1 færre arbeidslister no enn før slettinga
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
        // Tel kor mange arbeidslister det er
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').then(ant => {
            antallForSletting += Cypress.$(ant).length;
        });

        // Opne arbeidslistepanel for den fyrste brukaren som har arbeidsliste
        cy.apneForsteArbeidslistepanel();
        cy.get('.arbeidsliste-modal').should('not.exist');

        // Trykk på redigeringsknapp
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
        cy.get('.arbeidsliste-modal').should('be.visible');

        // Fjern arbeidslista
        cy.getByTestId('modal_rediger-arbeidsliste_fjern-knapp').click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();

        // Laster-modal oppfører seg som venta
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

        // Sjekk at det er 1 færre arbeidslister no enn før slettinga
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
        // Opne arbeidslistepanelet for den fyrste personen med arbeidsliste
        cy.apneForsteArbeidslistepanel();
        cy.get('.arbeidsliste-modal').should('not.exist');

        // Trykk på redigeringsknapp
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
        cy.get('.arbeidsliste-modal').should('be.visible');

        // Tøm tekstfelta i modalen
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();

        // Test validering av tittel
        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann her er det mer enn 30 tegn');
        cy.getByTestId('modal_rediger-arbeidsliste_form').contains('Tittelen kan ikke være lenger enn 30 tegn.');
        cy.getByTestId('modal_rediger-arbeidsliste_form').should('not.contain', 'Du må fylle ut en tittel');
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann');

        // Fyll inn ein gyldig kommentar og lagre
        cy.getByTestId('modal_arbeidsliste_kommentar').type('Her er en kjempefin kommentar truddelu');
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.get('.arbeidsliste-modal').should('not.exist');

        // Lukk arbeidslistepanelet
        cy.lukkForsteArbeidslistepanel();
    });

    it('Sjekk at man kan redigere til tom tittel og tom kommentar ', () => {
        cy.scrollTo('top')
        cy.wait(200)

        // Opnar arbeidslistepanelet for fyrste person med arbeidsliste
        cy.apneForsteArbeidslistepanel();

        cy.get('.arbeidsliste-modal').should('not.exist');

        // Trykk på redigeringsknappen
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
        cy.get('.arbeidsliste-modal').should('be.visible');

        // Nullstill tekstfelt
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();

        // Lagre og sjekk at det lukkar modalen
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.get('.arbeidsliste-modal').should('not.exist');

        // Lukk arbeidslistepanelet
        cy.lukkForsteArbeidslistepanel();
    });

    it('Lagre tittel og kommentar', () => {
        cy.apneForsteArbeidslistepanel();

        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_tittel').then($tittel => {
            tittel = $tittel.text();
        });
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_kommentar').then($kommentar => {
            kommentar = $kommentar.text();
        });
    });

    it('Avbryt redigering, ingen endringer lagret', () => {

        cy.get('.arbeidsliste-modal').should('not.exist');
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
        cy.get('.arbeidsliste-modal').should('be.visible');

        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(nyTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(nyKommentar);
        cy.getByTestId('modal_rediger-arbeidsliste_avbryt-knapp').click();

        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_tittel').should('contain', tittel);
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_kommentar').should('contain', kommentar);

        cy.lukkForsteArbeidslistepanel();
    });
});
