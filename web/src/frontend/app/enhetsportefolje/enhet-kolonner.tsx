import * as React from 'react';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import UkeKolonne from '../components/ukekolonne';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import {
    I_AVTALT_AKTIVITET,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelsevalg
} from '../filtrering/filter-konstanter';
import DatoKolonne from '../components/datokolonne';
import { Kolonne } from '../ducks/ui/listevisning';
import { BrukerModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import { nesteUtlopsdatoEllerNull, utledValgteAktivitetsTyper } from '../utils/utils';
import VeilederNavn from '../components/tabell/veiledernavn';
import VeilederId from '../components/tabell/veilederid';

interface EnhetKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    brukersVeileder?: VeilederModell;
}

type Props = EnhetKolonnerProps & InjectedIntlProps;

function EnhetKolonner({ className, bruker, enhetId, filtervalg, valgteKolonner, brukersVeileder, intl}: Props) {
    const ytelsevalgIntl = ytelsevalg(intl);
    const { ytelse } = filtervalg;
    const utlopsDato = bruker.utlopsdato ? new Date(bruker.utlopsdato) : null;
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseErValgtKolonne = valgteKolonner.includes(Kolonne.UTLOP_YTELSE);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);

    return (
        <div className={className}>
            <BrukerNavn className="col col-xs-3" bruker={bruker} enhetId={enhetId} />
            <BrukerFnr className="col col-xs-2" bruker={bruker} />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalgIntl.DAGPENGER || ytelse === ytelsevalgIntl.ORDINARE_DAGPENGER)}
            />
            <UkeKolonne
            className="col col-xs-2"
            ukerIgjen={bruker.permutlopUke}
            minVal={2}
            skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING)}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.aapmaxtidUke}
                minVal={12}
                skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalgIntl.AAP_MAXTID)}
            />
            <DatoKolonne
            className="col col-xs-2"
            dato={utlopsDato}
            skalVises={ytelseErValgtKolonne && [ytelsevalgIntl.TILTAKSPENGER, ytelsevalgIntl.AAP_UNNTAK, ytelsevalgIntl.AAP].includes(ytelse)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraBruker}
                skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER  && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
            />
            <DatoKolonne
            className="col col-xs-2"
            dato={venterPaSvarFraNAV}
            skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
            />
            <DatoKolonne
            className="col col-xs-2"
            dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}
            skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(valgteAktivitetstyper)}
                skalVises={!!valgteAktivitetstyper && filtervalg.tiltakstyper.length === 0  && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
            />
            <VeilederNavn className="col col-xs-3" bruker={bruker} valgteKolonner={valgteKolonner} veileder={brukersVeileder}/>
            <VeilederId className="col col-xs-2" bruker={bruker} valgteKolonner={valgteKolonner}/>
        </div>
    );
}

export default injectIntl(EnhetKolonner);
