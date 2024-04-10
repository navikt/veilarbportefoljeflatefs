import React from 'react';
import {LagHuskelappInngang} from './LagHuskelappInngang';
import {EksisterendeArbeidslisteVisning} from './EksisterendeArbeidslisteVisning';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import './huskelapp.css';
import {HuskelappPanelvisning} from './HuskelappPanelvisning';
import {useDispatch} from 'react-redux';
import {slettArbeidslisteUtenFargekategoriOgOppdaterRedux} from './slettEksisterendeArbeidsliste';

export const HuskelappPanel = ({bruker}: {bruker: BrukerModell}) => {
    const dispatch = useDispatch();
    const onSlettArbeidsliste = () => {
        slettArbeidslisteUtenFargekategoriOgOppdaterRedux(bruker, dispatch);
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
