import * as React from 'react';
import {
    nesteUtlopsdatoEllerNull, utledValgtAktivitetstype, utlopsdatoForAktivitetEllerNull,
    ytelseFilterErAktiv
} from '../utils/utils';
import { ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    I_AVTALT_AKTIVITET } from '../filtrering/filter-konstanter';
import { filtervalgShape } from '../proptype-shapes';
import DatoKolonne from '../components/datokolonne';
import {FiltervalgModell} from "../model-interfaces";
import {Kolonne} from "../ducks/ui/listevisning";

interface EnhetDatokolonnerProps {
    bruker: any;
    ytelse?: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}


function EnhetDatokolonner({ bruker, ytelse, filtervalg, valgteKolonner }: EnhetDatokolonnerProps) {
    const valgtAktivitetstype = utledValgtAktivitetstype(filtervalg.aktiviteter);

    return (
        <div className="datokolonner__wrapper">
            <DatoKolonne
                dato={ytelse === ytelsevalg.AAP_MAXTID ? bruker.aapMaxtid : bruker.utlopsdato}
                skalVises={ytelseFilterErAktiv(ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
            />
            <DatoKolonne
                dato={bruker.venterPaSvarFraBruker}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER  && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
            />
            <DatoKolonne
                dato={bruker.venterPaSvarFraNAV}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
            />
            <DatoKolonne
                dato={bruker.nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
            />
            <DatoKolonne
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
                skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
            />
            <DatoKolonne
                dato={utlopsdatoForAktivitetEllerNull(bruker.aktiviteter, valgtAktivitetstype)}
                skalVises={!!valgtAktivitetstype && filtervalg.tiltakstyper.length === 0  && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
            />
        </div>
    );
}

export default EnhetDatokolonner;
