xdescribe('Lag én ny arbeidsliste', () => {
    it('Start server', () => {
        cy.configure();
    })
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
    })
    it('Velg bruker uten arbeidsliste', () => {
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
        cy.getByTestId('min-oversikt_brukerliste-checkbox').first().should("not.be.checked");
        cy.getByTestId('min-oversikt_brukerliste-checkbox').first().check();
        cy.getByTestId('min-oversikt_brukerliste-checkbox').first().should("be.checked");
    })
    it('Klikk Legg i arbeidsliste', () => {
        cy.get('.legg-i-arbeidsliste').should('not.be.visible')
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.getByTestId('legg-i-arbeidsliste_knapp').contains('Legg i arbeidsliste');
        cy.getByTestId('legg-i-arbeidsliste_knapp').click();
        cy.get('.legg-i-arbeidsliste').should('be.visible')
    })
    let fornavn = '';
    it('Legg inn tittel, kommentar, dato og gul kategori', () => {
        cy.getByTestId('modal_legg-i-arbeidsliste_navn').then(($navn) => {
            fornavn = ($navn.text()).split(' ')[0]
        })
        cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');
        cy.get('#fristInput').type('01.03.2066');
        cy.getByTestId('modal_arbeidslistekategori_GUL').click();
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.get('.legg-i-arbeidsliste')
            .should('not.be.visible')
    })
    it('Brukeren skal nå ha gult arbeidslisteikon', () => {
        cy.getByTestId('brukerliste_element_arbeidsliste-GUL').contains(fornavn).first()
    })
})

describe('Lag to nye arbeidslister', () => {
    it('Start server', () => {
        cy.configure();
    })
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
    })
    let antallMedArbeidsliste = 0;

    it('Det eksisterer fler enn 0 brukere med arbeidsliste', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallMedArbeidsliste += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallMedArbeidsliste).to.be.greaterThan(0)
            });
    })
    it('Velg to brukere uten arbeidsliste', () => {
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
        cy.getByTestId('min-oversikt_brukerliste-checkbox').first().should("not.be.checked");
        cy.getByTestId('min-oversikt_brukerliste-checkbox').first().check();
        cy.getByTestId('min-oversikt_brukerliste-checkbox').first().should("be.checked");

        cy.getByTestId('min-oversikt_brukerliste-checkbox').last().should("not.be.checked");
        cy.getByTestId('min-oversikt_brukerliste-checkbox').last().check();
        cy.getByTestId('min-oversikt_brukerliste-checkbox').last().should("be.checked");
    })
    it('Klikk Legg i arbeidsliste', () => {
        cy.get('.legg-i-arbeidsliste').should('not.be.visible')
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.getByTestId('legg-i-arbeidsliste_knapp').contains('Legg i arbeidsliste');
        cy.getByTestId('legg-i-arbeidsliste_knapp').click();
        cy.get('.legg-i-arbeidsliste').should('be.visible')
    })
    it('Legg inn tittel, kommentar, dato og lilla kategori på første arbeidsliste', () => {
        cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');

        cy.getByTestId('modal_arbeidslistekategori_LILLA').click();
    })
    it('Legg inn tittel, kommentar, dato og blå kategori på andre arbeidsliste', () => {

        cy.getByTestId('modal_arbeidsliste_tittel_1').type('heiheihei hallå');
        cy.getByTestId('modal_arbeidsliste_kommentar_1').type('tester om dette funker da');

        cy.getByTestId('modal_arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.get('.legg-i-arbeidsliste')
            .should('not.be.visible')
    })
    let antallMedArbeidslisteEtterOppretting = 0;
    it(`Det eksisterer to flere brukere med arbeidsliste`, () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallMedArbeidslisteEtterOppretting += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallMedArbeidslisteEtterOppretting).to.be.equals(antallMedArbeidsliste + 2)
            });

    })
})

xdescribe('Rediger arbeidsliste', () => {
    it('Åpne chevron hos bruker med arbeidsliste', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket');
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen');
    })
    let arbeidslistetittel;
    let nyTittel;
    it('Klikk rediger', () => {
        cy.get('.rediger-arbeidsliste').should('not.be.visible')
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible')
        cy.getByTestId('chevron_arbeidslisteinnhold_tittel')
            .then(($tittel) => {
                arbeidslistetittel = $tittel.text()
            })
    })
    it('Skriv ny tittel', () => {
        const redigertTittel = 'Redigering av tittel';
        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(redigertTittel);
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.get('.rediger-arbeidsliste').should('not.be.visible');
        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').contains(redigertTittel)
        cy.getByTestId('chevron_arbeidslisteinnhold_tittel')
            .then(($tittel) => {
                nyTittel = $tittel.text()
            })
        expect(nyTittel).to.not.equals(arbeidslistetittel);
    })
})

xdescribe('Slett arbeidsliste', () => {
    let antallFor = 0;
    it('Velg bruker med arbeidsliste', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallFor += Cypress.$(ant).length;
            });
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
        cy.getByTestId('min-oversikt_brukerliste-checkbox_arbeidsliste').first().should("not.be.checked");
        cy.getByTestId('min-oversikt_brukerliste-checkbox_arbeidsliste').first().check();
        cy.getByTestId('min-oversikt_brukerliste-checkbox_arbeidsliste').first().should("be.checked");
    })
    it('Klikk Fjern fra arbeidsliste', () => {
        cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('be.enabled').click();
    })
    it('Klikk bekreft', () => {
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.be.visible');
    })

    let antallEtter = 0;
    it('Brukeren skal nå ikke ha arbeidslisteikon', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').should('be.visible')
            .then(ant => {
                antallEtter += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallEtter).to.be.equals(antallFor - 1)
            });
    })
})
