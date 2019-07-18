import { Step, ModalName } from '../tour-modal';
import step1Bilde from './step-1.png';
import filter1Bilde from './filter-1.png';
import filter2Bilde from './filter-2.png';
import filter3Bilde from './filter-3.png';

const stepsLastNedCV: Step[] = [
    {
        tittel: 'Last ned og skriv ut CV' ,
        bilde: step1Bilde,
        tekst: 'Du kan nå i Detaljer laste ned brukerens CV og få en bedre utskrift.'
    },
];

const stepsFilter: Step[] = [
    {
        tittel: 'Nytt status filter' ,
        bilde: filter1Bilde,
        tekst: 'Det er nå lettere å filtrere på brukere som i dag har møter med NAV.'
    },
    {
        tittel: 'Enklere oversikt' ,
        bilde: filter2Bilde,
        tekst: 'Med filteret aktivert vil det listes opp personinformasjon, møtetid og varighet.'
    },
    {
        tittel: 'Viste du at...' ,
        bilde: filter3Bilde,
        tekst: 'Man kan også filtrere på ulike aktivteter, som "Møte med NAV" eller "Medisinsk behandling". Dette aktiveres i bunnen av "Filter".'
    },
];
const stepsblank: Step[] = [
    {
        tittel: '' ,
        bilde: step1Bilde,
        tekst: ''
    }
];

export function getTour(modal: ModalName) {
    switch(modal) {
        case ModalName.LAST_NED_CV:
          return stepsLastNedCV;
        case ModalName.MOTE_FILTER:
            return stepsFilter;
        default:
          return stepsblank;
      }

}
