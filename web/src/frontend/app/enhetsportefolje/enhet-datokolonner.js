import React, { PropTypes as PT } from 'react';
import DatoKolonne from '../components/tabell/datokolonne';
import { ytelseFilterErAktiv } from '../utils/utils';
import { ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER } from '../filtrering/filter-konstanter';
import { filtervalgShape } from '../proptype-shapes';


function EnhetDatokolonner({ bruker, ytelse, filtervalg }) {
    console.log('bruker', bruker);
    console.log('ytelse', ytelse);
    return (
        <div className="datokolonner__wrapper">
            <DatoKolonne
                dato={ytelse === ytelsevalg.AAP_MAXTID ? bruker.aapMaxtid : bruker.utlopsdato}
                skalVises={ytelseFilterErAktiv(ytelse)}
            />
            <DatoKolonne
                dato={bruker.venterPaSvarFraBruker}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
            />
            <DatoKolonne
                dato={bruker.venterPaSvarFraNAV}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
            />
            <DatoKolonne
                dato={bruker.nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
            />
        </div>
    );
}

EnhetDatokolonner.propTypes = {
    bruker: PT.object.isRequired,
    ytelse: PT.string,
    filtervalg: filtervalgShape.isRequired
};

export default EnhetDatokolonner;
