import * as React from 'react';
import {
    nesteUtlopsdatoEllerNull, utledValgteAktivitetsTyper
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
import { BrukerModell, FiltervalgModell } from '../model-interfaces';

interface MinoversiktDatokolonnerProps {
    classNamePerColumn?: string;
    bruker: BrukerModell;
    ytelse: string;
    filtervalg: FiltervalgModell;
}

function MinoversiktDatokolonner({ classNamePerColumn, bruker, ytelse, filtervalg }: MinoversiktDatokolonnerProps) {
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);

    // TODO: bør gjøres før data lagres i storen
    const arbeidslisteFrist = bruker.arbeidsliste.frist ? new Date(bruker.arbeidsliste.frist) : null;
    const utlopsdato = bruker.utlopsdato ? new Date(bruker.utlopsdato) : null;
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;

    return (
        <span>
            <UkeKolonne
                className={classNamePerColumn}
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalg.DAGPENGER || ytelse === ytelsevalg.ORDINARE_DAGPENGER}
            />
            <UkeKolonne
                className={classNamePerColumn}
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalg.DAGPENGER_MED_PERMITTERING}
            />
            <UkeKolonne
                className={classNamePerColumn}
                ukerIgjen={bruker.aapmaxtidUke}
                minVal={12}
                skalVises={ytelse === ytelsevalg.AAP_MAXTID}
            />
            <DatoKolonne
                className={classNamePerColumn}
                dato={arbeidslisteFrist}
                skalVises={filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
            />
            <DatoKolonne
                className={classNamePerColumn}
                dato={utlopsdato}
                skalVises={[ytelsevalg.TILTAKSPENGER, ytelsevalg.AAP_UNNTAK, ytelsevalg.AAP].includes(ytelse)}
            />
            <DatoKolonne
                className={classNamePerColumn}
                dato={venterPaSvarFraBruker}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
            />
            <DatoKolonne
                className={classNamePerColumn}
                dato={venterPaSvarFraNAV}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
            />
            <DatoKolonne
                className={classNamePerColumn}
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}
                skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
            />
            <DatoKolonne
                className={classNamePerColumn}
                dato={nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
            />
            <DatoKolonne
                className={classNamePerColumn}
                dato={nesteUtlopsdatoEllerNull(valgteAktivitetstyper)}
                skalVises={!!valgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
            />
        </span>
    );
}

export default MinoversiktDatokolonner;
