import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useState, useEffect } from 'react';
import { getInnhold, mapLocaldtoargeTilEndringsinnhold, settModalEndring } from './endringslogg-custom';
import { registrerHarLestEndringslogg } from './endringslogg-utils';

export default function EndringsloggTourWrapper() {
    const innhold = getInnhold();
    const [settListe, setSettListe] = useState(mapLocaldtoargeTilEndringsinnhold());

    const oppdaterSettListe = ((name: string)=> setSettListe(settModalEndring(settListe,name)));

    const oppdaterLocalstorageOgState = () => {
        innhold.forEach((elem) => {
            oppdaterSettListe(elem.id);
            registrerHarLestEndringslogg(elem.id);
        });
    };

    return(
        <>
            <Endringslogg innhold={innhold} oppdaterInnhold={oppdaterLocalstorageOgState} settListe={settListe} />
            <TourModalLocalStorage completed={oppdaterSettListe} />
        </>
    );
}
