import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';
import { tekstAntallBrukere } from '../../../utils/tekst-utils';

export function FiltreringStatusContainer(props: {children: React.ReactNode}) {

    const statusTall = useStatusTallSelector();
    const brukereTekst = tekstAntallBrukere(statusTall.totalt);

    return (
        <div className="filtrering-oversikt">
            <Element className="filtrering-oversikt__totalt-antall blokk-xxs" tag="h3">
                {brukereTekst}
            </Element>
            {props.children}
        </div>
    );
}
