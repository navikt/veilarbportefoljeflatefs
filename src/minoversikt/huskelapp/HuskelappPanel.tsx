import React from 'react';
import {LagHuskelappInngang} from './LagHuskelappInngang';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import {ArbeidslisteDataModell, BrukerModell, HuskelappModell} from '../../model-interfaces';
import './huskelapp.css';
import {HuskelappPanelvisning} from './HuskelappPanelvisning';
import {slettArbeidslisteAction} from '../../ducks/arbeidsliste';
import {useDispatch} from 'react-redux';
import {oppdaterStateVedSlettArbeidsliste} from './slettEksisterendeArbeidsliste';

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
            oppdaterStateVedSlettArbeidsliste(res, arbeidsliste, dispatch)
        );
    };

    return (
        <div className="huskelapp-panel">
            {bruker.huskelapp ? (
                <HuskelappPanelvisning huskelapp={bruker.huskelapp as HuskelappModell} bruker={bruker} />
            ) : (
                <>
                    <LagHuskelappInngang bruker={bruker} />
                    {bruker.arbeidsliste.arbeidslisteAktiv && (
                        <EksisterendeArbeidslisteVisning
                            arbeidsliste={bruker.arbeidsliste}
                            onSlett={onSlettArbeidsliste}
                        />
                    )}
                </>
            )}
        </div>
    );
};
