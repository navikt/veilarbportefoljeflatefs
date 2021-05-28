import {ModalName} from '../../modal/tour-modal/tour-modal';
import {EndringsloggLinkMedIkon} from '../endringslogg-innhold';
import React from 'react';
import TourModalButton from '../../modal/tour-modal/tour-modal-button';
import '../endringslogg.less';
import '../collapse-container-transition.less';

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
}

const endringslogginnhold: EndringsloggInnlegg[] = [
    {
        dato: '16. april 2021',
        tittel: 'Justering av arbeidslisteikoner',
        versjonId: '16.04.21',
        tekst:
            'Det er gjort justeringer av farge og form på arbeidslisteikoner for å gi mer universell utforming, og gjøre det lettere å skille fargene fra hverandre.'
    },
    {
        dato: '08. april 2021',
        tittel: 'Ny aktivitet for brukere og nye filter i oversikten',
        versjonId: '08.04.21',
        children: (
            <>
                Nå kan brukere selv legge til aktiviteten “medisinsk behandling” i sin aktivitetsplan.
                <br />
                Du kan filtrere på brukere som selv har lagt til nye, fullført eller avbrutt aktiviteter, og brukere som
                har gjort endringer i målet.
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Viktige-endring-i-Modia-arbeidsrettet-oppfølging.aspx"
                    linkTekst="Se mer informasjon på Navet"
                />
                <TourModalButton modal={ModalName.SISTE_ENDRING} knappeTekst="Se hvordan" />
            </>
        )
    },
    {
        dato: '24. mars 2021',
        tittel: 'Gi dine brukere flere muligheter for å komme i jobb',
        versjonId: '24.03.21',
        children: (
            <>
                I Rekrutteringsbistand finner du ca. 900 stillinger med inkluderingsmuligheter. Bruk mulighetsrommet hos
                arbeidsgiver og registrer behov for tilrettelegging under «Detaljer».
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Inkludering---for-vei.aspx"
                    linkTekst="Se mer informasjon på Navet"
                />
                <TourModalButton modal={ModalName.TILRETTELEGGING} knappeTekst="Se hvordan" />
            </>
        )
    },
    {
        dato: '10. mars 2021',
        tittel: 'Forenklet filter for aktiviteter og tiltak',
        versjonId: '10.03.2021',
        children: (
            <>
                <p className="forenklet-filter__topp">
                    Vi har forenklet filtrene for ulike aktivitetstyper. Når du velger en eller flere av
                    aktivitetstypene viser listen brukere som har en eller flere av de valgte aktivitetene.
                </p>
                <p>
                    Velg “Avansert filter” for å filtrere på brukere som kun har bestemte aktiviteter eller som ikke har
                    en gitt aktivitet.
                </p>
                <p className="forenklet-filter__bunn">
                    Du kan nå filtrere direkte på tiltakstyper uten først å måtte velge “Tiltak gjennom NAV” fra
                    aktivitetsfilteret.
                </p>
            </>
        )
    },
    {
        dato: '10. desember 2020',
        tittel: 'Endre info om søknadsprosessen',
        versjonId: '10.12.20',
        tekst:
            'Nå kan brukere oppdatere status om søknadsprosessen også etter at en stillingsaktivitet er satt til “Fullført” eller “Avbrutt”.'
    },
    {
        dato: '23. november 2020',
        tittel: 'Filtrer på svarene fra registreringen om utdanning',
        versjonId: '23.11.20',
        children: (
            <>
                <p>
                    Nå kan du filtrere på svarene brukerne oppga i registreringen på spørsmålene om utdanning. Dette kan
                    hjelpe deg med å identifisere og prioritere hvilke brukere som kan ha behov for veiledning om
                    utdanning.
                </p>
                <p>Filtrene finner du i filtergruppen "Svar fra registrering" i fanen til høyre i filterkolonnen.</p>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Nye-filter-i-oversikten--Svar-om-utdanning-fra-registrering.aspx"
                    linkTekst="Nyhetssak på Navet"
                />
            </>
        )
    },
    {
        dato: '4. november 2020',
        tittel: 'Filteret “Permittert etter 09.03.2020” er fjernet',
        versjonId: '04.11.20',
        children: (
            <>
                <p>
                    Ved å bruke filteret “Svar fra registrering” kan du fremdeles filtrere på de ulike situasjonene
                    brukerne oppga når de registrerte seg.
                </p>
                <p>
                    Mange av de som tidligere var permittert har fått endret situasjon, og filtrene “Alle utenom
                    permittert etter 09.03.2020” og “Permittert etter 09.03.2020" har derfor vært misvisende.
                </p>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Filteret--Permittert-etter-09.03.2020%E2%80%9D-er-n%C3%A5-fjernet-fra-oversikten-i-Modia.aspx"
                    linkTekst="Nyhetssak på Navet"
                />
            </>
        )
    },
    {
        dato: '29. september 2020',
        tittel: 'Endringer i filtrene',
        versjonId: '29.09.20',
        children: (
            <>
                <ul>
                    <li>
                        Nå kan du bestemme rekkefølgen på filtrene i Mine filter. Klikk på hengelåssymbolet for å endre
                        rekkefølgen.
                    </li>
                    <li>
                        Filtrene er lagt i klikkbare faner med ikoner. Da må du skrolle mindre og får raskere tilgang
                        til filtrene. Filtrene ligger fast på siden slik at du alltid ser dem når du scroller i listen.
                        Du kan lukke filtermenyen dersom du ønsker større plass til listen.
                    </li>
                </ul>
            </>
        )
    },
    {
        dato: '8. september 2020',
        tittel: 'Varsel til bruker før møter',
        versjonId: '08.09.20',
        tekst:
            'For møter som er innkalt gjennom aktivitetsplanen, vil det nå bli sendt ut påminnelse til brukeren 24 timer før møtet.',
        children: (
            <EndringsloggLinkMedIkon
                url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/N%C3%A5-f%C3%A5r-brukerne-automatisk-varsel-om-m%C3%B8te-med-NAV.aspx"
                linkTekst="Nyhetssak på Navet"
            />
        )
    },
    {
        dato: '26. august 2020',
        tittel: 'Lagre filter',
        versjonId: '26.08.20',
        tekst:
            'Nå kan du lagre filter i oversikten. Dette kan være nyttig for å lage kombinasjoner av flere filter og som en snarvei til et filter du bruker ofte. Filtrene finner du i “Mine filter”.',
        children: (
            <>
                <TourModalButton modal={ModalName.MINE_FILTER} knappeTekst="Se hvordan" />
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Lagre-filtre-i-Min-oversikt.aspx "
                    linkTekst="Nyhetssak på Navet"
                    className="endringslogg_mine-filter"
                />
            </>
        )
    },
    {
        dato: '3. august 2020',
        tittel: 'Brukernotifikasjon om CV',
        versjonId: '03.08.20',
        tekst:
            'Fra mandag 3. august vil noen brukere få notifikasjon på forsiden av Ditt NAV om utfylling av CV og jobbprofil. Vi tester ut om flere brukere da legger inn sin CV raskere. Dersom resultatene er gode, får alle brukere denne notifikasjonen.'
    },
    {
        dato: '10. juli 2020',
        tittel: 'Nytt filter på CV/jobbprofil',
        versjonId: '10.07.20',
        tekst:
            'Nå kan du filtrere på brukere som har/ikke har delt CV og jobbprofil med NAV. Da blir det enklere å identifisere og prioritere hvilke brukere som kan ha behov for råd og veiledning i registrering av CV og jobbprofil på arbeidsplassen.no.',
        children: (
            <>
                <p>Filtrene ligger i gruppen "Status og brukergrupper" under "Filter".</p>
                <EndringsloggLinkMedIkon
                    url="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Nytt-filter-i-oversikten--Delt-ikke-delt-CV-og-jobbprofil-med-NAV.aspx"
                    linkTekst="Nyhetssak på Navet"
                />
            </>
        )
    }
];

export function setHarSettAlt(endringslogginnhold: EndringsloggInnlegg[]) {
    return endringslogginnhold.map(el => {
        return {
            ...el,
            sett: true
        };
    });
}

export function mapRemoteToState(remotestorage: string[]): EndringsloggInnleggMedSettStatus[] {
    return endringslogginnhold.map(el => {
        const settRemote = remotestorage.some(ver => ver === el.versjonId);
        return {
            ...el,
            sett: settRemote
        };
    });
}
