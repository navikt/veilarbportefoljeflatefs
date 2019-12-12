import { ModalName, Step } from '../tour-modal';
import nyKolonne1Bilde from './nyKolonne/nyKolonne-step1.png';
import nyKolonne2Bilde from './nyKolonne/nyKolonne-step2.png';
import veiledergruppe1 from './veiledergrupper/veiledergruppe1.png';
import veiledergruppe2 from './veiledergrupper/veiledergruppe2.png';
import veiledergruppe3 from './veiledergrupper/veiledergruppe3.png';


const stepsNyKolonne: Step[] = [
    {
        tittel: 'Startdato for oppfølgingsperioden',
        bilde: nyKolonne1Bilde,
        tekst: 'Oversikten har en ny kolonne, «Oppfølging startet». Klikk på kolonnetittelen for å sortere etter startdato.'
    },
    {
        tittel: 'Velg kolonner',
        bilde: nyKolonne2Bilde,
        tekst: 'Dersom det ikke er plass til å vise alle kolonner samtidig, kan du bruke «Velg kolonner».'
    },

];

const stepsVeiledergrupper: Step[] = [
    {
        tittel: 'Veiledergrupper i Enhetens oversikt',
        bilde: veiledergruppe1,
        tekst: 'Enhetens oversikt har nå ett nytt filter «Veiledergrupper».'
    },
    {
        tittel: 'Lag en ny gruppe',
        bilde: veiledergruppe2,
        tekst: 'Klikk på «Ny gruppe», lag et navn på gruppen og velg veiledere.'
    },
    {
        tittel: 'Bruk av en gruppe',
        bilde: veiledergruppe3,
        tekst: 'I listen ser du alle brukerne som er tildelt veilederne i gruppen. Klikk på blyantsymbolet for å redigere eller slette gruppen.'
    }
];

export function getTour(modal: ModalName) {
    switch (modal) {
        case ModalName.NY_KOLONNE:
            return stepsNyKolonne;
        case ModalName.VEILEDERGRUPPER:
            return stepsVeiledergrupper;
        default:
            return null;
    }

}
