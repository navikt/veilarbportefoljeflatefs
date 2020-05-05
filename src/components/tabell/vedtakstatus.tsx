import {TekstKolonne} from "./kolonner/tekstkolonne";
import {BrukerModell} from "../../model-interfaces";
import React from 'react';

interface VedstakStatusKolonneProps {
    bruker: BrukerModell,
    skalVises: boolean;
}

const vedtakStatusTilTekst = {
    UTKAST_OPPRETTET : 'Utkast',
    BESLUTTER_PROSESS_STARTET: 'Trenger beslutter',
    BLI_BESLUTTER : 'Venter på beslutter',
    GODKJENT_AV_BESLUTTER : 'Klar til utsendelse',
    KLAR_TIL_BESLUTTER: 'Venter på beslutter',
    KLAR_TIL_VEILEDER: 'Venter på veileder'
};


export function VedtakStatusKolonne({bruker, skalVises}: VedstakStatusKolonneProps) {
    return <TekstKolonne tekst={bruker.vedtakStatus && vedtakStatusTilTekst[bruker.vedtakStatus]} skalVises={skalVises} className= "col col-xs-2"/>
}