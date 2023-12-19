import React from 'react';
import {LagHuskelappInngang} from './LagHuskelappInngang';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import {BrukerModell} from '../../model-interfaces';

export const HuskelappPanel = ({bruker}: {bruker: BrukerModell}) => {
    const onSlettArbeidsliste = () => {};
    return (
        <div className="huskelappPanel">
            <LagHuskelappInngang />
            {bruker.arbeidsliste?.arbeidslisteAktiv && (
                <EksisterendeArbeidslisteVisning arbeidsliste={bruker.arbeidsliste} onSlett={onSlettArbeidsliste} />
            )}
        </div>
    );
};
