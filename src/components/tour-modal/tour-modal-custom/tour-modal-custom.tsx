import { ModalName, Step } from '../tour-modal';
import step1Bilde from './step/step-1.png';
import filter1Bilde from './filter/filter-1.png';
import filter2Bilde from './filter/filter-2.png';
import filter3Bilde from './filter/filter-3.png';
import filterendring1Bilde from './filterendringer/filterendringer-step1.png';
import filterendring2Bilde from './filterendringer/filterendringer-step2.png';
import filterendring3Bilde from './filterendringer/filterendringer-step3.png';

const stepsLastNedCV: Step[] = [
    {
        tittel: 'Last ned og skriv ut CV',
        bilde: step1Bilde,
        tekst: 'Du kan nå i Detaljer laste ned brukerens CV og få en bedre utskrift.'
    },
];

const stepsFilter: Step[] = [
    {
        tittel: 'Nytt status filter',
        bilde: filter1Bilde,
        tekst: 'Det er nå lettere å filtrere på brukere som i dag har møter med NAV i Min oversikt.'
    },
    {
        tittel: 'Enklere oversikt',
        bilde: filter2Bilde,
        tekst: 'Med filteret aktivert vil det listes opp personinformasjon, møtetid og varighet.'
    },
    {
        tittel: 'Viste du at...',
        bilde: filter3Bilde,
        tekst: 'Man kan også filtrere på ulike aktivteter, som "Møte med NAV" eller "Medisinsk behandling". Dette aktiveres i bunnen av "Filter".'
    },
];

const stepsFlytteFilter: Step[] = [
    {
        tittel: 'Dagens møter i Enhetens oversikt',
        bilde: filterendring1Bilde,
        tekst: 'Avtalte møter på kontoret vises nå i Enhetens oversikt.'
    },
    {
        tittel: 'Manuell oppfølging',
        bilde: filterendring2Bilde,
        tekst: 'Filteret “Manuell bruker” heter nå “Manuell oppfølging” og er flyttet til gruppen «Situasjon».'
    },
    {
        tittel: 'Rettighetsgruppe og ytelser',
        bilde: filterendring3Bilde,
        tekst: 'Disse filtrene ligger nå i samme gruppe.'
    },
];

const stepsblank: Step[] = [
    {
        tittel: '',
        bilde: step1Bilde,
        tekst: ''
    }
];

export function getTour(modal: ModalName) {
    switch (modal) {
        case ModalName.LAST_NED_CV:
            return stepsLastNedCV;
        case ModalName.MOTE_FILTER:
            return stepsFilter;
        case ModalName.FLYTTE_FILTER:
            return stepsFlytteFilter;
        default:
            return stepsblank;
    }

}
