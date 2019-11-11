import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { AppState } from '../../reducer';
import Innholdslaster from '../../innholdslaster/innholdslaster';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { LeggTilKnapp } from '../../components/knapper/legg-til-knapp';
import VeilederGruppeInnhold from "./veiledergrupper-innhold";
import "./veiler-gruppe.less"

function FilteringVeilederGrupper() {
    const [veilederGruppeModal, setVeilederGruppeModal] = useState(false);
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const lagretFilter = lagretFilterState.data;

    return (
        <Innholdslaster avhengigheter={[lagretFilterState]}>
            {lagretFilter.length > 0
                ? <VeilederGruppeInnhold
                    lagretFilter={lagretFilter}
                    veilederGruppeModal={veilederGruppeModal}
                    setVeilederGruppeModal={setVeilederGruppeModal}
                />
                :
                <>
                    <AlertStripeInfo>Fante inge grupper før enheten. Legg til grupper genom att trykke på pluss-knappen.</AlertStripeInfo>
                    <LeggTilKnapp onClick={()=> setVeilederGruppeModal(true)}/>
                </>

            }
        </Innholdslaster>
    );
}

export default FilteringVeilederGrupper;
