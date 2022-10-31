import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MinoversiktBrukerPanel from './minoversikt-bruker-panel';
import {settBrukerSomMarkert, hentArbeidslisteForBruker} from '../ducks/portefolje';
import {OversiktType} from '../ducks/ui/listevisning';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {useForrigeBruker} from '../hooks/portefolje/use-forrige-bruker';
import {OrNothing} from '../utils/types/types';
import {VeilederModell} from '../model-interfaces';
import {useOnUnmount} from '../hooks/use-on-unmount';
import {updateLastPath} from '../utils/url-utils';
import './minoversikt.css';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {STATUS} from '../ducks/utils';
import {AppState} from '../reducer';
import {nullstillBrukerfeil} from '../ducks/brukerfeilmelding';

interface MinOversiktTabellProps {
    innloggetVeileder: OrNothing<VeilederModell>;
    visesAnnenVeiledersPortefolje?: boolean;
    settSorteringOgHentPortefolje: (sortering: string) => void;
    classNameWrapper: string;
}

function MinoversiktTabell(props: MinOversiktTabellProps) {
    const forrigeBruker = useForrigeBruker();
    const {brukere, enhetId, filtervalg, listevisning} = usePortefoljeSelector(OversiktType.minOversikt);
    const portefolje = useSelector((state: AppState) => state.portefolje);
    const dispatch = useDispatch();
    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));
    const hentArbeidslisteBruker = fnr => dispatch(hentArbeidslisteForBruker(fnr));

    useOnUnmount(() => {
        updateLastPath();
    });

    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;
    const brukerfeilMelding = useSelector((state: AppState) => state.brukerfeilStatus);
    const fjernBrukerfeilmelding = () => {
        if (brukerfeilMelding.status) {
            dispatch(nullstillBrukerfeil());
        }
    };
    useEffect(() => {
        fjernBrukerfeilmelding();
    }, [filtervalg]);
    return (
        <Innholdslaster avhengigheter={[portefolje, {status: tilordningerStatus}]}>
            <div className={props.classNameWrapper}>
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
                                    innloggetVeileder={props.innloggetVeileder}
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
