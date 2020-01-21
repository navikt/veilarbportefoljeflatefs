import * as React from 'react';
import classNames from 'classnames';
import Etiketter from '../components/tabell/etiketter';
import { FiltervalgModell, VeilederModell } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import CheckBox from '../components/tabell/checkbox';
import EnhetKolonner from './enhet-kolonner';
import { useLayoutEffect, useRef } from 'react';
import './enhetsportefolje.less';
import './brukerliste.less';
import {OrNothing} from "../utils/types/types";

interface EnhetBrukerpanelProps {
    bruker: any;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: OrNothing<string>;
    filtervalg: FiltervalgModell;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
    forrigeBruker?: string;
}

function EnhetBrukerpanel({bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner, forrigeBruker}: EnhetBrukerpanelProps) {
    const liRef = useRef<HTMLLIElement>(null);
    const varForrigeBruker = bruker.fnr === forrigeBruker;

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToRef(liRef);
        }
    }, [varForrigeBruker]);

    const classname = classNames('brukerliste__element brukerliste--border-bottom-thin', {
        'brukerliste--forrigeBruker': varForrigeBruker,
    });

    return (
        <li className={classname} ref={liRef}>
            <div className="brukerliste__gutter-left">
                <CheckBox bruker={bruker} settMarkert={settMarkert}/>
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
