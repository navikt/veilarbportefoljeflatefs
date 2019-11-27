import { ModalName, Step } from '../tour-modal';
import nyKolonne1Bilde from './nyKolonne/nyKolonne-step1.png';
import nyKolonne2Bilde from './nyKolonne/nyKolonne-step2.png';

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

export function getTour(modal: ModalName) {
    switch (modal) {
        case ModalName.NY_KOLONNE:
            return stepsNyKolonne;
        default:
            return null;
    }

}
