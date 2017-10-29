import * as React from 'react';
import Etiketter from '../components/tabell/etiketter';
import { filtervalgShape, veilederShape } from '../proptype-shapes';
import {FiltervalgModell, VeilederModell} from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import CheckBox from '../components/tabell/checkbox';
import BrukerNavn from "../components/tabell/brukernavn";
import BrukerFnr from "../components/tabell/brukerfnr";
import VeilederNavn from "../components/tabell/veiledernavn";
import VeilederId from "../components/tabell/veilederid";
import UkeKolonne from "../components/ukekolonne";
import {
    I_AVTALT_AKTIVITET,
    UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER, VENTER_PA_SVAR_FRA_NAV,
    ytelsevalg
} from "../filtrering/filter-konstanter";
import DatoKolonne from "../components/datokolonne";
import {nesteUtlopsdatoEllerNull, utledValgteAktivitetsTyper} from "../utils/utils";

interface EnhetBrukerpanelProps {
    bruker: any;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
}

function EnhetBrukerpanel({ bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner }: EnhetBrukerpanelProps) {
    const { ytelse } = filtervalg;
    const utlopsDato = bruker.utlopsdato ? new Date(bruker.utlopsdato) : null;
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseErValgtKolonne = valgteKolonner.includes(Kolonne.UTLOP_YTELSE);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);

    return (
        <li className="brukerliste__element brukerliste--border-bottom-thin">
                <div className="brukerliste__gutter-left brukerliste--min-width-1">
                    <CheckBox bruker={bruker} settMarkert={settMarkert} />
                </div>
                <div className="brukerliste__innhold flex flex--center row">
                    <BrukerNavn className="col col-xs-3" bruker={bruker} enhetId={enhetId} />
                    <BrukerFnr className="col col-xs-2" bruker={bruker} />
                    <UkeKolonne
                        className="col col-xs-2"
                        ukerIgjen={bruker.dagputlopUke}
                        minVal={2}
                        skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalg.DAGPENGER || ytelse === ytelsevalg.ORDINARE_DAGPENGER)}
                    />
                    <UkeKolonne
                        className="col col-xs-2"
                        ukerIgjen={bruker.permutlopUke}
                        minVal={2}
                        skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalg.DAGPENGER_MED_PERMITTERING)}
                    />
                    <UkeKolonne
                        className="col col-xs-2"
                        ukerIgjen={bruker.aapmaxtidUke}
                        minVal={12}
                        skalVises={ytelseErValgtKolonne && (ytelse === ytelsevalg.AAP_MAXTID)}
                    />
                    <DatoKolonne
                        className="col col-xs-2"
                        dato={utlopsDato}
                        skalVises={ytelseErValgtKolonne && [ytelsevalg.TILTAKSPENGER, ytelsevalg.AAP_UNNTAK, ytelsevalg.AAP].includes(ytelse)}
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
                <div className="brukerliste__gutter-right">
                    <Etiketter bruker={bruker} />
                </div>
        </li>
    );
}

export default EnhetBrukerpanel;
