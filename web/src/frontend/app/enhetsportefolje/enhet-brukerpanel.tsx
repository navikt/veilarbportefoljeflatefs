import * as React from 'react';
import Etiketter from '../components/tabell/etiketter';
import {filtervalgShape, veilederShape} from '../proptype-shapes';
import {FiltervalgModell, VeilederModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import CheckBox from '../components/tabell/checkbox';
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
                <div className="brukerliste__gutter-left brukerliste--min-width-enhet">
                    <CheckBox bruker={bruker} settMarkert={settMarkert} />
                </div>
                <EnhetKolonner
                    className="brukerliste__innhold flex flex--center"
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
