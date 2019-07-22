import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useState, useEffect } from 'react';
import { getInnhold, settModalEndring, getInnholdOgSett } from './endringslogg-custom';
import { registrerHarLestEndringslogg } from './endringslogg-utils';

export default function EndringsloggTourWrapper() {
    const [innholdsListe, setInnholdsliste] = useState(getInnholdOgSett());

    const oppdaterSettListe = ((name: string)=> setInnholdsliste(settModalEndring(innholdsListe,name)));
    const oppdaterLocalstorageOgState = () => {
        innholdsListe.forEach((elem) => {
            oppdaterSettListe(elem.id);
            registrerHarLestEndringslogg(elem.id);
        });
    };

    return(
        <>
            <Endringslogg innhold={innholdsListe} oppdaterInnhold={oppdaterLocalstorageOgState} />
            <TourModalLocalStorage completed={oppdaterSettListe} />
        </>
    );
}
