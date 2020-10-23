import React from 'react';
import {MOTER_IDAG} from '../../filter-konstanter';
import hiddenIf from '../../../components/hidden-if/hidden-if';
import {FiltreringStatusGruppe} from './ufordelte-brukere';
import {useStatusTallSelector} from '../../../hooks/redux/use-statustall';
import {BarInputRadio} from '../../../components/barinput/barinput-radio';

function FiltreringStatusAvtaltMoteMedNav(props: FiltreringStatusGruppe) {
    const statusTall = useStatusTallSelector();
    return (
        <>
            <BarInputRadio
                filterNavn="avtaltMoteMedNav"
                handleChange={props.handleChange}
                antall={statusTall.moterMedNAVIdag}
                checked={props.ferdigfilterListe.includes(MOTER_IDAG)}
            />
        </>
    );
}

export default hiddenIf(FiltreringStatusAvtaltMoteMedNav);
