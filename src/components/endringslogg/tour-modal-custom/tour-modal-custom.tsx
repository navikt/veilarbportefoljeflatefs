import { Step, modalName } from "../../tour-modal/tour-modal"
import step1Bilde from "./step-1.png";

const stepsLastNedCV: Step[] = [
    {
        tittel: 'Nytt status filter' , 
        bilde: step1Bilde,
        tekst: 'Det er nå lettere å filtrere på hvem som har oppkommende møter med NAV.'
    },
    {
        tittel: 'Enklere oversikt' ,
        bilde: step1Bilde,
        tekst: 'Resultatet blir en sortert liste med navn og møte tid.'
    },
];
const stepsblank: Step[] = [
    {
        tittel: '' , 
        bilde: step1Bilde,
        tekst: ''
    }
];

export function getTour(modal: modalName){
    switch(modal) {
        case modalName.LAST_NED_CV:
          return stepsLastNedCV;
        default:
          return stepsblank;
      }

}

