before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();

    // Gå til Min oversikt-fana
    cy.gaTilOversikt('min-oversikt');
});

describe('Arbeidsliste', () => {
    it('Lag én ny arbeidsliste og sjekk validering', () => {
        // Vel fyrste brukar i lista
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');

        // Opne legg-i-arbeidsliste_modal
        cy.get('.testid_legg-i-arbeidsliste_modal').should('not.exist');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
        cy.get('.testid_legg-i-arbeidsliste_modal').should('be.visible');

        // Testar validering av tittel-input
        cy.getByTestId('modal_arbeidsliste_tittel').type('valideringstest på at det ikke er lov med tegn mer enn 30');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();
        cy.getByTestId('modal_arbeidsliste_form').contains('Tittelen kan ikke være lenger enn 30 tegn.');
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en tittel');

        // Testar validering av kommentar-input
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar skal ikke være lengre enn 500 tegn, så her kommer litt lorum ipsum: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release...');
        cy.getByTestId('modal_arbeidsliste_form').contains('Du må korte ned teksten til 500 tegn');
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en kommentar');

        cy.getByTestId('modal_arbeidsliste_avbryt-knapp').click();
    });

    it('Lagre ny arbeidsliste', () => {
        // Opnar "Legg i arbeidsliste"-modal igjen
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();

        // Nullstillar tittel og kommentar og skriv inn gyldig input
        cy.getByTestId('modal_arbeidsliste_tittel').type('validering');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar');

        // Set ein frist og kategori
        cy.get('#fristDatovelger').type('01.03.2066');
        cy.getByTestId('modal_arbeidslistekategori_GUL').click();

        cy.getByTestId('modal_legg-i-arbeidsliste_navn').then(($navn) => {
            // Hugsar fornamnet til brukaren vi har valgt
            const fornavn = $navn.text().split(' ')[0];

            // Lagre innholdet som vart skrive inn i test "Lag én ny arbeidsliste og sjekk validering"
            cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();

            // Laster-modal
            cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
            cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

            // Sjekk at brukaren er i lista
            cy.get('.testid_legg-i-arbeidsliste_modal').should('not.exist');
            cy.getByTestId('brukerliste_element_arbeidsliste-GUL').contains(fornavn).first();
        });
    });

    it('Lag to nye arbeidslister', () => {
        // Finn alle brukarar som har arbeidslister frå før
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').as('elementIArbeidsliste').then(elementIArbeidslisteFor => {
            // Sjekk at vi fann nokon element
            expect(elementIArbeidslisteFor.length).to.be.greaterThan(0);

            // Vel fyrste og siste brukar i arbeidslista
            cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
            cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
            cy.checkboxLast('min-oversikt_brukerliste-checkbox');

            // Opne legg-til-i-arbeidsliste_modal
            cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
            cy.get('.testid_legg-i-arbeidsliste_modal').should('not.exist');
            cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
            cy.get('.testid_legg-i-arbeidsliste_modal').should('be.visible');

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
            cy.get('.testid_legg-i-arbeidsliste_modal').should('not.exist');
            cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
            cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

            // Samanlikn talet på brukarar med arbeidslister før og etter at ein har oppretta nye
            cy.get('@elementIArbeidsliste')
                .then((elementIArbeidslisteEtter) => {
                    expect(elementIArbeidslisteEtter.length).to.equal(elementIArbeidslisteFor.length + 2);
                });
        });
    });

    it('Sjekker åpning og lukking av arbeidslistepanel i oversikten', () => {
        cy.apneForsteArbeidslistepanelOgValiderApning();
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_tittel').should('be.visible');

        cy.lukkForsteArbeidslistepanelOgValiderLukking();
    });


    it('Rediger arbeidsliste', () => {
        const redigertTittel = 'Redigering av tittel';
        const redigertKommentar = 'Redigering av kommentar';

        // Finn den fyrste personen med arbeidsliste, trykk på chevron og sjekk at det fungerte
        cy.apneForsteArbeidslistepanel();

        // Trykk på redigerknapp
        cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').should('be.visible').click();

        // Modalen viser rett ting
        cy.getByTestId('arbeidsliste-rediger-modal').should('be.visible')
            .contains('Rediger arbeidsliste');

        // Skriv inn ny tekst for tittel og kommentar
        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(redigertTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(redigertKommentar);

        // Lagrar og lukkar modal
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');

        // Sjekkar at arbeidlista er oppdatert
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_tittel').contains(redigertTittel);
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_kommentar').contains(redigertKommentar);
    });

    it('Slett arbeidsliste via fjern-knapp', () => {
        // Tel kor mange arbeidslister det er
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').as('elementIArbeidsliste').then(antallArbeidslisterForSletting => {
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
            cy.get('@elementIArbeidsliste')
                .should('be.visible')
                .then(antallArbeidslisterEtterSletting => {
                    expect(antallArbeidslisterEtterSletting.length)
                        .to.equal(antallArbeidslisterForSletting.length - 1);
                });
        });
    });

    it('Slett arbeidsliste via rediger-modal', () => {
        // Hentar brukarane med arbeidslister før sletting
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').as('elementIArbeidsliste').then(antallArbeidslisterForSletting => {
            // Opne arbeidslistepanel for den fyrste brukaren som har arbeidsliste
            cy.apneForsteArbeidslistepanel();
            cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');

            // Trykk på redigeringsknapp
            cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
            cy.getByTestId('arbeidsliste-rediger-modal').should('be.visible');

            // Fjern arbeidslista
            cy.getByTestId('modal_rediger-arbeidsliste_fjern-knapp').click();
            cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();

            // Laster-modal oppfører seg som venta
            cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
            cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');
            cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

            // Sjekk at det er 1 færre arbeidslister no enn før slettinga
            cy.get('@elementIArbeidsliste')
                .should('be.visible')
                .then(antallArbeidslisterEtterSletting => {
                    expect(antallArbeidslisterEtterSletting.length)
                        .to.equal(antallArbeidslisterForSletting.length - 1);
                });
        });
    });

    it('Sjekk validering i rediger arbeidsliste-modal', () => {
        // Opne arbeidslistepanelet for den fyrste personen med arbeidsliste
        cy.apneForsteArbeidslistepanel();
        cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');

        // Trykk på redigeringsknapp
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
        cy.getByTestId('arbeidsliste-rediger-modal').should('be.visible');

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
        cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');

        // Lukk arbeidslistepanelet
        cy.lukkForsteArbeidslistepanel();
    });

    it('Sjekk at man kan redigere til tom tittel og tom kommentar ', () => {
        // Opnar arbeidslistepanelet for fyrste person med arbeidsliste
        cy.apneForsteArbeidslistepanel();

        cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');

        // Trykk på redigeringsknappen
        cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
        cy.getByTestId('arbeidsliste-rediger-modal').should('be.visible');

        // Nullstill tekstfelt
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();

        // Lagre og sjekk at det lukkar modalen
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');

        // Lukk arbeidslistepanelet
        cy.lukkForsteArbeidslistepanel();
    });

    it('Avbryt redigering, ingen endringer lagret', () => {
        cy.apneForsteArbeidslistepanel();

        // Finn tittel-elementet
        cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_tittel').as('tittel').then(tittelForRedigering => {
            // Finn kommentar-elementet også
            cy.getByTestId('arbeidslistepanel_arbeidslisteinnhold_kommentar').as('kommentar').then(kommentarForRedigering => {
                const nyTittel = 'Skal ikke lagres';
                const nyKommentar = 'Kommentar skal heller ikke lagres';

                // Trykkar på rediger-knapp
                cy.getByTestId('arbeidsliste-rediger-modal').should('not.exist');
                cy.getByTestId('min-oversikt_arbeidslistepanel-arbeidsliste_rediger-knapp').click();
                cy.getByTestId('arbeidsliste-rediger-modal').should('be.visible');

                // Skriv inn ny tekst i modalen
                cy.getByTestId('modal_arbeidsliste_tittel').clear().type(nyTittel);
                cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(nyKommentar);

                // Trykkar "Avbryt"
                cy.getByTestId('modal_rediger-arbeidsliste_avbryt-knapp').click();

                // Sjekkar at teksten ikkje vart endra
                cy.get('@tittel').should('contain', tittelForRedigering.text());
                cy.get('@kommentar').should('contain', kommentarForRedigering.text());
            });
        });

        cy.lukkForsteArbeidslistepanel();
    });
});
