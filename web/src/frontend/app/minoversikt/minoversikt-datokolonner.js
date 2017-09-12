import React, { PropTypes as PT } from 'react';
import {
    nesteUtlopsdatoEllerNull, utledValgtAktivitetstype, utlopsdatoForAktivitetEllerNull
} from '../utils/utils';
import DatoKolonne from '../components/datokolonne';
import UkeKolonne from '../components/ukekolonne';
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
            <UkeKolonne
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalg.DAGPENGER || ytelse === ytelsevalg.ORDINARE_DAGPENGER}
            />
            <UkeKolonne
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalg.DAGPENGER_MED_PERMITTERING}
            />
            <UkeKolonne
                ukerIgjen={bruker.aapmaxtidUke}
                minVal={12}
                skalVises={ytelse === ytelsevalg.AAP_MAXTID}
            />
            <DatoKolonne
                dato={bruker.arbeidsliste.frist}
                skalVises={filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
            />
            <DatoKolonne
                dato={bruker.utlopsdato}
                skalVises={[ytelsevalg.TILTAKSPENGER, ytelsevalg.AAP_UNNTAK, ytelsevalg.AAP].includes(ytelse)}
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
