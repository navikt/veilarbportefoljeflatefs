import * as React from 'react';
import * as classNames from 'classnames';
import Etiketter from '../components/tabell/etiketter';
import { FiltervalgModell, VeilederModell } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import CheckBox from '../components/tabell/checkbox';
import EnhetKolonner from './enhet-kolonner';

interface EnhetBrukerpanelProps {
    bruker: any;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
}

function EnhetBrukerpanel({ bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner, varForrigeBruker }: EnhetBrukerpanelProps) {

    const classname  = classNames('brukerliste__element brukerliste--border-bottom-thin', {
        'brukerliste--forrigeBruker': varForrigeBruker,
    });

    return (
        <li className={classname}>
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
                    <Etiketter bruker={bruker}/>
                </div>
        </li>
    );
}

export default EnhetBrukerpanel;
