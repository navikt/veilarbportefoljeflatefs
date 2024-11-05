/*before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();

    // Gå til Min oversikt-fana
    cy.gaTilOversikt('min-oversikt');
});

describe('Arbeidsliste', () => {
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

    it('Lag én ny arbeidsliste og sjekk validering', () => {
        // Vel fyrste brukar i lista
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');

        // Opne legg-i-arbeidsliste_modal
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
    });

    it('Lagre ny arbeidsliste', () => {
        // Opnar "Legg i arbeidsliste"-modal igjen
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();

        // Set ein frist og kategori
        cy.get('#fristDatovelger').type('01.03.2066');
        });
    });

    it('Lag to nye arbeidslister', () => {
        // Finn alle brukarar som har arbeidslister frå før

                // Vel fyrste og siste brukar i arbeidslista
                cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');

                // Opne legg-til-i-arbeidsliste_modal
                cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
                cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();
            });
    });
});*/
