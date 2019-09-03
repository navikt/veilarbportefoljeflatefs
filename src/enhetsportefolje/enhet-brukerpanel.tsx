import * as React from 'react';
import classNames from 'classnames';
import Etiketter from '../components/tabell/etiketter';
import { VeilederModell } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import CheckBox from '../components/tabell/checkbox';
import EnhetKolonner from './enhet-kolonner';
import { getFraBrukerFraUrl } from '../utils/url-utils';
import { useLayoutEffect, useRef, useState } from 'react';
import { FiltreringState } from '../ducks/filtrering';

interface EnhetBrukerpanelProps {
    bruker: any;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltreringState;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
}

function EnhetBrukerpanel({ bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner }: EnhetBrukerpanelProps) {
    const [forrigeBruker, setForrigeBruker]= useState<string | null>(null);
    const liRef = useRef<HTMLLIElement>(null);

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    useLayoutEffect(() => {
        setForrigeBruker(getFraBrukerFraUrl());
    });

    useLayoutEffect(() => {
        if (bruker.fnr === forrigeBruker) {
            scrollToRef(liRef);
        }
    }, [liRef.current, forrigeBruker]);

    const classname  = classNames('brukerliste__element brukerliste--border-bottom-thin', {
        'brukerliste--forrigeBruker': forrigeBruker,
    });

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
