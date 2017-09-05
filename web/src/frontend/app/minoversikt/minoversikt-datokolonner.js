import React, { PropTypes as PT } from 'react';
import {
    nesteUtlopsdatoEllerNull, utledValgtAktivitetstype, utlopsdatoForAktivitetEllerNull,
    ytelseFilterErAktiv
} from '../utils/utils';
import DatoKolonne from '../components/datokolonne';
import {
    ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    MIN_ARBEIDSLISTE,
    I_AVTALT_AKTIVITET
} from '../filtrering/filter-konstanter';
import { filtervalgShape } from '../proptype-shapes';


function MinoversiktDatokolonner({ bruker, ytelse, filtervalg }) {
    const valgtAktivitetstype = utledValgtAktivitetstype(filtervalg.aktiviteter);

    return (
        <div className="datokolonner__wrapper">
            <DatoKolonne
                dato={bruker.arbeidsliste.frist}
                skalVises={filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
            />
            <DatoKolonne
                dato={(ytelse === ytelsevalg.AAP_MAXTID ? bruker.aapMaxtid : bruker.utlopsdato) || ''}
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
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
                skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
            />
            <DatoKolonne
                dato={bruker.nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
            />
            <DatoKolonne
                dato={utlopsdatoForAktivitetEllerNull(bruker.aktiviteter, valgtAktivitetstype)}
                skalVises={!!valgtAktivitetstype && filtervalg.tiltakstyper.length === 0}
            />
        </div>
    );
}

MinoversiktDatokolonner.propTypes = {
    bruker: PT.object.isRequired,
    ytelse: PT.string,
    filtervalg: filtervalgShape.isRequired

};

export default MinoversiktDatokolonner;
