import React from 'react';
import {LagHuskelappInngang} from './LagHuskelappInngang';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import {ArbeidslisteDataModell, BrukerModell, HuskelappModell} from '../../model-interfaces';
import './huskelapp.css';
import {HuskelappVisning} from './HuskelappVisning';
import {slettArbeidslisteAction} from '../../ducks/arbeidsliste';
import {useDispatch} from 'react-redux';
import {oppdaterState} from '../../components/modal/arbeidsliste/fjern-fra-arbeidsliste-form';

export const HuskelappPanel = ({bruker}: {bruker: BrukerModell}) => {
    const dispatch = useDispatch();
    const onSlettArbeidsliste = () => {
        const arbeidsliste: ArbeidslisteDataModell[] = [bruker].map(bruker => ({
            fnr: bruker.fnr,
            kommentar: bruker.arbeidsliste.kommentar ?? null,
            frist: bruker.arbeidsliste.frist,
            kategori: bruker.arbeidsliste.kategori
        }));
        slettArbeidslisteAction(arbeidsliste)(dispatch).then(res =>
            oppdaterState(res, () => {}, arbeidsliste, dispatch)
        );
    };

    return bruker?.huskelapp?.kommentar ? (
        <HuskelappVisning huskelapp={bruker?.huskelapp as HuskelappModell} bruker={bruker} />
    ) : (
        <div className="huskelappPanel">
            <LagHuskelappInngang bruker={bruker} />
            {bruker.arbeidsliste?.arbeidslisteAktiv && (
                <EksisterendeArbeidslisteVisning arbeidsliste={bruker.arbeidsliste} onSlett={onSlettArbeidsliste} />
            )}
        </div>
    );
};
