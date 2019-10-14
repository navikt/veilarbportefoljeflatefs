import { ModalName } from '../../tour-modal/tour-modal';
import { EndringsloggLinkMedIkon } from '../endringslogg-innhold';
import React from 'react';
import TourModalButton from '../../tour-modal/tour-modal-button';
import { Normaltekst } from 'nav-frontend-typografi';

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
        dato: '14. OKT. 2019',
        tittel: 'Tittel på kolonner i oversikten',
        tekst: 'Vi har justert titlene på noen av kolonnene i oversikten. Funksjonaliteten er den samme som før.',
        versjonId: '0.2.2',
    },
    {
        dato: '26. SEP. 2019',
        tittel: 'Endring i arbeidslisten',
        tekst: 'Tittelfeltet i arbeidslisten er utvidet til 30 tegn. Kolonnetittelen i oversikten er endret fra "Kommentar" til "Tittel".',
        versjonId: '0.2.1',
    },
    {
        dato: '05. SEP. 2019',
        tittel: 'Endringer i filtrene',
        versjonId: '0.2.0',
        children:
        <>
            <ul className="endringslogg-innhold-liste">
                <li>«Møte med NAV i dag» finnes nå på Enhetens oversikt.</li>
                <li>Manuell oppfølging ligger nå under «Situasjon».</li>
                <li>Rettighetsgruppe og ytelser ligger nå i samme gruppe.</li>
            </ul>
            <Normaltekst>Vi har også justert meldingen du får når du sletter en bruker fra arbeidslista.</Normaltekst>
            <TourModalButton
                metrikknavn="portefolje.endringslogg_modal"
                modal={ModalName.FLYTTE_FILTER}
                knappeTekst="Se endringer"
            />
        </>
    },
    {
        dato: '16. JUL. 2019',
        tittel: 'NAV møte filter i Min oversikt',
        tekst: 'Vi har flyttet et filter. Det er nå lett å få oversikt over brukere sine møter med NAV.',
        versjonId: ModalName.MOTE_FILTER,
        children:
            <TourModalButton
                metrikknavn="portefolje.endringslogg_modal"
                modal={ModalName.MOTE_FILTER}
            />
        ,
    },
    {
        dato: '18. JUN. 2019',
        tittel: 'Laste ned og skrive ut CV',
        tekst: 'Du kan nå laste ned brukerens CV i Detaljer og få bedre utskrift.',
        versjonId: '0.1.9',
        children:
            <TourModalButton
                metrikknavn="portefolje.endringslogg_modal"
                modal={ModalName.LAST_NED_CV}
            />
        ,
    },

    {
        dato: '06. JUN. 2019',
        tittel: 'Visning av profilering i Detaljer',
        tekst: 'Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer.',
        versjonId: '0.1.9',
    },
    {
        dato: '29. MAR. 2019',
        tittel: 'Manuell registrering',
        tekst: 'Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes.',
        versjonId: '0.1.9',
        children:
            <EndringsloggLinkMedIkon
                url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
                linkTekst="Nyhetssak på Navet"
            />
        ,
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
