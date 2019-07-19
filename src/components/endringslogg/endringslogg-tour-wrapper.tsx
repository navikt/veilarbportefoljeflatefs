import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useState, useEffect } from 'react';
import { getInnhold, mapLocaldtoargeTilEndringsinnhold, settModalEndring } from './endringslogg-custom';
import { registrerHarLestEndringslogg } from './endringslogg-utils';

export default function EndringsloggTourWrapper() {
    const innhold = getInnhold();
    const [settListe, setSettListe] = useState(mapLocaldtoargeTilEndringsinnhold());

    const oppdaterSettListe = ((name: string)=> setSettListe(settModalEndring(settListe,name)));

    const oppdaterInnhold = () => {
        innhold.forEach((elem) => registrerHarLestEndringslogg(elem.id));
    };

    return(
        <>
            <Endringslogg innhold={innhold} oppdaterInnhold={oppdaterInnhold} settListe={settListe} />
            <TourModalLocalStorage completed={oppdaterSettListe} />
        </>
    );
}
