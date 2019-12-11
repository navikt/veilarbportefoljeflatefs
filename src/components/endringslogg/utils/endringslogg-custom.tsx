import { ModalName } from '../../tour-modal/tour-modal';
import { EndringsloggLinkMedIkon } from '../endringslogg-innhold';
import React from 'react';
import TourModalButton from '../../tour-modal/tour-modal-button';

export interface EndringsloggInnlegg {
    tittel: string;
    dato: string;
    tekst?: string;
    versjonId: string;
    children?: React.ReactNode;
}

export interface EndringsloggInnleggMedSettStatus extends EndringsloggInnlegg {
    sett: boolean;
}

const endringslogginnhold: EndringsloggInnlegg[] = [
    {
        dato: '12. DES. 2019',
        versjonId: '12.12.19',
        tittel: 'Nå kan du lage avdelinger og team i oversikten',
        tekst: 'Nå kan du opprette grupper av veiledere i «Enhetens oversikt». Det gjør det enklere å få oversikt over status til brukerne i avdelinger og team på NAV-kontoret.',
        children:
            <>
                <TourModalButton
                    metrikknavn="portefolje.endringslogg_modal.veiledergrupper"
                    modal={ModalName.VEILEDERGRUPPER}
                    knappeTekst="Se hvordan"
                />
            </>
    },
    {
        dato: '02. DES. 2019',
        versjonId: '02.12.19',
        tittel: 'Nytt design på mål etter test',
        tekst: 'Testen av to ulike design for inngangen til mål er ferdig, og design B fungerte best. Det ligger nå ute hos alle brukerne som ikke allerede har oppgitt mål i aktivitetsplanen.',
        children:
            <>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Hvordan-f%C3%A5-flere-brukere-til-%C3%A5-opprette-et-m%C3%A5l-i-aktivitetsplanen-.aspx"
                    linkTekst="Nyhetssak på Navet"
                />
            </>
    },
    {
        dato: '29. NOV. 2019',
        versjonId: '29.11.19',
        tittel: 'Historikk på oppfølgingsenhet',
        tekst: 'Historikken i Veilederverktøy (tannhjulet) viser nå også brukers oppfølgingsenhet. Ved lansering av denne funksjonen har vi lagt inn gjeldende oppfølgingsenhet med datoen 28. nov. 2019.'
    },
    {
        dato: '28. NOV. 2019',
        versjonId: '28.11.19',
        tittel: 'Ny etikett: “Ikke registrert i KRR”',
        tekst: 'Brukere som ikke har oppdatert eller bekreftet kontaktinformasjon de siste 18 månedene i Kontakt-' +
            ' og reservasjonsregisteret (KRR) vises nå med etiketten “Ikke registrert KRR”. Disse brukerne kan ikke varsles fordi de ikke har registrert kontaktinformasjon.'
    },
    {
        dato: '06. NOV. 2019',
        tittel: 'Test av nytt mål og logg på tildelt veileder',
        versjonId: '06.11.19',
        children:
            <>
                <ul className="endringslogg-innhold-liste">
                    <li className="endringslogg-liste-punkt-topp">Vi tester to ulike design av målet i aktivitetsplanen
                        for å finne ut om flere brukere legger inn sitt mål.
                        <EndringsloggLinkMedIkon
                            url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Hvordan-f%C3%A5-flere-brukere-til-%C3%A5-opprette-et-m%C3%A5l-i-aktivitetsplanen-.aspx"
                            linkTekst="Nyhetssak på Navet"
                        />
                    </li>
                    <li>Historikken i Veilederverktøy viser nå også tildeling av
                        veileder. Når tildeling av veileder gjøres under en KVP-periode, er historikken kun synlig for
                        ansatte med tilgang på brukerens
                        enhet.
                    </li>
                </ul>
            </>
    },
    {
        dato: '04. NOV. 2019',
        tittel: 'Startdato for oppfølgingsperioden',
        tekst: 'Oversikten har nå en kolonne som viser startdato for oppfølgingsperioden. Brukere registrert før aktivitetsplanen ble lansert 4. des. 2017 vises med dato "04.12.2017". Du kan sortere listen etter startdato.',
        versjonId: '0.2.5',
        children:
            <TourModalButton
                metrikknavn="portefolje.endringslogg_modal"
                modal={ModalName.NY_KOLONNE}
                knappeTekst="Se hvordan"
            />
    },
    {
        dato: '22. OKT. 2019',
        tittel: 'Rydding i oversikten',
        tekst: 'Vi har ryddet litt i oversikten og endret titler på noen av kolonnene. Funksjonaliteten er den samme.',
        versjonId: '0.2.2',
        children:
            <p>Tips: Når det er mer enn fem kolonner kan du klikke på «Velg kolonner» for å endre hvilken informasjon
                som skal vises i listen.</p>
    }
];

export function settModalEndring(innholdState: EndringsloggInnleggMedSettStatus[], modal: string): EndringsloggInnleggMedSettStatus[] {
    return innholdState.map((el) => {
        if (el.versjonId === modal) {
            el.sett = true;
        }
        return el;
    });
}

export function setHarSettAlt() {
    return endringslogginnhold.map((el) => {
        return ({
            ...el,
            sett: true,
        });
    });
}

export function mapRemoteToState(remotestorage: string[]): EndringsloggInnleggMedSettStatus[] {
    return endringslogginnhold.map((el) => {
        const settRemote = remotestorage.some((ver) => ver === el.versjonId);
        return ({
            ...el,
            sett: settRemote,
        });
    });
}
