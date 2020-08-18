import React from 'react';
import {Element} from 'nav-frontend-typografi';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import {tekstAntallBrukere} from '../../../utils/tekst-utils';
import '../ny_filtrering-status.less'
import '../../../components/sidebar/sidebar.less'

export function NyFiltreringStatusContainer(props: { children: React.ReactNode }) {

    const statusTall = useStatusTallSelector();
    const brukereTekst = tekstAntallBrukere(statusTall.totalt);

    return (
        <div className="ny__filtrering-oversikt panel">
            <Element className="ny__filtrering-oversikt__totalt-antall blokk-xxs" tag="h3">
                {brukereTekst}
            </Element>
            {props.children}
        </div>
    );
}
