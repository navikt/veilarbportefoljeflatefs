import { ModalName } from '../tour-modal/tour-modal';
import { hentSetteVersjonerLocalstorage } from './endringslogg-utils';

export interface Endring {
    tittel: string;
    dato: string;
    tekst: string;
    id: string;
    children: any;
}

const innhold: Endring[] = [
    {
        dato: '16. JUL. 2019',
        tittel: 'NAV møte filter',
        tekst: 'Vi har flyttet et filter. Det er nå lett å få oversikt over brukere sine møter med NAV.',
        id: ModalName.MOTE_FILTER,
        children: {
            modal: ModalName.MOTE_FILTER,
        },
    },

    {
        dato: '18. JUN. 2019',
        tittel: 'Laste ned og skrive ut CV',
        tekst: 'Du kan nå laste ned brukerens CV i Detaljer og få bedre utskrift.',
        id: '0.1.9',
        children: {
            modal: ModalName.LAST_NED_CV,
        },
    },

    {
        dato: '06. JUN. 2019',
        tittel: 'Visning av profilering i Detaljer',
        tekst: 'Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer.',
        id: '0.1.9',
        children: {
        },
    },
    {
        dato: '29. MAR. 2019',
        tittel: 'Manuell registrering',
        tekst: 'Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes.',
        id: '0.1.9',
        children: {
            linkTekst: 'Nyhetssak på Navet',
            linkUrl: 'https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx',
        },
    },
];

export function getInnhold() {
    return innhold;
}

export function mapLocaldtoargeTilEndringsinnhold() {
    const locSto = hentSetteVersjonerLocalstorage();
    return innhold.map((endring)=> {
        const harSett = locSto.some((ver) => ver === endring.id);
        return {key: endring.id, sett: harSett};
    });
}

export function settModalEndring(innholdState:{key: string, sett: boolean}[], modal: string): {key: string, sett: boolean}[] {
    return innholdState.map((el)=> {
        if(el.key === modal) {
            el.sett = true;
        }
        return el;
    });
}
