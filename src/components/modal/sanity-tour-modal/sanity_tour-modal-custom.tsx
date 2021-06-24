import mineFilter1 from './mine-filter/mine-filter1.png';
import mineFilter2 from './mine-filter/mine-filter2.png';
import mineFilter3 from './mine-filter/mine-filter3.png';
import {ModalName, TourModalConfig} from './sanity_tour-modal';
import {groqStepperPreviewFields, StepperData} from './sanity_tour-modal-groq';

interface StepperProps {
    stepper: StepperData[];
}

const stepsMineFilter: TourModalConfig = {
    steps: [
        {
            tittel: '',
            bilde: mineFilter1,
            altTekst: 'Et bilde av oversikten hvor den nye funksjonen "Mine filter" er uthevet.',
            tekst:
                'Nå kan du lagre enkeltfiltre og kombinasjoner av flere filter. Da får du enklere tilgang på filtreringer du bruker mye.'
        },
        {
            tittel: 'Lagre nytt filter',
            bilde: mineFilter2,
            altTekst: 'Et bilde av oversikten hvor knappen "Lagre filter" er markert.',
            tekst: 'Gjør filtreringen du ønsker å lagre. Klikk på knappen «Lagre filter» og gi filteret et navn.'
        },
        {
            tittel: 'Endre navn eller slett filter',
            bilde: mineFilter3,
            altTekst: 'Et bilde av oversikten hvor et ikon av en redigeringsblyant er markert.',
            tekst: 'Velg det aktuelle filteret og klikk på blyantsymbolet for å redigere navnet eller slette filteret.'
        }
    ]
};




export function getTour(modal: ModalName) {
    switch (modal) {
        case ModalName.MINE_FILTER:
            return stepsMineFilter.steps;
        default:
            return null;
    }
}

export function getTitle(modal: ModalName) {
    switch (modal) {
        case ModalName.MINE_FILTER:
            return stepsMineFilter.modalTittel;
        default:
            return null;
    }
}
