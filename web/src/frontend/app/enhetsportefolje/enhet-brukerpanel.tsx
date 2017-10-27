import * as React from 'react';
import EnhetDatokolonner from './enhet-datokolonner';
import Etiketter from '../components/tabell/etiketter';
import { filtervalgShape, veilederShape } from '../proptype-shapes';
import { EtikettType,FiltervalgModell, VeilederModell } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import Etikett from '../components/tabell/etikett';
import { FormattedMessage } from 'react-intl';
import CheckBox from '../components/tabell/checkbox';
import BrukerNavn from "../components/tabell/brukernavn";
import BrukerFnr from "../components/tabell/brukerfnr";

interface VeilederinfoProps {
    bruker: any;
    veileder?: VeilederModell;
    valgteKolonner: Kolonne[];
}

const fm = (id) => <FormattedMessage id={id} />;

function Veilederinfo({ veileder = null, bruker, valgteKolonner }: VeilederinfoProps) {
    const navn = veileder ? `${veileder.etternavn}, ${veileder.fornavn}` : '';
    const ident = bruker.veilederId || '';
    if (!(valgteKolonner.includes(Kolonne.VEILEDER) || valgteKolonner.includes(Kolonne.NAVIDENT))) {
        return null;
    }
    return (
        <span>
            { valgteKolonner.includes(Kolonne.VEILEDER) &&
            <div className="col col-xs-2">
                {
                    bruker.veilederId ? <span>{navn}</span> : (
                        <Etikett
                            type={EtikettType.NYBRUKER}
                            child={fm('enhet.portefolje.tabelletikett.ny.bruker')}
                            skalVises={bruker.veilederId === null}
                        />
                    )
                }
            </div> }
            { valgteKolonner.includes(Kolonne.NAVIDENT) &&
            <div className="col col-xs-1">{ident}</div>
            }
        </span>
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
        <div className="brukerliste--border-bottom-thin row brukerliste__liste-element">
                   <CheckBox className="flex col col-xs-1" bruker={bruker} settMarkert={settMarkert} />
                    <BrukerNavn
                        bruker={bruker}
                        enhetId={enhetId}
                    />
                    <BrukerFnr bruker={bruker} />
                    <EnhetDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg} valgteKolonner={valgteKolonner} />
                    <Veilederinfo veileder={brukersVeileder} bruker={bruker} valgteKolonner={valgteKolonner}/>
                    <Etiketter bruker={bruker} />
        </div>
    );
}

export default EnhetBrukerpanel;
