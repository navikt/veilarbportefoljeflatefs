import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useState, useEffect } from 'react';
import { getInnhold } from './endringslogg-custom';

export default function EndringsloggTourWrapper() {
    const [complete, setcomplete] =  useState(false);
    let innhold = getInnhold();
    useEffect(
        ()=> {
            innhold = getInnhold();
        },[complete]
    );

    return(
        <>
            <Endringslogg innhold={innhold} />
            <TourModalLocalStorage completed={setcomplete} />
        </>
    );
}
