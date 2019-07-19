import { ModalName } from '../tour-modal/tour-modal';
import { hentSetteVersjonerLocalstorage } from './endringslogg-utils';

export interface Endring {
    key: number;
    tittel: string;
    dato: string;
    tekst: string;
    id: string;
    sett: boolean;
    children: any;
}

const innhold: Endring[] = [
    {
        key: 0,
        dato: '16. JUL. 2019',
        tittel: 'NAV møte filter',
        tekst: 'Vi har flyttet et filter. Det er nå lett å få oversikt over brukere sine møter med NAV.',
        id: ModalName.MOTE_FILTER,
        sett: false,
        children: {
            modal: ModalName.MOTE_FILTER,
        },
    },

    {
        key: 0,
        dato: '18. JUN. 2019',
        tittel: 'Laste ned og skrive ut CV',
        tekst: 'Du kan nå laste ned brukerens CV i Detaljer og få bedre utskrift.',
        id: '0.1.9',
        sett: false,
        children: {
            modal: ModalName.LAST_NED_CV,
        },
    },

    {
        key: 0,
        dato: '06. JUN. 2019',
        tittel: 'Visning av profilering i Detaljer',
        tekst: 'Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer.',
        id: '0.1.9',
        sett: false,
        children: {
        },
    },
    {
        key: 0,
        dato: '29. MAR. 2019',
        tittel: 'Manuell registrering',
        tekst: 'Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes.',
        id: '0.1.9',
        sett: false,
        children: {
            linkTekst: 'Nyhetssak på Navet',
            linkUrl: 'https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx',
        },
    },
];

export function getInnhold() {
    const locSto = hentSetteVersjonerLocalstorage();
    let i = 0;
    innhold.forEach((endring)=> {
        endring.key = i++;
        if (locSto.some((ver) => ver === endring.id)) {
            endring.sett = true;
        }
    });
    return innhold;
}
