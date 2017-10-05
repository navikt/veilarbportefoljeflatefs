import * as React from 'react';
import Brukerinformasjon from '../components/tabell/brukerinformasjon';
import EnhetDatokolonner from './enhet-datokolonner';
import Etiketter from '../components/tabell/etiketter';
import {filtervalgShape, veilederShape} from '../proptype-shapes';
import {FiltervalgModell, VeilederModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';

interface VeilederinfoProps {
    bruker: any;
    veileder?: VeilederModell;
}

function Veilederinfo({ veileder = null, bruker }: VeilederinfoProps) {
    const navn = veileder ? `${veileder.etternavn}, ${veileder.fornavn}` : '';
    const ident = bruker.veilederId || '';
    return (
        <div className="veilederinformasjon__wrapper col col-xs-2">
            <div className="veilederinformasjon__navn">
                {
                    bruker.veilederId ? <span>{navn}</span> : null
                }
            </div>
            <span className="veilederinfo__ident">{ident}</span>
        </div>
    );
}

interface EnhetBrukerpanelProps {
    bruker: any;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId?: string;
    filtervalg: FiltervalgModell;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
}

function EnhetBrukerpanel({ bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner }: EnhetBrukerpanelProps) {
    const { ytelse } = filtervalg;

    return (
        <div className="panel_hode brukerpanel">
                <Brukerinformasjon
                    bruker={bruker}
                    enhetId={enhetId}
                    settMarkert={settMarkert}
                />
                <EnhetDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg} valgteKolonner={valgteKolonner} />
                <Veilederinfo veileder={brukersVeileder} bruker={bruker} />
                <Etiketter bruker={bruker} />
        </div>
    );
}

export default EnhetBrukerpanel;
