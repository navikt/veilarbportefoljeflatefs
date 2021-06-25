import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MinoversiktTabellDatarad from './minoversikt-tabell-datarad';
import {settBrukerSomMarkert} from '../ducks/portefolje';
import {OversiktType} from '../ducks/ui/listevisning';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {useForrigeBruker} from '../hooks/portefolje/use-forrige-bruker';
import {OrNothing} from '../utils/types/types';
import {VeilederModell} from '../model-interfaces';
import {useOnUnmount} from '../hooks/use-on-unmount';
import {updateLastPath} from '../utils/url-utils';
import './minoversikt.less';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {STATUS} from '../ducks/utils';
import {AppState} from '../reducer';
import MinoversiktTabellOverskrift from "./minoversikt-tabell-overskrift";

interface MinOversiktTabellProps {
    innloggetVeileder: OrNothing<VeilederModell>;
    visesAnnenVeiledersPortefolje?: boolean;
    settSorteringOgHentPortefolje: (sortering: string) => void;
    classNameWrapper: string;
}

function MinoversiktTabell(props: MinOversiktTabellProps) {
    const forrigeBruker = useForrigeBruker();
    const {brukere, filtervalg, enhetId, listevisning, sorteringsfelt, sorteringsrekkefolge} = usePortefoljeSelector(OversiktType.minOversikt);
    const portefolje = useSelector((state: AppState) => state.portefolje);
    const dispatch = useDispatch();
    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));

    useOnUnmount(() => {
        updateLastPath();
    });

    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

    return (
        <Innholdslaster avhengigheter={[portefolje, {status: tilordningerStatus}]}>
            <div role="table" className={props.classNameWrapper}>
                <div role="rowgroup" className="enhet-header">
                    <MinoversiktTabellOverskrift
                        sorteringsrekkefolge={sorteringsrekkefolge}
                        sorteringOnClick={props.settSorteringOgHentPortefolje}
                        filtervalg={filtervalg}
                        sorteringsfelt={sorteringsfelt}
                        valgteKolonner={listevisning.valgte}
                        brukere={brukere}
                        oversiktType={OversiktType.enhetensOversikt}
                    />
                </div>
                <div role="rowgroup" className="enhet-table typo-undertekst blokk-xs brukerliste" data-testid="brukerliste">
                    {brukere.map(bruker => (
                        <MinoversiktTabellDatarad
                            key={bruker.fnr || bruker.guid}
                            bruker={bruker}
                            enhetId={enhetId}
                            settMarkert={settMarkert}
                            varForrigeBruker={forrigeBruker === bruker.fnr}
                            filtervalg={filtervalg}
                            valgteKolonner={listevisning.valgte}
                            innloggetVeileder={props.innloggetVeileder}
                        />
                    ))}
                </div>
            </div>
        </Innholdslaster>
    );
}

export default MinoversiktTabell;
