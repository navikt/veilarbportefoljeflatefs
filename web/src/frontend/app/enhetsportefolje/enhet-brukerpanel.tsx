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
import EnhetKolonner from "./enhet-kolonner";

interface EnhetBrukerpanelProps {
    bruker: any;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
}

function EnhetBrukerpanel({ bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner }: EnhetBrukerpanelProps) {


    return (
        <li className="brukerliste__element brukerliste--border-bottom-thin">
                <div className="brukerliste__gutter-left brukerliste--min-width-1">
                    <CheckBox bruker={bruker} settMarkert={settMarkert} />
                </div>
                <EnhetKolonner
                    className="brukerliste__innhold flex flex--center row"
                    bruker={bruker}
                    enhetId={enhetId}
                    filtervalg={filtervalg}
                    valgteKolonner={valgteKolonner}
                    brukersVeileder={brukersVeileder}
                />
                <div className="brukerliste__gutter-right">
                    <Etiketter bruker={bruker} />
                </div>
        </li>
    );
}

export default EnhetBrukerpanel;
