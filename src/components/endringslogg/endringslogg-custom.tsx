import { ModalName } from '../tour-modal/tour-modal';
import { EndringsloggLinkMedIkon } from './endringslogg-innhold';
import React from 'react';
import { ReactComponent as LinkIcon } from './external-link.svg';
import TourModalButton from '../tour-modal/tour-modal-button';
import Lenke from 'nav-frontend-lenker';

export interface EndringsloggInnlegg {
    tittel: string;
    dato: string;
    tekst: string;
    id: string;
    children?: React.ReactNode;
}

export interface EndringsloggInleggMedSettStatus extends EndringsloggInnlegg {
    sett: boolean;
}

const endringslogginnhold: EndringsloggInnlegg[] = [
    {
        dato: '16. JUL. 2019',
        tittel: 'NAV møte filter i Min oversikt',
        tekst: 'Vi har flyttet et filter. Det er nå lett å få oversikt over brukere sine møter med NAV.',
        id: ModalName.MOTE_FILTER,
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
        id: '0.1.9',
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
        id: '0.1.9',
    },
    {
        dato: '29. MAR. 2019',
        tittel: 'Manuell registrering',
        tekst: 'Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes.',
        id: '0.1.9',
        children:
            <EndringsloggLinkMedIkon
                url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
                linkTekst="Nyhetssak på Navet"
            />
        ,
    },
];

export function settModalEndring(innholdState: EndringsloggInleggMedSettStatus[], modal: string): EndringsloggInleggMedSettStatus[] {
    return innholdState.map((el) => {
        if (el.id === modal) {
            el.sett = true;
        }
        return el;
    });
}

export function settDefaultSettVerdier() {
    return endringslogginnhold.map((el) => {
        return ({
            ...el,
            sett: true,
        });
    });
}

export function getInnholdOgSettFraRemote(remotestorage: string[]): EndringsloggInleggMedSettStatus[] {
    return endringslogginnhold.map((el) => {
        const fraLocal = remotestorage.some((ver) => ver === el.id);
        return ({
            ...el,
            sett: fraLocal,
        });
    });
}
