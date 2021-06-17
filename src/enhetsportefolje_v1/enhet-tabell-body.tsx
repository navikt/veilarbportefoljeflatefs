import * as React from 'react';
import classNames from 'classnames';
import Etiketter from '../components/tabell_v1/etiketter';
import {BrukerModell, FiltervalgModell, VeilederModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import EnhetKolonner from './enhet-kolonner';
import {useLayoutEffect} from 'react';
import './enhetsportefolje.less';
import './brukerliste.less';
import {OrNothing} from '../utils/types/types';
import {Checkbox} from 'nav-frontend-skjema';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {VEDTAKSTOTTE} from '../konstanter';
import {VisKolonne} from "./enhet-tabell";

interface EnhetBrukerpanelProps {
    bruker: BrukerModell;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: OrNothing<string>;
    filtervalg: FiltervalgModell;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
    forrigeBruker: OrNothing<string>;
    SkalViseKolonne: ()=> VisKolonne;
}

function EnhetTabellBody({
                              bruker,
                              settMarkert,
                              enhetId,
                              filtervalg,
                              brukersVeileder,
                              valgteKolonner,
                              forrigeBruker,
                              SkalViseKolonne
                          }: EnhetBrukerpanelProps) {
    const varForrigeBruker = bruker.fnr === forrigeBruker;
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);

    const scrollToLastPos = () => {
        const xPos = parseInt(localStorage.getItem('xPos') || '0');
        const yPos = parseInt(localStorage.getItem('yPos') || '0');
        window.scrollTo(xPos, yPos);
    };

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToLastPos();
        }
    }, [varForrigeBruker]);

    const classname = classNames('brukerliste--rad', {
        'brukerliste--forrigeBruker': varForrigeBruker
    });

    return (
        <div role="row" className={classname}>
            <div role="cell" className="brukerliste__gutter-left">
                <Checkbox
                    checked={bruker.markert}
                    disabled={bruker.fnr === ''}
                    onChange={() => settMarkert(bruker.fnr, !bruker.markert)}
                    label=""
                    role="checkbox"
                    className="brukerliste__checkbox"
                />
            </div>
            <div className="brukerliste__innhold flex flex--center">
                <EnhetKolonner
                    bruker={bruker}
                    enhetId={enhetId}
                    filtervalg={filtervalg}
                    valgteKolonner={valgteKolonner}
                    brukersVeileder={brukersVeileder}
                    visKolonne={SkalViseKolonne}
                />
            </div>
            <div role="cell" className="brukerliste__gutter-right">
                <Etiketter bruker={bruker} erVedtakStotteFeatureTogglePa={erVedtaksStotteFeatureTogglePa} />
            </div>
        </div>
    );
}

export default EnhetTabellBody;
