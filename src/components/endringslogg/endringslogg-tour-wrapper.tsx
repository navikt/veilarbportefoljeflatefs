import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import React, { useState } from 'react';
import { getInnholdOgSett, settModalEndring } from './endringslogg-custom';
import { registrerHarLestEndringslogg } from './endringslogg-utils';
import { ENDRINGSLOGG, VIS_MOTER_MED_NAV } from '../../konstanter';
import { ModalName } from '../tour-modal/tour-modal';
import { useFeatureSelector } from '../../hooks/redux/use-feature-selector';

function EndringsloggTourWrapper() {
    const harFeature = useFeatureSelector();

    const visMoteMedNAV = harFeature(VIS_MOTER_MED_NAV);

    const [innholdsListe, setInnholdsliste] = useState(getInnholdOgSett());

    if (!visMoteMedNAV) {
        if (innholdsListe.find((el) => el.id === ModalName.MOTE_FILTER)) {
            setInnholdsliste(innholdsListe.filter((el) => el.id !== ModalName.MOTE_FILTER));
        }
    }

    const oppdaterSettListe = ((name: string) => setInnholdsliste(settModalEndring(innholdsListe, name)));

    const oppdaterLocalstorageOgState = () => {
        innholdsListe.forEach((elem) => {
            oppdaterSettListe(elem.id);
            registrerHarLestEndringslogg(elem.id);
        });
    };

    const visEndringslogg = harFeature(ENDRINGSLOGG);
    return (
        <>
            {visEndringslogg &&
            <Endringslogg innhold={innholdsListe} oppdaterInnhold={oppdaterLocalstorageOgState}/>
            }
            <TourModalLocalStorage onTourComplete={oppdaterSettListe}/>
        </>
    );
}

export default EndringsloggTourWrapper;
