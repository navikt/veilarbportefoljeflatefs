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
    valgteKolonner: Kolonne[];
}

function Veilederinfo({ veileder = null, bruker, valgteKolonner }: VeilederinfoProps) {
    const navn = veileder ? `${veileder.etternavn}, ${veileder.fornavn}` : '';
    const ident = bruker.veilederId || '';
    if (!(valgteKolonner.includes(Kolonne.VEILEDER) || valgteKolonner.includes(Kolonne.NAVIDENT))) {
        return null;
    }
    return (
        <div className="veilederinformasjon__wrapper col col-xs-2">
            { valgteKolonner.includes(Kolonne.VEILEDER) &&
            <div className="veilederinformasjon__navn">
                {
                    bruker.veilederId ? <span>{navn}</span> : null
                }
            </div> }
            { valgteKolonner.includes(Kolonne.NAVIDENT) &&
            <span className="veilederinfo__ident">{ident}</span>
            }
        </div>
    );
}

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

    return (
        <div className="brukerliste__panel">
                <Brukerinformasjon
                    bruker={bruker}
                    enhetId={enhetId}
                    settMarkert={settMarkert}
                />
                <EnhetDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg} valgteKolonner={valgteKolonner} />
                <Veilederinfo veileder={brukersVeileder} bruker={bruker} valgteKolonner={valgteKolonner}/>
                <Etiketter bruker={bruker} />
        </div>
    );
}

export default EnhetBrukerpanel;
