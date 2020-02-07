import {TekstKolonne} from "./kolonner/tekstkolonne";
import {BrukerModell} from "../../model-interfaces";
import React from 'react';

interface VedstakStatusKolonneProps {
    bruker: BrukerModell,
    skalVises: boolean;
}

const vedtakStatusTilTekst = {
    SENDT_TIL_BESLUTTER: 'Til beslutter',
    UTKAST_OPPRETTET: 'Utkast'
};


export function VedtakStatusKolonne({bruker, skalVises}: VedstakStatusKolonneProps) {
    return <TekstKolonne tekst={bruker.vedtakStatus && vedtakStatusTilTekst[bruker.vedtakStatus]} skalVises={skalVises} className= "col col-xs-2"/>
}