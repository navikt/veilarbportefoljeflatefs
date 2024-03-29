import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MinoversiktBrukerPanel from './minoversikt-bruker-panel';
import {hentArbeidslisteForBruker, settBrukerSomMarkert} from '../ducks/portefolje';
import {OversiktType} from '../ducks/ui/listevisning';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {OrNothing} from '../utils/types/types';
import {VeilederModell} from '../model-interfaces';
import {useOnUnmount} from '../hooks/use-on-unmount';
import {updateLastPath} from '../utils/url-utils';
import './minoversikt.css';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {STATUS} from '../ducks/utils';
import {AppState} from '../reducer';
import {useBrukerIKontekstSelector} from '../hooks/redux/use-bruker-i-kontekst-selector';

interface MinOversiktTabellProps {
    innloggetVeileder: OrNothing<VeilederModell>;
    classNameWrapper: string;
}

function MinoversiktTabell({innloggetVeileder, classNameWrapper}: MinOversiktTabellProps) {
    const forrigeBruker = useBrukerIKontekstSelector();
    const {brukere, enhetId, filtervalg, listevisning} = usePortefoljeSelector(OversiktType.minOversikt);
    const portefolje = useSelector((state: AppState) => state.portefolje);
    const dispatch = useDispatch();
    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));
    const hentArbeidslisteBruker = fnr => dispatch(hentArbeidslisteForBruker(fnr));
    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

    useOnUnmount(() => {
        updateLastPath();
    });

    return (
        <Innholdslaster avhengigheter={[portefolje, {status: tilordningerStatus}]}>
            <div className={classNameWrapper}>
                <div className="minoversikt-liste__wrapper">
                    <ul className="brukerliste" data-testid="brukerliste">
                        {enhetId &&
                            brukere.map(bruker => (
                                <MinoversiktBrukerPanel
                                    key={bruker.fnr || bruker.guid}
                                    bruker={bruker}
                                    enhetId={enhetId}
                                    settMarkert={settMarkert}
                                    varForrigeBruker={forrigeBruker === bruker.fnr}
                                    filtervalg={filtervalg}
                                    valgteKolonner={listevisning.valgte}
                                    innloggetVeileder={innloggetVeileder}
                                    hentArbeidslisteForBruker={hentArbeidslisteBruker}
                                />
                            ))}
                    </ul>
                </div>
            </div>
        </Innholdslaster>
    );
}

export default MinoversiktTabell;
