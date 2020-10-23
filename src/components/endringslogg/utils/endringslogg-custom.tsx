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
                <TourModalButton
                    metrikknavn="portefolje.endringslogg_modal.mine-filter"
                    modal={ModalName.MINE_FILTER}
                    knappeTekst="Se hvordan"
                />
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

export function settModalEndring(
    innholdState: EndringsloggInnleggMedSettStatus[],
    modal: string
): EndringsloggInnleggMedSettStatus[] {
    return innholdState.map(el => {
        if (el.versjonId === modal) {
            el.sett = true;
        }
        return el;
    });
}

export function setHarSettAlt(endringslogginnhold: EndringsloggInnlegg[]) {
    return endringslogginnhold.map(el => {
        return {
            ...el,
            sett: true
        };
    });
}

export function mapRemoteToState(remotestorage: string[], features: FeaturesState): EndringsloggInnleggMedSettStatus[] {
    return endringslogginnhold.map(el => {
        const settRemote = remotestorage.some(ver => ver === el.versjonId);
        return {
            ...el,
            sett: settRemote,
            erEndringsloggFeaturePa: el.featureToggleName ? features[el.featureToggleName] : true
        };
    });
}
