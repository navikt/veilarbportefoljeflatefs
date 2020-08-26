import React from 'react';
import {MOTER_IDAG} from '../../filter-konstanter';
import hiddenIf from '../../../components/hidden-if/hidden-if';
import {FiltreringStatusGruppe} from './ufordelte-brukere';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import {NyBarInputRadio} from "../../../components/barinput/ny_bar_input_radio";

function NyFiltreringStatusAvtaltMoteMedNav(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();
    return (
        <>
            <NyBarInputRadio
                filterNavn="avtaltMoteMedNav"
                handleChange={props.handleChange}
                antall={statusTall.moterMedNAVIdag}
                checked={props.ferdigfilterListe.includes(MOTER_IDAG)}
            />
        </>
    );
}

export default hiddenIf(NyFiltreringStatusAvtaltMoteMedNav);
