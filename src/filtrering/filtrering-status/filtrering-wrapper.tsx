import React from 'react';
import { Element } from 'nav-frontend-typografi';
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {Statustall} from "../../ducks/statustall";
import {selectStatusTallData} from "../../enhetsportefolje/filtrering-status-enhet";

export function FiltreringStatusContainer(props: {children: React.ReactNode}) {

    const statusTall = useSelector<AppState, Statustall>(state =>
        selectStatusTallData(state));

    const tekst = (tall) => ({
        0: 'Ingen brukere',
        1: 'Totalt 1 bruker',
        [tall]: `Totalt ${tall} brukere`
    });

    const brukereTekst = tekst(statusTall.totalt)[statusTall.totalt];

    return (
        <div className="filtrering-oversikt panel">
            <Element className="filtrering-oversikt__totalt-antall blokk-xxs" tag="h3">
                {brukereTekst}
            </Element>
            {props.children}
        </div>
    );
}
