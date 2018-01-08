import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { nesteUtlopsdatoEllerNull, utledValgteAktivitetsTyper } from '../utils/utils';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import UkeKolonne from '../components/ukekolonne';
import {
    I_AVTALT_AKTIVITET, MIN_ARBEIDSLISTE, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER, VENTER_PA_SVAR_FRA_NAV,
    ytelsevalg
} from '../filtrering/filter-konstanter';
import DatoKolonne from '../components/datokolonne';
import { BrukerModell, FiltervalgModell } from '../model-interfaces';

interface MinOversiktKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    filtervalg: FiltervalgModell;
    enhetId: string;
}

type Props = MinOversiktKolonnerProps & InjectedIntlProps;

function MinoversiktDatokolonner({className, bruker, filtervalg, enhetId, intl}: Props) {
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const ytelsevalgIntl = ytelsevalg(intl);
    // TODO: bør gjøres før data lagres i storen
    const arbeidslisteFrist = bruker.arbeidsliste.frist ? new Date(bruker.arbeidsliste.frist) : null;
    const utlopsdato = bruker.utlopsdato ? new Date(bruker.utlopsdato) : null;
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const { ytelse } = filtervalg;

    return (
        <div className={className}>
            <BrukerNavn className="col col-xs-3" bruker={bruker} enhetId={enhetId} />
            <BrukerFnr className="col col-xs-2" bruker={bruker} />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalgIntl.DAGPENGER || ytelse === ytelsevalgIntl.ORDINARE_DAGPENGER}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.aapmaxtidUke}
                minVal={12}
                skalVises={ytelse === ytelsevalgIntl.AAP_MAXTID}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={arbeidslisteFrist}
                skalVises={filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.aapUnntakUkerIgjen}
                minVal={12}
                skalVises={[ytelsevalgIntl.TILTAKSPENGER, ytelsevalgIntl.AAP_UNNTAK, ytelsevalgIntl.AAP].includes(ytelse)}
            />
            <DatoKolonne
            className="col col-xs-2"
            dato={venterPaSvarFraBruker}
            skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
            />
            <DatoKolonne
            className="col col-xs-2"
            dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}
            skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
            />
            <DatoKolonne
            className="col col-xs-2"
            dato={nesteUtlopsdatoEllerNull(valgteAktivitetstyper)}
            skalVises={!!valgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
            />
        </div>
    );
}

export default injectIntl(MinoversiktDatokolonner);
