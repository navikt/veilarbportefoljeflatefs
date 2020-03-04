import * as React from 'react';
import classNames from 'classnames';
import Etiketter from '../components/tabell/etiketter';
import { FiltervalgModell, VeilederModell } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import EnhetKolonner from './enhet-kolonner';
import { useLayoutEffect, useRef } from 'react';
import './enhetsportefolje.less';
import './brukerliste.less';
import {OrNothing} from "../utils/types/types";
import {Checkbox} from "nav-frontend-skjema";
import {useFeatureSelector} from "../hooks/redux/use-feature-selector";
import {VEDTAKSTOTTE} from "../konstanter";

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
    const erVedtakStotteFeaturePa = useFeatureSelector()(VEDTAKSTOTTE);

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToRef(liRef);
        }
    }, [varForrigeBruker]);

    const classname = classNames('brukerliste__element', {
        'brukerliste--forrigeBruker': varForrigeBruker,
    });

    return (
        <li className={classname} ref={liRef}>
            <div className="brukerliste__gutter-left">
                <Checkbox
                    checked={bruker.markert}
                    disabled={bruker.fnr === ''}
                    onChange={()=> settMarkert(bruker.fnr, !bruker.markert)}
                    label=""
                    className="brukerliste__checkbox"
                />
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
                <Etiketter bruker={bruker} erVedtakStotteFeaturePa={erVedtakStotteFeaturePa}/>
            </div>
        </li>
    );
}

export default EnhetBrukerpanel;
