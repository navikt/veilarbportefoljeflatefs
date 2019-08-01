import { ModalName } from '../../tour-modal/tour-modal';
import { EndringsloggLinkMedIkon } from '../endringslogg-innhold';
import React from 'react';
import TourModalButton from '../../tour-modal/tour-modal-button';

export interface EndringsloggInnlegg {
    tittel: string;
    dato: string;
    tekst: string;
    versjonId: string;
    children?: React.ReactNode;
}

export interface EndringsloggInnleggMedSettStatus extends EndringsloggInnlegg {
    sett: boolean;
}

const endringslogginnhold: EndringsloggInnlegg[] = [
    {
        dato: '16. JUL. 2019',
        tittel: 'NAV møte filter i Min oversikt',
        tekst: 'Vi har flyttet et filter. Det er nå lett å få oversikt over brukere sine møter med NAV.',
        versjonId: ModalName.MOTE_FILTER,
        children:
            <TourModalButton
                metrikknavn={'portefolje.endringslogg_modal'}
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
                metrikknavn={'portefolje.endringslogg_modal'}
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
