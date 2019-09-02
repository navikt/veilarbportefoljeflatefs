import React from 'react';
import { MOTER_IDAG } from '../../filter-konstanter';
import { BarInputRadio } from '../../../components/barinput/barinput-radio';
import hiddenIf from '../../../components/hidden-if/hidden-if';
import { FiltreringStatusGruppe } from './ufordelte-brukere';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';

function FiltreringStatusAvtaltMoteMedNav(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();
    return (
        <>
            <BarInputRadio
                filterNavn="avtaltMoteMedNav"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                antall={statusTall.moterMedNAVIdag}
                checked={props.ferdigfilterListe.includes(MOTER_IDAG)}
            />
        </>
    );

}

export default hiddenIf(FiltreringStatusAvtaltMoteMedNav);
