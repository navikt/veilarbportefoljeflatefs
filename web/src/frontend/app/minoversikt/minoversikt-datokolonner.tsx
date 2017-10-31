import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
    bruker: BrukerModell;
    ytelse: string;
    filtervalg: FiltervalgModell;
}

type Props = MinoversiktDatokolonnerProps & InjectedIntlProps;

function MinoversiktDatokolonner({ bruker, ytelse, filtervalg, intl }: Props) {
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const ytelsevalgIntl = ytelsevalg(intl);
    // TODO: bør gjøres før data lagres i storen
    const arbeidslisteFrist = bruker.arbeidsliste.frist ? new Date(bruker.arbeidsliste.frist) : null;
    const utlopsdato = bruker.utlopsdato ? new Date(bruker.utlopsdato) : null;
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;

    return (
        <span>
            <UkeKolonne
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalgIntl.DAGPENGER || ytelse === ytelsevalgIntl.ORDINARE_DAGPENGER}
            />
            <UkeKolonne
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING}
            />
            <UkeKolonne
                ukerIgjen={bruker.aapmaxtidUke}
                minVal={12}
                skalVises={ytelse === ytelsevalgIntl.AAP_MAXTID}
            />
            <DatoKolonne
                dato={arbeidslisteFrist}
                skalVises={filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
            />
            <DatoKolonne
                dato={utlopsdato}
                skalVises={[ytelsevalgIntl.TILTAKSPENGER, ytelsevalgIntl.AAP_UNNTAK, ytelsevalgIntl.AAP].includes(ytelse)}
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
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}
                skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
            />
            <DatoKolonne
                dato={nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
            />
            <DatoKolonne
                dato={nesteUtlopsdatoEllerNull(valgteAktivitetstyper)}
                skalVises={!!valgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
            />
        </span>
    );
}

export default injectIntl(MinoversiktDatokolonner);
