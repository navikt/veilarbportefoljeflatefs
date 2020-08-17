import * as React from 'react';
import classNames from 'classnames';
import Etiketter from '../components/tabell/etiketter';
import {FiltervalgModell, VeilederModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import EnhetKolonner from './enhet-kolonner';
import {useLayoutEffect} from 'react';
import './ny_enhetsportefolje.less';
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
    forrigeBruker: OrNothing<string>;
}

function EnhetBrukerpanel({bruker, settMarkert, enhetId, filtervalg, brukersVeileder, valgteKolonner, forrigeBruker}: EnhetBrukerpanelProps) {
    const varForrigeBruker = bruker.fnr === forrigeBruker;
    const erVedtakStotteFeaturePa = useFeatureSelector()(VEDTAKSTOTTE);

    const scrollToLastPos = () => {
        const xPos = parseInt(localStorage.getItem("xPos") || '0');
        const yPos = parseInt(localStorage.getItem("yPos") || '0');
        window.scrollTo(xPos, yPos);
    };

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToLastPos();
        }
    }, [varForrigeBruker]);

    const classname = classNames('brukerliste__element', {
        'brukerliste--forrigeBruker': varForrigeBruker,
    });

    return (
        <li className={classname}>
            <div className="brukerliste__gutter-left">
                <Checkbox
                    checked={bruker.markert}
                    disabled={bruker.fnr === ''}
                    onChange={() => settMarkert(bruker.fnr, !bruker.markert)}
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
