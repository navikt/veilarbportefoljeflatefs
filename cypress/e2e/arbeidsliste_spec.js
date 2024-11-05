/*before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();

    // Gå til Min oversikt-fana
    cy.gaTilOversikt('min-oversikt');
});

describe('Arbeidsliste', () => {
    it('Rediger arbeidsliste', () => {
        const redigertTittel = 'Redigering av tittel';
        const redigertKommentar = 'Redigering av kommentar';

        // Skriv inn ny tekst for tittel og kommentar
        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(redigertTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(redigertKommentar);
    });

    it('Slett arbeidsliste via fjern-knapp', () => {
        // Tel kor mange arbeidslister det er

            .then(antallArbeidslisterForSletting => {
                // Finn checkboksen til den fyrste personen med arbeidsliste
                cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');

                // Fjern personen frå arbeidslista
                cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('be.enabled').click();
                cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();

                // Laster-modal oppfører seg som venta
                // Testinga av laster-modal er litt ustabil så vi kommenterer den ut. 2024-04-19 Ingrid og Klara
                // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('be.visible');
                // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('not.exist');
                cy.wait(300); // Ventar på at laster-modalen skal forsvinne
                cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');

            });
    });

    it('Slett arbeidsliste via rediger-modal', () => {
        // Hentar brukarane med arbeidslister før sletting
            .then(antallArbeidslisterForSletting => {
                // Trykk på redigeringsknapp

                // Fjern arbeidslista
                cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();

                // Laster-modal oppfører seg som venta
                // Testinga av laster-modal er litt ustabil så vi kommenterer den ut. 2024-04-19 Ingrid og Klara
                // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('be.visible');
                // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('not.exist');
                cy.wait(300); // Ventar på at laster-modalen skal forsvinne
                cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');

            });
    });

    it('Sjekk validering i rediger arbeidsliste-modal', () => {
        // Tøm tekstfelta i modalen
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();

        // Test validering av tittel
        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann her er det mer enn 30 tegn');
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann');

        // Fyll inn ein gyldig kommentar og lagre
        cy.getByTestId('modal_arbeidsliste_kommentar').type('Her er en kjempefin kommentar truddelu');

    });

    it('Sjekk at man kan redigere til tom tittel og tom kommentar ', () => {
        // Nullstill tekstfelt
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();

    });

    it('Lag én ny arbeidsliste og sjekk validering', () => {
        // Vel fyrste brukar i lista
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');

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
        cy.getByTestId('modal_arbeidsliste_kommentar').type(
            "valideringskommentar skal ikke være lengre enn 500 tegn, så her kommer litt lorum ipsum: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release..."
        );
        cy.getByTestId('modal_arbeidsliste_form').contains('Du må korte ned teksten til 500 tegn');
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', 'Du må fylle ut en kommentar');

        cy.getByTestId('modal_arbeidsliste_avbryt-knapp').click();
    });

    it('Lagre ny arbeidsliste', () => {
        // Opnar "Legg i arbeidsliste"-modal igjen
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();

        // Nullstillar tittel og kommentar og skriv inn gyldig input
        cy.getByTestId('modal_arbeidsliste_tittel').type('validering');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar');

        // Set ein frist og kategori
        cy.get('#fristDatovelger').type('01.03.2066');
        cy.getByTestId('modal_arbeidslistekategori_GUL').click();

        cy.getByTestId('modal_legg-i-arbeidsliste_navn').then($navn => {
            // Hugsar fornamnet til brukaren vi har valgt
            const fornavn = $navn.text().split(' ')[0];

            // Lagre innholdet som vart skrive inn i test "Lag én ny arbeidsliste og sjekk validering"
            cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();

            // Desse testane er litt ustabile så vi kommenterer dei ut. 2024-04-19 Ingrid og Klara
            // // Laster-modal
            // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('be.visible');
            // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('not.exist');
            cy.wait(300); // Ventar på at laster-modalen skal forsvinne

            // Sjekk at brukaren er i lista
            cy.get('.testid_legg-i-arbeidsliste_modal').should('not.exist');
        });
    });

    it('Lag to nye arbeidslister', () => {
        // Finn alle brukarar som har arbeidslister frå før

                // Vel fyrste og siste brukar i arbeidslista
                cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');

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
                // Testinga av laster-modal er litt ustabil så vi kommenterer den ut. 2024-04-19 Ingrid og Klara
                // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('be.visible');
                // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('not.exist');

            });
    });
});*/
