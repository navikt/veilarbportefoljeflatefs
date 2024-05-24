import React, {useLayoutEffect} from 'react';
import classNames from 'classnames';
import {Checkbox} from '@navikt/ds-react';
import Etiketter from '../components/tabell/etiketter';
import {BrukerModell, FiltervalgModell, VeilederModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import EnhetKolonner from './enhet-kolonner';
import {OrNothing} from '../utils/types/types';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {VEDTAKSTOTTE} from '../konstanter';
import './enhetsportefolje.css';
import './brukerliste.css';

interface EnhetBrukerpanelProps {
    bruker: BrukerModell;
    settMarkert: (bruker: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    brukersVeileder?: VeilederModell;
    valgteKolonner: Kolonne[];
    forrigeBruker: OrNothing<string>;
}

function EnhetBrukerpanel({
    bruker,
    settMarkert,
    enhetId,
    filtervalg,
    brukersVeileder,
    valgteKolonner,
    forrigeBruker
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

    const classname = classNames('brukerliste__element', 'brukerliste_rad', {
        'brukerliste--forrigeBruker': varForrigeBruker
    });

    return (
        <li className={classname}>
            <Checkbox
                checked={bruker.markert}
                className="brukerliste__checkbox"
                disabled={bruker.fnr === ''}
                hideLabel
                onChange={() => {
                    settMarkert(bruker.fnr, !bruker.markert);
                }}
                size="small"
            >
                Velg bruker {bruker.etternavn}, {bruker.fornavn}
            </Checkbox>
            <EnhetKolonner
                className="brukerliste__innhold flex flex--center"
                bruker={bruker}
                enhetId={enhetId}
                filtervalg={filtervalg}
                valgteKolonner={valgteKolonner}
                brukersVeileder={brukersVeileder}
            />
            <div className="brukerliste__gutter-right">
                <div className="brukerliste__etiketter">
                    <Etiketter bruker={bruker} erVedtakStotteFeatureTogglePa={erVedtaksStotteFeatureTogglePa} />
                </div>
            </div>
        </li>
    );
}

export default EnhetBrukerpanel;
