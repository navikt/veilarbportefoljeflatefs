describe('Lag én ny arbeidsliste og sjekk validering', () => {
    it('Start server', () => {
        cy.configure();
    })
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt')
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
    it('Klikk lagre med tom tittel og tom kommentar', () => {
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.getByTestId('modal_arbeidsliste_form').contains("Du må fylle ut en tittel");
        cy.getByTestId('modal_arbeidsliste_form').contains("Du må fylle ut en kommentar");
    })
    it('Legg inn tittel, sjekk at validering er borte', () => {
        cy.getByTestId('modal_arbeidsliste_tittel').type('validering');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', "Du må fylle ut en tittel");
    })
    let fornavn = '';
    it('Legg inn dato og gul kategori', () => {
        cy.getByTestId('modal_legg-i-arbeidsliste_navn').then(($navn) => {
            fornavn = ($navn.text()).split(' ')[0]
        })
        cy.get('#fristInput').type('01.03.2066');
        cy.getByTestId('modal_arbeidslistekategori_GUL').click();
    })
    it('Legg inn kommentar, sjekk at validering er borte', () => {
        cy.getByTestId('modal_arbeidsliste_kommentar').type('valideringskommentar');
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.getByTestId('modal_arbeidsliste_form').should('not.contain', "Du må fylle ut en kommentar");
        cy.getByTestId('modal_arbeidsliste_form').should('not.be.visible');
    })
    it('Brukeren skal nå ha gult arbeidslisteikon', () => {
        cy.get('.legg-i-arbeidsliste')
            .should('not.be.visible')
        cy.getByTestId('brukerliste_element_arbeidsliste-GUL').contains(fornavn).first()
    })
    // it('Lukk chevron', () => {
    //     cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').children()
    //         .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen').first();
    //     cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().click();
    //     cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().children()
    //         .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket');
    // })
})

describe('Lag to nye arbeidslister', () => {
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

describe('Rediger arbeidsliste', () => {
    let tittel;
    let kommentar;
    it('Åpne chevron hos bruker med arbeidsliste', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket').first();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen').first();

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel')
            .then(($tittel) => {
                tittel = $tittel.text();
            })

        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar')
            .then(($kommentar) => {
                kommentar = $kommentar.text();
            })
    })
    let nyTittel = 'Redigering av tittel';
    let nyKommentar = 'Redigering av kommentar';

    it('Klikk rediger', () => {
        cy.get('.rediger-arbeidsliste').should('not.be.visible')
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible')
    })
    it('Skriv ny tittel og kommentar', () => {
        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(nyTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(nyKommentar);
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').click();
        cy.get('.rediger-arbeidsliste').should('not.be.visible');
    })
    it('Ny tittel og kommentar skal leses i chevron', () => {
        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').contains(nyTittel)
        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').contains(nyKommentar)
    })
})

describe('Slett arbeidsliste via fjern-knapp', () => {
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

describe('Slett arbeidsliste via rediger-modal', () => {
    let antallForSletting = 0;
    it('Åpne chevron hos bruker med arbeidsliste', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]')
            .then(ant => {
                antallForSletting += Cypress.$(ant).length;
            });
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket');
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen');
    })

    it('Klikk rediger', () => {
        cy.get('.rediger-arbeidsliste').should('not.be.visible')
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible')
    })

    it('Klikk fjern-knapp', () => {
        cy.getByTestId('modal_rediger-arbeidsliste_fjern-knapp').click();
    })
    it('Klikk bekreft', () => {
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();
        cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.be.visible');
    })

    let antallEtterSletting = 0;
    it('Det skal være en mindre bruker med arbeidsliste', () => {
        cy.get('[data-cy=brukerliste_element_arbeidsliste]').should('be.visible')
            .then(ant => {
                antallEtterSletting += Cypress.$(ant).length;
            })
            .then(() => {
                expect(antallEtterSletting).to.be.equals(antallForSletting - 1)
            });
    })
})

describe('Sjekk validering i rediger arbeidsliste-modal', () => {
    it('Åpne chevron hos bruker med arbeidsliste', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket').first();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen');
    })

    it('Klikk rediger', () => {
        cy.get('.rediger-arbeidsliste').should('not.be.visible')
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible')
    })

    it('Fjern tittel og kommentar og klikk Lagre', () => {
        cy.getByTestId('modal_arbeidsliste_tittel').clear();
        cy.getByTestId('modal_arbeidsliste_kommentar').clear();
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.getByTestId('modal_rediger-arbeidsliste_form').contains("Du må fylle ut en tittel");
        cy.getByTestId('modal_rediger-arbeidsliste_form').contains("Du må fylle ut en kommentar");
    })
    it('Legg til tittel, sjekk at valideringen er borte', () => {
        cy.getByTestId('modal_arbeidsliste_tittel').type('Heisann sveisann');
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.getByTestId('modal_rediger-arbeidsliste_form').should('not.contain', "Du må fylle ut en tittel");
    })
    it('Legg til kommentar, sjekk at valideringen er borte', () => {
        cy.getByTestId('modal_arbeidsliste_kommentar').type('Her er en kjempefin kommentar truddelu');
        cy.getByTestId('modal_rediger-arbeidsliste_lagre-knapp').contains('Lagre').click();
        cy.getByTestId('modal_rediger-arbeidsliste_form').should('not.contain', "Du må fylle ut en kommentar");
    })
    it('Lukk chevron', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen').first();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket');
    })
})

describe('Avbryt redigering, ingen endringer lagret', () => {
    let tittel;
    let kommentar;
    it('Åpne chevron hos bruker med arbeidsliste', () => {
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-lukket').first();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').first().click();
        cy.getByTestId('min-oversikt_brukerliste-chevron_arbeidsliste').children()
            .should('have.class', 'brukerliste__arbeidslisteknapp--chevron-apen').first();

        cy.getByTestId('chevron_arbeidslisteinnhold_tittel')
            .then(($tittel) => {
                tittel = $tittel.text();
            })

        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar')
            .then(($kommentar) => {
                kommentar = $kommentar.text();
            })
    })
    it('Klikk rediger', () => {
        cy.get('.rediger-arbeidsliste').should('not.be.visible');
        cy.getByTestId('min-oversikt_chevron-arbeidsliste_rediger-knapp').click();
        cy.get('.rediger-arbeidsliste').should('be.visible');
    })
    const nyTittel = 'Skal ikke lagres'
    const nyKommentar = 'Kommentar skal heller ikke lagres'
    it('Endre tittel og kommentar og klikk avbryt', () => {
        cy.getByTestId('modal_arbeidsliste_tittel').clear().type(nyTittel);
        cy.getByTestId('modal_arbeidsliste_kommentar').clear().type(nyKommentar);
        cy.getByTestId('modal_rediger-arbeidsliste_avbryt-knapp').contains('Avbryt').click();
    })
    it('Tittel og kommentar skal være som det var før', () => {
        cy.getByTestId('chevron_arbeidslisteinnhold_tittel').should("contain", tittel);
        cy.getByTestId('chevron_arbeidslisteinnhold_kommentar').should("contain", kommentar);
    })
})
