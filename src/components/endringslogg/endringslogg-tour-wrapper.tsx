import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useState } from 'react';

export default function EndringsloggTourWrapper() {
    const [complete, setcomplete] =  useState(false);
    return(
        <>
            <Endringslogg refresh={complete} setRefresh={setcomplete}  />
            <TourModalLocalStorage completed={setcomplete} />
        </>
    );
}
