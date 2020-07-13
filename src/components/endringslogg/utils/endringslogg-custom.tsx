import {ModalName} from '../../modal/tour-modal/tour-modal';
import {EndringsloggLinkMedIkon} from '../endringslogg-innhold';
import React from 'react';
import TourModalButton from '../../modal/tour-modal/tour-modal-button';
import '../endringslogg.less';
import '../collapse-container-transition.less';
import {FeaturesState} from '../../../ducks/features';

export interface EndringsloggInnlegg {
    tittel: string;
    dato: string;
    versjonId: string;
    tekst?: string;
    children?: React.ReactNode;
    featureToggleName?: string;
}

export interface EndringsloggInnleggMedSettStatus extends EndringsloggInnlegg {
    sett: boolean;
    erEndringsloggFeaturePa?: boolean;
}

const endringslogginnhold: EndringsloggInnlegg[] = [
    {
        dato: '10. JUL. 2020',
        tittel: 'Nytt filter på CV/jobbprofil',
        versjonId: '10.07.20',
        tekst: 'Nå kan du filtrere på brukere som har/ikke har delt CV og jobbprofil med NAV. Da blir det enklere å identifisere og prioritere hvilke brukere som kan ha behov for råd og veiledning i registrering av CV og jobbprofil på arbeidsplassen.no.',
        children:
            <>
                <p>Filtrene ligger i gruppen "Status og brukergrupper" under "Filter".</p>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Nytt-filter-i-oversikten--Delt-ikke-delt-CV-og-jobbprofil-med-NAV.aspx"
                    linkTekst="Nyhetssak på Navet"
                />
            </>
    }, {
        dato: '26. JUN. 2020',
        tittel: 'Videomøte som alternativ',
        versjonId: '26.06.20',
        tekst: 'Brukere som svarer i registreringen at de har problemer med å søke eller være i jobb (profilert til “Behov for AEV”), får et spørsmål om hvordan de ønsker å fortelle mer om sin situasjon. Nå kan bruker også velge videomøte som alternativ.',
        children:
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-veileder-for-arbeidsrettet-brukeroppfolging/SitePages/Registrering-og-behovsvurdering.aspx"
                    linkTekst="Se Veileder for arbeidsrettet brukeroppfølging"
                />
    }, {
        dato: '22. JUN. 2020',
        tittel: 'Etiketten «Permittert etter 9. mars» er nå fjernet',
        versjonId: '22.06.20',
        tekst: 'Mange av de permitterte har fått endring i sin situasjon, og etiketten «Permittert etter 9. mars» er derfor nå fjernet. Du kan fremdeles finne de som har registrert seg etter 9. mars og som har svart «Er permittert eller kommer til å bli permittert» ved å benytte filteret «Permittert etter 09.03.2020».',
        children:
            <EndringsloggLinkMedIkon
                url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Etiketten-%E2%80%9CPermittert-etter-9.-mars%E2%80%9D-er-n%C3%A5-fjernet.aspx?source=https%3A%2F%2Fnavno.sharepoint.com%2Fsites%2Ffag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging"
                linkTekst="Nyhetssak på navet"
            />
    },
    {
        dato: '05. MAI. 2020',
        tittel: 'Filtrering av arbeidsliste på farger',
        versjonId: '05.05.20',
        featureToggleName: 'veilarbportefolje.arbeidslistekategori_filtrering',
        tekst: 'Nå kan du filtrere på de ulike fargene på arbeidslisteikonet. Når du velger “Min arbeidsliste” ser du de nye filtervalgene.',

    }, {
        dato: '04. MAI. 2020',
        tittel: 'Nå kan du markere et møte som videomøte',
        versjonId: '04.05.20',
        tekst: 'Nettmøte har endret navn til videomøte i aktivitetsplanen. Hvis du velger videomøte, så ligger det nå en lenke til rutinen for videomøte. Brukeren ser ikke denne lenken.',

    }, {
        dato: '06. APR. 2020',
        tittel: 'Filtrering på brukers situasjon fra registrering',
        versjonId: '06.04.20',
        tekst: 'Nå kan du filtrere frem brukere basert på situasjonen de har oppgitt på registreringstidspunktet. Filteret heter "Svar fra registrering" og ligger under filtergruppen "Situasjon", og du kan kombinere filteret med f.eks. "Trenger vurdering".',
        children:
            <EndringsloggLinkMedIkon
                url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Nye-filtre-i-Enhetens--og-Min-oversikt-i-Modia--brukers-svar-fra-registrering.aspx"
                linkTekst="Nyhetssak på Navet"
            />
    },
    {
        dato: '03. APR. 2020',
        tittel: 'Tekst i dialog forsvinner ikke',
        versjonId: '03.04.20',
        tekst: 'Når du starter på en melding i dialogen vil denne nå lagres hos deg i en kort tid (24 timer). Du kan da besøke andre sider samtidig som du jobber med teksten, uten å miste noe.',
    },
    {
        dato: '02. APR. 2020',
        tittel: 'Nye filtre i Modia for permitterte etter 9. mars 2020',
        versjonId: '02.04.20',
        tekst: 'Du kan nå filtrere på brukere som har registrert seg etter 9. mars og oppgitt at de er permittert i Enhetens oversikt og Min oversikt i Modia. Brukerne vises også med en etikett i oversikten og på visittkortet over aktivitetsplanen.',
        children:
            <>
                <TourModalButton
                    metrikknavn="portefolje.endringslogg_modal.permitterte"
                    modal={ModalName.PERMITTERTE}
                    knappeTekst="Se hvordan"
                    className="permitterte"
                />
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Nye-filtre-i-Enhetens--og-Min-oversikt-i-Modia--brukers-svar-fra-registrering-om-sin-situasjon.aspx"
                    linkTekst="Nyhetssak på Navet"
                />
            </>
    },
    {
        dato: '18. MAR. 2020',
        tittel: 'Automatisk melding til permitterte',
        versjonId: '18.03.20',
        tekst: 'Brukere som registrerer seg med situasjonen «Er permittert eller kommer til å bli permittert» får nå en automatisk melding i dialogen om hva de nå bør gjøre.',
        children:
            <EndringsloggLinkMedIkon
                url="https://navno.sharepoint.com/sites/intranett-digital-hverdag/SitePages/For-permitterte--Ny-automatisk-dialog-etter-registrering.aspx"
                linkTekst="Se denne og andre små endringer på Navet"
            />
    },
    {
        dato: '16. MAR. 2020',
        tittel: 'Farger på arbeidslisteikon og forventet svartid i dialog',
        versjonId: '16.03.20',
        children:
            <ul>
                <li>
                    Du kan nå merke kommentaren i arbeidslisten med fire ulike farger. Det kan være nyttig for å
                    organisere og prioritere arbeidslisten. Du kan sortere listen etter farge. Du kan endre
                    standardfargen når du legger brukeren til arbeidslisten første gang, eller ved å redigere
                    eksisterende kommentar.
                </li>
                <li>
                    Bruker får nå informasjon i dialog om at svartiden kan bli lenger enn vanlig på grunn av situasjonen
                    rundt korona.
                </li>
            </ul>
    },
    {
        dato: '13. MAR. 2020',
        tittel: 'Endre møteform på et avtalt møte',
        versjonId: '13.03.20',
        tekst: 'På aktiviteten "møte" i aktivitetsplanen kan du nå endre møteform, selv om møtet er satt til «Avtalt med NAV». Husk å sende en dialogmelding til brukeren om endringen du gjør.'
    },
    {
        dato: '05. MAR. 2020',
        tittel: 'Nytt design på dialog',
        versjonId: '05.03.20',
        children:
            <>
                <ul>
                    <li>Utnytte skjermplassen bedre</li>
                    <li>På store skjermer vises innholdet i aktiviteten samtidig som dialogen</li>
                    <li>Enkel automatisk signatur for veileder</li>
                </ul>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/intranett-digital-hverdag/SitePages/Endringer-i-dialogen-i-aktivitetsplanen.aspx"
                    linkTekst="Nyhetssak på Navet"
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

export function setHarSettAlt(endringslogginnhold: EndringsloggInnlegg[]) {
    return endringslogginnhold.map((el) => {
        return ({
            ...el,
            sett: true
        });
    });
}

export function mapRemoteToState(remotestorage: string[], features: FeaturesState): EndringsloggInnleggMedSettStatus[] {
    return endringslogginnhold.map((el) => {
        const settRemote = remotestorage.some((ver) => ver === el.versjonId);
        return ({
            ...el,
            sett: settRemote,
            erEndringsloggFeaturePa: el.featureToggleName ? features[el.featureToggleName] : true
        });
    });
}
