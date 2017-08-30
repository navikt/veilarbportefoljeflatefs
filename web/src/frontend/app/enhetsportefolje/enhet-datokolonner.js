import React, { PropTypes as PT } from 'react';
import { nesteUtlopsdatoEllerNull, ytelseFilterErAktiv } from '../utils/utils';
import { ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    I_AVTALT_AKTIVITET } from '../filtrering/filter-konstanter';
import { filtervalgShape } from '../proptype-shapes';
import DatoKolonne from '../components/datokolonne';


function EnhetDatokolonner({ bruker, ytelse, filtervalg }) {
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
            <DatoKolonne
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
                skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
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
