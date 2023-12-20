import React from 'react';
import {LagHuskelappInngang} from './LagHuskelappInngang';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import './huskelapp.css';
import {HuskelappVisning} from './HuskelappVisning';

export const HuskelappPanel = ({bruker}: {bruker: BrukerModell}) => {
    const onSlettArbeidsliste = () => {};
    return bruker?.huskelapp?.kommentar ? (
        <HuskelappVisning huskelapp={bruker?.huskelapp as HuskelappModell} />
    ) : (
        <div className="huskelappPanel">
            <LagHuskelappInngang bruker={bruker} />
            {bruker.arbeidsliste?.arbeidslisteAktiv && (
                <EksisterendeArbeidslisteVisning arbeidsliste={bruker.arbeidsliste} onSlett={onSlettArbeidsliste} />
            )}
        </div>
    );
};
