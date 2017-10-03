import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Brukerinformasjon from '../components/tabell/brukerinformasjon';
import EnhetDatokolonner from './enhet-datokolonner';
import Etiketter from '../components/tabell/etiketter';
import { filtervalgShape, veilederShape } from '../proptype-shapes';
import Etikett from '../components/tabell/etikett';
import {FiltervalgModell, VeilederModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';

const fm = (id) => <FormattedMessage id={id} />;

interface VeilederinfoProps {
    bruker: any;
    veileder?: VeilederModell;
    valgteKolonner: Kolonne[];
}

function Veilederinfo({ veileder = null, bruker, valgteKolonner }: VeilederinfoProps) {
    const navn = veileder ? `${veileder.etternavn}, ${veileder.fornavn}` : '';
    const ident = bruker.veilederId || '';
    if (!valgteKolonner.includes(Kolonne.VEILEDER)) {
        return null;
    }
    return (
        <div className="veilederinformasjon__wrapper">
            <div className="veilederinformasjon__navn">
                {
                    bruker.veilederId ?
                        <span>{navn}</span>
                        :
                        <Etikett
                            type="nybruker"
                            child={fm('enhet.portefolje.tabelletikett.ny.bruker')}
                            skalVises
                        />
                }
            </div>
            <span className="veilederinfo__ident">{ident}</span>
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
        <div className="panel_hode">
            <div className="brukerpanel">
                <Brukerinformasjon
                    bruker={bruker}
                    enhetId={enhetId}
                    settMarkert={settMarkert}
                />
                <EnhetDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg} valgteKolonner={valgteKolonner} />
                <Veilederinfo veileder={brukersVeileder} bruker={bruker} valgteKolonner={valgteKolonner}/>
                <Etiketter bruker={bruker} />
            </div>
        </div>
    );
}

export default EnhetBrukerpanel;
