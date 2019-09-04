import * as React from 'react';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import UkeKolonne from '../components/tabell/kolonner/ukekolonne';
import {
    I_AVTALT_AKTIVITET,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelsevalg,
    ytelseAapSortering, MOTER_IDAG
} from '../filtrering/filter-konstanter';
import DatoKolonne from '../components/tabell/kolonner/datokolonne';
import { Kolonne } from '../ducks/ui/listevisning';
import { BrukerModell, FiltervalgModell, VeilederModell } from '../model-interfaces';
import { nesteUtlopsdatoEllerNull, utledValgteAktivitetsTyper, utlopsdatoUker, aapRettighetsperiode } from '../utils/utils';
import VeilederNavn from '../components/tabell/veiledernavn';
import VeilederId from '../components/tabell/veilederid';
import TidKolonne from '../components/tabell/kolonner/tidkolonne';
import { klokkeslettTilMinutter, minuttDifferanse } from '../utils/dato-utils';
import VarighetKolonne from '../components/tabell/kolonner/varighetkolonne';

interface EnhetKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    brukersVeileder?: VeilederModell;
}

function EnhetKolonner({ className, bruker, enhetId, filtervalg, valgteKolonner, brukersVeileder}: EnhetKolonnerProps) {
    const ytelsevalgIntl = ytelsevalg();
    const { ytelse } = filtervalg;
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseErValgtKolonne = valgteKolonner.includes(Kolonne.UTLOP_YTELSE);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const moteStartTid = klokkeslettTilMinutter(bruker.moteStartTid);
    const varighet = minuttDifferanse(bruker.moteSluttTid, bruker.moteStartTid);
    const erAapYtelse = !!ytelse && Object.keys(ytelseAapSortering).includes(ytelse);
    const rettighetsPeriode = aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen);

    return (
        <div className={className}>
            <BrukerNavn className="col col-xs-2" bruker={bruker} enhetId={enhetId} />
            <BrukerFnr className="col col-xs-2" bruker={bruker} />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={ytelseErValgtKolonne && (
                    ytelse === ytelsevalgIntl.DAGPENGER ||
                    ytelse === ytelsevalgIntl.ORDINARE_DAGPENGER ||
                    ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI ||
                    ytelse === ytelsevalgIntl.LONNSGARANTIMIDLER_DAGPENGER
                )}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING)}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={ytelseErValgtKolonne && erAapYtelse}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={rettighetsPeriode}
                minVal={2}
                skalVises={ytelseErValgtKolonne && erAapYtelse}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalgIntl.TILTAKSPENGER)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraBruker}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)  && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER) && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(valgteAktivitetstyper)}
                skalVises={!!valgteAktivitetstyper && filtervalg.tiltakstyper.length === 0  && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
            />
            <TidKolonne
                className="col col-xs-2"
                dato={moteStartTid}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            />
            <VarighetKolonne
                className="col col-xs-2"
                dato={varighet}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            />
            <VeilederId className="col col-xs-2"
                        bruker={bruker}
                        skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
            />
            <VeilederNavn className="col col-xs-2"
                          bruker={bruker}
                          skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                          veileder={brukersVeileder}
            />
        </div>
    );
}

export default EnhetKolonner;
