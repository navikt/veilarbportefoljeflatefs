import {ModalName, Step} from '../tour-modal';
import React from 'react';
import mineFilter1 from './mine-filter/mine-filter1.png';
import mineFilter2 from './mine-filter/mine-filter2.png';
import mineFilter3 from './mine-filter/mine-filter3.png';

const stepsMineFilter: Step[] = [
    {
        tittel: 'Mine filter',
        bilde: mineFilter1,
        tekst:
            'Nå kan du lagre enkeltfiltre og kombinasjoner av flere filter. Da får du enklere tilgang på filtreringer du bruker mye.'
    },
    {
        tittel: 'Lagre nytt filter',
        bilde: mineFilter2,
        tekst: 'Gjør filtreringen du ønsker å lagre. Klikk på knappen «Lagre filter» og gi filteret et navn.'
    },
    {
        tittel: 'Endre navn eller slett filter',
        bilde: mineFilter3,
        tekst: 'Velg det aktuelle filteret og klikk på blyantsymbolet for å redigere navnet eller slette filteret.'
    }
];

export function getTour(modal: ModalName) {
    switch (modal) {
        case ModalName.MINE_FILTER:
            return stepsMineFilter;
        default:
            return null;
    }
}
