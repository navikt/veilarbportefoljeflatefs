import { ModalName } from '../../modal/tour-modal/tour-modal';
import { EndringsloggLinkMedIkon } from '../endringslogg-innhold';
import React from 'react';
import TourModalButton from '../../modal/tour-modal/tour-modal-button';
import '../endringslogg.less';
import '../collapse-container-transition.less';

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
        dato: '13. MAR. 2020',
        tittel: 'Velg farge på arbeidslisteikonet',
        versjonId: '13.03.20',
        tekst: 'Du kan nå merke notatene i arbeidslisten med fire ulike farger. Det kan være nyttig for å organisere og prioritere arbeidslisten. Du kan sortere listen etter farge.',
        children:
            <>Standardfargen på ikonet er blå, men du kan endre dette til lilla, grønn eller gul når du legger
                brukeren til arbeidslisten første gang, eller ved å redigere eksisterende notat.</>
    },
    {
        dato: '05. MAR. 2020',
        tittel: 'Nytt design på dialog',
        versjonId: '05.03.20',
        children:
            <>
                <ul className="endringslogg-innhold-liste">
                    <li>Utnytte skjermplassen bedre</li>
                    <li>På store skjermer vises innholdet i aktiviteten samtidig som dialogen</li>
                    <li>Enkel automatisk signatur for veileder</li>
                </ul>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/intranett-digital-hverdag/SitePages/Endringer-i-dialogen-i-aktivitetsplanen.aspx"
                    linkTekst="Les mer på navet"
                />
            </>
    },
    {
        dato: '04. MAR. 2020',
        versjonId: '04.03.20',
        tittel: 'Veiledergrupper i veilederoversikten',
        tekst: 'Veiledergruppene vises nå også i veilederoversikten. Når du velger en gruppe ser du veilederne i gruppen, og antall brukere hver veileder er tildelt.',
    },
    {
        dato: '03. MAR. 2020',
        versjonId: '03.03.20',
        tittel: 'Endringer i veilederverktøy',
        tekst: 'Funksjon for legge brukeren til arbeidslisten og tildele veileder ligger nå i Veilederverktøy. Du kan også klikke på arbeidslisteikonet for å legge til, se og redigere kommentaren i arbeidslisten.',
        children:
            <>
                <TourModalButton
                    metrikknavn="portefolje.endringslogg_modal.veilederverktoy"
                    modal={ModalName.VEILEDERVERKTOY}
                    knappeTekst="Se hvordan"
                />
            </>
    },
    {
        dato: '02. MAR. 2020',
        versjonId: '02.03.20',
        tittel: 'Tilrettelegging',
        tekst: 'Nå kan du registrere brukernes behov for tilrettelegging under Detaljer. Det gjør det enklere å koble disse brukerne sammen med arbeidsgivere som kan inkludere. Brukerne blir søkbare i kandidatsøket i Rekrutteringsbistand. ',
        children:
            <>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Finn-kandidat.aspx"
                    linkTekst="Nyhetssak på Navet"
                />
                <TourModalButton
                    metrikknavn="portefolje.endringslogg_modal.tilrettelegging"
                    modal={ModalName.TILRETTELEGGING}
                    knappeTekst="Se hvordan"
                />
            </>
    },
    {
        dato: '23. JAN. 2020',
        versjonId: '23.01.20',
        tittel: 'Visuelle endringer i oversikten',
        children:
            <>
                <ul>
                    <li>Kolonnetitler og funksjoner i listen står nå fast øverst på siden når du blar nedover. Da ser du
                        og kan bruke dem uansett hvor du er i listen.
                    </li>
                    <li>Avhukingsboksen for å velge alle brukerne i listen står nå på samme rad som de sorterbare
                        kolonnetitlene.
                    </li>
                </ul>
            </>
    },
    {
        dato: '17. JAN. 2020',
        versjonId: '17.01.20',
        tittel: 'Stolpediagramvisning er fjernet',
        tekst: 'Når du filtrerer på ytelse har det vært en funksjonalitet for å se et stolpediagram som viser antall personer med ytelsen fordelt på tidsperioder.',
        children: <p>Funksjonaliteten har vært lite brukt og er derfor nå fjernet.</p>
    },
    {
        dato: '12. DES. 2019',
        versjonId: '12.12.19',
        tittel: 'Veiledergrupper',
        tekst: 'Nå kan du opprette grupper av veiledere i «Enhetens oversikt». Det gjør det enklere å få oversikt over status til brukerne i avdelinger og team på NAV-kontoret.',
        children:
            <>
                <div className="veiledergrupper-navet-tekst">
                    <EndringsloggLinkMedIkon
                        url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/N%C3%A5-kan-du-lage-avdelinger-og-team-i-oversikten.aspx?source=https%3A%2F%2Fnavno.sharepoint.com%2Fsites%2Ffag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging"
                        linkTekst="Nyhetssak på Navet"
                    />
                </div>
                <TourModalButton
                    metrikknavn="portefolje.endringslogg_modal.veiledergrupper"
                    modal={ModalName.VEILEDERGRUPPER}
                    knappeTekst="Se hvordan"
                />
            </>
    },
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
