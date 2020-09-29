import React from "react";

const gruppenavn = "Voffvoff";
const gruppenavnRedigert = "Mjaumjau";
const andersen = "Andersen";
const jonas = "Jonas";
const aasen = "Aasen"
const minstEnVeileder = "Du må legge til veiledere."

describe('Lag ny veiledergruppe', () => {
    it('Start system', () => {
        cy.start();
    })
    it('Det eksisterer 5 veiledergrupper', () => {
        cy.getByTestId('sidebar-tab_VEILEDERGRUPPER').click()
        cy.getByTestId('veiledergruppe-rad-wrapper').should('have.length', 5)
    })
    it('Klikk på ny gruppe', () => {
        cy.getByTestId('veiledergruppe-ny-gruppe-knapp').click()
    })
    it('Skriv inn gruppenavn', () => {
        cy.getByTestId('veiledergruppe-modal-gruppenavn-input').type(gruppenavn)
    })
    it('Søk veileder', () => {
        cy.getByTestId('veiledergruppe-modal-sok-veileder-input').type(andersen)
    })
    it('Velg søkt veileder', () => {
        cy.getByTestId('veiledergruppe-modal-veileder-checkbox_0').check({force: true})
    })
    it('Søk en veileder til', () => {
        cy.getByTestId('veiledergruppe-modal-sok-veileder-input').clear().type(jonas)
    })
    it('Velg søkt veileder', () => {
        cy.getByTestId('veiledergruppe-modal-veileder-checkbox_0').check({force: true})
    })
    it('Klikk lagre', () => {
        cy.getByTestId('veiledergruppe-modal-lagre-knapp').click()
    })
    it('Toasten skal vise "Gruppen er opprettet"', () => {
        cy.getByTestId('veiledergruppe-toast').contains("Gruppen er opprettet")
    })
    it('Etikettene skal inneholde Andersen og Jonas', () => {
        cy.getByTestId('filtreringlabel').contains(andersen)
        cy.getByTestId('filtreringlabel').contains(jonas)
    })
    it('Det eksisterer 6 veiledergrupper', () => {
        cy.getByTestId('veiledergruppe-rad-wrapper').should('have.length', 6)
    })
    it('Ny gruppe skal være valgt', () => {
        cy.getByTestId('veiledergruppe-rad-wrapper')
            .contains(gruppenavn)
        cy.getByTestId(`veiledergruppe-rad_${gruppenavn}`)
            .should('be.checked')
    })
})

describe('Rediger filternavn', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-veiledergruppe-knapp_${gruppenavn}`).click()
    })
    it('Skriv inn nytt gruppenavn', () => {
        cy.getByTestId('veiledergruppe-modal-gruppenavn-input').clear().type(gruppenavnRedigert)
    })
    it('Klikk lagre', () => {
        cy.getByTestId('veiledergruppe-modal-lagre-knapp').click()
    })
    it('Toasten skal vise "Gruppen er lagret"', () => {
        cy.getByTestId('veiledergruppe-toast').contains("Gruppen er lagret")
    })
    it('Sjekk at filternavn er oppdatert', () => {
        cy.getByTestId('veiledergruppe-rad-wrapper')
            .contains(gruppenavnRedigert)
    })
    it('Det eksisterer 6 veiledergrupper', () => {
        cy.getByTestId('veiledergruppe-rad-wrapper').should('have.length', 6)
    })
})

describe('Rediger filtervalg', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-veiledergruppe-knapp_${gruppenavnRedigert}`).click()
    })
    it('Fjern veiledere', () => {
        cy.getByTestId('veiledergruppe-modal-valgt-veileder-fjernknapp').first().click()
        cy.getByTestId('veiledergruppe-modal-valgt-veileder-fjernknapp').first().click()
    })
    it('Antall veiledere skal være 0, og det skal stå "Ingen veiledere lagt til i gruppen"', () => {
        cy.getByTestId('veiledergruppe-modal-antall-valgte-veiledere_0').should('exist')
        cy.getByTestId('veiledergruppe-modal-valgte-veiledere-wrapper')
            .contains("Ingen veiledere lagt til i gruppen")
    })
    it('Klikk lagre endringer', () => {
        cy.getByTestId('veiledergruppe-modal-lagre-knapp').contains("Lagre endringer").click()
    })
    it('Feilmelding sier at du må legge til veiledere', () => {
        cy.getByTestId('veiledergrupper-modal-form').contains(minstEnVeileder)
    })
    it('Velg veileder', () => {
        cy.getByTestId('veiledergruppe-modal-veileder-checkbox_0').check({force: true})
    })
    it('Klikk lagre endringer', () => {
        cy.getByTestId('veiledergruppe-modal-lagre-knapp').contains("Lagre endringer").click()
    })
    it('Det eksisterer 6 veiledergrupper', () => {
        cy.getByTestId('veiledergruppe-rad-wrapper').should('have.length', 6)
    })
    it('Toasten skal vise "Gruppen er lagret"', () => {
        cy.getByTestId('veiledergruppe-toast').should("be.visible").contains("Gruppen er lagret")
    })
    it('Sjekk at det er ett filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 1).contains(aasen)
    })
})

describe('Slett veiledergruppe', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-veiledergruppe-knapp_${gruppenavnRedigert}`).click()
    })
    it('Klikk på slette-knapp', () => {
        cy.getByTestId('veiledergruppe-modal-slette-knapp').click()
    })
    it('Bekreft sletting', () => {
        cy.getByTestId('bekreft-sletting-modal-slett-knapp').click()
    })
    it('Det eksisterer 5 veiledergrupper', () => {
        cy.getByTestId('veiledergruppe-rad-wrapper').should('have.length', 5)
    })
    it('Toasten skal vise "Gruppen er slettet"', () => {
        cy.getByTestId('veiledergruppe-toast').should("be.visible").contains("Gruppen er slettet")
    })
})
