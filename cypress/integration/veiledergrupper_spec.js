import React from "react";

const gruppenavn = "Voffvoff";
const gruppenavnRedigert = "Mjaumjau";
const andersen = "Andersen";
const jonas = "Jonas";
const minstEnVeileder = "Du må legge til veiledere."
const markusAasenEtikett = "Aasen"

//TODO bør få dette over i commands.js-filen, men den kjører foreløpig ikke med Cypress run
describe('Start ting', () => {
    it('Åpne browser med oversikten', () => {
        cy.server();
        cy.visit('/')
        cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        Cypress.on('uncaught:exception', (err) => {
            console.log(err);
            return false;
        })
        cy.get('[data-testid=enhetens-oversikt]').contains('Enhetens oversikt')
            .should('exist')
    })
})

describe('Lag ny veiledergruppe', () => {
    it('Det eksisterer 5 veiledergrupper', () => {
        cy.get('[data-testid=sidebar-tab_VEILEDERGRUPPER]').click()
        cy.get('[data-testid=veiledergruppe-rad-wrapper]').should('have.length', 5)
    })
    it('Klikk på ny gruppe', () => {
        cy.get('[data-testid=veiledergruppe-ny-gruppe-knapp]').click()
    })
    it('Skriv inn gruppenavn', () => {
        cy.get('[data-testid=veiledergruppe-modal-gruppenavn-input]').type(gruppenavn)
    })
    it('Søk veileder', () => {
        cy.get('[data-testid=veiledergruppe-modal-sok-veileder-input]').type(andersen)
    })
    it('Velg søkt veileder', () => {
        cy.get('[data-testid=veiledergruppe-modal-veileder-checkbox_0]').check({force: true})
    })
    it('Søk en veileder til', () => {
        cy.get('[data-testid=veiledergruppe-modal-sok-veileder-input]').clear().type(jonas)
    })
    it('Velg søkt veileder', () => {
        cy.get('[data-testid=veiledergruppe-modal-veileder-checkbox_0]').check({force: true})
    })
    it('Klikk lagre', () => {
        cy.get('[data-testid=veiledergruppe-modal-lagre-knapp]').click()
    })
    it('Toasten skal vise "Gruppen er opprettet"', () => {
        cy.get('[data-testid=veiledergruppe-toast]').contains("Gruppen er opprettet")
    })
    it('Etikettene skal inneholde Andersen og Jonas', () => {
        cy.get('[data-testid=filtreringlabel]').contains(andersen)
        cy.get('[data-testid=filtreringlabel]').contains(jonas)
    })
    it('Det eksisterer 6 veiledergrupper', () => {
        cy.get('[data-testid=veiledergruppe-rad-wrapper]').should('have.length', 6)
    })
    it('Ny gruppe skal være valgt', () => {
        cy.get('[data-testid=veiledergruppe-rad-wrapper]')
            .contains(gruppenavn)
        cy.get(`[data-testid=veiledergruppe-rad_${gruppenavn}]`)
            .should('be.checked')
    })
})

describe('Rediger filternavn', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.get(`[data-testid=rediger-veiledergruppe-knapp_${gruppenavn}]`).click()
    })
    it('Skriv inn nytt gruppenavn', () => {
        cy.get('[data-testid=veiledergruppe-modal-gruppenavn-input]').clear().type(gruppenavnRedigert)
    })
    it('Klikk lagre', () => {
        cy.get('[data-testid=veiledergruppe-modal-lagre-knapp]').click()
    })
    it('Toasten skal vise "Gruppen er lagret"', () => {
        cy.get('[data-testid=veiledergruppe-toast]').contains("Gruppen er lagret")
    })
    it('Sjekk at filternavn er oppdatert', () => {
        cy.get('[data-testid=veiledergruppe-rad-wrapper]')
            .contains(gruppenavnRedigert)
    })
    it('Det eksisterer 6 veiledergrupper', () => {
        cy.get('[data-testid=veiledergruppe-rad-wrapper]').should('have.length', 6)
    })
})

describe('Rediger filtervalg', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.get(`[data-testid=rediger-veiledergruppe-knapp_${gruppenavnRedigert}]`).click()
    })
    it('Fjern veiledere', () => {
        cy.get('[data-testid=veiledergruppe-modal-valgt-veileder-fjernknapp]').first().click()
        cy.get('[data-testid=veiledergruppe-modal-valgt-veileder-fjernknapp]').first().click()
    })
    it('Antall veiledere skal være 0, og det skal stå "Ingen veiledere lagt til i gruppen"', () => {
        cy.get('[data-testid=veiledergruppe-modal-antall-valgte-veiledere_0]').should('exist')
        cy.get('[data-testid=veiledergruppe-modal-valgte-veiledere-wrapper]')
            .contains("Ingen veiledere lagt til i gruppen")
    })
    it('Klikk lagre endringer', () => {
        cy.get('[data-testid=veiledergruppe-modal-lagre-knapp]').contains("Lagre endringer").click()
    })
    it('Feilmelding sier at du må legge til veiledere', () => {
        cy.get('[data-testid=veiledergrupper-modal-form]').contains(minstEnVeileder)
    })
    it('Velg veileder', () => {
        cy.get('[data-testid=veiledergruppe-modal-veileder-checkbox_0]').check({force: true})
    })
    it('Klikk lagre endringer', () => {
        cy.get('[data-testid=veiledergruppe-modal-lagre-knapp]').contains("Lagre endringer").click()
    })
    it('Det eksisterer 6 veiledergrupper', () => {
        cy.get('[data-testid=veiledergruppe-rad-wrapper]').should('have.length', 6)
    })
    it('Toasten skal vise "Gruppen er lagret"', () => {
        cy.get('[data-testid=veiledergruppe-toast]').should("be.visible").contains("Gruppen er lagret")
    })
    //TODO denne funker ikke
    // it(`Etiketten skal inneholde ${markusAasenEtikett}`, () => {
    //     cy.get('[data-testid=filtreringlabel]').contains(markusAasenEtikett)
    // })
})

describe('Slett lagret filter', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.get(`[data-testid=rediger-veiledergruppe-knapp_${gruppenavnRedigert}]`).click()
    })
    it('Slett filter', () => {
        cy.get('[data-testid=veiledergruppe-modal-slette-knapp]').click()
    })
    it('Bekreft sletting', () => {
        cy.get('[data-testid=bekreft-sletting-modal-slett-knapp]').click()
    })
    it('Det eksisterer 5 veiledergrupper', () => {
        cy.get('[data-testid=veiledergruppe-rad-wrapper]').should('have.length', 5)
    })
})
