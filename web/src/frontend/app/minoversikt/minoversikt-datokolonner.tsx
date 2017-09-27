import * as React from 'react';
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
import {BrukerModell, FiltervalgModell} from '../model-interfaces';

interface MinoversiktDatokolonnerProps {
    bruker: BrukerModell;
    ytelse: string;
    filtervalg: FiltervalgModell;
}

function MinoversiktDatokolonner({ bruker, ytelse, filtervalg }: MinoversiktDatokolonnerProps) {
    const valgtAktivitetstype = utledValgtAktivitetstype(filtervalg.aktiviteter);

    // TODO: bør gjøres før data lagres i storen
    const arbeidslisteFrist = bruker.arbeidsliste.frist ? new Date(bruker.arbeidsliste.frist) : null;
    const utlopsdato = bruker.utlopsdato ? new Date(bruker.utlopsdato) : null;
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;

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
                dato={arbeidslisteFrist}
                skalVises={filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
            />
            <DatoKolonne
                dato={utlopsdato}
                skalVises={[ytelsevalg.TILTAKSPENGER, ytelsevalg.AAP_UNNTAK, ytelsevalg.AAP].includes(ytelse)}
            />
            <DatoKolonne
                dato={venterPaSvarFraBruker}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
            />
            <DatoKolonne
                dato={venterPaSvarFraNAV}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
            />
            <DatoKolonne
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
                skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
            />
            <DatoKolonne
                dato={nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
            />
            <DatoKolonne
                dato={utlopsdatoForAktivitetEllerNull(bruker.aktiviteter, valgtAktivitetstype)}
                skalVises={!!valgtAktivitetstype && filtervalg.tiltakstyper.length === 0}
            />
        </div>
    );
}

export default MinoversiktDatokolonner;
