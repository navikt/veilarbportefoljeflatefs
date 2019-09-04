import * as React from 'react';
import { nesteUtlopsdatoEllerNull, utledValgteAktivitetsTyper, utlopsdatoUker, aapRettighetsperiode } from '../utils/utils';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import UkeKolonne from '../components/tabell/kolonner/ukekolonne';
import {
    I_AVTALT_AKTIVITET, MIN_ARBEIDSLISTE, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER, VENTER_PA_SVAR_FRA_NAV,
    ytelsevalg, ytelseAapSortering, MOTER_IDAG
} from '../filtrering/filter-konstanter';
import DatoKolonne from '../components/tabell/kolonner/datokolonne';
import { BrukerModell, FiltervalgModell } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import ArbeidslisteOverskrift from '../components/tabell/arbeidslisteoverskrift';
import TidKolonne from '../components/tabell/kolonner/tidkolonne';
import { klokkeslettTilMinutter, minuttDifferanse } from '../utils/dato-utils';
import VarighetKolonne from '../components/tabell/kolonner/varighetkolonne';

interface MinOversiktKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    enhetId: string;
    skalJusteres: boolean;
}

function MinoversiktDatokolonner({className, bruker, filtervalg, valgteKolonner, enhetId, skalJusteres}: MinOversiktKolonnerProps) {
    const {ytelse} = filtervalg;
    const ytelsevalgIntl = ytelsevalg();
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    // TODO: bør gjøres før data lagres i storen
    const arbeidslisteFrist = bruker.arbeidsliste.frist ? new Date(bruker.arbeidsliste.frist) : null;
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const moteStartTid = klokkeslettTilMinutter(bruker.moteStartTid);
    const varighet = minuttDifferanse(bruker.moteSluttTid, bruker.moteStartTid);
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseErValgtKolonne = valgteKolonner.includes(Kolonne.UTLOP_YTELSE);
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const rettighetsPeriode = aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen);

    return (
        <div className={className}>
            <BrukerNavn className="col col-xs-2" bruker={bruker} enhetId={enhetId}  skalJusteres={skalJusteres}/>
            <BrukerFnr className="col col-xs-2" bruker={bruker}/>
            <DatoKolonne
                className="col col-xs-2"
                dato={arbeidslisteFrist}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
            <ArbeidslisteOverskrift
                className="col col-xs-2"
                bruker={bruker}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
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
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
            />
            <TidKolonne
                className="col col-xs-2"
                dato={moteStartTid}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG)}
            />
            <VarighetKolonne
                className="col col-xs-2"
                dato={varighet}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(valgteAktivitetstyper)}
                skalVises={!!valgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 &&
                valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.aktivitetStart ? new Date(bruker.aktivitetStart) : null}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.nesteAktivitetStart ? new Date(bruker.nesteAktivitetStart) : null}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.forrigeAktivitetStart ? new Date(bruker.forrigeAktivitetStart) : null}
                skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
            />
        </div>
    );
}

export default MinoversiktDatokolonner;
