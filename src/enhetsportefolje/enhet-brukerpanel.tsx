import * as React from 'react';
import classNames from 'classnames';
import Etiketter from '../components/tabell/etiketter';
import { VeilederModell } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import CheckBox from '../components/tabell/checkbox';
import EnhetKolonner from './enhet-kolonner';
import { getFraBrukerFraUrl } from '../utils/url-utils';
import { useLayoutEffect, useRef } from 'react';
import { FiltreringState } from '../ducks/filtrering';

interface EnhetBrukerpanelProps {
    bruker: any;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltreringState;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
}

function EnhetBrukerpanel({ bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner, varForrigeBruker }: EnhetBrukerpanelProps) {
    const liRef = useRef<HTMLLIElement>(null);

    const classname  = classNames('brukerliste__element brukerliste--border-bottom-thin', {
        'brukerliste--forrigeBruker': varForrigeBruker,
    });

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    useLayoutEffect(() => {
        const forrigeBruker = getFraBrukerFraUrl();
        if (bruker.fnr === forrigeBruker) {
            scrollToRef(liRef);
        }
    }, [liRef.current]);

    return (
        <li className={classname} ref={liRef}>
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
